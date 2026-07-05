// Screenshot alat za 20/44 sajt (WAT tool).
// Usage:
//   node tools/screenshot.mjs http://localhost:3000
//   node tools/screenshot.mjs http://localhost:3000 hero          (label suffix)
//   node tools/screenshot.mjs http://localhost:3000 mobile 390    (label + width)
// Snima u ./.tmp/screenshots/screenshot-N[-label].png (auto-increment, ne prepisuje).
import { mkdir, readdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { homedir } from "node:os";
import { fileURLToPath } from "node:url";

// Nađi bilo koji Chrome koji je Puppeteer skinuo u svoj cache, bez obzira na
// tačnu verziju koju ovaj Puppeteer pinuje. Vraća null ako nema.
async function findCachedChrome() {
  const base = join(homedir(), ".cache", "puppeteer", "chrome");
  let entries;
  try {
    entries = await readdir(base);
  } catch {
    return null;
  }
  for (const dir of entries.sort().reverse()) {
    const exe = join(base, dir, "chrome-win64", "chrome.exe");
    if (existsSync(exe)) return exe;
  }
  return null;
}

// Koren projekta je jedan nivo iznad tools/.
const ROOT = fileURLToPath(new URL("..", import.meta.url));
const OUT_DIR = join(ROOT, ".tmp", "screenshots");

const url = process.argv[2] || "http://localhost:3000";
const label = process.argv[3] ? `-${process.argv[3]}` : "";
const width = process.argv[4] ? parseInt(process.argv[4], 10) : 1440;

async function nextIndex() {
  await mkdir(OUT_DIR, { recursive: true });
  const files = await readdir(OUT_DIR);
  let max = 0;
  for (const f of files) {
    const m = f.match(/^screenshot-(\d+)/);
    if (m) max = Math.max(max, parseInt(m[1], 10));
  }
  return max + 1;
}

let puppeteer;
try {
  puppeteer = (await import("puppeteer")).default;
} catch {
  console.error("Puppeteer nije instaliran. Pokreni: npm install");
  process.exit(1);
}

const n = await nextIndex();
const outPath = join(OUT_DIR, `screenshot-${n}${label}.png`);

const executablePath = await findCachedChrome();
const browser = await puppeteer.launch({
  headless: "new",
  ...(executablePath ? { executablePath } : {}),
});
try {
  const page = await browser.newPage();
  // deviceScaleFactor 1: full-page šotovi visokih strana na 2x prelaze Chrome
  // ~16384px limit i korumpiraju se.
  await page.setViewport({ width, height: 900, deviceScaleFactor: 1, isMobile: width < 600 });
  await page.goto(url, { waitUntil: "networkidle0", timeout: 60000 });

  // Proskroluj kroz stranu da se okinu scroll-reveal animacije i lazy slike,
  // pa se vrati na vrh pre snimanja cele strane.
  await page.evaluate(async () => {
    document.documentElement.style.scrollBehavior = "auto";
    await new Promise((resolve) => {
      let y = 0;
      const step = window.innerHeight * 0.7;
      const timer = setInterval(() => {
        window.scrollBy(0, step);
        y += step;
        if (y >= document.body.scrollHeight) {
          clearInterval(timer);
          window.scrollTo(0, 0);
          setTimeout(resolve, 400);
        }
      }, 120);
    });
    document.querySelectorAll(".reveal").forEach((el) => el.classList.add("in"));
  });
  await new Promise((r) => setTimeout(r, 600));

  await page.screenshot({ path: outPath, fullPage: true });
  console.log(`Snimljeno: ${outPath}`);
} finally {
  await browser.close();
}

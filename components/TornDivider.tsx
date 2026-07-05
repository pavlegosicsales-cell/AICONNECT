/*
  Iscepana (torn) ivica koja se stapa sa crnom (ink) susednom sekcijom.
  Put se generiše deterministički (fiksan seed) da SSR i klijent budu identični.
  Koristi se na dnu/vrhu sekcije sa slikom da izgleda kao iscepana traka.
*/

// Deterministički pseudo-random (LCG) — stabilan između rendera.
function makeRng(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1103515245 + 12345) & 0x7fffffff;
    return s / 0x7fffffff;
  };
}

// Puna crna traka pri dnu (y=100) sa nazubljenom/iscepanom gornjom ivicom.
function tornPath(seed: number): string {
  const rnd = makeRng(seed);
  const W = 1000;
  const H = 100;
  const n = 46;
  const pts: [number, number][] = [];
  for (let i = 0; i <= n; i++) {
    const x = (i / n) * W;
    let y = 34 + rnd() * 36; // osnovna zona 34–70
    const r = rnd();
    if (r > 0.86) y = 8 + rnd() * 14; // duži zub nagore (dublji rez)
    else if (r > 0.72) y = 74 + rnd() * 18; // plići deo
    pts.push([x, +y.toFixed(1)]);
  }
  let d = `M0,${H} L0,${pts[0][1]}`;
  for (const [x, y] of pts) d += ` L${x.toFixed(1)},${y}`;
  d += ` L${W},${H} Z`;
  return d;
}

const D = tornPath(4423);

export default function TornDivider({
  position = "bottom",
  fill = "var(--color-ink)",
}: {
  position?: "top" | "bottom";
  fill?: string;
}) {
  const isTop = position === "top";
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-x-0 z-20 h-[52px] md:h-[92px] ${
        isTop ? "top-0" : "bottom-0"
      }`}
    >
      <svg
        viewBox="0 0 1000 100"
        preserveAspectRatio="none"
        className={`h-full w-full ${isTop ? "-scale-y-100" : ""}`}
      >
        <path d={D} fill={fill} />
      </svg>
    </div>
  );
}

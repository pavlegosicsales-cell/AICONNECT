import { site } from "@/data/site";

export default function Footer() {
  return (
    <footer className="border-t border-line bg-ink">
      {/* Akcentna hatch traka */}
      <div className="hatch-accent h-3 w-full opacity-70" />

      <div className="mx-auto max-w-6xl px-5 py-16 md:px-8">
        {/* Veliki znak */}
        <div className="flex items-end justify-between gap-4">
          <p
            className="font-black uppercase leading-[0.8] tracking-tighter"
            style={{ fontSize: "clamp(4rem, 20vw, 16rem)" }}
          >
            20<span className="text-accent">/</span>44
          </p>
          <a
            href="#top"
            className="mb-2 shrink-0 font-mono text-xs uppercase tracking-widest text-ash transition-colors hover:text-accent"
          >
            ↑ Na vrh
          </a>
        </div>

        <div className="mt-10 grid gap-8 border-t border-line pt-8 sm:grid-cols-2 md:grid-cols-4">
          <div>
            <p className="font-mono text-xs uppercase leading-relaxed tracking-widest text-ash">
              {site.adresa.ulica}
              <br />
              {site.adresa.deo}, {site.adresa.grad}
            </p>
          </div>
          <div>
            <p className="font-mono text-xs uppercase leading-relaxed tracking-widest text-ash">
              {site.adresa.koordinate}
              <br />
              {site.adresa.drzava}
            </p>
          </div>
          <div>
            <ul className="space-y-1">
              {site.socials.map((s) => (
                <li key={s.naziv}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-xs uppercase tracking-widest text-ash transition-colors hover:text-accent"
                  >
                    {s.naziv}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="sm:text-right">
            <p className="font-mono text-xs uppercase leading-relaxed tracking-widest text-smoke">
              Karađorđeva · MMXXIV
              <br />
              Muzika ispred svega
            </p>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[11px] uppercase tracking-widest text-smoke">
            © {new Date().getFullYear()} 20/44 — Underground institucija
          </p>
          <p className="font-mono text-[11px] uppercase tracking-widest text-smoke">
            Savamala, Beograd
          </p>
        </div>
      </div>
    </footer>
  );
}

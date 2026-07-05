import { site } from "@/data/site";
import { ArrowUpRight, InstagramIcon, FacebookIcon } from "@/components/icons";

export default function Contact() {
  return (
    <section id="kontakt" className="border-t border-line bg-ink px-5 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-6xl">
        <p className="mb-4 font-mono text-xs uppercase tracking-widest text-accent">
          [ Kontakt ]
        </p>
        <h2
          data-reveal
          className="text-tex max-w-3xl font-black uppercase leading-[0.92] tracking-tighter"
          style={{ fontSize: "clamp(2rem, 6vw, 4.5rem)" }}
        >
          Vidimo se u Savamali.
        </h2>

        <div data-reveal-group className="mt-16 grid gap-x-12 gap-y-12 md:grid-cols-3">
          {/* Adresa */}
          <div className="border-t border-line pt-5">
            <p className="mb-4 font-mono text-xs uppercase tracking-widest text-smoke">
              Lokacija
            </p>
            <p className="text-xl font-bold uppercase leading-tight tracking-tight">
              {site.adresa.ulica}
              <br />
              {site.adresa.deo}, {site.adresa.grad}
            </p>
            <p className="mt-3 font-mono text-xs uppercase tracking-widest text-ash">
              {site.adresa.koordinate}
            </p>
            <a
              href={site.mapaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 border-b border-accent pb-1 font-mono text-xs uppercase tracking-widest text-accent transition-opacity hover:opacity-70"
            >
              Otvori mapu
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>

          {/* Radno vreme */}
          <div className="border-t border-line pt-5">
            <p className="mb-4 font-mono text-xs uppercase tracking-widest text-smoke">
              Radno vreme
            </p>
            <ul className="space-y-3">
              {site.radnoVreme.map((r) => (
                <li key={r.dan} className="flex items-baseline justify-between gap-4 border-b border-line pb-3">
                  <span className="text-lg font-medium uppercase tracking-tight">
                    {r.dan}
                  </span>
                  <span className="font-mono text-xs uppercase tracking-widest text-ash">
                    {r.vreme}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-4 font-mono text-[11px] uppercase leading-relaxed tracking-widest text-smoke">
              Program se objavljuje nedeljno.
            </p>
          </div>

          {/* Mreže */}
          <div className="border-t border-line pt-5">
            <p className="mb-4 font-mono text-xs uppercase tracking-widest text-smoke">
              Prati program
            </p>
            <ul className="space-y-3">
              {site.socials.map((s) => (
                <li key={s.naziv}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between gap-4 border-b border-line pb-3 transition-colors hover:text-accent"
                  >
                    <span className="flex items-center gap-3 text-lg font-medium uppercase tracking-tight">
                      {s.naziv === "Instagram" && <InstagramIcon className="h-5 w-5" />}
                      {s.naziv === "Facebook" && <FacebookIcon className="h-5 w-5" />}
                      {s.naziv}
                    </span>
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

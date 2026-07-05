import ImgReveal from "@/components/ImgReveal";
import { lokali } from "@/data/lokali";

export default function Lokali() {
  return (
    <section id="lokali" className="bg-ink">
      <div data-reveal className="mx-auto max-w-6xl px-5 pt-24 md:px-8 md:pt-32">
        <p className="mb-4 font-mono text-xs uppercase tracking-widest text-accent">
          [ Lokali · 07 ]
        </p>
        <h2
          className="text-tex max-w-3xl font-black uppercase leading-[0.92] tracking-tighter"
          style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}
        >
          Svaki sprat drži svoj ton.
        </h2>
      </div>

      <div className="mx-auto mt-16 max-w-6xl">
        {lokali.map((l, i) => {
          const flip = i % 2 === 1;
          return (
            <article
              key={l.slug}
              id={`lokal-${l.slug}`}
              data-reveal
              className="scroll-mt-24 border-t border-line px-5 py-14 md:px-8 md:py-20"
            >
              <div
                className={`grid items-center gap-8 md:grid-cols-2 md:gap-12 ${
                  flip ? "md:[&>figure]:order-2" : ""
                }`}
              >
                <figure className="group relative aspect-[4/5] overflow-hidden border border-line sm:aspect-[3/2] md:aspect-[4/5]">
                  <ImgReveal
                    src={l.slika}
                    alt={`${l.naziv} — 20/44`}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="reveal-color object-cover group-hover:scale-[1.03]"
                  />
                  <figcaption className="absolute left-0 top-0 bg-ink/80 px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest text-accent">
                    {l.sprat} · {l.pozicija}
                  </figcaption>
                </figure>

                <div>
                  <div className="flex items-baseline gap-4">
                    <span className="font-mono text-sm text-smoke">{l.broj}</span>
                    <div className="h-px flex-1 bg-line" />
                  </div>
                  <h3
                    className="text-tex mt-4 font-black uppercase leading-[0.95] tracking-tighter"
                    style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
                  >
                    {l.naziv}
                  </h3>
                  <p className="mt-5 max-w-md text-lg leading-relaxed text-ash">
                    {l.opis}
                  </p>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

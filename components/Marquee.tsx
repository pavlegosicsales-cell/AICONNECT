import { site } from "@/data/site";

/* Beskonačna traka žanrova. Duplira sadržaj radi neprekidne petlje. */
export default function Marquee() {
  const items = [...site.zanrovi, ...site.zanrovi];
  return (
    <div className="relative overflow-hidden border-y border-line bg-ink py-3">
      <div className="animate-marquee flex w-max whitespace-nowrap">
        {items.map((z, i) => (
          <span
            key={i}
            className="mx-6 font-mono text-sm uppercase tracking-widest text-ash"
          >
            {z}
            <span className="ml-6 text-accent">/</span>
          </span>
        ))}
      </div>
    </div>
  );
}

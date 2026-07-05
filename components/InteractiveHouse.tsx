"use client";

import { useState } from "react";
import { lokali } from "@/data/lokali";

function centroid(points: string): { x: number; y: number } {
  const pts = points
    .trim()
    .split(/\s+/)
    .map((p) => p.split(",").map(Number));
  const x = pts.reduce((s, p) => s + p[0], 0) / pts.length;
  const y = pts.reduce((s, p) => s + p[1], 0) / pts.length;
  return { x, y };
}

export default function InteractiveHouse() {
  const [active, setActive] = useState<string | null>(null);

  const goto = (slug: string) => {
    document
      .getElementById(`lokal-${slug}`)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section id="kuca" className="border-t border-line bg-ink px-5 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-6xl">
        <div data-reveal className="mb-12 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="mb-4 font-mono text-xs uppercase tracking-widest text-accent">
              [ Prostor ]
            </p>
            <h2
              className="text-tex max-w-2xl font-black uppercase leading-[0.92] tracking-tighter"
              style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}
            >
              Jedna kuća, sedam lokala.
            </h2>
          </div>
          <p className="max-w-xs font-mono text-xs uppercase leading-relaxed tracking-widest text-ash">
            Pređi kursorom preko fasade ili izaberi iz liste. Svaki deo kuće
            ima svoju priču.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-[1.6fr_1fr] md:items-start">
          {/* Fasada sa hotspotovima */}
          <div className="relative border border-line bg-panel">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/house.png"
              alt="Crtež fasade zgrade 20/44 na Karađorđevoj 44"
              className="block w-full select-none"
            />
            <svg
              viewBox="0 0 1000 667"
              preserveAspectRatio="none"
              className="absolute inset-0 h-full w-full"
              role="group"
              aria-label="Interaktivna fasada — lokali"
            >
              {lokali.map((l) => {
                const c = centroid(l.hotspot.points);
                const on = active === l.slug;
                return (
                  <g key={l.slug}>
                    <polygon
                      points={l.hotspot.points}
                      className="cursor-pointer transition-all duration-200"
                      fill="var(--color-accent)"
                      fillOpacity={on ? 0.32 : 0}
                      stroke="var(--color-accent)"
                      strokeOpacity={on ? 1 : 0}
                      strokeWidth={2}
                      onMouseEnter={() => setActive(l.slug)}
                      onMouseLeave={() => setActive(null)}
                      onClick={() => goto(l.slug)}
                    />
                    <text
                      x={c.x}
                      y={c.y}
                      textAnchor="middle"
                      dominantBaseline="central"
                      className="pointer-events-none select-none font-mono transition-opacity duration-200"
                      fontSize="20"
                      fontWeight="700"
                      fill={on ? "var(--color-accent)" : "#ffffff"}
                      opacity={on ? 1 : 0.45}
                    >
                      {l.broj}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Lista lokala (pristupačna alternativa hoveru) */}
          <ul className="divide-y divide-line border-y border-line">
            {lokali.map((l) => (
              <li key={l.slug}>
                <button
                  type="button"
                  onClick={() => goto(l.slug)}
                  onMouseEnter={() => setActive(l.slug)}
                  onMouseLeave={() => setActive(null)}
                  onFocus={() => setActive(l.slug)}
                  onBlur={() => setActive(null)}
                  className={`flex w-full items-center justify-between gap-4 py-4 text-left transition-colors ${
                    active === l.slug ? "text-accent" : "text-bone"
                  }`}
                >
                  <span className="flex items-baseline gap-3">
                    <span className="font-mono text-xs text-smoke">{l.broj}</span>
                    <span className="text-lg font-bold uppercase tracking-tight">
                      {l.naziv}
                    </span>
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-smoke">
                    {l.sprat}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

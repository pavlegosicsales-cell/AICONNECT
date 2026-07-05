"use client";

import { useEffect } from "react";

/*
  Scroll-reveal (originalna implementacija ideje "enterView/.trigger").
  Elementi sa [data-reveal] ili [data-reveal-group] dobiju klasu .is-in kad
  uđu u kadar (jednom). Stilovi su u globals.css. Poštuje reduced-motion.
*/
export default function ScrollReveal() {
  useEffect(() => {
    const els = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal], [data-reveal-group]")
    );
    if (els.length === 0) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      els.forEach((e) => e.classList.add("is-in"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );

    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, []);

  return null;
}

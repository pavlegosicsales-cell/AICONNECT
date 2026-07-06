"use client";

import { useEffect } from "react";

/*
  Scroll-reveal (originalna implementacija ideje "enterView/.trigger").
  Elementi sa [data-reveal] ili [data-reveal-group] dobiju klasu .is-in kad
  uđu u kadar (jednom). Stilovi su u globals.css. Poštuje reduced-motion.

  Dodatno: na DODIRNIM uređajima (mobilni) slike sa .reveal-color dobiju .rc-in
  kad uđu u kadar → saturacija se dodaje postepeno (CSS tranzicija filtera),
  umesto na tap/hover. Glatko, bez glitcha.
*/
export default function ScrollReveal() {
  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isTouch = window.matchMedia("(hover: none)").matches;

    const els = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal], [data-reveal-group]")
    );
    const colorImgs = isTouch
      ? Array.from(document.querySelectorAll<HTMLElement>(".reveal-color"))
      : [];

    const observers: IntersectionObserver[] = [];

    // Reduced motion: sve odmah otkriveno / obojeno.
    if (reducedMotion) {
      els.forEach((e) => e.classList.add("is-in"));
      colorImgs.forEach((e) => e.classList.add("rc-in"));
      return;
    }

    if (els.length) {
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
      observers.push(io);
    }

    if (colorImgs.length) {
      const ioColor = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              entry.target.classList.add("rc-in");
              ioColor.unobserve(entry.target);
            }
          }
        },
        { threshold: 0.15 }
      );
      colorImgs.forEach((e) => ioColor.observe(e));
      observers.push(ioColor);
    }

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return null;
}

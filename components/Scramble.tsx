"use client";

import { useEffect, useState } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789°/.NE";

/*
  Tekst koji se "sklapa" iz nasumičnih znakova — tehnički detalj
  inspirisan .scrambled koordinatama sa Warehouse pravca (naš sadržaj).
*/
export default function Scramble({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  const [display, setDisplay] = useState(text);

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setDisplay(text);
      return;
    }
    let iteration = 0;
    const id = setInterval(() => {
      setDisplay(
        text
          .split("")
          .map((c, i) =>
            c === " " ? " " : i < iteration ? c : CHARS[Math.floor(Math.random() * CHARS.length)]
          )
          .join("")
      );
      if (iteration >= text.length) clearInterval(id);
      iteration += 1 / 2;
    }, 40);
    return () => clearInterval(id);
  }, [text]);

  return (
    <span className={className} aria-label={text}>
      {display}
    </span>
  );
}

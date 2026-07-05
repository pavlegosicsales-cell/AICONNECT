"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";

/*
  next/image + "scale-settle" pri učitavanju (opacity + blagi scale).
  Klasa .img-in se doda kad se slika učita; animacija je u globals.css.
  Ako je slika već keširana (complete), odmah je vidljiva.
*/
export default function ImgReveal({ className = "", ...props }: ImageProps) {
  const [loaded, setLoaded] = useState(false);
  return (
    <Image
      {...props}
      onLoad={() => setLoaded(true)}
      className={`img-load ${loaded ? "img-in" : ""} ${className}`}
    />
  );
}

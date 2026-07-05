/*
  Lokali (delovi zgrade) 20/44 — Karađorđeva 44, Savamala.
  Svaki lokal je zaseban deo objekta. Na interaktivnoj fasadi hover ga oboji,
  klik vodi na njegovu sekciju (#lokal-<slug>).

  `hotspot.points` su SVG polygon tačke u koordinatnom sistemu viewBox="0 0 1000 667"
  (odgovara odnosu slike house.png ~3:2). Doteruju se preko rendera.

  Copy je originalan, u tonu brenda (kratke rečenice, fokus na muzici/atmosferi).
*/

export type Lokal = {
  broj: string; // "01".."07"
  slug: string;
  naziv: string;
  sprat: string;
  pozicija: string;
  opis: string;
  slika: string;
  hotspot: { points: string };
};

export const lokali: Lokal[] = [
  {
    broj: "01",
    slug: "main-klub",
    naziv: "Main klub",
    sprat: "Prizemlje",
    pozicija: "Centar",
    opis:
      "Srce prostora. Mračno, glasno, bez separea. Sound sistem, DJ i publika na dohvat ruke — sve što je potrebno da noć ode u pravom smeru.",
    slika: "/images/club-1.jpg",
    hotspot: { points: "440,470 560,470 560,610 440,610" },
  },
  {
    broj: "02",
    slug: "bar-44",
    naziv: "Bar 44",
    sprat: "Prizemlje",
    pozicija: "Levo",
    opis:
      "Prvo mesto na koje naiđeš. Bar bez pompe, sa pločama na zidu i ljudima koji ostaju do jutra. Odavde počinje veče.",
    slika: "/images/lokal-bar-44.jpg",
    hotspot: { points: "190,470 430,470 430,610 190,610" },
  },
  {
    broj: "03",
    slug: "pizzeria",
    naziv: "Pizzeria",
    sprat: "Prizemlje",
    pozicija: "Desno",
    opis:
      "Kada noć potraje, ovde se dolazi po pauzu. Topao ugao u prizemlju — parče, predah, pa nazad na podijum.",
    slika: "/images/club-2.jpg",
    hotspot: { points: "580,470 820,470 820,610 580,610" },
  },
  {
    broj: "04",
    slug: "vukosava-bar",
    naziv: "Vukosava bar",
    sprat: "1. sprat",
    pozicija: "Levo",
    opis:
      "Sprat iznad podijuma. Mirniji ton, isti duh — mesto gde se razgovor čuje, a muzika i dalje vodi.",
    slika: "/images/lokal-vukosava-bar.jpg",
    hotspot: { points: "190,210 470,210 470,450 190,450" },
  },
  {
    broj: "05",
    slug: "galerija-20-44",
    naziv: "Galerija 20/44",
    sprat: "1. sprat",
    pozicija: "Desno",
    opis:
      "Prostor za ono što nije samo zvuk. Izložbe, vizuelni radovi i program koji klub drži povezanim sa scenom oko sebe.",
    slika: "/images/lokal-galerija.jpg",
    hotspot: { points: "540,210 820,210 820,450 540,450" },
  },
  {
    broj: "06",
    slug: "studio-stajga",
    naziv: "Studio Štajga",
    sprat: "2. sprat",
    pozicija: "Levo",
    opis:
      "Radni prostor pod krovom. Mesto gde se snima, priprema i gde ideje dobiju oblik pre nego što dođu do publike.",
    slika: "/images/lokal-studio-stajga.jpg",
    hotspot: { points: "195,70 485,70 485,205 195,205" },
  },
  {
    broj: "07",
    slug: "lounge-bar",
    naziv: "Gore Lounge",
    sprat: "2. sprat",
    pozicija: "Desno",
    opis:
      "Najviša tačka kuće. Predah od podijuma, pogled i ton koji usporava — bez da se izlazi iz priče.",
    slika: "/images/club-4.jpg",
    hotspot: { points: "515,70 810,70 810,205 515,205" },
  },
];

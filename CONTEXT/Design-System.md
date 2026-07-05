# 20/44 — Design System

Izvod dizajn odluka za sajt. Izvor istine za brend je `CONTEXT/context profile`;
ovaj dokument hvata odluke specifične za web i one koje gaze/preciziraju brend profil.

## Boje

| Token (Tailwind) | Hex | Upotreba |
|---|---|---|
| `ink` | `#000000` | Pozadina (baza) |
| `panel` | `#111111` | Tamni paneli, linije/bordere |
| `smoke` | `#5E5E5E` | Sekundarni tekst |
| `ash` | `#8E8E8E` | Tercijarni/prigušeni tekst |
| `bone` | `#FFFFFF` | Primarni tekst |
| `accent` | `#FED11C` | **Jedina akcentna boja** (žuta) |

> ⚠️ Žuti akcenat `#FED11C` **namerno gazi** crveni (`#B5121B`) iz brand profila —
> to je odluka klijenta za web. Crvenu ne koristiti.

Definisano u `app/globals.css` kroz `@theme` (Tailwind v4). Klase: `bg-ink`, `text-accent`,
`border-panel`, itd.

## Stil: „sharp"
- **Oštre ivice** — bez `rounded` bilo gde. Globalni default `border-radius: 0` je postavljen
  u `@layer base` u `globals.css`.
- **Grainy** — filmska zrnastost. Globalni overlay `.grain` (fiksni, `mix-blend: overlay`)
  dodat u `app/layout.tsx`. Za grainy gradijente na sekcijama koristiti isti noise pristup.
- Industrijska estetika: beton/metal/čelik/dim, mat površine, kontrast.
- **Izbegavati:** zlato, sjaj, neon, luksuz, korporativni look, zaobljenja.

## Tipografija
- Trenutno: Geist Sans (telo) + Geist Mono (tehnički/akcenti) — iz Next scaffolda.
- Konačan izbor čeka **frontend skill** klijenta (može diktirati grotesk/kondenzovani font
  za naslove). Ažurirati `app/layout.tsx` kad stigne.

## Ton komunikacije (copy)
- Kratke rečenice. Bez marketing klišea. Fokus na muzici, izvođačima, iskustvu.
- **Nikad:** „najluđa žurka", „VIP iskustvo", „ekskluzivan provod", „najjači klub",
  „luksuz", influenserski rečnik.

## Struktura strane (v1)
Hero → Interaktivna kuća → O klubu/Filozofija → Lokali (7) → Galerija → Lokacija/Kontakt → Footer.

Lokali (izvor: `data/lokali.ts`): Main klub, Bar 44, Pizzeria (prizemlje), Vukosava bar,
Galerija 20/44 (1. sprat), Studio Štajga, Lounge bar (2. sprat).

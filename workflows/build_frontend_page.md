# Workflow: Izrada frontend strane (20/44)

**Cilj:** Napraviti frontend stranu visokog zanata za 20/44 sajt, u skladu sa brief-om
(i referentnom slikom, ako postoji) i brend pravilima.

## Obavezni inputi
- Brief ili referentna slika (layout, sadržaj, namera)
- Slike/asseti (hero, zgrada za interaktivnu kuću, galerija) u `public/images/`
- Frontend skill (pravila dizajna/tipografije) — ako ga je klijent poslao
- Brend kontekst: `CONTEXT/context profile` i `CONTEXT/Design-System.md`

## Koraci
1. Ako postoji frontend/design skill — pročitaj ga PRE pisanja koda.
2. Pročitaj `CONTEXT/Design-System.md` (boje, sharp stil, grain, ton). Poštuj pravila brenda.
3. Proveri `public/images/` — koristi prave assete ako postoje; u suprotnom placeholderi
   (`https://placehold.co/WIDTHxHEIGHT`, generički copy) i jasno označi šta čeka zamenu.
4. Gradi komponente u `components/`, slaži ih u `app/page.tsx`. Reusable delove (npr.
   `LokalSection`) drži data-driven iz `data/lokali.ts`.
5. Pokreni dev server ako već ne radi: `npm run dev` (http://localhost:3000).
6. Screenshot: `npm run shot` ili `node tools/screenshot.mjs http://localhost:3000 <label>`.
   Za mobilni: `node tools/screenshot.mjs http://localhost:3000 mobile 390`.
7. Pročitaj PNG iz `.tmp/screenshots/` i uporedi sa referencom. Budi konkretan oko
   piksela/veličina/boja koje ne odgovaraju.
8. Popravi neslaganja i ponovi 6–7. Uradi **bar 2** kruga poređenja. Stani tek kad nema
   vidljivih razlika (ili kad klijent kaže da je dosta).

## Očekivani izlaz
- Radne komponente + `app/page.tsx` ispravno servirani na http://localhost:3000
- Screenshotovi u `.tmp/screenshots/` koji dokumentuju finalni rezultat

## Brend pravila (kratko — puno u Design-System.md)
- Akcenat: žuta `#FED11C` (jedina akcentna boja). Baza crna/siva/bela.
- Stil: sharp — oštre ivice (bez `rounded`), grainy gradijenti/overlay.
- Ton: kratke rečenice, fokus na muzici. NIKAD: „VIP", „najluđa žurka", „ekskluzivan
  provod", „luksuz", influenserski rečnik.
- Izbegavati vizuelno: zlato, sjaj, neon, luksuzni/korporativni look.

## Edge cases / napomene
- Puppeteer mora biti instaliran (`npm install`). `screenshot.mjs` sam pronalazi keširani
  Chrome; ako ga nema, Puppeteer koristi svoj podrazumevani.
- Nikad ne screenshot-uj `file:///` URL — uvek serviraj sa localhost-a (`npm run dev`).
- Interaktivna kuća: SVG overlay preko slike zgrade; koordinate hotspot-a se crtaju kad
  stigne finalna slika zgrade. Hover → žuti tint, klik → skrol na `#lokal-<slug>`.

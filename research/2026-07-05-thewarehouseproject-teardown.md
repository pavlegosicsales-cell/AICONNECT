# Site Teardown: The Warehouse Project

**URL:** https://thewarehouseproject.com/
**Built by:** custom WordPress theme (agency-built; Manchester club/events brand)
**Platform:** WordPress (evidence: `/wp-content/uploads/`, `/wp-admin/admin-ajax.php` news AJAX, GTM)
**Date analyzed:** 2026-07-05
**Sources used:** pasted HTML (home), pasted site JS (jQuery + custom `site.js`), fetched `/assets/css/styles.css`

> Namena ovog dokumenta: blueprint za 20/44 redizajn. Naš sajt je Next.js + Tailwind v4,
> pa se sve preuzima kao **originalna reimplementacija tehnika**, ne kao port njihovog koda.

---

## Tech Stack (Confirmed from Source)

| Technology | Evidence | Purpose |
|---|---|---|
| WordPress | `/wp-content/`, `admin-ajax.php` (`newsAjax`) | CMS / templating |
| jQuery 3.6.1 | inlined in site JS | DOM, events, AJAX |
| GSAP + ScrambleText | `gsap.timeline()`, `scrambleText:{…}` | emblem intro + scramble text |
| Slick carousel | `.image-carousel/.event-carousel/.info-carousel .slick({…})` | sliders (event pages) |
| enterView | `enterView({selector, enter, exit})` | scroll-trigger `.trigger`/`.unpin` |
| yall.js | `yall({observeChanges:true})` | lazy images |
| MicroModal | `MicroModal.init({…})` | sign-up modals |
| ClipboardJS | `new ClipboardJS("button.share-url")` | copy share links |
| Custom fonts | `@font-face` WHP Display, Ceraph Roman/Italic | brand type |

Filtered out (third-party, ignored): Google Tag Manager.

---

## Design System

### Colors
| Usage | Value |
|---|---|
| Base background | `#1c2323` (dark teal-charcoal — **NOT black**) |
| Theme-color meta | `#354242` |
| Primary text | `#e9f7f7` (off-white cyan) |
| **Accent** | `#D8FF00` (acid lime/neon yellow) |
| Secondary gray | `#D8E5E5` |
| Tertiary gray | `#C9DBDB` |
| Overlays | `rgba(28,35,35,0.8/0.5)`, dark layer `rgba(0,0,0,0.08)` |

> Ključan uvid: baza je tamno-siva `#1c2323`, ne čista crna. Zato im se suptilni grid/grain
> **vide**. Kod nas (baza `#000`) morali smo da pojačamo overlay opacitete.

### Typography
| Role | Font | Notes |
|---|---|---|
| Headlines | `Ceraph Roman` (serif), bold, `line-height:1em`, UPPERCASE | **serif**, ne grotesk |
| UI / body | `WHP Display` (custom sans) | Helvetica fallback |
| Accent italic | `Ceraph Italic` | dekorativno |

Font fajlovi: `/assets/fonts/WHPDisplay-Regular.woff2`, `Ceraph-Roman.woff2`, `Ceraph-Italic.woff2` (licencirani — mi koristimo Archivo + Geist Mono).

Responsive sizes: body `1em → .9em (≤1100) → .8em (≤900)`; `.hero-text-title 3.8em → 2.6em (≤600)`; `.sectional-title 2.6em → 2em`.

### Spacing / Layout
- Padding skala: `30px (desktop) / 20px (tablet) / 10px (mobile)`; sekcije footer `90px` top.
- Kolone kao procenti: `12.5% / 25% / 37.5% / 42.85% / 56.25% / 68.75%`; max container `1600px`.
- Breakpoints: `600 / 800 / 900 / 1000 / 1100 / 1200 / 1600`.

### Z-index
`header 20 · menu-close 15 · main 10 · footer 9 · jump-nav 8 · nav-bar 5 · text 4 · menu 2 · detail-layers 1`.

### Motion tokens
- Default transition: `all 300ms ease`.
- Signature easing: `cubic-bezier(0.72, 0, 0.19, 1)` (menu, lazy images), `cubic-bezier(0.33, 1, 0.68, 1)` (trigger reveals).
- `prefers-reduced-motion`: gase se image transitions i menu animacije.

---

## Effects Breakdown

| Effect | Implementation | Complexity | Cloneable? |
|---|---|---|---|
| Hero SVG emblem intro | GSAP timeline animira delove monograma (crosshair `#Step-01`, prstenovi, `#Outer-Text`, `#Numeral-Dates`, `#Heads`) sa scale/rotate/opacity + kratak flicker na kraju | High | Partially (naš logo je slika, ne SVG monogram) |
| Scramble koordinate | GSAP ScrambleText na `.scrambled` (`53.4808°N /// 2.2426°W`), chars `1234567890` | Low | ✅ (imamo React verziju) |
| Grid + noise + flood overlay | 3 sloja u `.detail-layers`/`.overlay>.grid`: `grid-repeater-16.png` (repeat-y) nad `rgba(0,0,0,.08)`, `overlay-noise.png` (200px tile) na `html`, `bg-flood-0X.svg` (opacity .1) | Med | ✅ (mi radimo proceduralno: CSS grid + feTurbulence) |
| Multi-speed parallax | scroll listener: `.scroll-shift`→`translateY(0.2*scrollTop)`, `-two`→`0.19`, `-three`→`-0.02`, `-four`→`-0.2` | Low | ✅ |
| Nav off-top | `scrollTop>30` → `body.off-top` → `header:after` (noise bg) `opacity 0→0.95` | Low | ✅ (imamo, blur varijanta) |
| Stack reveal | `enterView` dodaje `.trigger` (i `.unpin` na `.stack-section`); CSS `.trigger`→`fadeInUpCalendar` translateY(40→0) 1200ms | Low | ✅ (naš `data-reveal`) |
| Textured naslovi | `-webkit-background-clip:text` + `white-text-mask.png` (400px tile) → tekst ispunjen teksturom | Med | ✅ (možemo dodati) |
| Full-screen meni | slide iz desna `menuSlide 550ms`, lime panel `#D8FF00`, overlay `fadeIn`, GSAP dot-grid morph ikone, focus-trap, Esc | Med | ✅ (imamo, bez dot-morph) |
| Lazy scale-settle | `img.lazy{opacity:0;transform:scale(1.2)}` → on load `1800ms cubic-bezier(.72,0,.19,1)` na scale(1) | Low | ✅ (možemo dodati) |
| Background video hero | `<video autoplay muted loop playsinline>` + pause/play dugme (poštuje reduced-motion) | Low | ✅ (ako dobijemo snimak) |

---

## Implementation Details

### 1. Grid + grain + flood (njihov "prljavi" sloj)
Nisu proceduralni — to su **rasterske/vektorske slike** u fiksnom/parallax kontejneru:
- `html` pozadina: `overlay-noise.png` (200×200 tile, repeat) + `repeat-bg-2026.jpg` (100% širine, repeat-y).
- `.detail-layers .dl-01`: `grid-repeater-16.png` (repeat-y) nad `rgba(0,0,0,0.08)`, `will-change:transform` (pomeraju ga parallaxom).
- `.dl-02`: `bg-flood-0X.svg` @ `opacity:0.1` — velike meke „mrlje".
- **Naš pristup (bolji za održavanje):** isto vizuelno, ali proceduralno — CSS `linear/radial-gradient` grid + SVG `feTurbulence` (fine tačkice) + niskofrekventni `feTurbulence` (mrlje). Bez asseta.

### 2. Nav off-top
```
scrollTop > 30  →  body.off-top
.off-top header:after { opacity: 0.95 }   /* teksturisana pozadina se pojavi */
```
Naša verzija: `scrollY>30` → `scrolled` state → `bg-ink/85 backdrop-blur`.

### 3. Stack reveal (scroll-trigger)
`enterView({selector:".stack-section", offset:1, enter:add "trigger"+"unpin", exit:remove "unpin"})`. CSS:
```
.article{opacity:0} .article.trigger{ animation: fadeInUpCalendar 1200ms cubic-bezier(.33,1,.68,1) forwards }
@keyframes fadeInUpCalendar { 0%{opacity:0;transform:translateY(40px)} 100%{opacity:1;transform:none} }
```
Naša verzija: `IntersectionObserver` dodaje `.is-in`; CSS translateY(24px)→0. Stagger preko `[data-reveal-group]`.

### 4. Textured naslovi (background-clip)
```
@supports (-webkit-background-clip:text){
  .hero-text-title{ -webkit-text-fill-color:transparent; -webkit-background-clip:text;
    background-image:url(white-text-mask.png); background-size:400px; background-repeat:repeat; }
}
```
Reveal: naizgled skup efekat je samo tekstura klipovana u tekst. Kod nas može feTurbulence/noise data-URI umesto PNG.

### 5. Hero emblem intro (GSAP)
Timeline redosled (ključni koraci): crosshair `#Step-01` scale+rotate in → `#RT-*` krakovi ulaze pa se rasprše → `#Outer-Text` rotira ulaz → `#Numeral-Dates` + `#Heads` fade → ceo `#Main-Emblem` scale 0.95 + kratak opacity flicker (4.55–4.7s). Easing `power3/power4/expo`.
Reveal: dramatičan izgled = mnogo malih staggerovanih transformacija na jednom SVG-u. Kod nas (logo je slika) radimo prostiji `scale(0.86→1)+fade` intro (`badge-intro`).

---

## Assets Needed to Recreate (i naš izvor)

1. **Noise/grain tekstura** — mi generišemo `feTurbulence` (bez fajla).
2. **Grid tekstura** — CSS gradijenti (bez fajla).
3. **Flood/mrlje** — niskofrekventni `feTurbulence` (bez fajla).
4. **Text-mask tekstura** (za klipovane naslove) — data-URI noise.
5. **Fontovi** — Ceraph/WHP Display su licencirani; koristimo **Archivo + Geist Mono** (ili serif ako želimo bliže WHP-u).
6. **Hero loop video** — treba snimak atmosfere (trenutno statična slika).

---

## Build Plan

### Recommended Stack (naš, potvrđen)
- **Next.js 16 + React 19** — komponente, App Router.
- **Tailwind v4** — utility stil, tema u `@theme`.
- **Bez GSAP** — IntersectionObserver + CSS scroll-driven animacije (`animation-timeline: view()`) su dovoljni i lakši.

### Section-by-Section (mapa na 20/44)
1. **Nav** — fiksni bar + off-top stanje + full-screen meni (lime→žuti). ✅ urađeno.
2. **Hero** — emblem/pečat centralno (logo), scramble koordinate, crop marks, CTA. ✅ urađeno (+ `badge-intro`).
3. **Overlay slojevi** — grid + prašina + mrlje + grain, fiksni, globalni. ✅ urađeno (proceduralno).
4. **Torn/stack prelazi** — iscepane ivice između sekcija sa slikom. ✅ urađeno (Filozofija).
5. **Scroll-reveal** — `data-reveal`/`-group` + IntersectionObserver. ✅ urađeno.
6. **Sadržajne sekcije** — About, interaktivna kuća, Lokali, Galerija, Kontakt, Footer. ✅ urađeno.

### Preostalo (opcije za dalje)
- [ ] **Textured naslovi** (background-clip:text + noise) — WHP potpis.
- [ ] **Lazy scale-settle** na slikama (`scale(1.06→1)` on load).
- [ ] **Multi-speed parallax** na overlay slojevima (grid sporije od mrlja).
- [ ] **Base color odluka**: nudge `ink` sa `#000` ka `#0b0d0d`/`#12` radi WHP „dubine" (ili ostati crn).
- [ ] **Serif naslovi** kao alternativa Archivu (bliže WHP editorial tonu) — dizajn odluka.
- [ ] **Hero video** kad stigne snimak.

## Notes
- WHP je WordPress + jQuery + GSAP; mi namerno ostajemo na React/CSS (lakše, brže, bez GSAP licence za ScrambleText).
- Njihov akcenat je lajm `#D8FF00`; naš je žuti `#FED11C` (odluka klijenta) — ostajemo pri žutoj.
- Ništa od njihovog koda/asseta/logotipa se ne kopira; sve gore je reimplementacija tehnika.

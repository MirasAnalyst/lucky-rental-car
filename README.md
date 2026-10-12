# Lucky Rental Car — Website

A modern, elegant, **bilingual (EN/RU)** and **SEO-optimised** one-page website for
**Lucky Rental Car** — car rental in Batumi, Georgia.

## Files
- `index.html` — page markup (inline styles from the v2 design) + SEO meta + structured data
- `styles.css` — page base, per-breakpoint layout variables, hover rules, lightbox
- `script.js` — language toggle + translations (`I`), fleet cards (`CARS`), FAQ accordion, menu, photo lightbox
- `images/` — optimised web photos (from your originals) + `og-image.jpg` (social share)
- `favicon.svg`, `robots.txt`, `sitemap.xml` — technical SEO assets

## How to preview
Open a terminal in this folder and run:

```
python3 -m http.server 8000
```

Then open **http://localhost:8000**.

## Mobile & cross-device (iOS + Android)
Fully responsive and tested at phone widths (390px iPhone, 360px Android):
- Every grid collapses to a single column; **no horizontal scrolling** at any width.
- Hamburger menu (desktop nav + "Book Now" collapse into it) with an animated open/close.
- iOS Safari specifics handled: `-webkit-backdrop-filter` for the nav blur, `100svh` hero (with
  `100vh` fallback) so it fits under the dynamic address bar, `-webkit-tap-highlight-color` removed.
- Scrolling is native (no scroll libraries), so it feels normal on iOS/Android.

## Design
The page follows the **v2 redesign** (Claude Design project “Lucky Rental Car — редизайн v2”): navy + gold,
Geologica + Onest fonts, Google-rated reviews, FAQ accordion. Section markup carries the design's inline
styles; responsive columns come from CSS variables in `styles.css` (breakpoints 520/560/680/760/820/860/900/1040/1100 px).
No animation libraries and no build step.

## Language toggle (EN / RU)
- Switch with the **EN / RU** buttons in the header. Choice is saved in the browser and new
  visitors get their browser language (falls back to English).
- Texts live in the `I` object in `script.js` (`en` and `ru`); `index.html` carries the English text and a `data-i18n` key on each element.

## Contact details
WhatsApp / Telegram are set at the top of `script.js` (`WA`, `TG`); Instagram and Facebook links are written
directly in `index.html`. The generic WhatsApp link text comes from `msg_generic` in `I`.

## Fleet & tiered prices
In `script.js`, `CARS` lists each car: `[name, slug, photoCount, [price1–2d, price3–5d, price6–10d], class, tagline, specs]`.
Each card lets the visitor pick the rental period; price and the WhatsApp/Telegram booking message update live.

## Per-car photo galleries
Each car has a photo count `n` and a `slug` — `images/car-<slug>-1.jpg … -<n>.jpg`.
- `-1.jpg` is the **main card image** (always a front shot).
- Clicking/tapping a car's photo opens a full-screen gallery you can navigate with the arrows,
  arrow keys, or **swipe** on mobile; it shows a `1 / 5` counter and locks background scroll.
- To add/remove a car's photos: drop `car-<slug>-<n>.jpg` files in `images/` and change the count
  in the car's entry in `CARS`. 

## SEO — what's included
**Technical (developer):**
- Keyword-rich `<title>` + meta description, `keywords`, `robots`, `canonical`, `theme-color`
- Open Graph + Twitter Card tags with a 1200×630 share image (`images/og-image.jpg`)
- `og:locale` + `og:locale:alternate` (en/ru)
- Structured data (JSON-LD): **AutoRental** local business (address, geo, hours, phone, payment,
  social profiles) and a **FAQPage** (eligible for FAQ rich results)
- `favicon.svg`, `robots.txt`, `sitemap.xml`
- Performance: hero image preloaded (`fetchpriority=high`), lazy-loaded gallery, optimised images,
  font preconnect
- Semantic headings (single H1, section H2s) and descriptive image `alt` text

**Content / marketing:**
- Target keywords woven in naturally: *car rental Batumi, rent a car Batumi, no-deposit car hire,
  airport delivery, аренда авто Батуми*
- **FAQ section** (deposit, documents, delivery, insurance, payment, booking) — answers common
  search queries and supports rich results
- Trust & conversion blocks: advantages, stats, **birthday 10% promo**, rental terms,
  "Discover Batumi" travel guide, a customer testimonial, and multi-channel contact
- Consistent NAP (Name, Address, Phone) across the page and schema for local SEO

**Advanced SEO added:**
- **Bilingual SEO** — `?lang=ru` is a crawlable, shareable URL; `hreflang` alternates (en/ru/x-default);
  title, meta description, canonical (self-referencing) and og:locale all swap per language.
- **Rich-result structured data** — AutoRental business with `logo`, `makesOffer` fleet catalog
  (7 cars + per-day prices), languages and service area; plus the FAQPage schema.
- **Local SEO** — `geo.region`/`geo.position`/`ICBM` meta + verified Google Maps listing (`hasMap`).
- **Core Web Vitals** — explicit `width`/`height` on all images (prevents layout shift),
  `decoding="async"`, hero `fetchpriority=high`, CDN preconnect/dns-prefetch.
- **Descriptive, keyword-rich alt text** on every image (localized EN/RU on fleet cars).
- **Image sitemap** + hreflang entries in `sitemap.xml`; PWA `site.webmanifest`.
- Assets are versioned (`styles.css?v=2`, `script.js?v=2`) so returning visitors get updates —
  bump the number when you change CSS/JS.

### 👉 Before you go live
1. **Set your real domain.** Replace every `https://luckyrentalcar.ge/` in `index.html`
   (canonical, OG, JSON-LD, share image URL), in `robots.txt`, and in `sitemap.xml`.
2. Confirm the **Facebook** page and the **per-car prices**.
3. Submit `sitemap.xml` in Google Search Console once the domain is live.
4. (Optional) Add a real Google review count/rating to the JSON-LD **only** once it's genuine and
   shown on the page — I removed the placeholder rating to stay within Google's guidelines.

## Notes
- Address used: **Zurab Shartava St. 16, Batumi 6000** (map embedded in the Contact section).
- Selling points from your Instagram: no deposit, full CASCO insurance, free delivery in Batumi,
  24/7 support, payment in USD / EUR / GEL / USDT.

# Lucky Rental Car — Website

A modern, elegant, **bilingual (EN/RU)** and **SEO-optimised** one-page website for
**Lucky Rental Car** — car rental in Batumi, Georgia.

## Files
- `index.html` — page structure + SEO meta + structured data
- `styles.css` — all styling (dark + gold luxury theme)
- `script.js` — language toggle, translations, fleet cards, contact links, gallery lightbox, animations
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
- Smooth-scroll uses **native touch momentum** on phones (Lenis smooths the mouse wheel only) —
  so scrolling feels normal on iOS/Android; magnetic buttons are disabled on touch devices.

## Animations (professional motion layer)
Powered by **GSAP + ScrollTrigger + Lenis** (loaded from CDN in `index.html`; the site works
fully without them). Handled in `initMotion()` in `script.js`:
- Momentum **smooth scrolling** (Lenis)
- Cinematic **hero** entrance (staggered) + subtle image parallax
- **Staggered scroll reveals** with premium easing on every section
- **Count-up** stats, **magnetic** primary buttons, **smart nav** (hides on scroll-down)
- Fully disabled under `prefers-reduced-motion`; falls back to simple CSS reveals if the CDN is
  blocked; a failsafe guarantees content is never left hidden.

## Language toggle (EN / RU)
- Switch with the **EN / RU** buttons in the header. Choice is saved in the browser and new
  visitors get their browser language (falls back to English).
- All text lives in the `I18N` object in `script.js` (`en` and `ru`). Edit translations there.

## ⚠️ Contact details — already set from your Instagram
```js
const CONTACT = {
  whatsapp: "995555562877",     // +995 555 562 877
  telegram: "995555562877",     // +995 555 562 877
  instagram: "lucky_rentalcar",
  facebook: "lucky_rentalcar"   // ← confirm your real Facebook page slug
};
```
Every WhatsApp / Telegram / Instagram / Facebook button, the floating buttons and the "Book"
buttons on each car update automatically from these values.
👉 **Please confirm the Facebook page** — I used `facebook.com/lucky_rentalcar` as a guess.

## Fleet & prices
In `script.js`, the `FLEET` array lists each car (name, class, image, price, specs — bilingual).
Prices are **per-day "from" rates**; the Hyundai Sonata uses your real tiered pricing
(1–2 days $60 · 3–5 days $50 · 6–10 days $40). Please confirm the rates for the other cars.

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

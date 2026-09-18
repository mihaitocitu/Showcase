# Portfolio Site — Mihai Tocitu

Two-page static site: a homepage and a FarePoint case study, sharing a single compiled bundle.

## Files

- `index.html` — homepage
- `farepoint-case-study.html` — FarePoint case study
- `app.js` — shared compiled React bundle (both pages render from this; the page shown is picked via `<body data-page="homepage">` / `<body data-page="farepoint">`)
- `style.css` — shared Tailwind-generated stylesheet, plus a handful of hand-added rules (see below)
- `assets/` — images and icons used by both pages

Deploy all files together in the same directory — the nav's "Hi / Work / About" links and the case study's "Back to showcase" link depend on `index.html` and `farepoint-case-study.html` sitting side by side, and use `?section=work` / `?section=about` query params to deep-link into homepage sections on load.

## ⚠️ Editing `app.js`

This is a **minified, compiled bundle** — not source code. A few things that will bite you if you're not careful:

1. **Tailwind's CSS is pre-generated from a one-time build scan.** If you introduce a class combination that wasn't used anywhere in the original design (e.g. `flex-[3_0_0%]`, `mb-[40px]`, `w-[1472px]` in some contexts), the CSS rule for it may not exist and the class will silently do nothing. Before relying on a new arbitrary-value class, check it has a real rule in `style.css`, or add one by hand under a semantic name (see the custom rules list below for the pattern used throughout this project).
2. **Minified function/variable names collide across scopes.** The same short name (e.g. a single letter or two) can be reused by unrelated components in different closures. Before editing a function by name, confirm you've found the one that's actually rendered — grep for the surrounding JSX context (a unique string, a `data-name` value, or a sibling component name) rather than trusting the name alone. When in doubt, render the page and inspect the live DOM rather than reasoning from the source text alone.
3. **`data-name` attributes are not unique.** Several unrelated elements share generic `data-name` values like `"content"`, `"Container"`, or even `"hero-text"` / `"hero-content"` (there's dead/unused code in the bundle with the same names as the real, rendered homepage hero). Always verify against the live render.
4. **A global rule caps section width regardless of its own class:** `[data-name=homepage-v2]>[data-name=main-AI-project],[data-name=homepage-v2]>[data-name=secondary-AI-project]{overflow:hidden;width:100%!important}` forces those specific sections to their parent's width no matter what `w-[...]` class they carry. Any *new* full-width homepage section should either be added to this rule or built with `w-full` from the start, not a fixed pixel width.
5. **CSS Grid children can ignore their parent's flex-computed size.** Elements using `grid-cols-[max-content]` size to their content, not their container — a flex item with `flex-[1_0_0]` can still have internal content that overflows its own allocated width. Where this matters (e.g. the homepage hero illustration), a `transform: scale()` is used to fit it, anchored with `transform-origin` on the edge *away from* the direction you need it to shrink (anchoring on the overflowing edge doesn't work — shrinking toward a point can't pull something back past that point).

**Always verify layout changes by rendering the page and measuring**, not just by reading the source — several of the fixes in this project's history turned out differently than the class names implied, for the reasons above.

## Custom CSS rules

A number of small utility classes were hand-added to `style.css` (they don't follow Tailwind's `\[value\]` bracket naming, to keep them distinct from generated utilities and avoid the "missing rule" trap above):

| Class | Purpose |
|---|---|
| `.homepage-col-1of3` / `.homepage-col-2of3` | 33/66 flex split (project rows, hero) |
| `.about-col-1of5` / `.about-col-4of5` | 20/80 split, About section only |
| `.stat-num-col` / `.stat-caption-col` | 30/70 split, outcome stat boxes |
| `.nav-link` | Main nav text: secondary color default, primary on hover |
| `.case-study-btn` / `.case-study-arrow` | "Case study" button: secondary bg default, primary on hover, arrow muted → white |
| `.chip-bg-secondary` / `.chip-bg-muted` | Chip background color overrides |
| `.hero-visual-scale` | Homepage hero illustration scale-down (left-anchored — see gotcha #5 above) |
| `.hero-visual-inset` | Left padding on the case study hero visual only |
| `.linkedin-icon-size` | Nav LinkedIn icon size (20×20px) |
| `.no-hover` | Strips the pointer cursor from non-interactive chips (see below) |
| `.points-row-gap` | Extra top margin on the case study's 3 numbered outcome points |

### The `[data-name=content]:has(>p){cursor:pointer}` rule

This pre-existing rule in the original export gives a pointer cursor to *any* `data-name="content"` element with a direct `<p>` child — which unintentionally covers most chips and badges on the site, not just clickable ones. `.no-hover` (with `!important`) is used to override it on every chip that isn't actually interactive. Currently only the main nav and the "Case study" button are meant to have real hover/click behavior; if you add a new chip, give it `.no-hover` unless it's meant to be clickable.

## Design system

- **Font:** Asta Sans (Google Font, self-hosted as base64 in `style.css`). Weights: Regular (400), Medium (500), SemiBold (600). **Light (300) is not used anywhere on the site** — it was removed site-wide for readability.
- **Color tokens:**
  | Token | Hex | Used for |
  |---|---|---|
  | Primary | `#1c1c1c` | Titles, headlines, nav hover |
  | Secondary | `#383838` | Body text, nav default |
  | Muted | `#757575` | Eyebrow labels, tags, captions |

  Accent colors (green `#43c78b` for positive metrics, white-on-dark badge text `#f3f3f3`) are functional/semantic, not part of this hierarchy. Colors inside embedded product-UI mockup illustrations (e.g. the pricing tool screenshots) are exempt too — they depict an actual product interface, not site copy.
- **Layout — 3 allowed column splits:** 50/50, 33/66, 66/33. Named exceptions: hero is 50/50 with a 56px gap; the outcome stat boxes are 30/70; the About section is 20/80 (photo/text). Standard two-column row gap is 40px, except the hero (56px). Section title → content gap is 24px.
- **Punctuation:** hyphens (`-`), not em dashes (`—`), throughout.

## Known pre-existing quirks

- Two "hero-text" / "hero-content" `data-name` pairs exist in the bundle — one per page (homepage's `de`/`_e`/`ve`, case study's `Mn`/`Pn`/`Fn`) — plus unrelated dead code sharing similar names. Don't assume a match by `data-name` alone.
- Several arbitrary Tailwind values referenced in the original export have no generated CSS rule (see gotcha #1). A few of these were found and fixed during development (the outcome stat box ratio, the homepage hero ratio); there may be others not yet discovered.

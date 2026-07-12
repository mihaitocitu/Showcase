# Mihai Tocitu — UX Designer Portfolio (static site)

Plain HTML/CSS/JS export of the portfolio design. No build step, no npm install, no
framework — just static files, ready for GitHub Pages.

## Files

- `index.html` — the whole page (desktop + mobile markup, switched via a CSS media query,
  same as the original responsive design)
- `style.css` — all styles
- `script.js` — small vanilla JS for the nav's scroll-to-section links and the
  "Let's talk UX!" buttons (opens Calendly in a new tab)
- `assets/` — images and icons

## Deploying to GitHub Pages

1. Push these files to the root of your repo (or a `/docs` folder — your choice).
2. In the repo, go to **Settings → Pages**.
3. Under "Build and deployment", set **Source** to "Deploy from a branch".
4. Pick your branch and the folder these files live in (`/root` or `/docs`).
5. Save — GitHub will give you a URL like `https://<username>.github.io/<repo>/`
   within a minute or two.

No further steps needed — there's nothing to build or install.

## Making edits later

Since there's no build process, you can edit `index.html`/`style.css` directly on
GitHub.com (or locally) and the live site updates on your next push. Just keep in
mind the file combines both the mobile and desktop markup in one document — look
for the `class="block md:hidden"` wrapper (mobile) and `class="hidden md:flex"`
wrapper (desktop) near the top of `index.html`.

# Stack
- Static site: vanilla HTML / CSS / JS. No build step, no package manager, no framework.
- Single stylesheet `css/styles.css` (+ `css/docs.css` for the docs site). Single script `js/main.js`.
- Deployed to **Cloudflare Pages**. EmailJS keys in `js/main.js` are intended to be replaced at build time via Cloudflare Pages env vars (`EMAILJS_PUBLIC_KEY`, `EMAILJS_SERVICE_ID`, `EMAILJS_TEMPLATE_ID`) — currently hardcoded; only refactor if asked.

# Local preview
- `python -m http.server 8000` from repo root, then load `http://localhost:8000/<page>.html`.
  Note the `.html`: that server does **not** resolve clean URLs, so every extensionless
  link 404s locally. Since the nav, the docs sidebar and every blog card are extensionless
  (matching the canonicals and what Cloudflare Pages serves), click-through cannot be
  tested on it. Use a server that maps `/<path>` to `<path>.html` and `/<path>/` to
  `<path>/index.html` when the task involves following links rather than loading one page.
- Always start the server and load the changed page yourself before declaring a task done. State explicitly that final visual sign-off is the user's.
- For layout-affecting changes, check **390px, 768px, 901px, 1024px and 1440px**. Checking
  only ≤768 and ≥1024 is what let a batch of real bugs survive: the nav had three items
  off-screen at 768px, the hero overflowed by 48px at every width ≥768px, and the docs grid
  overflowed by up to 132px between 901 and 1023px. The gap between the two stated
  breakpoints is where the breakage lives, and 390px is the most common phone width.

# CSS rules
- **YOU MUST use CSS variables, never raw hex.** Palette lives in `:root` of [css/styles.css](css/styles.css): `--black-forest`, `--floral-white`, `--amber-honey`, `--coffee-bean`, `--azure-mist`. Spacing/typography tokens are also defined there — use them.
- No inline `style=` or `<style>` blocks in HTML. (The old `mobile-preview.html` exception is gone; the file was deleted 2026-11-02.)
- `styles.css` is sectioned with `/* === ... === */` headers — add new rules to the matching section, don't append at the bottom.
- Mobile-first. The intended breakpoints are 768px and 1024px, but the two sheets
  actually carry ten. Counted 2026-11-07, with the three that were undocumented:
  `styles.css` — 480, 560, 767, 768, 900, 999, 1023, 1024, 1230; `docs.css` — 600, 1023.
  999 collapses `.hero-split` to one column (below it the headline broke to four
  lines with an orphan); 1230 collapses the product page's `.k8s-cluster-visual`
  diagram; docs' 600 drops `.docs-quick-links` to one column and shrinks `pre`.
  Read the one you are editing before adding another. Two are load-bearing:
  - **1023px is coupled to JavaScript.** The nav drawer's media query
    (`@media (max-width: 1023px)` in `styles.css`) and `js/main.js`'s resize handler
    (`window.innerWidth > 1023`) must move together. If they disagree the drawer is
    stuck open, or cannot be closed, on every page. It is 1023 and not 767 because eight
    nav items need about 710px and the wrapper offers 735px at 1023px; below that,
    items were rendering off-screen and unreachable.
  - **480px is undocumented and was overriding a clamp.** Check whether a fluid value
    already covers the width before adding a fixed override inside it.

# Editing copy (marketing pages)
- **Make small surgical edits. Do not rewrite voice.** If a paragraph needs a word changed, change the word.
- **YOU MUST NOT reveal proprietary detection mechanics** — the technology is patent-pending. Stay at the behavioral / outcome level.
- Keep claims defensible: no unverifiable performance numbers, no named-competitor comparisons.

# docs/ directory
- `docs/*.html` is the **live documentation site**, 14 pages. Its technical content (install commands, chart values, CRD fields, troubleshooting) is written from the local `/Users/eaferstl/eliotIdeas/pandoCore/` tree, which is the source of truth. Verify a command or a value against the charts before publishing it; do not write one from a summary or from memory. There are no version annotations in these pages, and the old "currently v1.3.2" gate was retired on 2026-11-02 along with the sidecar-era content.
- `docs/*.md` (DESIGN_SPECIFICATIONS, MESSAGING_GUIDELINES, IMPROVEMENTS, etc.) are **historical planning docs**. Ignore them; don't read them as guidance and don't update them.
- **Every h2 and h3 in `docs/*.html` carries an id**, and `docs/search-index.json` is generated from them. If you add, rename, remove or reword a heading, run `node scripts/build-search-index.mjs` in the same change. `--check` exits 1 when the index is stale and names the drift. Nothing rebuilds it at deploy time, so a stale index silently tells readers an answer does not exist.

# README
- `README.md` was brought current on 2026-11-02. If you find outdated info while working, **fix the README as part of your change**.

# Git workflow
- **Work on a dev branch**, not `main`. The user merges and pushes to `origin/main` themselves.
- **Never run `git commit` unless explicitly asked.** Never push.

# Scope discipline
- Do exactly what's asked. No bonus refactors, no new features, no "while I'm here" cleanup.
- Default to no comments in HTML/CSS/JS. Only add a comment when the *why* is non-obvious.
- `pitch/` was deleted on 2026-11-08. Cloudflare Pages serves whatever is committed, so its six investor-slide and QR files were publicly fetchable at `/pitch/*` although nothing linked to them. It is still in git history. Do not restore it to the deploy.

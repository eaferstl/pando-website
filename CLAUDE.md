# Stack
- Static site: vanilla HTML / CSS / JS. No build step, no package manager, no framework.
- Single stylesheet `css/styles.css` (+ `css/docs.css` for the docs site). Single script `js/main.js`.
- Deployed to **Cloudflare Pages**. EmailJS keys in `js/main.js` are intended to be replaced at build time via Cloudflare Pages env vars (`EMAILJS_PUBLIC_KEY`, `EMAILJS_SERVICE_ID`, `EMAILJS_TEMPLATE_ID`) — currently hardcoded; only refactor if asked.

# Local preview
- `python -m http.server 8000` from repo root, then load `http://localhost:8000/<page>.html`.
- Always start the server and load the changed page yourself before declaring a task done. State explicitly that final visual sign-off is the user's.
- For layout-affecting changes, check both mobile (≤768px) and desktop (≥1024px) breakpoints.

# CSS rules
- **YOU MUST use CSS variables, never raw hex.** Palette lives in `:root` of [css/styles.css](css/styles.css): `--black-forest`, `--floral-white`, `--amber-honey`, `--coffee-bean`, `--azure-mist`. Spacing/typography tokens are also defined there — use them.
- No inline `style=` or `<style>` blocks in HTML. (Exception: `mobile-preview.html`.)
- `styles.css` is sectioned with `/* === ... === */` headers — add new rules to the matching section, don't append at the bottom.
- Mobile-first; breakpoints are 768px and 1024px. Match the existing media-query pattern.

# Editing copy (marketing pages)
- **Make small surgical edits. Do not rewrite voice.** If a paragraph needs a word changed, change the word.
- **YOU MUST NOT reveal proprietary detection mechanics** — the technology is patent-pending. Stay at the behavioral / outcome level.
- Keep claims defensible: no unverifiable performance numbers, no named-competitor comparisons.

# docs/ directory
- `docs/*.html` is the **live versioned documentation site** (currently v1.3.2). Don't edit it without an explicit ask — version annotations and Helm values are curated.
- `docs/*.md` (DESIGN_SPECIFICATIONS, MESSAGING_GUIDELINES, IMPROVEMENTS, etc.) are **historical planning docs**. Ignore them; don't read them as guidance and don't update them.

# README
- `README.md` is partially stale (color palette, deployment section). If you find outdated info while working, **fix the README as part of your change**.

# Git workflow
- **Work on a dev branch**, not `main`. The user merges and pushes to `origin/main` themselves.
- **Never run `git commit` unless explicitly asked.** Never push.

# Scope discipline
- Do exactly what's asked. No bonus refactors, no new features, no "while I'm here" cleanup.
- Default to no comments in HTML/CSS/JS. Only add a comment when the *why* is non-obvious.
- The `pitch/` directory is out of scope — leave it alone unless asked.

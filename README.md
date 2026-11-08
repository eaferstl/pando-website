# Pando Website

Marketing site and documentation for PandoCore, runtime threat detection for Kubernetes.

## Overview

This is a static website built with HTML, CSS, and vanilla JavaScript. It features these main pages:
- **Home/Landing Page** (`index.html`) - Core value proposition and overview
- **Product Page** (`product.html`) - How the product works
- **Pricing Page** (`pricing.html`) - Plans and pricing tiers
- **About Page** (`about.html`) - Team background, mission, and approach
- **Blog** (`blog/`) - Posts rendered from the `blog/posts.json` manifest (see below)
- **Contact Page** (`contact.html`) - Professional contact form for inquiries
- **Documentation** (`docs/*.html`) - The live documentation site, 14 pages, styled by `css/docs.css`
- **Trust Center** (`trust/index.html`) - Single-page security/data-handling overview; served at `trust.pandocore.io` and linked in every page footer

### Publishing a blog post

1. Copy `blog/_template.html` to `blog/<your-slug>.html` and fill in the marked `<!-- EDIT -->` regions (title, date, author, `og:` tags, and the article body).
2. Add the cover image to `images/blog/` and reference it with a root-absolute path (e.g. `/images/blog/<your-slug>-cover.jpg`).
3. Add one entry to `blog/posts.json` (`title`, `author`, `date`, `excerpt`, `image`, `url`).

The card grid at `/blog/` rebuilds itself from `posts.json` (newest first) — no need to edit the index by hand.

## File Structure

```
pandoWebsite/
├── index.html              # Landing page
├── product.html            # Product page
├── pricing.html            # Pricing page
├── about.html              # About page
├── contact.html            # Contact form page
├── 404.html                # Not-found page; Cloudflare Pages serves it automatically
├── blog/
│   ├── index.html          # Blog landing (renders cards from posts.json)
│   ├── _template.html      # Copy this to start a new post
│   ├── posts.json          # Post manifest (one entry per post)
│   └── *.html              # Individual post pages
├── trust/
│   └── index.html          # Trust Center (served at trust.pandocore.io)
├── docs/
│   ├── index.html          # Documentation site (14 pages, all *.html, prev/next paged)
│   └── *.md                # Historical planning docs; see Documentation below
├── css/
│   ├── styles.css          # Main stylesheet
│   ├── docs.css            # Documentation site styles
│   └── noscript.css        # Loaded only from <noscript>: static nav fallback
├── js/
│   └── main.js             # Mobile nav, blog index rendering, contact form
├── images/
│   ├── blog/               # Blog cover art: an .svg for the page, a .png for og:image
│   ├── logo-nav.png        # 92x120 nav logo on every page (2x its 46x60 slot)
│   ├── og-default.png      # 1200x630 share card, the og:image on every page but the posts
│   ├── logoTransparency.png # 184x240 original; kept only so older shared links resolve
│   ├── founder.jpg         # About page portrait
│   └── favicon.png         # 64x64; it was a 512x512 at 221 KB on all 29 pages
├── sitemap.xml             # Generated from each page's canonical URL
├── robots.txt              # Crawl policy; points crawlers at sitemap.xml
├── _headers                # Cloudflare Pages header rules
├── CLAUDE.md               # Working rules for this repository
├── PRODUCT.md              # Audience, positioning, copy constraints
├── DESIGN.md               # The design system
├── PHASE1-MARKERS.md       # Open claim markers and withdrawn claims
└── README.md               # This file
```

## Quick Start

### Option 1: Open Directly in Browser

1. Simply open `index.html` in your web browser
2. Navigate between pages using the navigation menu

### Option 2: Local Development Server

For a better development experience with live reloading:

**Using Python:**
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

**Using Node.js:**
```bash
npx http-server
```

**Using PHP:**
```bash
php -S localhost:8000
```

Then visit `http://localhost:8000` in your browser.

## Features

### Design
- **Responsive Design**: Mobile-first. 768px and 1024px are the intended breakpoints; the
  sheets carry ten in practice, listed in CLAUDE.md. Verify at 390 / 768 / 901 / 1024 / 1440
- **Accessible**: WCAG 2.1 Level AA compliance goals
- **Professional Branding**: Custom color palette built on black forest, floral white, and azure mist
- **Modern UI**: Clean, minimal design with smooth transitions

### Functionality
- **Contact Form**: Client-side validation with real-time feedback, submitted via EmailJS
- **Smooth Scrolling**: Enhanced navigation experience
- **Cross-browser Compatible**: Tested on Chrome, Firefox, Safari, Edge

## Deployment

The site is deployed to **Cloudflare Pages**.

1. **Connect** the repository as a Cloudflare Pages project
2. **Build settings**: none. This is a static site with no build step, so leave the build command empty and serve the repository root
3. **Configure**: Set the `EMAILJS_PUBLIC_KEY`, `EMAILJS_SERVICE_ID`, and `EMAILJS_TEMPLATE_ID` environment variables so the contact form can send
4. **Custom Domain**: Add your domain in the Pages project settings

Headers are served from `_headers` at the repository root.

See `docs/DEPLOYMENT.md` for detailed deployment instructions.

## Contact Form

The contact form submits through **EmailJS** (`emailjs.send()` in `js/main.js`), using the browser SDK loaded from a CDN in `contact.html`. Fields are Name, Email, Organization / Company, Subject, and Message. Features include:
- Required field validation
- Email format validation
- Real-time error messages on blur

Credentials live in the `EMAILJS_CONFIG` object at the top of `js/main.js` and are intended to be replaced at build time via the Cloudflare Pages environment variables `EMAILJS_PUBLIC_KEY`, `EMAILJS_SERVICE_ID`, and `EMAILJS_TEMPLATE_ID`.

To use a different form backend, replace the `emailjs.send()` call in the contact form's submit handler in `js/main.js`.

## Browser Support

- Chrome (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Edge (latest 2 versions)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Development

### File Organization

- **HTML**: Semantic HTML5 markup with clear commenting
- **CSS**: Organized by component with CSS variables for theming
- **JavaScript**: Modular functions with clear documentation

### Making Changes

1. **Content Updates**: Edit HTML files directly
2. **Styling Changes**: Modify `css/styles.css` (uses CSS variables for consistency)
3. **Functionality**: Update `js/main.js`

### Testing Checklist

Before deployment:
- [ ] Test all pages in multiple browsers
- [ ] Verify responsive design on mobile devices
- [ ] Test contact form validation
- [ ] Check all navigation links
- [ ] Verify images load correctly
- [ ] Run HTML/CSS validators
- [ ] Test accessibility with screen reader

## Documentation

Two different things live under `docs/`, and the distinction matters:

- **`docs/*.html` is the live documentation site.** Fourteen pages, served at
  `pandocore.io/docs/`, linked from every page's navigation. Edit these when the product
  changes.
- **`docs/*.md` are historical planning documents** (`FILE_STRUCTURE.md`,
  `CONTENT_REQUIREMENTS.md`, `MESSAGING_GUIDELINES.md`, `DESIGN_SPECIFICATIONS.md`,
  `DEPLOYMENT.md`, `EMAILJS_SETUP.md`, `IMPROVEMENTS.md`,
  `PROFESSIONAL_DESIGN_IMPROVEMENTS.md`). They record how the site was planned and are not
  maintained. **Do not read them as current guidance.**

The guidance that is current lives at the repository root:

- **`CLAUDE.md`** - working rules: stack, CSS conventions, scope discipline, git workflow
- **`PRODUCT.md`** - who the site is for, positioning, and the copy constraints that bind
  every published claim
- **`DESIGN.md`** - the design system
- **`PHASE1-MARKERS.md`** - claims that are pending, withdrawn, or blocked on a release

## Key Design Principles

1. **IP Protection**: Content carefully crafted to avoid revealing proprietary information
2. **Professional Credibility**: Establish trust through expertise and transparency
3. **Minimal & Clean**: Avoid clutter, focus on essential content
4. **Accessibility**: Follow WCAG guidelines for inclusive design
5. **Performance**: Fast loading with optimized assets

## Color Palette

Defined as CSS variables in the `:root` block of `css/styles.css` — always reference the variable, never a raw hex value.

- **Black Forest** (`--black-forest`): `#001C06` - Primary brand color; nav, headings, borders
- **Floral White** (`--floral-white`): `#F7F4EB` - Warm background for alternating sections
- **Amber Honey** (`--amber-honey`): `#DF9F15` - Accent color
- **Coffee Bean** (`--coffee-bean`): `#1F1102` - Body text color
- **Azure Mist** (`--azure-mist`): `#E1F0F4` - Primary button fill and CTA band backgrounds
- **White** (`--white`): `#FFFFFF` - Default page and section background

Also defined: `--error-red` and `--success-green` for form states, plus a `--charcoal` legacy alias still referenced in some markup. Spacing, typography, radius, and transition tokens live in the same `:root` block.

## Performance Optimization

### Before Production:
1. Compress images (using imagemin, TinyPNG, etc.)
2. Minify CSS and JavaScript
3. Enable GZIP compression on server
4. Test with Google PageSpeed Insights

### Current Status:
- Images: Optimized PNG format
- CSS: Single stylesheet, organized for performance
- JavaScript: Minimal dependencies, efficient code
- Static Files: No server-side processing required

## Security

- No sensitive data in client-side code
- Form validation both client and server-side
- HTTPS enforced on deployment
- Security headers configured (see DEPLOYMENT.md)

## Maintenance

### Regular Tasks:
- **Weekly**: Check form submissions
- **Monthly**: Review content, test functionality
- **Quarterly**: Update dependencies, refresh content
- **As Needed**: Address issues, implement improvements

## Support

For questions or issues:
1. Review documentation in `docs/` directory
2. Check browser console for JavaScript errors
3. Validate HTML/CSS at w3c.org validators
4. Test in different browsers and devices

## License

All rights reserved. © 2026 PandoCore Inc.

This technology is subject to pending patent applications. All proprietary information is confidential.

---

## Quick Commands Reference

```bash
# Local development server
python -m http.server 8000

# Validate HTML
# Visit: https://validator.w3.org/

# Validate CSS  
# Visit: https://jigsaw.w3.org/css-validator/

# Test accessibility
# Visit: https://wave.webaim.org/

# Performance check
# Visit: https://pagespeed.web.dev/
```

## Version History

- **v1.0** - Initial website launch
  - Home, About, and Contact pages
  - Responsive design
  - Contact form with validation
  - Professional branding and styling

---

Built with attention to detail, accessibility, and performance.

---
name: PandoCore
description: Runtime threat detection for Kubernetes, for teams facing their first audit. The calm control room.
colors:
  forest: "#001C06"
  honey: "#DF9F15"
  azure-mist: "#E1F0F4"
  floral-white: "#F7F4EB"
  coffee-bean: "#1F1102"
  white: "#FFFFFF"
  error: "#D32F2F"
  success: "#388E3C"
typography:
  display:
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    fontSize: "3.5rem"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "normal"
  headline:
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    fontSize: "2rem"
    fontWeight: 700
    lineHeight: 1.3
  title:
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 600
    lineHeight: 1.3
  body:
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.7
  label:
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    fontSize: "1rem"
    fontWeight: 600
    lineHeight: 1.3
  mono:
    fontFamily: "Monaco, Menlo, Consolas, monospace"
    fontSize: "0.95rem"
    fontWeight: 400
    lineHeight: 1.6
rounded:
  sm: "6px"
  md: "8px"
  pill: "35px"
spacing:
  xs: "8px"
  sm: "16px"
  md: "24px"
  lg: "32px"
  xl: "48px"
  xxl: "64px"
components:
  button-primary:
    backgroundColor: "{colors.azure-mist}"
    textColor: "{colors.coffee-bean}"
    rounded: "{rounded.md}"
    padding: "16px 36px"
  button-secondary:
    textColor: "{colors.forest}"
    rounded: "{rounded.md}"
    padding: "16px 36px"
  button-secondary-hover:
    backgroundColor: "{colors.forest}"
    textColor: "{colors.white}"
    rounded: "{rounded.md}"
    padding: "16px 36px"
  input:
    backgroundColor: "{colors.white}"
    textColor: "{colors.coffee-bean}"
    rounded: "{rounded.sm}"
    padding: "12px 16px"
  surface:
    backgroundColor: "{colors.floral-white}"
    textColor: "{colors.coffee-bean}"
    rounded: "{rounded.md}"
    padding: "36px"
  nav:
    backgroundColor: "{colors.forest}"
    textColor: "{colors.floral-white}"
---

# Design System: PandoCore

## 1. Overview

**Creative North Star: "The Calm Control Room"**

PandoCore's interface is the composed room where nothing is on fire. Runtime security is usually sold with alarm — red dashboards, breach imagery, urgency. This system does the opposite: it is the steady monitoring station that has already absorbed the noise, so the reader feels relief rather than dread. Deep forest green sets a grounded, low-alarm backdrop; a single cool azure note carries the primary action; honey amber appears sparingly, like a status light, never a siren. The mood is quiet expertise — the proof and the restraint do the talking.

Density is low and the register is refined. Surfaces are calm and mostly flat, type is a single disciplined family, and interaction is understated. Warmth is present — the cream and the amber are a deliberate, human counterpoint to cold security tooling — but it is held in check. This system leans slightly cooler than a purely warm palette would: the forest is deepened and cooled toward a near-black instrument backdrop, the azure counterweight carries the action, and amber is rationed. It never tips into cozy, earthy, or "coastal-warm" territory. Warmth is a seasoning, not the dish.

The system explicitly rejects: fear-based security marketing (red alerts, threat imagery), dense enterprise SaaS (jargon walls, feature grids, logo soup), hype-y startup styling (gradient-drenched heroes, unverifiable claims), quantum/AI buzzword mysticism, and the over-warm forest aesthetic the name might invite.

**Audience note (2026-10-05).** The site's primary reader changed from a platform owner adopting runtime security to an engineering leader closing their **first** compliance obligation (SOC 2, ISO 27001, PCI DSS, HIPAA) with no security team. See `PRODUCT.md` → Users. That changes copy, hierarchy and conversion paths; it does **not** change this visual system. The Calm Control Room still holds, and it matters more, not less: a reader under audit deadline is already anxious, and the palette's job is to lower the temperature rather than raise it. Specifically, the compliance framing must not pull the design toward checkbox/trust-badge visual language, framework logo rows, or the red-alert urgency the No-Alarm Red Rule already forbids.

**Key Characteristics:**
- Low-alarm: grounded near-black forest backdrop, no red-alert urgency, calm as the core feeling.
- One cool counterweight: azure mist carries the primary action and keeps the palette from running warm.
- Restraint over decoration: flat surfaces, hairline structure, understated motion.
- Proof-led minimalism: numbers and clear claims, never adjectives or ornament.
- Single-family typographic discipline: Inter across the board, hierarchy by weight and size.

## 2. Colors

A grounded forest-and-cream base, warmed by a single amber accent and cooled by one azure note that carries the primary action.

### Primary
- **Forest** (#001C06): The brand's grounding color — a deep, near-black green, deepened and cooled from its earlier tone to read as a calm instrument backdrop rather than a bright green. Used for the navigation bar, headings, secondary-button outlines, focus rings, and the hero wave motifs. It is the "walls of the control room." (Applied as the CSS `--black-forest` token.)

### Secondary
- **Azure Mist** (#E1F0F4): A cool, pale blue-green. The deliberate counterweight to the palette's warmth and, notably, the fill of the **primary CTA button**. Its coolness is the point: it keeps the system from reading as warm-by-default and gives the main action a calm, un-shouty presence.

### Tertiary
- **Honey Amber** (#DF9F15): The one warm accent and the logo color — a status-light gold. Used sparingly for hover underlines, small icon accents, and moments of emphasis. Never a background, never a siren. The note that once stood here, that amber was overused and needed pulling back, is retired: measured on 2026-11-06, amber-bearing elements total 1.0% of the About page's area against a ≤10% rule. It is now correctly rationed.

### Status inks

The three status hues are brand tokens, sized for borders and fills where the bar is 3:1. Each also has an **ink** variant for the one place it is used as text: a bold 16px title on its own 10% wash, which is not WCAG "large" and therefore needs 4.5:1. Measured on the grounds each actually paints on:

| token | value | ground | ratio |
|---|---|---|---|
| `--honey-ink` | `#8A620C` | docs warning callout, `rgb(252 245 232)` | 5.05:1 |
| `--error-ink` | `#AF2727` | docs danger callout, `rgb(251 234 234)` | 5.75:1 |
| | | contact form status, `rgb(243 224 216)` | 5.24:1 |
| `--success-ink` | `#2D7230` | docs success callout, `rgb(235 244 236)` | 5.25:1 |

The brand tokens they replace measured 2.13:1, 4.28:1/3.90:1 and 3.66:1 respectively. Do not "simplify" an ink back to its brand token; each one regresses a measured failure.

### Muted text is a colour, never an opacity

`--muted-ink` (`#70665C`) is the one way to de-emphasise text. Added 2026-11-07, replacing `opacity` on five elements that measured 2.68:1 (`.ns-empty`), 3.42:1 (`.code-comment`), 3.50:1 (the docs breadcrumb separator, on twelve pages) and 4.07:1 (`.pricing-price-period`), with `.pricing-tier-tagline` sitting on the line at 4.64:1.

`opacity` fades the glyphs against a ground it does not touch, and it compounds down the ancestor chain: `.ns-empty` ran at 0.6 inside a parent at 0.7, so 0.42 of the colour reached the screen. Darkening the token cannot fix it — at a 0.7 chain nothing short of `--coffee-bean` itself clears 4.5:1, which is to say the text cannot be muted at all while an ancestor fades it. The parent fade on `.excluded-ns` was removed for that reason; its dashed border and `excluded` tag already carry the meaning.

Measured as a solid colour, `--muted-ink` holds **5.06:1 at worst** across every ground it paints on (white, the `.code-block` wash, the namespace box, `--floral-white`). Never pair it with an `opacity`.

**Measure contrast from pixels, not from the DOM.** Two probes written against this sheet reported confidently wrong numbers: one walked DOM ancestors for the ground and missed absolutely-positioned siblings; one composited the whole `elementsFromPoint` stack, including the sticky navbar painted *over* the text, and turned light rows black. A third read the focus ring 55ms into a 300ms `transition: all` and reported 1.02:1 on a ring that settles at 16.34:1. Decode a screenshot, and take the foreground from computed `color` times the opacity chain.

### Neutral
- **Floral White** (#F7F4EB): Warm cream. Section and surface backgrounds, form wrappers. Carries the human warmth — used in restraint.
- **Coffee Bean** (#1F1102): Near-black warm brown. Primary body text and on-light UI text. Deliberately retained as a warm ink; the cooling of the system is carried by the forest and by rationing amber, not by neutralizing the text color.
- **White** (#FFFFFF): The base canvas and input fields — the cool ground beneath the cream.
- **Error** (#D32F2F) / **Success** (#388E3C): Reserved strictly for form validation and system state. Red never appears as decoration or as a security-threat motif.

### Named Rules
**The Cool Counterweight Rule.** Azure mist is the palette's balancing note and belongs on the primary action. It is never swapped for a warm fill "to match the brand" — its coolness is what keeps PandoCore from tipping into the over-warm aesthetic.

**The Measure Rule.** `--measure` and `--measure-narrow` are **calibrated, not nominal.**
`ch` is the advance of the digit zero, which in Inter is much wider than the average
lowercase character, so a nominal `70ch` renders about 93 real characters. The tokens are
`56ch` and `52ch`, measured to land prose in the 65-75 character band; every prose block on
the site medians 61-74 at desktop. Do not "restore" them to round numbers, and if the type
family ever changes, re-measure rather than re-deriving them from the nominal figure.

**The Primary Fill Rule, amended 2026-11-02.** Primary was azure-mist fill with a forest
edge, on the stated grounds that it "always reads as the highest-contrast control". Measured,
it did not: the azure fill sat at 1.02:1 against the hero cream and 1.17:1 against the CTA
white, both beneath the 3:1 non-text floor, and because primary and secondary already shared
an identical 2px forest border the only thing separating the two ranks was the label text.
The fill and the text swapped rather than the azure being darkened, which keeps azure as the
brand's accent and puts the contrast in the fill where the rule always intended it. The band
polarity rule above replaces "one rendering everywhere", which could not survive a dark band.

**The One Warm Accent Rule.** Honey amber is used on ≤10% of any screen, as accent only. Its rarity is what makes it read as a status light rather than decoration.

**The No-Alarm Red Rule.** Red (#D32F2F) is confined to form errors. It is forbidden as a threat/alert motif anywhere in marketing surfaces — this brand sells calm, not fear.

## 3. Typography

**Display / Body / Label Font:** Inter (with -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto fallback).

**Character:** One disciplined, neutral-modern sans doing all the work. Hierarchy comes entirely from weight and size, never from a second family. Inter's clarity reinforces the engineer-to-engineer, proof-over-ornament voice.

### Hierarchy
- **Display** (700, line-height 1.1): Hero headline only, and **fluid**: `css/styles.css:709` is `clamp(2.25rem, 1rem + 4vw, 4.25rem)`, which renders 36px at the floor and 68px from 1200px up. Corrected 2026-11-09; this entry previously said "Fixed size with manual mobile step-downs (no fluid `clamp()` today)" at 3.5rem, and all three parts of that were wrong. The ceiling was deliberately raised above `--text-display` because at 3.5rem the page's largest typographic asset rendered at 56px in a column it shared with nothing. Note the consequence: **the index hero does not use `--text-display`**, so that token and its `--font-display` alias describe a size nothing on the site renders.
- **Headline** (700, 2rem, line-height 1.3): Page `h1` and section `h2` headings.
- **Title** (600, 1.25rem, line-height 1.3): `h3` — card and subsection headings.
- **Body** (400, 1rem, line-height 1.7): Paragraph text, capped at ~70ch for readability.
- **Label** (600, 1rem, line-height 1.3): Navigation links, button text, form labels — the UI-text weight.
- **Mono** (400, 0.95rem, line-height 1.6): Code only. `--font-mono`, a Monaco/Menlo/Consolas stack. Never prose.

### Named Rules
**The One Family Rule.** Inter is the only typeface for prose and UI. Never pair it with a second sans or a display serif; if a heading needs more presence, add weight or size, not a new font.

**The one exception, scoped deliberately.** Code gets a monospace stack, because a Helm command, a label selector and an image digest have to be read character by character, and that is the one job a proportional face cannot do. It lives in `--font-mono` and appears only inside `code` and `pre`. This is an exception for legibility, not a licence to introduce a second voice: a monospace face used for headings, labels or body copy is the "mono as shorthand for technical" costume the system rejects elsewhere.

**The Earned-Line Rule.** Body copy stays at or below ~70ch. Long claims get broken into short, scannable lines rather than dense paragraphs — the reader is a busy platform lead skimming for proof.

**The One Spine Rule.** Added 2026-11-06. On a content section, the heading, the prose, the lists and any trailing note all start on the same left edge: the content column's. Section headings are direct children of `.container`, so they take `max-width: var(--content-max-width)` with auto side margins to land on that edge rather than on the container's; trailing notes keep their `--measure` cap and reach the edge with `margin-left: max(0px, calc((100% - var(--content-max-width)) / 2))`, which clamps to flush below ~800px. Before this, index carried ten distinct text left edges at 1440 — headings centred on the page axis 89px right of the column they headed — and product carried twenty-three. Conversion bands are the deliberate exception: inside `.cta-content` the heading, list and buttons are one centred composition and stay centred.

Amended 2026-11-07, then corrected the same day. A page band gets one axis, and the hero is a band. `.page-hero` was briefly switched from centred to left-aligned, with the h1 capped at `--content-max-width`, on the reasoning that a centred band held two axes. That reasoning was wrong: two centred blocks of different widths share one axis, the centre. The two-axis problem only arises between left edges. The left-aligned version also shipped without `margin-left: auto`, so the capped h1 was pinned to the container's left edge rather than centred on the content column. At 1440 that put the headline 176px left of the spine the page body uses, with a 144px left gutter against a 496px right one, on all 14 `.page-hero` pages. Reverted at the owner's call. The hero is a centred band: `text-align: center`, the h1 capped at `--content-max-width`, the subtitle at `--measure`, both with auto side margins, so the two blocks share the viewport's centre axis. The content sections below keep their left spine. A hero and a content section are allowed different compositions, which is the licence `.cta-content` already carried. The index hero stays left-aligned because a visual column balances it; `.page-hero` has no second column, so left-aligning it only opened a void. The h1 is capped at `--content-max-width` and not at `--measure` because `ch` scales with font-size, and 56ch of a 40px heading is about 1100px: the cap would not have capped anything.

A component with its own internal layout is not a spine violation. `.feature-row` was an icon column beside a text column, so its h3 and p started 112px right of the page spine, exactly as a card's contents do. **Decision taken 2026-11-08: the icon column is gone.** Not as a spine fix on its own, but because the markup that used it went: product's rows were in the Security Principles section, which was dissolved, and about.html never had any. `.feature-visual` now appears in no HTML file, index.html holds the only three `.feature-row` elements on the site, and the rule is one column outright rather than a two-column default with a `:not(:has(.feature-visual))` escape hatch. That hatch is worth remembering: a class that exists nowhere makes `:not(:has())` always match, so a dead-CSS sweep that treats "mentions a dead class" as "is dead" deletes exactly the rule holding the page right.

**Rules are drawn to their content, not to their container.** A separator or a bordered box has no character count, so the measure argument that justifies differing prose right edges does not reach it. `.problem-item` is capped at `--measure-narrow` so its `border-top` ends where its text ends; `.docs-callout` is capped at `--measure` plus its padding. Before this, each separator ran 299–308px past the text it divided at 1440, and a 900px callout held ~560px of text.

## 4. Elevation

Target philosophy: **flat by default.** Surfaces rest flat, and depth appears only as a restrained response to interaction (hover, focus). This suits the Calm Control Room — an instrument panel, not a stack of floating consumer-SaaS cards. Warmth and separation are carried by tone (forest, cream, white) and generous spacing, not by chrome.

The current implementation is not yet fully flat: cards use soft, green-tinted ambient shadows (`rgba(0,56,11,...)`) with a `translateY(-6px) scale(1.02)` lift on hover. Treat that as the legacy state to migrate away from — reduce resting shadow toward flat, and let hover raise a single subtle shadow without the scale pop.

### Shadow Vocabulary (transitional)
- **Ambient rest** (`box-shadow: 0 1px 3px rgba(0,28,6,0.06)`): The lightest possible resting separation. Prefer none where tone alone separates the surface.
- **Hover lift** (`box-shadow: 0 10px 25px rgba(0,28,6,0.12)`): A single soft shadow on hover — kept, but without the accompanying `scale()`.

### Named Rules
**The Flat-By-Default Rule.** Surfaces are flat at rest. Shadow is a state, not a texture. If a surface needs a resting shadow to feel separated, fix the tone/spacing first.

## 5. Components

Components are refined and restrained: quiet surfaces, hairline structure, understated states. Nothing shouts.

### Buttons
- **Shape:** Softly rounded (8px radius), 2px border, `16px 36px` padding, `cubic-bezier(0.4,0,0.2,1)` transition.
- **Primary:** **Forest (#001C06) fill with azure-mist (#E1F0F4) text** and a forest edge, so it carries the highest-contrast fill available against its band (16.3:1 on cream, 15.4:1 for the label). On a dark band the pair inverts, azure-mist fill with forest text, for the same reason; `.timing-section` is currently the only such band on the site.
- **Secondary:** Transparent with a forest (#001C06) outline and forest text; on hover it takes an 8% forest wash rather than a fill, so a hovered secondary never renders as a resting primary.
- **Hover / Focus:** A subtle lift and shadow. Migrate away from `scale(1.02)` toward a pure translate. Keyboard focus shows a 2px forest outline with 2px offset.

### Cards / Containers
- **Corner Style:** 8px radius.
- **Background:** Floral white (#F7F4EB) surfaces on a white page ground.
- **Shadow Strategy:** Flat by default per the Elevation section — not the current soft ambient shadow.
- **Border:** Hairline (1px) at low opacity when structure is genuinely needed.
- **Internal Padding:** 36px (`lg`+).
- **Usage:** Reserve cards for genuinely bounded, comparable objects — **pricing tiers are the canonical valid use.** Narrative sections (the three pains, "who needs this") should use typographic lists, alternating feature rows, or full-width blocks instead. The uniform icon + heading + text 3-card grid is prohibited (see Don'ts).

### Inputs / Fields
- **Style:** White fill, 2px floral-white border, 6px radius, `12px 16px` padding.
- **Focus:** Border shifts to forest (#001C06); the default browser outline is removed in favor of the border shift.
- **Error:** Border/message uses error red (#D32F2F) — the only place red belongs.

### Navigation
- **Style:** Sticky forest (#001C06) bar, floral-white logo and links, soft drop shadow beneath, z-index 1000 (sticky tier).
- **States:** Links lighten/underline on hover; the active link is marked. The "Sign Up" link is the visually distinct nav CTA.
- **Mobile:** Collapses to a hamburger toggle with an overlay panel.

### Signature: The Grove Hero Graphic
An abstract SVG constellation of workload nodes — each wrapped in its own azure "learned-normal" envelope — woven into one connected organism whose roots converge on a single Core node. It makes the name literal (Pando is one aspen grove sharing a single root system) and reuses the interconnected-root vocabulary from the About page. Each node breathes slightly, staggered across phases so it shimmers organically rather than pulsing in unison. Keep it abstract, cool, and nearly still; it must respect reduced-motion (all node motion disabled).

## 6. Do's and Don'ts

### Do:
- **Do** keep the primary action azure mist (#E1F0F4) — the cool counterweight belongs on the CTA.
- **Do** use honey amber (#DF9F15) as a rare accent (≤10% of a screen), never as a fill or background.
- **Do** default to flat surfaces; let shadow be a hover/focus state, not a resting texture.
- **Do** carry narrative sections with typographic lists, alternating feature rows, or full-width blocks.
- **Do** use cards only for bounded, comparable objects — pricing tiers are the valid case.
- **Do** hold hierarchy in Inter alone, using weight and size.
- **Do** keep body copy ≤70ch and lead with proof (numbers, plain claims) over adjectives.
- **Do** provide a reduced-motion alternative for every animation (waves, grove node breathing, hover lifts).

### Don't:
- **Don't** use fear-based security cues: red-alert dashboards, breach/threat imagery, urgency. Red (#D32F2F) is for form errors only.
- **Don't** ship the uniform icon + heading + text 3-card grid — it's the AI-slop tell; use a non-card layout instead.
- **Don't** let the palette run over-warm: no additional cream/tan/earthy tones, and never swap the azure CTA for a warm fill. The forest name is not license for a cozy aesthetic.
- **Don't** build dense enterprise-SaaS surfaces: no jargon walls, endless feature grids, or logo soup.
- **Don't** use hype-y startup styling: no gradient-drenched heroes, no unverifiable claims, no exclamation energy.
- **Don't** lean on "quantum" or "AI-powered" buzzword/sci-fi mysticism to signal sophistication.
- **Don't** build compliance-theater visuals: framework logo rows, badge/seal clusters, checkbox-grid "coverage" graphics, or progress meters implying an audit is being passed. The compliance-first audience makes this the nearest trap. Control mappings live in the `/product#compliance` table, as a table, and nowhere else.
- **Don't** pair Inter with a second typeface or use gradient text (`background-clip: text`).
- **Don't** rest surfaces on soft ambient shadows or add `scale()` hover pops — they read as consumer SaaS.

## 7. Known and Deliberate

Recorded 2026-11-06, after two full-site reviews raised each of these as a finding. They are decisions, not oversights. Disagree with the decision if you like, but do not report them as defects.

- **`trust/index.html` carries no site nav and no footer, on purpose.** It is served from a separate subdomain (`trust.pandocore.io`) and routes home through its wordmark. Adding the shared chrome would deepen the page's dependence on root-absolute assets served by a host whose asset serving is not verified from this repo. The site-wide footer's single link, identical on all 29 other pages, points here.
- **Inter is the only typeface, and that is the system working.** `single-font` and `overused-font` fire on all 30 pages. Section 1 mandates single-family typographic discipline and section 6 forbids pairing a second face.
- **`em-dash-overuse` is a false positive wherever it fires.** The rule matches `--` as well as `—`. Verified by byte scan on 2026-11-06: zero U+2014 characters anywhere in the tree. Every hit is a Helm or kubectl flag (`--set`, `--namespace`, `--insecure-ignore-tlog=true`) or the `-----BEGIN PUBLIC KEY-----` armour on the trust page.
- **`docs/webhook.html` is far shorter than its siblings because it is a tombstone.** It documents the retired admission webhook: what replaced it, and where to go instead. The length is correct.
- **Prose is capped at `--measure` while code blocks and tables run to the 900px `.docs-content` cap.** Differing right edges down a page are the measure working rather than a layout inconsistency: `ch` scales with font-size, so one uniform 56ch cap renders at different pixel widths per type size while holding the same character count. Amended 2026-11-06: this covers *prose*, and only prose. It does not license a separator rule, a bordered container or a heading axis to disagree with the text it belongs to — those have no character count, and all three were fixed under the One Spine Rule in section 3. A review that cites this entry for anything other than two paragraphs ending at different x is citing it wrongly.
- **`/pricing` ranks Free as the primary CTA and Growth as secondary, on purpose.** "Start free" is the primary call to action on every page of the site, so the Free card carries `btn-primary` and Growth and Enterprise both carry `btn-secondary` reading "Let's Talk". A review will read this as an inversion, because the Recommended tier is the one wearing the quieter button. It is not: the funnel is self-serve signup first, and the paid tiers are issued by hand against an invoice, so the paid CTA is a conversation and is styled as one. Recorded 2026-11-07 after a third review raised it. What *was* a real defect, and is fixed, is that the two "Let's Talk" buttons shared one label and one URL with nothing to tell them apart; they now carry distinct `aria-label`s naming their tier.
- **Blog posts predating November 2026 keep their retired, sidecar-era figures.** They are history, each carries a dated addendum saying the numbers were withdrawn from marketing on 2026-11-01, and `blog/index.html` says so above the grid. They must not be edited to match current figures, and their numbers must not be laundered back into marketing.
- **Heading register: sentence case on prose pages, Title Case for docs section headings.** Decided 2026-11-08, after a census rather than from an impression. Nothing in this repo had ever recorded a convention, so this is the first time one is written down; a plan for this work described Title Case as a settled site-wide decision, and no such decision exists in DESIGN.md, CLAUDE.md or PRODUCT.md. What the census found across 185 headings on 24 pages: h2 ran 100 Title to 25 sentence, h3 ran 46 sentence to 12 Title, marketing h3 was unanimously sentence, and the blog and trust centre were sentence throughout at every level. The idea that sentence case was simply the newest copy is wrong: the July blog posts use it too. So the split was never recency, it was genre, and each genre was already internally consistent. The rule now written down is the one the site was already mostly following, with the 21 exceptions fixed: **marketing, blog and the trust centre are sentence case at every level; `docs/*.html` keeps Title Case for h2 section headings and sentence case for h3 subsections.** Three docs h3s stay capitalised because they are page names, not sentences, and have to match the sidebar and the h1 they point at: Getting Started, Operating Modes, Emergency Procedures. Docs h2s were deliberately left alone: converting 87 of them buys consistency a reader does not notice, and a trial conversion lowercased `Ignore` in "What Ignore costs", which is a `failurePolicy` literal and not an English word. Heading slugs are lowercased before they are written, so changing register changes no id and breaks no link; `docs/search-index.json` stores heading text and does need regenerating, which `--check` catches.

- **Docs search matches whole words below five characters, and that asymmetry is deliberate.** Decided 2026-11-09. The ranker was unbounded substring, so `arm` returned eighteen matches drawn from *warm*, *armed* and *disarms*, and `SOC` returned the word *socket*. Terms of four characters or fewer now have to hit a whole word; five or more keep substring matching, which is what makes `helm install` and `evidence format` work. Prefix-at-word-start runs only as a second pass when the first finds nothing, which keeps `isol` working without reopening `SOC`. A short acronym is the shape this audience types, so the short end of the range is where precision matters and the long end is where recall does. Note what the fix did not do: the false `SOC` hit was in body text, not in a heading, so no reader ever saw "soc" highlighted inside "socket". The visible defect was the confident absence, not a visible mismatch.
- **The search reports the true match count and displays twelve.** The status line read "12 results" whenever twelve or more records matched, because the list was sliced before the count was taken. It now reads "12 of 50 matches" when truncated and "9 results" when not. This is why five rounds of functional search testing passed while the defect shipped: every test query happened to have twelve or more genuine hits, so the truncated count and the true count agreed.
- **A `KEYWORDS` map in the index generator, because the frameworks are absent from the docs.** "SOC 2", "ISO 27001", "PCI DSS" and "HIPAA" appear zero times across all fourteen docs pages, while the homepage names each one four times. Rather than write new docs copy on the site's most claim-sensitive subject, the generator emits one synthetic record per keyworded page whose haystack is the keywords and whose displayed heading is the page's real `h1`. **Keywords are matchable and never displayed as page text.** Two things were deliberately not seeded, and the reasoning is the point: `ARM64` has no page to map to, because no docs page states a CPU architecture at all and the real answer lives only in the `pandoCore` tree, so seeding it would have pointed a confident answer at a page that does not contain one; and `price` cannot be served from this index at all, because "Pricing" appears only in the nav and footer, outside `main.docs-content`. Both want one sentence of real docs copy first.
- **The "On this page" disclosure is closed at every width; the sidebar's own disclosure is open above 1023. The asymmetry is the decision.** Both are `<details>` built by `js/main.js`, and the TOC used to copy the sidebar's open-when-wide default. Measured, that cost a full screen: the open panel ran 332 to 1300px and pushed the first `h2` to a median of 1247px across the thirteen docs pages that carry one, 1667px on `/docs/faq`. Closed, the median is 825px and faq's first heading is at 461px. The summary carries the count ("On this page · 32 sections") so the closed state still says what is inside. The sidebar is different because it is the only way to reach the other thirteen pages, while the TOC duplicates headings the reader is about to scroll past anyway.
- **The docs sidebar is a flex column whose link list scrolls, so the signup CTA is always on screen.** The whole sidebar was one scroll container with `max-height: calc(100vh - var(--nav-offset) - 20px)`, which put `.docs-sidebar-cta` 1038px down it and therefore invisible at 768, 800, 900, 1000 and 1080px of viewport height, which is every common laptop. Dropping the `max-height` was measured and is worse, not better: a 1022px sticky box pinned at `--nav-offset` can never show its own bottom, which left six targets reachable by nothing at all at 1024x768. The sidebar is now `display: flex; flex-direction: column` with `overflow-y: auto` moved to `.docs-nav-disclosure`, so the list yields height and the CTA sits below it on screen at any height. `overflow-y` stays on the sidebar as well, because search results reach 1018px on a twelve-hit query; it is simply inert at rest now, where `scrollHeight` equals `clientHeight`. **The honest limit**: all fourteen links cannot be visible at rest at 1024x768 under any arrangement, because the list needs 1022px against a 636px slot. "Reachable" there necessarily means by some scroll, the page's or the container's.
- **`display: block` no longer strips native table semantics in Chrome, so the compliance table's ARIA roles can no longer be justified by measurement there.** Chrome 157, measured 2026-11-09: removing every `role` attribute from the table and its descendants at 390px left `row` at 15, `rowheader` at 15 and `cell` at 30 unchanged, and only `rowgroup` collapsed from 4 to 0. **Keep the roles.** Other engines have historically stripped them, `rowgroup` genuinely depends on them here, and the `data-label` substitution at 767 and below is complete and does reach the accessibility tree. But the reason recorded in older plans and reviews, that the roles are load-bearing because the display switch strips semantics, is no longer demonstrable in Chrome, and a future review should not cite a Chrome measurement as proof either way.
- **`.pt-xxl-lg` is dead above 1024px.** It sets `padding-top: calc(var(--spacing-xxl) * 1.5)`, which should be 96px, but `@media (min-width: 1024px) .content-section { padding: 80px 0 }` has equal specificity and comes later in the sheet, so the shorthand wins and the computed value is 80px. `about.html` is the only user. Seventh instance of this sheet's equal-specificity source-order trap, and recorded here so the eighth is recognised faster.

- **The heading register rule covers h2 and h3. Page and article titles stay headline-cased.** Amended 2026-11-09, correcting the entry above it. The rule as first written said marketing, blog and the trust centre are "sentence case at every level", and the site contradicts it at h1: all eight blog post titles are Title Case ("We're Dropping Sidecars in Favor of a Node Sensor", "The Rules We Use to Define False Positives"), as are `blog/index.html`'s "PandoCore Blog" and `trust/index.html`'s "Trust Center". The cause was a sampling error, not a drift: the census that produced the rule counted **h2 and h3 only**, so h1 was never in the data the rule was derived from. Article and page titles are conventionally headline-cased, and these read correctly as they are, so the rule is what was wrong. **Sentence case applies to h2 and h3 on marketing, blog and trust pages; h1 is a title and takes Title Case.** This is the same reasoning already recorded for the three docs h3s that stay capitalised because they are page names rather than sentences.

- **Non-text contrast: component boundaries clear 3:1, decorative hairlines do not have to.** Decided 2026-11-09 after a sweep measured 284 of 906 non-text elements below 3:1, deterministic across two runs. The split is by function, not by ratio. **Raised**, because each is the only visual boundary of a control: `.docs-search-input` 1.74:1 to **3.48:1**, `.docs-pager a` 1.37:1 to **3.48:1** resting and 3.78:1 hovered, and `.docs-callout.info` 1.17:1 to **3.70:1**, which had essentially no visible edge at all. All three use `--border-field`, not `--muted-ink`: that token's own `:root` comment already records this decision for form fields, `.contact-form input` already uses it, and section 2 scopes `--muted-ink` to de-emphasising **text**. `--muted-ink` was measured as the alternative at 5.61:1 and rejected as heavier than the system needs. **Deliberately left below 3:1**: the `.docs-content th`/`td` gridlines at 1.37:1, because a table's gridlines are not required to understand its content, which lives in the cells with the alignment and the dark `th` band carrying the structure, and darkening them makes every docs table heavier for no accessibility gain; `summary.docs-sidebar-title` at 2.10:1; and `.docs-callout.warning` at 2.31:1, since every callout carries a background tint plus a bold status-ink title at a measured 5.05 to 5.75:1, so no callout's meaning rests on its border. A review that reports the gridlines as a defect is citing a ratio without the function.
- **The docs search matches `s` and `es` on short terms, and deliberately not `ing` or `ed`.** Amended 2026-11-09. The whole-word rule for terms of four characters or fewer fixed `arm` matching *warm* but made inflections unreachable: `cost` could not reach the heading "What This Costs Per Node" while `costs` ranked it first. The obvious fix, allowing `s`, `es`, `ing` and `ed`, was measured and **breaks the original fix**: it takes `arm` from 3 hits to 9, and all six extras match on nothing but **`armed`**, which is this product's own word for an enforcing sensor. `ing` does the same through `arming`. So the set is `s` and `es` only, which delivers the whole goal (`cost` 2 hits to 7 with the right heading at rank 1, `log` 8 to 22) and costs nothing, because `costing`, `costed` and `logged` reach 0 to 1 records that were already reachable. The lesson generalises: this product's vocabulary overlaps English inflections, so a suffix rule has to be measured against the index rather than reasoned about.
- **A leading ordinal confers no ranking advantage.** `docs/production-hardening.html` numbers its h2s `1.` to `11.`, and the tie-break sorted headings with `localeCompare`, which orders digits before letters. Measured: numbered headings were 10.1% of the index but took rank 1 on **18.3%** of queries and made up 13.3% of displayed results. `sortKey()` now strips `/^\d+\.\s*/` before comparing, which brings those to **12.7%** and 11.0%, against the honest 10.1% index share. Two first results changed for the better and were accepted: `policy` moved from "9. Use CRD Policy For Anything Non-Trivial" to **"Full Policy Reference"**, and `clusterrole` from "10. Understand What The Sensor Runs As" to "Controller". The alternative, sorting by depth then page order, measured slightly better and was rejected because it makes page order a ranking signal.
- **The sidebar reveal scrolls the active link to a third up from the bottom, and one third down is counter-intuitively worse.** The link list is **812px inside a 409px scrollport**, so only 7 of 14 links fit and raising a link *inside* the port requires scrolling *further down* it. A change made to "keep context above the link" by targeting one third down therefore hid **more** above, not less: measured over the 14 docs pages at 1024x768, links hidden above the fold went 28 at the nearest edge to **51** at one third down, against **35** at two thirds. Two thirds is what ships. It costs 7 more hidden-above than the nearest edge and buys back the real defect, which was the active link sitting flush against the bottom edge on 8 of the 14 pages and reading as the end of the list. Repositioning also only fires when the link is not already fully visible; without that guard, six pages whose whole list top was visible got scrolled for no gain.
- **The sidebar's scroll cue is a mask, and `:not(:focus-within)` on it is load-bearing.** The scrollport reserves 0px of gutter, so on overlay-scrollbar systems nothing indicates hidden content. `has-scroll-above` and `has-scroll-below`, toggled from `js/main.js` with a 1px tolerance because those edges are fractional, drive a 28px `mask-image` fade on the matching edge. The `:not(:focus-within)` guard is not caution: a mask clips to the border box, and `.docs-nav a` is full-width with a ring at `outline-offset: 2px`, so with the guard defeated a focused link 8px down the scrollport had its ring measured at **1.37:1, no visible indicator**, on two separate links. Do not remove the guard to simplify the selector.
- **`/trust/`'s code blocks wrap where every other block on the site scrolls.** The page ships zero JavaScript on purpose, so it has no copy button, and `overflow-x: auto` made the `cosign verify` command **44% unreachable at 1440 and 74% at 390** with no painted scrollbar, hiding the image digest, which is the one string a sceptical reader came for. `.trust-page pre` now sets `white-space: pre-wrap` and `overflow-wrap: anywhere`, taking both blocks to zero horizontal overflow at all five widths; the PEM key block was overflowing 276px at 390 too. `text-indent: 4ch hanging each-line` hangs the soft-wrapped continuations so a wrapped command does not read as two commands, and it is a **progressive enhancement**: support outside Chrome is unconfirmed, and an engine that does not parse the keywords drops the declaration and renders a correct, fully readable, overflow-free flush-left wrap. `padding-left` with a negative `text-indent` was measured and does not work here, because a `pre`'s newlines are forced breaks inside one block rather than new blocks, so plain `text-indent` reaches only the first line.
- **The sidebar's link rings need 4px of breathing room inside the scrollport, and `scroll-padding` is the part that matters.** `.docs-nav-disclosure`'s `overflow-y: auto` forces `overflow-x: auto`, which makes it a scrollport that clips paint at its padding box; `.docs-nav a` is exactly the content width, so the ring's 4px overshoot at `outline-offset: 2px` fell on the clip line and the **left and right segments were never painted, on every link, at every scroll position**. Measured 0 of 14 links showing all four sides, before. The fix is `padding: 4px; margin: -4px; scroll-padding: 4px` on the scrollport: the pair moves the clip line out and takes the same space back, so nothing visible moves (the shared left edge holds at 77px at 1440 and 57px at 1024 and 390 across the links, the search field, the CTA and the summary rule), and `scroll-padding` stops Tab parking a link flush against an edge, which is where the outer segment was lost. After: **14 of 14, all four segments, 16.34:1**. The alternative of putting a margin on `.docs-nav a` was measured and rejected: it shifts the link text 4px out of agreement with its siblings and fixes only the horizontal axis. **One residual, accepted:** wheel-scrolling to within ~4px of the top edge with a link focused still clips that link's 2px outer top segment, roughly 4px in every 52px of scroll offset, leaving three segments at full contrast. Padding cannot close it because padding scrolls away; only an inset ring could, and that needs a second rule to keep the active link's ring visible over its forest pill.
- **`.page-hero` holds a headline and a subtitle, and no call to action. Decided 2026-11-09 by the owner, after trying the opposite.** `/product`'s hero was given a Start free / See the controls pair to fix a finding that the page offered no action for 3,377px. It had to come out. The hero's `.wave-container` is anchored to the hero's bottom edge and rises 175px into it, while the hero's own bottom padding is 100px at 1024 and up and 120px below, so a button row placed in that band sits on the crest. A `:has(.cta-actions)` clearance rule was written, measured and then reverted: it pushed the painted crest 41 to 101px clear at every width from 360 to 1920, and the buttons still read as sliced, because the wave's **faint leading edge** arrives well above the body of the wave and crossed them anyway. The decisive argument was not the wave at all: `/pricing`, `/contact` and `/404` all carry a headline and a subtitle alone, so buttons in a `.page-hero` were out of place to begin with. **The cost, stated so it is not rediscovered as a defect:** on desktop `/product`'s first action is back at 3,387px. On phones the sticky `#mobile-cta-bar` reappears at scroll 0, because it hides itself only while a real in-page CTA is on screen, so mobile keeps an immediate action and desktop does not. If a CTA ever belongs in a `.page-hero` again, the clearance arithmetic above is the starting point, and the thing to measure is the faint leading edge rather than where the wave becomes solid.

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
- **Honey Amber** (#DF9F15): The one warm accent and the logo color — a status-light gold. Used sparingly for hover underlines, small icon accents, and moments of emphasis. It is currently overused across the site and should be pulled back to true accent duty. Never a background, never a siren.

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
- **Display** (700, 3.5rem, line-height 1.1): Hero headline only. Fixed size with manual mobile step-downs (no fluid `clamp()` today).
- **Headline** (700, 2rem, line-height 1.3): Page `h1` and section `h2` headings.
- **Title** (600, 1.25rem, line-height 1.3): `h3` — card and subsection headings.
- **Body** (400, 1rem, line-height 1.7): Paragraph text, capped at ~70ch for readability.
- **Label** (600, 1rem, line-height 1.3): Navigation links, button text, form labels — the UI-text weight.
- **Mono** (400, 0.95rem, line-height 1.6): Code only. `--font-mono`, a Monaco/Menlo/Consolas stack. Never prose.

### Named Rules
**The One Family Rule.** Inter is the only typeface for prose and UI. Never pair it with a second sans or a display serif; if a heading needs more presence, add weight or size, not a new font.

**The one exception, scoped deliberately.** Code gets a monospace stack, because a Helm command, a label selector and an image digest have to be read character by character, and that is the one job a proportional face cannot do. It lives in `--font-mono` and appears only inside `code` and `pre`. This is an exception for legibility, not a licence to introduce a second voice: a monospace face used for headings, labels or body copy is the "mono as shorthand for technical" costume the system rejects elsewhere.

**The Earned-Line Rule.** Body copy stays at or below ~70ch. Long claims get broken into short, scannable lines rather than dense paragraphs — the reader is a busy platform lead skimming for proof.

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

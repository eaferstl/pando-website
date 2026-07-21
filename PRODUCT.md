# Product

## Register

brand

## Platform

web

## Users

The primary reader is a Director of Platform Engineering (or equivalent — Head of Platform, platform-eng lead): the person who owns the Kubernetes platform charter and, by extension, owns whatever runs in the cluster — including runtime security — often without a dedicated security team to hand it to. Their context is evaluation under pressure: runtime security has landed on their team as an unfunded mandate, and they need coverage that their platform engineers can actually operate. They are the buyer and champion; the messaging is built to win them.

The hands-on platform engineers on that team are the technical validators. They are the ones who would deploy the sidecar and feel "one label, done," so the site must satisfy their scrutiny on how fast it installs and how little it touches — but they are not the primary reader.

This is deliberately not aimed at standalone security / SOC teams or compliance buyers. PandoCore competes in the runtime-security category (against Falco, Sysdig, Tetragon) but sells to the platform owner, not the security org. Category is the competitive set; the platform Director is the buyer.

## Product Purpose

PandoCore is autonomous runtime defense for Kubernetes: a sidecar that learns each workload's normal behavior and flags deviations, with no rules or policies to write. Deploy it with a single label and it starts working immediately, catching runtime anomalies that rule-based tools miss without custom rules. It exists because rule-based runtime security forces teams to anticipate every attack and buries them in false positives — a tax platform teams can't staff for. PandoCore replaces that with behavior-learned detection tuned per workload, so a platform team can own runtime security without a SecOps function. Success looks like a platform Director signing their team up and deploying the sidecar into a real cluster.

## Positioning

Runtime security a platform team can actually own: PandoCore learns your workload's normal behavior and catches what rule-based tools miss — no rules to write, effectively zero configuration, and almost no false-positive noise.

## Conversion & proof

- Primary CTA: self-serve sign up (portal.pandocore.io/signup, labeled "Get Started"; nav keeps "Sign Up"). Secondary fallback: get in touch / contact, for visitors with questions before committing.
- The line a visitor remembers after 10 seconds: autonomous runtime defense for Kubernetes — no rules to write.
- Belief ladder: (1) runtime security has landed on my platform team and rule-based tools are a rules-writing tax I can't staff for; (2) they also bury my team in false positives — alert fatigue is real and it slows response; (3) detection that learns normal behavior kills the noise, cuts MTTR, and catches novel threats that rules miss; (4) PandoCore does this with one label and no config, so my engineers can own it on our existing cluster; (5) the results are trustworthy — validated at scale, with a very low false-positive load; (6) I can start now, self-serve.
- Value pillars, persona-agnostic and told to the platform owner: kill alert fatigue → cut MTTR → catch novel threats.
- Proof on hand: validation at scale (5,000+ pod-hours) and a low false-positive load, currently stated on the site as a sub-0.005% rate. That figure is being reframed site-wide to "under 5 false positives per day" to remove the denominator question. No customer testimonials, case studies, or logos exist yet; the validation metric is the main proof point for now.

## Brand Personality

The quiet expert in the room. The dominant move is subtraction — confidence shown through how little the user has to do ("no rules to write", "zero configuration", "one label"), not through adjectives or hype. Claims are earned with evidence rather than asserted. The tone stays calm about a genuinely serious domain: this sells relief from noise, not fear. It should feel approachable and refreshingly straightforward — a busy platform Director should feel they instantly get it, and their engineers should trust it on inspection. Allow a hair of dry humor to lighten the weight, never at the expense of credibility. The tagline "Autonomous Runtime Defense" stays fixed.

On warmth: the current palette (forest green, honey amber, cream) is deliberately warmer than competitors, and that human warmth is a real differentiator — but the site currently runs too warm and should be cooled a notch. Warmth is a seasoning, not the dish.

## Anti-references

- Fear-based security marketing: red-alert dashboards, breach/threat imagery, scare tactics. The opposite of the calm this brand wants.
- Dense enterprise SaaS: jargon walls, endless feature grids, logo soup.
- Hype-y startup: gradient-drenched heroes, huge unverifiable claims, exclamation energy.
- Buzzword / quantum mysticism: leaning on "quantum" or "AI-powered" sci-fi framing to sound advanced.
- Over-warm forest aesthetic: the name PandoCore evokes Pando the aspen grove, but the design must not tip into cozy, earthy, or heavily-warm territory.

## Design Principles

Confidence through subtraction — lead with how little the user has to do, not with feature lists. Proof over adjectives — every claim earns its place with evidence, and no claim ships that can't be defended. Calm, not fear — sell relief from noise in a domain usually sold with alarm. Refreshingly straightforward — optimize for instant comprehension by a busy platform Director over completeness, while standing up to an engineer's scrutiny. Cooled warmth — keep the human, non-clinical warmth that sets PandoCore apart, but hold it in restraint so it never reads as cozy or off-brand.

## Accessibility & Inclusion

Target WCAG 2.1 Level AA: sufficient contrast (body text ≥4.5:1), full keyboard navigation, semantic markup, and a reduced-motion alternative for the site's wave and orbit animations.

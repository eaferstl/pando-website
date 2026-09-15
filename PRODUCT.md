# Product

## Register

brand

## Platform

web

## Users

The primary reader is a Director of Platform Engineering (or equivalent: Head of Platform, platform-eng lead): the person who owns the Kubernetes platform charter and, by extension, owns whatever runs in the cluster, including runtime security, often without a dedicated security team to hand it to. Their context is evaluation under pressure: runtime security has landed on their team as an unfunded mandate, and they need coverage that their platform engineers can actually operate. They are the buyer and champion; the messaging is built to win them.

The hands-on platform engineers on that team are the technical validators. They are the ones who would deploy the sidecar and feel "one label, done," so the site must satisfy their scrutiny on how fast it installs and how little it touches, but they are not the primary reader.

This is deliberately not aimed at standalone security / SOC teams or compliance buyers. PandoCore competes in the runtime-security category (against Falco, Sysdig, Tetragon) but sells to the platform owner, not the security org. Category is the competitive set; the platform Director is the buyer.

**Open question, raised September 2026 and not resolved.** The Phase 1 positioning leads with control mappings (SOC 2, ISO 27001, PCI DSS) and an eleven-row compliance table, which is compliance-buyer content, while this section says the site is deliberately not aimed at compliance buyers. The defensible reading is that the platform Director is still the buyer and the compliance mapping is ammunition they carry into an audit conversation they did not ask for. If that is the intent, this section should say so. If the persona has actually widened, that is a larger decision than a copy change and the rest of this file follows from it.

## Product Purpose

PandoCore is runtime threat detection for Kubernetes: it learns each workload's normal behavior, flags deviations with no rules or policies to write, and produces a signed evidence record for each detection. It exists because rule-based runtime security forces teams to anticipate every attack and buries them in false positives, a tax platform teams can't staff for. PandoCore replaces that with behavior-learned detection tuned per workload, so a platform team can own runtime security without a SecOps function. Success looks like a platform Director signing their team up and deploying into a real cluster.

Architecture, as of September 2026: the sensor is a per-pod sidecar, deployed with one label via the `pando-webhook` chart, and that remains the default install. A cluster controller (`pando-controller`, unprivileged, no Kubernetes API access) is available alongside it and owns durable evidence delivery. An optional privileged node agent (`pando-enforcer`, hostPID, not GKE Autopilot compatible) is unreleased and staging-only. The sidecar is not being deprecated. Marketing pages describe the target architecture; `docs/` describes what ships today, and that split is deliberate.

Install is not the same as detection, and the site must never conflate them. Install is stated as 15 minutes. A workload then learns for 30 minutes before any detector fires, and the two behavioral scales keep warming for roughly 100 minutes and 10 hours. No detector, deterministic ones included, fires during the learning phase.

## Positioning

Runtime threat detection a platform team can actually own, with the audit evidence to prove it: PandoCore learns your workload's normal behavior and catches what rule-based tools miss, with no rules to write and effectively zero configuration, and it maps to the runtime-monitoring controls in SOC 2, ISO 27001 and PCI DSS.

## Conversion & proof

- Primary CTA: self-serve sign up (portal.pandocore.io/signup, labeled "Get Started"; nav keeps "Sign Up"). Secondary fallback: get in touch / contact, for visitors with questions before committing.
- The line a visitor remembers after 10 seconds: runtime threat detection for Kubernetes, with the audit evidence to prove it.
- Belief ladder: (1) runtime security has landed on my platform team and rule-based tools are a rules-writing tax I can't staff for; (2) they also bury my team in false positives; alert fatigue is real and it slows response; (3) detection that learns normal behavior kills the noise, cuts MTTR, and catches novel threats that rules miss; (4) PandoCore does this with one label and no config, so my engineers can own it on our existing cluster; (5) the results are trustworthy, validated through extended soak testing, and each detection leaves a signed record an auditor can read; (6) I can start now, self-serve.
- Value pillars, persona-agnostic and told to the platform owner: kill alert fatigue → cut MTTR → catch novel threats.
- Proof on hand: 20,000+ continuous pod-hours on GKE against production-representative synthetic workloads, with 2 false isolations and zero false terminations. The sub-0.005% rate and the "under 5 false positives per day" reframing were both withdrawn and must not return. The soak figures were measured on the sidecar collector and retire at collector cutover; a new soak is required before any false-positive claim about the node agent. Published methodology posts on the blog are themselves a proof point, including one that discloses a coverage gap. Exactly one cryptominer true positive is documented and it is not published; never quantify or pluralize that claim. No customer testimonials, case studies, or logos exist yet.

## Copy constraints

Non-negotiable. These govern every marketing surface and most of `docs/`.

- No em dashes. Use commas, semicolons or periods.
- "PandoCore" in prose. Lowercase `pando` only in technical identifiers.
- Never invent a number. If a figure is needed and not measured, leave a marker and say so. Open markers live in `PHASE1-MARKERS.md`.
- No coverage-totality wording about detection: no "every", "all", or "complete" coverage. The node agent carries per-node caps that degrade coverage at density by design.
- No process lineage, parent-process or process-tree language. The evidence record carries no such field.
- Signing makes tampering **detectable**; it does not prevent alteration. Never write "immutable", "tamper-proof" or "cannot be altered". ISO 27001 A.8.15 and PCI DSS 10.3.2 must keep saying the same thing as each other.
- No named-competitor comparisons and no unverifiable performance numbers.
- Never reveal proprietary detection mechanics; the technology is patent-pending. Stay at the behavioral and outcome level.
- The 11 compliance rows and the framing sentence above the table on the product page are verbatim and must not be reworded.

## Brand Personality

The quiet expert in the room. The dominant move is subtraction: confidence shown through how little the user has to do ("no rules to write", "zero configuration", "one label"), not through adjectives or hype. Claims are earned with evidence rather than asserted. The tone stays calm about a genuinely serious domain: this sells relief from noise, not fear. It should feel approachable and refreshingly straightforward: a busy platform Director should feel they instantly get it, and their engineers should trust it on inspection. Allow a hair of dry humor to lighten the weight, never at the expense of credibility. The tagline "Autonomous Runtime Defense" was retired in the September 2026 Phase 1 overhaul; the headline is now "Runtime threat detection for Kubernetes", extended on the product page with "with the audit evidence to prove it".

On warmth: the current palette (forest green, honey amber, cream) is deliberately warmer than competitors, and that human warmth is a real differentiator, but the site currently runs too warm and should be cooled a notch. Warmth is a seasoning, not the dish.

## Anti-references

- Fear-based security marketing: red-alert dashboards, breach/threat imagery, scare tactics. The opposite of the calm this brand wants.
- Dense enterprise SaaS: jargon walls, endless feature grids, logo soup.
- Hype-y startup: gradient-drenched heroes, huge unverifiable claims, exclamation energy.
- Buzzword / quantum mysticism: leaning on "quantum" or "AI-powered" sci-fi framing to sound advanced.
- Over-warm forest aesthetic: the name PandoCore evokes Pando the aspen grove, but the design must not tip into cozy, earthy, or heavily-warm territory.

## Design Principles

Confidence through subtraction: lead with how little the user has to do, not with feature lists. Proof over adjectives: every claim earns its place with evidence, and no claim ships that can't be defended. Calm, not fear: sell relief from noise in a domain usually sold with alarm. Refreshingly straightforward: optimize for instant comprehension by a busy platform Director over completeness, while standing up to an engineer's scrutiny. Cooled warmth: keep the human, non-clinical warmth that sets PandoCore apart, but hold it in restraint so it never reads as cozy or off-brand.

## Accessibility & Inclusion

Target WCAG 2.1 Level AA: sufficient contrast (body text ≥4.5:1), full keyboard navigation, semantic markup, and a reduced-motion alternative for the site's wave and orbit animations.

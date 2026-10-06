# Product

## Register

brand

## Platform

web

## Users

The primary reader is the person at a small engineering org who has just been handed their **first** compliance obligation: SOC 2, ISO 27001, PCI DSS or HIPAA. Usually a Director of Platform Engineering, Head of Platform, VP Eng or technical co-founder. The trigger is external and it is not a security awakening: a customer's security questionnaire, an enterprise deal gated on an audit, an investor or board requirement, or an auditor's first fieldwork request. Something now has to be true about runtime monitoring, there is a date attached, and nobody on the team owns it.

What defines this reader is not Kubernetes expertise, which they have, but the absence of a security function. There is no SOC, no security engineer, no one whose job is to write and tune detection rules. They are not shopping a category; they are closing a gap they did not choose, under a deadline, and they need the cheapest credible path to "yes, we monitor production at runtime, and here is the record."

The hands-on platform engineers on that team are the technical validators. They deploy it and feel "one label, done," so the site must survive their scrutiny on install time, blast radius and every published number, but they are not the primary reader.

**Resolved 2026-10-05 (supersedes the September 2026 open question).** This site is aimed at first-time compliance, not at standalone security / SOC teams. The earlier framing had it the other way around and the marketing surfaces had already drifted toward control mappings; the audience definition, not the pages, was the stale artifact. Consequences that follow from this and are now shipped: the homepage leads with the questionnaire trigger rather than with alert fatigue; the value pillars are compliance-shaped (see Conversion & proof); and HIPAA joins the named frameworks. PandoCore still competes in the runtime-security category (Falco, Sysdig, Tetragon) and that remains the competitive set, but the category is not the buyer.

**What this does not license.** The reader is pre-audit, not post-audit, so nothing may imply PandoCore makes anyone compliant, that an auditor has accepted its evidence, or that any audit has been passed. The compliance framing raises the stakes on the claim constraints below, it does not relax them. And a compliance-shaped page still has to carry proof: this buyer is technical, and "mapped to a control" without a measured number behind it reads as vendor noise to the engineer they will forward it to.

## Product Purpose

PandoCore is runtime threat detection for Kubernetes: it learns each workload's normal behavior, flags deviations with no rules or policies to write, and produces a signed evidence record for each detection. It exists because rule-based runtime security forces teams to anticipate every attack and buries them in false positives, a tax platform teams can't staff for. PandoCore replaces that with behavior-learned detection tuned per workload, so a team can satisfy a runtime-monitoring control without a SecOps function. Success looks like a team facing their first audit signing up, deploying into a real cluster, and having a signed evidence record to show for it.

Architecture, as of September 2026: the sensor is a per-pod sidecar, deployed with one label via the `pando-webhook` chart, and that remains the default install. A cluster controller (`pando-controller`, unprivileged, no Kubernetes API access) is available alongside it and owns durable evidence delivery. An optional privileged node agent (`pando-enforcer`, hostPID, not GKE Autopilot compatible) is unreleased and staging-only. The sidecar is not being deprecated. Marketing pages describe the target architecture; `docs/` describes what ships today, and that split is deliberate.

Install is not the same as detection, and the site must never conflate them. Install is stated as 15 minutes. A workload then learns for 30 minutes before any detector fires, and the two behavioral scales keep warming for roughly 100 minutes and 10 hours. No detector, deterministic ones included, fires during the learning phase.

## Positioning

Runtime threat detection for teams facing their first audit, with the evidence to prove it: PandoCore learns your workload's normal behavior and catches what rule-based tools miss, with no rules to write, effectively zero configuration and no security hire, and it maps to the runtime-monitoring controls in SOC 2, ISO 27001, PCI DSS and HIPAA. It does not make you compliant; your auditor decides that. It gives you a control that runs and evidence that it ran.

## Conversion & proof

- Primary CTA: self-serve sign up (portal.pandocore.io/signup, labeled **"Start free"** on every marketing surface; nav keeps "Sign Up"). One label everywhere: "Get Started", "Install Free" and "Start Free" were all in use at once as of 2026-10-05 and were consolidated. Avoid "Install" in the label: it names a Helm action but delivers a signup form, and the primary reader does not personally install anything.
- Secondary path: the pilot program (`index.html#pilot`), a founder-led booking for teams that want the first-audit path built with them. Secondary fallback: get in touch / contact, for visitors with questions before committing. Keep a low-commitment question path reachable from the homepage hero; an "apply" is a commitment, not a conversation.
- The line a visitor remembers after 10 seconds: runtime threat detection for Kubernetes, with the audit evidence to prove it.
- Belief ladder: (1) someone outside my company just asked how we monitor production at runtime, and "nothing yet" is not an answer I can send; (2) I have no security team to hand this to, and hiring for it costs more and takes longer than the deadline allows; (3) rule-based tools assume someone owns writing and tuning the rules, so for me the box stays unchecked; (4) detection that learns each workload's normal behavior needs no rules and no security hire, so my existing engineers can own it; (5) every detection leaves a signed record mapped to the control I am being asked about, and the numbers behind it are published and measured; (6) response is bounded, so it is safe to leave on; (7) I can start now, free, self-serve.
- Value pillars, told to a first-time compliance owner: an answer for the questionnaire → evidence an auditor can inspect → response that cannot overreach. These supersede the earlier "kill alert fatigue → cut MTTR → catch novel threats" pillars, which were written for a security-team reader. Alert fatigue and MTTR remain true and remain available as supporting arguments on /product; they are no longer the homepage's lead.
- Proof on hand: 20,000+ **total** pod-hours on GKE against production-representative synthetic workloads (cumulative, not one unbroken run; "continuous" was removed from every measurement claim on 2026-10-05 and must not return to one), with 2 false isolations and zero false terminations. The sub-0.005% rate and the "under 5 false positives per day" reframing were both withdrawn and must not return. The soak figures were measured on the sidecar collector and retire at collector cutover; a new soak is required before any false-positive claim about the node agent. Published methodology posts on the blog are themselves a proof point, including one that discloses a coverage gap. Exactly one cryptominer true positive is documented and it is not published; never quantify or pluralize that claim. No customer testimonials, case studies, or logos exist yet.

## Copy constraints

Non-negotiable. These govern every marketing surface and most of `docs/`.

- No em dashes. Use commas, semicolons or periods.
- "PandoCore" in prose. Lowercase `pando` only in technical identifiers.
- Never invent a number. If a figure is needed and not measured, leave a marker and say so. Open markers live in `PHASE1-MARKERS.md`.
- No coverage-totality wording about detection: no "every", "all", or "complete" coverage. The node agent carries per-node caps that degrade coverage at density by design.
- No process lineage, parent-process or process-tree language. The evidence record carries no such field.
- Signing makes tampering **detectable**; it does not prevent alteration. Never write "immutable", "tamper-proof", "tamper-resistant" or "cannot be altered". **Any word implying resistance or prevention is banned, not just the four listed** ("tamper-resistant" shipped briefly on the homepage on 2026-10-05 because it was not on the list). ISO 27001 A.8.15 and PCI DSS 10.3.2 must keep saying the same thing as each other, and no other surface may claim more than they do.
- No named-competitor comparisons and no unverifiable performance numbers.
- Never reveal proprietary detection mechanics; the technology is patent-pending. Stay at the behavioral and outcome level.
- The original 11 compliance rows and the framing sentence above the table on the product page are verbatim and must not be reworded. The table is **15 rows** as of 2026-10-05: 4 HIPAA rows were appended after the PCI DSS rows. HIPAA control numbers may be cited in that table only.
- Name frameworks (SOC 2, ISO 27001, PCI DSS, HIPAA) on the homepage but never specific control numbers; the full control list lives at `/product#compliance`. Never write "HIPAA compliant" or "HIPAA certified" anywhere. Phrase every mapping as "mapped to" or "supports", never "passes" or "audit-ready".
- Do not state a learning duration that overstates the measured gates in `PHASE1-MARKERS.md` (30 min learning, 100 min and 10 h behavioral scales). "About a day" shipped briefly on 2026-10-05 and was 2.4x the longest real gate.

## Brand Personality

The quiet expert in the room. The dominant move is subtraction: confidence shown through how little the user has to do ("no rules to write", "zero configuration", "one label"), not through adjectives or hype. Claims are earned with evidence rather than asserted. The tone stays calm about a genuinely serious domain: this sells relief from noise, not fear. It should feel approachable and refreshingly straightforward: a busy engineering leader facing their first audit should feel they instantly get it, and their engineers should trust it on inspection. Allow a hair of dry humor to lighten the weight, never at the expense of credibility.

**The compliance framing carries a specific tonal risk: scolding.** The reader did not choose this obligation and is already under deadline pressure. Copy must stay on their side of the table. Never imply they have been negligent, and never land a line whose only content is a rebuke ("Hope isn't compliance." was written and cut on 2026-10-05 for exactly this). Relief, not reproach.

**And a second one: cadence.** Subtraction is the voice, but the aphorism is not. Short landed fragments stacked one after another ("No rules to write, no security hire." / "No card, no call." / "X isn't Y.") read as machine-written, and three or more of the "X. No Y." shape on one page trips the slop detector. A quiet expert does not deliver a punchline every forty words. Prefer the full sentence. The tagline "Autonomous Runtime Defense" was retired in the September 2026 Phase 1 overhaul; the headline is now "Runtime threat detection for Kubernetes", extended on the product page with "with the audit evidence to prove it".

On warmth: the current palette (forest green, honey amber, cream) is deliberately warmer than competitors, and that human warmth is a real differentiator, but the site currently runs too warm and should be cooled a notch. Warmth is a seasoning, not the dish.

## Anti-references

- Fear-based security marketing: red-alert dashboards, breach/threat imagery, scare tactics. The opposite of the calm this brand wants.
- Dense enterprise SaaS: jargon walls, endless feature grids, logo soup.
- Hype-y startup: gradient-drenched heroes, huge unverifiable claims, exclamation energy.
- Buzzword / quantum mysticism: leaning on "quantum" or "AI-powered" sci-fi framing to sound advanced.
- Over-warm forest aesthetic: the name PandoCore evokes Pando the aspen grove, but the design must not tip into cozy, earthy, or heavily-warm territory.
- Compliance-theater vendor: checkbox language, framework logos as a trust substitute, "audit-ready" and "get compliant fast" promises, control numbers sprayed across a homepage. The compliance-first audience makes this the nearest trap, and it is the one that would cost the most credibility with the engineer who validates the claim.

## Design Principles

Confidence through subtraction: lead with how little the user has to do, not with feature lists. Proof over adjectives: every claim earns its place with evidence, and no claim ships that can't be defended. Calm, not fear: sell relief from noise in a domain usually sold with alarm. Refreshingly straightforward: optimize for instant comprehension by a busy engineering leader facing their first audit over completeness, while standing up to an engineer's scrutiny. Cooled warmth: keep the human, non-clinical warmth that sets PandoCore apart, but hold it in restraint so it never reads as cozy or off-brand.

## Accessibility & Inclusion

Target WCAG 2.1 Level AA: sufficient contrast (body text ≥4.5:1), full keyboard navigation, semantic markup, and a reduced-motion alternative for the site's wave and orbit animations.

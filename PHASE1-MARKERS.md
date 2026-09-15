# Phase 1 Copy Overhaul: Open Markers

Claims published in the Phase 1 marketing release that are not yet fully supported,
and decisions recorded so they are not silently re-opened.

Last updated: 2026-09-15. Delete an entry when its item closes.

## Unverified or pending

### 15-minute install time
**Where:** `index.html:57`, `product.html:55`, `docs/faq.html` ("How long does deployment take?")
**Status:** Owner-supplied figure. No install-time measurement exists in the pandoCore
source. The previously published figure was "under 5 minutes" scoped to the Helm install
alone. Needs a measured number covering the scope the marketing line claims.

### Per-node memory footprint
**Where:** `product.html` "Minimal Overhead" checkmark and the Memory Overhead tile
**Status:** `~5-6 MiB` is measured and correct **per pod**. No per-node measurement exists
anywhere in `validation/` or `outputs/`. The enforcer chart's `64Mi` request and `128Mi`
limit are chart defaults, not measurements, and must not be published as measured.
Both surfaces now state the per-pod unit explicitly and flag the per-node figure as pending.

### False-positive soak claim
**Where:** `product.html` validation section note, and the same claim at `product.html:554`,
`index.html:200`, `index.html:246`
**Status:** Kept by decision until new data exists. Measured on the sidecar collector.
Retire at collector cutover. A new soak is required before any false-positive claim about
the node agent. Note the four instances travel together; retiring one means retiring all four.

### Evidence retention, PCI DSS 5.3.4 and 10.5.1
**Where:** `product.html` compliance table, rows 9 and 11
**Status:** Published ahead of the build by decision, and **with no availability caveat on
the page**. The dated note was removed on 2026-09-15 at the owner's direction, so these two
rows now read as delivered. Roadmap decision 59 records that twelve-month retention already
holds by absence of a delete path in the portal; what is missing is a query path, a
deployment default, and a written policy an auditor can test. Estimated 13 to 20 working
days. Until that lands, `product.html` is the only place a reader is told the retention is
available, and nothing on the site qualifies it.
**Also flagged there and outside this repo:** the portal dashboard's plan card advertises
"Long retention + compliance export" while no export endpoint exists.

### Compliance table framing sentence
**Where:** `product.html` compliance section intro
**Status:** Shipping verbatim by decision. Roadmap decision 59 identifies a real gap in it:
"evidence that it ran" is not what the evidence store holds, because it records only trips.
Tier-3B produced one record from 568,506,018 samples, so a twelve-month history is empty for
nearly every pod and proves detection rather than continuous operation. Decision 59's fix is
daily usage readings, called the highest-value item in A4 because it repairs the sentence
every row depends on rather than one row.

### Totality wording inside verbatim rows
**Where:** `product.html` compliance table, rows 1 and 8
**Status:** The specification forbids "every", "all" and "complete" coverage wording, and
also supplies row text containing "Every detection produces a signed evidence record" and
"full detection history". The rows were marked verbatim and not to be improved, so they ship
as given. Flagged rather than resolved unilaterally, because the node agent's per-node
process caps (`MANAGED` 4096 cgroups, `ALLOWED` 65536 entries, degrading fail-open) are
exactly what the totality ban exists to protect against.

## Resolved, recorded so they are not re-opened

### Minute-15 detector split: REFUTED
The open question was which detectors are live at minute 15 versus which wait for a
statistical baseline, on the assumption that deterministic detectors need no warm-up.
Source says otherwise. Integrity, attestation, dropped-executable, cryptominer and exfil
detection are all explicitly suppressed during the learning phase
(`src/sidecar/src/monitor.rs:2145-2166`). No detector fires before learning completes.

The deterministic/statistical split is real but is a **response-ceiling** mechanism, not a
time-to-detection one: `EventClass` (`src/sidecar/src/collapse.rs:359-380`) caps statistical
signals at Isolate permanently, and only provenance-grade signals are terminate-eligible.

The published subhead is safe as written because it claims *learning* from the first sample,
not detection. Do not rewrite it into a detection claim.

Warm-up gates, confirmed in `src/sidecar/src/window.rs`:

| Gate | Value | Source |
|---|---|---|
| Learning phase | 1800s (30 min) | `learning.rs:55`, `PANDO_LEARNING_DURATION_SECONDS` |
| Short behavioral scale | 6000s (100 min) | tau 600s x warmup factor 10.0 |
| Long behavioral scale | 36000s (10 h) | tau 3600s x warmup factor 10.0 |

`PANDO_LEARNING_DURATION_SECONDS` does **not** control the two behavioral scales
(`tests/t0_cold_scale_absence.rs:30-37`).

### Displaced line worth keeping
`index.html` previously closed its hero with "Anomalies can isolate a pod. Only cryptographic
proof can kill one." It verifies true against source and is the sharpest statement of the
restraint thesis on the site. It was displaced by the compliance framing, not corrected.
Available for reuse elsewhere on the page.

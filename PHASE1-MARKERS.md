# Open Markers

Claims published on the marketing and docs surfaces that are not yet fully supported,
and decisions recorded so they are not silently re-opened.

Last updated: 2026-11-02. Delete an entry when its item closes.

## Blocked on a release

### The seven soak placeholders
**Where:** `index.html`, `product.html` (the six validation tiles and the section note),
`docs/index.html`
**Status:** The sidecar-era soak figures were retired at collector cutover, so the pages
carry placeholders rather than numbers. Fill all seven together; they travel as a set.

| Placeholder | Tile / use |
|---|---|
| `{{SOAK4_ENGINE_HOURS}}` | Engine-Hours, plus the prose instances |
| `{{SOAK4_FALSE_ISOLATIONS}}` | False Isolations tile, and `index.html`. A bare number |
| `{{SOAK4_FALSE_ISOLATIONS_PHRASE}}` | The prose instances. A full phrase, e.g. "Two false isolations" |
| `{{SOAK4_SAMPLES}}` | Samples Collected |
| `{{SOAK4_ATTESTATION_CHECKS}}` | Attestation Checks Passed |
| `{{SOAK4_NODE_MEMORY}}` | Working Set, Per Node |
| `{{SOAK4_WORKLOAD_TYPES}}` | Workload Types |
| `{{SOAK4_NODES}}` | Node count, in the section note only |

GKE only. **Two tokens, not one, for false isolations**: the tile needs a bare number and
the three prose instances need a phrase, and one token cannot serve both grammars.

**Overflow is handled, 2026-11-02.** `.validation-grid` now uses `minmax(0, 1fr)` tracks
and `.stat-number` carries `overflow-wrap: anywhere`, so a long value wraps instead of
widening the track and overflowing. A `1fr` track is `minmax(auto, 1fr)` and cannot shrink
below its content, which was the actual mechanism. Still worth an eye at phone width after
filling: a wrapped stat is untidy even though it is no longer broken. No `clamp()` was
added, deliberately: scaling the type down for every reader to tidy a case that wrapping
already contains is a type-scale decision for the restyle, not a defect fix.

**Do not reintroduce "continuous" into a measurement claim**; the hours are cumulative.
Note the distinction PRODUCT.md draws: "continuously monitors" stays as a product-behaviour
claim, and the surviving instances on `product.html` are that, not measurements. Do not
publish a false-termination count; the sensor cannot terminate.

### The published install command names a release that does not exist
**Where:** `docs/getting-started.html`, `docs/upgrading.html`, `docs/configuration.html`,
`docs/controller.html`, `docs/emergency.html`, `docs/production-hardening.html`
**Status:** The pages publish the prod OCI coordinates with `--version <VERSION>`. The
coordinates are correct and deterministic (`cloudbuild-prod.yaml` substitutions), but **no
prod release containing the node sensor has ever been cut**: the last tag is `v1.4.2`
(2026-08-19) and the node-sensor chart first appeared 2026-10-09. Two owner steps gate it,
and both are outside this repo:

1. `scripts/setup-gcp-repos.sh prod` to create the `node-sensor` Artifact Registry
   repository. It was still absent on 2026-10-29; Artifact Registry does not create a
   repository on push, and `cloudbuild-prod.yaml` refuses to publish the chart without it.
2. A tagged prod build.

Until then `<VERSION>` is honest but the command resolves to nothing. `--version` is
mandatory and must stay in every published command: installing an OCI chart without it
fails outright rather than resolving to the newest release.

### `cosign verify` has never been run against a prod artifact
**Where:** `trust/index.html`, the supply-chain section
**Status:** The published command's flag shape is verified against
`cloudbuild-prod.yaml:1877-1905`, including `--insecure-ignore-tlog=true`, which is required
because signing passes `--tlog-upload=false`. The public key exists and is git-tracked at
`deploy/keys/cosign-public-prod.pem` (committed 2026-10-30, distinct from staging's). But no
prod image has ever been signed with it, because no prod release has run. The owner is
supplying an image reference and digest so the command can be run end to end. Do not claim a
transparency-log entry, Rekor, or publicly auditable signing: signing is by key with the log
deliberately disabled.

## Unverified or pending

### Compliance table framing sentence
**Where:** `product.html` compliance section intro
**Status:** Shipping verbatim by decision. Roadmap decision 59 identifies a real gap in it:
"evidence that it ran" is not what the evidence store holds, because it records only trips.
Tier-3B produced one record from 568,506,018 samples, so a twelve-month history is empty for
nearly every pod and proves detection rather than continuous operation. Decision 59's fix is
daily usage readings, which repairs the sentence every row depends on rather than one row.

### Totality wording inside verbatim rows
**Where:** `product.html` compliance table, rows 1 and 8
**Status:** The copy constraints forbid "every", "all" and "complete" coverage wording, and
also supply row text containing "Every detection produces a signed evidence record" and
"full detection history". The rows are verbatim-locked, so they ship as given. Flagged
rather than resolved unilaterally, and the reason is sharper under the node sensor than it
was under the sidecar: each sensor watches at most `maxEngines` (70 by default) pods per
node, pods beyond the cap get no engine at all, and they are shed in a stable order so the
same pods stay unwatched across restarts. `pando_node_sensor_pods_unmonitored{reason="cap"}`
is exactly the gap the totality ban exists to protect against, and it is published on
`docs/getting-started.html` and `docs/faq.html`.

### Two compliance cells were edited inside verbatim-locked rows
**Where:** `product.html`, SOC 2 CC7.4 and HIPAA §164.308(a)(6)(ii)
**Status:** Both read "Optional response actions: isolate a workload by network policy, or
terminate it." The termination half is false on every install a customer can run, so on
2026-11-02 each was reduced to "Optional response: isolate a workload by network policy."
Two words per cell; the rest of each cell is byte-identical. Flagged because the rows are
verbatim-locked and this was a correctness edit made ahead of sign-off, not an improvement.

### Portal plan card still advertises compliance export
**Where:** outside this repo, `portal/routers/customer.py`
**Status:** No export endpoint exists; `license.py` records it as removed by decision 64,
and `customer.py` itself calls the copy "a claim about a delivered service made to a paying
customer inside the authenticated app, which is the worst place to make one". Removed from
`pricing.html` on this side. The matching portal fix is the portal agent's.

## Closed

### 15-minute install time: CLAIM WITHDRAWN 2026-11-01
Unmeasured and sidecar-era. No install-time measurement exists in the pandoCore source, and
the figure described a flow (label a deployment, wait for injection) that no longer exists.
Removed from `index.html`, `product.html` and `docs/faq.html`, and a "under 5 minutes" claim
in `docs/getting-started.html`'s meta description went with it. State the shape of the
install, not a duration. Do not reintroduce a figure without a measurement.

### Per-node resource footprint: RESOLVED 2026-11-01
The pending per-node figure now exists and is measured, so the old `~5-6 MiB` per-pod figure
is retired along with the rest of the sidecar numbers. Publishable: 250m CPU and 256Mi
requested per node, limited to 2 cores and 1Gi
(`pando-node-sensor/values.yaml:407-413`); and measured on an `e2-standard-4` at 40
monitored pods per node, warm and enforcing for eleven hours at the default 1000 ms cadence,
113.6 mCPU at the p95 over five minutes and an 85.4 MiB working set (`values.yaml:325-327`).
The ~199 mCPU figure at the 70-pod cap is a **carry** from that reading, not a measurement,
and must be labelled as such. The per-engine cost model is struck in the source and must not
be published or used to size a node.

### Sidecar-era soak claims: RETIRED 2026-11-01
"20,000+ total pod-hours", "2 false isolations" and "zero false terminations" are off every
marketing and docs surface, including the two instances this file previously recorded as
unscrubbed (`docs/index.html` and `trust/index.html`). Replaced by the placeholders above.
The eight dated blog posts keep their own numbers as history, by decision; they must not be
laundered back into current marketing.

### Evidence retention, PCI DSS 5.3.4 and 10.5.1: RESOLVED 2026-10-05
Retention shipped and the rows stand on shipped capability. Note the wording constraint that
came with it: retention is a **floor, not a query path**. Nothing in the portal deletes an
event, so never write that evidence is deleted after a tier's window, and make no
availability claim about querying it. Confirmed at `portal/services/license.py:308-321`:
`starter: 7`, `growth: 90`, `enterprise: 395` days.

### Minute-15 detector split: REFUTED
Integrity, attestation, dropped-executable, cryptominer and exfil detection are all
explicitly suppressed during the learning phase (`src/sidecar/src/monitor.rs:2145-2166`,
confirmed again at `monitor.rs:5910-5915`). No detector fires before learning completes. The
published subhead claims *learning* from the first sample, not detection; do not rewrite it
into a detection claim.

The deterministic/statistical split is real but is a **response-ceiling** mechanism rather
than a time-to-detection one. Note the ceiling has moved: `EventClass` caps statistical
signals at Isolate, and on the node sensor **every** signal class is capped at Isolate,
because the ClusterRole withholds `pods: delete` by name and `node_sensor.rs` applies
`max_from_features(..).min(Isolate)` in code. There is no longer a terminate-eligible class
on any install a customer can run.

Warm-up gates, confirmed in `src/sidecar/src/window.rs`:

| Gate | Value | Source |
|---|---|---|
| Learning phase | 1800s (30 min), **and** a 900-sample minimum | `learning.rs:59`, `:62-63` |
| Short behavioural scale | 6000s (100 min) | tau 600s x warmup factor 10.0 |
| Long behavioural scale | 36000s (10 h) | tau 3600s x warmup factor 10.0 |

Learning is a **dual gate**: duration and samples, whichever is later. At the chart's
1000 ms cadence 900 samples is 900s, so 30 minutes binds, but say "30 minutes and at least
900 samples" rather than implying a pure timer. `PANDO_LEARNING_DURATION_SECONDS` does not
control the two behavioural scales (`tests/t0_cold_scale_absence.rs:30-37`), and the full
ladder runs 1m/10m/1h/6h/24h/7d at a 3-tau envelope warmup, so the longest scales keep
warming for days.

### Displaced line: NOW FALSE, DO NOT REUSE
`index.html` once closed its hero with "Anomalies can isolate a pod. Only cryptographic
proof can kill one." It was true of the sidecar, which held `pods: ["get","delete"]`. It is
false of the node sensor, which holds no pod-delete grant at all, so nothing the sensor can
observe will kill a pod. This file previously listed the line as available for reuse. It is
not. Struck 2026-11-01.

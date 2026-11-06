# Open Markers

Claims published on the marketing and docs surfaces that are not yet fully supported,
and decisions recorded so they are not silently re-opened.

Last updated: 2026-11-06. Delete an entry when its item closes.

## The v2.0.0 release: all three items closed 2026-11-06

Nothing in this section is outstanding. It is kept rather than deleted because each entry
records how a figure or a command was verified, and the next person to touch those surfaces
needs the reasoning more than the status.


### The eight soak placeholders: CLOSED 2026-11-05
Six filled, two withdrawn. No `{{SOAK4_*}}` token remains anywhere in the tree.

| Placeholder | Resolution |
|---|---|
| `{{SOAK4_ENGINE_HOURS}}` | `3,966` |
| `{{SOAK4_FALSE_ISOLATIONS}}` | `zero`, folded into the headline statement |
| `{{SOAK4_FALSE_ISOLATIONS_PHRASE}}` | folded into the headline statement |
| `{{SOAK4_NODE_MEMORY}}` | `110.6 MiB` |
| `{{SOAK4_WORKLOAD_TYPES}}` | `24` |
| `{{SOAK4_NODES}}` | one node per run |
| `{{SOAK4_SAMPLES}}` | **not recorded. Tile removed, not filled.** |
| `{{SOAK4_ATTESTATION_CHECKS}}` | **not recorded. Tile removed, not filled.** |

GKE only. The validation grid is two tiles now, not six.

**The 663,841,097 trap.** soak4 arm B's teardown entry in `HARDENING_UPDATES.md` records
"663,841,097 samples". That is a count of Prometheus datapoints across 15 TSDB blocks, not
behavioural samples collected by the sensor, and it is roughly 2,700 times the per-engine
figures. It reads exactly like a Samples Collected tile and it is not one. That tile was
removed rather than filled. **Do not restore it from that number.**

**Any future figure must come from soak4 arm B plus soak5**, the two runs behind the
published 3,966 engine-hours. **Never from soak3.** Soak3 is much the larger sample at
22,266.54 engine-hours, but it ran in Monitor mode, so its figures cannot sit in a band whose
headline is an isolation claim: the denominators differ by a factor of six. A soak3 figure
needs its own sentence and its own denominator.

**The headline is one statement and must stay one:** "Zero false isolations across 3,966
engine-hours of sensors that were permitted to isolate, 1,231 of them on the exact build we
ship." Every clause is load-bearing. The zero is only true of sensors that were permitted to
isolate, and only 1,231 of those hours ran on the shipping build. The grid used to carry the
engine-hours and the zero as two separate tiles, which published the figure apart from the
qualifier that makes it true; that is what `.validation-claim` exists for, and why those two
tiles were merged into it. Do not re-cut them into the grid.

**Three grammars, not two.** A bare number; a mid-sentence phrase after "with"; and a
sentence-initial phrase followed by "across N engine-hours", which would have duplicated the
clause. The third could not be served by a token at all and is hand-written in
`product.html`'s section note.

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

### `<VERSION>` and the published charts: RESOLVED 2026-11-06
**Where:** `index.html` and 6 docs pages, 11 sites, reading `--version 2.0.0`.
**Status:** Closed. The charts are published and the coordinates on the site resolve. Verified
by running the published command's own reference:

    helm show chart oci://us-central1-docker.pkg.dev/pandocore-prod/charts/pando-node-sensor \
      --version 2.0.0
    -> Pulled, appVersion 2.0.0, chart digest sha256:63b2c63ea30746802593cd11e4c9a08ceb...

`pando-controller` resolves at 2.0.0 too. The version was predicted by construction and the
prediction held: the build writes every chart's `version` and `appVersion` from `_TAG_NAME`
with the leading `v` stripped. **`Chart.yaml` still reads `0.1.0` in git; ignore it, the build
overwrites both keys.** One value covers both charts, and `--version` must stay in every
published command: an OCI chart installed without it fails outright rather than resolving to
the newest release.

### `cosign verify`: RESOLVED 2026-11-06, run end to end
**Where:** `trust/index.html`, the supply-chain section
**Status:** Closed. The page publishes a command that was actually executed, not assembled:

    cosign verify --key deploy/keys/cosign-public-prod.pem --insecure-ignore-tlog=true \
      us-central1-docker.pkg.dev/pandocore-prod/node-sensor/pando-node-sensor@sha256:a06b5be...
    -> exit 0; signature verified against the public key

The signature payload carries `git.tag: v2.0.0` and `git.sha: f7956d6786dc...`, which matches
the image's own `2.0.0-f7956d6` tag. Both SBOM attestations verify as well, `--type spdxjson`
(260,193 bytes) and `--type cyclonedx` (131,161 bytes), so the page's "two attestations per
image" claim is measured rather than asserted.

The **public key published inline on the page** is byte-identical to
`deploy/keys/cosign-public-prod.pem` and hashes to
`sha256:dc0145d97692207e64d9e79f94d46c823d48364922f88d0db3b9e3899dfd14d8`. Re-checked
2026-11-06 after the file's mtime changed: content unchanged, digest still correct.

The other four prod digests, recorded so nobody has to list a repository to find them:
controller `sha256:2d9560b819ffdb3c...`, webhook `sha256:a4baf9d28e44adb9...`,
enforcer `sha256:d7966968aa994392...`, sidecar `sha256:c8ca3f601f4fa86e...`.

**Still do not fill a digest by listing the repository.** The prod node-sensor repo holds an
untagged orphan predating this pipeline, with no signature artifacts and
`slsa_build_level: unknown`, and it is what a listing returns. It is not a release artifact
and will not verify. The page tells readers the same thing.

Do not claim a transparency-log entry, Rekor, or publicly auditable signing: signing is by
key with the log deliberately disabled, which is why `--insecure-ignore-tlog=true` is
required and why the page explains the flag rather than hiding it. cosign prints its own
warning about skipping the log; a reader will see it, and the page's explanation is what
keeps that from reading as a broken signature.

**Scanning is not uniform.** Signing and both SBOM attestations cover all five images. Trivy
gates the node sensor only, on CRITICAL and HIGH with fixed-available only; the sidecar is
scanned but not gated; the controller, webhook and enforcer are not scanned at all. "All
images scanned" would be false.

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

### Per-node resource footprint: RESOLVED 2026-11-01, re-measured 2026-11-05
The old `~5-6 MiB` per-pod figure is retired along with the rest of the sidecar numbers.
Publishable: 250m CPU and 256Mi requested per node, limited to 2 cores and 1Gi
(`pando-node-sensor/values.yaml:407-413`); and, from the soak runs on the shipping shape, a
130.4 mCPU p95 with a 106.9 MiB working set over soak4 arm B's 24-hour warm cost sub-window,
and 127.3 mCPU with 110.6 MiB over soak5's 34-hour run. Working-set slope flat in both at
-0.015 and +0.008 MiB/h, CFS throttling 0.000 percent, 0 OOMKills, and 0 sensor restarts in
77 hours.

The earlier `113.6 mCPU` / `85.4 MiB` pair from `values.yaml:325-327` is an eleven-hour bench
at 40 monitored pods and came **off every surface on 2026-11-05**: it understated the
shipping build's p95 by about 15 percent, which an operator would notice on install. The
~199 mCPU carry at the 70-pod cap went with it, because no 70-engine figure is settled and
deriving one is forbidden. The per-engine cost model is struck in the source and must not be
published or used to size a node.

**Do not round the two runs together.** "About 130 mCPU and 110 MiB, measured warm over 72
hours" attaches soak5's working set to arm B's window. The pairs are (130.4, 106.9) and
(127.3, 110.6), each with its own window. The numbers brief itself blends them; it is wrong
to.

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

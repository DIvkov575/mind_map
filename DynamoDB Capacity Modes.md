How [[DynamoDB]] meters and bills throughput, and the multi-layer **admission control** that keeps one tenant/partition from starving others or melting hardware.

### The unit math

- **RCU (Read Capacity Unit)** — 1 **strongly consistent** read/s of an item up to **4 KB**. Eventually consistent reads cost **½** RCU (so 2/s per RCU). [[DynamoDB Transactions|Transactional]] reads cost **2** RCU. Item size rounds **up** to the next 4 KB.
- **WCU (Write Capacity Unit)** — 1 write/s of an item up to **1 KB**. Transactional writes cost **2** WCU. Rounds up to the next 1 KB.
- A 5 KB strongly-consistent read → 2 RCU; a 1.5 KB write → 2 WCU. Size = total UTF-8 bytes of attribute names + values.

### Two billing modes

- **Provisioned** — you set RCU/WCU (optionally with Application Auto Scaling targeting ~**50–70%** utilization). Cheapest for steady, predictable load.
- **On-demand** — no capacity setting; you pay per request. The service tracks your **previous peak** and keeps roughly **2×** headroom instantly available, doubling as new peaks arrive. Best for spiky/unknown load.

### Layer 1 — partition token buckets (protect hardware)

Each partition enforces a **hard ceiling** (~**3000 RCU / 1000 WCU**) via a **token bucket**, independent of table settings. This protects a single storage node from being overwhelmed. Hitting it returns `ProvisionedThroughputExceededException` (throttling) even if the *table* has spare capacity — the classic **hot-partition** symptom (see [[Partition Key]]).

### Layer 2 — smoothing mechanisms (history)

- **Bursting** — unused capacity on a partition is **banked for up to 300 s** and can be spent later, absorbing short spikes.
- **Adaptive capacity** — reactively **lends** provisioned throughput from cold partitions to hot ones (within the table total), and can **isolate a single hot key** onto its own partition. Originally minutes-slow and reactive; now near-instant.

### Layer 3 — Global Admission Control (GAC)

Even-splitting provisioned throughput across partitions (the old model) caused throttling after a [[DynamoDB Partition Split|split]]. GAC decouples the two:
- The table's provisioned throughput is a **global token pool** tracked by a central **GAC** service.
- Each [[DynamoDB Request Router]] keeps a **local token bucket** and periodically requests a **batch** of tokens from GAC, refilling locally. Most admission decisions are thus local (no per-request central hop), while the fleet still enforces the table-wide limit.
- Net effect: a partition can consume up to its hardware ceiling (Layer 1) as long as the **table** pool (Layer 3) has tokens — throughput follows demand, not a static per-partition slice.

### Practical

- Throttling ≠ table over capacity: check **per-partition** skew first.
- On-demand cannot be throttled by a provisioned setting but **can** still hit the partition-level ceiling under extreme single-key load.

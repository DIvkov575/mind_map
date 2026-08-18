Secondary indexes let [[DynamoDB]] answer queries on attributes **other than** the base primary key, avoiding a full `Scan`. Two kinds: **GSI** and **LSI**.

### Global Secondary Index (GSI)

- **Different** [[Partition Key]] and/or [[Sort Key]] from the base table.
- Its own [[DynamoDB Capacity Modes|capacity]] (RCU/WCU), billed separately; is itself a set of [[DynamoDB Replication Group|replication groups]].
- **Eventually consistent only** (see [[DynamoDB Consistency]]) — maintained asynchronously.
- Can be **added/dropped on a live table**. Up to 20 per table.

### How a GSI is maintained (log propagation)

There is a dedicated **async propagation pipeline**, not a synchronous index write:
1. A base write commits on its partition leader and lands in the **replication log**.
2. A **log propagator** tails that log, computes the corresponding **index mutation** (insert/update/delete of the projected item under the GSI's key), and applies it to the correct **GSI partition**.
3. Typical end-to-end lag is **sub-second**, but it is not transactional with the base write.

**Backpressure:** in provisioned mode, if a GSI lacks WCU to absorb propagation, the backlog builds and can **throttle base-table writes** — an under-provisioned GSI silently caps table write throughput.

**Online creation (backfill):** adding a GSI runs a background **scan-and-build** over the base table while **concurrently** applying live log updates, then flips the index to `ACTIVE`. No downtime, but consumes read capacity during backfill.

### Local Secondary Index (LSI)

- **Same** partition key, **different sort key**. Updated **synchronously** in the base write path, so it shares base capacity and **can be strongly consistent**.
- Must be defined **at table creation** (cannot add later). Max 5 per table.
- Its item collection counts against the **10 GB per-partition-key** limit — a single partition key's base items + all LSI entries must fit in one [[DynamoDB Partition Split|partition]].

### Projections

Each index stores a chosen attribute copy: `KEYS_ONLY` (cheapest) · `INCLUDE` (keys + named subset) · `ALL` (full item, no base fetch). A miss on a needed attribute forces a second base-table read — project deliberately.

### GSI overloading

In [[Single-Table Design]], generic index attributes (`GSI1PK`, `GSI1SK`) are reused across entity types so one GSI serves many access patterns.

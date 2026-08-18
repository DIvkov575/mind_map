The **partition key** (a.k.a. **hash key**) is the first component of a [[DynamoDB]] primary key. Its value is run through an internal **MD5-based [[Hash]]** into a 128-bit space; the hash selects the **partition** ([[DynamoDB Replication Group|replication group]]) that stores the item.

### Why key choice dominates performance

Throughput and storage spread across partitions by the key's hash. A **high-cardinality**, uniformly-accessed key spreads load evenly; a skewed one concentrates it.

- Each partition has a hard hardware ceiling (**~3000 RCU / ~1000 WCU**, ~**10 GB**) enforced by a partition-level token bucket — see [[DynamoDB Capacity Modes]].
- **Hot partition** — one key (or a narrow set) absorbs disproportionate traffic and saturates that partition while others idle. Anti-patterns: `status = "ACTIVE"`, a single tenant id, `date = today`, a monotonic counter.

### The unsplittable-key rule

All items with the **same** partition-key value hash to the same point, so they always co-locate in one [[DynamoDB Partition Split|partition]] and **cannot be split apart**. A single hyper-hot key is therefore capped at one partition's throughput no matter how large the table.

### Fixes for skew

- Pick a naturally high-cardinality key (user id, device id, request id).
- **Write sharding** — append a suffix (`orders#0`…`orders#N`), scatter writes across N synthetic keys, gather with N parallel `Query`s (optionally via a GSI, see [[DynamoDB Secondary Indexes]]).
- Lean on **adaptive capacity** (auto-isolates a hot key onto its own partition) but treat it as mitigation, not a design.
- Cache hot reads in [[DAX]] or [[Cache-Aside]].

Items sharing a partition key form an ordered **item collection**, sequenced by the [[Sort Key]].

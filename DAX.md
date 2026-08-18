**DAX (DynamoDB Accelerator)** is a fully managed, in-memory, **write-through** cache that fronts [[DynamoDB]], cutting read latency from single-digit **milliseconds** to **microseconds** for cached items. It is API-compatible, so the app points its DynamoDB client at the DAX endpoint with minimal code change — unlike a hand-rolled [[Cache-Aside]] layer.

### Cluster shape

- A DAX **cluster** = 1 primary node + up to 10 read replicas across AZs.
- The primary handles writes and cache coherence; replicas serve reads. Nodes hold the cache in RAM.

### Two caches

- **Item cache** — results of `GetItem`/`BatchGetItem`, keyed by primary key.
- **Query cache** — result sets of `Query`/`Scan`, keyed by the request parameters.
- Both are governed by a **TTL** (default 5 min); the query cache is also invalidated when the underlying key range changes through DAX.

### Write-through behavior

On a write, DAX **writes to DynamoDB first**, and on success updates its item cache — so a subsequent read is a hit with fresh data. This avoids the stale-after-write hazard of lazy [[Cache-Aside]] loading. Writes that bypass DAX (going straight to the table, or via [[DynamoDB Streams]]/another writer) are **not** seen until the TTL expires — DAX has no invalidation from the base table.

### When it helps / hurts

- **Helps:** read-heavy, hot-key or repeated-query workloads; smooths [[Partition Key|hot partitions]] and can cut RCU cost dramatically.
- **Neutral/hurts:** write-heavy or read-once patterns (cache churn, no reuse); apps needing **strongly consistent** reads — DAX serves item-cache hits as **eventually consistent**, and passes strongly-consistent reads straight through to the table (no acceleration). See [[DynamoDB Consistency]].
- Runs inside a VPC; not usable from outside without network setup.

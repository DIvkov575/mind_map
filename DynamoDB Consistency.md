[[DynamoDB]] offers **tunable read consistency** and, separately, ACID [[DynamoDB Transactions|transactions]]. Consistency is a property of the **read path** against the [[DynamoDB Replication Group|replication group]].

### Read consistency models

- **Eventually consistent (default)** — the [[DynamoDB Request Router]] may route the read to **any** replica, including a follower that has not yet replayed the latest log records. Cheapest (½ RCU), lowest latency, may return **stale** data by the replication lag (typically single-digit ms).
- **Strongly consistent** (`ConsistentRead=true`) — routed to the **leader** only. The leader holds the lease and the highest committed **LSN**, so the read reflects **all previously acknowledged writes**. Costs a full RCU, cannot be served during a leader election gap, unavailable on GSIs.

### Why the leader is authoritative

A write is acknowledged only after a **quorum (2 of 3)** persists its log record. The leader, by holding the lease, is guaranteed to have every committed record (majority overlap: any committed write's quorum intersects the leader's set). So a leader read is linearizable for that key. Followers converge asynchronously → eventual consistency.

### Index consistency

- **GSI** reads are **always eventually consistent** — a GSI is maintained by async [[DynamoDB Secondary Indexes|log propagation]], so it lags the base table.
- **LSI** reads *can* be strongly consistent, because an LSI shares the base partition and is updated in the same write path.

### Conflict handling

- Single-region: last write to the leader wins; use `ConditionExpression` for optimistic compare-and-set.
- Multi-region: [[DynamoDB Global Tables]] resolve concurrent cross-region writes by **last-writer-wins on an item timestamp**.

### Ordering

There is **no** global ordering across partition keys. Ordering (and [[DynamoDB Streams]] record order) is guaranteed only **within a single partition key**.

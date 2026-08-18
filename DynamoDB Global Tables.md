**Global Tables** give [[DynamoDB]] **multi-region, active-active** replication: a table with replicas in N regions, each accepting reads **and** writes locally, all converging asynchronously. Built directly on [[DynamoDB Streams]].

### Mechanism

1. Every replica has Streams enabled (`NEW_AND_OLD_IMAGES`).
2. A managed **replicator** per region tails the local stream and applies each change to the **other** regions' replicas.
3. Propagation is **asynchronous**, typically **sub-second** to ~1 s cross-region. Each region serves local reads at full speed; there is no synchronous cross-region quorum.

### Conflict resolution — last-writer-wins

Concurrent writes to the **same item in different regions** are resolved by **last-writer-wins (LWW)** using a per-item **timestamp** stored as hidden metadata. The write with the highest timestamp survives in every region; the loser is dropped. There is **no** merge and no application-visible conflict — so design so that a given item is normally "owned" by one region, or tolerate LWW.

### Consistency implications

- **Within a region:** you can still request strongly consistent reads (see [[DynamoDB Consistency]]).
- **Across regions:** only **eventual** consistency — a read in region B may not yet see region A's latest write.
- Requires **matching schema**, identical table name, and (historically) empty tables when first joined; version 2019.11.21 lets you add regions to a live table.

### Availability

Global Tables raise the SLA to **99.999%**: if one region is impaired, clients fail over to another region that already holds a full, writable copy. Common for latency reduction (serve users from the nearest region) and DR.

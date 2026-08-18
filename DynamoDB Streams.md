**DynamoDB Streams** is [[DynamoDB]]'s change-data-capture feed: a time-ordered log of every item-level mutation, retained **24 h**. It is sourced from the same [[DynamoDB Replication Group|replication log]] that drives replication, so it costs the write path almost nothing.

### Record shapes (StreamViewType)

- `KEYS_ONLY` — just the key of the changed item.
- `NEW_IMAGE` — item after the change.
- `OLD_IMAGE` — item before the change.
- `NEW_AND_OLD_IMAGES` — both (required for [[DynamoDB Global Tables]]).

Each record carries the event type (`INSERT` / `MODIFY` / `REMOVE`) and a sequence number.

### Shards and ordering

- A stream is partitioned into **shards**; each shard corresponds to a [[Partition Key|partition]]'s activity.
- **Ordering guarantee:** records for a **given partition key** appear in the exact order the writes were applied — never globally across keys.
- **Shard lineage on split:** when a [[DynamoDB Partition Split|partition splits]], its shard **closes** and spawns **child shards**. A consumer must drain a parent shard fully **before** its children to preserve per-key order. This parent→child DAG is how ordering survives resharding.

### Consumption

- **Lambda triggers** (event-source mapping) poll shards, batch records, and invoke a function; on error the batch is retried, so handlers must be **idempotent**. Max **2** simultaneous readers per shard before throttling.
- **Kinesis Adapter / KCL** for custom consumers.
- Uses: cross-region replication (Global Tables is built on this), materialized aggregates, search indexing ([[Elasticsearch]]), audit logs, cache invalidation for [[Cache-Aside]].

### Contrast: Kinesis Data Streams export

DynamoDB can alternatively push changes to a **Kinesis** stream — longer retention (up to 1 yr) and more consumers, but **at-least-once** and **no** strict per-key ordering guarantee, unlike native Streams.

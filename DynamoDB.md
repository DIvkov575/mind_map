[[DynamoDB]] is AWS's fully managed, serverless **NoSQL** key-value + document database. It descends from the 2007 Dynamo paper but is a distinct rewrite: Dynamo was leaderless with client-side conflict resolution; DynamoDB uses **per-partition leadered replication groups** driven by **Multi-Paxos**. It trades the relational model (see [[RDBMs]]) for horizontal scalability and predictable **single-digit millisecond** latency independent of table size.

### Core idea

You do **not** provision servers, run a query planner, or write `JOIN`s. You design around **access patterns**, and the engine spreads data across many physical partitions by hashing the partition key. Throughput and storage scale by adding partitions, not by scaling one node up.

### Data model

- **Table** → collection of items; schemaless except the primary key.
- **Item** → one record; max **400 KB** including attribute names. Size counts UTF-8 bytes of names + values, which drives capacity-unit math (see [[DynamoDB Capacity Modes]]).
- **Attribute** → per-item field. Types: scalar (S, N, B, BOOL, NULL), document (M, L), set (SS, NS, BS). Numbers are stored as variable-length decimal (up to 38 digits), not IEEE floats.

### Primary key (mandatory)

- **Partition key only** — value hashed → chooses the [[Partition Key|partition]]. Must be unique.
- **Composite: partition key + [[Sort Key]]** — items sharing a partition key form an ordered **item collection**; enables range queries and one-to-many modeling.

### Architecture (how it actually works)

- **Storage layer** → each partition is a [[DynamoDB Replication Group]]: 3 replicas across 3 AZs, one Paxos-elected leader, a write-ahead **replication log**, and a B-tree store.
- **Routing layer** → stateless [[DynamoDB Request Router]]s authenticate, resolve the partition via the **MemDS** metadata store, and forward to the leader.
- **Admission layer** → [[DynamoDB Capacity Modes|token buckets + Global Admission Control]] meter throughput; partition-level buckets protect hardware, GAC enforces table-level limits.

### Sub-topics

- Physical placement, hot-partition risk → [[Partition Key]]
- Range queries, item collections → [[Sort Key]]
- Query non-key attributes → [[DynamoDB Secondary Indexes]]
- Read/write cost, bursting, adaptive capacity, GAC → [[DynamoDB Capacity Modes]]
- Quorum reads, leader leases → [[DynamoDB Consistency]]
- ACID across items → [[DynamoDB Transactions]]
- Change data capture → [[DynamoDB Streams]]
- Multi-region active-active → [[DynamoDB Global Tables]]
- Modeling many entities in one table → [[Single-Table Design]]
- Microsecond read cache → [[DAX]]

### Operations (not SQL)

- **Item ops:** `GetItem`, `PutItem`, `UpdateItem`, `DeleteItem` — O(1) by primary key.
- **`Query`** — one item collection by partition key (+ optional sort-key condition). Reads only matched keys.
- **`Scan`** — full-table read then filter; cost is charged on bytes **scanned**, not returned. Avoid in the hot path.
- **`BatchGetItem` / `BatchWriteItem`** — 100 gets / 25 writes per call, non-atomic, partial-failure via `UnprocessedItems`.
- **Conditional writes** — `ConditionExpression` gives optimistic concurrency (compare-and-set on a version attribute).

### What you give up vs [[RDBMs]]

- No server-side `JOIN`, no ad-hoc `WHERE` without a matching key/index, no global uniqueness beyond the primary key. Query flexibility is fixed at **design time**.

### What you gain

- Seamless horizontal scale; latency decoupled from table size; managed replication, backups, [[DynamoDB Global Tables]]; **TTL** auto-deletion (free, via a background sweeper, up to ~48 h after expiry).

### When to reach for it

- High-scale, known access patterns: sessions, carts, IoT, event logs, leaderboards. **Not** for analytics/ad-hoc reporting → prefer [[RDBMs]] or a warehouse.

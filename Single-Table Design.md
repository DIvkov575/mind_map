**Single-table design** is the dominant [[DynamoDB]] modeling pattern: store **many entity types in one table** and shape the keys so every known access pattern is a single `Query`. It exists because DynamoDB has **no server-side `JOIN`** (unlike [[RDBMs]]) — you pre-join by co-locating related items.

### The method (access-pattern-first)

1. Enumerate every **access pattern** up front ("get user + their last 20 orders", "list orders by status").
2. Design generic keys — commonly named `PK` and `SK` — whose values are **typed and prefixed**: `USER#123`, `ORDER#2024-01-05`, `ORG#42`.
3. Overload the same key space with different entity shapes so that one `Query` on a partition returns a **heterogeneous item collection** (the user record + its order records together).

### Key overloading + GSI overloading

- **Attribute overloading** — `PK`/`SK` mean different things per entity type; the app interprets by prefix.
- **GSI overloading** — a single [[DynamoDB Secondary Indexes|GSI]] with generic `GSI1PK`/`GSI1SK` serves *multiple* access patterns because different entities project different values into those attributes. A handful of GSIs can cover a whole app.
- **Adjacency-list pattern** — model relationships (many-to-many, graphs) by placing edge items under shared partition keys with typed [[Sort Key|sort keys]].

### Why bother

- One round trip per screen; latency flat as data grows; fewer provisioned throughput pools to manage.
- Pre-computed [[Cache-Aside|denormalization]] instead of runtime joins.

### Costs / caveats

- **Schema is opaque** — a raw table scan is unreadable; you need the access-pattern doc to interpret it.
- **Hard to evolve** — a genuinely new access pattern may force a new GSI or a migration/backfill.
- **Skew risk** — overloading can concentrate traffic; watch [[Partition Key|hot partitions]].
- Contrarian view: for small/low-scale apps, multiple simple tables are easier and the single-table tax isn't worth it.

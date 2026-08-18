The **sort key** (a.k.a. **range key**) is the optional second component of a [[DynamoDB]] composite primary key. The pair `(partition key, sort key)` must be unique.

### Item collections

All items with the same [[Partition Key]] are stored **physically adjacent** within the partition's B-tree, ordered by sort-key value — **byte order** for strings/binary (so encoding matters: zero-pad numbers stored as strings), numeric order for `N`. This adjacency is why `Query` is cheap: seek to the partition, then a **sorted range read** over contiguous keys.

### Sort-key conditions in `Query`

`=`, `<`, `<=`, `>`, `>=`, `BETWEEN`, and `begins_with(prefix)`. Range reads are charged on bytes **read**, and can page via `LastEvaluatedKey`. `ScanIndexForward=false` walks descending (e.g. "latest N").

### Modeling with the sort key

- **One-to-many** — partition `USER#123`, sort keys `ORDER#2024-01`, `ORDER#2024-02`… → all a user's orders in one `Query`.
- **Composite / hierarchical keys** — `COUNTRY#US#STATE#WA#CITY#SEA`; `begins_with("COUNTRY#US#STATE#WA")` returns an entire subtree. The delimiter + prefix trick encodes a tree into a flat sorted axis.
- **Time series** — ISO-8601 timestamp sort keys give natural range scans and ordering.
- **Adjacency lists** — mixing entity types under one partition key (with typed sort-key prefixes) models graphs/relations.

This entity-overloading of the partition+sort key space is the foundation of [[Single-Table Design]], and the same prefixes get reused on GSIs ([[DynamoDB Secondary Indexes]]).

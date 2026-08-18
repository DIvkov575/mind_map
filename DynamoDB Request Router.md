The **request router (RR)** is the stateless front-end fleet of [[DynamoDB]]. Every API call lands on a router, which does auth then locates the storage node holding the target partition's leader.

### Per-request path

1. **Authenticate + authorize** — validate the AWS SigV4 signature and check IAM policy.
2. **Resolve partition** — map the primary key's hash to the owning [[DynamoDB Replication Group|replication group]] and its current leader, by consulting partition **metadata**.
3. **Forward** — send `Query`/`GetItem`/write to the leader (or, for eventually consistent reads, any replica). Admission tokens are checked here (see [[DynamoDB Capacity Modes]]).

Routers hold **no durable state**, so the fleet scales out freely and any router can serve any request.

### Metadata: MemDS

Partition maps are served by **MemDS**, an in-memory, horizontally-scaled distributed metadata store. It uses a **Perkle** structure — a hybrid of a **Patricia trie** and a **Merkle tree** — so it can answer both "which partition owns this exact key" and "which partition owns the next key range" efficiently.

### The always-ask design (thundering-herd fix)

Routers cache the partition map locally (**~99.75%** hit rate). The subtle part: a router queries MemDS **even on a cache hit**, in the background/steady state, rather than only on a miss.

- **Why:** originally routers only hit metadata on a cache miss. A cold fleet (deploy, or a large table's first traffic) produced a **bimodal** load spike — near-zero metadata traffic normally, then a **thundering herd** when caches emptied, which could overload the metadata store and cascade. (This dynamic contributed to a major 2015 event.)
- **Fix:** by always sending a constant, predictable metadata load to MemDS, the system removes the bimodality — MemDS is provisioned for a **flat**, known request rate regardless of cache state.

### Request hedging

To mask a single slow MemDS node (or storage replica), a router can issue the lookup to a **second** replica — often in a different AZ — and take whichever response returns first. This trims tail latency and tolerates a stalled MemDS instance.

[[DynamoDB]] supports one-shot **ACID transactions** across up to **100 items** (in one or many tables) via `TransactWriteItems` and `TransactGetItems`. Unlike traditional DBs, there are **no interactive transactions, no held locks, no `BEGIN…COMMIT`** — each call is a single atomic request.

### Timestamp-ordering protocol

A stateless **transaction coordinator** (running on the router tier) drives it:
1. Coordinator assigns the transaction a **timestamp** (its logical order).
2. **Prepare phase** — sends each participant [[DynamoDB Replication Group|partition leader]] its items plus any `ConditionCheck`s. A participant accepts only if the item's state is consistent with the transaction's timestamp and no condition fails. Each participant durably records its vote through **Paxos** (the leader runs prepare → accept across its replicas).
3. **Commit / cancel** — if **all** participants accept, the coordinator commits and each leader applies its mutation; if any rejects, the whole transaction is cancelled (`TransactionCanceledException` with per-item reasons).

Because ordering is by timestamp rather than locks, concurrent conflicting transactions are **rejected and retried** (optimistic), so a slow client can never block others — critical for keeping tail latency bounded.

### Cost + limits

- Each item **read** in a transaction = **2 RCU**; each item **written** = **2 WCU** (double the non-transactional cost — the prepare+commit does two rounds).
- ≤ 100 items and ≤ 4 MB total per transaction.
- No two operations in the same transaction may touch the **same item**.
- Idempotency: pass a `ClientRequestToken` so retries don't double-apply.

### When to use vs alternatives

- Use for cross-item invariants (transfer balance A→B, "create user iff username free").
- For single-item atomicity, a plain `UpdateItem` with a `ConditionExpression` is cheaper (optimistic concurrency, 1× cost) — see [[DynamoDB Consistency]].

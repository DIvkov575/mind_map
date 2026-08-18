Every [[DynamoDB]] partition is hosted by a **replication group**: a set of **storage nodes** (default 3) spread across 3 Availability Zones. This is the durability + availability unit. It replaces the leaderless, sloppy-quorum design of the original 2007 Dynamo with a **single-leader, Multi-Paxos** scheme.

### Storage node internals

A storage node holds two things per partition:
- A **B-tree** (a MySQL/InnoDB-derived engine) storing the actual items, keyed by the primary key.
- A **write-ahead replication log** (WAL) of ordered mutations, each tagged with a monotonic **log sequence number (LSN)**.

### Leader election

- One replica is **leader**, chosen by **Multi-Paxos**. The leader holds a time-bounded **lease**; only the lease-holder may serve **writes** and **strongly consistent reads** (see [[DynamoDB Consistency]]).
- Followers send heartbeats. Leases prevent two leaders from both believing they are current after a partition.
- **Gray-failure guard:** a follower that stops hearing the leader does **not** immediately trigger an election. It first asks the *other* replicas whether they still hear the leader. Only if a quorum has also lost contact does it propose a new leader. This stops a single one-way/degraded link from deposing a healthy leader.

### Write path (quorum)

1. Client write reaches the leader (via the [[DynamoDB Request Router]]).
2. Leader appends a record to its replication log, assigns the next LSN.
3. Leader fans the log record out to followers in the other AZs.
4. Once a **write quorum** — a majority, i.e. **2 of 3** (leader + 1 peer, ideally in a different AZ) — has durably persisted the record, the write is **acknowledged** to the client.
5. The leader applies the mutation to its B-tree; followers apply asynchronously by replaying the log.

Acknowledgement depends on log durability at a quorum, **not** on B-tree apply — that decoupling is what keeps write latency flat.

### Log replicas (availability trick)

Copying a full ~10 GB B-tree to heal a failed replica is slow, leaving the group at reduced redundancy meanwhile. DynamoDB instead spins up a lightweight **log replica**: it stores only the replication log, no B-tree. It can join the quorum in **seconds**, restoring write availability cheaply; a full storage replica is materialized in the background. This design was a direct lesson from making membership changes cheap and fast.

### Durability + verification

- Every log record and inter-node message carries **checksums**, verified at each hop and again at B-tree apply, to catch **silent data corruption**.
- Replication logs are archived to [[S3]]; point-in-time recovery replays them.
- A continuous background **scrub** re-reads replicas and re-verifies log-vs-B-tree agreement.
- Target availability: **99.99%** single-region, **99.999%** with [[DynamoDB Global Tables]].

Splitting a group when it grows or gets hot → [[DynamoDB Partition Split]].

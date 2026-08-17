The [[Lambda]] assignment layer reached through [[(LFIS) Lambda Frontend Invoke Service]]. It maps one admitted invocation to one compatible execution environment.

Internal implementation snapshot from `LambdaSandboxAssignmentService` mainline on 2026-08-14; this is not a public API or stable customer contract.

### Assignment procedure

1. Partition leadership keeps a `LeaderFunctionVersionStore` for each function-version identity and tenant-scoped idle inventory.
2. A healthy sandbox that completes and unreserves is appended to the top of an `IdleSandboxTracker` deque. Assignment pops from that same end, so the most recently idle compatible sandbox is reused first.
3. `select_existing_sandbox` tries sources in order: Idle, BusynessUnknown, then Unhealthy. A selected sandbox moves to `MarkedForAssignment`, receives a new reservation ID, and is associated with the request before eLSA sends Worker Reserve. A successful reserve moves it to Assigned.
4. If no existing sandbox is selectable, eLSA queues the request and starts or joins the cold allocation path in [[(Lambda) Placement]]. Pending assignment requests are FIFO, including tenant-specific FIFO indexes. A newly created sandbox is offered to a pending compatible request before it can remain idle.
5. A normal unreserve returns the sandbox to the top of the idle stack. An unreserve-timeout recovery inserts it at the bottom so it is not immediately preferred over recently confirmed-idle inventory.
6. A function-version store is evicted only after at least 15 minutes without an assignment request and only when it owns no sandboxes and has no pending assignment requests.

This is allocation management, not host management. eLSA owns request-to-sandbox state and delegates worker selection, creation, worker health, and leaked-record repair to other subsystems.

### Optimization implications

Warm-hit rate depends on recent concurrency, traffic shape, deployments, and how traffic is split across versions and aliases. The LIFO reuse policy concentrates traffic on recently active environments and leaves colder inventory available for reclamation. Provisioned concurrency supplies pre-initialized inventory for one version or alias. Consolidate latency-sensitive traffic, size provisioned inventory from observed concurrent demand, and never depend on receiving the same environment twice.

Internal sources: [`select_existing_sandbox`](https://code.amazon.com/packages/LambdaSandboxAssignmentService/blobs/mainline/--/partition_task/src/partition_store/leader_function_version_store.rs#L358-L395), [`IdleSandboxTracker`](https://code.amazon.com/packages/LambdaSandboxAssignmentService/blobs/mainline/--/partition_task/src/partition_store/idle_sandbox_tracker.rs#L23-L49), [`PendingAssignmentTracker`](https://code.amazon.com/packages/LambdaSandboxAssignmentService/blobs/mainline/--/partition_task/src/partition_store/pending_assignment_tracker.rs#L165-L321), and [function-version-store eviction](https://code.amazon.com/packages/LambdaSandboxAssignmentService/blobs/mainline/--/partition_task/src/partition_store/leader_partition_store.rs#L459-L500).


see [[Completely Fairr Scheduler (CFS)]]

A [[Distributed Compute]] problem: routing/scheduling many independent invocations across a worker fleet, rather than splitting one large computation across devices (contrast [[ML Distributed Training]]).

Quantitative limits: [[Lambda Concurrency and Scaling]], [[Lambda SQS Event Source Mapping Scaling]], and the combined [[Serverless Throughput Envelope]]. [[Step Functions]] is an independent orchestration allocator; it does not reserve Lambda execution environments.

---
Invocation arrives → [[(LFIS) Lambda Frontend Invoke Service]] hashes it to a partition → routed to the [[(eLSA) Lambda Sandbox Assignment]] node which checks the IdleSandboxTracker for that function version (+ tenant ID, if set) → queue non-empty → reuse triggered, pop the front entry.

**Partition** a shard of the routing/assignment problem space. LFIS computes a hash locally using a shared routing map (called the partition snapshot — kept in sync by a separate control plane) so it can immediately determine which eLSA node to talk to. Each partition is owned by a small group of eLSA nodes (one leader, two followers, keeping replicated state in sync) rather than a single point of failure.

Attributes that gate this lookup (must match for a candidate sandbox to be eligible): Function version, Tenant ID, CPU architecture (x86/ARM) 



**Cleanup**
Level 1: FunctionVersionStore eviction (bookkeeping, not sandbox destruction)
Scheduled maintenance job, every 5 minutes, run by the eLSA leader's PartitionStore, scanning every FunctionVersionStore it owns:
if now > last_request_millis + function_timeout + 15min:    evict this FunctionVersionStore

Level 2 (extension): per-sandbox destruction
Individual sandboxes are destroyed independently of the above, via eLSA calling [[(Lambda) Placement]]'s ScaleDownSandboxes/DestroySandbox, triggered by one of these categories:
- Expired: 
	- sandbox passed its last-safe-invoke time (signaled by the Worker's draining state)
	-  "Draining" is a signal the Worker sends about a sandbox that's on its way out — specifically, it marks the point after which that sandbox should no longer be considered safe to route new invokes to, because it's past its "last safe invoke time." eLSA tracks this signal and uses it to compute the "Expired" trigger from the table above: once a sandbox has been marked draining, further invokes stop being assigned to it, and it becomes eligible for scale-down once nothing is running on it anymore.
- Idle:
	-  [[(Lambda)(SLMS) Sandbox Lifecycle Management Service]] owns "Idle Sandboxes spin down" and exposes a CheckForScaleDown call that eLSA's Idle trigger relies on.
- Proactive termination:
	- Worker force-destroys it directly
- Defunct
	- Worker marks it permanently unusable (customer- or server-caused)
- Destroying 
	- Placement's fairness algorithm force-destroys it to rebalance the fleet
- Unhealthy / 3-strikes ("3SYO")
	- eLSA's local health tracking hits 3 failures (execution errors, or a missing unreserve signal after invoke completion)
The [[Lambda]] cold allocation path. Placement is needed only when [[(eLSA) Lambda Sandbox Assignment]] cannot reserve an idle compatible environment.

### Cold allocation

1. Admit one unit of concurrency for the invocation.
2. Allocate an isolated execution environment and prepare its configured memory, CPU share, architecture, ephemeral storage, runtime, code, layers, and extensions.
3. Run Init: extension initialization, runtime bootstrap, and function static initialization.
4. Deliver the pending event only after Init succeeds.

On-demand Init normally has a 10-second phase limit. If it does not finish, Lambda retries Init with the first invocation under the function timeout, up to 900 seconds. A function can create at most 1,000 new environments per 10 seconds in a Region; unused burst capacity does not accumulate beyond 1,000. Account and reserved concurrency can bind before that ramp.

Provisioned concurrency performs allocation and Init before traffic arrives for its configured version or alias. Traffic above that initialized inventory spills to on-demand allocation when concurrency remains available; individual provisioned environments are still recycled.

Lambda can occasionally initialize on-demand environments ahead of requests, but AWS explicitly says not to depend on that behavior. Provisioned concurrency is the control for guaranteed pre-initialized inventory.

### Internal worker health and stale-state management

Internal implementation snapshot from `LambdaPlacementService` and `LambdaElevatorFunctionManagement` mainline on 2026-08-14; these intervals and thresholds are operational configuration, not public guarantees.

There is no single fleet crawler for stale hosts. Two procedures cover different failure classes:

1. Worker health is event-attached. When a worker enters ACTIVE, `WorkerHealthCheckerOrchestrator` creates a scheduled check for that worker with 0–60 seconds of startup jitter. The primary worker ping runs every 5 seconds; a secondary worker-proxy ping runs every 30 seconds. Leaving ACTIVE cancels the scheduled check.
2. `WorkerHealthManager` tracks failures by signal. A gap longer than one minute resets the recent-failure state. The normal unhealthy decision requires at least three failures and a failure observed more than three minutes after the first; successful checks clear the pre-unhealthy state. Once accepted through AZ-ownership and rate-limit guards, the path first attempts isolation, otherwise records the worker unhealthy and performs a best-effort drain.
3. Sandbox-record drift is repaired separately. `SandboxReconcilerPeriodicProcessor` scans every minute across capacity providers owned by the host. For each provider, one reconciliation job at a time compares ACTIVE-worker inventory with LEGS and Router records, repairs missing or inconsistent state, removes orphaned routing records, and cleans records for TERMINATING workers.

Thus “stale host” detection is a per-worker scheduled health monitor, while “stale sandbox record” detection is a one-minute capacity-provider reconciliation scan.

### Cold-path optimization

- Remove unused dependencies, layers, and extensions. Their loading and initialization are paid for every new environment.
- Keep frequently reused client construction and immutable setup in Init; lazy-load large or rare features so common requests do not pay for them.
- Increase memory for CPU-bound decompression, dependency loading, JIT, or static initialization; CPU scales with memory.
- Put latency-sensitive steady capacity on provisioned concurrency and schedule it before predictable bursts. Reactive scaling cannot remove the first burst's cold path.
- Reduce abrupt fan-out at the source. Batching and bounded concurrency let existing environments finish and return to the idle pool instead of forcing a large cold allocation wave.

Worker choice and fleet placement are not customer tuning surfaces. The internal procedures above explain cleanup and failure detection, but their exact constants may change independently of Lambda's public behavior.

Sources: [public Lambda execution environment lifecycle](https://docs.aws.amazon.com/lambda/latest/dg/lambda-runtime-environment.html), [Lambda scaling behavior](https://docs.aws.amazon.com/lambda/latest/dg/scaling-behavior.html), and [provisioned concurrency](https://docs.aws.amazon.com/lambda/latest/dg/provisioned-concurrency.html); internal [`WorkerHealthCheckModule`](https://code.amazon.com/packages/LambdaPlacementService/blobs/mainline/--/src/com/amazonaws/lambda/placementservice/guice/WorkerHealthCheckModule.java#L31-L50), [`WorkerHealthCheckerOrchestrator`](https://code.amazon.com/packages/LambdaPlacementService/blobs/mainline/--/src/com/amazonaws/lambda/placementservice/worker/health/WorkerHealthCheckerOrchestrator.java#L57-L180), [`WorkerHealthManager`](https://code.amazon.com/packages/LambdaPlacementService/blobs/mainline/--/src/com/amazonaws/lambda/placementservice/worker/health/WorkerHealthManager.java#L340-L430), [`SandboxReconcilerPeriodicProcessor`](https://code.amazon.com/packages/LambdaElevatorFunctionManagement/blobs/mainline/--/src/com/amazonaws/lambda/elevator/functionmanagement/jobs/SandboxReconcilerPeriodicProcessor.java#L23-L87), [`SandboxReconciler`](https://code.amazon.com/packages/LambdaElevatorFunctionManagement/blobs/mainline/--/src/com/amazonaws/lambda/elevator/functionmanagement/jobs/SandboxReconciler.java#L23-L103), and [`SandboxReconciliationJobv2`](https://code.amazon.com/packages/LambdaElevatorFunctionManagement/blobs/mainline/--/src/com/amazonaws/lambda/elevator/functionmanagement/jobs/SandboxReconciliationJobv2.java#L83-L230).

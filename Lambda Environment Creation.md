The [[Lambda]] cold path. Environment creation is needed only when [[Lambda Environment Assignment]] cannot reserve an idle compatible environment.

### Cold allocation

1. Admit one unit of concurrency for the invocation.
2. Allocate an isolated execution environment and prepare its configured memory, CPU share, architecture, ephemeral storage, runtime, code, layers, and extensions.
3. Run Init: extension initialization, runtime bootstrap, and function static initialization.
4. Deliver the pending event only after Init succeeds.

On-demand Init normally has a 10-second phase limit. If it does not finish, Lambda retries Init with the first invocation under the function timeout, up to 900 seconds. A function can create at most 1,000 new environments per 10 seconds in a Region; unused burst capacity does not accumulate beyond 1,000. Account and reserved concurrency can bind before that ramp.

Provisioned concurrency performs allocation and Init before traffic arrives for its configured version or alias. Traffic above that initialized inventory spills to on-demand allocation when concurrency remains available; individual provisioned environments are still recycled.

Lambda can occasionally initialize on-demand environments ahead of requests, but AWS explicitly says not to depend on that behavior. Provisioned concurrency is the control for guaranteed pre-initialized inventory.

### Worker health and stale state

The implementation details below were verified against mainline source on 2026-08-14. Intervals and thresholds are operational configuration, not public guarantees.

There is no single fleet crawler for stale hosts. Two procedures cover different failure classes:

1. When a worker becomes active, Lambda schedules health checks with 0–60 seconds of startup jitter. The primary worker ping runs every 5 seconds; a secondary proxy ping runs every 30 seconds. Leaving the active state cancels the checks.
2. Health state is tracked by signal. A gap longer than one minute resets recent failures. The normal unhealthy decision requires at least three failures and a failure more than three minutes after the first. Success clears the pending unhealthy state. Confirmed unhealthy workers are isolated when possible, otherwise marked unhealthy and drained best-effort.
3. A separate reconciler scans every minute across capacity providers owned by the host. Only one reconciliation runs per provider. It compares active-worker inventory with environment and routing records, repairs missing or inconsistent state, removes orphaned routes, and cleans records for terminating workers.

Host health therefore uses scheduled checks per worker. Stale environment records use a separate one-minute inventory reconciliation.

### How to reduce cold starts

- Remove unused dependencies, layers, and extensions. Their loading and initialization are paid for every new environment.
- Keep frequently reused client construction and immutable setup in Init; lazy-load large or rare features so common requests do not pay for them.
- Increase memory for CPU-bound decompression, dependency loading, JIT, or static initialization; CPU scales with memory.
- Put latency-sensitive steady capacity on provisioned concurrency and schedule it before predictable bursts. Reactive scaling cannot remove the first burst's cold path.
- Reduce abrupt fan-out at the source. Batching and bounded concurrency let existing environments finish and return to the idle pool instead of forcing a large cold allocation wave.

Worker choice and fleet placement are not customer tuning surfaces. The internal procedures above explain cleanup and failure detection, but their exact constants may change independently of Lambda's public behavior.

The [[Lambda]] environment-reuse, reset, and destruction path. The lifecycle optimizer recommends idle scale-down; the assignment layer owns the per-function-version timers and applies the returned actions.

### State transitions

1. Invoke complete: the runtime and every extension report completion. Lambda freezes the process state and `/tmp` rather than running cleanup between invocations.
2. Warm reuse: a later invocation thaws the environment and enters the handler without Init.
3. Invocation failure: Lambda resets the runtime and extensions. `/tmp` survives the reset; the next request may perform a suppressed Init whose time is folded into invocation duration.
4. Reclamation: Lambda shuts down and destroys environments that are idle, draining, unhealthy, rebalanced, or recycled for maintenance. Idle lifetime is intentionally unspecified, and even continuously used environments are recycled every few hours.

Shutdown time is 0 ms without extensions, 500 ms with an internal extension, and 2,000 ms with external extensions; Lambda kills remaining processes after the limit. This is not a reliable finalization window.

### Scale-down and return

The implementation details below were verified against mainline source on 2026-08-14. Configuration can change and is not a public contract.

1. Every active function-version state owns a jittered scale-down timer with a 60-second period. A separate close-to-expiry scan and the return executor also run every 60 seconds.
2. The assignment layer sends the optimizer a snapshot of the function version and its idle environments.
3. The on-demand policy chain makes explicit and quantitative decisions. The maximum-idle policy selects environments beyond its configured limit, which defaults to 600 seconds. Fixed-overhead, single-environment, and periodic-function policies independently request counts; the final quantitative result takes their maximum.
4. The result merger unions explicit environment IDs, takes the maximum requested count, and fills only the shortfall through the configured idle selector. The current default can select those extra IDs randomly without repetition. Experiments or alternate selectors can change this; it is not a fixed least-recently-used contract.
5. The assignment layer marks selected environments for return, preventing new assignment. The 60-second return timer later executes the scale-down or shelving action; a failed return can be retried on a later tick.
6. Lease expiry and worker draining use the separate 60-second close-to-expiry path. The assignment layer schedules proactive replacement before the last safe invocation time, then marks the old environment for return.

The leaked-environment backstop is deliberately slower than normal cleanup:

$$T_{leak}=10\text{ min}+2(60\text{ s})+2(60\text{ s})+T_{function}+5\text{ min}=19\text{ min}+T_{function}$$

The terms cover maximum idle time, two scale-down cycles, two return cycles, the function timeout, and a five-minute leadership-flap buffer. This is distinct from worker health detection and the separate one-minute inventory reconciler described in [[Lambda Environment Creation]].

### How to use reuse safely

- Cache immutable assets, SDK clients, connection pools, and downloaded data in process state or `/tmp`; treat every cache miss as normal and never use reuse for correctness.
- Enable keep-alive and reconnect on stale sockets. Frozen environments can outlive an upstream idle connection.
- Complete durable writes before returning from the handler. Do not rely on destructors, background threads, shutdown hooks, or post-response flushing.
- Minimize extensions. Each extension adds Init work, must finish every Invoke before freeze, and changes shutdown behavior.
- Expect rare resets and reinitialization under provisioned concurrency; it preserves a ready count, not specific environments.

`/tmp` is configurable from 512 MB to 10,240 MB and survives freeze/thaw and reset, but not destruction.

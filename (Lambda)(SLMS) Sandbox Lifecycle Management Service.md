The [[Lambda]] execution-environment reuse, reset, and destruction path. The current idle scale-down recommendation path is implemented by the Sandbox Lifecycle Optimization Service (SLOS); eLSA owns the per-function-version timers and executes the returned actions. SLMS remains involved in other lifecycle functions.

### State transitions

1. Invoke complete: the runtime and every extension report completion. Lambda freezes the process state and `/tmp` rather than running cleanup between invocations.
2. Warm reuse: a later invocation thaws the environment and enters the handler without Init.
3. Invocation failure: Lambda resets the runtime and extensions. `/tmp` survives the reset; the next request may perform a suppressed Init whose time is folded into invocation duration.
4. Reclamation: Lambda shuts down and destroys environments that are idle, draining, unhealthy, rebalanced, or recycled for maintenance. Idle lifetime is intentionally unspecified, and even continuously used environments are recycled every few hours.

Shutdown time is 0 ms without extensions, 500 ms with an internal extension, and 2,000 ms with external extensions; Lambda kills remaining processes after the limit. This is not a reliable finalization window.

### Internal scale-down and return procedure

Internal implementation snapshot from `LambdaSandboxAssignmentService` and `LambdaSandboxLifecycleOptimizationService` mainline on 2026-08-14; configuration can change and is not a public customer contract.

1. Every active function-version store owns a jittered `CheckForScaleDown` interval timer with a 60-second period. A separate close-to-expiry scan and the return executor also run every 60 seconds.
2. eLSA sends SLOS a snapshot containing the function-version summary and idle-sandbox metadata.
3. The on-demand SLOS chain makes explicit and quantitative decisions. `SandboxMaxIdleTimePolicy` explicitly selects sandboxes beyond its configured maximum idle time; the default configuration is 600 seconds. `FixedOverheadPolicy`, `SingleSandboxPolicy`, and `PeriodicFunctionPolicy` independently request counts, and the quantitative result takes their maximum.
4. The result merger unions explicit sandbox IDs, takes the maximum quantitative count, and fills only the shortfall through the configured idle selector. The current default can select those extra IDs randomly without repetition, and experiments or alternate selectors can change this; it is not a fixed LRU contract.
5. eLSA journals the recommended transition to `MarkedForReturn`, preventing new assignment. The 60-second return timer later executes the requested scale-down or shelving action; a failed return can be retried on a later tick.
6. Lease expiry and worker draining use the separate 60-second close-to-expiry path. eLSA schedules proactive replacement before the last safe invoke time, then marks the old sandbox for return.

Placement's leaked-sandbox backstop is deliberately slower than normal eLSA cleanup:

$$T_{leak}=10\text{ min}+2(60\text{ s})+2(60\text{ s})+T_{function}+5\text{ min}=19\text{ min}+T_{function}$$

The terms cover maximum idle time, two scale-down cycles, two return cycles, the function timeout, and a five-minute leadership-flap buffer. This is distinct from worker health detection and the separate one-minute inventory reconciler described in [[(Lambda) Placement]].

### Reuse optimization

- Cache immutable assets, SDK clients, connection pools, and downloaded data in process state or `/tmp`; treat every cache miss as normal and never use reuse for correctness.
- Enable keep-alive and reconnect on stale sockets. Frozen environments can outlive an upstream idle connection.
- Complete durable writes before returning from the handler. Do not rely on destructors, background threads, shutdown hooks, or post-response flushing.
- Minimize extensions. Each extension adds Init work, must finish every Invoke before freeze, and changes shutdown behavior.
- Expect rare resets and reinitialization under provisioned concurrency; it preserves a ready count, not specific environments.

`/tmp` is configurable from 512 MB to 10,240 MB and survives freeze/thaw and reset, but not destruction.

Sources: [public Lambda execution environment lifecycle](https://docs.aws.amazon.com/lambda/latest/dg/lambda-runtime-environment.html); internal [`LeaderSandboxLifecycleTracker`](https://code.amazon.com/packages/LambdaSandboxAssignmentService/blobs/mainline/--/partition_task/src/partition_store/leader_sandbox_lifecycle_tracker.rs#L250-L330), [eLSA lifecycle constants and leak TTL](https://code.amazon.com/packages/LambdaSandboxAssignmentService/blobs/mainline/--/elsa_types/src/lib.rs#L44-L105), [on-demand SLOS policy chain](https://code.amazon.com/packages/LambdaSandboxLifecycleOptimizationService/blobs/mainline/--/src/com/amazon/lambdasandboxlifecycleoptimizationservice/guice/checkforscaledown/OnDemandScaleDownChainModule.java#L31-L86), [`ExplicitSelectionFirstMerger`](https://code.amazon.com/packages/LambdaSandboxLifecycleOptimizationService/blobs/mainline/--/src/com/amazon/lambdasandboxlifecycleoptimizationservice/scaledown/process/ExplicitSelectionFirstMerger.java#L30-L102), and [`SandboxMaxIdleTimePolicyConfig`](https://code.amazon.com/packages/LambdaSandboxLifecycleOptimizationService/blobs/mainline/--/src/com/amazon/lambdasandboxlifecycleoptimizationservice/sdc/policyconfigurations/SandboxMaxIdleTimePolicyConfig.java#L30-L55).

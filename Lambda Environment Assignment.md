The [[Lambda]] environment-assignment step reached through [[Lambda Request Routing]]. It maps one admitted invocation to one compatible execution environment.

The implementation details below were verified against mainline source on 2026-08-14. They are operational behavior, not a public contract.

### Assignment procedure

1. Assignment state is kept per function version, with tenant-scoped idle inventory.
2. A healthy environment returns to the top of an idle stack after invocation. Assignment also takes from the top, so the most recently idle compatible environment is reused first.
3. Selection prefers idle environments, then environments whose busy state is uncertain, then unhealthy environments. A selected environment is bound to the request and marked unavailable before the worker reservation. A successful reservation marks it assigned.
4. If no existing environment is selectable, the request is queued and the cold path starts or continues in [[Lambda Environment Creation]]. Pending requests are FIFO. A newly created environment is offered to a compatible waiting request before it can remain idle.
5. A normal release returns the environment to the top of the idle stack. A release-timeout recovery inserts it at the bottom so it is not immediately preferred over recently confirmed-idle inventory.
6. Empty per-version state is evicted only after at least 15 minutes without a request and only when it has no environments or pending requests.

This note covers request-to-environment state. Worker choice, creation, worker health, and stale-record repair belong to [[Lambda Environment Creation]].

### What to optimize

Warm-hit rate depends on recent concurrency, traffic shape, deployments, and how traffic is split across versions and aliases. Reusing the most recently idle environment concentrates traffic on recently active environments and leaves colder inventory available for reclamation. Provisioned concurrency supplies pre-initialized inventory for one version or alias. Consolidate latency-sensitive traffic, size provisioned inventory from observed concurrent demand, and never depend on receiving the same environment twice.

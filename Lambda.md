[[Lambda]] is a distributed invocation scheduler. It allocates isolated execution environments to concurrent requests; a standard environment runs exactly one invocation at a time.

### When an invocation exists

- Synchronous API: allocation starts after admission; the caller waits for the handler response.
- Asynchronous API: Lambda accepts the event into its queue, then allocates compute when the event is dequeued for an attempt.
- Event-source mapping: Lambda polls the source, assembles a batch, then invokes the function once for that batch. See [[Lambda SQS Event Source Mapping Scaling]].
- Step Functions: entering a Lambda Task invokes the function. Wait states and callback waiting do not hold a Lambda environment.

### Allocation path

1. Admission checks function reserved concurrency and remaining account concurrency.
2. [[(LFIS) Lambda Frontend Invoke Service]] routes the request to [[(eLSA) Lambda Sandbox Assignment]].
3. If a compatible initialized environment is idle, Lambda reserves it and takes the warm path.
4. Otherwise [[(Lambda) Placement]] allocates an environment, prepares code and runtime resources, and runs Init before Invoke. New allocation is also gated by the per-function scaling rate.
5. The runtime receives one event. The environment remains reserved until the runtime and every extension report completion.
6. [[(Lambda)(SLMS) Sandbox Lifecycle Management Service]] freezes a healthy environment for possible reuse, resets it after an invocation failure, or destroys it when drained, unhealthy, idle, or recycled.

Reuse is opportunistic. Process objects, connections, and `/tmp` can survive freeze/thaw, but no idle lifetime or next-use guarantee exists.

### Performance hot paths

- Warm: routing → reserve idle environment → handler → downstream I/O → response. Handler duration, serialization, network calls, and connection reuse dominate.
- Cold: warm path plus environment allocation and Init. Package loading, runtime startup, extensions, static initialization, and CPU available during Init dominate.
- Burst: cold path plus the 1,000 new environments per function per 10 seconds allocation ramp and concurrency admission. Requests above available capacity throttle, queue, or remain at the event source.
- Failure/retry: reset and possible suppressed Init add latency; retries multiply both allocation demand and downstream load.

### Optimization order

1. Remove unnecessary Lambda hops with native service integrations; never sleep or poll inside a handler.
2. Reduce warm duration: reuse clients and connections, use keep-alive, cache immutable data in memory or `/tmp`, and batch work where latency permits.
3. Reduce cold Init: remove dependencies and extensions, lazy-load rare paths, and move only genuinely reusable setup outside the handler.
4. Increase memory when CPU-bound work or Init becomes faster enough to reduce duration and concurrency.
5. Use reserved or source-level concurrency to protect the narrowest downstream resource. Use provisioned concurrency for measured cold-start tail latency, not as a substitute for capacity control.

See [[Lambda Concurrency and Scaling]] and [[Serverless Throughput Envelope]].

Sources: [Lambda execution environment lifecycle](https://docs.aws.amazon.com/lambda/latest/dg/lambda-runtime-environment.html), [Lambda scaling behavior](https://docs.aws.amazon.com/lambda/latest/dg/scaling-behavior.html), and [Lambda invocation modes](https://docs.aws.amazon.com/lambda/latest/dg/lambda-invocation.html).
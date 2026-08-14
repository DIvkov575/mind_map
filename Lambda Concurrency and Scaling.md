A standard [[Lambda]] execution environment runs one invocation at a time. Lambda scales a function by assigning idle environments or allocating more environments; it does not add concurrent requests to one environment.

### Allocation dynamics

For arrival rate $R$ requests/s and mean occupied duration $D$ seconds, steady compute demand is

$$C_{\text{required}}=RD.$$

Occupied duration includes handler work and extensions that have not reported completion. Cold Init adds latency to the request that caused allocation but does not change the one-invocation-per-environment rule.

For each request:

1. Idle inventory exists: reserve one environment and invoke immediately on the warm path.
2. No idle inventory, concurrency available: allocate and initialize one environment on the cold path.
3. Concurrency unavailable: synchronous requests throttle; asynchronous requests remain queued; poll-based sources retain backlog and reduce or stop new invokes.

New on-demand inventory can grow by at most 1,000 environments per function per 10 seconds. A burst therefore starts with warm plus provisioned inventory, then adds at most this allocation wave while account and reserved concurrency remain available.

Synchronous invocation also has a request-rate ceiling of 10 × concurrency. Below 100 ms mean duration, that request-rate ceiling can bind before environment concurrency; above 100 ms, $RD$ usually binds first.

### Controls with different jobs

- Reserved concurrency reserves capacity for the function and is also a hard maximum. Set it from the narrowest downstream connection, transaction, or rate limit.
- Provisioned concurrency is a pre-initialized warm baseline for a version or alias. It reduces cold-path latency but does not protect a downstream system and is not a maximum.
- Source maximum concurrency bounds a specific event source before it consumes all function concurrency.
- Step Functions Map maximum concurrency bounds orchestration fan-out; it does not reserve Lambda environments.

Traffic above provisioned concurrency can use on-demand environments until reserved or account concurrency binds. Sharp predictable bursts need scheduled provisioned capacity; reactive target tracking observes demand only after it begins.

### Highest-leverage optimization

1. Reduce occupied duration $D$: remove blocking, batch network calls, reuse clients and sockets, and move waiting into Step Functions Wait or callback states.
2. Tune memory with measurement. CPU allocation increases with memory and is approximately one vCPU at 1,769 MB; a faster function releases its environment sooner and needs less concurrency.
3. Reduce allocation churn: avoid needless version/alias fragmentation, deploy before the peak, and smooth fan-out so completed environments can be reused.
4. Bound concurrency at the producer to the downstream limit. Unbounded fan-out converts queueing into throttles, cold starts, retries, and connection storms.
5. Use provisioned concurrency only when p95/p99 latency shows Init is material. It does not improve a slow warm handler.

Measure `ConcurrentExecutions`, `Throttles`, `Duration`, `Init Duration`, `PostRuntimeExtensionsDuration`, and `ProvisionedConcurrencySpilloverInvocations`. Separate warm, cold, and retry samples before choosing a lever.

See [[(Lambda) Placement]], [[(Lambda)(SLMS) Sandbox Lifecycle Management Service]], and [[Serverless Throughput Envelope]].

Sources: [Lambda scaling behavior](https://docs.aws.amazon.com/lambda/latest/dg/scaling-behavior.html), [Lambda concurrency](https://docs.aws.amazon.com/lambda/latest/dg/lambda-concurrency.html), [Lambda metrics](https://docs.aws.amazon.com/lambda/latest/dg/monitoring-metrics-types.html), and [provisioned concurrency](https://docs.aws.amazon.com/lambda/latest/dg/provisioned-concurrency.html).
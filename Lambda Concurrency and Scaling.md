A standard [[Lambda]] execution environment handles **one invocation at a time**. Scaling adds isolated execution environments; optimization means matching request rate, duration, concurrency, and downstream capacity.

### Capacity model

Let $R$ be requests/s, $D$ mean duration in seconds, and $C$ usable concurrency. Little's Law gives the required steady-state concurrency:

$$C_{\text{required}}=RD.$$

For synchronous invocation, Lambda also applies a request-rate limit of $10C$, so

$$R_{\lambda}\le\min\left(\frac{C}{D},10C\right).$$

The crossover is $D=100$ ms. Below 100 ms, the request-rate quota can bind before concurrency; above 100 ms, duration usually makes concurrency the tighter limit. Asynchronous invocation is concurrency-limited but is not subject to the synchronous $10C$ request-rate rule.

| mean duration | concurrency needed at 10,000 requests/s | throughput with $C=1{,}000$ |
|---:|---:|---:|
| 20 ms | 200 | 10,000/s, request-rate limited |
| 100 ms | 1,000 | 10,000/s, both limits equal |
| 250 ms | 2,500 | 4,000/s, concurrency limited |
| 1 s | 10,000 | 1,000/s, concurrency limited |

### Public resource limits

| resource | default or hard limit |
|---|---:|
| account concurrency | 1,000 per Region; adjustable |
| concurrency left for unreserved functions | at least 100 |
| per-function scale-up | 1,000 environments per 10 s, or 10,000 additional requests/s per 10 s |
| memory | 128–10,240 MB in 1-MB increments |
| CPU allocation | proportional to memory; about 1 vCPU at 1,769 MB |
| function timeout | 900 s |
| ephemeral `/tmp` | 512–10,240 MB |
| synchronous request/response payload | 6 MB each |
| asynchronous invocation payload | 1 MB |
| streamed synchronous response | 200 MB; after the first 6 MB, 2 MB/s |
| file descriptors; processes/threads | 1,024 each per environment |

The per-function scaling allowance refills continuously and does not accumulate beyond 1,000 environments. Traffic above the available scale rate or concurrency receives throttling responses.

### Concurrency controls

- **Reserved concurrency** dedicates capacity and simultaneously caps the function. It costs nothing and is the correct control when a database, API, or connection pool has a hard concurrency ceiling.
- **Provisioned concurrency** pre-initializes a version or alias; it cannot target `$LATEST`. It may not exceed the function's reserved concurrency when both are configured.
- With the default 1,000 account quota and no other reservations, one function can receive at most **900** provisioned units because 100 remain available to unreserved functions.
- A provisioned alias/version can accept up to **10 × provisioned concurrency** synchronous requests/s. Excess traffic can spill into on-demand capacity if unreserved concurrency remains.
- AWS recommends sizing provisioned concurrency around observed peak concurrency plus roughly **10%**. A peak of 200 therefore suggests about 220 provisioned environments.
- Application Auto Scaling target tracking accepts utilization targets from **10% to 90%**. It needs three breaching data points and burst load sustained for at least about **3 minutes**, so scheduled scaling or a higher baseline is safer for short predictable bursts.

### Optimization levers

- Increasing memory also increases CPU. For CPU-bound work, a higher memory setting can reduce $D$ enough to lower both required concurrency and total cost; measure rather than minimizing memory.
- Initialize reusable clients, connections, and static assets outside the handler and reuse `/tmp`; this reduces warm-invocation duration. Keep-alive is required because Lambda eventually purges idle connections.
- Load-test the complete path. Lambda can scale faster than a database, API, ENI pool, or Step Functions quota, so reserved concurrency should encode the smallest downstream limit.
- Monitor duration, concurrency, throttles, provisioned-concurrency spillover, and maximum memory used. Optimize the observed bottleneck rather than one resource in isolation.

See [[(Lambda) Placement]] for cold-path ramp and [[Serverless Throughput Envelope]] for combined Step Functions/Lambda sizing.

Sources: [Lambda quotas](https://docs.aws.amazon.com/lambda/latest/dg/gettingstarted-limits.html), [Lambda scaling behavior](https://docs.aws.amazon.com/lambda/latest/dg/scaling-behavior.html), [Lambda concurrency](https://docs.aws.amazon.com/lambda/latest/dg/lambda-concurrency.html), and [provisioned concurrency](https://docs.aws.amazon.com/lambda/latest/dg/provisioned-concurrency.html).
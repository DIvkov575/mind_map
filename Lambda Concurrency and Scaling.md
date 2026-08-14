A [[Lambda]] execution environment handles **one invocation at a time**. Scaling means adding more isolated [[Firecracker microVM|execution environments]].

Let:
- $C$ = usable concurrency
- $D$ = average invocation duration in seconds

A synchronous steady-state upper bound is

$$R_{\lambda} \le \min\left(\frac{C}{D},\;10C\right)$$

because concurrency allows at most $C/D$ completions per second, while the synchronous request-rate quota is generally $10C$ requests/s.

**Public limits**

- Default account concurrency: **1,000 per Region**.
- Per-function creation rate: **1,000 new execution environments per 10 seconds**; the allowance refills continuously and does not accumulate indefinitely.
- Reserved concurrency reserves capacity but does **not** prewarm it.
- Provisioned concurrency pre-initializes environments; an alias/version can receive **10 × provisioned concurrency** requests/s.

**Examples at $C=1{,}000$**

| mean duration $D$ | concurrency bound $C/D$ | request bound $10C$ | effective upper bound |
|---:|---:|---:|---:|
| 20 ms | 50,000/s | 10,000/s | 10,000/s |
| 100 ms | 10,000/s | 10,000/s | 10,000/s |
| 1 s | 1,000/s | 10,000/s | 1,000/s |

A fully cold jump requiring 5,000 additional environments cannot be allocated in one burst: the function-level scaling allowance is capped at 1,000 environments and refills continuously. Existing warm capacity and provisioned concurrency reduce the number of new environments required.

See [[Serverless Throughput Envelope]] for the combined Step Functions/Lambda model.

Sources: [Lambda scaling behavior](https://docs.aws.amazon.com/lambda/latest/dg/scaling-behavior.html) and [Lambda concurrency](https://docs.aws.amazon.com/lambda/latest/dg/lambda-concurrency.html).
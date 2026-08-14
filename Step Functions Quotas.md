Customer-visible allocation limits for [[Step Functions]]. Token buckets allow a short burst of `bucket size`, then sustain `refill rate`. These values are defaults per account per Region; new accounts can start lower, soft quotas can be raised, and AWS may change bucket values.

### High-rate operations

| operation | major Regions* bucket/refill | other Regions bucket/refill |
|---|---:|---:|
| Standard state transitions | 5,000 / 5,000 s⁻¹ | 800 / 800 s⁻¹ |
| Standard `StartExecution` | 1,300 / 300 s⁻¹ | 800 / 150 s⁻¹ |
| Express `StartExecution` | 6,000 / 6,000 s⁻¹ | 6,000 / 6,000 s⁻¹ |
| HTTP Task | 300 / 300 s⁻¹ | 300 / 300 s⁻¹ |
| `DescribeExecution` | 300 / 15 s⁻¹ | 250 / 10 s⁻¹ |
| `GetExecutionHistory` | 400 / 20 s⁻¹ | 400 / 20 s⁻¹ |
| `SendTaskSuccess`, `Failure`, or `Heartbeat` | 3,000 / 500 s⁻¹ | 1,500 / 300 s⁻¹ |

*Major Regions: `us-east-1`, `us-west-2`, and `eu-west-1`.

For offered rate $A$ above refill $r$, an initially full bucket $b$ lasts

$$t_{\text{burst}}=\frac{b}{A-r}.$$

- Standard starts at 1,000/s in a major Region exhaust the 1,300-token bucket after $1300/(1000-300)=1.86$ s.
- Standard transitions at 7,000/s exhaust the 5,000-token bucket after $5000/(7000-5000)=2.5$ s.
- At the sustained major-Region start limit of 300/s, 5,000 transitions/s support **16.7 transitions/execution** before transitions bind. Other Regions support **5.33** at 150 starts/s.

### Hard and structural limits

| resource | limit |
|---|---:|
| state-machine definition; API request | 1 MB each |
| state/task/execution input or output | 256 KiB |
| open Standard executions | 1,000,000/account/Region by default |
| Standard execution/history | 1 year / 25,000 events |
| Express execution | 5 minutes |
| HTTP Task duration | 60 seconds |
| registered state machines; activities | 100,000 each by default |
| versions; aliases per state machine | 1,000 / 100 |
| open Distributed Map Runs | 1,000 |
| parallel children per Map Run | 10,000 |
| Map Run redrives | 1,000 |

`StartSyncExecution` has no fixed account token bucket, but surges can be throttled until capacity scales. Express transitions do not consume the Standard transition bucket.

Optimization rule: compute both data-plane and control-plane demand. A workflow can fit the start and transition budgets while a dashboard or poller still throttles on `DescribeExecution` or `GetExecutionHistory` refill.

Source: [Step Functions service quotas](https://docs.aws.amazon.com/step-functions/latest/dg/service-quotas.html).
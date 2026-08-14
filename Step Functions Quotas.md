Customer-visible allocation limits for [[Step Functions]]. Token buckets permit a short burst of `bucket size`, then sustain `refill rate`.

| operation | major Regions* bucket/refill | other Regions bucket/refill |
|---|---:|---:|
| Standard state transitions | 5,000 / 5,000 s⁻¹ | 800 / 800 s⁻¹ |
| Standard `StartExecution` | 1,300 / 300 s⁻¹ | 800 / 150 s⁻¹ |
| Express `StartExecution` | 6,000 / 6,000 s⁻¹ | 6,000 / 6,000 s⁻¹ |
| HTTP Task | 300 / 300 s⁻¹ | 300 / 300 s⁻¹ |

*Major Regions: `us-east-1`, `us-west-2`, `eu-west-1`.

For offered rate $A$ above refill $r$, an initially full bucket $b$ lasts approximately

$$t_{\text{burst}} = \frac{b}{A-r}.$$

Examples:

- Major-Region Standard starts offered at 1,000/s: $1300/(1000-300)=\mathbf{1.86\ s}$ before steady throttling.
- Standard transitions offered at 7,000/s: $5000/(7000-5000)=\mathbf{2.5\ s}$.

At the sustained major-Region start limit of 300 workflows/s, the 5,000-transition/s refill supports an average of

$$5000/300 = \mathbf{16.7\ transitions/workflow}$$

before transition refill becomes tighter than start refill. In other Regions, $800/150=\mathbf{5.33}$ transitions/workflow.

Other limits: **1,000,000** open Standard executions/account/Region; **25,000** Standard history events; Express state transitions are not subject to the Standard `StateTransition` bucket.

Source: [Step Functions service quotas](https://docs.aws.amazon.com/step-functions/latest/dg/service-quotas.html).
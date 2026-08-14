A high-concurrency Map processing mode inside a [[Step Functions Standard Workflow]]. Each item or batch runs as a separate Standard or Express child workflow with its own execution history.

Use Distributed mode when Inline Map would be constrained by more than **40** concurrent iterations, a dataset above **256 KiB**, or a parent history approaching **25,000 events**.

### Hard limits and dispatch rates

| resource | limit |
|---|---:|
| open Map Runs/account/Region | 1,000 |
| parallel children/Map Run | 10,000 |
| Map Run redrives | 1,000 |
| Express-child dispatch | up to 1,000/s |
| Standard-child dispatch | up to 100/s |

Omitting maximum concurrency or setting it to zero permits up to 10,000 parallel children. This is usually unsafe when a child calls a capacity-limited service.

### Capacity model

Let $M$ be configured child concurrency, $D_c$ mean child duration, $B$ items per child, and $r_d$ child dispatch/s. Steady item throughput is bounded by

$$R_{\text{items}}\le B\min\left(r_d,\frac{M}{D_c}\right).$$

If each child can have one Lambda invocation active at once, also require $M\le C_{\lambda}$. More generally, if each child can hold $k$ simultaneous Lambda invocations, require $kM\le C_{\lambda}$.

Example: $M=700$, $D_c=2$ s, and $B=20$. Express-child dispatch allows $20\times\min(1000,350)=7{,}000$ items/s. Standard-child dispatch limits the same design to $20\times\min(100,350)=2{,}000$ items/s.

### Optimization controls

- `ItemBatcher` amortizes child-start and fixed task overhead. Batch size is ultimately constrained by the **256 KiB** child input/output limit and downstream service payload limits.
- Set maximum concurrency from downstream capacity rather than the 10,000 service maximum.
- `ResultWriter` exports child results to S3 and avoids assembling one large result array in workflow state.
- Failure thresholds accept a count, a percentage from **0 to 100**, or both; exceeding either threshold fails the Map Run. Children may continue briefly while failure is recognized.
- Retrying the Distributed Map state applies to all child workflows and creates a new Map Run, not only the failed child. This can multiply work sharply; make children idempotent and prefer targeted redrive when appropriate.

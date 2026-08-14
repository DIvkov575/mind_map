A `Map` state processing mode for large-scale parallel work in a [[Step Functions Standard Workflow]]. Each item or batch runs as a separate Standard or Express child workflow execution.

Use Distributed mode when an Inline Map would be constrained by its **40** concurrent iterations, a **256 KiB** workflow payload, or the parent workflow's **25,000-event** execution-history limit.

**Control surface**

- `ItemReader` selects input from a preceding state or a supported Amazon S3 dataset.
- `ItemBatcher` groups input items before child execution.
- `MaxConcurrency` bounds parallel child workflows; `0` or omission allows up to the service limit.
- `ToleratedFailureCount` and `ToleratedFailurePercentage` define when the Map Run fails.
- `ResultWriter` exports child results to Amazon S3 rather than returning one large in-memory array.

**Public limits**

- Open Map Runs per account per Region: **1,000**.
- Parallel child executions per Map Run: **10,000**.
- Map Run redrives: **1,000**.
- Express child dispatch: up to **1,000/s**.
- Standard child dispatch: up to **100/s**.

The configured concurrency should not exceed downstream capacity such as [[Lambda]] concurrency.

Sources: [Distributed Map state](https://docs.aws.amazon.com/step-functions/latest/dg/state-map-distributed.html) and [Step Functions service quotas](https://docs.aws.amazon.com/step-functions/latest/dg/service-quotas.html).
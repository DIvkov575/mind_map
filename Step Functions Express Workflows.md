The high-volume [[Step Functions]] workflow type. Express executions run for at most **5 minutes** and use CloudWatch Logs rather than service-managed execution history.

### Asynchronous Express

- `StartExecution` returns after start rather than waiting for the result.
- Execution is **at-least-once**, so every side effect must tolerate duplicate execution.
- The default per-account, per-Region start bucket is **6,000**, refilling at **6,000 starts/s**.

### Synchronous Express

- `StartSyncExecution` waits for completion and returns the result.
- Execution is **at-most-once**; Step Functions does not restart the workflow after an exception.
- There is no fixed account token bucket. Capacity scales with sustained load, but sudden surges can be throttled.
- Console requests expire after **60 seconds**; SDK or CLI callers can wait for the workflow's full 5-minute maximum.

### Constraints and optimization

- Express transitions are not limited by the Standard `StateTransition` bucket.
- Each state, task, and execution input/output is still limited to **256 KiB**.
- Express does not support job-run or callback integration patterns, Activities, or Distributed Map as the parent workflow.
- Billing is based on executions, duration, and memory; CloudWatch Logs add separate cost.
- Migrate a Standard workflow to Express only when it finishes within 5 minutes, tolerates at-least-once execution, and uses neither job-run nor callback patterns.
- Nest a short Express child inside a Standard parent to keep durable/non-idempotent boundaries in Standard while moving a high-transition idempotent segment off Standard's transition quota.
- High start rate does not create downstream capacity. At 6,000 executions/s with one 200-ms Lambda call each, Lambda demand is $6000\times0.2=1{,}200$ concurrent environments before retries.

Sources: [Choosing a workflow type](https://docs.aws.amazon.com/step-functions/latest/dg/choosing-workflow-type.html), [Step Functions quotas](https://docs.aws.amazon.com/step-functions/latest/dg/service-quotas.html), and [Step Functions best practices](https://docs.aws.amazon.com/step-functions/latest/dg/sfn-best-practices.html).
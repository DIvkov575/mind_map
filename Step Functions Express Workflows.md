The high-volume [[Step Functions]] workflow type. Express executions run for at most **5 minutes**, do not retain execution history in Step Functions, and require CloudWatch Logs when durable diagnostic history is needed.

**Asynchronous Express**

- `StartExecution` returns after the execution starts rather than waiting for its result.
- Execution is **at-least-once**, so tasks should be idempotent.
- The default per-account, per-Region `StartExecution` token bucket is **6,000**, refilling at **6,000 starts/s**.

**Synchronous Express**

- `StartSyncExecution` waits for completion and returns the result.
- Execution is **at-most-once**; Step Functions does not restart the workflow after an exception.
- There is no fixed account token bucket for `StartSyncExecution`. Capacity scales with sustained load, while sudden surges may be throttled until capacity is available.

**Shared constraints**

- Express state transitions are not limited by the Standard `StateTransition` bucket.
- Express does not support job-run (`.sync`) or callback (`.waitForTaskToken`) integrations, Activities, or [[Step Functions Distributed Map]] as the parent workflow.
- Billing is based on executions, duration, and memory consumption.

Sources: [Choosing a workflow type](https://docs.aws.amazon.com/step-functions/latest/dg/choosing-workflow-type.html) and [Step Functions service quotas](https://docs.aws.amazon.com/step-functions/latest/dg/service-quotas.html).
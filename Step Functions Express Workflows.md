The short, high-rate [[Step Functions]] workflow type. Express executions run for at most 5 minutes and do not provide durable Step Functions execution history.

### Execution semantics

- Asynchronous Express starts and returns immediately; execution is at least once, so tasks must tolerate duplicates.
- Synchronous Express keeps the caller waiting for the workflow result; Step Functions does not restart the workflow after an exception, giving at-most-once workflow execution.
- Express supports request/response integrations, not callback, Activity, or run-a-job patterns.

These semantics affect orchestration only. Each Lambda Task still makes a normal Lambda invoke and independently consumes warm inventory, allocation ramp, and concurrency.

### Performance use

Use Express for a short idempotent chain where Standard's durable transition/history work is unnecessary. Use Standard when a workflow must survive long waits, accept callbacks, coordinate jobs, or preserve exactly-once workflow execution.

### Optimization

1. Prefer direct service integrations; high Express start capacity can overwhelm Lambda or a downstream database much faster than those resources can scale.
2. Keep blocking I/O out of Lambda. Express waiting does not occupy Lambda after a task returns, but a handler that waits still holds one environment.
3. Batch small items when per-execution and per-invocation overhead dominates. Keep every state/task input and output below 256 KiB.
4. Bound producer or Map concurrency from downstream capacity. Express provides throughput, not backpressure.
5. Keep asynchronous tasks idempotent and include duplicate/retry attempts when sizing Lambda concurrency.
6. Enable only the CloudWatch Logs detail needed for diagnosis; Express has no built-in execution history and high-volume payload logging adds serialization and ingestion overhead.

A Standard parent can start an Express child for a short idempotent segment while keeping callbacks, long waits, and durable boundaries in Standard.
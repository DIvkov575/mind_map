How Amazon SQS backlog becomes [[Lambda]] environment demand, and which controls bound that demand.

### Invocation and allocation path

1. Lambda-owned pollers read messages and assemble a batch.
2. Each non-empty batch becomes one synchronous function invocation and therefore occupies one execution environment.
3. Successful batches delete their messages. Failed records become visible again after the visibility timeout and create another invocation attempt.
4. When backlog remains, the mapping adds pollers and concurrent batch invocations; when backlog drains, environments return to the normal Lambda idle/reclamation lifecycle.

Standard polling starts at 5 concurrent batches and adds up to 300 concurrent invocations per minute. The default mapping ceiling is 1,250 concurrent invocations. Lambda's direct allocation ramp can therefore be free while SQS poller ramp remains the bottleneck.

FIFO allocation is capped by the number of active message groups: only one batch per message group can be processed concurrently while preserving order.

### Controls

- Batch size: larger batches amortize polling, invocation, cold Init, and client setup across more records. They also increase handler duration, payload size, and the amount of work exposed to one timeout.
- Batching window: improves efficiency at low arrival rates by waiting for more records, but adds queue latency; low traffic can wait about 20 seconds even with a shorter configured window.
- Maximum concurrency: bound the mapping to the downstream connection or write capacity. If several queues target one function, their maxima must fit inside function reserved concurrency.
- Partial batch response: return only failed record identifiers so successful records are not reinvoked. Idempotency is still required because delivery is at least once.
- Visibility timeout: configure at least 6 × function timeout + batching window so Lambda retries and throttling do not make an in-flight batch visible too early.

Provisioned polling is useful only when poller ramp or payload throughput is measured as the bottleneck. It can add up to 1,000 concurrent invocations per minute; it does not pre-initialize Lambda execution environments, so provisioned concurrency is a separate control.

### Optimization order

1. Measure queue age, batch fill, function duration, errors, and concurrency together.
2. Increase batch size until duration, payload, or downstream transaction limits become the constraint.
3. Use partial batch responses and idempotent per-record processing before increasing concurrency.
4. Cap concurrency at downstream capacity; then size reserved concurrency so other event sources cannot starve the mapping.
5. Use provisioned concurrency for cold-start latency and provisioned polling for poller throughput. They solve different allocation stages.

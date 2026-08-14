Use this note to size [[Step Functions]] workflows that invoke [[Lambda]] and locate the first capacity bottleneck. Step Functions schedules states; Lambda allocates compute only when a Lambda Task is dispatched.

### Compute demand

For $E$ workflow starts/s, let Lambda task $i$ execute $a_i$ attempts per workflow and occupy an environment for mean duration $D_i$ seconds. Steady Lambda concurrency is

$$C_{\lambda}=E\sum_i a_iD_i.$$

Parallel branches add their occupied durations. Wait states, choices, callback waiting, and native integrations contribute no Lambda-seconds. Cold Init increases request latency and allocation work; handler and extension duration determine how long an environment remains unavailable for reuse.

### Where capacity is consumed

1. Step Functions makes a task runnable subject to its start, transition, or Map dispatch rate.
2. A Lambda Task sends an invoke; Step Functions has not reserved an environment beforehand.
3. Lambda admits against reserved or account concurrency, assigns an idle environment, or creates one through [[Lambda Environment Creation]].
4. Lambda releases the environment after runtime and extensions finish; Step Functions then advances or keeps waiting in its own state.

For a sudden burst, immediately warm capacity is existing idle inventory plus provisioned concurrency. Additional on-demand capacity can grow by at most 1,000 environments per function per 10 seconds. Step Functions can dispatch faster than that, so Map or Express fan-out must be bounded at the producer.

### Optimization order

1. Delete Lambda relays. Native service integrations avoid invoke routing, cold allocation, handler duration, and another retry boundary.
2. Externalize waiting. Standard Wait, `.sync`, and callback states hold workflow state without holding Lambda compute.
3. Reduce occupied duration. Reuse connections, batch downstream calls, tune memory/CPU, and minimize extensions; every reduction in $D_i$ releases concurrency proportionally.
4. Bound fan-out. Set Map, SQS event-source, or producer concurrency from downstream capacity and Lambda reserved concurrency.
5. Control attempts. Retries and duplicate delivery increase $a_i$ and can create a second allocation wave. Use idempotency, backoff, partial batch response, and targeted redrive.
6. Batch deliberately. Fewer child workflows and Lambda invocations improve allocation reuse, but larger failure domains and latency eventually dominate.

### Queue boundaries

- Synchronous Lambda above available capacity throttles at invocation.
- Asynchronous Lambda queues accepted events before compute allocation.
- SQS keeps unprocessed work in the source queue; poller ramp can be slower than Lambda's allocation ramp.
- Standard Step Functions durably retains workflow progress; Express provides no durable execution history.

Measure orchestration throttles, Lambda concurrent executions and spillover, queue age, Init duration, warm duration, retries, and downstream saturation on the same timeline. Optimize the first boundary that delays completion, not the largest advertised quota.

See [[Lambda Concurrency and Scaling]], [[Lambda SQS Processing]], [[Step Functions Distributed Map]], and [[Step Functions Quotas]].

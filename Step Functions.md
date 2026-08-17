A serverless workflow scheduler. [[Step Functions]] stores or advances orchestration state; it does not reserve [[Lambda]] execution environments.

### Lambda allocation boundary

1. A Lambda Task state becomes runnable.
2. Step Functions sends an invoke request to Lambda.
3. Lambda independently admits the request and takes its warm, cold, queued, or throttled path.
4. The Lambda environment is released when the runtime and extensions finish, even if the workflow continues waiting afterward.

Wait states, choice logic, and callback waiting consume Step Functions execution capacity but no Lambda compute. A callback Lambda should start external work, return immediately, and let Step Functions hold the task token.

### Performance hot paths

- Native service integration: transition → target service. Prefer this when Lambda would only translate a request, poll status, sleep, or relay a result.
- Lambda Task: transition → Lambda routing/allocation/Init if cold → handler and downstream I/O → response → next transition. Every Lambda hop adds latency, concurrency demand, and another retry boundary.
- [[Step Functions Standard Workflow|Standard]]: durably records workflow progress between transitions. Use it for long waits, callbacks, non-idempotent steps, and auditability.
- [[Step Functions Express Workflows|Express]]: optimized for short, high-rate, idempotent executions without durable Step Functions history. It changes orchestration overhead, not Lambda allocation.
- [[Step Functions Distributed Map|Distributed Map]]: creates child-workflow fan-out. Maximum concurrency limits dispatch; it does not prewarm or reserve Lambda capacity.

### Optimization order

1. Remove pass-through Lambda functions with direct AWS SDK or optimized service integrations.
2. Move waiting, retry timing, polling, and branching out of Lambda handlers and into workflow states or callback patterns.
3. Pass S3 references instead of large state payloads; every state/task input and output is capped at 256 KiB and is serialized across transitions.
4. Bound Map and child-workflow concurrency by Lambda reserved concurrency and the narrowest downstream resource.
5. Make retried tasks idempotent and count retry attempts in allocation demand.

See [[Serverless Throughput Envelope]] and [[Step Functions Quotas]].

Sources: [Choosing a workflow type](https://docs.aws.amazon.com/step-functions/latest/dg/choosing-workflow-type.html), [service integration patterns](https://docs.aws.amazon.com/step-functions/latest/dg/connect-to-resource.html), and [Step Functions best practices](https://docs.aws.amazon.com/step-functions/latest/dg/sfn-best-practices.html).
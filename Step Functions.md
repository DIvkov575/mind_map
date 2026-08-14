A serverless workflow orchestrator that executes state machines defined in Amazon States Language (ASL). It coordinates work across AWS services; a Lambda `Task` invokes [[Lambda]], but Step Functions does not reserve Lambda execution environments or bypass Lambda concurrency limits.

Two workflow types:

- [[Step Functions Standard Workflow]] — durable, auditable execution for up to one year with exactly-once workflow execution unless explicit `Retry` behavior applies.
- [[Step Functions Express Workflows]] — high-volume execution for up to five minutes; asynchronous executions are at-least-once and synchronous executions are at-most-once.

[[Step Functions Distributed Map]] is a Standard-only `Map` processing mode for large datasets and high parallelism, not a third workflow type.

Shared quantitative constraints live in [[Step Functions Quotas]]. End-to-end Lambda-task sizing is in [[Serverless Throughput Envelope]].

Source: [Choosing a workflow type in Step Functions](https://docs.aws.amazon.com/step-functions/latest/dg/choosing-workflow-type.html).
A serverless workflow orchestrator that executes state machines defined in Amazon States Language. It coordinates work across AWS services; a Lambda Task invokes [[Lambda]], but Step Functions neither reserves Lambda execution environments nor bypasses Lambda quotas.

### Quantitative workflow selection

| property | [[Step Functions Standard Workflow|Standard]] | [[Step Functions Express Workflows|Express]] |
|---|---:|---:|
| maximum duration | 1 year | 5 minutes |
| execution semantics | exactly-once unless retried | async at-least-once; sync at-most-once |
| built-in execution history | 25,000 events; 90-day retention | none; use CloudWatch Logs |
| default start refill | 300/s in major Regions; 150/s elsewhere | 6,000/s for asynchronous starts |
| state-transition refill | 5,000/s in major Regions; 800/s elsewhere | unlimited by the Standard transition bucket |
| billing dimension | state transitions | executions, duration, memory |

Use Standard for long-running, non-idempotent, callback, job-run, Activity, and [[Step Functions Distributed Map|Distributed Map]] workflows. Use Express when execution is under 5 minutes, steps are idempotent, and the design needs high event rate rather than durable service-managed history. A Standard parent can nest an Express child for a short, high-transition subworkflow.

Every task, state, and execution input/output is limited to **256 KiB**. State-machine definitions and API requests are limited to **1 MB**. Store larger data in S3 and pass references rather than carrying it through state.

Shared allocation limits live in [[Step Functions Quotas]]. End-to-end Lambda-task sizing is in [[Serverless Throughput Envelope]].

Sources: [Choosing a workflow type](https://docs.aws.amazon.com/step-functions/latest/dg/choosing-workflow-type.html), [Step Functions quotas](https://docs.aws.amazon.com/step-functions/latest/dg/service-quotas.html), and [Step Functions best practices](https://docs.aws.amazon.com/step-functions/latest/dg/sfn-best-practices.html).
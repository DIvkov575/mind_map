The durable [[Step Functions]] workflow type for long-running, auditable orchestration.

**Semantics and limits**

- Maximum execution time: **1 year**.
- Maximum execution history: **25,000 events**.
- Closed execution history is retained for **90 days** by default.
- Workflow execution is exactly-once unless the state machine explicitly configures `Retry` behavior.
- Supports all Step Functions service integrations, including job-run (`.sync`) and callback (`.waitForTaskToken`) patterns.
- Supports Activities and [[Step Functions Distributed Map]].
- Billing is based on state transitions.

**Throughput**

Standard state transitions and `StartExecution` calls use token buckets. In `us-east-1`, `us-west-2`, and `eu-west-1`, the default transition bucket is **5,000** with a **5,000/s** refill, while `StartExecution` uses a **1,300** bucket with a **300/s** refill. Other Regions default to **800/800/s** transitions and **800/150/s** starts. These are soft quotas; see [[Step Functions Quotas]].

Sources: [Choosing a workflow type](https://docs.aws.amazon.com/step-functions/latest/dg/choosing-workflow-type.html) and [Step Functions service quotas](https://docs.aws.amazon.com/step-functions/latest/dg/service-quotas.html).
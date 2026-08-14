The durable [[Step Functions]] workflow type for long-running, auditable orchestration.

### Semantics and hard limits

- Maximum execution and task duration: **1 year**.
- Maximum execution history: **25,000 events**. If event 25,000 is not `ExecutionSucceeded`, the execution fails from history exhaustion.
- Closed execution history is retained for **90 days** by default; completed executions can be redriven for **14 days**.
- Maximum state, task, or execution input/output: **256 KiB**.
- Maximum open executions: **1,000,000** per account per Region by default; adjustable to millions.
- Workflow execution is exactly-once unless explicit retry behavior repeats work.
- Supports all integration patterns, including job-run, callback, Activities, and [[Step Functions Distributed Map]].

### Throughput model

Let $S$ be average state transitions per execution. Sustainable starts are bounded by

$$R_{\text{workflow}}\le\min\left(R_{\text{StartExecution}},\frac{R_{\text{StateTransition}}}{S}\right).$$

In `us-east-1`, `us-west-2`, and `eu-west-1`, defaults are **300 starts/s** and **5,000 transitions/s** after burst tokens. The crossover is $5000/300=16.7$ transitions/execution. A 10-transition workflow is start-limited at 300/s; a 20-transition workflow is transition-limited at 250/s. Other Regions default to 150 starts/s and 800 transitions/s, crossing over at 5.33 transitions/execution.

### Optimization

- Use native service integrations when they remove a Lambda hop; every removed Lambda Task avoids one invocation, its latency, and its concurrency demand.
- Keep execution data below 256 KiB. Store large payloads in S3 and pass the object reference.
- Split long histories before 25,000 events. Distributed Map gives each child a separate history; nested executions can continue long-running workflows with a fresh history.
- Set explicit task and workflow timeouts. Callback tasks should set heartbeat below task timeout so a dead worker fails before the overall task deadline.
- AWS's retry example for transient Lambda service exceptions starts at **2 seconds**, doubles delay, and allows **6 attempts**. Treat these as a starting point; retries amplify Lambda load and must be included in capacity calculations.
- Billing is per transition, so collapsing avoidable orchestration steps reduces both transition demand and cost. Preserve steps that provide necessary retries, audit boundaries, or compensation.

Sources: [Choosing a workflow type](https://docs.aws.amazon.com/step-functions/latest/dg/choosing-workflow-type.html), [Step Functions quotas](https://docs.aws.amazon.com/step-functions/latest/dg/service-quotas.html), and [Step Functions best practices](https://docs.aws.amazon.com/step-functions/latest/dg/sfn-best-practices.html).
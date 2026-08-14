A [[Step Functions Standard Workflow]] fan-out mechanism. A Map Run enumerates items or batches and starts one Standard or Express child workflow per unit of work.

### Allocation path

1. The Map Run reads an item or batch.
2. Child-workflow dispatch starts a separate execution.
3. When that child reaches a Lambda Task, it independently invokes [[Lambda]]. No Lambda environment is allocated before that point.
4. The child releases Lambda compute after each task, even while the child workflow continues.

Maximum Map concurrency is a scheduler ceiling, not reserved capacity. A Map Run can allow up to 10,000 parallel children, while child dispatch is up to 1,000 Express children/s or 100 Standard children/s. Lambda admission, its 1,000 new environments/10 seconds/function ramp, account concurrency, and downstream limits still apply afterward.

If child start rate is $r$ and each child consumes $D_{\lambda}$ Lambda-seconds, approximate steady Lambda demand is

$$C_{\lambda}\approx rD_{\lambda},$$

capped by configured child concurrency when only one Lambda task is active per child. Parallel Lambda tasks inside a child add their occupied durations.

### Optimization

1. Set maximum concurrency from the narrowest downstream and Lambda limit, never from the 10,000 service maximum.
2. Batch items per child to amortize child start, Lambda invoke, Init, and client setup. Stop when payload, timeout, failure isolation, or latency becomes worse.
3. Prefer Express children for short idempotent work when its higher dispatch rate is useful and Lambda/downstream capacity can absorb it.
4. Use native service integrations inside the child so fan-out does not create pass-through Lambda allocation.
5. Write large results to S3 with `ResultWriter` instead of returning one aggregated state payload.
6. Make child work idempotent. Retrying the Map state creates another Map Run and can replay successful work; use targeted redrive when possible.

Use Distributed mode when Inline Map's 40 concurrent iterations, parent payload, or parent history is the constraint—not merely because 10,000 concurrency exists.

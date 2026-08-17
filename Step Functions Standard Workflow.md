The durable [[Step Functions]] workflow type. Standard persists execution progress across transitions, so workflows can wait without keeping a process or [[Lambda]] environment alive.

### Integration patterns and compute lifetime

- Request/response: Step Functions invokes Lambda or another API and advances when the API call completes. A Lambda environment is occupied only through function completion.
- Run a job (`.sync`): Step Functions waits for a supported service job. Use the native integration instead of a Lambda that polls the job.
- Callback with task token: a worker starts asynchronous work and returns; Step Functions stores the wait. The eventual callback advances the workflow without holding the original Lambda environment.
- Wait state: Step Functions schedules the future transition. Sleeping inside Lambda instead occupies concurrency for the entire delay.

### Standard hot path

Each state adds transition scheduling and durable history work. A Lambda Task additionally pays Lambda routing, warm or cold assignment, handler duration, and response serialization. Remove states only when they add no retry, audit, compensation, or domain boundary.

### Optimization

1. Replace poller, sleeper, and pass-through Lambdas with native `.sync`, callback, Wait, and service integrations.
2. Return from callback starter Lambdas immediately after durable handoff; never keep the invocation open while external work runs.
3. Set task timeout and callback heartbeat so abandoned work releases workflow capacity promptly.
4. Keep state payloads below 256 KiB; pass object references to avoid repeated serialization and history growth.
5. Treat every retry as a new downstream call and, for Lambda, a new allocation attempt. Use backoff and idempotency to prevent retry bursts.
6. Split execution before the 25,000-event history limit; use child workflows or Distributed Map when the decomposition also improves isolation.

Standard can run for up to 1 year. That duration belongs in workflow state, not in a continuously running Lambda.

Sources: [Standard workflows](https://docs.aws.amazon.com/step-functions/latest/dg/choosing-workflow-type.html), [service integration patterns](https://docs.aws.amazon.com/step-functions/latest/dg/connect-to-resource.html), and [callback tasks](https://docs.aws.amazon.com/step-functions/latest/dg/connect-to-resource.html#connect-wait-token).
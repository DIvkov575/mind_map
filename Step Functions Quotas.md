The [[Step Functions]] data-plane limits that can delay work dispatch. They govern orchestration; they do not allocate or reserve [[Lambda]] environments.

### Limits that affect the hot path

- Standard `StartExecution` uses a token bucket of 1,300 with 300 starts/s refill in `us-east-1`, `us-west-2`, and `eu-west-1`; other Regions use 800 and 150/s.
- Standard state transitions use 5,000 tokens with 5,000 transitions/s refill in those three Regions; other Regions use 800 and 800/s.
- Asynchronous Express starts use 6,000 tokens with 6,000 starts/s refill.
- Express transitions do not consume the Standard transition bucket.
- Every execution, state, and task input or output is limited to 256 KiB.
- [[Step Functions Distributed Map]] dispatches up to 1,000 Express or 100 Standard child workflows per second and allows up to 10,000 parallel children per Map Run.

Token depth absorbs a brief burst; refill is sustainable rate. When Step Functions throttles, Lambda invocations are delayed rather than preallocated. When Step Functions does not throttle, Lambda allocation and downstream capacity can still be the bottleneck.

### Optimization

1. Count transitions and child starts on the actual hot path, including retries and error branches.
2. Remove only transitions and Lambda tasks that provide no needed durability, retry, audit, compensation, or domain boundary.
3. Use Express for a short idempotent high-rate segment when Standard's durable history is unnecessary.
4. Bound Map concurrency so orchestration cannot emit work faster than Lambda and the downstream system can consume it.
5. Pass references instead of large payloads to reduce serialization even below the 256-KiB hard limit.

Control-plane polling limits are omitted because they do not determine task dispatch. See [[Serverless Capacity Planning]] for the Lambda boundary.
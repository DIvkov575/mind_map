# Lambda and Step Functions allocation guide

[[Lambda]] allocates execution environments. [[Step Functions]] allocates orchestration work. They scale independently: a Step Functions Lambda Task becomes a normal Lambda invoke and does not reserve or prewarm a Lambda environment.

Implementation note: public quotas below are customer contracts or defaults. Assignment, health, and scale-down timings are point-in-time implementation details verified on 2026-08-14; they can change without an API change.

## Choose an objective

- Follow request routing and warm assignment → [[Lambda Request Routing]] and [[Lambda Environment Assignment]]
- Estimate capacity or diagnose throttling → [[Lambda Concurrency and Scaling]]
- Reduce cold starts or understand worker health → [[Lambda Environment Creation]]
- Understand reuse, idle cleanup, reset, or recycling → [[Lambda Environment Lifecycle]]
- Tune SQS processing → [[Lambda SQS Processing]]
- Size Lambda inside Step Functions → [[Serverless Capacity Planning]]

## Mental model

There are three schedulers in series:

1. Producer or orchestrator decides when work becomes runnable: direct caller, SQS poller, or Step Functions.
2. Lambda admission checks reserved concurrency and remaining account concurrency.
3. Lambda assignment reuses a compatible idle environment or starts the cold creation path.

The first saturated boundary controls throughput. Step Functions can dispatch faster than Lambda can create environments, and Lambda can invoke faster than a database can accept connections.

## Quantitative capacity model

For request rate $R$ invocations/s and mean occupied duration $D$ seconds:

$$C_{required}=RD.$$

Occupied duration includes handler work and extensions that have not reported completion. One normal environment runs one invocation at a time.

For workflow start rate $E$, transitions/workflow $S$, Lambda invokes/workflow $L$, average attempts $a_i$, and Lambda duration $D_i$:

$$C_{\lambda}=E\sum_i a_iD_i$$

and a necessary steady-state bound is

$$E_{max}\le\min\left(R_{start},\frac{R_{transition}}{S},\frac{R_{Lambda}}{L},\frac{C_{available}}{\sum_i a_iD_i}\right).$$

Wait states, choices, callback waiting, and native service integrations contribute no Lambda-seconds. Parallel Lambda branches add their occupied durations. Retries and duplicate delivery increase $a_i$.

Worked example. In a major Region, a Standard workflow has 20 transitions, two 250-ms Lambda calls, and 100 available Lambda concurrency:

- Start refill: 300 workflows/s.
- Transition refill: $5000/20=250$ workflows/s.
- Lambda concurrency: $100/(2\times0.25)=200$ workflows/s.
- Result: $\min(300,250,200)=200$ workflows/s before downstream limits.

## Public limits that shape the hot path

### Lambda

| Limit | Value | Meaning |
|---|---:|---|
| Default account concurrency | 1,000/Region | Shared admission ceiling unless quotas/configuration differ |
| Function environment creation | 1,000 new environments/10 s | Cold burst ramp; unused capacity does not accumulate beyond the burst allowance |
| Synchronous request rate | generally $10C$/s | Can bind before concurrency when mean duration is below 100 ms |
| Provisioned-concurrency request rate | $10\times$ provisioned concurrency/s | Per configured alias/version |
| Function timeout | 900 s | Maximum invocation duration |
| `/tmp` | 512–10,240 MB | Survives freeze/thaw and reset, not destruction |

Reserved concurrency reserves capacity and is a hard maximum; it does not prewarm. Provisioned concurrency creates a warm baseline; traffic above it can spill to on-demand capacity until another concurrency limit binds.

At $C=1{,}000$: a 20-ms function is request-rate-bound at roughly 10,000/s; a 100-ms function reaches both bounds at 10,000/s; a 1-s function is concurrency-bound at roughly 1,000/s.

### Step Functions

| Operation | Major Regions* bucket/refill | Other Regions bucket/refill |
|---|---:|---:|
| Standard `StartExecution` | 1,300 / 300 s⁻¹ | 800 / 150 s⁻¹ |
| Standard state transitions | 5,000 / 5,000 s⁻¹ | 800 / 800 s⁻¹ |
| Asynchronous Express starts | 6,000 / 6,000 s⁻¹ | 6,000 / 6,000 s⁻¹ |
| HTTP Task | 300 / 300 s⁻¹ | 300 / 300 s⁻¹ |

*Major Regions: `us-east-1`, `us-west-2`, and `eu-west-1`.

For bucket depth $b$, offered rate $A$, and refill $r$, an initially full bucket lasts approximately

$$t_{burst}=\frac{b}{A-r},\qquad A>r.$$

Example: Standard starts offered at 1,000/s in a major Region exhaust the 1,300-token burst after $1300/(1000-300)=\mathbf{1.86}$ seconds, then settle near the 300/s refill unless the quota is raised.

Other hard/default boundaries: 256-KiB state/task/execution payloads; 1,000,000 open Standard executions/account/Region; 25,000 Standard history events; Standard duration up to one year; Express duration up to five minutes.

## Lambda request and environment lifecycle

### Request paths

- Synchronous API: admit → route → assign/create → invoke; caller waits.
- Asynchronous API: accept into Lambda's queue; allocate compute when an attempt is dequeued.
- SQS: Lambda pollers create one synchronous invocation per non-empty batch.
- Step Functions: a runnable Lambda Task sends a normal invoke. Wait and callback states do not hold Lambda compute.

### Environment assignment and reuse

Assignment state is maintained per function version, with tenant-scoped idle inventory.

1. A healthy completed environment returns to the top of an idle stack.
2. Assignment takes from the top, preferentially reusing the most recently idle compatible environment.
3. The environment is marked unavailable before worker reservation, preventing double assignment.
4. If no environment is selectable, the request enters a FIFO pending queue and cold creation begins.
5. A newly created environment is offered to a compatible waiter before remaining idle.
6. Normal release returns it to the top; timeout recovery inserts it at the bottom.

Compatibility includes function version and configuration such as architecture. Reuse is opportunistic: process objects, clients, connections, and `/tmp` may survive, but no idle lifetime, AZ affinity, or next-use guarantee exists.

### Cold creation

1. Admit one concurrency unit.
2. Allocate memory, CPU share, architecture, ephemeral storage, runtime, code, layers, and extensions.
3. Run Init: extensions, runtime bootstrap, and static initialization.
4. Deliver the event only after Init succeeds.

On-demand Init normally has a 10-second phase limit. If it does not finish, Lambda retries Init with the first invocation under the function timeout, up to 900 seconds. Provisioned concurrency performs allocation and Init before traffic. Occasional proactive on-demand initialization is not a behavior to depend on.

### Completion, reset, and reclamation

- Runtime and every extension must finish before the environment becomes reusable.
- Successful completion freezes process state and `/tmp`; a warm invoke thaws without Init.
- Invocation failure resets runtime and extensions. `/tmp` survives; the next request may perform a suppressed Init folded into invocation duration.
- Idle, draining, unhealthy, rebalanced, or maintenance-recycled environments are destroyed.
- Shutdown budget is 0 ms without extensions, 500 ms with an internal extension, and 2,000 ms with external extensions. Do not use it as a durability mechanism.

## Internal control-loop snapshot

These values explain observed dynamics; they are not customer guarantees.

| Mechanism | Current observed timing/threshold |
|---|---|
| Assignment scale-down timer | jittered, 60-s period |
| Close-to-expiry scan | 60 s |
| Return executor | 60 s |
| Default maximum-idle policy | 600 s |
| Worker startup health jitter | 0–60 s |
| Primary worker ping | every 5 s |
| Secondary proxy ping | every 30 s |
| Failure-history reset | gap longer than 1 min |
| Normal unhealthy decision | at least 3 failures and >3 min since first failure |
| Inventory reconciliation | every 1 min/provider |

Scale-down policies emit explicit environment IDs and/or requested counts. The merger unions IDs, takes the maximum count, and selects only the shortfall; the current fallback selector may choose randomly without replacement rather than promise LRU reclamation.

The leaked-environment backstop is intentionally slower than normal cleanup:

$$T_{leak}=10\text{ min}+2(60\text{ s})+2(60\text{ s})+T_{function}+5\text{ min}=19\text{ min}+T_{function}.$$

## Step Functions execution modes

| Mode | Allocation path | Quantitative boundary | Use when |
|---|---|---|---|
| Standard | Frontend → durable history/SWF → sharded decision queue → stateless Decider | 1-year duration; 25,000 events | Long waits, callbacks, jobs, auditability, non-idempotent boundaries |
| Async Express | Frontend → SQS → in-memory worker | 5 min; 6,000 starts/s refill; at-least-once | Short, high-rate, idempotent chains |
| Sync Express | Sync frontend → direct worker API → inline result | 5 min; burst capacity may load-shed; at-most-once workflow execution | Interactive short workflows |
| Distributed Map | Map Run → child workflow dispatch | 10,000 parallel children; 1,000 Express or 100 Standard children/s | Data-parallel fan-out beyond Inline Map's 40 iterations |

For Standard, the Decider reconstructs the next action from durable history and can collapse chains of internal `Pass`/`Choice`-like states in one decision. External Task, callback, and Wait states yield. Queue-depth weights refresh around 60 seconds; per-host consumer counts and queue topology are internal tuning, not sizing inputs.

Distributed Map concurrency is a scheduler ceiling, not reserved Lambda capacity. Approximate demand for child start rate $r$ and Lambda-seconds/child $D_{\lambda}$ is

$$C_{\lambda}\approx rD_{\lambda}.$$

Set Map concurrency from the narrowest downstream and Lambda limit, never from the advertised 10,000 maximum.

## SQS-to-Lambda dynamics

Standard polling starts at 5 concurrent batches, adds up to 300 concurrent invocations/minute, and defaults to a 1,250-concurrency mapping ceiling. Ideal ramp from 5 to 1,250 takes $(1250-5)/300=4.15$ minutes, reaching the ceiling during the fifth minute.

Provisioned polling can add up to 1,000 concurrent invocations/minute. It increases poller throughput; it does not pre-initialize Lambda environments. Provisioned concurrency solves the separate cold-Init stage.

- FIFO concurrency cannot exceed active message groups.
- Larger batches amortize polling, Invoke, Init, and client setup but enlarge timeout and failure domains.
- Partial batch response prevents successful records from being retried with failures.
- Configure visibility timeout to at least $6\times$ function timeout plus batching window.
- Low traffic can wait roughly 20 seconds for batching even when a shorter window is configured.

## Optimization playbook

1. Remove Lambda relays. Use native Step Functions service integrations instead of translation-only, polling, sleeping, or pass-through handlers.
2. Externalize waiting. Use Standard Wait, `.sync`, or callback states; sleeping in Lambda consumes concurrency for the full delay.
3. Reduce occupied duration. Reuse clients and sockets, batch downstream calls, minimize extensions, and tune memory/CPU. CPU is approximately one vCPU at 1,769 MB.
4. Reduce cold Init. Remove dependencies/layers/extensions, lazy-load rare paths, and schedule provisioned concurrency before predictable latency-sensitive peaks.
5. Bound fan-out at the producer. Set Map, SQS, or producer concurrency from reserved concurrency and the narrowest downstream rate/connection limit.
6. Control attempts. Idempotency, backoff, partial batch response, and targeted redrive prevent retries from becoming another allocation wave.
7. Batch deliberately. Amortize orchestration and initialization until payload, timeout, latency, or failure isolation becomes worse.

## Diagnose the first bottleneck

Correlate on one timeline:

- Step Functions execution/transition throttles and Map child-start rate.
- Lambda `ConcurrentExecutions`, `Throttles`, `Duration`, `Init Duration`, `PostRuntimeExtensionsDuration`, and `ProvisionedConcurrencySpilloverInvocations`.
- SQS age, batch fill, receive rate, failures, and poller concurrency.
- Retry/duplicate attempts and downstream saturation.

Separate warm, cold, reset/suppressed-Init, and retry samples. Optimize the first boundary delaying completion, not the largest advertised quota.

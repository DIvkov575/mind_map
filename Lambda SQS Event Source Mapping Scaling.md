How a [[Lambda]] Amazon SQS event-source mapping converts queue backlog into pollers, batches, and concurrent invocations.

### Standard polling mode

- Starts with **5** concurrent batches and adds up to **300 concurrent invokes/minute** while backlog remains.
- Default event-source-mapping ceiling: **1,250** concurrent invokes. An ideal ramp from 5 to 1,250 takes $(1250-5)/300=4.15$ minutes, reaching the ceiling during the fifth minute.
- When traffic falls, Lambda returns to 5 concurrent invokes and can optimize down to **2** pollers. This two-poller optimization is disabled when maximum concurrency is configured.
- Event-source maximum concurrency accepts **2–1,000** and cannot be combined with provisioned polling mode.
- FIFO concurrency is $\min(\text{message-group count},\text{configured maximum concurrency})$.

### Provisioned polling mode

| parameter | range | default |
|---|---:|---:|
| minimum pollers | 2–200 | 2 |
| maximum pollers | 2–10,000 | 200 |
| scale-up | up to 1,000 concurrent invokes/min | — |
| total supported concurrency | up to 100,000 invokes | — |

Each provisioned poller is limited by the first of three dimensions: **1 MB/s** payload, **10 concurrent invokes**, or **10 SQS polling calls/s**.

Let $s$ be average message size in KiB, $B$ batch size, and $D$ mean function duration in seconds. A practical upper bound on events/s per poller is

$$q_{\text{poller}}\le\min\left(\frac{1024}{s},\frac{10B}{D},\min(100,10B)\right).$$

For required queue rate $Q$, provision at least

$$P\ge\left\lceil\frac{Q}{q_{\text{poller}}}\right\rceil.$$

Example: $s=3$ KiB, $B=10$, $D=0.1$ s gives about 100 events/s/poller, so 1,000 events/s needs at least **10 pollers**. At $D=10$ s, compute falls to 10 events/s/poller and the same load needs **100 pollers**.

### Batch and retry constraints

- Standard queues allow up to **10,000 records/batch**; FIFO queues allow **10**. The synchronous Lambda payload ceiling remains **6 MB**, including variable SQS and Lambda metadata.
- A standard-queue batching window can be as long as **5 minutes**. Batch sizes above 10 require at least a **1-second** window; very low traffic may still wait up to about **20 seconds**.
- Set queue visibility timeout to at least $6\times$ function timeout plus the batching window. The function timeout itself must not exceed visibility timeout.
- AWS recommends source-queue dead-letter redrive `maxReceiveCount` of at least **5**.
- Event source mappings are at-least-once. Partial batch responses prevent successful records from being retried with failed records; idempotency remains required.
- If several queues target one function, the sum of their maximum concurrency settings should not exceed the function's reserved concurrency.

Sources: [SQS event-source scaling](https://docs.aws.amazon.com/lambda/latest/dg/services-sqs-scaling.html), [using Lambda with SQS](https://docs.aws.amazon.com/lambda/latest/dg/with-sqs.html), and [SQS event-source configuration](https://docs.aws.amazon.com/lambda/latest/dg/services-sqs-configure.html).
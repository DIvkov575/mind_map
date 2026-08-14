How a [[Lambda]] SQS event-source mapping allocates pollers and concurrent invokes.

**Default mode**

- Begins with **5 concurrent batches**.
- Adds up to **300 concurrent invokes per minute**.
- Default mapping ceiling: **1,250 concurrent invokes**.
- From 5 to 1,250 therefore takes about $(1250-5)/300 = 4.15$ minutes of ideal ramp, reaching the ceiling during the fifth minute.

**Provisioned polling mode**

| parameter | range | default |
|---|---:|---:|
| minimum pollers | 2–200 | 2 |
| maximum pollers | 2–10,000 | 200 |
| scale-up | up to 1,000 concurrency/min | — |

One provisioned poller can sustain at most approximately:

- **1 MB/s** of payload throughput,
- **10 concurrent invokes**, or
- **10 `ReceiveMessage` calls/s**.

For payload rate $B$ MB/s, in-flight invokes $I$, and receive rate $Q$/s, a lower bound on required pollers is

$$P \ge \max\left(B,\frac{I}{10},\frac{Q}{10}\right).$$

The first saturated dimension controls effective poller capacity. Lambda concurrency, batch size, visibility timeout, and source backlog remain independent constraints.

Source: [SQS event-source scaling](https://docs.aws.amazon.com/lambda/latest/dg/services-sqs-scaling.html).
The end-to-end quantitative envelope for [[Step Functions]] workflows invoking [[Lambda]]. Step Functions allocates orchestration and Lambda independently allocates compute; the smallest limit wins.

Let:

- $E$ = workflow starts/s
- $S$ = Standard state transitions/workflow
- $L$ = Lambda invokes/workflow
- $A$ = expected Lambda attempts per logical invoke, including retries
- $D$ = mean Lambda duration in seconds
- $C$ = usable Lambda concurrency

### Steady-state conditions

$$E\le R_{\text{StartExecution}}$$

$$ES\le R_{\text{StateTransition}}$$

$$ELA\le R_{\text{Lambda requests}}$$

$$ELAD\le C.$$

For synchronous Lambda, $R_{\text{Lambda requests}}\le10C$. Therefore

$$E_{\max}\le\min\left(R_{\text{StartExecution}},\frac{R_{\text{StateTransition}}}{S},\frac{10C}{LA},\frac{C}{LAD}\right).$$

The $10C/(LA)$ request term dominates for mean duration below 100 ms; $C/(LAD)$ dominates above 100 ms. For Express workflows, remove the Standard transition term, but keep Lambda and downstream constraints.

### Worked Standard example

Major Region, $S=20$, $L=2$, $A=1$, $D=0.25$ s, and $C=100$:

- Starts permit 300 workflows/s.
- Transitions permit $5000/20=250$ workflows/s.
- Lambda request rate permits $10\times100/2=500$ workflows/s.
- Lambda concurrency permits $100/(2\times0.25)=200$ workflows/s.
- Final steady bound: $\min(300,250,500,200)=\mathbf{200}$ workflows/s.

At that rate Lambda receives 400 invokes/s and holds about 100 concurrent environments. Adding a 10% concurrency buffer requires about 110 usable units.

### Retry amplification

If 5% of Lambda attempts require exactly one retry, $A=1.05$. The same example becomes $100/(2\times1.05\times0.25)=190.5$ workflows/s. Retries also add Step Functions transitions, so both $A$ and $S$ must include the retry policy's observed behavior.

### Boundary mismatches

- Step Functions limits state/task/execution data to **256 KiB**, which is tighter than Lambda's **6 MB** synchronous payload limit. Crossing Step Functions therefore makes 256 KiB the end-to-end boundary; pass S3 references for larger data.
- A Distributed Map can dispatch up to **1,000 Express** or **100 Standard** children/s, but maximum concurrency must be capped by Lambda and downstream capacity.
- Lambda SQS standard polling adds only **300 concurrent invokes/minute**, much slower than Lambda's direct per-function scale rate. Queue backlog can therefore be poller-limited even when Lambda concurrency is free.

### Burst conditions

Steady-state formulas are necessary but not sufficient. Bursts additionally consume Step Functions token-bucket depth, Lambda's **1,000 environments/10 s/function** scale allowance, provisioned-concurrency baseline, warm-environment inventory, SQS poller ramp, and Distributed Map child-dispatch rate. Size each burst as an initial inventory plus refill over the burst duration; do not treat a refill rate as instantly available capacity.

See [[Lambda Concurrency and Scaling]], [[Lambda SQS Event Source Mapping Scaling]], [[Step Functions Quotas]], and [[Step Functions Distributed Map]].
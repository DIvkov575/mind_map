The end-to-end quantitative envelope for [[Step Functions]] workflows invoking [[Lambda]]. Step Functions allocates orchestration; Lambda independently allocates compute, so the smallest limit wins.

Let:

- $E$ = workflow starts/s
- $S$ = Standard state transitions/workflow
- $L$ = Lambda invokes/workflow
- $D$ = mean Lambda duration in seconds
- $C$ = usable Lambda concurrency

Necessary steady-state conditions are

$$E \le R_{\text{StartExecution}}$$

$$ES \le R_{\text{StateTransition}}$$

$$EL \le R_{\text{Lambda requests}}$$

$$ELD \le C.$$

Therefore

$$E_{\max} \le \min\left(R_{\text{StartExecution}},\frac{R_{\text{StateTransition}}}{S},\frac{R_{\text{Lambda requests}}}{L},\frac{C}{LD}\right).$$

**Worked example** — major Region, Standard workflow, $S=20$, $L=2$, $D=0.25$ s:

- Start refill permits 300 workflows/s.
- Transition refill permits $5000/20=250$ workflows/s.
- At 250 workflows/s, Lambda receives 500 invokes/s and needs $500\times0.25=125$ concurrency.
- If only $C=100$ is available, Lambda permits $100/(2\times0.25)=200$ workflows/s.
- Final steady bound: $\min(300,250,200)=\mathbf{200\ workflows/s}$.

Bursts are additionally constrained by token-bucket depth, [[Lambda Concurrency and Scaling|Lambda's 1,000 environments/10 s/function creation rate]], warm-sandbox inventory, [[Lambda SQS Event Source Mapping Scaling|poller ramp]], and [[Step Functions Distributed Map|child dispatch rate]].
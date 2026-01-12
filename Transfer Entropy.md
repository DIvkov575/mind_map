
captures **directional, potentially nonlinear influence** from one series to another.
- Measures how much knowing the **past of XXX** reduces uncertainty about YtY_tYt​ **beyond the past of YYY**.
- If XXX “transfers” information to YYY, transfer [[Entropy]] > 0.

**Formally:**
$TE_{X \to Y} = \sum p(y_t, y_{t-1}^{(L)}, x_{t-1}^{(L)}) \log \frac{p(y_t \mid y_{t-1}^{(L)}, x_{t-1}^{(L)})}{p(y_t \mid y_{t-1}^{(L)})}$
- $y_{t-1}^{(L)}$​ = past LLL values of Y
- $x_{t-1}^{(L)}$ = past LLL values of X
- Captures **any statistical dependency**, not just linear correlation.
**Key points:**
- Can detect nonlinear relationships and delayed effects.
- Directional: $TE_{X \to Y} \neq TE_{Y \to X}$
- Data-hungry: you need enough samples to estimate the joint probabilities reliably
[[causal effect estimation]]
[[Time Series Modeling]]

**Conditioning:** make time structure identifiable.
1. Detrend / deseasonalize
2. Normalize (z-score or rank)
3. Check stationarity ([[ADF]] / [[KPSS]])
4. Align time bases; handle missingness
5. Low pass filter
**Delay Support Justification:** At what timescales could an effect exist?
2.1) Cross-correlation envelope
- Compute $\mathrm{corr}(X_{t-\tau}, Y_t)$
- Identify candidate lag L = \{\tau_1, \tau_2, …\}
- Use block bootstrap for confidence bands
Purpose: define support, not direction.
2.2) [[Transfer Entropy]] scan (nonlinear) $T_{X \rightarrow Y}(\tau)$
- Detect nonlinear information flow
- Allows multiple peaks (multi-timescale effects)
If no lag shows signal → effect may be:
- Instantaneous
- Mediated
- Too weak for current resolution
**Minimum Causal Operator**
3.1) Regularized distributed lag model
	$Y_t = \sum_{\tau \in L} \beta_\tau X_{t-\tau} + \varepsilon_t$
	- Ridge if smooth effect
	- Lasso if sparse delays
	- Elastic Net if unsure
	Outputs:
	- Dominant delay(s)
	- Net signed effect    
	- Residual structure
	Decision point:
	- Residuals ≈ white → stop
	- Residuals structured → nonlinearity or hidden state
 **Explicit Non-Linearity**
 4.1 Additive nonlinear delay model $Y_t = \sum_{\tau \in L} f_\tau(X_{t-\tau}) + \varepsilon_t$
- $f_\tau$​: spline / kernel
- Tests:
	- Saturation
	- Thresholding        
	- Sign changes
Decision point:
- One $f_\tau$ dominates → clean delayed nonlinearity
- Multiple $f_\tau$ → multi-stage process
**Ambiguity handling (critical)**
if effects are diffuse, overlapping, or unstable, assume hidden state.
5.1 State-space formulation
$\begin{aligned} z_{t+1} &= g(z_t, X_t) \\ Y_t &= h(z_t) \end{aligned}$
- $z_t$ = latent biological state
- Fit with:
    - [[Kalman filter]] (linear)
    - [[Particle filters]]        
    - [[Neural state-space model]]
Interpretation:
- Delay emerges from state dynamics
- Causality ≠ direct edge
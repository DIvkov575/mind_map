A time series X _Granger-causes_ a time series Y if past values of X provide statistically significant information for predicting Y beyond what is already contained in past values of Y alone.

Formally, compare two models:

1. **Autoregressive model (baseline)**
	$Y_t = \sum_{i=1}^p a_i Y_{t-i} + \varepsilon_t$
2. **Augmented model**
	$Y_t = \sum_{i=1}^p a_i Y_{t-i} + \sum_{j=1}^q b_j X_{t-j} + \varepsilon'_t$

If the augmented model significantly reduces prediction error (typically via an [[F-test]] or [[likelihood ratio test]]), then X Granger-causes Y.


**Key properties**
- It is **not true causality** (no intervention or mechanism implied).
- It is **directional**: X→YX \rightarrow YX→Y may hold without Y→XY \rightarrow XY→X.
- It is **time-ordered**: future values cannot cause the past.
- It assumes **stationarity** (or requires differencing / cointegration handling).

**Common assumptions**
- Linear relationships (in the classical formulation).
- No omitted confounders.
- Sufficient lag order chosen correctly.
    

**Extensions**
- **Vector Autoregression (VAR)**: multivariate Granger causality.
- **Nonlinear Granger causality**: kernel methods, neural networks.
- **Frequency-domain Granger causality**: causality at specific time scales.
- **Conditional Granger causality**: controls for additional variables.
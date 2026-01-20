A time series X _Granger-causes_ a time series Y if past values of X provide statistically significant information for predicting Y beyond what is already contained in past values of Y alone.

Formally, compare two models:

1. **Autoregressive model (baseline)**
	$Y_t = \sum_{i=1}^p a_i Y_{t-i} + \varepsilon_t$
2. **Augmented model**
	$Y_t = \sum_{i=1}^p a_i Y_{t-i} + \sum_{j=1}^q b_j X_{t-j} + \varepsilon'_t$

If the augmented model significantly reduces prediction error (typically via an [[F-test]] or [[likelihood ratio test]]), then X Granger-causes Y.
$$
\hat\beta_{\text{ridge}} = \arg\min_\beta \|y - X\beta\|^2 + \lambda \|\beta\|_2^2
$$

- penalizes the squared $L_2$ norm of the coefficients — shrinks every weight toward 0, but never exactly to 0 (contrast [[Lasso regularization (L1)]], which can zero out coefficients entirely, giving sparsity)
- $\lambda$ trades off fit vs. shrinkage: $\lambda = 0$ recovers ordinary least squares, $\lambda \to \infty$ collapses $\hat\beta \to 0$
- closed form: $\hat\beta_{\text{ridge}} = (X^\top X + \lambda I)^{-1} X^\top y$ — the $\lambda I$ term also fixes the numerical instability of inverting $X^\top X$ when it's near-singular (collinear features)

**Bayesian interpretation**
Exactly equivalent to a Gaussian prior $\beta \sim \mathcal{N}(0, \tau^2 I)$ with MAP estimation — see [[Bayesian shrinkage]]. Matching $\lambda = \sigma^2/\tau^2$ makes the two objectives identical.

**Use**
- standard fix for [[Fitting|overfitting]] when a model is too complex for the dataset size
- also used as a stabilizer inside larger pipelines, e.g. regularized distributed-lag models in causal/time-series estimation (see [[TSA Causal Relationship Mining]])

The formal study of what makes one estimator $\hat\theta$ of a parameter $\theta$ "better" than another
- [[Maximum Likelihood Estimation (MLE)|MLE]], the [[Cramér-Rao Bound]], and the [[Bias-Variance Tradeoff]] are all specific results/tools within.

**Three objects, one symbol family**
- $\theta$ — the parameter: a fixed unknown constant indexing the population law $P_\theta$. The target. Never random.
- $\hat\theta = g(X_1,\dots,X_n)$ — the estimator: a *rule* (function of the sample), e.g. $\bar X_n$. Random variable, because the sample is — this is the random object inside $\mathbb{E}[\hat\theta]$.
- $\hat\theta(x_1,\dots,x_n)$ — the estimate: the number the rule outputs on observed data. Fixed once realized.
- the estimator never yields $\theta$ — the population generates data, the rule turns data into a *guess* at $\theta$. Estimation theory studies how those guesses behave across hypothetical re-samples. Concrete: $\frac{1}{n}\sum(X_i-\bar X)^2$ has $\mathbb{E}[\cdot] = \frac{n-1}{n}\sigma^2$ — biased at every finite $n$, asymptotically unbiased only.

**The core properties an estimator is judged on**
- **Bias**: 
	- $\mathbb{E}[\hat\theta] - \theta$
	- unbiased means this is exactly 0 for every sample size, not just in the limit.
- **Variance**: 
	- how much $\hat\theta$ fluctuates across different samples of the same size 
	- see [[Bias-Variance Tradeoff]] for how this trades against bias in finite samples, and the [[Cramér-Rao Bound]] for the hard floor variance is bounded by (via [[Fisher Information]]) even for an unbiased estimator.
- **Consistency**: 
	- $\hat\theta \to \theta$ as $n \to \infty$ 
	- a large-sample guarantee
	- says nothing about behavior at any particular finite $n$.
- **Efficiency**: 
	- among unbiased estimators, the one with the lowest variance is most efficient
	- "asymptotically efficient" means it approaches the Cramér-Rao bound as $n\to\infty$, which [[Maximum Likelihood Estimation (MLE)|MLE]] does under standard regularity conditions.

**Why these are separate axes, not one score**
An estimator can trade bias for variance (a biased estimator can have lower total error than an unbiased one — this is exactly the mechanism [[Ridge regularization (L2)|ridge regression]] exploits) or be consistent without being efficient at any finite $n$. "Best estimator" isn't well-defined without first picking which of these properties you actually care about.

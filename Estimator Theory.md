The formal study of what makes one estimator $\hat\theta$ of a parameter $\theta$ "better" than another — the framework [[Maximum Likelihood Estimation (MLE)|MLE]], the [[Cramér-Rao Bound]], and the [[Bias-Variance Tradeoff]] are all specific results/tools within.

**The core properties an estimator is judged on**
- **Bias**: $\mathbb{E}[\hat\theta] - \theta$ — unbiased means this is exactly 0 for every sample size, not just in the limit.
- **Variance**: how much $\hat\theta$ fluctuates across different samples of the same size — see [[Bias-Variance Tradeoff]] for how this trades against bias in finite samples, and the [[Cramér-Rao Bound]] for the hard floor variance is bounded by (via [[Fisher Information]]) even for an unbiased estimator.
- **Consistency**: $\hat\theta \to \theta$ as $n \to \infty$ — a large-sample guarantee, says nothing about behavior at any particular finite $n$.
- **Efficiency**: among unbiased estimators, the one with the lowest variance is most efficient — "asymptotically efficient" means it approaches the Cramér-Rao bound as $n\to\infty$, which [[Maximum Likelihood Estimation (MLE)|MLE]] does under standard regularity conditions.

**Why these are separate axes, not one score**
An estimator can trade bias for variance (a biased estimator can have lower total error than an unbiased one — this is exactly the mechanism [[Ridge regularization (L2)|ridge regression]] exploits) or be consistent without being efficient at any finite $n$. "Best estimator" isn't well-defined without first picking which of these properties you actually care about.

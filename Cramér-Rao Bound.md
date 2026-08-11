A hard lower bound on the variance any unbiased estimator can achieve:
$$\mathrm{Var}(\hat{\theta}) \succeq \mathcal{I}(\theta)^{-1}$$
where $\mathcal{I}(\theta)$ is [[Fisher Information]] — no unbiased estimator can ever beat this floor, no matter how clever.

- the classical theoretical grounding for why variance can't be driven to zero by a better estimator alone: the data only carries so much information about $\theta$ (measured by $\mathcal{I}(\theta)$), which caps how precisely any unbiased method can pin it down
- [[Maximum Likelihood Estimation (MLE)|MLE]] is *asymptotically efficient* — as $n\to\infty$, its variance approaches this bound exactly, which is why "just use more data" eventually stops helping proportionally: you're converging toward a hard floor, not an arbitrarily improvable number
- the estimator-theory rooting of the [[Bias-Variance Tradeoff]]'s variance side: bias and variance trade off in *finite* samples, but even a perfectly unbiased estimator still has a variance floor set by this bound — bias-variance isn't purely an empirical heuristic, it's bounded by real information content in the data

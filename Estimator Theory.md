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

**Efficiency, quantitatively**
$$e(\hat\theta) = \frac{1/\big(n\,\mathcal{I}(\theta)\big)}{\mathrm{Var}(\hat\theta)} \in (0,1]$$
the ratio of the [[Cramér-Rao Bound]] floor to the variance actually achieved. $e = 1$ → **efficient**: the estimator extracts all the [[Fisher Information]] the data carries about $\theta$, and nothing unbiased does better.

Implications:
- **Relative efficiency** of two estimators is the variance ratio $\mathrm{Var}(\hat\theta_2)/\mathrm{Var}(\hat\theta_1)$, and it reads directly as *data cost*: $e = 0.64$ means $1/0.64 \approx 1.56\times$ the samples for equal precision. Efficiency prices an estimator in observations.
- Gaussian location $X_i \sim \mathcal{N}(\mu,\sigma^2)$: sample mean has $\mathrm{Var} = \sigma^2/n$, $e=1$; sample median has $\mathrm{Var} \to \pi\sigma^2/2n$, so $e = 2/\pi \approx 0.637$ — ~57% more data, but its efficiency doesn't collapse under heavy tails. Efficiency is always efficiency *against an assumed model*.
- Asymptotically, $\sqrt{n}\,(\hat\theta_{\text{MLE}} - \theta) \xrightarrow{d} \mathcal{N}\big(0, \mathcal{I}(\theta)^{-1}\big)$ — the bound is met in the limit, not at any finite $n$, which is consistent with MLE staying biased throughout.
- **The bound is bias-conditional.** Cramér-Rao constrains *unbiased* estimators only, so biased estimators can beat it in MSE — [[Ridge regularization (L2)|ridge]] and James-Stein shrinkage do exactly this. Not a violation, a different objective.
- Regularity is load-bearing: under misspecification a sandwich variance replaces $\mathcal{I}(\theta)^{-1}$ and the efficiency claim lapses. Hodges' estimator shows pointwise superefficiency is achievable but pathological, hence the modern *local asymptotic minimax* formulation.

**Why these are separate axes, not one score**
An estimator can trade bias for variance (a biased estimator can have lower total error than an unbiased one — this is exactly the mechanism [[Ridge regularization (L2)|ridge regression]] exploits) or be consistent without being efficient at any finite $n$. "Best estimator" isn't well-defined without first picking which of these properties you actually care about.

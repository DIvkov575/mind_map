The observation that a model's expected prediction error decomposes into three additive pieces — irreducible noise, squared bias, and variance — and that the latter two typically move in opposite directions as model capacity changes: too simple underfits (high bias, low variance), too complex overfits (low bias, high variance). One instance of the general bias/variance axes studied in [[Estimator Theory]].

**Setup**
Fix a query point $x$. Data $Y = f(x) + \varepsilon$ with $\mathbb{E}[\varepsilon]=0$, $\mathrm{Var}(\varepsilon)=\sigma^2$, $\varepsilon \perp D$. A learner maps $D \mapsto \hat f_D$, so $\hat f_D(x)$ is random through the draw of $D$ — the estimator-is-a-rule distinction from [[Estimator Theory]]. $\bar f(x) := \mathbb{E}_D[\hat f_D(x)]$ is the average prediction over hypothetical re-samples of $D$.

- **bias** at $x$: $\bar f(x) - f(x)$ — error of the average model; systematic, survives infinite data at fixed capacity
- **variance** at $x$: $\mathbb{E}_D[(\hat f_D(x)-\bar f(x))^2]$ — sensitivity of the fitted model to which sample it saw
- **noise**: $\sigma^2$ — irreducible, independent of the learner

**Decomposition**
These three combine exactly, not just approximately:
$$\underbrace{\mathbb{E}_{D,\varepsilon}\!\left[(Y-\hat f_D(x))^2\right]}_{\text{expected test error}} = \sigma^2 + \underbrace{(\bar f(x)-f(x))^2}_{\text{bias}^2} + \underbrace{\mathbb{E}_D\!\left[(\hat f_D(x)-\bar f(x))^2\right]}_{\text{variance}}$$

*Proof.* Write $Y-\hat f_D(x) = \underbrace{\varepsilon}_{A} + \underbrace{(f(x)-\bar f(x))}_{B} + \underbrace{(\bar f(x)-\hat f_D(x))}_{C}$ and expand $\mathbb{E}_{D,\varepsilon}[(A+B+C)^2]$. The squares give noise, $\text{bias}^2$ ($B$ is deterministic), and variance. Every cross term vanishes: $\mathbb{E}[AB]=B\,\mathbb{E}[\varepsilon]=0$; $\mathbb{E}[AC]=\mathbb{E}[\varepsilon]\,\mathbb{E}_D[C]=0$ (needs $\varepsilon\perp D$, the one substantive assumption); $\mathbb{E}[BC]=B\,\mathbb{E}_D[\bar f(x)-\hat f_D(x)]=0$ by definition of $\bar f$. $\blacksquare$

The same identity underlies parameter estimation: $\mathbb{E}[(Z-c)^2] = \mathrm{Var}(Z)+(\mathbb{E}Z-c)^2$ for any random $Z$ and constant $c$, giving $\mathrm{MSE}(\hat\theta)=\mathrm{Var}(\hat\theta)+\mathrm{Bias}(\hat\theta)^2$ when $Z=\hat\theta,\,c=\theta$ — see [[Estimator Theory]].

**The tradeoff is a regime, not a theorem**
The decomposition above is an algebraic identity, always true. What's called the "tradeoff" — bias falling and variance rising as capacity increases — is a separate, empirical claim about how typical model families behave, and it can fail: variance is non-monotone in practice, peaking near the [[Interpolation Threshold]] and then falling, so both terms can drop together in the overparameterized regime ([[Double Descent]]). The identity never breaks; the monotonicity does.

**Why bias is sometimes worth paying**
[[Ridge regularization (L2)|Ridge]] on an orthonormal design ($X^\top X=I_p$) makes this concrete: bias$^2$ and variance are both closed-form in $\lambda$, and the risk-minimizing $\lambda^\star = \sigma^2 p/\|\beta\|^2$ is strictly positive whenever $\sigma^2>0$ — the unbiased estimator ($\lambda=0$) is never MSE-optimal. Holds for general (non-orthonormal) designs too (Hoerl & Kennard 1970). Stronger still: the unbiased estimator for a Gaussian mean in $p\ge3$ is *inadmissible*, beaten in MSE everywhere by shrinkage estimators (Stein 1956; James & Stein 1961) — see [[Bayesian shrinkage]].

This doesn't undercut the variance floor: [[Cramér-Rao Bound|CR]] still bounds the variance of *unbiased* estimators via [[Fisher Information]]. Ridge beats that floor precisely by giving up unbiasedness — the floor and the tradeoff aren't in tension.

**Scope**
The clean additive split is specific to squared loss. For 0-1 loss and [[Cross Entropy]] the decomposition is asymmetric (Domingos 2000), and variance can *reduce* error when the average prediction sits on the wrong side of the decision boundary.

**Mechanisms for shifting the balance**
- add bias, cut variance: [[Ridge regularization (L2)]], [[Regularization]], [[Early stopping]], reduced capacity, [[Bayesian shrinkage]]
- cut variance at little bias cost: [[Bootstrap Aggregating (Bagging)]], more data
- pointwise in $x$: the global statement is $\mathbb{E}_x$ of the above — one model can be bias-dominated in one region and variance-dominated in another

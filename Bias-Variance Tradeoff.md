The decomposition of expected squared prediction error into noise, squared bias, and variance, together with the observation that the latter two are typically in opposition along model capacity. The decomposition is an algebraic identity; the opposition is a statement about a regime, and fails outside it ([[Double Descent]]).

One instance of the general bias/variance axes studied in [[Estimator Theory]].

**Setup**
Fix a query point $x$. Data $Y = f(x) + \varepsilon$ with $\mathbb{E}[\varepsilon]=0$, $\mathrm{Var}(\varepsilon)=\sigma^2$, $\varepsilon \perp D$. A learner maps $D \mapsto \hat f_D$, so $\hat f_D(x)$ is random through the draw of $D$ — the estimator-is-a-rule distinction from [[Estimator Theory]]. $\bar f(x) := \mathbb{E}_D[\hat f_D(x)]$ is the average prediction over hypothetical re-samples.

- **bias** at $x$: $\bar f(x) - f(x)$ — error of the average model; survives infinite data at fixed capacity
- **variance** at $x$: $\mathbb{E}_D[(\hat f_D(x)-\bar f(x))^2]$ — sensitivity to which sample was seen
- **noise**: $\sigma^2$ — irreducible, independent of the learner

**Decomposition (squared loss)**
$$\underbrace{\mathbb{E}_{D,\varepsilon}\!\left[(Y-\hat f_D(x))^2\right]}_{\text{expected test error}} = \sigma^2 + \underbrace{(\bar f(x)-f(x))^2}_{\text{bias}^2} + \underbrace{\mathbb{E}_D\!\left[(\hat f_D(x)-\bar f(x))^2\right]}_{\text{variance}}$$

*Proof.* Write $Y-\hat f_D(x) = \underbrace{\varepsilon}_{A} + \underbrace{(f(x)-\bar f(x))}_{B} + \underbrace{(\bar f(x)-\hat f_D(x))}_{C}$ and expand $\mathbb{E}_{D,\varepsilon}[(A+B+C)^2]$. The squares give noise, $\text{bias}^2$ ($B$ is deterministic), and variance. Every cross term vanishes: $\mathbb{E}[AB]=B\,\mathbb{E}[\varepsilon]=0$; $\mathbb{E}[AC]=\mathbb{E}[\varepsilon]\,\mathbb{E}_D[C]=0$ (needs $\varepsilon\perp D$, the one substantive assumption); $\mathbb{E}[BC]=B\,\mathbb{E}_D[\bar f(x)-\hat f_D(x)]=0$ by definition of $\bar f$. $\blacksquare$

Same identity as $\mathbb{E}[(Z-c)^2] = \mathrm{Var}(Z)+(\mathbb{E}Z-c)^2$ for $Z=\hat f_D(x), c=f(x)$. The parameter-estimation form ($Z=\hat\theta$, $c=\theta$) is $\mathrm{MSE}(\hat\theta)=\mathrm{Var}(\hat\theta)+\mathrm{Bias}(\hat\theta)^2$ — same split, different $c$, see [[Estimator Theory]].

**Bias can be worth paying**
[[Ridge regularization (L2)|Ridge]] on an orthonormal design ($X^\top X=I_p$) makes this concrete: bias$^2$ and variance are both closed-form in $\lambda$, and the risk-minimizing $\lambda^\star = \sigma^2 p/\|\beta\|^2$ is strictly positive whenever $\sigma^2>0$ — the unbiased estimator ($\lambda=0$) is never MSE-optimal. Holds for general (non-orthonormal) designs too (Hoerl & Kennard 1970). Stronger still: the unbiased estimator for a Gaussian mean in $p\ge3$ is *inadmissible*, beaten in MSE everywhere by shrinkage estimators (Stein 1956; James & Stein 1961) — see [[Bayesian shrinkage]].

**Grounding for the variance side**
[[Cramér-Rao Bound|CR]] floors the variance of *unbiased* estimators via [[Fisher Information]] — bias-variance isn't purely empirical, an unbiased estimator's variance is bounded by real information content in the data. Ridge beats that floor precisely by giving up unbiasedness, so the two aren't in tension.

**Other losses**
The clean additive split is specific to squared loss. For 0-1 loss and [[Cross Entropy]] the decomposition is asymmetric (Domingos 2000), and variance can *reduce* error when the average prediction sits on the wrong side of the decision boundary.

**Capacity dependence**
The identity holds at every capacity; the monotonicity of its terms does not. Variance peaks near the [[Interpolation Threshold]] then falls, so both terms can drop together in the overparameterized regime ([[Double Descent]]) — the identity is never what breaks.

**Mechanisms**
- add bias, cut variance: [[Ridge regularization (L2)]], [[Regularization]], [[Early stopping]], reduced capacity, [[Bayesian shrinkage]]
- cut variance at little bias cost: [[Bootstrap Aggregating (Bagging)]], more data
- pointwise in $x$: the global statement is $\mathbb{E}_x$ of the above — one model can be bias-dominated in one region and variance-dominated in another

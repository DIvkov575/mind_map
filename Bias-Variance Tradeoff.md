The observation that a model's expected prediction error decomposes into three additive pieces — irreducible noise, squared bias, and variance — and that the latter two typically move in opposite directions as model capacity changes: too simple underfits (high bias, low variance), too complex overfits (low bias, high variance). One instance of the general bias/variance axes studied in [[Estimator Theory]].

- ts is qualititative bullshit
- its normally true and there are bounds/derivations for specific estimators
- exceptions such as deep neural networks exist - they under go [[Double Descent]]



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

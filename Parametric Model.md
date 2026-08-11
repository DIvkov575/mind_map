A parametric model is a set of probability distributions indexable by a fixed, finite-dimensional parameter vector:
$$
P = \{P_\theta : \theta \in \Theta \subseteq \mathbb{R}^k\}
$$
for some fixed $k$ — the whole model collapses to choosing $k$ numbers.

- e.g. the [[Laplace distribution]] with parameters $(\mu, b)$, or the [[Exponential Distribution]] with parameter $\lambda$ — both are $k=1$ or $k=2$ parametric families, no matter how much data you have.
- contrast [[Nonparametric]] models, where no fixed-size parameter vector suffices — the effective dimensionality of the model can grow with the data itself (e.g. all continuous CDFs on $\mathbb{R}$)
- fitting a parametric model is estimating $\theta$ (e.g. via [[Maximum Likelihood Estimation (MLE)]]); fitting a nonparametric model is estimating an entire function (a density, a CDF) with no shortcut through a small parameter vector

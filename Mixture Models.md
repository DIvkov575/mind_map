
Definition. A mixture model defines a density (or probability mass function) as a convex combination of $K$ component distributions:

$$
p(x) = \sum_{k=1}^{K} \pi_k , p_k(x \mid \theta_k)
$$

where:
- $p_k(x \mid \theta_k)$ is the $k$-th component distribution (often assumed to be from a common parametric family, e.g. Gaussian), parameterized by $\theta_k$,
- $\pi_k$ are the mixing weights, satisfying $\pi_k \geq 0$ and $\sum_{k=1}^K \pi_k = 1$ 


**Latent-variable formulation**
Every mixture model has an equivalent generative story with a discrete latent variable $z \in {1, \dots, K}$:

$$
z \sim \text{Categorical}(\pi_1, \dots, \pi_K), \qquad x \mid z=k \sim p_k(x \mid \theta_k)
$$

Marginalizing $z$ recovers the mixture density:

$$
p(x) = \sum_{k=1}^K p(z=k) , p(x \mid z=k) = \sum_{k=1}^K \pi_k , p_k(x \mid \theta_k)
$$

This latent view is what makes mixtures tractable to fit: $z$ is a cluster/component assignment, unobserved at training time.

Canonical example: [[Gaussian Mixture Model (GMM)]]

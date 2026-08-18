A statistical manifold is a sufficiently regular family of probability distributions
$$
\mathcal M=\{p_\theta:\theta\in\Theta\subseteq\mathbb R^k\}
$$
treated as a [[Smooth Manifold]].

- a point is a distribution $p_\theta$
- $\theta$ is a coordinate description of that point
- a [[Tangent Space|tangent vector]] describes a first-order change of distribution
- reparameterizing $\theta$ changes the coordinates, not the underlying model

For a curve $\theta(t)$ with velocity $v=\dot\theta(0)$, the corresponding tangent function is
$$
v\log p_\theta=\frac{d}{dt}\log p_{\theta(t)}\bigg|_{t=0}.
$$
Under the usual regularity conditions its expectation is zero, so tangent functions lie in the mean-zero subspace of $L^2(p_\theta)$.

The [[Fisher Information|Fisher-Rao metric]]
$$
\langle v,w\rangle_\theta
=\mathbb E_\theta[(v\log p_\theta)(w\log p_\theta)]
$$
turns a regular statistical manifold into a [[Riemannian manifolds|Riemannian manifold]]. If distinct parameter directions produce no first-order change in the distribution, the Fisher matrix is singular; the model is then non-identifiable or singular rather than Riemannian in those coordinates.

See [[Information Geometry]].

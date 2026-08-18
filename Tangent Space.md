The tangent space $T_pM$ is the vector space of all possible infinitesimal directions through a point $p$ of a [[Smooth Manifold]] $M$.

If $\gamma(t)$ is a smooth curve with $\gamma(0)=p$, its velocity $v=\dot\gamma(0)$ is a tangent vector. Curves with the same first-order behavior define the same vector.

In local coordinates $(x^1,\ldots,x^n)$, define the coordinate basis $\partial_i=\partial/\partial x^i|_p$. Every tangent vector can then be written
$$
v=v^i\partial_i
=\sum_i v^i\frac{\partial}{\partial x^i}\bigg|_p.
$$
The repeated index $i$ is implicitly summed (Einstein notation). The superscript in $v^i$ is an index, not a power: $v^i$ is the component of $v$ along $\partial_i$. For a curve, $v^i=dx^i/dt|_{t=0}$.

A tangent vector acts on a smooth function as a directional derivative:
$$
v[f]=v^i\partial_i f.
$$
The components $v^i$ and basis vectors $\partial_i$ change under reparameterization in opposite ways, leaving the geometric vector $v$ unchanged.

Different points generally have different tangent spaces. A [[Riemannian metric]] provides an [[Inner Product]] within each $T_pM$; it does not directly take inner products between vectors based at different points.

For a [[Statistical Manifold]] with coordinates $(\mu,\sigma)$,
$$
v=a\partial_\mu+b\partial_\sigma
$$
means moving with instantaneous velocities $d\mu/dt=a$ and $d\sigma/dt=b$. Its effect on the distribution is represented by the score perturbation
$$
v\log p_\theta
=a\,\partial_\mu\log p_\theta
+b\,\partial_\sigma\log p_\theta.
$$

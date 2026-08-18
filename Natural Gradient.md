The natural gradient is the steepest optimization direction when step size is measured by change in the represented probability distribution rather than Euclidean distance between parameter vectors.

For an objective $L(\theta)$ and Fisher matrix $I(\theta)$,
$$
\widetilde\nabla L=I(\theta)^{-1}\nabla L.
$$
A descent step is
$$
\theta\leftarrow\theta-\eta I(\theta)^{-1}\nabla L.
$$
This follows by maximizing first-order improvement subject to a small local [[Kullback-Leibler (KL) Divergence|KL]] constraint
$$
\tfrac12\,d\theta^\top I(\theta)d\theta\leq\varepsilon.
$$

Unlike an ordinary gradient, the natural-gradient direction transforms correctly under a smooth reparameterization. It is therefore useful in variational inference, probabilistic-model fitting, and policy optimization where different parameter coordinates can represent the same distributions.

For a univariate [[Gaussian]] parameterized by $(\mu,\sigma)$,
$$
I^{-1}=
\begin{pmatrix}
\sigma^2&0\\
0&\sigma^2/2
\end{pmatrix}.
$$
The correction accounts for the fact that the same numerical parameter change has a different statistical effect at different scales.

If $I$ is singular, some parameter directions do not change the model distribution locally; practical methods then require restriction to identifiable directions, a pseudoinverse, or damping. See [[Information Geometry]].

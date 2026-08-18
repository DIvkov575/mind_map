The Gaussian, or normal, distribution with mean $\mu$ and variance $\sigma^2$ has density
$$
p(x\mid\mu,\sigma)
=\frac{1}{\sqrt{2\pi}\sigma}
\exp\!\left(-\frac{(x-\mu)^2}{2\sigma^2}\right),
\qquad \sigma>0.
$$

- $\mu$ controls location
- $\sigma$ controls scale
- $Z=(X-\mu)/\sigma$ is a standard Gaussian $\mathcal N(0,1)$
- equivalently, every Gaussian is obtained from $Z\sim\mathcal N(0,1)$ by $X=\sigma Z+\mu$

The last observation makes the univariate Gaussian family an orbit of the [[Affine Group]]. Its location-scale parameters form a [[Statistical Manifold]] whose [[Fisher Information|Fisher matrix]] is
$$
I(\mu,\sigma)=
\begin{pmatrix}
\sigma^{-2}&0\\
0&2\sigma^{-2}
\end{pmatrix}.
$$
This gives the hyperbolic worked example in [[Information Geometry]].

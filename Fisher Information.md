Fisher information measures how sensitively a probability distribution changes with its parameters. Large information means nearby parameter values are easy to distinguish from data; small information means they induce nearly the same distributions.

For $X\sim p(x\mid\theta)$, the score vector is
$$
s_\theta(X)=\nabla_\theta\log p(X\mid\theta).
$$
Under the usual regularity conditions, $\mathbb E_\theta[s_\theta]=0$. The Fisher information matrix is therefore the score covariance
$$
I(\theta)
=\mathbb E_\theta[s_\theta s_\theta^\top].
$$
When differentiation can be exchanged with integration,
$$
I(\theta)
=-\mathbb E_\theta[\nabla_\theta^2\log p(X\mid\theta)].
$$
For one parameter this reduces to
$$
\mathcal I(\theta)
=\mathbb E_\theta[(\partial_\theta\log p)^2].
$$

**As an inner product ([[Information Geometry]])**

For tangent vectors $v,w\in T_\theta\mathcal M$ of a [[Statistical Manifold]], the Fisher-Rao inner product is
$$
\langle v,w\rangle_\theta
=v^\top I(\theta)w
=\mathbb E_\theta[(v\log p_\theta)(w\log p_\theta)].
$$
This is a [[Riemannian metric]] when $I(\theta)$ is positive definite. It compares the first-order changes that $v$ and $w$ cause in the distribution, not their raw coordinate components.

The local expansion
$$
D_{\mathrm{KL}}(p_\theta\|p_{\theta+\delta})
=\tfrac12\delta^\top I(\theta)\delta+O(\|\delta\|^3)
$$
shows that Fisher information is the symmetric second-order geometry inside [[Kullback-Leibler (KL) Divergence|KL]].

**Statistical consequences**

- information from independent observations adds, so $I_n(\theta)=nI_1(\theta)$
- $I(\theta)^{-1}$ is the local uncertainty scale in the [[Cramér-Rao Bound]]
- zero eigenvalues identify parameter directions that do not change the distribution to first order
- $I(\theta)^{-1}\nabla L$ is the [[Natural Gradient]]

For the Gaussian location-scale family,
$$
I(\mu,\sigma)=
\begin{pmatrix}
\sigma^{-2}&0\\
0&2\sigma^{-2}
\end{pmatrix}.
$$
See the worked derivation and Lie-group interpretation in [[Information Geometry]].

Differential geometry applied to probability models: a regular [[Parametric Model]] $\mathcal M=\{p_\theta:\theta\in\Theta\}$ is treated as a [[Statistical Manifold]].

- points are probability distributions $p_\theta$
- parameters $\theta$ are coordinates, not the geometric objects themselves
- a [[Tangent Space|tangent vector]] is an infinitesimal change of distribution
- the [[Fisher Information|Fisher-Rao metric]] is the [[Inner Product|inner product]] used to compare tangent vectors

**The Fisher inner product**
At $p_\theta$, write tangent vectors as $v=v^i\partial_i$ and $w=w^j\partial_j$, where $\partial_i=\partial/\partial\theta^i$ and repeated indices are summed. Their score perturbations are

> [!note] Reading $v=v^i\partial_i$
> $\partial_i=\partial/\partial\theta^i$ is the basis direction for coordinate $\theta^i$, while $v^i$ is the component of $v$ in that direction (an index, not an exponent). A repeated index is summed:
> $$
> v=v^i\partial_i=\sum_i v^i\frac{\partial}{\partial\theta^i}.
> $$
> If $\theta(t)$ is a curve, then $v^i=d\theta^i/dt$, so $v$ is its instantaneous velocity. Acting on a function, $v[f]=v^i\partial_i f$ is the directional derivative **in the direction $v$ itself**: $v[f]=\tfrac{d}{dt}f(\theta(t))$, the rate of change of $f$ as you move along that curve. With $f=\log p_\theta$, $v\log p_\theta=\tfrac{d}{dt}\log p_{\theta(t)}$ is the rate of change of the log-density along $v$. For $\theta=(\mu,\sigma)$, $v=a\partial_\mu+b\partial_\sigma$ means $d\mu/dt=a$ and $d\sigma/dt=b$. See [[Tangent Space]].

$$
v\log p_\theta=v^i\partial_i\log p_\theta,
\qquad
w\log p_\theta=w^j\partial_j\log p_\theta.
$$

> [!note] Reading "score perturbation"
> $\partial_i\log p_\theta$ is the **score**, the gradient of the log-likelihood whose covariance defines the Fisher information $I_{ij}$ below. Contracting it with a direction gives the directional score $v\log p_\theta=v^i\partial_i\log p_\theta$: the first-order change ("perturbation") in $\log p_\theta$ under an infinitesimal nudge of $\theta$ along $v$ (no permutation is involved). So $\langle v,w\rangle_\theta$ is the covariance of the two directional scores.

The Fisher inner product is
$$
\langle v,w\rangle_\theta
=\mathbb E_\theta[(v\log p_\theta)(w\log p_\theta)]
=v^\top I(\theta)w,
$$
where $I_{ij}(\theta)=\mathbb E_\theta[\partial_i\log p_\theta\,\partial_j\log p_\theta]$.

Equivalently, if $v$ and $w$ change the density by $\delta p_v$ and $\delta p_w$,
$$
\langle v,w\rangle_p=\int\frac{\delta p_v(x)\delta p_w(x)}{p(x)}\,dx.
$$
This measures similarity of the changes they cause in the distribution, not similarity of their coordinate vectors. It is also the local second-order part of [[Kullback-Leibler (KL) Divergence|KL]]:
$$
D_{\mathrm{KL}}(p_\theta\|p_{\theta+d\theta})
=\tfrac12\,d\theta^\top I(\theta)d\theta+O(\|d\theta\|^3).
$$

**Worked example: Gaussian location and scale**

Every univariate [[Gaussian]] can be obtained from a standard Gaussian by
$$
x\mapsto \sigma x+\mu,\qquad \sigma>0.
$$
The transformations form the orientation-preserving [[Affine Group]]. Its invariant infinitesimal generators on the $(\mu,\sigma)$ parameter space are
$$
T=\sigma\partial_\mu,\qquad D=\sigma\partial_\sigma,
\qquad [D,T]=T.
$$
The bracket says that scaling changes the size of a subsequent translation. It does not itself define a distance or curvature.

The subspace $\mathfrak t=\operatorname{span}\{T\}$, not the element $T$ alone, is an [[Ideal (Lie Algebra)|ideal]] because $[D,T]\in\mathfrak t$. Therefore translations form a stable subsystem, and the quotient by translations retains only scale.

For $p_{\mu,\sigma}=\mathcal N(\mu,\sigma^2)$, the Fisher matrix and line element are
$$
I(\mu,\sigma)=
\begin{pmatrix}
\sigma^{-2}&0\\
0&2\sigma^{-2}
\end{pmatrix},
\qquad
ds^2=\frac{d\mu^2+2\,d\sigma^2}{\sigma^2}.
$$
Thus
$$
\langle T,T\rangle=1,\qquad
\langle D,D\rangle=2,\qquad
\langle T,D\rangle=0.
$$
The affine action preserves these values, so it acts by isometries of the Fisher geometry.

Set $x=\mu/\sqrt2$ and $y=\sigma$. Then
$$
ds^2=2\frac{dx^2+dy^2}{y^2},
$$
the upper-half-plane model of [[Hyperbolic Geometry]] with curvature $-1/2$. A fixed numerical shift in $\mu$ becomes cheaper as $\sigma$ grows. Consequently, the shortest Fisher path between narrow Gaussians with distant means can broaden the distribution, move its mean, and narrow it again rather than remain at fixed $\sigma$.

**What the two structures buy**

- Lie theory: identifies symmetries, operation-order effects through the [[Lie Bracket]], stable subsystems through ideals, and reduced models through quotients.
- Fisher geometry: measures local distinguishability, gives geodesics and curvature, and makes optimization coordinate-independent through the [[Natural Gradient]].
- Statistical inference: $I(\theta)^{-1}$ supplies the local covariance scale in the [[Cramér-Rao Bound]].

The boundary matters: an ideal alone does not imply a Fisher metric, orthogonality, statistical independence, or negative curvature. Those conclusions require the probability model and its Fisher inner product.




**Group Representational Position Encoding (GRAPE)**
https://arxiv.org/pdf/2512.07805 - im tired



 **Math BS - Enumerating all representations - Useless not worth read**
**1** All encodings can be characterized by a [[One-parameter group]]

Let’s suppose we have a time series of queries $q(t): \mathbb{R} \to \mathbb{R}^d$ and a time series of keys $k(t): \mathbb{R} \to \mathbb{R}^d$

Use $f: \mathbb{R} \times \mathbb{R}^d \to \mathbb{R}^d$ and $g: \mathbb{R} \times \mathbb{R}^d \to \mathbb{R}^d$.
Set $Q(s) = f(s, q(s))$, $K(s) = g(t, k(t))$ such that attention scores become $$Q(s)^{\top}K(t)$$
**2** Properties of good positional encodings
- Linearity: not justifiable (but assumption from [Jane Street Blog](https://blog.janestreet.com/using-group-theory-to-explore-positional-encodings-attention/) bc vector spaces)
	Ensures that we can write $f(s,q(s)) = F(s)q(s)$ with F being a square matrix and our attention compute is $$Q(s)^{\top}K(s) = q(s)^{\top}F(s)^\top G(t)k(t)$$
- Translational invariance (relative pos): for and $s$ and $t$ we have $$F(s)^\top G(t) = F(t-s)^\top G(0)$$ we also assume $F(t)^\top G(t) = I$ (F,G on 0 + translation). Let $A(t) = F(t)^\top G(0)$; then $A(s)A(t) = A(s+t)$
- Continuity $A(t)$ is a continuous function of t There are discontinuous functions that satisfy our constraints, but they require the [[Axiom of Choice]] to describe and are far too deranged to implement on a physical computer.
**3** All one-parameter matrix group has the form $A(t) = exp(tX)$ for some fixed generator $X$. If $A$ is [[Diagonalization|diagonizeable]], then [[Direct Sum]] of d one-dim spaces. Since original space was real, all complex eigenvalues come in conjugate pairs, which can be merged into read 2d invariant subspaces, which appear as scale+rotations.

Action of A on a 1D subspace is blow-up or decay (A(t) is $exp(tu)$ for real $u$)
Action of A on 2dD subspaces can be written as 
$$
A(t)=\exp(tu)\begin{pmatrix}exp(it\theta)&0\\0&exp(-it\theta\end{pmatrix}
$$
which can be re-express real
**4** Let $F(t) = G(t) = R(-t\theta)$, so $F(t)^\top = R(t\theta)$ We can immediately check that $F(t)^\top G(t) = R(t\theta)R(-t\theta) = I$ and
that $F(t)^\top G(0) = R(t\theta)R(0) = A(t)$

F and G are constant-frequency roration on our query and key subspaces. We've derived [[RoPE]], with new damping (r).
This exponential damped (r) RoPE is the encoding used in [[ResNet]] and [[Mamba|Mamba-3]]

Learns an invertible mapping $f_\theta: z \leftrightarrow x$ transforming a simple base distribution $p_0(z)$ into $p_{\text{data}}(x)$, via the change-of-variables formula:
$$p_{\text{data}}(x) = p_0(f_\theta^{-1}(x)) \left| \det \frac{\partial f_\theta^{-1}}{\partial x} \right|$$

Stack $K$ invertible layers with tractable Jacobians, $x = f_K \circ \dots \circ f_1(z)$. Train by maximizing $\mathcal{L}(\theta) = \sum_i \log p_{\text{data}}(x_i)$; sample by drawing $z\sim p_0$ and pushing forward through $f_\theta$.

Layer types (all trade expressiveness vs. Jacobian cost):
- Affine - simplest, limited expressiveness alone
- Coupling Layers ([[RealNVP]] / [[Glow]]) - split dims, transform one half conditioned on the other:
  $$x_a = z_a, \qquad x_b = z_b \odot \exp(s_\theta(z_a)) + t_\theta(z_a)$$
  Triangular Jacobian, cheap: $\det J = \prod_i \exp(s_i)$. Parallel to invert.
- Autoregressive Flows - each $x_i$ conditioned on previous outputs:
  $$x_i = \mu_\theta(z_{<i}) + \sigma_\theta(z_{<i}) \cdot z_i$$
  Same triangular-Jacobian trick, but sequential (not parallel) to invert. [[IAF]] conditions on $z_{<i}$ (fast sample/slow density); [[MAF]] conditions on $x_{<i}$ (opposite tradeoff)
- Continuous Flows ([[Neural ODE]], [[FFJORD]], [[Continuous Normalizing Flows (CNFs)]]) - infinitely many infinitesimal layers:
  $$\frac{dx}{dt} = v_\theta(x,t), \qquad \frac{d \log p(x(t))}{dt} = -\text{Tr}\left(\frac{\partial v_\theta}{\partial x}\right)$$
  Trace instead of determinant (Hutchinson's trick) - drops the discrete flow's cheap-Jacobian architectural constraint entirely.

Shortcomings:
- Jacobian determinant is expensive in high dimensions
	- hence triangular-Jacobian architectures (coupling/autoregressive layers, $O(d)$ determinant) as the immediate fix
	- subsequently continuous-time formulation, where a trace replaces the determinant via [[Hutchinson's Trick]]) - this is what [[Continuous Normalizing Flows (CNFs)|CNF]
- CNF training is slow/unstable
	- maximizing likelihood requires backpropagating through an ODE solve (expensive forward simulation + adjoint backward pass, discretization error)
	- hence [[Flow Matching]]: skip simulating the ODE during training entirely, regress $v_\theta$ onto a simple prescribed conditional path (e.g. linear interpolation noise→data) - simulation-free, stable regression loss instead of likelihood-through-an-ODE-solver.

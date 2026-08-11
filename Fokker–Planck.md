The PDE governing how the probability density $p(x,t)$ of a stochastic process evolves over time — the "Kolmogorov forward equation" for a [[Diffusion process]].

For an SDE $dx_t = b(x_t,t)\,dt + \sigma(x_t,t)\,dW_t$, the density satisfies:
$$
\partial_t p(x,t) = -\nabla\cdot\big(b(x,t)\,p(x,t)\big) + \tfrac12 \nabla\cdot\nabla\cdot\big(\sigma\sigma^\top p(x,t)\big)
$$

- first term: **drift** — advection of probability mass along $b$
- second term: **diffusion** — spreading/smoothing, from the noise coefficient $\sigma$

**Connections**
- for overdamped [[Langevin Dynamics]], $dx = -\nabla U(x)\,dt + \sqrt{2\beta^{-1}}\,dW_t$, the Fokker–Planck equation's stationary solution is exactly the target density $p(x) \propto e^{-\beta U(x)}$ — this is *why* Langevin dynamics converges to the right distribution
- PDEs of this form can be viewed as **gradient flow in [[Wasserstein]] space** (Otto calculus) — the Fokker–Planck equation is the gradient flow of the free energy functional w.r.t. the $W_2$ metric
- the reverse-time SDE in score-based [[Diffusion Models]] is derived by time-reversing the forward Fokker–Planck dynamics

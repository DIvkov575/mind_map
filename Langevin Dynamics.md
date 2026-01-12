stochastic differential equations that model the evolution of a system under both deterministic forces and random noise.
- **gradient flow in probability space** (Wasserstein geometry) with entropy regularization
- [[Score Based Models]] and [[Diffusion Models]] can be interpreted as:
    - Forward: noisy Langevin-like diffusion that destroys structure.
    - Reverse: learned drift approximating the **time-reversed Langevin dynamics**.


For a state $dx_t \in \mathbb{R}^d$
$dx_t = -\nabla U(x_t)\,dt + \sqrt{2\beta^{-1}}\,dW_t$
- U(x): potential (energy) function
- $-\nabla U(x)$: deterministic drift toward low energy
- $W_t$​: standard Brownian motion
- β: inverse temperature (controls noise level)
**Interpretation**
- Combines **gradient descent** (downhill in U) with **Gaussian noise**.
- The noise prevents the system from getting stuck in local minima.
- Under mild conditions, the stationary distribution is $p(x) \propto e^{-\beta U(x)}$ 
**Over-damped Langevin (most common in ML)**: no momentum term (equation above).
**Under-damped Langevin** (includes velocity/momentum) (inertia + friction) (physics):
	$\begin{aligned} dx_t &= v_t\,dt \\ dv_t &= -\gamma v_t\,dt - \nabla U(x_t)\,dt + \sqrt{2\gamma\beta^{-1}}\,dW_t \end{aligned}$

### Implications
**sampling**: 
- Langevin dynamics converges to a **distribution**.
- Implication: it provides a principled way to sample from
	$p(x) \propto e^{-\beta U(x)}$
	rather than just minimizing U(x)
**Bridge between physics and inference**
- Physical view: thermal motion ([[Fokker-Planck]]) in an energy landscape.
- Statistical view: Markov process whose invariant measure is a Bayesian posterior.
- Implication: concepts like temperature, entropy, and free energy directly translate to inference and learning.


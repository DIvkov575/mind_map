## Definition
- Model for flows governed by potential energy gradient and stochastic forces
	- Explores E landscape
- Underlies diffusion (reverse) & score-based process
- Sampling a walk converges to stationary posterior distribution $p(x) \propto e^{-\beta U(x)}$ 
	- Equivalently $E_p​[f(x)]$
	- Flexible step sizes: You can tune noise vs. step size to trade off speed vs. accuracy, allowing efficient approximate sampling.
	- MCMC scales O(d) w/ dimension, but gradient-based scales O(c)

- Formally, **Langevin equation** for a particle of mass m is:
	$\frac{d^2 x}{dt^2} = -\nabla U(x) - \gamma \frac{dx}{dt} + \eta(t)$
	Where:
	- x = particle position
	- U(x) = potential energy (deterministic forces come from $-\nabla U(x)$
	- γ = friction coefficient (damping)
	- $\eta(t)$ = random noise, usually Gaussian with mean 0 and variance $2 \gamma k_B T$ (thermal fluctuations)
	



- a type of gradient [[Flow]] in probability space ([[Wasserstein | Wasserstein]] geometry) with [[entropy regularization]]
- [[Score Based Models]] and [[Diffusion Models]] can be interpreted as:
    - Forward: noisy Langevin-like diffusion that destroys structure.
    - Reverse: learned drift approximating the **time-reversed Langevin dynamics**.

$dx_t = -\nabla U(x_t)\,dt + \sqrt{2\beta^{-1}}\,dW_t$
- U(x): potential (energy) function
- $-\nabla U(x)$: deterministic drift toward low energy
- $W_t$​: standard Brownian motion
- β: inverse temperature (controls noise level)

## Observations / Yap
- [[Brownian Motion]] is a special case of Langevian Dynamics (w/o drift or friction)
- Just a generalized (type) [[Diffusion process]]
	- **Drift** (from −∇U(x)-\nabla U(x)−∇U(x)) → makes particles more likely to move toward low-energy regions.
	- **Friction** → balances energy input from noise, giving **thermal equilibrium**.
	- If you take the **overdamped limit** (ignore inertia, m→0), the Langevin equation becomes:
		$dx = -\frac{1}{\gamma} \nabla U(x) \, dt + \sqrt{\frac{2 k_B T}{\gamma}} \, dW_t$
		This is exactly a **diffusion process in a potential field**. The particle’s position **diffuses** but it’s biased by $-\nabla U$
-  [[Diffusion Models]] simulate **particles diffusing under Langevin dynamics** in data space
		- Forward is diffusing away
		- Reverse can be modeled by Langevian Dynamics
    

### BS
**Over-damped Langevin (most common in ML)**: no momentum term (equation above).
**Under-damped Langevin** (includes velocity/momentum) (inertia + friction) (physics):
	$\begin{aligned} dx_t &= v_t\,dt \\ dv_t &= -\gamma v_t\,dt - \nabla U(x_t)\,dt + \sqrt{2\gamma\beta^{-1}}\,dW_t \end{aligned}$

## Implications
**sampling**: 
- Langevin dynamics converges to a **distribution**.
- Implication: it provides a principled way to sample from
	$p(x) \propto e^{-\beta U(x)}$
- used in [[Markov Chain Monte Carlo (MCMC) | MCMC]] methods like **[[Langevin Monte Carlo]]** to sample from a target probability distribution. 

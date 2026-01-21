framework for training continuous-time generative models by directly learning a vector field that transports a simple base distribution (e.g., Gaussian noise) into a target data distribution.
- learns how a probability distribution evolves
- The learned vector field defines a mass-preserving transport
- [[Optimal Transport]] intuition: learns a continuous path moving probability mass
- With flow matching, a single particle evolves deterministically once its initial condition is fixed.
- learns a vector field that transports samples from a base distribution $p_0$​ to a target distribution $p_1$ along a prescribed continuous path of distributions (fix how probability mass moves over time)

- learns a denoising ODE, but the “teacher” velocity signal is synthetic, generated via interpolation eg. [[Bilinear Interpolation]] is common

You choose a family of random variables
	$x_t = \psi_t(x_0, x_1), \quad t \in [0,1]$
such that
- $x_0 \sim p_0$
- $x_1 \sim p_1$
- $p_t = \mathcal{L}(x_t)$) varies _continuously_ in t
This defines a path of distributions $\{p_t\}_{t\in[0,1]}$
The neural network is trained to match the true velocity
	$v^*(x_t, t) = \frac{d}{dt}\psi_t(x_0, x_1)$
via regression:
	$\mathcal{L} = \mathbb{E}\big[\|v_\theta(x_t,t) - v^*(x_t,t)\|^2\big]$

Examples:
[[Rectified Flow]] (Lipman et al., 2022)
[[Conditional Flow Matching (CFM)]]
[[Stochastic Flow Matching / OT-FM]]
[[Continuous Normalizing Flows (CNFs)]]

Similar
[[Neural ODE]] is a broader class of vector space learning, however flow matching NODE learns to match probability distribution
[[Diffusion Models]] can be thought of as noise flow matching
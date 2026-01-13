**Goal** Learn to **denoise a stochastic process** that gradually turns data into noise.
- **Score-based diffusion** can be viewed as a **stochastic differential equation (SDE)**

- Standard diffusion models define a **stochastic forward process** $x_0 \to x_T$​ and then learn a **reverse-time conditional** $p_\theta(x_{t-1} \mid x_t)$
- This reverse-time process can be interpreted as a **vector field in state space**, especially in **continuous-time formulations** (score-based SDEs):
	$dx = f_\theta(x, t) dt + g(t) dW_t$
	
- The reverse-time SDE resembles a [[Neural ODE]] when **noise goes to zero**, giving a deterministic flow: $\frac{dx}{dt} = f_\theta(x,t)$
	- [[Consistency Model]]s explicitly leverage this to only learn the underlying [[Flow Map]] ([[Flow-Based Model]])


-  Diffusion Models simulate **particles diffusing under [[Langevin dynamics]]** in data space
	- Forward is diffusing away
	- Reverse can be modeled by Langevian Dynamics
- Noise is gradually added (forward process), then **Langevin-like updates** are used to sample from the learned distribution (reverse process).
- Intuition: **sampling = simulating noisy particles that “settle” into regions of high probability** (like particles in a potential well).


### Yap
- Reverse (denoising) process can be modelled by [[Langevin Dynamics]] ie particle/sample settling into low potential well
- Operates in either [[data space (DDPM)]] or [[latent space (LDM)]] moving samples (objects/structures/images) between unlikely and likely wells
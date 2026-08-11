[[Gaussian Mixture Model (GMM)]]
- cannot model complex interactions

[[Boltzmann Machines]] 
- Expensive if raw or inexpressive if [[Boltzmann Machines|restricted]]
- Response to **GMMs**
[[Deep Boltzmann Machines (DBM)]] (improved [[Deep Belief Networks (DBN)]])
- More expressive
- Slow, approximate sampling, unstable, sensitive to hyperparametres
- Next generations entirely avoided MCMC sampling


[[Generative Adversarial Network (GAN)]] 2014
- Emerged directly out of frustration  with training **BMs**
- Skips need to formulate explicit density & No MCMC
- unstable convergence & may fail to capture (full) true posterior


[[Variational Auto Encoder (VAE)]] 2013
- Response to **BMs**
- Attempted deep generative latent-variable model trained with no sampling loop
- Solution: reparamterization trick: turns variational lower bound into differneitable
- Still requires an explicit likelihood/[[Evidence Lower Bound Optimization (ELBO)|lower bound]] formulation
[[Normalizing Flows]]
- Response to **VAEs**
- Likelihood tractable -> max likelihood optimization -> model distribution matches data
- Can get probability of individual samples with deterministic sampling
- Expensive training
[[Flow Matching]]
- Cheaper/Stable response to [[Normalizing Flows]] and CNFs 
- vanilla Flow Matching pairs noise $x_0\sim p_0$ and data $x_1\sim p_{\text{data}}$ independently/randomly when constructing the linear interpolation path $x_t=(1-t)x_0+tx_1$. Each individual conditional path is straight, but random pairings cross each other, so the marginal vector field the network regresses onto ends up curved. Curved ODE trajectories require many small integration steps to sample accurately - the actual bottleneck both of the following target.
- Expensive inference
[[OT-CFM]] (Tong et al., 2023)
- Respond to **FM**
- Motivation: fix the curvature at its source - the arbitrary independent coupling - in a single training run, without any iterative retraining.
[[Rectified Flow]]
- Respond to **FM**
[[Consistency Model]]


[[Score Matching]]
- response to **BMs**
- the gradient of $\log Z$ with respect to $x$ is zero, so you can learn $\nabla_x \log p(x)$ without ever touching $Z$ or running MCMC to train. 
[[Denoising Score Matching (DSM)]]
[[Noise-Conditional Score Network (NCSM)]] equivalent to [[Denoising Diffusion Probabilistic Models (DDPM)]] ([[Diffusion Models]])



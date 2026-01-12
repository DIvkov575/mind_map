Particle filter models are **a class of sequential Monte Carlo (SMC) methods** used for **estimating the hidden state of a dynamic system over time**, especially when the system is **nonlinear and/or has non-Gaussian noise**, where standard methods like the [[Kalman filter]] fail.

### **Purpose**

Particle filters aim to approximate the **posterior distribution of latent states** $p(x_t \mid y_{1:t})$
- **State dynamics:** $x_t \sim f(x_t \mid x_{t-1})$
- **Observation model:** $y_t \sim g(y_t \mid x_t)$
### **Core Idea**

Instead of representing the posterior analytically, particle filters use a **set of weighted samples (particles)**:

$\{x_t^{(i)}, w_t^{(i)}\}_{i=1}^N$
- $x_t^{(i)}$ = the i-th sampled state at time t
- $w_t^{(i)}$​ = its associated weight (importance)

The weighted particles approximate the posterior.
###  **Algorithm Outline**
A typical particle filter (Sequential [[Importance Sampling | Importance Resampling]]) involves:
1. **Initialization**: Sample N particles from the prior $p(x_0)$.
2. **Prediction**: Propagate each particle via the state transition $x_t^{(i)} \sim f(x_t \mid x_{t-1}^{(i)})$
3. **Weighting**: Update particle weights according to the likelihood of the observation $w_t^{(i)} \propto g(y_t \mid x_t^{(i)})$
4. **Resampling**: Resample particles proportionally to weights to avoid degeneracy (where most weights become negligible).
5. **Repeat** for each new observation.

Classical state-space models (probabilistic, parametric)



**Linear**
[[Kalman filters]]
Continuous
[[Linear SDEs]]
[[Ornstein–Uhlenbeck]]
**Nonlinear**
[[Unscented Kalman filters]]
[[Particle filters]]



continuous-time latent dynamics

### Latent ODEs
$\dot z(t) = f_\theta(z(t), t)$
with
- Encoder: x1:T→z(t0)x_{1:T} \rightarrow z(t_0)x1:T​→z(t0​)
- Decoder: z(t)→x(t)z(t) \rightarrow x(t)z(t)→x(t)

Examples:
- **[[Neural ODE]]** (Chen et al.)
- **[[Latent ODE]]** (Rubanova et al.)
- Fit continuous latent dynamics to trajectories.
- Good for [[Irregular Sampling]] and extrapolation.
-  No external inputs during evolution (unlike [[Neural Controlled Diferential Equation (NCDE)]])
- Decoder needed for output
- Differences modeled by ANN

A **Neural ODE** models a latent state z(t) that evolves continuously over time according to an ODE parameterized by a neural network.

$\frac{dz(t)}{dt} = f_\theta(z(t), t)dt$

- $z(t) \in \mathbb{R}^d$ is the latent state at time t
- $f_\theta$ is a neural network that outputs the derivative of z(t)
- The ODE is **autonomous** if $f_\theta$ depends only on z(t)z(t)z(t) and ttt
- **Initial state $z_0$​** is obtained by encoding the observed input sequence (e.g., via an RNN or MLP)

#### See
[[ResNet]] a **forward Euler discretization** of an ODE:
- $h_{k+1} = h_k + \Delta t \, f_\theta(h_k)$
- Neural ODEs take the limit $\Delta t \to 0$, giving:
	- continuous depth
	- adaptive step sizes
	- no fixed number of layers
[[Latent Neural ODE]]
[[Stochastic Neural ODE]]
[[Augmented Neural ODE]]
Generalization of [[Consistency Model]]
- Learn **invertible transform** $f_\theta: z \leftrightarrow x$ between a simple latent $z \sim p(z)$ and data $x \sim p(x)$
- **Mechanism:** Use the **change-of-variables formula**:
	$p_\theta(x) = p(z) \left| \det \frac{\partial f_\theta^{-1}(x)}{\partial x} \right|$
- **Training:** Maximize likelihood of data under the model.
- **Eg** [[RealNVP]], [[Glow]], [[FFJORD]]
If the latent-to-data transformation is **continuous in time**, exact likelihood computation follow from ([[Neural ODE]]):  $\log p(x_1) = \log p(x_0) - \int_0^1 \text{Tr} \left( \frac{\partial f_\theta}{\partial x(t)} \right) dt$

Aside/Bullshit - [[Flow Map]]

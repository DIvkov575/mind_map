Learns an invertible mapping $f_\theta: z \leftrightarrow x$ so that $x = f_\theta(z)$ transforms a simple distribution $p_0(z)$ into $p_{\text{data}}(x)$
Uses change of variable formula 
$$p_{\text{data}}(x) = p_0(f_\theta^{-1}(x)) \left| \det \frac{\partial f_\theta^{-1}}{\partial x} \right|$$

Procedure
1) Choose base distribution
2) Determine # layers $x = f_K \circ f_{K-1} \circ \dots \circ f_1(z)$ where each $f_k$ invertible with [[Jacobian]]
3) Pick transformation types
	1) Affine
	2) Coupling Layers ([[RealNVP]] / [[Glow]])
		$x_a = z_a, \quad x_b = z_b \odot \exp(s_\theta(z_a)) + t_\theta(z_a)$
		here $s_\theta$ and $t_\theta$ are small neural networks
		Split dimensions, transform one half conditioned on the other.
		(upper/lower) Triangular Jacobian (hence cheap) $\det J = \prod \exp(s_i)$
	3) Autoregressive Flows - depend on outputs of previous layers...
		$x_i = \mu_\theta(z_{<i}) + \sigma_\theta(z_{<i}) \cdot z_i$
		Sequential, Triangular Jacobian
	4) Continuous Flows ([[Neural ODE]] [[FFJORD]])
		$\frac{dx}{dt} = v_\theta(x,t), \quad x(0) = z$
		Density evolves wtih 
		$\frac{d \log p(x(t))}{dt} = - \text{Tr}\Big(\frac{\partial v_\theta}{\partial x}\Big)$
4) Compute Density?
5) Train maximize likelihood on your data $\{x_i\}$
	$\mathcal{L}(\theta) = \sum_i \log p_X(x_i)$
6) Sample from flow


Shortcomings:
- Jacobian of Determinant is expesnive in high dimensiosn
- Needs **careful architectural constraints** to keep invertibility tractable.
- Can struggle with complex distribtutions


[[Continuous Normalizing Flows (CNFs)]]
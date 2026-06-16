 “work” is needed to transform one probability distribution into another, where “work” = amount of probability mass moved × distance it is moved.
 - Respects geometry (unlike [[Kullback-Leibler (KL) Divergence]]) 
	 - If two distributions are the same shape but shifted, Wasserstein grows linearly with the shift. KL may behave pathalogically or be infinite w/ mismatched [[Support]]

1-Wasserstein distance definition:
$$W_1(\mu,\nu)=\inf_{\gamma\in\Pi(\mu,\nu)} \int \|x-y\|\, d\gamma(x,y)$$
	$\Pi(\mu,\nu)$ all joint-distributions [[Coupling]]s with marginal $\mu$ and $\nu$
	$\gamma(x,y)$ how much mass is transported from $x$ and $y$
	$\|x-y\|$ ground metric (often [[Euclidean distance]])
	there is a clean closed form $$W_1(\mu,\nu)=\int_0^1 \left|F_\mu^{-1}(t)-F_\nu^{-1}(t)\right|\,dt$$
	meaning 
	- take quantile functions CDFS
	- compare corresponding percentiles
	- average absolute distance
	Example:
	if $\mu = \delta_0$ and $\nu = \delta_a$; then wasserstein distance is $|a|$

2-Wasserstein ($W_2$) distance is the optimal transport distance with quadratic transport cost
	$$W_2(\mu,\nu)=\left(\inf_{\gamma\in\Pi(\mu,\nu)}\int \|x-y\|^2\,d\gamma(x,y)\right)^{1/2}$$
	so $||x-y|| \rightarrow ||x-y||^2$
	People call this [[Wasserstein geometry]] [[Otto Calculus]] Riemmannian Structure on probability space
	- smooth gradients (unlike KL/JS still provides meaninfull structure w/ mismatched support)
	- Many PDEs become gradient descent in [[Wasserstein]] space
		- [[Fokker–Planck]], 



It is also known as information radius IRad or total divergence to the average. It is based on the [[Kullback-Leibler (KL) Divergence]] with some notable (and useful) differences, including that it is symmetric and it always has a finite value.
$$\operatorname{JSD}(P,Q) = H(M) - \frac12 H(P)- \frac12 H(Q)$$

- Square root is referred to as Jenson-Shannon distance
Used when you want
- symmetric
- bounded
- stablility
- distribution similarity measure
Generally
- 

**Major use case**
	1) Original [[Generative Adversarial Network (GAN)]]  effectively optimize JSD between:  real data distribution and generator distribution through the discriminator game.
	Why JSD fit GANs initially:
	- symmetric “distribution distinguishability”
	- bounded objective
	- probabilistic interpretation
	Why people moved away:
	- saturation on disjoint supports
	- vanishing gradients in high dimensions
	leading to:
	- [[Wasserstein distance]] GANs
	- [[Score Based Models | score matching]]
	- [[Diffusion Models]]
	- [[Flow Matching]]
2)  Comparing probabilty distribtions
	- works well bc. interpretable, finite, symmetric, insensetive to zeros
3) Clustering Distributions
4) Topic modelling
5) Bioinformatics


**Downside/Unfavored**
- Saturation (bounded)
- Modern high-dimensional distributions are tyipcally concentrated on thin manifolds and nearly disjiont

**Prefer KL When**
- you care about likelihood
- 

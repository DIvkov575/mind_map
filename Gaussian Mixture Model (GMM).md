
$$
p(x) = \sum_{k=1}^K \pi_k , \mathcal{N}(x \mid \mu_k, \Sigma_k)
$$

Full parameter set: $\theta = {\pi_k, \mu_k, \Sigma_k}_{k=1}^K$.

**why [[EM]], not direct [[Maximum Likelihood Estimation (MLE)]]**
The log-likelihood over $N$ i.i.d. samples,

$$
\log p(x_{1:N} \mid \theta) = \sum_{i=1}^N \log \left( \sum_{k=1}^K \pi_k , p_k(x_i \mid \theta_k) \right)
$$

has a sum inside the log, so no closed-form MLE — unlike a single-component exponential-family model. The Expectation–Maximization algorithm resolves this by introducing the responsibility (posterior over the latent assignment):

$$
\gamma_{ik} \equiv p(z_i = k \mid x_i, \theta) = \frac{\pi_k , p_k(x_i \mid \theta_k)}{\sum_{j=1}^K \pi_j , p_j(x_i \mid \theta_j)} \quad \text{(E-step)}
$$

then maximizes the expected complete-data log-likelihood in closed form given $\gamma_{ik}$ (M-step), e.g. for a GMM:

$$
\pi_k = \frac{1}{N}\sum_i \gamma_{ik}, \qquad \mu_k = \frac{\sum_i \gamma_{ik} x_i}{\sum_i \gamma_{ik}}
$$

iterating monotonically increases $\log p(x_{1:N}\mid\theta)$ (via a variational lower bound — the same ELBO machinery that underlies VAEs).

Key properties

- Universal approximation: with enough components, a GMM can approximate any smooth density arbitrarily well (this is the density-estimation analogue of why mixtures matter).
- Identifiability only up to label permutation of the $K$ components.
- Distinguish from a mixture of experts, where $\pi_k(x)$ is itself a function of $x$ (gating network) rather than a fixed global weight — that's the mixture-model idea made conditional, and the direct ancestor of MoE layers in modern transformers.


**Issues**
- Unable to model complex and high order interactions
- Low Expressivity & Limited blobular [[Gaussian]] distributions
- Faces [[Curse of Dimensionality]]
	- If we want to approximate a [[Manifold]] using points/blobs we need many many points in high dimension
	- This manifold is not paramterized/mapped hence we must model using a bunch of points/blobs/gaussians
	- Hence we get very rigid estimate
	- This motivated replacing teh discrete sum of simple components with an expressive transform of a simple base distribution: [[Variational Auto Encoder (VAE)]]
	

**See More**
[[Mixture Density Networks (MDN)]]




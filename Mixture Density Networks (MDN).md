MDN: a neural net maps $x \mapsto$ (mixture of Gaussians over $y$).
$$
p(y \mid x) = \sum_{k=1}^K \pi_k(x) , \mathcal{N}\big(y \mid \mu_k(x), \Sigma_k(x)\big)
$$

$$
\big[\pi_k(x), \mu_k(x), \Sigma_k(x)\big]_{k=1}^K = \text{NN}(x; \theta)
$$

with the usual mixture constraint $\pi_k(x) \geq 0,\ \sum_k \pi_k(x) = 1$ (enforced via a softmax output).

Motivation: standard regression under an MSE loss implicitly assumes

$$
p(y\mid x) = \mathcal{N}(y \mid f(x), \sigma^2)
$$

a single unimodal Gaussian — which collapses (averages over modes) whenever the true conditional is multimodal, e.g. inverse problems where several distinct $y$ are valid for one $x$. Making $\pi_k, \mu_k, \Sigma_k$ functions of $x$ lets the network output an arbitrary conditional mixture instead of one mean.

Training: maximize the conditional log-likelihood directly,

$$
\mathcal{L}(\theta) = \sum_{i=1}^N \log \left( \sum_{k=1}^K \pi_k(x_i) , \mathc\Sigma_k(x_i)) \right)                    $$
  backprrequired, since every mixture parameter isitself $x$. Lineagofconditioning a mixture on context,        generaertsgating ($\pi_k(x)$ as a router) and, once fixed-toorigid for high-dimensional multimodal targetzingflows and diffusion models — which conditn $x$rather than a finite set of Gaussian compon
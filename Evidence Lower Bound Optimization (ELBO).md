Given an intractable target distribution $p(\theta\mid x)$ and a tractable approximating family $q(\theta)$, the ELBO is the quantity:

$$
\mathcal{L}(q) = \mathbb{E}{q(\theta)}\big[\log p(x,\theta)\big] - \mathbb{E}{q(\theta)}\big[\log q(\theta)\big]
$$

It satisfies the exact identity:

$$
\log p(x) = \mathcal{L}(q) + D_{KL}\big(q(\theta),|,p(\theta\mid x)\big)
$$

Since [[Kullback-Leibler (KL) Divergence]] $D_{KL} \geq 0$            ->          $\mathcal{L}(q) \leq \log p(x)$
Which means we can define a lower

Maximizing $\mathcal{L}$ over $q$ is exactly equivalent to minimizing $D_{KL}(q|p(\theta\mid x))$, since the two sum to a constant. This is the general mechanism: swap an uncomputable optimization (fit $q$ to the true posterior directly) for a computable one (maximize $\mathcal{L}$, which only needs the joint $p(x,\theta)$, never the normalizer) that provably has the same solution.


--



$$
\mathcal{L}(q) = \mathbb{E}{q(\theta)}\big[\log p(x,\theta)\big] - \mathbb{E}{q(\theta)}\big[\log q(\theta)\big]
$$

- $\theta$  the unobserved quantity you're trying to infer (a latent variable, or a parameter_
- $x$  the observed data.
- $q(\theta)$  your chosen tractable approximating distribution over $\theta$ (the variational distribution).
- $p(x,\theta)$ — the joint distribution of data and latent, $= p(x\mid\theta)p(\theta)$ = likelihood × prior. Always computable — no normalizing integral needed, since it's a joint, not a posterior.
- $\mathcal{L}(q)$ — the ELBO itself, a single scalar number (given a fixed $q$) that lower-bounds $\log p(x)$.

Term-by-term meaning:
- $\mathbb{E}_{q(\theta)}[\log p(x,\theta)]$ — average, under your current guess $q$, of "how well does this $\theta$ jointly explain the data" — pushes $q$ toward $\theta$ values with high joint probability.
- $\mathbb{E}_{q(\theta)}[\log q(\theta)] = -H(q)$, the negative entropy of $q$ — this term rewards $q$ for being spread out/uncertain rather than collapsing onto a single point. Without it, maximizing just the first term alone would push $q$ to be a point mass at the single best $\theta$ — the entropy term is what makes $\mathcal{L}$ correctly reproduce the KL-divergence trade-off instead of pure mode-seeking.

So $\mathcal{L} =$  "expected joint log-probability" $+$ "entropy of $q$" — maximize both simultaneously: fit well, but stay as uncertain as the evidence allows.
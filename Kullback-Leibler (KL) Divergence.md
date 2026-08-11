$$
D_{KL}(p \,\|\, q) = \mathbb{E}_{x\sim p}\left[\log \frac{p(x)}{q(x)}\right]
$$

- measures how much information is lost approximating $p$ with $q$ — "extra bits" needed if you code samples from $p$ using a code optimal for $q$
- $D_{KL}(p\|q) \geq 0$, equality iff $p = q$ (a.e.) — [[Jensen's Inequality]] on $-\log$
- **not symmetric**: $D_{KL}(p\|q) \neq D_{KL}(q\|p)$ in general
	- mode-seeking vs mass-covering behavior when used as an optimization objective (see [[Variational Inference (VI)]])
- **not a metric** — no triangle inequality, not symmetric
- **can be infinite** if $p$'s support isn't contained in $q$'s support — pathological under mismatched [[Support]], unlike [[Wasserstein]]
- local quadratic expansion is the [[Fisher Information]] metric: $\mathrm{KL}(p_\theta \| p_{\theta+\delta}) = \tfrac12 \delta^\top \mathcal{I}(\theta)\delta + o(\|\delta\|^2)$

**Where it shows up**
- [[Evidence Lower Bound Optimization (ELBO)]] — the gap term between the ELBO and $\log p(x)$
- [[Variational Auto Encoder (VAE)]] — prior-matching term $D_{KL}(q_\phi(z\mid x)\|p(z))$
- [[Variational Inference (VI)]] — the objective being minimized over $q \in \mathcal{Q}$
- symmetrized version: [[Jenson-Shannon Divergence (JSD)]]
- original [[Generative Adversarial Network (GAN)]] objective is closely related to JSD, not KL directly — see JSD note

**Prefer KL when**
- you care about exact likelihood, have matching support, and want the sharper (mode-seeking) approximation behavior
- otherwise consider [[Wasserstein distance]] (geometry-respecting, finite under mismatched support) or JSD (symmetric, bounded)

Adding an entropy term to an objective to encourage a distribution to stay spread out / uncertain, rather than collapsing to a point mass or a narrow mode.

$$
\mathcal{L}(q) = (\text{primary objective}) + \tau \, H(q)
$$

- larger $\tau$ (temperature) $\implies$ flatter, higher-entropy $q$; $\tau \to 0$ recovers the un-regularized (often degenerate) optimum
- without an entropy term, optimizing an expectation over $q$ alone tends to push $q$ toward a point mass at the single best value — entropy regularization is what forces $q$ to stay probabilistic

**Where it shows up**
- the [[Evidence Lower Bound Optimization (ELBO)]]'s $-\mathbb{E}_{q}[\log q(\theta)] = H(q)$ term is exactly this — it's what stops the ELBO from mode-collapsing $q$ onto a point
- [[Langevin Dynamics]] can be framed as gradient flow (in [[Wasserstein]] space) of an energy functional plus an entropy term — the noise term $\sqrt{2\beta^{-1}}dW_t$ is the mechanism that keeps the process from collapsing to the energy minimum
- entropy-regularized RL / max-entropy policies (encourage exploration by rewarding action-distribution entropy, not just expected return)

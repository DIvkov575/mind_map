Approximate training algorithm for [[Boltzmann Machines|energy-based models]] like [[Restricted Boltzmann Machines (RBM)]], sidestepping the intractable partition function.

**Problem**: maximizing likelihood requires the gradient
$$
\nabla_\theta \log p(x) = -\mathbb{E}_{\text{data}}[\nabla_\theta E(x)] + \mathbb{E}_{\text{model}}[\nabla_\theta E(x)]
$$
The second (model) expectation requires sampling from the model's full equilibrium distribution — normally via long-run [[Markov Chain Monte Carlo (MCMC)|MCMC]]/[[Gibbs Sampling]], which is expensive.

**CD's shortcut**: instead of running the Markov chain to equilibrium, initialize it at a real data point and run only a small, fixed number of steps ($k$, often $k=1$ — "CD-$k$"). The resulting biased-but-cheap sample stands in for the model expectation.

- much faster than waiting for full mixing, at the cost of a biased gradient estimate
- works well in practice for RBMs specifically because the chain starts already close to the data distribution
- historically the algorithm that made RBM training practical, enabling their use as an unsupervised feature-learning layer — see [[Representation Learning]]

Connected graph of binary states which excite one another and learn to resemble target distribution in equilibrium.

Energy of Machine State is defined as $E(S) = -\sum_{ij} w_{ij}s_is_j - \sum_{i}a_is_i$ where $s_i$ is state (0/1)
Probabilities defined as $P(S) = e^{-E(s)/T}/Z$ where T is temperature (annealing) and Z is the partition function (intractable sum over all states)

Training:
Positive sampling: "Clamp" observable states to desired output, run [[Gibbs Sampling]] with [[Annealing]] to get some samples
      average samples to calculate $\langle s_is_j\rangle_{data}$ where $\langle s_is_j\rangle_{dat}$ the expected value of $s_is_j$
Negative sampling: "unclamp" observable values and run [[Gibbs Sampling]] with another annealing cycle to get $\langle s_is_j\rangle_{model}$
Update weights according to $\partial \log P(x)/\partial w_{ij} = \langle s_is_j\rangle_{data} - \langle s_is_j\rangle_{model}$

Model data as the equilibrium distribution of a stochastic energy-based network
- Uses [[Hebbian Learning]] rule - updates weights to encourage jointly firing neurons to fire together more often
- [[Sherrington–Kirkpatrick]] with external field
- Stochastic [[Ising Model]] (a type of [[Stochastic Neural Network (SNN)]])

Optimizations:
- [[Restricted Boltzmann Machines (RBM)]] By restricting connections to a [[bipartite graph]] (un/observables on each island), **Block Gibbs Sampling** is possible: all hidden units sample in parallel given the visible units, and vice versa, instead of one unit at a time 
	- We can all sample neurons in a single island all at a time
	- Fast/1-step Forward sample
- [[Contrastive Divergence]] (CD-k)
	- Negative phase still requires gibbs sampling (despite RBM), 
	- Run negative sample in one step; trading bias for a massive speedup; 
	- Persistent CD keeps a running negative-phase chain across updates to reduce that bias
- [[Persistent Contrastive Divergence (PCD)]]
- [[Mean-Field|Mean Field Network]]
	- replace stochastic binary units with their expected activation (a deterministic sigmoid) to get a fast, low-variance stand-in for the positive/negative phase statistics
- [[Deep Belief Networks (DBN)]]
	- Single RBMs are are shallow and limited expressiveness; cannot construct heirarchical/abstract features
	- Stack RBMs; train one RBM on the data and treat its activatinos as "data" for second RBM etc
	- Stacking is a [[Greedy Algorithm]] and not jointly trained; Layers are optimzied independently
- [[Deep Boltzmann Machines (DBM)]]
	- DBNs are trained greedily not jointly which -> allow bipartite connections between all adjacent layers
	- Train jointly using [[Mean-Field Variational Inference]]
	- [[Persistent Contrastive Divergence (PCD)]] for negative phase
	- Issue: still fundamentally reliant on approximate inference and MCMC sampling
	- Slow and unstable training and sensitive to hyperparam
	- 
See [[Boltzmann Machines]]

RBM: bipartite energy-based model, $E(v,h) = -v^\top W h - a^\top v - b^\top h$, giving conditionally independent layers:

$$
p(h_j{=}1\mid v) = \sigma\big(b_j + \textstyle\sum_i W_{ij}v_i\big), \qquad p(v_i{=}1\mid h) = \sigma\big(a_i + \textstyle\sum_j W_{ij}h_j\big)
$$

Creates Optimizations
 - bipartite structure is precisely what makes block [[Gibbs Sampling]] ([[Markov Chain Monte Carlo (MCMC)|mcmc]]) tractable in one parallel step per layer
- [[Contrastive Divergence]] then further approximates the MCMC-based negative-phase term by truncating the chain to $k$ steps starting from real data, rather than running it to equilibrium 


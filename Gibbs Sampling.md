An [[Markov Chain Monte Carlo (MCMC)]] method for sampling from a joint distribution $p(s_1,\dots,s_n)$ that's hard to sample directly, but where each conditional $p(s_i \mid s_{\text{everything else}})$ is easy to sample from. Procedure: cycle through variables one at a time, resampling each from its conditional given the current values of all others:

$$
s_1 \sim p(s_1 \mid s_2,\dots,s_n), \quad s_2 \sim p(s_2\mid s_1,s_3,\dots,s_n), \ \dots \text{(repeat)}
$$

After enough sweeps, the sequence of joint states converges to samples from the true joint $p(s_1,\dots,s_n)$ — this is the Markov chain's stationary distribution. 
It never needs the joint's normalizing constant $Z$; only the conditionals, which for many [[Energy Based Models]] (including [[Boltzmann Machines]]) have simple closed forms (e.g. logistic/sigmoid).



**Boltzmann Example**
In a general (unrestricted) Boltzmann machine: every unit connects to every other unit, so each $s_i$'s conditional depends on all other units — you must update one unit at a time, sequentially, and the chain mixes slowly (many sweeps needed to reach equilibrium). 

In an RBM: because $h$ and $v$ have no intra-layer connections, $p(h\mid v)$ factorizes completely across all hidden units, and $p(v\mid h)$ factorizes completely across all visible units. So instead of updating one unit at a time, you can resample the entire hidden layer in one parallel step (all $h_j$ simultaneously, since they're conditionally independent given $v$), then the entire visible layer in one parallel step. 
This is **Block Gibbs sampling** — same underlying algorithm, but the bipartite structure lets each "block" be a whole layer instead of a single unit, making each sweep far cheaper and better-parallelized.
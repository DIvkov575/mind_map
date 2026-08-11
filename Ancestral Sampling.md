Sampling procedure for any model defined as a chain of conditional distributions
Sample each variable in topological order, conditioning on the ones already sampled
$$
z_1 \sim p(z_1), \quad z_2 \sim p(z_2\mid z_1), \quad z_3 \sim p(z_3 \mid z_1,z_2), \ \dots
$$

Works whenever the generative model is specified as a directed chain (a "story" of how each variable is produced from previous ones)
This is exactly how VAE generation is stated: $z\sim p(z)$, then $x\sim p_\theta(x\mid z)$, two ancestral draws. 



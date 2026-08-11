The family of probability measures $\mathbb{P}^{\xi,\tau}_{a;b}$ characterizing a [[Diffusion process]] with drift coefficients $b^i(x,t)$ and diffusion coefficients $a^{ij}(x,t)$ — named for the pair of coefficients $(a,b)$ that fully specify it.

- the generator is $L_{a;b}f = \sum_i b^i \partial_{x_i} f + \sum_{i,j} a^{ij}\partial_{x_i}\partial_{x_j}f$
- if $a^{ij}(x,t) = \sum_k \sigma^k_i(x,t)\sigma^k_j(x,t)$ for Lipschitz-continuous $\sigma, b$, the $\mathcal{L}_{a;b}$-diffusion can equivalently be constructed as the solution of the SDE $dX_t^i = \sum_k \sigma_k^i(X_t)\,dB_t^k + b^i(X_t)\,dt$
- the corresponding density evolves via the [[Fokker–Planck]] equation, with $b$ playing the role of drift and $a$ (via $\sigma\sigma^\top$) the role of the diffusion tensor

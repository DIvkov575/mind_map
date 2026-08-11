Learn a generator $G(z)$ mapping simple noise $z \sim p_z$ to data by competing against a discriminator $D(x)$ that distinguishes real from fake samples.

Objective (minimax game):
$$\min_G \max_D V(D,G) = \mathbb{E}{x\sim p{data}}[\log D(x)] + \mathbb{E}_{z\sim p_z}[\log(1-D(G(z)))]$$
- $D$ trained to maximize: assign high probability to real, low to fake
- $G$ trained to minimize: fool $D$ into assigning high probability to fakes
- Alternating SGD updates on $D$ then $G$ (not simultaneous/closed-form)
- At the global optimum, $D^*(x) = \frac{p_{data}(x)}{p_{data}(x)+p_g(x)}$ and $G$ recovers $p_g = p_{data}$; $V$ reduces to (twice) the [[Jensen-Shannon Divergence]] between $p_{data}$ and $p_g$, minimized at $-\log 4$

Motivation
- [[Boltzmann Machines]], specifically [[Deep Boltzmann Machines (DBM)]], are slow/hard to train (intractable partition function, MCMC-based learning)
  - GAN sample quality really beats BMs
- Doesn't require an explicit likelihood or a variational lower bound (contrast [[Variational Autoencoder (VAE)]]'s ELBO) - implicit density model, only needs to sample

Shortcomings:
- Instability: alternating minimax optimization can fail to converge / oscillate instead of reaching the [[Nash Equilibrium]]
- Vanishing gradients: if $D$ overpowers $G$ early, $\log(1-D(G(z)))$ saturates and $G$'s gradient vanishes (in practice, train $G$ to maximize $\log D(G(z))$ instead)
- Mode collapse: Generator ignores part of the data distribution, mapping many $z$ to few output modes
- Hard to compute the probability/likelihood of a sample (implicit model, no tractable $p_g(x)$)

Variants:
- [[Wasserstein GAN]] - replace JS divergence with Earth-Mover distance, addresses vanishing gradients and instability
- [[Conditional GAN]] - condition $G$ and $D$ on label/context $y$
- [[DCGAN]] - conv/deconv architecture recipe ([[Batch Norm]], strided convs, no pooling) that made GAN training reliably stable for images
- [[Progressive GAN]] / [[StyleGAN]] - grow resolution progressively; StyleGAN injects noise/style per-layer via [[AdaIN]] for disentangled control
- [[CycleGAN]] - unpaired image-to-image translation via cycle-consistency loss, no matched (x,y) pairs needed
- [[BigGAN]] - scaled up class-conditional GAN, showed GANs benefit heavily from scale (large batch, large model)
- [[Spectral Normalization]] - normalize discriminator weight matrices' spectral norm, a cheaper Lipschitz constraint than gradient penalty

Evolution
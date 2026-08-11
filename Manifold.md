A topological space that locally looks like $\mathbb{R}^n$ — every point has a neighborhood [[Homeomorphism|homeomorphic]] to an open subset of $\mathbb{R}^n$ ($n$ = the manifold's dimension).

- charts + transition maps ([[Smooth]] where they overlap) $\implies$ [[Differentiable Manifolds|smooth/differentiable manifold]]
- globally can be curved/twisted (e.g. a sphere), even though every local patch looks flat
- a [[Smooth Group|smooth Lie group]] is a manifold with smooth composition

**Why it matters for ML**
- real data (images, audio, embeddings) is hypothesized to lie on a low-dimensional manifold embedded in a much higher-dimensional ambient space (the manifold hypothesis)
- density estimation with simple parametric blobs ([[Gaussian Mixture Model (GMM)]]) faces the [[Curse of Dimensionality]] trying to cover a manifold with points — motivates learning an explicit mapping from a simple base distribution instead ([[Variational Auto Encoder (VAE)]], [[Normalizing Flows]])
- optimal-transport metrics like [[Wasserstein distance]] induce their own Riemannian-like structure on the space of distributions over a manifold (Otto calculus)

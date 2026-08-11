Shorthand for [[Wasserstein distance]] / the optimal-transport metric space $(\mathcal{P}(\mathbb{R}^d), W_2)$ — probability distributions viewed as points in a metric space equipped with the $W_2$ (2-Wasserstein) distance.

- gives probability space a **Riemannian-like geometric structure** (Otto calculus) distinct from the [[Kullback-Leibler (KL) Divergence|KL]]/information-geometric structure
- gradient flows in this geometry — steepest descent on a functional $F(p)$ w.r.t. $W_2$ — are exactly PDEs of [[Fokker–Planck]] type
- many diffusion PDEs (heat equation, [[Langevin Dynamics]]'s stationary equation) are gradient flows in Wasserstein space of the entropy or free-energy functional — the geometric reason Langevin sampling "descends" toward the target density

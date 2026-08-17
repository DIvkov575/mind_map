differential geometry applied to probability theory: a parametric family $\{p_\theta : \theta \in \Theta\}$ is treated as a manifold
- points are *distributions*, parameters are coordinates
- [[Fisher Information|Fisher information metric]] makes it [[Riemannian manifolds]]. 
Distances on this manifold measure distinguishability of distributions, not spatial separation.


**Core ideas**
- Statistical Manifold
	- the model $\mathcal{M} = \{p_\theta\}$ as the geometric object
	- reparameterization = change of coordinates, geometry itself is invariant.
- Fisher metric — $g_{ij}(\theta) = \mathbb{E}_\theta\!\left[\partial_i \log p_\theta \, \partial_j \log p_\theta\right]$; Chentsov's theorem makes it *the* canonical geometry on probability, not one choice among many
- [[Kullback-Leibler (KL) Divergence|KL]] as the seed — the local expansion $D_{\mathrm{KL}}(p_\theta \| p_{\theta + d\theta}) = \tfrac{1}{2} g_{ij}\, d\theta^i d\theta^j + O(d\theta^3)$; the metric is what a divergence looks like under a microscope. Related: [[Entropy]], [[Information Theory]]
- dual affine structures — Amari's α-connections; $\alpha = \pm 1$ gives the dual e-connection (exponential) and m-connection (mixture). [[Exponential Family|Exponential families]] are e-flat; mixture families m-flat; dually flat spaces carry a generalized Pythagorean theorem and a canonical [[Bregman Divergence]]
- projections — [[Maximum Likelihood Estimation (MLE)|MLE]] = m-projection of the empirical distribution onto the model; [[Expectation–Maximization (EM)|EM]] = alternating e/m-projections; [[Variational Inference (VI)]] approximation = projection onto a tractable submanifold

**What the geometry buys you**
- the [[Cramér-Rao Bound]] becomes geometric: the variance floor is the inverse metric, and an efficient estimator is distance-preserving (an isometry)
- [[Natural Gradient]] — steepest descent measured in Fisher geometry; reparameterization-invariant preconditioning for optimization (Amari); why "which coordinates?" shouldn't change your learning rate's meaning
- curvature as information — flat directions = unidentifiable parameters; in overparameterized models the Fisher metric degenerates exactly where the model can't distinguish nearby distributions
- metric choice matters — Fisher vs [[Wasserstein distance]] geometry on the same space of distributions changes training dynamics of [[Normalizing Flows]]; see [[Optimal Transport]]
- physics bonus — thermodynamic phase transitions = curvature blowups of the state manifold

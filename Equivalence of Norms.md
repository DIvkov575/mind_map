On a finite-dimensional vector space, all norms are **equivalent**: for any two [[Matrix Norm|matrix norms]] $\|\cdot\|_\alpha$ and $\|\cdot\|_\beta$, there exist constants $r,s>0$ (depending only on the dimension, not on $A$) such that
$$
r\,\|A\|_{\alpha} \leq \|A\|_{\beta} \leq s\,\|A\|_{\alpha} \quad \forall A
$$
i.e. asymptotically $\|x\|_b = \Theta(\|x\|_a)$.

- **why it matters**: convergence, boundedness, and continuity are all defined in terms of a norm — equivalence means none of these notions actually depend on *which* norm you picked, on a finite-dimensional space. "The sequence converges" is norm-independent; "the rate of convergence" is not (the constants $r,s$ can be dimension-dependent and large)
- **fails in infinite dimensions** — this is exactly why choice of norm becomes a real, substantive decision in function spaces like a [[Hilbert Space]] or $L^p$ spaces; different norms there can induce genuinely different topologies
- in practice: the [[Frobenius Norm]] (easy to compute, differentiable) and the spectral/operator norm (harder to compute, but tighter for operator-theoretic bounds) are equivalent up to a factor of $\sqrt{\mathrm{rank}}$ — so it's safe to swap one for the other in an asymptotic argument, but not in a tight numerical bound

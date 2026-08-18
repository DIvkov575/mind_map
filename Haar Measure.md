The (essentially unique) translation-invariant measure on a [[Locally Compact Group|locally compact]] [[Groups|group]]:
$$
\int_G f(gh)\,d\mu(h)=\int_G f(h)\,d\mu(h)\quad\text{for all }g.
$$
It is what "uniform over the group" means, generalizing [[Lebesgue Measure]] from $\mathbb R^n$ to a group.

**Why it matters for symmetry in ML**
Haar lets you *average over the group* to force invariance/[[Equivariance]]:
$$
\bar f(x)=\int_G \rho_{out}(g)^{-1} f(\rho_{in}(g)x)\,d\mu(g).
$$

- **Compact groups** (e.g. $SO(n)$): total volume is finite, so you can normalize $\mu$ to a probability measure and actually average. This underlies [[Peter–Weyl Theorem|Peter–Weyl]].
- **Non-compact groups** (Lorentz, affine, $SL_n(\mathbb R)$): Haar has *infinite* volume, so the average diverges — you **cannot** build invariants this way.

That failure is a central reason to drop to the [[Lie Algebra|algebra]]: infinitesimal ([[Equivariance|generator]]) constraints need no integration over $G$, so they survive the non-compact case where Haar does not.

See [[Lie Groups]], [[Homogeneous Space]], [[Group Averaging]].

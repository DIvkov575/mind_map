A [[Groups|group]] that is also a locally compact [[Topological Space]] and whose multiplication and inversion are continuous (a *topological group*). "Locally compact" means every point has a neighbourhood with compact closure; equivalently the identity has one compact neighbourhood.


**So when wouldn't it be locally compact...**
F. Riesz's theorem
A [[Hausdorff Space]] over $\mathbb{R}$ or $\mathbb{C}$ is locally compact if and only if its finite-dimensional (homeomorphic to $\mathbb{R}^n$ which is locally compact)

**Why this class is singled out**

It is exactly the setting in which a [[Haar Measure]] exists: a nonzero, translation-invariant measure, unique up to a positive scalar (Haar/Weil). Haar is the one ingredient every group-averaging method needs, so local compactness is the foundation under the whole [[Group Averaging|group-based]] approach to symmetry.

**Landscape, by how much Haar you get**

- discrete / finite groups: trivially locally compact; Haar is counting measure; averaging is a finite sum
- compact groups ($SO(n)$, $U(n)$): locally compact *and* finite total volume, so Haar normalizes to a probability measure — you can actually average (see [[Peter–Weyl Theorem]])
- non-compact but locally compact ($(\mathbb R,+)$, Lorentz, $SL_n(\mathbb R)$): Haar exists but has infinite volume, so uniform averaging diverges
- not locally compact (diffeomorphism groups, gauge/loop groups, the unitary group of an infinite-dimensional space): no Haar at all

**Unimodularity**

Left- and right-invariant Haar can differ; when they coincide the group is *unimodular*. Compact, abelian, and semisimple groups are all unimodular, which is why rotation groups are so well behaved. See [[Lie Groups]], [[Hausdorff Space]].

The first of the two group-based routes to [[Equivariance]]: enforce symmetry by *averaging over the group* with [[Haar Measure]], rather than by constraining the architecture (the steerable/irrep route — see [[Clebsch–Gordan Coefficients]], [[Wigner-D matrices]]).

**Symmetrization (Reynolds operator)**

Take any ordinary map $f_0$ and average its outputs over all transformations of the input, undoing the transformation on the output side:
$$
\bar f(x)=\int_G \rho_{out}(g)^{-1}\,f_0(\rho_{in}(g)x)\,d\mu(g).
$$
Because $\mu$ is translation-invariant, $\bar f$ is exactly [[Equivariance|equivariant]], and the operator $f_0\mapsto\bar f$ is a projection onto the equivariant functions. For pure invariance drop the $\rho_{out}^{-1}$.

**Generalizations**

- Group convolution: $(f\star k)(g)=\int_G f(h)\,k(h^{-1}g)\,d\mu(h)$ is equivariant by construction. Ordinary CNNs are this for the translation group; G-CNNs (Cohen–Welling) extend it to larger groups.
- Data augmentation is the Monte-Carlo estimate of the averaging integral — sampling group elements instead of integrating them.

**What it needs, and why non-compact breaks it**

- A computable, *normalizable* Haar integral, i.e. finite volume — so a compact (or at least finite-volume) [[Locally Compact Group|group]].
- On a non-compact group the [[Haar Measure]] has infinite volume, so the average diverges: the method has nothing to integrate against. This is the concrete failure that pushes you to the infinitesimal ([[Lie Algebra|algebra]]) constraint instead.

**Cost**

Equivariance is only as exact as the integral estimate; sampling variance and compute grow with the number of group samples. Contrast the steerable route, which is exact but needs tabulated irreps and [[Clebsch–Gordan Coefficients]]. See [[Geometric ML]].

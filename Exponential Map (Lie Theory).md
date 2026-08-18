The map $\exp:\mathfrak g\to G$ that turns an infinitesimal generator (an element of the [[Lie Algebra]]) into an actual [[Lie Groups|group]] element. For matrix groups it is the matrix exponential
$$
\exp(X)=\sum_{k\ge 0}\frac{X^k}{k!},
$$
and it is the time-1 flow of the [[One-parameter group]] $t\mapsto\exp(tX)$.

**The bridge that the whole "algebra vs group" story rests on**

- It intertwines algebra and group representations: locally $\rho(\exp X)=\exp\big(d\rho(X)\big)$ (see [[Lie Algebra]], [[Representation Theory]]).
- Integrating the generator recovers the finite transformation, so an *infinitesimal* ([[Equivariance|generator]]) constraint on the connected component implies the full group symmetry — you enforce $\dim\mathfrak g$ linear conditions instead of averaging with [[Haar Measure]].

**Caveats**

- Not always surjective (e.g. $SL_2(\mathbb R)$), and it only reaches the **connected** component — it is blind to reflections/parity, which must be added separately.
- $\exp$ and $\log$ near the identity make $\mathfrak g$ a flat chart on $G$ (basis of [[Baker–Campbell–Hausdorff]] and of optimizing over groups in the [[Tangent Space]]).

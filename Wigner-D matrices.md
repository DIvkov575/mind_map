The explicit [[Irreducable Representation (irrep)|irrep]] matrices of $SO(3)$ / $SU(2)$, one block $D^{(j)}$ per spin $j$:
$$
D^{(j)}_{m'm}(R)=\langle j\,m' \mid \rho_j(R)\mid j\,m\rangle,
$$
functions of the rotation (Euler angles). Rows/columns are indexed by [[Weight (Representation Theory)|weights]] $m=-j,\dots,j$.

**Facts**

- $SO(3)$'s irreps *are* the $D^{(j)}$ — this is what [[Irreducable Representation (irrep)]] points to.
- Products decompose by [[Clebsch–Gordan Coefficients]]: $D^{(j_1)}\otimes D^{(j_2)}=\bigoplus_{J} D^{(J)}$.
- Obtained from the [[Lie Algebra]] generators via the [[Exponential Map (Lie Theory)|exponential map]], $D^{(j)}(R)=\exp\!\big(\sum_k \theta_k\, d\rho_j(L_k)\big)$.

**Contrast**

They exist in clean closed form only for nice (compact) groups — the reason SO(3)-equivariant nets (e3nn, Tensor Field Networks) lean on them, and the reason non-compact groups force you back to the generators instead. See [[Equivariance]], [[(SO_n) Simple Orthogonal Lie Algebra]].

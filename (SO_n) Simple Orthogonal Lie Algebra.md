The orthogonal Lie algebra $\mathfrak{so}(n)$ is the [[Lie Algebra]] of the rotation group $SO(n)$. It is the [[Tangent Space]] at the identity of $SO(n)$, obtained by differentiating the orthogonality constraint.

**Definition**

$SO(n)$ consists of real matrices with $R^\top R=I$ and $\det R=1$. Differentiate a curve $R(t)$ with $R(0)=I$ at $t=0$:
$$
\frac{d}{dt}\big(R^\top R\big)\Big|_0
=X^\top+X=0.
$$
So the algebra is the space of **skew-symmetric** matrices,
$$
\mathfrak{so}(n)=\{X\in\mathbb R^{n\times n}: X^\top=-X\},
$$
with the [[Lie Bracket]] given by the matrix commutator $[X,Y]=XY-YX$. (The $\det=1$ condition costs nothing infinitesimally, since $\det e^{tX}=e^{t\operatorname{tr}X}$ and skew matrices are traceless.)

**Dimension**

A skew matrix is fixed by its strictly-upper-triangular entries, so
$$
\dim\mathfrak{so}(n)=\binom{n}{2}=\frac{n(n-1)}{2}.
$$

**Low-dimensional cases**

- $\mathfrak{so}(2)$ is one-dimensional and abelian — the generator $\left(\begin{smallmatrix}0&-1\\1&0\end{smallmatrix}\right)$ exponentiates to planar rotations.
- $\mathfrak{so}(3)$ has basis $L_1,L_2,L_3$ with $[L_i,L_j]=\varepsilon_{ijk}L_k$; this is the angular-momentum algebra, and $\mathfrak{so}(3)\cong\mathfrak{su}(2)$.

**Simplicity**

$\mathfrak{so}(n)$ is a [[Simple Group|simple]] Lie algebra for $n=3$ and $n\ge 5$. The exceptions are honest:

- $n=2$: abelian, hence not simple;
- $n=4$: $\mathfrak{so}(4)\cong\mathfrak{so}(3)\oplus\mathfrak{so}(3)$ is *semisimple*, not simple.

In the Cartan classification the simple ones form two families: $\mathfrak{so}(2l+1)$ is type $B_l$ and $\mathfrak{so}(2l)$ is type $D_l$.

**Defining data**

$\mathfrak{so}(n)$ is the infinitesimal symmetry of a symmetric, positive-definite [[Bilinear Form]] (the Euclidean inner product): $X$ lies in $\mathfrak{so}(n)$ iff $\langle Xu,v\rangle+\langle u,Xv\rangle=0$ for all $u,v$. Replacing the form by an indefinite one gives $\mathfrak{so}(p,q)$. Compare the alternating case, the [[(SP_n) Simple Symplectic Lie Algebra|symplectic algebra]].

Rotation frames such as the per-residue $SO(3)$ frames in protein structure models integrate elements of $\mathfrak{so}(3)$ via the [[Lie Groups|exponential map]]. See [[Groups]] and [[Linear Group GL(n)]].

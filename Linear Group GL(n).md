The general linear group $GL_n(F)$ is the [[Groups|group]] of all invertible $n\times n$ matrices over a field $F$, with matrix multiplication as the operation:
$$
GL_n(F)=\{A\in F^{n\times n}:\det A\ne 0\}.
$$
Equivalently it is the group of invertible linear maps $F^n\to F^n$. It is the universal ambient group for linear representations: every finite group embeds in some $GL_n$ via its regular representation, and every matrix / [[Groups|linear group]] ($SL_n$, $O(n)$, $SO(n)$, $U(n)$, $Sp(2n)$) is a subgroup cut out by extra constraints.

**As a Lie group**

Over $\mathbb R$ or $\mathbb C$, $GL_n$ is an open subset of $F^{n\times n}$ (the complement of the hypersurface $\det=0$), so it is a [[Lie Groups|Lie group]] of dimension
$$
\dim GL_n(\mathbb R)=n^2.
$$
Its [[Lie Algebra]] is the *whole* matrix space,
$$
\mathfrak{gl}_n(F)=F^{n\times n},\qquad [X,Y]=XY-YX,
$$
because no constraint restricts the tangent space at the identity — differentiating $\det\ne0$ imposes nothing. The exponential map $\exp:\mathfrak{gl}_n\to GL_n$ is the matrix exponential.

**Components and subgroups**

- $\det:GL_n(\mathbb R)\to\mathbb R^\times$ is a continuous group homomorphism, so $GL_n(\mathbb R)$ has **two connected components** ($\det>0$ and $\det<0$); $GL_n(\mathbb C)$ is connected.
- Its kernel is the special linear group $SL_n(F)=\{\det=1\}$, a normal subgroup with Lie algebra $\mathfrak{sl}_n=\{\operatorname{tr}X=0\}$.
- $O(n)$, $U(n)$, $Sp(2n)$ are the subgroups preserving a symmetric, Hermitian, or alternating [[Bilinear Form]] respectively.

See [[Groups]], [[(SO_n) Simple Orthogonal Lie Algebra|so(n)]], and [[(SP_n) Simple Symplectic Lie Algebra|sp(2l)]].

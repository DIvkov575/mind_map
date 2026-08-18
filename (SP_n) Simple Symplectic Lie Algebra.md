The symplectic Lie algebra $\mathfrak{sp}(2l)$ is the [[Lie Algebra]] of the symplectic group $Sp(2l)$: the infinitesimal linear transformations that preserve a fixed non-degenerate alternating [[Bilinear Form]].

**Setup**

The ambient dimension must be even, $n=2l$, because a [[Non-degenerate (form)|non-degenerate]] [[Alternating (form)|alternating]] form exists only in even dimension. Fix the standard symplectic form with matrix
$$
J=\begin{pmatrix}0&I_l\\-I_l&0\end{pmatrix},
\qquad J^\top=-J,\quad J^2=-I.
$$

**Definition**

$Sp(2l)$ consists of matrices with $M^\top J M=J$. Differentiating a curve through the identity gives the algebra
$$
\mathfrak{sp}(2l)=\{X\in\mathbb R^{2l\times 2l}: X^\top J+JX=0\},
$$
with the [[Lie Bracket]] the matrix commutator $[X,Y]=XY-YX$. Equivalently $JX$ is symmetric: $X$ generates flows that keep the alternating form invariant, just as $\mathfrak{so}(n)$ keeps a *symmetric* form invariant.

In block form $X=\left(\begin{smallmatrix}A&B\\C&-A^\top\end{smallmatrix}\right)$ with $B=B^\top$ and $C=C^\top$: an arbitrary block $A$, plus two symmetric blocks.

**Dimension**

Counting $A$ ($l^2$) and the two symmetric $l\times l$ blocks ($2\cdot\frac{l(l+1)}2$):
$$
\dim\mathfrak{sp}(2l)=l^2+l(l+1)=l(2l+1).
$$

**Simplicity**

$\mathfrak{sp}(2l)$ is a [[Simple Group|simple]] Lie algebra for every $l\ge 1$; it is the Cartan type $C_l$. The smallest case coincides with a familiar algebra,
$$
\mathfrak{sp}(2)=\mathfrak{sl}(2,\mathbb R),
$$
since a traceless $2\times2$ matrix automatically satisfies $X^\top J+JX=0$.

See [[Groups]], [[Linear Group GL(n)]], and the symmetric-form counterpart [[(SO_n) Simple Orthogonal Lie Algebra|so(n)]].

The orientation-preserving affine group of the line consists of transformations
$$
x\mapsto \sigma x+\mu,\qquad \mu\in\mathbb R,\ \sigma>0.
$$
It is a [[Lie Groups|Lie group]] under composition:
$$
(\mu,\sigma)(\mu',\sigma')
=(\mu+\sigma\mu',\,\sigma\sigma').
$$
It can be represented by matrices
$$
(\mu,\sigma)\longleftrightarrow
\begin{pmatrix}\sigma&\mu\\0&1\end{pmatrix}.
$$

Its [[Lie Algebra]] has a dilation generator $D$ and translation generator $T$:
$$
D=\begin{pmatrix}1&0\\0&0\end{pmatrix},
\qquad
T=\begin{pmatrix}0&1\\0&0\end{pmatrix},
\qquad
[D,T]=T.
$$
Conjugating a translation by a scale transformation rescales it:
$$
e^{sD}e^{tT}e^{-sD}=e^{e^s tT}.
$$
Thus scale and translation do not commute, but their failure to commute remains a translation. This makes $\operatorname{span}\{T\}$ an [[Ideal (Lie Algebra)|ideal]] and gives the semidirect-product structure
$$
\mathrm{Aff}^+(1)\cong\mathbb R\rtimes\mathbb R_{>0}.
$$

On group coordinates $(\mu,\sigma)$, the corresponding left-invariant vector fields are
$$
T=\sigma\partial_\mu,\qquad D=\sigma\partial_\sigma.
$$
Acting on a standard [[Gaussian]] by this group produces every univariate Gaussian, making the group the symmetry model used in the worked example in [[Information Geometry]].

A Lie algebra over a field $F$ is a vector space $\mathfrak g$ equipped with a bilinear operation
$$
[-,-]:\mathfrak g\times\mathfrak g\to\mathfrak g
$$
such that
$$
[X,Y]=-[Y,X]
$$
and the [[Jacobi Identity]] holds:
$$
[X,[Y,Z]]+[Y,[Z,X]]+[Z,[X,Y]]=0.
$$
The operation is the [[Lie Bracket]].

**Intuition**

A Lie algebra is the infinitesimal form of a [[Lie Groups|Lie group]]. Its vectors are generators of continuous transformations, and its bracket records the leading-order effect of changing the order of two transformations.

- matrix Lie algebras use $[X,Y]=XY-YX$
- vector fields use $[X,Y](f)=X(Yf)-Y(Xf)$
- an abelian Lie algebra has $[X,Y]=0$ for every pair

**Subalgebras, ideals, and quotients**

A [[Subalgebra]] is a vector subspace closed under bracketing with itself. An [[Ideal (Lie Algebra)|ideal]] $I$ satisfies the stronger condition
$$
[\mathfrak g,I]\subseteq I.
$$
This stability is what makes the [[Quotient (Factor) Algebra]] $\mathfrak g/I$ well-defined.

The center
$$
Z(\mathfrak g)
=\{X\in\mathfrak g:[X,Y]=0\ \text{for every }Y\in\mathfrak g\}
$$
is always an ideal.

**Adjoint representation**

Each $X\in\mathfrak g$ defines a linear map
$$
\operatorname{ad}_X(Y)=[X,Y].
$$
The Jacobi identity is equivalent to
$$
[\operatorname{ad}_X,\operatorname{ad}_Y]
=\operatorname{ad}_{[X,Y]},
$$
so $\operatorname{ad}:\mathfrak g\to\mathfrak{gl}(\mathfrak g)$ is a Lie-algebra representation. Its kernel is $Z(\mathfrak g)$.

**Structure constants**

Given a basis $(X_1,\ldots,X_n)$, the bracket is determined by coefficients $c_{ij}^{\,k}$:
$$
[X_i,X_j]=\sum_k c_{ij}^{\,k}X_k.
$$
Antisymmetry and Jacobi become algebraic constraints on these constants.

More generally, a representation on a vector space $V$ is a linear map
$$
d\rho:\mathfrak g\to\mathfrak{gl}(V)
$$
that preserves brackets. When it comes from a group representation $\rho$, locally
$$
\rho(\exp X)=\exp(d\rho(X)).
$$
See [[Representation Theory]].

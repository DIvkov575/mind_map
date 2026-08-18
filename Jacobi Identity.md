The Jacobi identity is the consistency law for nested [[Lie Bracket|Lie brackets]]:
$$
[X,[Y,Z]]+[Y,[Z,X]]+[Z,[X,Y]]=0.
$$
Together with bilinearity and antisymmetry, it makes a bracket into a [[Lie Algebra]] bracket.

Its most useful rearrangement is
$$
[X,[Y,Z]]
=[[X,Y],Z]+[Y,[X,Z]].
$$
This says that $\operatorname{ad}_X=[X,-]$ acts as a derivation: applying $X$ to the interaction between $Y$ and $Z$ is the same as applying it to each input separately.

Equivalently,
$$
[\operatorname{ad}_X,\operatorname{ad}_Y]
=\operatorname{ad}_{[X,Y]}.
$$
Therefore infinitesimal transformations act on their own algebra consistently. For Lie algebras obtained from groups, Jacobi is the infinitesimal consequence of associativity of group composition.

**How it is used**

- reject proposed commutation relations that cannot define a Lie algebra
- replace one difficult nested bracket with two computable ones
- constrain structure constants when classifying Lie algebras
- keep bracket-generated directions consistent in symmetry and control calculations
- prove that the adjoint map is a representation

In the two-dimensional [[Affine Group|affine algebra]] with $[D,T]=T$, Jacobi imposes no interesting new restriction; in two dimensions it is automatic for an antisymmetric bracket. Its force appears when three or more independent generators interact.

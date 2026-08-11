











### Leveraging Representation Theory
[[Representation Theory]],[[Lie Groups]],[[Lie Algebra]]
Lie Algebra > Groups ... idk if htis is hte claim


Instead of verifying $f(\rho(g)x) = \rho(g)f(x)$ for all $g \in G$, it suffices to check the infinitesimal version for each generator $X$: $\nabla f(x) \cdot d\rho(X) x = d\rho(X) f(x)$. 

This is how LieConv (Finzi, Welling, Wilson, 2020) and LieTransformer (Hutchinson et al., 2021) build equivariant layers for arbitrary Lie groups: they don't need a closed-form global group action, they lift points into the algebra via the log map, enforce the bracket-linear constraint there, and exponentiate back. The algebra is where the constraint is actually linear algebra.
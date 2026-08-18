Smooth composition is the requirement that a [[Groups|group]]'s operations be $C^\infty$ ([[Smooth]]) maps when the group also carries a [[Smooth Manifold]] structure. It is the compatibility clause that turns a group-and-a-manifold into a [[Smooth Group|smooth]] / [[Lie Groups|Lie group]].

Concretely, both
$$
m:G\times G\to G,\quad (g,h)\mapsto gh,
\qquad
\iota:G\to G,\quad g\mapsto g^{-1}
$$
must be smooth (with $G\times G$ given the product-manifold structure). A compact equivalent: the map $(g,h)\mapsto gh^{-1}$ is smooth.

- smoothness of $m$ makes each left translation $L_g(h)=gh$ a [[Diffeomorphisms|diffeomorphism]];
- $(dL_g)_e$ then transports $T_eG$ across the group, producing the left-invariant vector fields whose bracket defines the [[Lie Algebra]];
- without it, "the group" and "the manifold" would be unrelated and no exponential map or [[Lie Bracket]] would exist.

For matrix groups the operations are polynomial (multiplication) and rational (inversion, by Cramer's rule) in the entries, hence automatically smooth, so any matrix group that is a manifold is a smooth group.

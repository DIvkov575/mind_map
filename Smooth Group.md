A smooth group is a [[Groups|group]] that is also a [[Smooth Manifold]], such that the group operations are smooth. It is the same object as a [[Lie Groups|Lie group]] — "smooth group" emphasizes the *group-object-in-manifolds* viewpoint.

**Definition**

$G$ is a smooth group if it carries a smooth-manifold structure for which the multiplication and inversion maps are $C^\infty$ ([[Smooth Composition]]):
$$
m:G\times G\to G,\ (g,h)\mapsto gh,
\qquad
\iota:G\to G,\ g\mapsto g^{-1}.
$$
Equivalently, the single map $(g,h)\mapsto gh^{-1}$ is smooth. Smoothness of both maps is what lets the algebraic structure interact with calculus: it makes left translation $L_g$ a [[Diffeomorphisms|diffeomorphism]], which spreads a tangent vector at $e$ to a left-invariant vector field and induces the [[Lie Algebra]] on $\mathfrak g=T_eG$.

**Why the smoothness clause matters**

- A group that is merely a manifold, with no compatibility between the two structures, gives no link between composition and differentiation.
- With smooth operations, one-parameter subgroups $t\mapsto\exp(tX)$ are smooth curves and the exponential map is defined.

eg. every [[Lie Groups|Lie group]] — $GL_n(\mathbb R)$, $SO(n)$, $\mathrm{Aff}^+(1)$ — is a smooth group; a finite or discrete group is a smooth group over the $0$-dimensional manifold of isolated points.

Generators that step between [[Weight (Representation Theory)|weight]] spaces of a representation. For each root $\alpha$ (see [[Root System]]) there is a raising operator $E_\alpha$ and lowering operator $F_\alpha$ satisfying
$$
[H,E_\alpha]=\alpha(H)\,E_\alpha,\qquad [H,F_\alpha]=-\alpha(H)\,F_\alpha
$$
for $H$ in the [[Cartan Subalgebra]]: $E_\alpha$ shifts a weight by $+\alpha$, $F_\alpha$ by $-\alpha$.

For $\mathfrak{su}(2)$ these are the familiar $J_\pm=J_x\pm iJ_y$.

**Why they are the workhorse**

- Starting from the highest-weight vector and applying $F_\alpha$ repeatedly *generates the entire* [[Irreducable Representation (irrep)|irrep]].
- They *compute* [[Clebsch–Gordan Coefficients]]: couple two irreps by acting with ladder operators on the product's highest-weight vector.

So the whole "combine irreps equivariantly" machinery ([[Equivariance]]) is built from ladder operators — a purely [[Lie Algebra|algebra]]-level object, no group elements required.

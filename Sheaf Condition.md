The **sheaf condition** is a precise way to formalize when a [[presheaf]] “glues local data into global data consistently.”

A **presheaf** F on a [[topological space]] X (or more generally a [[Site (topology)]]) assigns:
- To each open set $U \subseteq X$, a set (or [[Groups|group]], [[Ring|ring]], etc.) F(U)
- To each inclusion V⊆U, a **restriction map** $\rho^U_V : F(U) \to F(V)$
A presheaf only guarantees that these [[restriction maps]] are compatible with composition:
$\rho^V_W \circ \rho^U_V = \rho^U_W$
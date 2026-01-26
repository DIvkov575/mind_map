Universal Approximation Theorems (UATs) for sigmoidal networks, which say:
?? necessarily sigmoid - any nonlinear [[Activation Function]]?
- A sufficiently large network with a sigmoidal activation can approximate any continuous function on a compact set.
- do not specify how many neurons are needed,
- do not relate sigmoid parameters (Ax + b learned) to optimal width/depth,
- do not give complexity–accuracy tradeoffs tied to the activation’s parameterization.





UAT ([[RKHS theory (Reproducing Kernel Hilbert Spaces) |RKHS]])
A <u>hypothesis class F</u> is universal if it is dense in a target function space (typically C(K)for compact K): $\overline{\mathcal F} = C(K)$
Meaning: for any continuous f and $\varepsilon>0$, there exists $g \in \mathcal F$ with
$\|f-g\|_\infty < \varepsilon$

A <u>kernel</u> k is **universal** if its RKHS is dense in C(K)
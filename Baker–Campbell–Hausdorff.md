The Baker–Campbell–Hausdorff (BCH) formula expresses the product of two exponentials of [[Lie Algebra]] elements as a single exponential whose exponent is a series of iterated [[Lie Bracket|brackets]]. It is the exact statement of how a [[Lie Groups|Lie group]]'s multiplication is encoded by its Lie algebra near the identity.

**The series**

For $X,Y\in\mathfrak g$ small enough (so both logs converge),
$$
\log\!\big(e^{X}e^{Y}\big)
=X+Y
+\tfrac12[X,Y]
+\tfrac1{12}\big([X,[X,Y]]+[Y,[Y,X]]\big)
-\tfrac1{24}\,[Y,[X,[X,Y]]]
+\cdots
$$
Only $X+Y$ is linear; **every higher term is a bracket**. So the bracket — the [[Lie Bracket|infinitesimal noncommutativity]] — is exactly the data needed to rebuild the group product. Group associativity forces these terms to be nested brackets (the content of the theorem), which is why the [[Jacobi Identity]] appears.

**Approximations**

Truncating the series gives the practical forms, accurate for small generators:
$$
e^{X}e^{Y}\approx\exp\!\big(X+Y+\tfrac12[X,Y]\big),
$$
$$
e^{X}e^{Y}\approx\exp\!\big(X+Y\big)\quad\text{to first order.}
$$

Special cases:

- **Commuting generators.** If $[X,Y]=0$ the series stops at $X+Y$, so $e^Xe^Y=e^{X+Y}$ — the abelian case.
- **Nilpotent / low-order.** If enough nested brackets vanish (e.g. $[X,[X,Y]]=0$), BCH is a finite exact expression, not just an approximation. For the [[Affine Group|affine algebra]] with $[D,T]=T$ the series is computable in closed form.

**Where it is used**

- proving the algebra determines the group locally — the [[Lie Groups|geometric group ↔ algebra connection]];
- estimating operator-splitting error, since $e^{\varepsilon X}e^{\varepsilon Y}\ne e^{\varepsilon(X+Y)}$ by $\tfrac{\varepsilon^2}2[X,Y]+O(\varepsilon^3)$ ([[Lie Bracket]]);
- symmetric splitting (Strang) cancels the $O(\varepsilon^2)$ term:
$$
e^{\frac\varepsilon2 X}e^{\varepsilon Y}e^{\frac\varepsilon2 X}
=\exp\!\big(\varepsilon(X+Y)+O(\varepsilon^3)\big);
$$
- composing near-identity transformations in control and in [[Information Geometry]].

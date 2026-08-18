An ideal is a vector subspace $I$ of a [[Lie Algebra]] $\mathfrak g$ that is stable under bracketing with every element of the full algebra:
$$
[\mathfrak g,I]\subseteq I.
$$

This is stronger than being a [[Subalgebra]], which only requires $[I,I]\subseteq I$. An ideal is a whole subspace; an individual generator is not itself an ideal.

**Why it matters**

- it identifies a subsystem that all other infinitesimal symmetries preserve
- under standard connectedness assumptions, it exponentiates to a normal Lie subgroup
- it makes the [[Quotient (Factor) Algebra]] $\mathfrak g/I$ well-defined
- it lets a problem be reduced modulo transformations that are irrelevant to the question

For the [[Affine Group|affine Lie algebra]]
$$
\mathfrak g=\operatorname{span}\{D,T\},
\qquad [D,T]=T,
$$
the translation line $\mathfrak t=\operatorname{span}\{T\}$ is an ideal. The quotient $\mathfrak g/\mathfrak t$ retains only the scaling direction $D$. In [[Information Geometry]], this corresponds to reducing a Gaussian location-scale family modulo changes of location when the task is translation-invariant.

A function $f$ is equivariant to a [[Groups|group]] $G$ if applying a symmetry to the input and then applying $f$ gives the same result as applying $f$ first and then applying the (correspondingly transformed) symmetry to the output:
$$f(\rho_{in}(g) \cdot x) = \rho_{out}(g) \cdot f(x)$$


Rotate a molecule, then compute forces → same as computing forces, then rotating them. This is stronger than [[Invariance]] ($f(gx) = f(x)$, output doesn't change at all) — equivariance says the output changes in lockstep with the input, in a predictable, group-consistent way.

Building a network out of layers that only combine irreps via CG products guarantees the whole network is equivariant, because you never break the "correct transformation behavior" partway through.

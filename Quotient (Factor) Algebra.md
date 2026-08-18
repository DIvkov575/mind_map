The [[Lie Algebra]] analogue of a quotient group or quotient vector space: given an [[Ideal (Lie Algebra)|ideal]] $I \subseteq L$,
$$
L/I = \{x + I : x \in L\}
$$
where $x + I$ is the coset $\{x + i : i \in I\}$.

- well-defined only because $I$ is an **ideal**, not just any subspace — $[x,y] \in I$ for all $x \in L, y \in I$ is exactly what makes the bracket on $L$ descend to a well-defined bracket on cosets: $[x+I, y+I] := [x,y] + I$
- the center $Z(L)$ is itself always an ideal (it's the special case $[x,y]=0$), so $L/Z(L)$ is always a well-defined quotient — its own algebra, capturing everything about $L$ modulo the part that commutes with everything
- the kernel of the adjoint homomorphism $\mathrm{ad}: L \to \mathfrak{gl}(L)$ is exactly $Z(L)$, so $L/Z(L)$ embeds faithfully into $\mathfrak{gl}(L)$ via the induced map — the Lie-algebra analogue of the first isomorphism theorem

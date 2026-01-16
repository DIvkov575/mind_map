
Let $\mathcal{C}$ be a category. A Grothendieck topology $J$ on $\mathcal{C}$ assigns to each object $U \in \mathcal{C}$ a collection of covering families}
$\{ U_i \to U \}_{i \in I}$
satisfying:
- [[isomorphism]]: Any isomorphism $V \xrightarrow{\sim} U$ is a cover.
- Stability under pullback: If $\{ U_i \to U \}$ is a cover and $V \to U$ is any morphism, then $\{ U_i \times_U V \to V \}$ is a cover.
- transitivity If $\{ U_i \to U \}$ is a cover and $\{ V_{ij} \to U_i \}$ are covers for each $i$, then the composed family $\{ V_{ij} \to U \}$ is a cover.

- In a topological space $X$, taking $\mathcal{C} = \mathcal{O}(X)$ (open sets) and usual open covers recovers the standard notion of a topology.  
- Grothendieck topologies allow defining \emph{sheaves on categories} more general than topological spaces.


Sheaf on a Site
A [[presheaf]] $F: \mathcal{C}^{\mathrm{op}} \to \mathbf{Set}$ is a \emph{sheaf} if for every object $U \in \mathcal{C}$ and every covering $\{U_i \to U\}$, the sequence
$$
0 \longrightarrow F(U) \longrightarrow \prod_i F(U_i) \rightrightarrows \prod_{i,j} F(U_i \times_U U_j)
$$
is exact.

(Combinatorics)

<u>Def</u>: A (northeast) <u>lattice path</u> is a sequence of steps from $S = \{ (0,1), (1,0)\}$ or S = {N, E}
Visualized as a path in $\mathbb{N}^2$ - Imaging moving NE in a discrete grid eg "NENNENEEEENN"

<u>Counting Paths</u>
Within a finite lxm grid, the number of lattice paths can eb modelled with [[Multinomial Coefficients]] or [[Ordered Set Partition]]. 
Let $n_1 = l$ North steps and $n_2 = m$ East steps.
Therefore our full path can be thought of as a reordering of $n_1$ North steps and $n_2$ East steps.
$${{n_1 + n_2}\choose{n_1,n_2}} = \frac{(l+m)!}{l! m!}$$


Alternatively, this can be solved recursively with [[Dynamic Programming]]
Let $DP \in \mathbb{N}^{l\times m}$ such that  DP(i,j) is the number of paths to that point within the lattice
particularly DP(i,j) = DP(i-1, j) + DP(i, j-1)
`this prob shows in sig? i think`







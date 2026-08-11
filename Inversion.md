An inversion of a [[permutations|permutation]] $\sigma \in S_n$ is a pair $(i,j)$ with $i < j$ but $\sigma(i) > \sigma(j)$ — a spot where $\sigma$ puts a larger value before a smaller one, out of the natural order.

$$
\mathrm{Inv}(\sigma) = \{(i,j) : i<j,\ \sigma(i)>\sigma(j)\}, \qquad \mathrm{inv}(\sigma) = |\mathrm{Inv}(\sigma)|
$$

- $\mathrm{inv}(\sigma) = 0$ iff $\sigma$ is the identity permutation; the maximum, $\binom{n}{2}$, is achieved by the fully-reversed permutation
- the [[Lehmer code]] $L(\sigma)_i = \#\{j>i : \sigma_j < \sigma_i\}$ is literally counting, for each position, how many inversions start there — so $\mathrm{inv}(\sigma) = \sum_i L(\sigma)_i$
- $\mathrm{inv}$ is the canonical [[Permutation Statistic]] — most others (e.g. the number of adjacent inversions, or the major index) are variations tracking essentially the same "how far from sorted" idea
- sign of $\sigma$ is $(-1)^{\mathrm{inv}(\sigma)}$ — connects inversion count directly to the parity/sign homomorphism $S_n \to \{\pm1\}$

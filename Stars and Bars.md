<u>Thm</u> The number of [[Compositions (Combinatorics) | weak compositions]] of n with j parts = $\binom{n + j -1}{j-1}$
eg `**|*` - j partitions, so j-1 bars, and n+j-1 elements (n stars and j-1 bars) being re-ordered.
$(a_1, \ldots, a_j) \mapsto ...$



<u>Weak composition</u> of n into k parts:
$x_1 + x_2 + \cdots + x_k = n, \quad x_i \ge 0$
Count
$\binom{n + k - 1}{k - 1}$

<u>Strong composition</u> of n into k parts:
$x_1 + x_2 + \cdots + x_k = n, \quad x_i \ge 1$
Make the substitution:
$y_i = x_i - 1 \quad \Rightarrow \quad y_i \ge 0$
then
$y_1 + y_2 + \cdots + y_k = n - k$
Hence
$\binom{(n - k) + k - 1}{k - 1} = \binom{n - 1}{k - 1}$
So:
$\boxed{\#\{\text{strong compositions of } n \text{ into } k \text{ parts}\} = \binom{n - 1}{k - 1}}$
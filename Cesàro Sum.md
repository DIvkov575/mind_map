way to assign a value to some **divergent or oscillating series** by averaging their partial sums. It’s simpler than [[Analytic Continuation]] but only works for certain “nice” series.

1) Take series $a_1 + a_2 + a_3 + \dots$ and compute its partial sums
	$s_1 = a_1, \quad s_2 = a_1 + a_2, \quad s_3 = a_1 + a_2 + a_3, \dots$
2) The Cesàro sum is the limit of the average of the first n partial sums as $n \to \infty$
$$\text{Cesàro sum} = \lim_{n \to \infty} \frac{s_1 + s_2 + \dots + s_n}{n}$$

Eg. Ghandi Sum $1 - 1 + 1 - 1 + 1 - 1 + \dots$ -> partial sums $1~0~1~0~1~0 \ldots$
	and $\frac{1}{n} (1 + 0 + 1 + 0 + \dots)$ as $n \to \infty$ this average approaches 1/2

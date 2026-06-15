A function whose rate of change is globally bounded by a constant; a strong form of [[Uniformly Continuous|uniform continuity]].

## Definition

Let $f : X \to Y$ be a function between metric spaces $(X, d_X)$ and $(Y, d_Y)$.
$f$ is **Lipschitz continuous** if there exists a constant $L \ge 0$ such that for all $x_1, x_2 \in X$:
$$d_Y(f(x_1), f(x_2)) \le L \, d_X(x_1, x_2)$$

$L$ is called the **Lipschitz constant**; $f$ is said to be $L$-Lipschitz.

In $\mathbb{R}$: $|f(x) - f(y)| \le L\,|x - y|$

## Locally Lipschitz

A function is **locally Lipschitz continuous** if for every $x \in X$ there exists a neighborhood $U$ of $x$ such that $f|_U$ is Lipschitz continuous.

## K-Bilipschitz

For $K \geq 1$, if
$$\frac{1}{K}\,d_X(x_1, x_2) \le d_Y(f(x_1), f(x_2)) \le K\,d_X(x_1, x_2) \quad \text{for all } x_1, x_2 \in X,$$
then $f$ is called **K-bilipschitz** (a bi-Lipschitz embedding).

## Implications

- Bounded average rate of change (AROC)
- Lipschitz $\Rightarrow$ [[Uniformly Continuous]]

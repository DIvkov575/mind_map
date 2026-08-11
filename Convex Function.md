**Convex function**
$$f(\lambda x + (1-\lambda)y) \;\le\; \lambda f(x) + (1-\lambda)f(y), \quad \forall x,y\in C,\ \lambda\in[0,1]$$
- Jensen’s inequality holds in this direction.
- Typical shape: “cup-shaped”.
- the structural property that makes [[Numerical Optimization]] tractable with guarantees — gradient descent/Newton's method provably reach the global optimum only when $f$ is convex.

**Concave function**
$f(\lambda x + (1-\lambda)y) \;\ge\; \lambda f(x) + (1-\lambda)f(y), \quad \forall x,y\in C,\ \lambda\in[0,1]$
- Equivalent to: f is concave $\iff$ −f is convex.
- Typical shape: “cap-shaped”.
Finding an argmin/argmax of a function numerically — a different problem from [[Numerical Approximation Methods|numerically approximating a function's *value*]] (exp, sin, sqrt at a point), though the two share the same underlying toolkit of iterative refinement and share implementations at the lowest level (e.g. Newton's method, used here to find a root/optimum, is also the classic way to implement hardware `rsqrt`).

**Iterative descent**
- Gradient descent: step in the direction of steepest decrease, $x_{n+1} = x_n - \eta \nabla f(x_n)$.
- Newton's method: use second-order (curvature) information to jump straight toward the optimum of a local quadratic approximation, $x_{n+1} = x_n - [\nabla^2 f(x_n)]^{-1}\nabla f(x_n)$ — converges much faster near the optimum, but needs the Hessian (expensive in high dimensions).

**Why convexity matters**
Optimization is tractable in general only with structure on $f$. A [[Convex Function]] guarantees any local minimum is the global minimum, and gradient descent/Newton's method provably converge to it — without convexity, both methods can only promise convergence to *some* stationary point, not necessarily the best one. This is the dividing line between "optimization with guarantees" and "optimization as a heuristic."

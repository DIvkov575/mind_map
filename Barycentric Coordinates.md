Given a [[Simplex]] with vertices $u_0,\dots,u_k$, the barycentric coordinates of a point $x$ inside (or on) the simplex are weights $\theta_0,\dots,\theta_k$ such that:
$$
x = \sum_{i=0}^k \theta_i u_i, \qquad \sum_i \theta_i = 1, \qquad \theta_i \geq 0
$$

- unique for a given point in a non-degenerate simplex
- $\sum \theta_i = 1$ constrains $x$ to the affine hyperplane spanned by the vertices; $\theta_i \geq 0$ constrains it to lie within the convex hull (the simplex itself) rather than outside it on that hyperplane
- $\theta_i$ can be read as "how close $x$ is to vertex $u_i$" — $\theta_i = 1$ (all others 0) recovers $x = u_i$ exactly; the centroid has all $\theta_i$ equal

Used for interpolation across a triangulated mesh/simplicial complex — e.g. interpolating a value known at each vertex to any interior point by weighting with $\theta_i$.

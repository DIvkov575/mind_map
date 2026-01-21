- [[linear combination]] of points where the coefficients are nonnegative and sum to 1.
- [[linear interpolation]] is a special form - interpolating between two points

Formally, given points $x_1, \dots, x_n$​ in a [[vector space]], a [[convex]] combination is
$$x \;=\; \sum_{i=1}^n \lambda_i x_i \quad\text{with}\quad \lambda_i \ge 0,\ \ \sum_{i=1}^n \lambda_i = 1$$
Geometric meaning:
- For two points x,y all convex combinations $\lambda x + (1-\lambda)y$ with $\lambda\in[0,1]$ form the line segment between x and y.
- For multiple points, convex combinations give all points inside the [[Simplex]] (triangle, [[Tetrahedron]], etc.) spanned by them.
    
Key property:
- A set is [[convex]] iff it contains all convex combinations of its elements.
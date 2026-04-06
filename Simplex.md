A simplex is a generalization of the notion of a triangle or tetrahedron to arbitrary dimensions.
Simplex is so-named because it represents the simplest possible [[Polytope]] in any given dimension

 It is common to "glue together" simplices to form a [[Simplicial Complex]]

Specifically, a k-simplex is a k-dimensional polytope that is the [[Convex Hull]] of its k + 1 vertices. More formally, suppose the k + 1 points ${\displaystyle u_{0},\dots ,u_{k}}$ are affinely independent, which means that the k vectors ${\displaystyle u_{1}-u_{0},\dots ,u_{k}-u_{0}}$ are linearly independent. Then, the simplex determined by them is the set of points
${\displaystyle C=\left\{\theta _{0}u_{0}+\dots +\theta _{k}u_{k}~{\Bigg |}~\sum _{i=0}^{k}\theta _{i}=1{\mbox{ and }}\theta _{i}\geq 0{\mbox{ for }}i=0,\dots ,k\right\}.}$
$u_0, \dots, u_k \in \mathbb{R}^d$ - vertices
$\theta_i$ [[Barycentric Coordinates]]
$\sum \theta_i = 1$ ensures the point lies in the affine hyperplane spanned by the vertices
$\theta_i \ge 0$ ensures the point lies inside or on the faces of the simplex (convex hull).
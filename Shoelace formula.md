Used for calculating the area of a polygon ([[convex]] or nonconvex)
$$A = \frac{1}{2} \sum_{i=0}^{n-1}x_iy_i-\sum_{i=0}^{n-1}x_{i+1}y_i$$ 
the points are $(x_0, y_0), (x_1,y_1) \dots (x_n, y_{n})$ with $(x_n, y_n) = (x_0, y_0)$

- Negative if points are listed in counterclockwise order
- O(n)



<u>PF</u>
Area is sum of triangles
$$A = \sum_{i=1}^n \frac{1}{2}(x_i y_{i+1} - x_{i+1} y_i)$$
or equivalently (half [[Cross-Product]] parallelogram)
$$\begin{array}{c} \text{Area}(0,v_i,v_{i+1}) =
\frac{1}{2}
\begin{vmatrix}
x_i & y_i \\
x_{i+1} & y_{i+1}
\end{vmatrix}
=
\frac{1}{2}(x_i y_{i+1} - x_{i+1} y_i) \end{array}$$
sum triangles/segments
$$A = \frac{1}{2}\sum_{i=1}^n (x_i y_{i+1} - x_{i+1} y_i)$$
equivalently
$$A = \frac{1}{2}
\left|
\sum_{i=1}^n x_i y_{i+1} - \sum_{i=1}^n x_{i+1} y_i
\right|$$
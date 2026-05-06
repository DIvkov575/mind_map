Given lines defined by pair of points
Line 1 $A(x_1,y_1), B(x_2,y_2)$
Line 2 $C(x_3,y_3), D(x_4,y_4)$

$$\text{Orient}(P,Q,R) = (Q-P) \times (R-P)
= (q_x-p_x)(r_y-p_y) - (q_y-p_y)(r_x-p_x)$$
Interpretation:
- >0: counterclockwise turn
- <0: clockwise turn
- =0: collinear


Line Segments
AB and CD intersect iff
$\text{O}(A,B,C)\cdot \text{O}(A,B,D) < 0$ and  $\text{O}(C,D,A)\cdot \text{O}(C,D,B) < 0$
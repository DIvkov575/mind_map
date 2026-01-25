
A Standard young tableaxu T is a filling of boxes of $\lambda$ ([[Young Diagram]])with integers 1$,2,\ldots n$ such that they increase along rows and columns

![[Screenshot 2026-01-25 at 3.32.40 PM.png]]

Let $f_\lambda$ be the number SYT of shape $\lambda$

![[Screenshot 2026-01-25 at 3.34.34 PM.png]]

<u>Theorem</u> for $n\geq 2$
- $\sum_{|\lambda| = n} (f_\lambda)^2 = n!$ (one row above)
- Explanation (LHS - RHS) "[[RSK algorithm]]"
<u>Theorem</u> 
- Let $b$ be a box of $\lambda$
- <u>Define</u> a <u>hook</u> $h_\lambda (b) \coloneq 1+$ # {boxes east of b}  + #{boxes south of b}
- $f_\lambda = \frac{n!}{\Pi_{b\in\lambda} h_\lambda (b)}$


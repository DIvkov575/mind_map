
**Spearman’s rank correlation coefficient** ($\rho_s$​) measures the strength and direction of a **monotonic** relationship between two variables, using their **ranks** rather than raw values.

**Definition**
1. Replace each xi,yix_i, y_ixi​,yi​ by their ranks R(xi),R(yi)R(x_i), R(y_i)R(xi​),R(yi​).
2. Compute Pearson correlation on the ranks.
Equivalently (no ties):
$\rho_s \;=\; 1 - \frac{6\sum_i d_i^2}{n(n^2-1)}, \quad d_i = R(x_i)-R(y_i)$
**Range and interpretation**
- $\rho_s \in [-1,1]$
- +1: perfectly increasing monotonic relationship
- −1: perfectly decreasing monotonic relationship
- 0: no monotonic relationship
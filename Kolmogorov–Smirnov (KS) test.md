[[Nonparametric]] test comparing distributions via their CDFs

Good for testing a sample's membership to a distributino

- **One-sample KS test**  
    Compare empirical data vs a known reference distribution.  
    Example: “Does this data look Gaussian?”
- **Two-sample KS test**  
    Compare two datasets directly.  
    Example: “Were these samples drawn from the same distribution?”


Consider observations $x_1, \ldots, x_n$
Define ECDF
$$F_n(x)=\frac{1}{n}\sum_{i=1}^n \mathbf{1}[x_i \le x]$$
The KS statistic measures the maximum vertical gap between CDFs.
For one-sample: $D_n = \sup_x |F_n(x)-F(x)|$
For two-sample: $D_{n,m}=\sup_x |F_n(x)-G_m(x)|$

where:
- F_n: empirical CDF from dataset 1
- G_m: empirical CDF from dataset 2
- \sup_x​: maximum over all x

Under the null: $\sqrt{n}D_nn$ converges to the [[Kolmogorov distribution]] which gives P-values
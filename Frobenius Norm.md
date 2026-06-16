When _p_ = _q_ = 2 for the $L_{p,q}$ norm, it is called the **Frobenius norm** or the **Hilbert–Schmidt norm**, though the latter term is used more frequently in the context of operators on (possibly infinite-dimensional [[Hilbert Space]]) This norm can be defined in various ways:
$${\displaystyle \|A\|_{\text{F}}={\sqrt {\sum _{i}^{m}\sum _{j}^{n}|a_{ij}|^{2}}}={\sqrt {\operatorname {trace} \left(A^{*}A\right)}}={\sqrt {\sum _{i=1}^{\min\{m,n\}}\sigma _{i}^{2}(A)}},}$$
trace is sum of diag entries, and ${\displaystyle \sigma _{i}(A)}$ are the [[Singular Values]] of $A$, and $A^*$ is [[Adjoint]]?

- intuitively, average directional scaling...
- In ML many objectives look like $\min_\theta \|f_\theta(X) - Y\|_F^2$ and when you do  $\|AX - B\|_F^2$ you are summing over all  squared errors of all samples and all output dimensions
	- every coordinate is penalized equally
	- errors add independently
	- Simple gradients - quadratic
	

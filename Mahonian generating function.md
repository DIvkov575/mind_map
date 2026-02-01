For a [[Symmetric Group (S_n)]]

$\pi \in S_n$
$$\mathrm{inv}(\pi)=\#\{(i,j): i<j,\ \pi(i)>\pi(j)\}$$
The inversion generating function is
$$I_n(q)\;:=\;\sum_{\pi\in S_n} q^{\mathrm{inv}(\pi)}$$
closed fork
$$I_n(q)=\prod_{k=1}^n (1+q+\cdots+q^{k-1})
=\prod_{k=1}^n \frac{1-q^{k}}{1-q}$$

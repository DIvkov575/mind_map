### Definition

An **RKHS** H is a Hilbert space of functions $f:\mathcal X \to \mathbb R$ such that **point evaluation is continuous**:
$$f \mapsto f(x)$$
This implies the existence of a **reproducing kernel** k with:

1. **Representation**
	$$k(\cdot, x) \in \mathcal H$$
2. **Reproducing property**
	$$f(x) = \langle f, k(\cdot, x) \rangle_{\mathcal H}$$
**Representer Theorem**
Any $f \in \mathcal H$ can be written as
$f(x) = \sum_i \alpha_i k(x, x_i)$
This is the representer theorem, explaining why kernel methods reduce to finite expansions over data.

[[Universal Approximation Theorem (UAT)|Universal Approximation]] (RKHS)

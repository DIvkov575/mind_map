A complete inner-product space — a vector space with an inner product $\langle\cdot,\cdot\rangle$ that induces a norm $\|x\| = \sqrt{\langle x,x\rangle}$, and every Cauchy sequence converges within the space (completeness).

- generalizes $\mathbb{R}^n$/$\mathbb{C}^n$ to infinite dimensions — the space $L^2$ of square-integrable functions is the canonical example
- the [[Frobenius Norm]] on matrices is exactly the Hilbert space norm induced by treating an $m\times n$ matrix as a vector in $\mathbb{R}^{mn}$ with the standard inner product (equivalently, $\langle A,B\rangle = \mathrm{trace}(A^\top B)$)
- [[Wavelet Series|wavelet series]] decompose $L^2$ functions via an orthonormal (or overcomplete/[[Frame (vector space)|frame]]) basis of this Hilbert space

**Why it matters**
Having an inner product (not just a norm) means angles and orthogonal projection are well-defined — this is what makes least-squares, Fourier/wavelet decomposition, and kernel methods (reproducing kernel Hilbert spaces) work.

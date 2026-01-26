It is a fixed, non-learned, linear transform that decomposes a discrete signal into multiresolution frequency components with spatial (time) localization.

What it does:

Given a discrete signal $x[n]$, the DWT represents it as
$$
x[n] = \sum_{j,k} c_{j,k}\,\psi_{j,k}[n]
$$
where
$$
j \text{ = scale (resolution level)}, \quad
k \text{ = position (translation)}, \quad
\psi_{j,k} \text{ = scaled and shifted wavelets}, \quad
c_{j,k} \text{ = wavelet coefficients}.
$$

Unlike the [[Fourier transform]]:
- frequencies are localized in time
- resolution varies with scale


**How it's computed:**
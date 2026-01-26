Also known as [[Radial Basis Function (RBF)]] expansion


Functions are approximated as
$$f(x) = \sum_{i=1}^N w_i \, \phi(\|x - c_i\|)$$
- c_i​: centers
- w_i​: weights
- ϕ: radial basis function

This is:
- linear in weights,
- nonlinear in inputs,
- a localized alternative to global bases (polynomials, Fourier).

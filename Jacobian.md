The matrix of all first-order partial derivatives of a vector-valued function $f: \mathbb{R}^n \to \mathbb{R}^m$:
$$
J_{ij} = \frac{\partial f_i}{\partial x_j}
$$
— the multivariate generalization of a derivative: the best local linear approximation of $f$ at a point.

**In a neural network**
- Backpropagation through a layer is exactly multiplying by that layer's Jacobian. The gradient through $L$ layers is a product of $L$ Jacobians (chain rule) — this repeated matrix multiplication is *why* gradients can vanish or explode: if each layer's Jacobian has singular values consistently below/above 1, the product shrinks/grows geometrically with depth. See [[Exploding Gradient]].
- [[J-Space]]'s "Jlense" technique computes an *averaged* per-layer Jacobian (linearizing that layer's effect on the final logits, averaged across many prompts to strip out prompt-specific nonlinearity) and uses that single linear map as a cheap stand-in for the real, nonlinear remaining computation — trading exactness for a fast, generic read of "what this activation tends to make the model say."

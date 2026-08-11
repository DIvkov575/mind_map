Weight initialization scheme designed to keep the scale of activations and gradients roughly constant across layers in deep neural networks.

Xavier initialization sets:
$$
\mathrm{Var}(W_{ij}) = \frac{2}{n_{\text{in}} + n_{\text{out}}}
$$

This balances variance preservation in both the forward pass (activations) and the backward pass (gradients).

**Why it matters**: a network's initial weight scale is one of the direct levers on the vanishing/[[Exploding Gradient|exploding gradient]] problem — too-small initial weights shrink activations/gradients layer by layer toward zero (vanishing), too-large weights blow them up (exploding). Xavier picks the variance that keeps forward *and* backward signal magnitude stable at initialization, rather than needing gradient clipping or a lower learning rate to compensate after the fact — a complementary fix to [[Residual Connections]], which instead give the gradient a direct additive path around any layer that would otherwise shrink it, regardless of initialization.

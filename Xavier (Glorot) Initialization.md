
weight initialization scheme designed to keep the scale of activations and gradients roughly constant across layers in deep neural networks.



Xavier initialization sets:
\mathrm{Var}(W_{ij}) = \frac{2}{n_{\text{in}} + n_{\text{out}}}

This balances variance preservation in both forward and backward passes.
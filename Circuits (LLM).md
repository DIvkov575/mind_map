See [[Residual Stream]]



$\text{FFN}^l (x^l_i) = g(x_i^lW_{in}^l)W_{out}^l$  is equated to key-value memory retrieval, with keys ($w^l_{in}$) stored in columns of $W_{in}^l$ acting as pattern detectors over the input sequence and values $w^l_{out}$ rows of $W^l_{out}$ being uprighted by each neurons activity.

$$\text{FFN}^l(\boldsymbol{x}_i^{\text{mid},l}) = \sum_{u=1}^{d_{\text{ffn}}} g_u\left(\boldsymbol{x}_i^{\text{mid},l} \boldsymbol{w}_{\text{in}}^{l,u}\right)\boldsymbol{w}_{\text{out}}^{l,u} = \sum_{u=1}^{d_{\text{ffn}}} n_u^l \boldsymbol{w}_{\text{out}}^{l,u}, \tag{8}
$$
$$\text{with } \boldsymbol{n}^l \in \mathbb{R}^{d_{\text{ffn}}} \text{ the vector of neuron activations, and } n_u^l \text{ the } u\text{-th neuron activation value.}$$

The elementwise nonlinearity inside FFNs creates a privileged basis, which encourages features to align with basis directions. For instance, given a linear network $f(\boldsymbol{x}) = \boldsymbol{x}\boldsymbol{W}_1\boldsymbol{W}_2$, the representations extracted from its first layer, $\boldsymbol{x}\boldsymbol{W}_1$, are rotationally invariant, since we can rotate them by an orthogonal matrix $\boldsymbol{O}$, giving $\boldsymbol{x}\boldsymbol{W}_1\boldsymbol{O}$, and invert the rotation having the output of the network untouched, $f(\boldsymbol{x}) = \boldsymbol{x}\boldsymbol{W}_1\boldsymbol{O}\boldsymbol{O}^{-1}\boldsymbol{W}_2$. However, having an elementwise nonlinear function on the output of the first layer breaks the rotational invariance of the representations, making the standard basis dimensions (neurons) more likely to be independently meaningful, and therefore better suitable for interpretability analysis.

$$f(\boldsymbol{x})_n = \left(\boldsymbol{x}_n^L\right)\boldsymbol{W}_U = \left(\sum_{l=1}^{L}\sum_{h=1}^{H} \text{Attn}^{l,h}(\boldsymbol{X}_{\le n}^{l-1}) + \sum_{l=1}^{L} \text{FFN}^l(\boldsymbol{x}_n^{\text{mid},l}) + \boldsymbol{x}_n\right)\boldsymbol{W}_U

= \sum_{l=1}^{L}\sum_{h=1}^{H} \text{Attn}^{l,h}(\boldsymbol{X}_{\le n}^{l-1})\boldsymbol{W}_U + \sum_{l=1}^{L} \text{FFN}^l(\boldsymbol{x}_n^{\text{mid},l})\boldsymbol{W}_U + \boldsymbol{x}_n\boldsymbol{W}_U.$$

The first term in Equation~(11), linking the input embedding to the unembedding matrix, is referred to as the \textit{direct path} (first path in Figure~3). The paths traversing a single OV matrix are instead named \textit{full OV circuits} (second and fourth path in Figure~3). Often, full OV circuits are written as $\boldsymbol{W}_E \boldsymbol{W}_{OV} \boldsymbol{W}_U \in \mathbb{R}^{|V| \times |V|}$, stacking as rows the logits effect of each input embedding through the circuit. Lastly, the path involving both attention heads is referred to as \textit{virtual attention heads} doing \textit{V-composition}, since the sequential writing and reading of the two heads is seen as OV matrices composing together. Elhage et al. (2021a) propose measuring the amount of composition as:

$$\|\boldsymbol{W}^1_{OV} \boldsymbol{W}^2_{OV}\|_F \big/ \|\boldsymbol{W}^1_{OV}\|_F \|\boldsymbol{W}^2_{OV}\|_F .$$

[[Q-composition]]} and \textit{K-composition}, i.e. compositions of $\boldsymbol{W}_Q$ and $\boldsymbol{W}_K$ with the $\boldsymbol{W}_{OV}$ output of previous layers, can also be found in full Transformer models.
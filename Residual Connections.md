- address the problem of **[[Vanishing Gradients]]** in deep networks
- (also called a skip connection) bypasses one or more layers and adds the input directly to the output of a layer.
- "Free" Identtiy representation
- Learns small correctinos rather than massive shifts
- Effectively an Ensemble: A network with NN N residual blocks can be unrolled as a sum over 2N2^N 2N possible paths (each block either included or skipped, since x+F(x)\boldsymbol{x}+F(\boldsymbol{x}) x+F(x) expands combinatorially through composition). Empirical work (Veit et al., "Residual Networks Behave Like Ensembles") showed most of the gradient signal during training flows through **short** paths (a handful of blocks), not the single longest end-to-end path. This means effective depth for optimization purposes is much shallower than nominal depth, which is a big part of why deep residual nets train stably.
- Formally, if a block of layers computes a mapping $\mathcal{F}(x)$, the residual connection outputs:
$$y = \mathcal{F}(x) + x$$
	If the dimensions don’t match, a linear transformation WsW_sWs​ (like a 1×1 convolution) is applied:
$$y = \mathcal{F}(x) + W_s x$$


- **Direct gradient path:** During backpropagation, the gradient can flow **directly through the skip connection**:
- $$\frac{\partial L}{\partial x} = \frac{\partial L}{\partial y} \left( \frac{\partial \mathcal{F}(x)}{\partial x} + 1 \right)$$Even if $\frac{\partial \mathcal{F}(x)}{\partial x}$ is very small (vanishing gradient), the “1” ensures a non-zero gradient flows back.
    
- **Easier learning:** The network only needs to learn the **residual mapping** $\mathcal{F}(x) = H(x) - x$, which is often simpler than learning the full mapping H(x)H(x)H(x). This allows layers to refine the identity mapping instead of starting from scratch.

Residual connections → structural: guarantee a gradient/identity path exists, regardless of what any individual layer computes.
[[Normalization]] ([[LayerNorm]]) → numerical: keeps the scale of activations/gradients well-behaved as they flow through and accumulate along that path.
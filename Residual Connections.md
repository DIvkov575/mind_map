- address the problem of **vanishing/exploding gradients** in deep networks
- (also called a skip connection) bypasses one or more layers and adds the input directly to the output of a layer.
- Formally, if a block of layers computes a mapping $\mathcal{F}(x)$, the residual connection outputs:
$$y = \mathcal{F}(x) + x$$
If the dimensions don’t match, a linear transformation WsW_sWs​ (like a 1×1 convolution) is applied:
$$y = \mathcal{F}(x) + W_s x$$


- **Direct gradient path:** During backpropagation, the gradient can flow **directly through the skip connection**:
- $$\frac{\partial L}{\partial x} = \frac{\partial L}{\partial y} \left( \frac{\partial \mathcal{F}(x)}{\partial x} + 1 \right)$$Even if $\frac{\partial \mathcal{F}(x)}{\partial x}$ is very small (vanishing gradient), the “1” ensures a non-zero gradient flows back.
    
- **Easier learning:** The network only needs to learn the **residual mapping** $\mathcal{F}(x) = H(x) - x$, which is often simpler than learning the full mapping H(x)H(x)H(x). This allows layers to refine the identity mapping instead of starting from scratch.
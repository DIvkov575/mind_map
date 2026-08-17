### The original problem (pre-2015, pre-ResNet)

Deep networks _without_ skip connections have two compounding problems as depth increases:
1. **Vanishing/[[Exploding Gradient]].** Backprop multiplies gradients through every layer's Jacobian. Stack 50+ layers and that product tends toward 0 or ∞, so early layers barely learn.
2. **Degradation problem.** Surprisingly, even _training_ (not just generalization) error gets worse with added depth beyond some point, even though a deeper network could in principle just learn identity functions in the extra layers and match the shallower one's performance. In practice, plain stacked nonlinear layers struggle to learn "do nothing" — because to represent identity through a stack of nonlinear transforms, every intermediate weight matrix has to conspire to invert the previous one.

### The fix: residual/skip connections (He et al., 2015, ResNet)
Instead of a layer learning a full transformation x→F(x)\boldsymbol{x} \to F(\boldsymbol{x}) x→F(x), it learns a **residual** x→x+F(x)\boldsymbol{x} \to \boldsymbol{x} + F(\boldsymbol{x}) x→x+F(x). This is a small structural change with big consequences:

- **Identity is now the default, not something that has to be learned.** If FF F does nothing useful (weights near zero), the layer just passes x\boldsymbol{x} x through unchanged. Extra depth can never make things structurally worse in the way it could before — it's easy to fall back to "no-op."
- **Gradients get a direct path.** Because of the +x+\boldsymbol{x} +x term, ∂∂x[x+F(x)]=I+∂F∂x\frac{\partial}{\partial \boldsymbol{x}}[\boldsymbol{x} + F(\boldsymbol{x})] = I + \frac{\partial F}{\partial \boldsymbol{x}} ∂x∂​[x+F(x)]=I+∂x∂F​. That identity matrix means gradients can flow straight backward through every layer via the skip path, without being forced through (and potentially crushed/exploded by) every layer's Jacobian. This is what made networks with 100+ layers trainable at all.
- **Each layer only has to learn a small correction**, not the whole function from scratch — an easier optimization target.

- This used [[Residual Connections]] to create the [[Residual Stream]]
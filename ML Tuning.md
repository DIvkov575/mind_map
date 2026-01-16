
Noisy Gradients $\mapsto$ Increase [[Batch]] Size
[[Exploding Gradient]] $\mapsto$ Reduce [[learning rate (LR)]], Reduce [[Batch]] Size
[[Overfitting]] (good training val, bad testing val) $\mapsto$ 
- **Reduce model capacity**: smaller model, fewer parameters.
- **Regularization**: weight decay ([[Ridge regularization (L2) | L2]]), dropout.
- **More data / augmentation**: increase dataset diversity.
- **Early stopping**: stop when validation loss stops improving.
- **Noise / stochasticity**: smaller batch size, gradient noise.
[[Underfitting]] $\mapsto$ 
- **Increase model capacity**: more layers, more parameters.
- **Train longer / more epochs**: allow optimizer to converge.
- **Increase learning rate carefully**: if too small, optimization is slow.
- **Better features / preprocessing**: more informative inputs.
- **Reduce regularization**: excessive weight decay or dropout can underfit.
[[Data Leakage]] (validation loss << training loss0 $\mapsto$
- evaluate [[Train Test Split]]

[[Batch]] Size
- Larger sizes improve gradient stability (but decrease stochasticity)
- Should be as large as possible while fitting within memory
- Can be artificially increased with gradient accumulation

[[learning rate (LR)]]
- Try [[Leslie Smith Test]] to identify good starting LR
- 


**Tools**

Monitoring Norms
```total_norm = 0
for p in model.parameters():
    if p.grad is not None:
        param_norm = p.grad.data.norm(2)
        total_norm += param_norm.item() ** 2
total_norm = total_norm ** 0.5
print(f"Gradient L2 norm: {total_norm}")```
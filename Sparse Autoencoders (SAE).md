Sparse [[Auto Encoder]](SAE) is a neural network trained to
- **Encode** input data into a smaller representation (latent space)
- **Decode** it back to reconstruct the original input
- While enforcing **sparsity** (only a few neurons activate at a time)

Applied to a language model's own activations, this is a standard mechanistic-[[Interpretability]] tool — decomposing raw activations into a larger, sparser, more monosemantic feature basis than the original neurons offer.
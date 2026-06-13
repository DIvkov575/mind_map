
I don't understand the later 3 techniques lmao - AWS tweaking
**Mixed-precision training**

**Activation (Gradient) checkpointing**
Store only subset of intermediate activations and recompute them during the backward pass??

**Activation offloading**
Offload computed activation to CPU memory after forward pass + fetch when needed?...

**Delayed parameter initialization**
When the GPU memory is insufficient to initialize a large model for training. It allows data scientists to initialize the model on CPU memory or, for models with more than 20B parameters, on what PyTorch calls a meta device, which allows the creation of tensors without any data attached to them.

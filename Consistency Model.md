Type of [[Flow-Based Model]]

https://proceedings.mlr.press/v202/song23a/song23a.pdf

- [[Diffusion Models]] depend on an slow iterative sampling $\to$ **consistency models**  family of models that quality samples by directly mapping noise to data. 
- still allow [[Multistep Sampling]] to trade compute for sample quality. 
- They also support zero-shot data editing, such as image inpainting, colorization, and super-resolution, without requiring explicit training on these tasks. 
- Consistency models can be trained either by [[Distillation | distilling]] pre-trained diffusion models, or as standalone generative models altogether. 
- Through extensive experiments, we demonstrate that they outperform existing [[Distillation]] techniques for diffusion models in one- and few-[[step sampling]], achieving the new state-of-the-art FID of 3.55 on CIFAR-10 and 6.20 on ImageNet 64x64 for one-step generation. 
- When trained in isolation, consistency models become a new family of generative models that can outperform existing one-step, [[non-adversarial generative models]] on standard benchmarks such as [[CIFAR-10]], [[ImageNet]] 64x64 and LSUN 256x256.
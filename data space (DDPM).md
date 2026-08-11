The raw, original coordinate space of the data itself (pixels, waveform samples, etc.) — as opposed to [[latent space (LDM)|latent space]], a compressed/learned representation.

- **DDPM** (Denoising Diffusion Probabilistic Model) runs its forward/reverse [[Diffusion Models|diffusion]] process directly in data space — noise is added to and removed from actual pixels
- contrast **LDM** (Latent Diffusion Model), which first encodes into a lower-dimensional latent space and diffuses there instead — much cheaper since the diffusion process operates on far fewer dimensions
- [[K-means]] and similar clustering methods likewise partition data space directly (e.g. into [[Voronoi Cells]]) rather than a learned latent space

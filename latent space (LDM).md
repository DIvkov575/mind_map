A learned, typically lower-dimensional representation space that an encoder maps raw data into — as opposed to [[data space (DDPM)|data space]], the raw original coordinates.

- **LDM** (Latent Diffusion Model): first encode data into latent space (e.g. via a VAE encoder), then run the forward/reverse [[Diffusion Models|diffusion]] process there instead of on raw pixels — much cheaper since the latent space has far fewer dimensions than data space, while a decoder maps the final denoised latent back to data space
- contrast **DDPM**, which diffuses directly in [[data space (DDPM)|data space]]
- more generally, "latent space" is the space [[Variational Auto Encoder (VAE)|VAEs]] and [[Neural ODE|Latent Neural ODEs]] operate in — an encoder compresses the observed input into this space, where downstream modeling (sampling, dynamics, generation) happens before a decoder projects back out

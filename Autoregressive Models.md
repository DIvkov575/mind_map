Factorize p(x) exactly via the chain rule (p(x) = Π p(x_i | x_<i))








**Generative Modeling (images/high-dim)**
AR dominates text and far less common in images, largely due to
- Generates each pixel by pixel (or [[Patch]] by Patch)

**Inference-time decoding**
Since $p(x)$ only gives per-token conditionals, generating a full sequence still requires a search/decoding strategy over them — see [[Beam Decoding]].
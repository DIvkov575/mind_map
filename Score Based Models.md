generative model closely related to diffusion models, but framed in terms of **learning the gradient of the data log-density**, i.e., the **score function** (as opposed to probability distribution $p_\text{data}(x)$ directly). This training objective is called [[Denoising Score Matching (DSM)]].
**Score function:** $s(x) = \nabla_x \log p_\text{data}(x)$




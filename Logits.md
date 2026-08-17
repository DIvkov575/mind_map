The unnormalized scores a model assigns to alternatives before converting them into probabilities. For a vocabulary of size $V$, a language model produces a vector $z\in\mathbb{R}^V$ with one logit per token from [[Tokenization Algorithms|the tokenizer's vocabulary]].

With temperature $T>0$, softmax gives

$$p_i=\frac{e^{z_i/T}}{\sum_{j=1}^{V}e^{z_j/T}}.$$

- Adding the same constant to every logit leaves the probabilities unchanged.
- A logit difference $z_a-z_b$ is the log probability ratio between alternatives $a$ and $b$ before temperature scaling.
- Lower temperature sharpens the distribution; higher temperature flattens it.
- Training commonly applies [[Cross Entropy]] directly to logits using a numerically stable log-softmax implementation.
- [[Perplexity]] is derived from average token-level negative log-likelihood, not from raw logit magnitude.

Logit differences are useful intervention metrics because they preserve relative preference without requiring sampling. See [[Activation Patching]] and [[J-Space]].
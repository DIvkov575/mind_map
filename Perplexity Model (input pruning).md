**Perplexity-based models for input pruning** are techniques that use a language model’s _per-token perplexity_ to remove low-importance parts of an input while preserving the model’s output behavior.

### Core idea

[[Perplexity]] measures how _surprising_ a token is under a language model:
$$\text{ppl}(x_t) = \exp\big(-\log p(x_t \mid x_{<t})\big)$$
For each token $x_t$, a causal LM gives:
$$p_{\text{LM}}(x_t \mid x_{<t})$$
This is obtained directly from the softmax over logits:
$$p_{\text{LM}}(x_t \mid x_{<t}) = \frac{e^{z_{t,x_t}}}{\sum_{v \in \mathcal{V}} e^{z_{t,v}}}$$

From this:
- [[Negative Log Likelihood (NLL)]]: $\ell_t = -\log p_{\text{LM}}(x_t \mid x_{<t})$​)
- Perplexity: $\text{PPL}_t = e^{\ell_t}$
- **Low perplexity tokens** → highly predictable / redundant given context
- **High perplexity tokens** → informative / content-bearing

- **[[Threshold pruning]]**  
    Drop tokens with perplexity below a fixed threshold.
- **[[Budgeted pruning]]**  
    Keep the top-k highest-perplexity tokens.
- **[[Span-level pruning]]** 
    Aggregate scores over n-grams or syntactic spans instead of single tokens.
- **[[Δ-perplexity / leave-one-out]]**  
    Measure change in perplexity when a token/span is removed.
- **[[Attention-aware pruning]]**  
    Combine perplexity with attention weights or gradients.


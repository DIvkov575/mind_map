The architecture underlying modern language models — self-attention over a sequence of tokens, stacked in layers, with no recurrence. Ties together the pipeline stages this vault already covers piecemeal:

**Input pipeline**
- Raw text is first cut into tokens — [[Tokenization Algorithms]] (word/character/[[Byte-Pair Encoding (BPE)|BPE]]) decides the vocabulary the model actually sees.
- Since attention has no inherent notion of order (it's a set operation over tokens), [[Positional Encoding]] injects position information back in — RoPE (a rotation applied to query/key vectors as a function of position) is the modern standard, derived from requiring translation-invariant, continuous position encodings.

**The core operation: attention**
- Attention computes $Q^\top K$ scores between every pair of tokens — $O(N^2)$ in sequence length $N$, both in compute and in the memory needed to hold the full score matrix.
- [[Flash Attention]] is the systems-level fix for the memory side of that cost: never materialize the full $N\times N$ matrix, tile the computation instead, and keep intermediates in fast on-chip memory rather than round-tripping to [[High Bandwidth Memory (HBM)]] — turning attention's memory footprint from $O(N^2)$ to $O(N)$, exactly (not an approximation), which is what made long context windows practical.

**Generation**
- A language model is trained as an [[Autoregressive Models|autoregressive]] model — $p(x) = \prod_i p(x_i \mid x_{<i})$ — so generating text at inference time still needs a decoding strategy over those per-token conditionals (see [[Beam Decoding]]).

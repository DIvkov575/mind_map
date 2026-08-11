
See [[(RAG) Retrieval Augmented Generation]]

Applied concretely to a coding-agent's own session state (symbol indexes, session handoffs, past-session archival) in [[Continuous Claude V3]].


Compression — buy back tokens:
- Extractive (keep top sentences by relevance) — cheap, lossy-but-safe.
- Abstractive (LLM-summarize chunks) — higher compression, costs an LLM call.
- Token-level (LLMLingua: a small model prunes low-perplexity tokens)

Caching — stop paying twice:
- Prefix/prompt caching: cache the static system prompt + few-shot prefix (Anthropic, Google, vLLM support this natively). Pure cost win, near-zero complexity.
- Semantic caching: return a stored answer when a new query embeds within ~0.95 of a past one.

Ordering — exploit the recall curve directly:
- Bookend pattern: most-relevant chunk first, second-most last, filler in the middle.
- Sandwich pattern for very long contexts: repeat the instruction/query at the very end so the model remembers the task after wading through 50K toke
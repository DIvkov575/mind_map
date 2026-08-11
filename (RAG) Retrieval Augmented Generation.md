An application of [[Information Retrieval]] to LLM generation. See [[Context Engineering]]


**Naive**
Embed -> top-k -> concat -> generate

**Advanced**
- Query Rewrite
- [[HyDE]]
- [[Hybrid Sparse-Dense Vector Search]]
- [[Reciprocal-Rank Fusion]]
- [[Corrective Retrieval-Augmented Generation (CRAG)]] — adds a self-correction step that evaluates retrieved-document relevance before generation
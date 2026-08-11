Finding the documents (or facts, or memories) relevant to a query out of a large collection — the field [[(RAG) Retrieval Augmented Generation|RAG]], search engines, and agent memory systems all sit on top of.

**Scoring/ranking a candidate's relevance**
- [[Okapi BM25]]: classic bag-of-words scoring — ranks by query-term frequency in a document, adjusted for document length. Fast, no training required, but purely lexical (misses synonyms/paraphrase).
- [[Cross Encoder]]: a learned model that reads query and candidate document *together*, so it can reason about word-level interactions — more accurate than comparing independently-embedded vectors, but too slow to run over an entire corpus, so it's typically used only as a reranker over a small shortlist a cheaper method already narrowed down.
- [[Maximal Marginal Relevance (MMR)]]: re-ranks a candidate set to explicitly trade off relevance against redundancy (penalizing a candidate for being too similar to ones already selected) — for when you want a diverse top-k, not just the k most relevant taken independently.

**Retrieval in a generation pipeline**
- [[(RAG) Retrieval Augmented Generation]] is retrieval feeding an LLM's context so it can generate a grounded answer — see that note for the naive vs. advanced pipeline variants (query rewrite, CRAG's self-correction, etc.)

**Retrieval as agent memory**
- [[Mem0]] applies the same retrieval toolkit (semantic/vector search + [[Okapi BM25|BM25]] keyword search + a cross-encoder reranker) to an agent's own long-term memory store, fusing multiple retrieval signals together rather than relying on just one. [[Continuous Claude V3]]'s own persistence layer is a coding-agent-specific instance of the same problem — retrieving relevant past-session context rather than relevant documents.

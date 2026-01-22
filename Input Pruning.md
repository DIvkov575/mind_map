
[[Vision-Model Input Optimization]]

[[Information Theory | Information-Theoretic]] Methods (Unsupervised)
- [[Perplexity Model (input pruning) | Perplexity]]-Based Pruning: Calculates the probability of each token. Tokens that the model can easily predict (low perplexity) are removed as redundant.
- [[Entropy Baed (input pruning) |Entropy-Based]] Selection: Measures the "surprise" factor. If a word doesn't change the probability distribution of the next words significantly, it is pruned.
- [[CXMI (input pruning) | CXMI (Conditional Cross-Mutual Information)]]: Measures how much a specific document chunk reduces the uncertainty of the user's query. Chunks with low mutual information are dropped. good for RAG

Lexical & Heuristic Methods (Rule-Based)
- Stop-word Removal: Deletes common functional words (e.g., "the", "is", "at") that don't carry core semantic weight.
- Lexical Overlap (Filtering): In RAG systems, it compares the words in the document to the words in the query. If a sentence has zero word-overlap with the query, it is pruned.
- Self-Information Units: Groups text into "lexical units" (phrases) and calculates the information density of the unit. Entire phrases are dropped if they fall below a threshold.

[[Classifier Based (input pruning)|Supervised Classification]] - Requires inference (label x2) -> training
This is currently the most effective method for maintaining accuracy. You use a separate, tiny model trained specifically to "edit" text for a larger one.
- Binary Token Labeling: A small model (e.g., BERT-base) is trained to look at a sentence and output a 1 (Keep) or 0 (Drop) for every single word.
- Distilled Compression: A small model learns to mimic how a giant model (like GPT-4) would summarize or shorten a prompt. It then applies those same "shortcuts" to your input text.

[[Attention Saliency / Proxy Model (input pruning)]]
These use a smaller version of the transformer architecture to "preview" what the model will look at.
- Attention Score Summation: You run the text through a 1B or 7B model. You look at the "Attention Matrix" and sum up how many times each token was "attended to." Tokens with the lowest total attention are deleted before the text is sent to the 175B+ model.
- Query-Guided Cross-Attention: Specifically used when you have a question. It measures how much the question attends to specific parts of the document. Anything the question ignores is pruned.

[[Semantic & Vector Methods (input pruning)]]
These treat text as mathematical points in space.
- Semantic De-duplication: Converts sentences into vectors (embeddings). If two sentences are $95\%$ similar in vector space, one is deleted as a duplicate.
- Contextual Sentence Encoding: Uses a transformer to score entire sentences based on their relevance to a "Global Context" or "Query." Sentences with low relevance scores are pruned.
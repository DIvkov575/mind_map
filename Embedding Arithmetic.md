The empirical observation that vector-space differences between learned embeddings correspond to consistent semantic relationships — the classic example: $\vec{king} - \vec{man} + \vec{woman} \approx \vec{queen}$.

- arises naturally from [[Word2Vec]]-style training: since the dot product $v_w^\top v_c \approx \log p(c\mid w)$ factorizes a shifted [[Pointwise Mutual Information (PMI)]] matrix, and PMI is approximately linear in semantic relations, differences between vectors track consistent shifts in co-occurrence statistics
- doesn't require explicit supervision for the relation being tested — it's an emergent property of the geometry learned to predict context
- used informally as evidence that an embedding space has captured meaningful linear structure (relation = direction), not just proximity (similarity = distance)

Relevant background: [[Embeddings]], [[Representation Learning]]

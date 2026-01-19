It is the training objective used in [[Word2Vec]] that is primarily responsible for good vector arithmetic.

SGNS trains word embeddings by:
- Predicting **context words** given a **center word**
- Using **negative samples** instead of a full softmax

Formally, for a word–context pair (w,c) it maximizes:
$log \sigma(v_w^\top v_c) \;+\; \sum_{i=1}^k \mathbb{E}_{c_i \sim P_n} \left[\log \sigma(-v_w^\top v_{c_i})\right]$
where:
- $v_w$​ = embedding of word w
- $v_c$​ = embedding of context word c
- σ = sigmoid
- $P_n$​ = noise ([[negative sampling]]) distribution

GNS is implicitly factorizing a shifted [[Pointwise Mutual Information (PMI)]] Matrix:
$v_w^\top v_c \;\approx\; \operatorname{PMI}(w, c) - \log k$

## Why this enables vector arithmetic

Because:
1. **PMI differences encode semantic relations**
    $\operatorname{PMI}(\text{king}, c) - \operatorname{PMI}(\text{man}, c) \approx \operatorname{PMI}(\text{queen}, c) - \operatorname{PMI}(\text{woman}, c)$
	$1. Dot products preserve these differences  
$(v_{\text{king}} - v_{\text{man}})^\top v_c \approx (v_{\text{queen}} - v_{\text{woman}})^\top$
2. Therefore the difference vectors align
	$nv_{\text{king}} - v_{\text{man}} \approx v_{\text{queen}} - v_{\text{woman}}$

This is exactly the mechanism behind analogy arithmetic.
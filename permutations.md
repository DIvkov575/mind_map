A [[Bijection]] $\sigma: [n] \to [n]$ — a reordering of $n$ elements. The set of all permutations of $[n]$ forms the [[Symmetric Group (S_n)]] under composition (see [[Groups]]).

**Encodings**
- [[Lehmer code]]: encode $\sigma$ as $L(\sigma)_i = \#\{j > i : \sigma_j < \sigma_i\}$ — the number of later elements smaller than $\sigma_i$, an [[Inversion Table]]
- [[Factoradic]]: the same idea via the factorial number system — since there are $n!$ permutations of $n$ elements, any integer $< n!$ can be written in factorial base as a sequence of $n$ digits, which decodes directly into a permutation (e.g. via the Lehmer code)

**Statistics**
A [[Permutation Statistic]] is any function $\mathrm{stat}: S_n \to \mathbb{N}$ — e.g. the number of [[Inversion]]s, number of fixed points, cycle count — used to classify or count permutations by some combinatorial property rather than examining the full permutation itself.

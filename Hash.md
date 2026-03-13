function $h : D \rightarrow R$ where 
$D$ - large domain and treated as [[Monoid|free monoid]] under concatenation
$R$ - is finite range/set or [[Groups|finite group]] or [[Ring|finite ring]]
thus





---
Polynomial Hash ([[Ring]] structure)
Many algorithmic hashes treat the input as a polynomial over a finite ring.
For a string $s = s_0 s_1 ... s_{n-1}$
$$H(s) = \sum_{i=0}^{n-1} s_i p^i \mod m$$
Algebraically:
- elements s_i​ are coefficients
- the string is a polynomial    
- evaluation occurs in the ring $\mathbb{Z}_m$
This polynomial fingerprint is used in  [[Rabin-Karp Algorithm]]
$H(xy) = H(x) + p^{|x|}H(y) \pmod m$

---
[[Homomorphic Hashes]] (Groups n shi)

---
[[Iterated Hash]]

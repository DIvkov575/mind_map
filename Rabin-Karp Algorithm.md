Rabin-Karp Algo fingerprint is the [[Hash]] value of a string (or substring) used to efficiently detect pattern matches in a larger text. Instead of comparing strings character-by-character at every position, the algorithm compares hashes

For a string s of length m, treat it as a number in base b:
$$s = s_0 s_1 s_2 \dots s_{m-1}$$
The fingerprint (hash) is:
$$H(s) = (s_0 b^{m-1} + s_1 b^{m-2} + \dots + s_{m-1}) \bmod p$$

where:
- b = base (commonly alphabet size, e.g., 256)
- p = large prime modulus
- s_i = numeric encoding of the i-th character
This is a [[Rolling Hash|polynomial rolling hash]]

The key idea: update the hash in **O(1)** when sliding the window.
For substring $T[i..i+m-1]$
$$H_{new} =
\big((H_{old} - T[i]\cdot b^{m-1}) \cdot b + T[i+m]\big) \bmod p$$
Meaning:
1. Remove the leftmost character.
2. Multiply by base (shift).
3. Add the new character.


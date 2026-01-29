Probabilistic data structure for checking membership witin a set
- Space efficient but allows [[False Positives]]
- Never allows [[False Negatives]]
<u>Structure</u>
- An array of `m` bits, all initialized to 0.
- `k` independent hash function, each mapping an element to one of the `m` positions.        
<u>Insertion:</u>
- To add an element, hash it with all `k` hash functions.
- Set the bits at each of the resulting `k` positions to 1.
<u>Query</u>:
- To check if an element is in the set, hash it with all `k` functions.
- If all corresponding bits are 1, the element is possibly in the set.
- If any bit is 0, the element is definitely not in the set.
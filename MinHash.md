Stochastic set [[Similarity Metric]] estimation method (particularly) [[Jaccard Similarity]]:
$$J(A, B) = \frac{|A \cap B|}{|A \cup B|}$$
- Useful in big data
- [[Representation Learning]]? Represent each set as a dense vector of integers
	-  Each element of the "signature" (`vector<int>`) is the minimum hash value of the set under a specific hash function
	  - Repeate under several hash functions
	  - 
<u>Formally:</u>
1) let $A$ be a set and $h$ a hash function.
2) Compute :
$$\text{min}_h(A) = \min \{ h(x) : x \in A \}$$
3) use serveral $h_1, h_2, \cdots h_n \mapsto \text{signature}$ 	
$$\text{Sig}(A) = [\min_{x \in A} h_1(x), \min_{x \in A} h_2(x), ..., \min_{x \in A} h_k(x)]$$
<u>Property</u>
Let $A, B \subseteq U$ be finite sets. $\pi: U \to \{1, \dots, |U|\}$ be a uniform random permutation. Define the MinHash function as: $\text{MinHash}_\pi(S) = \arg\min_{x \in S} \pi(x)$
Then: $\Pr[\text{MinHash}_\pi(A) = \text{MinHash}_\pi(B)] = \frac{|A \cap B|}{|A \cup B|}$
<u>Proof</u>
Let $C = A \cap B$ and $D = A \cup B$
Let $m(S) := \text{MinHash}_\pi(S)$
WTS: $\Pr[m(A) = m(B)]$ or 
 
 Claim: $m(A) = m(B) \iff m(D) \in C$
 Proof of claim:
1. m(A) is the element of A with smallest index under π
2. m(B) is the element of B with smallest index under π
3. If $m(A)=m(B)=x$, then $x \in A \cap B = C$, and $x = m(D)$ because it’s the smallest in the union.
4. Conversely, if $Cm(D) \in C$ then it’s in both A and B, so the minimal element of A and BB is equal.

$\pi$ is a random uniform distribution
Lets order the elements of $D = \{d_1, \dots, d_{|D|}\}$. The first elemetn under pi is uniformly random
This:
$$\Pr[m(D) \in C] = \frac{|C|}{|D|} = \frac{|A \cap B|}{|A \cup B|}$$
By step 2: 
$$\Pr[m(A) = m(B)]$$

<u>Uses</u>
- [[Shingling]] + MinHash for near-duplicate web page detection.
- [[ Locality Sensitive Hashing (LSH)]] uses MinHash signatures for fast candidate retrieval.
- Clustering and search in high-dimensional sparse data.


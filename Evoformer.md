The Evoformer is the main representation-processing architecture in AlphaFold2. It
combines evolutionary information from a multiple sequence alignment with pairwise
relationships between protein residues.

It maintains an MSA representation: $m \in \mathbb{R}^{S \times N \times C_m}$
Here, \(S\) is the number of aligned sequences, \(N\) is the number of residues, and \(C_m\) is the MSA feature dimension.

It also maintains a pair representation: $z \in \mathbb{R}^{N \times N \times C_z}$
Here, \(z_{ij}\) represents the learned relationship between residues \(i\) and \(j\).

Each Evoformer block contains:
1. MSA row attention
2. MSA column attention.
3. An outer-product mean update.
4. Outgoing and incoming triangle multiplication.
5. Starting-node and ending-node triangle attention.
6. A pair transition network.


**MSA Row**
Are you stupid...
**MSA Column**
Are you stupid...

**Outer-product mean**
The outer-product mean transfers information from the MSA representation into the pair representation.

For each sequence s, the MSA features at positions i and j are projected:
$a_{s,i} = W_a m_{s,i} \qquad b_{s,j} = W_b m_{s,j}$
Their [[Outer-product]] is: $a_{s,i} \otimes b_{s,j}$

Unlike a dot product, which produces one number, an outer product produces a matrix containing every pairwise interaction between the feature channels at positions \(i\) and \(j\).
These matrices are averaged across the aligned sequences into matrix $o_{ij}$
The result is projected and added to the pair?! representation:
$$
z_{ij}^{\mathrm{new}}
=
z_{ij}
+
W_o o_{ij}
$$

This gives \(z_{ij}\) a learned summary of how features at positions \(i\) and \(j\) co-occur across the protein family. It is related to evolutionary covariance, although it is a learned uncentered feature interaction rather than a conventional covariance calculation.

 **Triangle updates**
After receiving information from the [[MSA]], the pair representation is updated through
triangle operations.

For residues \(i\), \(j\), and \(k\), relationships \(i\)-\(k\) and \(k\)-\(j\) provide information about relationship \(i\)-\(j\):
$(i,k) + (k,j) \longrightarrow (i,j)$

A simplified triangle multiplication update is:
$$
z_{ij}^{\mathrm{new}}
=
z_{ij}
+
f\left(
\sum_k
g(z_{ik})
\odot
h(z_{kj})
\right)
$$

Triangle attention performs a similar update using attention instead of elementwise multiplication.
These operations encourage the pair representation to form a geometrically consistent network of residue relationships.
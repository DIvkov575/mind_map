A set endowed with a "[[Group Actions]]" (an operation) which is (obviously Closed) and has
- Identity
- Associative
- Inverse
Relevant Proprs

- maybe add some shit on acts on X...

- Symmetries because the whole point is that hte object remains the same eg. a square a square
- Symmetries becuase they can be composed and undone

### Applications/Properties
- [[Legrange Theorem]]
- [[Representation Theory]]
- [[Center (Group Theory)]] — the (always normal) subgroup of elements commuting with everything; measures how far $G$ is from abelian
### Main Classes
**Permutation Group**
 Given any set X and a collection G of [[Bijection]]s of X into itself (known as permutations) that is closed under compositions and inverses, G is a group acting on X.
 ~ take any $g_1, g_2 \in G$ then their composition still a permute
 ~ if X consists of n elements and G consists of all permutations, G is the [[Symmetric Group (S_n)]]
 ~ Every finite group embeds in some $S_n$ ([[Cayley Theorem]])

**Matrix / Linear Groups**
Elements are invertible matrices over a field (or ring), operation is matrix multiplication.
- [[Linear Group GL(n)]] all invertible $n\times n$ matrices.
- $SL_n(F)$ — determinant 1.
- $O(n)$ / $SO(n)$ — orthogonal (preserve a symmetric bilinear form / length); $SO(n)$ is the rotation subgroup.
- $U(n)$ / $SU(n)$ — unitary (complex, preserve Hermitian form).
- $Sp(2n)$ — symplectic (preserve an alternating form).
- Every finite group also embeds in some $GL_n$ (via its regular representation), so this class is universal too.

**Additive / arithmetic groups**
Elements are numbers, operation is ordinary addition or multiplication.
- $(\mathbb{Z}, +)$, $(\mathbb{Z}_n, +)$, $(\mathbb{R}, +)$, $(\mathbb{Q}, +)$.
- $(\mathbb{R}^, \times)$, $(\mathbb{C}^, \times)$, $(\mathbb{Z}/n\mathbb{Z})^*$ — nonzero elements under multiplication.

**Geometric / transformation groups**
Elements are symmetries of a geometric object, operation is composition of transformations.
- [[Dihedral Group (D_2n)]] symmetries of a regular $n$-gon.
- [[Isometry Group]] rigid motions of a space (translations + rotations + reflections), e.g. $\mathrm{Isom}(\mathbb{R}^n)$.
- [[Point Group]] / space groups — crystallographic symmetry groups (chemistry/physics).
- [[Braid groups B_n]] — braidings of $n$ strands.

**Automorphism groups**
Elements are structure-preserving self-maps of some object, operation is composition.
- $\mathrm{Aut}(G)$ for a group $G$, $\mathrm{Aut}(\text{graph})$, Galois groups $\mathrm{Gal}(K/F)$ (automorphisms of a field extension fixing the base field).

**Quotient / coset groups**
Elements are equivalence classes ([[Coset]]s) rather than "concrete" objects directly.
- $G/N$ for normal subgroup $N$ — e.g. $\mathbb{Z}/n\mathbb{Z}$ is technically in this class before you reinterpret it arithmetically.

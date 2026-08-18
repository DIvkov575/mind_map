A group is a set $G$ with a binary operation $\cdot:G\times G\to G$ that is **closed** and satisfies three axioms:

- **Associativity** — $(a\cdot b)\cdot c=a\cdot(b\cdot c)$ for all $a,b,c\in G$.
- **Identity** — there is $e\in G$ with $e\cdot a=a\cdot e=a$ for all $a$.
- **Inverses** — every $a\in G$ has some $a^{-1}\in G$ with $a\cdot a^{-1}=a^{-1}\cdot a=e$.

The identity and each inverse are unique. If the operation also commutes ($a\cdot b=b\cdot a$) the group is **abelian**.

**Intuition: symmetry**

A group is the algebra of the symmetries of an object — the transformations that leave it looking the same. This is why the axioms are the ones they are: symmetries can be *composed* (associativity), *doing nothing* is a symmetry (identity), and any symmetry can be *undone* (inverses). Composition is generally order-dependent, which is precisely why non-abelian groups are the interesting ones. A group meets the object it is the symmetry of through a [[Group Actions|group action]] $G\times X\to X$; the [[Center (Group Theory)|center]] measures how far $G$ is from abelian.

### Applications / properties
- [[Legrange Theorem]] — a subgroup's order divides the group's order.
- [[Representation Theory]] — realize abstract elements as concrete linear maps.
- [[Center (Group Theory)]] — the (always normal) subgroup of elements commuting with everything.
- [[Lie Groups]] — groups that are also [[Smooth Manifold|smooth manifolds]]; their infinitesimal structure is a [[Lie Algebra]].

### Main classes

**Permutation groups.** Given a set $X$ and a collection $G$ of [[Bijection]]s $X\to X$ closed under composition and inverse, $G$ is a group acting on $X$. If $X$ has $n$ elements and $G$ is *all* permutations, $G$ is the [[Symmetric Group (S_n)]]. Every finite group embeds in some $S_n$ ([[Cayley Theorem]]).

**Matrix / linear groups.** Invertible matrices over a field under multiplication.
- [[Linear Group GL(n)]] — all invertible $n\times n$ matrices; $SL_n(F)$ — determinant $1$.
- $O(n)$ / $SO(n)$ — preserve a symmetric [[Bilinear Form]] (length); $SO(n)$ is the rotation subgroup, e.g. per-residue rotation frames in protein structure are elements of $SO(3)$. Infinitesimally these are [[(SO_n) Simple Orthogonal Lie Algebra|so(n)]].
- $U(n)$ / $SU(n)$ — unitary (preserve a Hermitian form).
- $Sp(2n)$ — symplectic (preserve an [[Alternating (form)|alternating]] form); infinitesimally [[(SP_n) Simple Symplectic Lie Algebra|sp(2n)]].
- Every finite group also embeds in some $GL_n$ (regular representation), so this class is universal too.

**Additive / arithmetic groups.** Numbers under addition or multiplication: $(\mathbb Z,+)$, $(\mathbb Z_n,+)$, $(\mathbb R,+)$, $(\mathbb Q,+)$; and $(\mathbb R^\times,\times)$, $(\mathbb C^\times,\times)$, $(\mathbb Z/n\mathbb Z)^\times$ under multiplication. See [[Additive group]], [[Cyclic Group]].

**Geometric / transformation groups.** Symmetries of a geometric object under composition.
- [[Dihedral Group (D_2n)]] — symmetries of a regular $n$-gon.
- [[Isometry Group]] — rigid motions of a space, e.g. $\mathrm{Isom}(\mathbb R^n)$.
- [[Point Group]] / space groups — crystallographic symmetry groups.
- [[Braid groups B_n]] — braidings of $n$ strands.

**Automorphism groups.** Structure-preserving self-maps under composition: $\mathrm{Aut}(G)$, $\mathrm{Aut}(\text{graph})$, Galois groups $\mathrm{Gal}(K/F)$.

**Quotient / coset groups.** Elements are [[Coset]]s rather than concrete objects: $G/N$ for a normal subgroup $N$ — e.g. $\mathbb Z/n\mathbb Z$ sits here before being reinterpreted arithmetically.

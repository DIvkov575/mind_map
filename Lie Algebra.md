[[Algebra]]
F-vector space L together with bilinear map [-,-] the Lie bracket
$$L\times L \to L, \quad (x,y)\mapsto xy$$ satisfying
$[x,x]=0$ and [[Jacobi Identity]]
The lie bracket is often referred to as the "commutator"
antisymmetry $[x,y] = -[y,x]$ is implied

???
Are Ideals Unique
???








**Ideal**
Idea of Lie algebra $L$ is a subspace $I$ such that $$[x,y]\in I \quad\forall x\in L~y \in I$$Assume $I, J \in L$ and that $I,J$ are ideals
- $I \cap J$ and $I + J$ are both ideals


**Center $Z(L)$ definition**
A center is a type of idea such that
$$Z(L) = \{ x \in L ~|~ [x,y]=0 \quad\forall y\in L \}$$

**Adjoint Homomorphism**
if $L$ is a lie algebra, we define 
$ad: L \to gl(L)$ by $(ad~x)(y) \coloneqq [x,y]$
- Linearity of $ad~x$ follow from [[Bilinear Form|bi-linearity]] of Lie brackets; the inverse is linear for similar reasons
- for homomorphism, we must check: $$ad([x,y]) = ad~x \circ ad~y - ad~y \circ ad~x \quad(\forall x,y)$$

this turns out to be equivalent to the [[Jacobi Identity]]
the kernel of ad turns out to be the centre of L


**Derivation**
Let $A$ be an algebra over $F$. A derivation of $A$ is a $F$-linear map $D: A \to A$ such that $$D(a,b) = aD(b) + D(a)b\quad \forall a,b \in A$$
let $Der A$ be the set of all derivations. The set is closed under vector addition and scalar multiplication and contains the zero map; hence it is a subspace of $gl(A)$. $Der A$ is a lie algebra (if D,E are derivation, then $[D, E]$ is too)

**Structure Constants**
If $L$ is a lie algebra over $F$ with basis $(x_1 \dots x_n$)$ then $[-,-]$ is completely determined by structure constants (with respect to basis) $a_{ij}^k \in F$ such that $$[x_i,x_j] = \sum_{k=1}^n a_{ijk} x_k$$
Consider $SL_2$ = span({ 0100 0010 100-1}) 
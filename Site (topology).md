generalization of a **[[topological space]]** for the purposes of sheaf theory
## Topological space**

A **topological space** X is a set with a collection of open sets O(X) satisfying:
1. $\emptyset, X \in \mathcal{O}(X)$
2. Arbitrary unions of open sets are open
3. Finite intersections of open sets are open

This gives the usual notion of “covering” $U = \bigcup_i U_i$​, which is used in the classical sheaf condition.
A **sheaf on X** is then a [[presheaf]] on O(X) satisfying the [[sheaf condition]] with respect to open covers.

---

## 2. **Site**

A **site** (C,J) consists of:
1. A **category** C
2. A **[[Grothendieck topology]] J**, which tells you what “covers” are
    
Key points:
- Objects of C generalize “open sets”
- [[Morphisms]] generalize “inclusions of open sets”
- A **cover** of an object $U \in \mathcal{C}$ is a collection of morphisms $\{U_i \to U\}$ satisfying axioms similar to open covers:
    1. [[isomorphism]] cover
    2. Pullbacks of covers are covers        
    3. Composition of covers is a cover

A **[[sheaf]] on a site** is a presheaf on C that satisfies the sheaf condition with respect to the specified covers.
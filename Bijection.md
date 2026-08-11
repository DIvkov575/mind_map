A function $f: A \to B$ that is both injective (one-to-one: $f(a_1)=f(a_2) \implies a_1=a_2$) and surjective (onto: every $b\in B$ has some $a$ with $f(a)=b$).

- has a well-defined inverse $f^{-1}: B \to A$
- $|A| = |B|$ when a bijection exists between them (this is how cardinality of infinite sets is compared)

**Where it shows up**
- [[Disjoint Union]] in [[Category Theory]] is defined only [[up to]] a bijection — the coproduct is unique up to a canonical bijection, not literally one fixed set
- a **permutation** of a set $X$ is exactly a bijection $X \to X$ — the [[Symmetric Group (S_n)]] is the group of all bijections of an $n$-element set under composition, per [[Groups]]
- normalizing flows are literally built from a chain of learned bijections (invertible, differentiable maps) — see [[Normalizing Flows]]

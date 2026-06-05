




 **Math BS**

All encodings can be characterized by a [[One-parameter group]]

Let’s suppose we have a time series of queries $q(t): \mathbb{R} \to \mathbb{R}^d$, and a time series of keys $k(t): \mathbb{R} \to \mathbb{R}^d$. We write q and k as functions of time so that we can accomomdate contiuous or irregularly sampled inputs, but we could just as well restrict ouservles to only intger times if we prefer. time is just an increasing quantity (eg. sequence index or literal elpased time, learned notino of time ([[Mamba Models]]))

For computational efficiency we modify queries and keys (instead of each pairwise dot rpoduct). 
Use $f: \mathbb{R} \times \mathbb{R}^d \to \mathbb{R}^d$ and $g: \mathbb{R} \times \mathbb{R}^d \to \mathbb{R}^d$.
Set $Q(s) = f(s, q(s))$, $K(s) = g(t, k(t))$ such that attention scores become $$Q(s)^{\top}K(t)$$

Properties of good positional encodigns
- Linearity: not justifiable (but assumption from [Jane Street Blog](https://blog.janestreet.com/using-group-theory-to-explore-positional-encodings-attention/) bc vector spaces)
	Ensures that we can write $f(s,q(s)) = F(s)q(s)$ with F being a square matrix and our attention compute is $$Q(s)^{\top}K(s) = q(s)^{\top}F(s)^\top G(t)k(t)$$
- Translational invariance (relative pos): for and $s$ and $t$ we have $$F(s)^\top G(t) = F(t-s)^\top G(0)$$ we also assume $F(t)^\top G(t) = I$ (F,G on 0 + translation). Let $A(t) = F(t)^\top G(0)$; then $A(s)A(t) = A(s+t)$
- Continuity $A(t)$ is a continuous function of t There are discontinuous functions that satisfy our constraints, but they require the [[Axiom of Choice]] to describe and are far too deranged to implement on a physical computer.

 

A smooth [[Manifold]] of dimension $n$ is a [[Topological Space]] $M$ equipped with an 
atlas (a collection of charts ${(U_\alpha, \varphi_\alpha)}$)  satisfying
1. Charts. Each $U_\alpha \subseteq M$ is open, the $U_\alpha$ cover $M$ , and each $\varphi_\alpha: U_\alpha \to \varphi_\alpha(U_\alpha) \subseteq \mathbb{R}^n$ is a [[Homeomorphism]] onto an open subset of $\mathbb{R}^n$.
2. Smooth compatibility. Whenever two charts overlap ($U_\alpha \cap U_\beta \neq \emptyset$), the transition map
$$\varphi_\beta \circ \varphi_\alpha^{-1}: \varphi_\alpha(U_\alpha\cap U_\beta) \to \varphi_\beta(U_\alpha\cap U_\beta)$$
	is a $C^\infty$ ([[Smooth]]) map between open subsets of $\mathbb{R}^n$ — and since its inverse is the analogous transition map the other way, it's automatically a [[Diffeomorphism]].
3. Underlying point-set conditions (usually required so the space behaves reasonably): $M$ is [[Hausdorff]] and second-countable (or [[Paracompact]]) — this rules out pathologies like a line with a doubled point.
$M$ together with a maximal such atlas (i.e. every chart smoothly compatible with the atlas is thrown in) is a smooth manifold. 
Two atlases giving the same maximal atlas define the same smooth structure.

Why each clause matters
- Charts alone (just homeomorphisms to $\mathbb{R}^n$, condition 1, no compatibility) give a topological manifold — locally Euclidean, but with no way to say a function is "differentiable" globally, since that would depend on which chart you used.
- Smooth transition maps are exactly what fixes this: they let you declare $f: M \to \mathbb{R}$ smooth iff $f \circ \varphi_\alpha^{-1}$ is smooth in every chart, and the compatibility condition guarantees this doesn't depend on which chart $\alpha$ you picked. Without it, "smooth" would be ill-defined.
- Hausdorff + second-countable guarantee things like: limits of sequences are unique, partitions of unity exist (crucial for integration, Riemannian metrics, gluing local constructions into global ones), and the manifold embeds in some $\mathbb{R}^N$ (Whitney).

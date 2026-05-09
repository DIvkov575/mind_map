 set of points in a high-dimensional space can be embedded into a space of much lower dimension in such a way that distances between the points are nearly preserved. In the classical proof of the lemma, the embedding is a random orthogonal projection
 
 Give ${\displaystyle 0<\varepsilon <1}$ a set of X of N points in $\mathbb{R}^n$ and an integer integer ${\displaystyle k>8(\ln N)/\varepsilon ^{2}}$, there is a linear map ${\displaystyle f:\mathbb {R} ^{n}\rightarrow \mathbb {R} ^{k}}$ such that (for all ${\displaystyle u,v\in X}$)
 $${\displaystyle (1-\varepsilon )\|u-v\|^{2}\leq \|f(u)-f(v)\|^{2}\leq (1+\varepsilon )\|u-v\|^{2}}$$
 $${\displaystyle (1+\varepsilon )^{-1}\|f(u)-f(v)\|^{2}\leq \|u-v\|^{2}\leq (1-\varepsilon )^{-1}\|f(u)-f(v)\|^{2}}$$
 which looks an awful lot like.. so... for ${\displaystyle \varepsilon \in (0,1)}$ and ${\displaystyle k\geq 15(\ln N)/\varepsilon ^{2}}$ exists linear function ${\displaystyle f:\mathbb {R} ^{n}\rightarrow \mathbb {R} ^{k}}$ such that the restrictino ${\displaystyle f|_{X}}$ is ${\displaystyle (1+\varepsilon )}$-[[Bi-lipschitz function]]


Exists embedding function f which (for all $u,v$) preserves distances within ($1 \pm \varepsilon$)

The classical proof of the lemma takes $f$ to be a scalar multiple of an orthogonal projection P![{\displaystyle P}](https://wikimedia.org/api/rest_v1/media/math/render/svg/b4dc73bf40314945ff376bd363916a738548d40a) onto a random subspace of dimension k in $\mathbb{R}^n$ An orthogonal projection collapses some dimensions of the space it is applied to, which reduces the length of all vectors, as well as distance between vectors in the space. Under the conditions of the lemma [[concentration of measures]] ensures there is a nonzero chance that a random orthogonal projection reduces pairwise distances between all points in $X$ by roughly a constant factor $c$  Since the chance is nonzero, such projections must exist, so we can choose one $P$ and set ${\displaystyle f(v)=Pv/c}$

Distributional JL Lemma. 
Lemma states that for any ${\displaystyle 0<\varepsilon ,\delta <1/2}$  and positive integer 
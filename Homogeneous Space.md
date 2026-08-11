Very informally, a space that looks the same everywhere as one moves through it, with movement given by the [[Group Actions|action]] of a [[Groups|group]]

Homogeneous spaces occur in the theories of [[Lie Groups]], algebraic groups and topological groups.


Homogeneous space for a group $G$ is a [[Non-Empty]] manifold or topological space $X$ on which G acts transitively (The action of G on X s called _transitive_ if for any two points $x,y \in X$ there exists a $g \in G$ so that $g \cdot x = y$). The elements of $G$ are called the symmetries of X.



**Formal Definition**
Let _X_ be a non-empty set and _G_ a group. Then _X_ is called a _G_-space if it is equipped with an action of _G_ on _X_. Note that automatically _G_ acts by automorphisms (bijections) on the set. If _X_ in addition belongs to some [[Category Theory|category]], then the elements of _G_ are assumed to act as automorphisms in the same category. That is, the maps on _X_ coming from elements of _G_ preserve the structure associated with the category (for example, if _X_ is an object in **Diff** then the action is required to be by [diffeomorphisms](https://en.wikipedia.org/wiki/Diffeomorphism "Diffeomorphism")). A homogeneous space is a _G_-space on which _G_ acts transitively.

If _X_ is an object of the category **C**, then the structure of a _G_-space is a [homomorphism](https://en.wikipedia.org/wiki/Homomorphism "Homomorphism"):

ρ:G→AutC(X)![{\displaystyle \rho :G\to \mathrm {Aut} _{\mathbf {C} }(X)}](https://wikimedia.org/api/rest_v1/media/math/render/svg/f88ecd042dbee1872e2bd143f9c8356bb1951d2b)

into the group of [automorphisms](https://en.wikipedia.org/wiki/Automorphism "Automorphism") of the object _X_ in the category **C**. The pair (_X_, _ρ_) defines a homogeneous space provided _ρ_(_G_) is a transitive group of symmetries of the underlying set of _X_
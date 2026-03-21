The manifold hypothesis is that natural data forms lower-dimensional manifolds in its embedding space. There are both theoretical[3](https://colah.github.io/posts/2014-03-NN-Manifolds-Topology/#fn3) and experimental[4](https://colah.github.io/posts/2014-03-NN-Manifolds-Topology/#fn4) reasons to believe this to be true. If you believe this, then the task of a classification algorithm is fundamentally to separate a bunch of tangled manifolds.

There is an [[Ambient Isotopy]] between the input and a network layer’s representation if
a) W isn’t singular
b) we are willing to permute the neurons in the hidden layer
c) there is more than 1 hidden unit.

[[Knot Theory]]

--- 
"Easy Way Out"

The natural thing for a neural net to do, the very easy route, is to try and pull the manifolds apart naively and stretch the parts that are tangled as thin as possible.
![](https://colah.github.io/posts/2014-03-NN-Manifolds-Topology/img/tangle.png)
It would present itself as very high derivatives on the regions it is trying to stretch, and sharp near-discontinuities.
[[Contractive Penalties]], penalizing the derivate
Note: great results can be still achieved from these local optima (from a accuracy perspective), however it fails to detangle the underlying objects topolgoicaly
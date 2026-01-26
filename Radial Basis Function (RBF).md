is a function whose value depends only on the distance from a center point
formally:
$\phi(x) = \phi(\|x - c\|)$
where
- $x \in \mathbb{R}^d$ is the input,
- $c \in \mathbb{R}^d$ is a center,
- ∥⋅∥ is typically the Euclidean norm.
Core:
- Are like localized bumps
Good for:
- interpolation
- function approximation
- kernel methods
- localized feature representations.


**[[Kernel]] Methods:** 
- RBF defines a kernel $k(x,x') = \phi(\|x - x'\|)$
- Eg. Gaussian RBF Kernel $k(x,x') = \exp\!\left(-\frac{\|x-x'\|^2}{2\sigma^2}\right)$

*[[Wavlets]]*:
- RBFS are localized in space/time -> Wavelts also in scale.
- Wavelets form multiscale bases.
mathematical model used in describing synchronization. 
behavior of a large set of coupled [[Oscillators]]

- coupled arrays of [[Josephson Junctions]] followed model
Assumptions
- weak coupling, 
- oscillators are identical or nearly identical
- interactions depend sinusoidally on the phase difference between each pair of objects.


**Def**
In the most popular version of the Kuramoto model, each of the oscillators is considered to have its own intrinsic natural frequency $\omega_i$, and each is coupled equally to all other oscillators. Surprisingly, this fully nonlinear model can be solved exactly in the limit of infinite oscillators, N → ∞; alternatively, using self-consistency arguments, one may obtain steady-state solutions of the order parameter.The most popular form of the model has the following governing equations:

$$\frac{d\theta _{i}}{dt}=\omega _{i}+{\frac {1}{N}}\sum_{j=1}^{N}K_{ij}\sin(\theta _{j}-\theta _{i}),\qquad i=1\ldots N,$$where the system is composed of _N_ limit-cycle oscillators, with phases θi![{\displaystyle \theta _{i}}](https://wikimedia.org/api/rest_v1/media/math/render/svg/302b19204ed378e99ff4575341a67eebdbe5a555) and coupling constant _K_.

Noise can be added to the system. In that case, the original equation is altered to
\* just add a $\zeta_{i }$ term to rate of change 


**Transformations**
The transformation that allows this model to be solved exactly (at least in the _N_ → ∞ limit) is as follows: Define the "order" parameters _r_ and _ψ_ as
$$re^{i\psi }={\frac {1}{N}}\sum _{j=1}^{N}e^{i\theta _{j}}$$
Here _r_ represents the phase-[[Coherent States|coherence]]of the population of oscillators and _ψ_ indicates the average phase. Substituting in the equation gives
![{\displaystyle {\frac {d\theta _{i}}{dt}}=\omega _{i}+Kr\sin(\psi -\theta _{i})}](https://wikimedia.org/api/rest_v1/media/math/render/svg/7ab8ade41fcc05e5d6fc806c1c149bf77417e709)
Thus the oscillators' equations are no longer explicitly coupled; instead the order parameters govern the behavior. A further transformation is usually done, to a rotating frame in which the statistical average of phases over all oscillators is zero (i.e. ψ=0![{\displaystyle \psi =0}](https://wikimedia.org/api/rest_v1/media/math/render/svg/7eca9b06e607571768c9b79cb231a9997308c4e6)). Finally, the governing equation becomes
![{\displaystyle {\frac {d\theta _{i}}{dt}}=\omega _{i}-Kr\sin(\theta _{i})}](https://wikimedia.org/api/rest_v1/media/math/render/svg/cf9b554002cbe1489d4a4a21112ec0d12a40ca11)




**Connection to Hamiltonian**
The dissipative Kuramoto model is contained[14] in certain conservative [[Hamiltonian systems]] with [[Hamiltonian]] of the form
$${\mathcal {H}}(q_{1},\ldots ,q_{N},p_{1},\ldots ,p_{N})=\sum _{i=1}^{N}{\frac {\omega _{i}}{2}}(q_{i}^{2}+p_{i}^{2})+{\frac {K}{4N}}\sum _{i,j=1}^{N}(q_{i}p_{j}-q_{j}p_{i})(q_{j}^{2}+p_{j}^{2}-q_{i}^{2}-p_{i}^{2})$$
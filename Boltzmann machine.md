- Uses [[Hebian Learning]] rule
- [[Sherrington–Kirkpatrick]] with external field
- Stochastic [[Ising Model]] (a type of [[Stochastic Neural Network (SNN)]])

It is also classified as a [[Markov Random Field]]
- Parallelisable and ressemble physical processes
- Constrained versions (not fully connected) are sufficiently efficent to solve problems
- [[Sampling function]] resembles botlzmann distribution

Structure
---
A Boltzmann machine, like a [[Sherrington–Kirkpatrick]] model, is a network of units with a total "energy" ([Hamiltonian](https://en.wikipedia.org/wiki/Hamiltonian_function "Hamiltonian function")) defined for the overall network. Its units produce [binary](https://en.wikipedia.org/wiki/Binary_number "Binary number") results. Boltzmann machine weights are [stochastic](https://en.wikipedia.org/wiki/Stochastic "Stochastic"). The global energy E![{\displaystyle E}](https://wikimedia.org/api/rest_v1/media/math/render/svg/4232c9de2ee3eec0a9c0a19b15ab92daa6223f9b) in a Boltzmann machine is identical in form to that of [Hopfield networks](https://en.wikipedia.org/wiki/Hopfield_network "Hopfield network") and [Ising models](https://en.wikipedia.org/wiki/Ising_model "Ising model"):

![{\displaystyle E=-\left(\sum _{i<j}w_{ij}\,s_{i}\,s_{j}+\sum _{i}\theta _{i}\,s_{i}\right)}](https://wikimedia.org/api/rest_v1/media/math/render/svg/419a4966dae86dfb786dbeb6aadd3c38d9ec30d3)

Where:

- wij![{\displaystyle w_{ij}}](https://wikimedia.org/api/rest_v1/media/math/render/svg/d3302ff355269436b43bc2fbe180303881c09321) is the connection strength between unit j![{\displaystyle j}](https://wikimedia.org/api/rest_v1/media/math/render/svg/2f461e54f5c093e92a55547b9764291390f0b5d0) and unit i![{\displaystyle i}](https://wikimedia.org/api/rest_v1/media/math/render/svg/add78d8608ad86e54951b8c8bd6c8d8416533d20).
- si![{\displaystyle s_{i}}](https://wikimedia.org/api/rest_v1/media/math/render/svg/cfda82668232cbdc0874ed28ab8b6079420d1ffe) is the state, si∈{0,1}![{\displaystyle s_{i}\in \{0,1\}}](https://wikimedia.org/api/rest_v1/media/math/render/svg/f9da1e0bc5f6f9d7f021287963bbb8b3ada491df), of unit i![{\displaystyle i}](https://wikimedia.org/api/rest_v1/media/math/render/svg/add78d8608ad86e54951b8c8bd6c8d8416533d20).
- θi![{\displaystyle \theta _{i}}](https://wikimedia.org/api/rest_v1/media/math/render/svg/302b19204ed378e99ff4575341a67eebdbe5a555) is the bias of unit i![{\displaystyle i}](https://wikimedia.org/api/rest_v1/media/math/render/svg/add78d8608ad86e54951b8c8bd6c8d8416533d20) in the global energy function. (−θi![{\displaystyle -\theta _{i}}](https://wikimedia.org/api/rest_v1/media/math/render/svg/183e14708810963ae88dbef1ab84f12367bc8574) is the activation threshold for the unit.)

Often the weights ![{\displaystyle w_{ij}}](https://wikimedia.org/api/rest_v1/media/math/render/svg/d3302ff355269436b43bc2fbe180303881c09321) are represented as a symmetric matrix $W=[w_{ij}]$ with zeros along the diagonal.

**Increment**
---
The difference in the global energy that results from a single unit i![{\displaystyle i}](https://wikimedia.org/api/rest_v1/media/math/render/svg/add78d8608ad86e54951b8c8bd6c8d8416533d20) equaling 0 (off) versus 1 (on), written ΔEi![{\displaystyle \Delta E_{i}}](https://wikimedia.org/api/rest_v1/media/math/render/svg/aa40fa108e21d148e5a39c6202cf9a2ee69cb1cb), assuming a symmetric matrix of weights, is given by:

![{\displaystyle \Delta E_{i}=\sum _{j>i}w_{ij}\,s_{j}+\sum _{j<i}w_{ji}\,s_{j}+\theta _{i}}](https://wikimedia.org/api/rest_v1/media/math/render/svg/4cad4ed8631921945d7056276eaeb5e0246e7ce2)

This can be expressed as the difference of energies of two states:

$\displaystyle \Delta E_{i}=E_{\text{i=off}}-E_{\text{i=on}}$
Substituting the energy of each state with its relative probability according to the [Boltzmann factor](https://en.wikipedia.org/wiki/Boltzmann_factor "Boltzmann factor") (the property of a [Boltzmann distribution](https://en.wikipedia.org/wiki/Boltzmann_distribution "Boltzmann distribution") that the energy of a state is proportional to the negative log probability of that state) yields:

${\displaystyle \Delta E_{i}=-k_{B}T\ln(p_{\text{i=off}})-(-k_{B}T\ln(p_{\text{i=on}})),}$

where kB![{\displaystyle k_{B}}](https://wikimedia.org/api/rest_v1/media/math/render/svg/70f38f7b73e53fd7b5d9ca64bec3a1438cc0eade) is the [Boltzmann constant](https://en.wikipedia.org/wiki/Boltzmann_constant "Boltzmann constant") and is absorbed into the artificial notion of temperature T![{\displaystyle T}](https://wikimedia.org/api/rest_v1/media/math/render/svg/ec7200acd984a1d3a3d7dc455e262fbe54f7f6e0). Noting that the probabilities of the unit being _on_ or _off_ sum to 1![{\displaystyle 1}](https://wikimedia.org/api/rest_v1/media/math/render/svg/92d98b82a3778f043108d4e20960a9193df57cbf) allows for the simplification:

−ΔEikBT=−ln⁡(pi=on)+ln⁡(pi=off)=ln⁡(1−pi=onpi=on)=ln⁡(pi=on−1−1),![{\displaystyle -{\frac {\Delta E_{i}}{k_{B}T}}=-\ln(p_{i={\text{on}}})+\ln(p_{i={\text{off}}})=\ln {\Big (}{\frac {1-p_{i={\text{on}}}}{p_{i={\text{on}}}}}{\Big )}=\ln(p_{i={\text{on}}}^{-1}-1),}](https://wikimedia.org/api/rest_v1/media/math/render/svg/7355672491b6d4939c8d254e94fff9987705e089)

whence the probability that the i![{\displaystyle i}](https://wikimedia.org/api/rest_v1/media/math/render/svg/add78d8608ad86e54951b8c8bd6c8d8416533d20)-th unit is given by

pi=on=11+exp⁡(−ΔEikBT),![{\displaystyle p_{i={\text{on}}}={\frac {1}{1+\exp {\Big (}-{\frac {\Delta E_{i}}{k_{B}T}}{\Big )}}},}](https://wikimedia.org/api/rest_v1/media/math/render/svg/ab6a2114bd73162013561f5c136569c57bdf88fe)

where the [scalar](https://en.wikipedia.org/wiki/Scalar_\(physics\) "Scalar (physics)") T![{\displaystyle T}](https://wikimedia.org/api/rest_v1/media/math/render/svg/ec7200acd984a1d3a3d7dc455e262fbe54f7f6e0) is referred to as the [temperature](https://en.wikipedia.org/wiki/Temperature "Temperature") of the system. This relation is the source of the [logistic function](https://en.wikipedia.org/wiki/Logistic_function "Logistic function") found in probability expressions in variants of the Boltzmann machine.
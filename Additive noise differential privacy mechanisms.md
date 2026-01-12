Formally, a randomized algorithm AAA is **(ϵ,δ)(\epsilon, \delta)(ϵ,δ)-differentially private** if for all datasets DDD and D′D'D′ differing in **one record**, and for all outputs SSS:

$\Pr[A(D) \in S] \le e^\epsilon \Pr[A(D') \in S] + \delta$

- ϵ\epsilonϵ (epsilon) controls **privacy loss**. Smaller ϵ\epsilonϵ → stronger privacy.
    
- δ\deltaδ allows a small probability of failure (often set to near zero).

**Additive noise differential privacy mechanisms** are a class of techniques used to ensure differential privacy when releasing the results of computations on sensitive datasets. They work by adding carefully calibrated random noise, drawn from specific probability distributions, to the true output of a function. This added noise obscures the influence of any single individual's data, thereby protecting their privacy while still allowing for meaningful statistical analysis.

## Sensitivity

Both mechanisms require that the sensitivity of a query function first be determined. The sensitivity is the amount that the result of the query can be changed by adding or removing a person's data from the dataset, where "a person" is any possible person. For queries that count the number of people who meet a requirement, the sensitivity is 1.

### Formal Definition

Here is the formal definition of sensitivity.

Let ![{\displaystyle {\mathcal {D}}}](https://wikimedia.org/api/rest_v1/media/math/render/svg/3277962e1959c3241fb1b70c7f0ac6dcefebd966) be a collection of all datasets and ![{\displaystyle f\colon {\mathcal {D}}\to \mathbb {R} }](https://wikimedia.org/api/rest_v1/media/math/render/svg/0aa61ba39e68adee055ca451b83f57cee5c1e562) be a real-valued function. The _sensitivity_ of a function, denoted ![{\displaystyle \Delta f}](https://wikimedia.org/api/rest_v1/media/math/render/svg/ff38db24bc80b80a0a1ecfce75f3dca3fc79d54e), is defined by

![{\displaystyle \Delta f=\max |f(x)-f(y)|,}](https://wikimedia.org/api/rest_v1/media/math/render/svg/5e43b0e2cc23ef3bd30c2621e90f8f9d4656f766)

where the maximum is over all pairs of datasets ![{\displaystyle x}](https://wikimedia.org/api/rest_v1/media/math/render/svg/87f9e315fd7e2ba406057a97300593c4802b53e4) and ![{\displaystyle y}](https://wikimedia.org/api/rest_v1/media/math/render/svg/b8a6208ec717213d4317e666f1ae872e00620a0d) in ![{\displaystyle {\mathcal {D}}}](https://wikimedia.org/api/rest_v1/media/math/render/svg/3277962e1959c3241fb1b70c7f0ac6dcefebd966) differing in at most one element. For functions with higher dimensions, the sensitivity is usually measured under ![{\displaystyle \ell _{1}}](https://wikimedia.org/api/rest_v1/media/math/render/svg/361ddd720474aa41cb05453e03424fb7999d3b02) or ![{\displaystyle \ell _{2}}](https://wikimedia.org/api/rest_v1/media/math/render/svg/85a4571ee9be10bd3c9df2480ab3d280f99e801a) norms

Throughout this article, ![{\displaystyle {\mathcal {M}}}](https://wikimedia.org/api/rest_v1/media/math/render/svg/2cc2abebd45ec020509a0ec548b67c9a2cb7cecd) is used to denote a randomized algorithm that releases a sensitive function ![{\displaystyle f}](https://wikimedia.org/api/rest_v1/media/math/render/svg/132e57acb643253e7810ee9702d9581f159a1c61) under theϵ![{\displaystyle \epsilon }](https://wikimedia.org/api/rest_v1/media/math/render/svg/c3837cad72483d97bcdde49c85d3b7b859fb3fd2)- (or ![{\displaystyle (\epsilon ,\delta )}](https://wikimedia.org/api/rest_v1/media/math/render/svg/7c713274f5fc4c0c8a1a8e561c72314c0c5f0db6)-) differential privacy.

### Mechanisms
[[Laplace Privacy Mechanism]]


Point symetrical exponential
### PDF

A [random variable](https://en.wikipedia.org/wiki/Random_variable "Random variable") has a ![{\displaystyle \operatorname {Laplace} (\mu ,b)}](https://wikimedia.org/api/rest_v1/media/math/render/svg/84a352ac6180e1eb627bbb602cdf799c3f32165f) distribution if its [probability density function](https://en.wikipedia.org/wiki/Probability_density_function "Probability density function") is

![{\displaystyle f(x\mid \mu ,b)={\frac {1}{2b}}e^{-{\frac {|x-\mu |}{b}}},}](https://wikimedia.org/api/rest_v1/media/math/render/svg/c185d944371a7f1e8a681414b8bf59a1dc6f94c0)

where μ![{\displaystyle \mu }](https://wikimedia.org/api/rest_v1/media/math/render/svg/9fd47b2a39f7a7856952afec1f1db72c67af6161) is a [location parameter](https://en.wikipedia.org/wiki/Location_parameter "Location parameter"), and b>0![{\displaystyle b>0}](https://wikimedia.org/api/rest_v1/media/math/render/svg/94436473a90bd55191a79c59474cb5456dcbec00), which is sometimes referred to as the "diversity", is a [scale parameter](https://en.wikipedia.org/wiki/Scale_parameter "Scale parameter"). If μ=0![{\displaystyle \mu =0}](https://wikimedia.org/api/rest_v1/media/math/render/svg/3753282c0ad2ea1e7d63f39425efd13c37da3169) and b=1![{\displaystyle b=1}](https://wikimedia.org/api/rest_v1/media/math/render/svg/3f55bc77dec8088791b5c1ed51e634cc1b431fd0), the positive half-line is exactly an [exponential distribution](https://en.wikipedia.org/wiki/Exponential_distribution "Exponential distribution") scaled by 1/2.

The probability density function of the Laplace distribution is also reminiscent of the [normal distribution](https://en.wikipedia.org/wiki/Normal_distribution "Normal distribution"); however, whereas the normal distribution is expressed in terms of the squared difference from the mean μ![{\displaystyle \mu }](https://wikimedia.org/api/rest_v1/media/math/render/svg/9fd47b2a39f7a7856952afec1f1db72c67af6161), the Laplace density is expressed in terms of the [absolute difference](https://en.wikipedia.org/wiki/Absolute_difference "Absolute difference") from the mean. Consequently, the Laplace distribution has fatter tails than the normal distribution. It is a special case of the [generalized normal distribution](https://en.wikipedia.org/wiki/Generalized_normal_distribution "Generalized normal distribution") and the [hyperbolic distribution](https://en.wikipedia.org/wiki/Hyperbolic_distribution "Hyperbolic distribution"). Continuous symmetric distributions that have exponential tails, like the Laplace distribution, but which have probability density functions that are differentiable at the mode include the [logistic distribution](https://en.wikipedia.org/wiki/Logistic_distribution "Logistic distribution"), [hyperbolic secant distribution](https://en.wikipedia.org/wiki/Hyperbolic_secant_distribution "Hyperbolic secant distribution"), and the [Champernowne distribution](https://en.wikipedia.org/wiki/Champernowne_distribution "Champernowne distribution").

### Cumulative distribution function

The Laplace distribution is easy to [integrate](https://en.wikipedia.org/wiki/Integral "Integral") (if one distinguishes two symmetric cases) due to the use of the [absolute value](https://en.wikipedia.org/wiki/Absolute_value "Absolute value") function. Its [cumulative distribution function](https://en.wikipedia.org/wiki/Cumulative_distribution_function "Cumulative distribution function") is as follows:

![{\displaystyle {\begin{aligned}F(x)&=\int _{-\infty }^{x}\!\!f(u)\,\mathrm {d} u={\begin{cases}{\frac {1}{2}}\exp \left({\frac {x-\mu }{b}}\right)&{\mbox{if }}x<\mu \\1-{\frac {1}{2}}\exp \left(-{\frac {x-\mu }{b}}\right)&{\mbox{if }}x\geq \mu \end{cases}}\\&={\tfrac {1}{2}}+{\tfrac {1}{2}}\operatorname {sgn} (x-\mu )\left(1-\exp \left(-{\frac {|x-\mu |}{b}}\right)\right).\end{aligned}}}](https://wikimedia.org/api/rest_v1/media/math/render/svg/ccf10b637d7607634f10654738db1f58e1ee26a7)

The inverse cumulative distribution function is given by

![{\displaystyle F^{-1}(p)=\mu -b\,\operatorname {sgn} (p-0.5)\,\ln(1-2|p-0.5|).}](https://wikimedia.org/api/rest_v1/media/math/render/svg/8037a7e9d5b7ccab0644ab975a75c7a07877c892)

## Properties

### Moments

μr′=(12)∑k=0r[r!(r−k)!bkμ(r−k){1+(−1)k}].![{\displaystyle \mu _{r}'={\bigg (}{\frac {1}{2}}{\bigg )}\sum _{k=0}^{r}{\bigg [}{\frac {r!}{(r-k)!}}b^{k}\mu ^{(r-k)}\{1+(-1)^{k}\}{\bigg ]}.}](https://wikimedia.org/api/rest_v1/media/math/render/svg/f540fc2de6f6c39a9471f37e38c7883a932354df)

| Laplace                                                                                                                                                                                                                                                                                                                           |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Probability density function<br><br>[![Probability density plots of Laplace distributions](https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Laplace_pdf_mod.svg/330px-Laplace_pdf_mod.svg.png)](https://en.wikipedia.org/wiki/File:Laplace_pdf_mod.svg "Probability density plots of Laplace distributions")             |
| Cumulative distribution function<br><br>[![Cumulative distribution plots of Laplace distributions](https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Laplace_cdf_mod.svg/330px-Laplace_cdf_mod.svg.png)](https://en.wikipedia.org/wiki/File:Laplace_cdf_mod.svg "Cumulative distribution plots of Laplace distributions") |
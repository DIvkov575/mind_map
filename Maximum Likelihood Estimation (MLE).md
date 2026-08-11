- How do I maximize the probability of seeing this data  $p_\theta(\text{data})$?
- MLE method for estimating the parameters of a statistical model from observed data [[Parameter Estimation]] — judged against the properties [[Estimator Theory]] cares about (bias, variance, consistency, efficiency).
- Given data + family of distributions indexed by parameters θ, pick the θ that makes the observed data most probable. 

**Formally:** 
You have data $x_1, \dots, x_n$ assumed drawn i.i.d. from a distribution $p(x \mid \theta)$. 
The likelihood function is $L(\theta) = \prod_{i=1}^n p(x_i \mid \theta)$  the joint probability (density) of seeing this exact data, as a function of θ. 
MLE picks $\hat\theta = \arg\max_\theta L(\theta)$
In practice you maximize the log-likelihood instead, since products of small probabilities underflow and logs turn products into sums: $$\ell(\theta) = \sum_{i=1}^n \log p(x_i \mid \theta)$$ Same maximizer, easier calculus (take derivative, set to 0, solve). 


**Concrete example** 
Gaussian mean: If $x_i \sim \mathcal{N}(\mu, \sigma^2)$, maximizing $\ell(\mu)$ over $\mu$ gives $\hat\mu = \frac{1}{n}\sum x_i$ — the sample mean. 
That's why "average" is the MLE for a Gaussian mean. 
**Coin flip example**: If you flip a coin $n$ times and see $k$ heads, modeling each flip as Bernoulli(p), the MLE is $\hat p = k/n$ — just the observed frequency. 
That falls straight out of maximizing $\binom{n}{k}p^k(1-p)^{n-k}$. 
**Why it matters:** It's the backbone of most statistical model fitting — logistic regression, many neural net loss functions (e.g., cross-entropy loss is negative log-likelihood for a categorical distribution) are MLE in disguise. 
It has nice asymptotic properties: under regularity conditions, MLE is consistent (converges to true θ as n→∞) and asymptotically efficient (achieves the lowest possible variance among unbiased estimators, per the [[Cramér-Rao Bound]])
It can be biased for finite samples (e.g., MLE for variance divides by $n$, not $n-1$). 

Contrast with [[MAP]] (Bayesian): MLE maximizes $p(\text{data}\mid\theta)$ alone; Maximum A Posteriori maximizes $p(\theta \mid \text{data}) \propto p(\text{data}\mid\theta)p(\theta)$ — i.e., MLE plus a prior. MLE is the special case of MAP with a flat (uninformative) prior.


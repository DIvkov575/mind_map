

### Bayes Rule
$$
p_\theta(z\mid x) = \frac{p_\theta(x\mid z),p(z)}{p_\theta(x)}
$$

### Posterior/Prior

**Prior** $p(\theta)$: 
The distribution over an unknown/unobserved quantity $\theta$ assumed or specified before incorporating any observed data. 
It's an input to a Bayesian model — a modeling choice or existing belief, not derived from the current observation.

**Posterior** $p(\theta\mid x)$: 
The distribution over that same unknown quantity after conditioning on observed data $x$, obtained via Bayes' rule:

$$
p(\theta\mid x) = \frac{p(x\mid\theta),p(\theta)}{p(x)}, \qquad p(x) = \int p(x\mid\theta),p(\theta),d\theta
$$

The posterior is prior belief revised by evidence — it reweights the prior by how well each $\theta$ explains the observed $x$ (the likelihood $p(x\mid\theta)$), then renormalizes by $p(x)$.

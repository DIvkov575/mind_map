Fisher information quantifies the **local sensitivity of a likelihood to a parameter**, i.e., how sharply the model distinguishes nearby parameter values.

For $X \sim p(x \mid \theta)$,

score:
$s(\theta) = \partial_\theta \log p(X \mid \theta)$

fisher information:
$\mathcal{I}(\theta) = \mathbb{E}\big[s(\theta)^2\big]= -\mathbb{E}\big[\partial_\theta^2 \log p(X \mid \theta)\big]$'


- It is the **curvature of log-likelihood in expectation**
- Equivalently, the **variance of the score**
- Measures how fast distributions $p(X|\theta)$ change with $\theta$

For large $\mathcal{I}(\theta)$
- distributions $p(x|\theta)$ and $p(x|\theta+\epsilon)$ are easily distinguishable
- parameter is identifiable with low noise
For small $\mathcal{I}(\theta)$
- nearby parameters induce similar distributions
- high intrinsic estimation uncertainty

Local KL expansion $\implies$ Fisher information is the [[Riemannian metric]] induced by [[Kullback-Leibler Divergence|KL]]
$$\mathrm{KL}(p_{\theta} \,\|\, p_{\theta+\delta})= \tfrac{1}{2}\delta^\top \mathcal{I}(\theta)\,\delta + o(\|\delta\|^2)$$
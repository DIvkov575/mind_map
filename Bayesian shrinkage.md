statistical technique where you **regularize estimates by “shrinking” them toward a prior belief**

Given data:
$y_i \sim \mathcal{N}(\theta_i, \sigma^2)$
Prior:
$\theta_i \sim \mathcal{N}(\mu_0, \tau^2)$

**Posterior mean (shrinkage estimator):**
$\hat{\theta}_i = \mathbb{E}[\theta_i \mid y_i] = \frac{\tau^2}{\sigma^2+\tau^2} y_i + \frac{\sigma^2}{\sigma^2+\tau^2} \mu_0$

- Noisy observations $y_i$ are **shrunk toward the prior mean** $\mu_0$
- Shrinkage weight: $w = \frac{\tau^2}{\sigma^2+\tau^2}$
    - Large $\sigma^2$ → more shrinkage toward prior        
    - Large $\tau^2$ → more weight on data


**Connection:** Ridge regression = Bayesian shrinkage with $\mu_0 = 0$
1. **Bayesian shrinkage:**
- Suppose you’re estimating parameters β from noisy data.
- You assume a **prior**: $\beta \sim \mathcal{N}(0, \tau^2 I)$
- After seeing data yyy, the **posterior estimate** “shrinks” β toward 0:
	$\hat{\beta}_{\text{Bayes}} = \arg\min_\beta \|y - X\beta\|^2 + \frac{\sigma^2}{\tau^2} \|\beta\|^2$

1. **[[Ridge regularization (L2)]]:**
- Ridge regression also minimizes:
	$\hat{\beta}_{\text{ridge}} = \arg\min_\beta \|y - X\beta\|^2 + \lambda \|\beta\|^2$
- Compare to Bayesian formula: $\lambda = \sigma^2 / \tau^2$
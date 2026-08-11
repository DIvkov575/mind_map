
We preform [[Maximum Likelihood Estimation (MLE)]] to maximize $p_\theta(x)$ over latent distribution, which yields.

$$
p_\theta(x) = \int p(z),p_\theta(x\mid z),dz, \qquad p(z)=\mathcal{N}(0,I)
$$
$$
p_\theta(x\mid z) = \mathcal{N}(x\mid \mu_\theta(z),\Sigma_\theta(z))
$$


$\mu_\theta$ is a nonlinear network, hence $p_\theta(x\mid z)$ can't be merged/collapsed into closed-form itnegral
Two consequences:
- you can't evaluate $p_\theta(x)$
- [[Bayes|Bayes' rule]] you also can't get the true [[Bayes|posterior]] $p_\theta(z\mid x) = p_\theta(x\mid z)p(z)/p_\theta(x)$, since it shares the same intractable normalizer.
	- In other words we cant see how incorrect our assumption about the latent prior is (by using bayes rule to get another latent back)
Note. 
- you can still sample posterior $p_\theta(z \mid x)$
- can still sample $p_\theta(x)$ and $(x \mid z)$
- The intractability bad only when you need $p_\theta(x)$ as a training signal.

**Variational posterior and the ELBO**
Introduce a [[Variational Inference (VI)|variational]] posterior $q_\phi(z\mid x)=\mathcal{N}(z\mid\mu_\phi(x),\Sigma_\phi(x))$ to approximate the true posterior. 
For any $q_\phi$, this decomposition is an identity (substitute Bayes' rule into $\log p_\theta(x) = \mathbb{E}{q\phi}[\log p_\theta(x)]$ and rearrange):

$$
\log p_\theta(x) = \underbrace{\mathbb{E}{q\phi(z\mid x)}[\log p_\theta(x\mid z)] - D_{KL}(q_\phi(z\mid x),|,p(z))}
$$
$$
{\text{ELBO }\mathcal{L}(\theta,\phi;x)} ~+~ D{KL}(q_\phi(z\mid x),|,p_\theta(z\mid x))
$$

The last term measures how far the variational posterior is from the true one — uncomputable, but a [[Kullback-Leibler (KL) Divergence]] is always $\geq 0$. 
Dropping it turns the identity into a bound: $\mathcal{L}$ is the [[Evidence Lower Bound Optimization (ELBO)|evidence lower bound]]?. 
Maximizing $\mathcal{L}$ maximizes a computable floor under the incomputable marginal likelihood, and simultaneously minimizes the gap $D_{KL}(q_\phi|p_\theta(z\mid x))$ 

$$
\mathcal{L}(\theta,\phi;x) = \underbrace{\mathbb{E}{q\phi(z\mid x)}[\log p_\theta(x\mid z)]}{\text{reconstruction}} - \underbrace{D{KL}(q_\phi(z\mid x),|,p(z))}_{\text{prior-matching}}
$$

The prior-matching term is the one with no counterpart in a plain [[Auto Encoder]]: it constrains $q_\phi(z\mid x_i)$ toward the same prior $p(z)$ for every $x_i$, so that [[Ancestral Sampling]]? from $p(z)$ at generation time lands in a region the decoder actually saw during training.


**Reparameterization**
The reconstruction term is an expectation under $q_\phi$, estimated by one [[Monte Carlo]] draw $z\sim q_\phi(z\mid x)$ — but sampling isn't differentiable w.r.t. $\phi$. Reparameterize:
$$
z = \mu_\phi(x) + \Sigma_\phi(x)^{1/2}\epsilon, \qquad \epsilon\sim\mathcal{N}(0,I)
$$
moving the stochasticity into a parameter-free $\epsilon$ so $\nabla_\phi$ flows through $\mu_\phi,\Sigma_\phi$ directly.



### Issues
**Bluriness**
Prior-matching pulls every $q_\phi(z\mid x_i)$ toward one shared $p(z)$, and the Gaussian decoder's log-likelihood reduces to an MSE reconstruction term.
MSE is minimized by the conditional mean of the target given $z$.
When multiple training $x_i$ map to overlapping regions of $z$-space, that conditional mean averages over them, producing blur — the same mode-averaging behavior as any regression trained under a unimodal-Gaussian likelihood, occurring here at the level of the decoder given $z$.

Solution
[[Autoregressive Models]] provide crisp generations
[[Generative Adversarial Network (GAN)]] forget likelihood estimation
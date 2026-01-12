- A type of [[Stochastic Neural Network (SNN)]]
- Not to be confused [[Bayesian Networks (BN)]]

A **Bayesian Neural Network (BNN)** is a neural network in which the **weights (and possibly biases)** are treated as **random variables with probability distributions**, rather than fixed parameters.

---
## 1. Core Idea

Standard NN:

y=f(x;W),W fixedy = f(x; W), \quad W \text{ fixed}y=f(x;W),W fixed

Bayesian NN:

y=f(x;W),W∼p(W)y = f(x; W), \quad W \sim p(W)y=f(x;W),W∼p(W)

You infer a **posterior distribution over weights**:

p(W∣D)∝p(D∣W) p(W)p(W \mid \mathcal{D}) \propto p(\mathcal{D} \mid W)\, p(W)p(W∣D)∝p(D∣W)p(W)

Predictions marginalize over weights:

$p(y \mid x, \mathcal{D}) = \int p(y \mid x, W)\, p(W \mid \mathcal{D})\, dW$

---

## 2. Why Bayesian?

BNNs provide **uncertainty estimates**:
- **Epistemic uncertainty**: lack of data / model uncertaint
- **Aleatoric uncertainty**: noise in data (can be modeled explicitly)
This is the main motivation.

## 4. Inference (the hard part)

Exact inference is intractable. Approximations are used.

### Variational Inference (most common)

Approximate posterior:

qθ(W)≈p(W∣D)q_\theta(W) \approx p(W \mid \mathcal{D})qθ​(W)≈p(W∣D)

Optimize ELBO:

L=Eq(W)[log⁡p(D∣W)]−KL(q(W)∥p(W))\mathcal{L} = \mathbb{E}_{q(W)}[\log p(\mathcal{D} \mid W)] - \mathrm{KL}(q(W)\|p(W))L=Eq(W)​[logp(D∣W)]−KL(q(W)∥p(W))
Examples
- Mean-field Gaussian
- Bayes by Backprop
- Variational dropout

### Sampling-based
- [[Hamiltonian Monte Carlo]] ([[Monte Carlo]])
- [[SG-MCMC]]
More accurate, less scalable.

---

## 5. Prediction

Monte Carlo approximation:

p(y∣x,D)≈1K∑k=1Kp(y∣x,W(k))W(k)∼q(W)p(y \mid x, \mathcal{D}) \approx \frac{1}{K} \sum_{k=1}^K p(y \mid x, W^{(k)}) \quad W^{(k)} \sim q(W)p(y∣x,D)≈K1​k=1∑K​p(y∣x,W(k))W(k)∼q(W)

Mean → prediction  
Variance → uncertainty
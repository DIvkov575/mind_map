[[Inference]] & [[Calculus of Variations|Variance]]
Variational inference is concerned with using 


VI is the application of that general idea to one particular problem: approximate an intractable posterior. The "function" being searched over is a probability distribution $q(\theta)$, and the "functional" being optimized is the KL divergence to the true posterior (equivalently, the ELBO):



**Variational Inference**
Given some target distribution $p(\cdot)$ that is intractable to work with directly (usually because it has an unnormalizable/intractable normalizing constant), variational inference approximates it by optimization: pick a family $\mathcal{Q}$ of tractable candidate distributions, and search within that family for the member $q$ closest to $p$, typically measured by [[Kullback-Leibler (KL) Divergence]]:
$$
q^* = \arg\min_{q \in \mathcal{Q}} D_{KL}(q ,|, p)
$$

This reframes "compute an intractable distribution" as "solve an optimization problem over a restricted space of distributions" 
Two independent design choices go into any VI setup:
- $\mathcal{Q}$, the variational family — how expressive your approximation is allowed to be (e.g. "all Gaussians," "factorized/mean-field distributions"). 
	- This is a modeling/computational choice, not a probabilistic prior.
- $p$, the target distribution — whatever intractable object you're trying to approximate.



--- 
**Variational posterior** The $q^*$ that VI produces, in the specific case where the intractable target $p$ happens to be a [[Bayes|posterior]] distribution....
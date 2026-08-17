See [[Continuous Normalizing Flows (CNFs)]] and [[Discrete Normalizing Flows (DNFs)]]


A normalizing flow is any invertible transformation of a random variable:
	$$ x \leftrightarrow z$$
with tractable density change via change-of-variables:
$$\log p(x) = \log p(z) + \log | \det\frac{z}{x}|$$

So “flow” = transporting a probability distribution through an invertible map.


“normalizing” refers to transforming a complicated probability distribution into a simple, standard one (or vice versa) in a way that properly preserves probability mass.
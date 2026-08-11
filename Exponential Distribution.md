The distribution of the waiting time until the next event in a process where events occur continuously and independently at a constant average rate — the continuous-time analogue of the geometric distribution.

$$
f(x \mid \lambda) = \lambda e^{-\lambda x}, \quad x \geq 0
$$

- $\lambda$ is the rate parameter; mean and standard deviation are both $1/\lambda$.
- **Memoryless**: $P(X > s+t \mid X > s) = P(X > t)$ — the distribution of remaining waiting time doesn't depend on how long you've already waited. The exponential is the *only* continuous distribution with this property.
- Restricting a [[Laplace distribution]] to its positive half ($\mu=0$) and rescaling by $1/2$ recovers exactly the exponential distribution — the Laplace is, in that sense, "two exponential tails glued back-to-back at the mode," which is also why it has the same sharp (non-differentiable) peak at the mode that a one-sided exponential has at $x=0$.

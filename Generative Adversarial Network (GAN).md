Learn a generator $G(z)$ mapping a simple noise $z \sim p_0$ to data by competing with a discriminator $D(x)$ that distinguishes between real and fakes.

Shortcomings:
- Instability: can fail to converge 
- Mode collapse: Generator ignores part of the data distribution
- Hard to compute probability of a sample
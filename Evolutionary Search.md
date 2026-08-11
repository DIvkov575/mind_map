Optimization by maintaining a population of candidate solutions and iterating: evaluate fitness, select the best, and produce the next generation via mutation and/or recombination of the survivors — no gradient required.

**Core loop**
1. Initialize a population of candidate solutions (random, or seeded).
2. Evaluate each candidate's fitness (the objective being optimized).
3. Select survivors — proportional to fitness, tournament selection, or truncation (keep only the top-k).
4. Produce the next generation: mutate survivors (small random perturbation) and/or recombine pairs of survivors (crossover — swap or blend parts of two candidates).
5. Repeat until convergence or a generation budget is exhausted.

**Why use it over gradient-based optimization**
- the objective doesn't need to be differentiable, or even continuous — candidates can be discrete structures (graphs, programs, sequences), not just real-valued vectors
- naturally explores a diverse set of solutions in parallel (the whole population), which helps escape local optima that a single gradient-following trajectory would get stuck in
- the tradeoff: far more objective evaluations needed than a gradient step would require, since there's no local-derivative information guiding the search — this generally makes it impractical for objectives that are expensive to evaluate at scale (e.g. training a full neural network per candidate) unless the population size and generation count are kept small

**Variants**
- **Genetic algorithms**: candidates encoded as discrete "chromosomes" (bit strings, trees), crossover operates on that encoding directly
- **Evolution strategies (ES)**: candidates are real-valued vectors, mutation is Gaussian perturbation, selection is often based on rank rather than raw fitness — closer in spirit to a gradient-free approximation of gradient descent
- **CMA-ES**: an evolution strategy that additionally adapts its own mutation covariance matrix over generations, learning the local shape of the fitness landscape as it searches

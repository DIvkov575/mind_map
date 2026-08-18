No canonical definition — a cluster of competing operationalizations, each fit to what its field needs to measure.

**The families**
- **Psychometric** (Spearman, Cattell, Carroll) — the latent factor $g$ extracted from the positive correlation among all cognitive test scores. Statistical, not mechanistic: whatever makes performance on unrelated tasks covary. Split into *fluid* (novel reasoning) and *crystallized* (stored knowledge). Strong predictive validity, but defines the thing by its instrument.
- **Adaptive/behavioral** (Binet, Wechsler, Sternberg) — goal-directed adaptation to environment; "capacity to act purposefully, think rationally, deal effectively with the environment."
- **Formal** (Legg & Hutter 2007) — surveyed ~70 published definitions and distilled: *ability to achieve goals in a wide range of environments*. Formalized as $$\Upsilon(\pi) = \sum_{\mu \in E} 2^{-K(\mu)}\, V^{\pi}_{\mu}$$ expected reward of policy $\pi$ over all computable environments $\mu$, weighted by Kolmogorov complexity so simpler environments count more. Makes *generality* explicit; uncomputable by construction — a definition, not a test.
- **Efficiency** (Chollet 2019) — not what you can do but how little prior and experience it took to become able to do it. See [[Sample Efficiency]]; this is what ARC-AGI targets.
- **Biological/ecological** — flexible fitness-relevant behavior, explicitly *not* one scale: octopus, corvid and human cognition aren't points on a line.

**Three axes — every definition is a position on these**
- **Capability** — which tasks can be solved. Benchmarks, $g$.
- **Efficiency** — at what data/compute cost. A lookup table with every answer scores perfectly here at zero efficiency; most benchmark critiques reduce to this.
- **Generality** — over how wide a task space. Stockfish is superhuman at one point, zero over the space.

Most "is an LLM intelligent" arguments are people using different axes while agreeing on the facts. A fourth split is **behavior vs. mechanism**: functionalist definitions score outputs, mechanistic ones demand particular internal processes (world models, causal reasoning).

**Working definition**
The efficiency with which an agent converts experience into competence across a broad, unknown distribution of goals.
- Testable in the ways that matter (hold experience fixed, vary novelty, measure transfer), separates skill from the capacity to acquire skill, smuggles in no mechanism.
- Weakness: "broad distribution" is a free parameter, and whoever picks the distribution picks the winner. No definition escapes this — priors are unavoidable ([[Inductive Bias]]), which is Chollet's point and No Free Lunch restated.

**Consequence**: distrust any single-number intelligence claim, human or machine, that doesn't state its task distribution and its experience budget. See [[Evals]].

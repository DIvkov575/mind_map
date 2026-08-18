Competence gained per unit of experience — the *derivative*, not the level. The leading candidate for the efficiency axis of [[Intelligence]].

**Why it's load-bearing**
Capability is cheap to fake: memorize enough and you pass any fixed benchmark. Sample efficiency can't be faked by scale alone — it requires the priors you carry to actually match the structure of the world.
- Human children acquire grammar from ~$10^7$ words; LLMs need ~$10^{12}$–$10^{13}$. Comparable endpoint competence, ~5 orders of magnitude apart in the derivative. That gap is the real claim about human intelligence.

**Chollet's form**
$$I \;\propto\; \frac{\text{generalization difficulty}}{\text{priors} + \text{experience}}$$
The denominator is the whole point: you may not move cost from experience into priors and call the result intelligence. Pretraining *is* prior, so few-shot performance alone doesn't count unless the pretraining is charged for.

**Three problems as a definition**
- **Priors and samples are fungible.** Enough baked-in structure makes any learner look sample-efficient on the tasks that structure fits. The accounting boundary is a convention, not a fact — evolution paid for human priors over ~$10^9$ years, and excluding that is a choice.
- **Only defined relative to a task distribution.** No Free Lunch: universal sample efficiency doesn't exist.
- **Necessary, not sufficient.** A system can be sample-efficient and narrow; efficiency without generality is specialization.

**Contrast with statistical efficiency**
[[Estimator Theory]]'s notion has a provable floor — the model class is fixed and known, so [[Fisher Information]] $\mathcal{I}(\theta)$ is computable and the [[Cramér-Rao Bound]] gives a denominator. Sample efficiency in learning has no analogue: the "model" is an unknown task distribution and the priors go unaccounted. That missing denominator is why parameter estimation has a settled definition of efficiency and learning-efficiency claims stay contested.

**How it's actually improved**
- **Better priors** — architectural symmetry ([[Equivariance]], [[Geometric ML]]), and [[Inductive Bias]] generally. Buys samples with assumptions.
- **Better data** — curation, dedup, pruning; repeating data is near-free for ~4 epochs and worthless by ~16 (data-constrained scaling laws).
- **Simulated experience** — model-based RL: learn a world model, spend imagined samples instead of real ones.
- **Better-chosen data** — don't improve the estimator, choose which points to observe: [[Optimal Experimental Design (OED)]]. The only route that beats an information bound rather than approaching it, because it changes the design.
- **Trading other resources** — test-time compute and test-time training substitute inference for training data.

**Measurement caveat**
For any deployed model the effective sample count is unauditable: pretraining corpora contain the test distribution. "Learned from 3 examples" on a public benchmark is uninterpretable unless the task is genuinely novel relative to training. Hence the value of fixed-budget evaluations (BabyLM pins the word budget; ARC-AGI pins novelty) over self-reported numbers. See [[Evals]].

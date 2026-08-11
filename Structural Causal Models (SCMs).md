Model causal relationships explicitly using a graph (DAG) and structural equations.
**Applications:** Identification of causal effects, [[counterfactual reasoning]].
$Y=f(\text{parents}(Y),ϵ_Y​)$

Builds on the same DAG a [[Bayesian Networks (BN)|Bayesian network]] uses, but adds structural equations on top of the bare conditional-independence factorization — this is what lets an SCM support interventions ($\mathrm{do}(\cdot)$) and counterfactuals that a plain BN cannot.

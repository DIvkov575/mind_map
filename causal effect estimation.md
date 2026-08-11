Estimating the effect of a treatment/intervention $X$ on an outcome $Y$ from observational data, controlling for confounders — the target quantity of the [[Counterfactual Framework]].

**Core difficulty**: only one of (treated, untreated) outcome is observed per unit — the other is a counterfactual. Naive correlation between $X$ and $Y$ conflates the causal effect with confounding.

**Approaches**
- **Variable/feature selection**: include all measured covariates, but use regularization/balancing to avoid amplifying bias from irrelevant or collinear covariates — see [[Ridge regularization (L2)]] / Lasso for regularized causal regression
- **Representation learning**: learn a latent representation of covariates under which treatment assignment is balanced (TARNet, DragonNet)
- **Double Machine Learning (DML)**: learns nuisance functions for outcome and treatment separately, then combines them into a causal-effect estimate that's robust to nuisance-model error (a doubly-robust estimator)
- **Meta-learners** (T/S/X-learner) for heterogeneous treatment effects when the causal structure isn't precisely known

Also appears as a downstream step after explicit causal discovery (inferring the causal graph itself) — see [[TSA Causal Relationship Mining]] for a time-series-specific pipeline. Contrast [[Granger Causality]], a much weaker (purely predictive, non-interventional) notion of "causality" specific to time series — it doesn't require the confounder-control machinery above, but also doesn't answer the same question.

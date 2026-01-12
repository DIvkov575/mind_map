**Counterfactuals** are statements or quantities about **what would have happened if something had been different**.




### counterfactually aware
Making a model **counterfactually aware** means it can reason about what _would have happened_ under a different action or treatment—essentially predicting outcomes under **unobserved interventions**.

1) Predict multiple outcomes per instance:
	$D = \{(X_i, T_i, Y_i)\}_{i=1}^N$
	- $X_i$​: covariates/features
	- $T_i$​: treatment or action
	- $Y_i$​: observed outcome
	Learn functions $f_t(X)$ that predict outcome under each treatment 
	- Instead of predicting a single Y, predict $Y^{(T=0)}, Y^{(T=1)}$ etc.
    - This gives the **individual treatment effect (ITE)**:
		$\tau(x) = Y^{(T=1)} - Y^{(T=0)}$
	
2) **Handle confounding**
	Adjust for variables that affect both T and Y
	Methods:
    - Propensity score weighting / matching
    - Backdoor adjustment using causal DAG
    - Representation balancing: learn embeddings of X where treatment assignment is independent of outcome.
    
3. **Counterfactual regularization**
    - Encourage the model to generalize to unobserved treatment assignments.
    - Examples:
        - **IPM / Wasserstein loss** between treated and control distributions in representation space.
        - Doubly robust loss combining outcome regression and propensity weighting.


    
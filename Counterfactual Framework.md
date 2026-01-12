Compare Y under treatment vs. no treatment, even though only one is observed (counterfactual).

**Methods:**
- **[[Propensity score methods]]:** Match, weight, or stratify by the probability of treatment given covariates.
- **[[Inverse probability weighting (IPW)]]:** Reweights samples to emulate randomized trials.
- **[[Doubly robust estimators]]:** Combine outcome modeling with propensity weighting.



### Process

1) explicit causal (graph) discovery [[causal discovery methods]]
	- **Constraint-based methods:** Look for conditional independencies in the data.
	    - Example: **[[PC algorithm]]**, **[[FCI]]** (handles latent confounders).
	- **Score-based methods:** Search for graphs that best explain the data with a scoring function.
	    - Example: [[**GES (Greedy Equivalence Search)**]]. 
	- **Functional Causal Models (FCM):** Fit functional relationships that imply causal direction.
	    - Example: [[**LiNGAM**]] for linear non-Gaussian data, [[**NOTEARS**]] for continuous variables.
2) Variable Selection for [[causal effect estimation]]
	- **LASSO / regularized regression for causal inference**
		- Example: Double Machine Learning (DML) learns nuisance functions for outcome and treatment to estimate causal effect robustly.
	- **Representation learning:** Learn a latent representation of all covariates where treatment assignment is balanced.
		- Example: TARNet, DragonNet.
3) [[Counterfactual Inference]]



heuristic
- Include all measured covariates but use **regularization / balancing** to mitigate bias.
- Use **[[meta-learners]] for heterogeneous treatment effects** (T-learner, S-learner, X-learner) to estimate counterfactuals without knowing exact causal structure.
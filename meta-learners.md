**meta-learners** are a family of methods for estimating **heterogeneous treatment effects** (HTEs), i.e., how the effect of a treatment varies across individuals or covariates X.

```
They’re called “meta” because they reuse standard supervised learning models (like regression, random forests, or neural networks) in clever ways to estimate counterfactual outcomes
```

## **2. Common Meta-Learners**

Meta-learners are strategies to compute τ(x)\tau(x)τ(x) using **base learners** (any regression model).
### **A. S-Learner (Single model)**
- Train **one model** f(X, T) to predict Y using both X and T as inputs.
- Estimate ITE as:
$\hat{\tau}(x) = f(x, T=1) - f(x, T=0)$

**Pros:** Simple, uses one model.  
**Cons:** May underfit heterogeneity, treatment effect signal can be small.

---

### **B. T-Learner (Two models)**
- Train **separate models** for each treatment group:

$f_0(X) \approx \mathbb{E}[Y \mid X, T=0], \quad f_1(X) \approx \mathbb{E}[Y \mid X, T=1]$

- ITE: $\hat{\tau}(x) = f_1(x) - f_0(x)$

**Pros:** Flexible, can specialize per treatment.  
**Cons:** Requires enough data in each group; can overfit small groups.

---

### **C. X-Learner**
- Refines T-learner for **imbalanced treatments** (e.g., far fewer treated than controls).
- Steps:
    1. Fit T-learner models $f_0, f_1$
    2. Compute imputed treatment effects for each individual.
    3. Fit models predicting these imputed effects from X.
- Final $\tau(x)$ is a weighted combination of the two.
    
**Pros:** Works well with imbalanced datasets.

---

### **D. R-Learner**

- Formulates ITE estimation as a **residual-on-residual regression**:
    
$Y - \hat{m}(X) = \tau(X)(T - \hat{e}(X)) + \epsilon$

- $\hat{m}(X) = \mathbb{E}[Y \mid X]$
- $\hat{e}(X) = \mathbb{E}[T \mid X]$ (propensity score)
- Then learn $tau(X)$ by regressing residual outcome on residual treatment.
    

**Pros:** Doubly robust, flexible, can incorporate ML models.

---

## **3. Summary Table**

|Learner|Number of models|When to use|Strengths|Weaknesses|
|---|---|---|---|---|
|S-Learner|1|Simple, balanced data|Easy to implement|May underfit heterogeneous effects|
|T-Learner|2|Enough data per treatment|Flexible, interpretable|Overfits small groups|
|X-Learner|3+|Imbalanced treatment|Handles imbalance, reduces variance|More complex|
|R-Learner|2|General-purpose|Doubly robust, flexible|Needs good nuisance estimates|
- **Constraint-based Methods**
    - Use conditional independence tests.
    - Example: **[[PC algorithm]]**, **[[FCI algorithm]]** (for latent confounders).
        
- **Score-based Methods**
    - Search over DAGs to maximize a score (likelihood + penalty).
    - Example: **[[GES (Greedy Equivalence Search)]]**.
        
- **Functional Causal Models**
    - Assume specific functional forms: e.g., linear, additive noise models.
    - Example: **[[LiNGAM]]** (Linear Non-Gaussian Acyclic Model).
        
- **Continuous Optimization / ML-based Methods**
    - Formulate DAG discovery as continuous optimization using neural networks.
    - Example: [[NOTEARS]], [[DAG-GNN]]
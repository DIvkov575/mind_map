- Identify a good [[learning rate (LR)]] range empirically instead of guessing.
- Pretty much grid search along exponentially increasing parameter within retraining between 'queries' 
- "Not" grid search bc you are observing stability rather than accuracy...

**procedure**
- Initialize the model with random weights.
- Train for a short run (10k-500k iteratinos)
- Start with a very small LR (e.g., 1e-7).
- Increase LR **exponentially** each step up to a large value (e.g., 1 or 10).
- Record loss vs. LR.
**How to choose LR**
- Plot loss vs. LR (log scale).
- Ignore the initial flat/noisy region.
- Find where loss starts decreasing sharply.
- Choose:
    - **Max LR**: just before loss explodes.
    - **Base LR**: ~3–10× smaller than max LR.
- For One-Cycle: use max LR as the peak LR.
    
**Interpretation**
- Loss decreases smoothly → model tolerates higher LR.
- Early divergence → LR too high.
- Very shallow decrease → under-parameterized or optimization issue.

**Why it works**  
LR acts like regularization; sweeping it reveals stability boundaries of the optimization landscape.
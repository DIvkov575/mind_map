An intervention-based [[Interpretability]] method for locating model activations that causally carry information needed for a behavior. It compares a clean run, a corrupted run, and runs where selected clean activations are restored inside the corrupted computation.

### 1. Corrupt the prompt

Create a minimal [[counterfactual reasoning|counterfactual]] that changes the relevant information while preserving structure:

```text
Clean:     The capital of France is → Paris
Corrupted: The capital of Germany is → Berlin
```

Prefer natural, token-aligned substitutions. Noise, masking, or deletion can create out-of-distribution inputs and confound the result.

### 2. Patch activations

1. Run the clean prompt and cache activations.
2. Run the corrupted prompt to establish a baseline.
3. Re-run the corrupted prompt, replacing one selected activation with its clean value.

For example, patch the residual stream at layer $\ell$ and token position $p$.

### 3. Measure recovery

For a target token and a contrast token, define a logit-difference score:

$$S = \operatorname{logit}(\text{Paris})-\operatorname{logit}(\text{Berlin}).$$

The raw patching effect is

$$E_{\ell,p}=S_{\text{patched}}-S_{\text{corrupt}},$$

and normalized recovery is

$$
R_{\ell,p}=
\frac{S_{\text{patched}}-S_{\text{corrupt}}}
     {S_{\text{clean}}-S_{\text{corrupt}}}.
$$

$R=0$ means no measured recovery; $R=1$ means the patch restores the clean score. The denominator becomes unstable when the clean and corrupted scores are nearly equal.

### 4. Sweep patch sites

- **Independent sweep:** patch each layer/token separately; best for localization.
- **Cumulative sweep:** patch layers $0\ldots\ell$; shows where recovery emerges but mixes interactions.
- **Sliding window:** patch several adjacent layers.
- **Coarse-to-fine:** residual stream → attention/MLP → individual heads or features.

A complete independent layer-token sweep requires

$$2 + L\times T$$

forward passes: one clean, one corrupted, and one per patch site. Patch runs can often be batched. Full generation rollouts are needed only when the measured behavior depends on generated sequences rather than next-token [[Logits]].

### Interpretation limits

A large recovery shows that the patched activation is causally sufficient to restore the chosen score in this counterfactual. It does not prove that the site is the unique mechanism: information may be distributed, redundant, or dependent on nonlinear interactions. Results should be checked across multiple clean/corrupted pairs and metrics.
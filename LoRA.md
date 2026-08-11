Low-Rank Adaptation — parameter-efficient [[Fine-Tuning]]: freeze the base model's weights, and add a small trainable low-rank update on top.

Instead of learning the full weight-update matrix $\Delta W \in \mathbb{R}^{d\times d}$ directly (e.g. $4096\times4096 = 16$M params), factor it as:
$$
\Delta W = BA, \qquad A \in \mathbb{R}^{r\times d},\ B \in \mathbb{R}^{d\times r}
$$
with rank $r \ll d$ (e.g. $r=16$: $4096\times16 + 16\times4096 \approx 130$K params — a ~100x reduction).

- forward pass uses $W + \Delta W = W + BA$ — the base $W$ is never touched, only $A,B$ are trained
- **scale** hyperparameter controls how strongly the adapter perturbs the base output; **dropout** on the adapter path regularizes it
- much cheaper to store/ship than a full fine-tune — many task-specific LoRA adapters can share one frozen base model

**Variants**
- **DoRA**: adds a per-column magnitude vector on top of LoRA's direction-only update, so the adapter can rescale a weight's magnitude independently of its direction — empirically closer to full fine-tuning
- **QLoRA**: LoRA combined with quantizing the frozen base weights (e.g. to 4-bit) to cut memory further

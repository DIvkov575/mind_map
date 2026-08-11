


### Types
**Full-precision** 
- retrains all weights everything
**[[LoRA]]**
- frozen base. + tiny low rank adapters
- Don't learn giant weight matrix W (say 4096×4096 = 16M params)
- Learn two skinny matrices A (4096×16) and B (16×4096) and add B·A to W. That "16" is your rank. 16M params → ~130K. scale controls how strongly the adapter perturbs the base; dropout regularizes it
**[[DoRA]]**
	- LoRA + ...
	- Learn a per-column magnitude vector, so the adapter can change how big a weight is separately from which direction it points — empirically closer to full fine-tuning
**[[QLoRA]]**
**[[QAT]]**


### Training Algos
#### A. Imitation
[[(SFT) Supervised fine-tuning]]
- Here prompt, Here Optimal response -> maximize probablility

#### B. Preference / [[Offline RL]]
You collect (prompt, chosen_reply, rejected_reply) triples. These push probability toward chosen and away from rejected — teaching taste, not just imitation.

[[(DPO) Direct Preference Optimization]]
Reframes  RLHF as classfication loss on chosen vs rejected?
No seperate reward model or RL loop

[[(ORPO) Odds Ratio PO]]
DPO's job fused into SFT in one step

[[(CPO) Contrastive PO]]

[[Online DPO]]

[[(XPO) eXtended PO]]


#### C. Online RL
You collect (prompt, chosen_reply, rejected_reply) triples. These push probability toward chosen and away from rejected — teaching taste, not just imitation.

[[(PPO) Proximal Policy Optimization]]
[[(GSPO) Group Sequence ]]
[[RLHF Reinforce+LKL]]
[[GRPO]]
[[DAPO]]
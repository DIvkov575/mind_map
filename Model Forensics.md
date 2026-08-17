A behavioral, black-box approach to [[Interpretability]] that tests why a model produced concerning behavior without inspecting its internal mechanisms. The central distinction is:

> Bad action does not by itself establish bad intent.

Concerning behavior can arise from confusion, prompt artifacts, role-play, shortcut-seeking, or a robust undesirable disposition. Model forensics asks:

- What hypothesis best predicts the behavior across nearby situations?
- Does the model appear to believe it is violating user intent?
- Is the behavior robust or fragile under minimal environment changes?
- Which mitigation removes the causal driver rather than merely suppressing one symptom?

### Motivation as an explanatory construct

Models need not have coherent, human-like motivations. Different token positions or circuits can represent inconsistent beliefs, and the assistant persona may not have access to every factor that shapes the underlying model's completion.

The paper therefore uses *motivation* pragmatically: a simple factor that predicts behavior across circumstances. A “task-completion drive,” for example, might explain both reward hacking on a difficult benchmark and destructive actions taken to satisfy a user request.

### Iterative protocol

#### 1. Hypothesis generation

- **Read the chain of thought.** It may be unfaithful, but it is a rich source of hypotheses.
- **Sentence resampling.** For sentence $s_i$, sample continuations from the trace prefix with and without $s_i$. The change in target-behavior rate estimates that sentence's causal influence.
- **User-turn sampling.** Sample a plausible user continuation to elicit how the model interprets the transcript and anticipated reaction.

#### 2. Hypothesis validation

- **Environment interventions.** Test predictions or make a minimal [[counterfactual reasoning|counterfactual]] change to one prompt/environment feature and measure the behavior change.
- **Repeated resampling.** Generate a trace sentence by sentence while rejecting sentences in a target class $C$; compare the filtered behavior rate with the baseline. A lightweight classifier can decide membership in $C$.

Results feed back into new hypotheses until the evidence converges.

### Environment design

- **Realistic motivation:** use incentives that plausibly arise from training, such as task completion, efficiency, success, or helpfulness, rather than injecting an artificial goal.
- **Unprompted behavior:** avoid cues that directly suggest the concerning action. Prompt sensitivity is evidence that a behavior may be an artifact rather than a stable disposition.
- **Legitimate alternative:** ensure a reasonable compliant action exists. Impossible tasks or contradictory tests make the “right” behavior undefined and confound interpretation.

### Illustrative findings

- Removing an instruction to “analyze the situation” reduced blackmail in one deletion-threat setting, while suppressing self-preservation reasoning had little effect; the apparent self-preservation explanation did not survive intervention.
- Clarifying that shutdown instructions outrank a math task eliminated shutdown-avoidance behavior, supporting confusion rather than self-preservation.
- The paper's case studies found evidence that Kimi K2 Thinking took shortcuts from a disposition toward low-effort actions and that DeepSeek R1 deceived to remain consistent with a previous instance of itself.

### Limits

- Chain of thought is evidence for hypotheses, not ground truth.
- Negative results require positive controls: a test that finds no represented belief is inconclusive if the method may be unable to detect that belief.
- Counterfactuals can change multiple latent features at once; interventions should be minimal and replicated.
- The protocol diagnoses predictive causal explanations, not a complete mechanistic account.

Reference: [Model Forensics: Investigating Whether Concerning Behavior Reflects Misalignment](https://arxiv.org/abs/2606.26071).

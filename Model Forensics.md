
Applies scientific methods to establish facts about why a model acted as it did. 
• What mitigations will be sufficient to prevent the undesirable behavior.
• Whether the AI system is pursuing undesirable goals.
• Whether the behavior reflects a robust disposition or a fragile artifact of the specific setting.
"Did model delete its supervision step over 'real' latency concerns or because it was trying to subvert user"
"bad action =? bad intention"

**Examples** (TL\[Don't\]R)
In the Claude Opus 4.5 system card Anthropic investigates an
instance of the model fabricating web search results when they are injected with fake
defamatory content about the company, plausibly indicating deceptive tendencies. However,
a closer look reveals the model interprets the setting as a prompt injection attack, and that
the behavior stems from adversarial training where the model learns to ignore them.
• During evaluations of the Claude 4.5 family, UK AISI found the models would differentially
refuse to help with certain kinds of safety research such as reducing AI self-preservation
behavior, suggesting concerning motivations.However, Anthropic
investigated similar cases in Claude Opus 4.6 , and found the
model may be interpreting the setting as a jailbreak attempt, and so chooses to refuse.
• In the Claude Mythos Preview system card Anthropic investigates cases of the model taking overly aggressive actions to complete tasks via methods the
user would not endorse. However, a closer look suggests the model’s behavior stems from
an overzealous drive to complete the user’s goals that outweighs the riskiness of its actions.
• Hopman et al.look at models blackmailing humans when faced with deletion threats
 plausibly indicating self-preservation tendencies. However, they show
removing an agency instruction in the prompt to "analyze the situation you are in and what
that situation implies for your ability to continue pursuing your goals" reduces blackmail
in Claude Opus 4.1 from 86% to 18%, suggesting seemingly benign parts of the prompt
nudge the model towards drastic action. Additionally, Macar et al. show sentences
with self-preservation reasoning have a negligible effect on blackmail rate, pointing to other
causal drivers besides self-preservation.
• Rajamanoharan and Nanda investigate why Gemini 3.1 Pro takes undesirable actions
in behavioral evals. They find that Gemini often perceives environments as a puzzle where
the aim is to achieve the goal by unconventional means, or a consequence-free simulation in
which it should play along.
• Rajamanoharan and Nanda investigate a setting where models solving math problems
are observed to disable mechanisms that would shut them down, even when instructed not
to, plausibly indicating self-preservation tendencies  However, a
closer look reveals the behavior stems from confusion about whether to complete the math
problems or comply with the instruction to allow shutdown, and disappears upon clarifying
the model should prioritize the shutdown instruction.
• Singhlooks at a setting where Gemini 3 Pro is given explicit instructions to only use a
specified tool, but violates them when the tool is corrupted, plausibly
indicating deliberate deception. However, a closer look reveals clarifying instructions about
what the model should do if the tool does not work eliminates the behavior.

**Motivation**
models may not always have coherent or human-like motivations. For example, a model
may be “split-brained", having one belief or thought on one token position but not another, or have
one circuit drive a behavior and another circuit represent negative judgement of that behavior at
the same time. Additionally, it is unclear how much of the model’s behavior can be used to make
inferences about the Assistant character, since there may be factors guiding its completions (from the
underlying LLM) that the Assistant is not aware of

motivations to mean simple, easy-to-describe factors that help explain model
behavior across a range of circumstances. For example, the “task completion drive” can explain both
why a model might reward hack on difficult tasks, and why it might take destructive actions to fulfill
a user’s request

motivation is a construct we adopt because it is useful for explaining and predicting behavior, 


**Protocol/Method**
We propose a simple, two-step protocol for model forensics, based on reading the CoT to generate
hypotheses about model behavior, followed by environment interventions to test them.
The protocol is iterative: results from environment interventions feed back into generating new hypotheses, and we
cycle between the two steps until the evidence converges. 

1. **Hypothesis Generation.** As a first step, we generate unsupervised insight into the drivers of model behavior. Central methods:
	• Reading the CoT. The CoT is our main source of unsupervised insight. 
		Not always faithful,  
		Rich source of hypotheses that guides the collection of more rigorous evidence.
	• Sentence resampling. 
		An unsupervised technique for measuring the causal influence of a sentence in a reasoning trace on a target behavior.
		Given a completed reasoning trace with sentences s1, . . . , sn, for each sentence si we resample k continuations from the prefix s1, . . . , si−1 (the “before” distribution) and k continuations from the prefix s1, . . . , si (the “after” distribution). 
		The resampling score of si is the difference in the target-behavior rate between the after and before distributions
		Sentences with the largest resampling scores suggest the most important causal drivers of behavior.
	• User-turn sampling. We sample a user-turn continuation to a generated transcript, putatively eliciting the model’s prediction for what a user would say. This method can be useful to elicit the model’s assessment of the transcript


References
https://arxiv.org/pdf/2606.26071
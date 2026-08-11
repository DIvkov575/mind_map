


A mechanistic-[[Interpretability]] technique.

Jlense
- Compute an averaged [[Jacobian]] at each layer
	- linearized effect of an activation on next-token [[Logits]], averaged across ~1,000 diverse prompts.
	- Isolates a representation's general disposition to Jbe verbalized, stripped of context-specific noise.
- Applying it
	- swap all downstream layers with this single averaged linear map
	- run the normal unembedding
	- get a ranked token list showing what an activation is "poised to make the model say."

... reprompted claude ... this is more intuitive

1. Compute an averaged Jacobian per layer — the linearized derivative of how an activation at layer L affects the final logits, computed by averaging this linearization across ~1,000 diverse prompts. Averaging washes out context-specific routing/nonlinearities and leaves the layer's generic disposition — what it tends to do to logits regardless of the specific sentence it's in.
2. Apply it: take some activation (a residual-stream vector, an SAE feature, whatever you want to inspect), multiply it through that single averaged linear map instead of running the real (nonlinear, context-dependent) remaining layers, then run the ordinary unembedding.
3. Read the result: a ranked list of tokens — literally what that activation is "poised to make the model say," under the average behavior of the rest of the network.


J-space = the collection of these token-tied vectors across layers, modeled as a sparse, overcomplete subframe where only ≤25 vectors are active at once.


Anth engineers picked some words, found their correspoding vectors -> these are hte vectors which popup when usign Jlense
- Sparse: only a few are activated at a time
- 
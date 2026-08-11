


Grokking is the empirical phenomenon where a network trained on a small algorithmic task (e.g., modular addition $a+b \mod n$) first memorizes the training set (near-zero train loss, near-chance test accuracy) and then, much later in training, suddenly generalizes (test accuracy jumps to ~100%) — long after training loss looked "done."

Nanda et al. opened up the trained network and found the mechanism: it wasn't memorizing, it had — with no [[Representation Theory]] built into the architecture — converged onto embeddings that are literally the Fourier basis / [[Irreducable Representation (irrep)|irep]] of $\mathbb{Z}_n$, and it computes $a+b \mod n$ using trig-identity algebra equivalent to combining those irreps correctly. 
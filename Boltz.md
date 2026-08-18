[[Protein Folding]] Model based on [[Alpha Fold 2]]; Has two pieces a trunk (representation learning from MSA data: transformer architecture with [[Pairformer]] layers) and a diffusion head;




**Trunk**
SO(3) [[Invariance|invariant]] (because it never sees pose...)
Inputs are token identity, MSA profile, relative-position one-hots (residue index / chain /enttiy / sym_id), bonds, contact conditioning. The one structural input (templates) is featurized invariantly - a CB-CD [[Distogram]] w/ CA unit vectors

Trunk is a [[Graph Neural Network]] by 


**Diffusion Module**

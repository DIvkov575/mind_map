

A (language model?) decoding algorithm that generates multiple (k) semantically diverse and high-quality answers through three key mechanisms
- directional guidance: steers each decoding trajectory toward distinct semantic regions, 
- inter-group repulsion: repulsion maintains semantic distances between groups
- probability preference: probability preference prioritizes tokens with higher likelihood to ensure quality
SemDiD runs k groups of beam searches simultaneously, with the first group employing greedy decoding to establish a quality baseline. Despite the conceptual simplicity, effective implementation presents several challenges
A numerical description of a protein used by statistical or machine-learning models. The representation determines which biological structure is explicit and which relationships the model must learn.

**Sequence representations**

- One-hot or categorical encodings of each [[Amino Acid|amino acid]].
- Token [[Embeddings|embeddings]] learned from protein sequences.
- Evolutionary profiles derived from [[Sequence Alignment]] or an [[MSA]], which expose conservation and co-variation across homologs.

**Structure representations**

- Atomic or residue coordinates from a [[Protein Structure]].
- Pairwise distances, contact maps, bond graphs, backbone torsion angles, or local coordinate frames.
- Geometry-aware features that are invariant or equivariant to global translation and rotation, so changing the viewing frame does not change the represented protein.

**Learned representations**

Protein language models and structure models perform [[Representation Learning]] over sequences, structures, or both. Per-residue embeddings support local tasks such as secondary-structure prediction; pooled protein-level embeddings support retrieval, classification, and property prediction.

No representation is universally sufficient: sequence-only features omit explicit 3D geometry, while coordinate representations require care around missing atoms, multiple chains, conformational flexibility, and geometric symmetries.
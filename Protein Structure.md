A protein's 3D shape, determined by its amino-acid sequence folding into a stable conformation — the object every structural-biology technique in this vault is ultimately measuring, stabilizing, or predicting.

**Determining/storing structure**
- Experimentally solved structures (X-ray crystallography, cryo-EM) are stored as [[mmCIF]] files — atomic coordinates, chains, residues, bonds, and experimental metadata in one extensible format.
- Structure can also be *inferred* rather than directly measured: an [[MSA|MSA (Multiple Sequence Alignment)]] of [[Homolog|homologous]] sequences carries an evolutionary signal about which residues co-vary — the feature representation modern structure-prediction pipelines are built on, since residues that must move together across evolution are usually in physical contact in the folded structure.

**Stabilizing structure**
- Non-covalent interactions between side chains hold the fold together — a [[Salt Bridge]] (oppositely-charged side chains, e.g. Lys+/Arg+ with Asp−/Glu−) is one of the standard stabilizing interactions. [[Lys Bridge Swap|Swapping Lys for Arg]] in an existing salt bridge is a common protein-engineering move to strengthen it, since Arg's extra guanidinium geometry supports more electrostatic/hydrogen-bond contacts than Lys's simple amine.

**Measuring structure/interaction indirectly**
- [[Surface Plasmon Resonance (SPR)]] doesn't image structure directly — it measures binding *between* two structures (a protein attached to a surface, a target flowed across it) by recording a real-time signal, producing a [[Sensorgram]]. A clean one-to-one binding sensorgram is itself indirect evidence that both binding surfaces are structured/folded correctly; an ambiguous one (double dissociation phases, no dissociation at all) is often diagnostic of an artifact rather than the biology of interest.

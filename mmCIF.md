**mmCIF** stands for **Macromolecular Crystallographic Information File**. It is a structured text file format used to store detailed information about **biological macromolecules**, especially protein and nucleic acid structures.

mmCIF is the modern replacement for the older **PDB (.pdb)** format used by the Protein Data Bank.

**An mmCIF file encodes:**

- Atomic coordinates (3D positions of atoms)
- Molecular structure (chains, residues, bonds)
- Experimental metadata (e.g., X-ray crystallography conditions)
- Biological annotations (ligands, symmetry, assemblies)

**Why mmCIF exists**

The older [[PDB format]] had strict limitations:

- Fixed column widths
- Max atom counts and chain IDs
- Hard to extend

mmCIF solves this by being:

- **Flexible** (key–value + table-based structure)
- **Extensible** (new fields can be added without breaking parsing)
- **Scalable** (supports very large complexes like ribosomes)
The spatial arrangement of an atom's bonding/non-bonding electron pairs — determines the bond angles around that atom, and therefore the local geometry of whatever it's bonded to.

**Why it matters for [[Amino Acid]] side chains**
- VSEPR (Valence Shell Electron Pair Repulsion): electron pairs around a central atom arrange themselves to minimize mutual repulsion, giving predictable geometries — e.g. 4 electron domains → tetrahedral ($109.5°$), 3 → trigonal planar ($120°$).
- This is *why* a side chain's charged/polar groups sit at specific, predictable angles relative to the backbone — the geometry a [[Salt Bridge]] actually depends on for its electrostatic interaction to reach across, not just the raw presence of opposite charges.
- Arginine's guanidinium group has 3 nitrogen lone-pair-bearing centers in a resonance-stabilized planar arrangement — the electron-arrangement reason it supports more/stronger contacts than lysine's single simple amine (the geometric fact [[Lys Bridge Swap]] exploits).

**Rotation frames — the linear-algebra side of protein geometry**
Representing where a residue's atoms actually sit in 3D space (not just which bonds/angles it has locally) needs a full local coordinate frame, not just an angle: an orthonormal 3×3 rotation matrix (an element of $SO(3)$, see [[Groups]]) plus a translation, one per residue, describing that residue's orientation relative to some global frame.
- this is exactly how modern structure-prediction pipelines internally represent [[Protein Structure]] — a backbone as a chain of rigid per-residue frames, each one an $SO(3)$ rotation
- composing frames along the chain (frame-to-frame rotation composition) is how a predicted local geometry at each residue accumulates into a full 3D fold

Finding the best correspondence between positions in two (or more) biological sequences — the algorithmic machinery underneath the claim that two sequences are [[Homolog|homologous]] or the data underlying an [[MSA]].

**Pairwise alignment via [[Dynamic Programming]]**
Both classical algorithms build an $(n+1)\times(m+1)$ score matrix and fill it one cell at a time, exactly like [[Lattice Paths]]' grid-counting DP or [[Seam Carving]]'s energy-minimization DP — the same "optimal solution to a subproblem extends to the optimal solution of the next" structure, just with a different scoring rule:
- **Needleman–Wunsch** (global alignment): aligns the sequences end-to-end, penalizing gaps everywhere — right choice when the sequences are expected to correspond over their full length.
- **Smith–Waterman** (local alignment): finds the best-scoring *sub*-alignment, allowing unrelated flanking regions to sit outside it unpenalized — right choice when only a conserved domain/motif is expected to match, not the whole sequence.
- Both fill $H(i,j)$ = best alignment score of the two sequences' prefixes (Needleman-Wunsch) or best-scoring local alignment ending at $(i,j)$ (Smith-Waterman), via a substitution-matrix score for matching residue $i$ to residue $j$ plus a gap penalty, taking the max over match/insert/delete moves into that cell.

**Multiple sequence alignment**
Aligning more than two sequences at once (an [[MSA]]) is the natural extension, but exact DP scales exponentially in the number of sequences — in practice done approximately (progressive alignment: align the two most similar sequences first, then align each additional sequence/profile in against the growing alignment).

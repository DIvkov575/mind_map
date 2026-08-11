**MAF** stands for **Minor Allele Frequency**. It's a measure used in genetics to describe how common the less frequent allele of a genetic variant is in a population.

**Definition:** For a SNP (single nucleotide polymorphism) with two alleles, say `A` and `G`:
- If `A` occurs 90% of the time and `G` occurs 10% of the time in the population, the **minor allele** is `G` and the **MAF = 0.10**.

**Why it matters**: MAF is a basic filtering/weighting quantity in population genetics — variants with very low MAF are harder to detect statistically (fewer carriers to observe) and more sensitive to sampling noise. It also directly interacts with [[Linkage Disequilibrium]]: two SNPs with very different allele frequencies can't have strong LD between them (LD is bounded by the rarer allele's frequency), so MAF is a standard covariate/filter when measuring or interpreting LD.

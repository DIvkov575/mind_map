study design used to identify genetic variants across the genome that are **associated with a particular trait or disease**.

Find [[Single Nucleotide Polymorphism (SNP)|SNP]]s or other genetic variants that correlate with variation in a trait.

1. collect **genotype** & **phenotype data
2. Test **each SNP individually** for association with the trait using statistical tests:
    - Linear regression for quantitative traits
    - Logistic regression for binary traits
$\text{Trait} \sim \beta_i \cdot \text{SNP}_i + \text{covariates}$
3. Correct for **multiple testing** (millions of SNPs → typical threshold $p < 5\times10^{-8}$
4. Identify **significant SNPs** that are statistically associated with the trait.
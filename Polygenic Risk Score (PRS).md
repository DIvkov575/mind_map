numeric value that summarizes an individual’s **genetic risk for a trait or disease** based on many genetic variants

For an individual:

$\text{PRS} = \sum_{i=1}^M X_i \hat{\beta}_i$

- M: number of genetic variants (usually [[Single Nucleotide Polymorphism (SNP) | SNPs]]) included
- $X_i \in \{0,1,2\}$: number of risk alleles at [[Single Nucleotide Polymorphism (SNP) | SNP]]
- $\hat{\beta}_i$​: effect size of SNP i from [[Genome-Wide Association Study (GWAS)|Genome-Wide Association Study (GWAS)]]

Interpretation:
- For **quantitative traits** (height, BMI): PRS predicts deviation from the population mean.
- For **binary traits** (diabetes, heart disease): PRS estimates **log-odds of disease**.


### Methods
#### 1. Classical GWAS-thresholded PRS
- Obtain GWAS summary statistics for your trait.
- Select SNPs by p-value threshold (e.g., $p<5e^{-8}$ or liberal thresholds like 0.05).
- Prune SNPs in high [[Linkage Disequilibrium|LD]] (r² > 0.1–0.2) to avoid redundancy.
- Compute PRS as a weighted sum: $\text{PRS} = \sum_i X_i \hat{\beta}_i$
	 [[Genome-Wide Association Study (GWAS) | GWAS]] $\mapsto$ Effect
#### 2. LD-aware Bayesian shrinkage methods
- **[[LDpred]] / LDpred2**
    - Bayesian posterior mean of SNP effects
    - Models the fraction of [[causal effect estimation | causal]] l variants        
    - Requires LD reference panel, widely used, LDpred2 is faster
			GWAS $\mapsto$ Effect
			Accounts for LD
- **PRS-CS / PRS-CSx**
    - Continuous shrinkage prior
    - Adapts effect sizes by LD and GWAS signal
    - PRS-CSx supports multi-ancestry integration
		 GWAS $\mapsto$ Effect
		 Accounts for LD + learns genetic architecture (sparsity and effect of dist...)
- **SBayesR**
    - Mixture-of-normals Bayesian model
    - Handles both sparse and polygenic effects
    - Requires individual-level genotype data
		GWAS $\mapsto$ Effect
- **lasso sum**
    - Penalized regression (lasso) using GWAS summary stats
    - Computationally efficient
    - Robust to noise
	    GWAS $\mapsto$ Effect
		Considers LD
		Applies [[Lasso regularization (L1)]]

**Advantages:**
- Uses all SNPs (not just genome-wide significant ones)
- Adjusts for LD → better signal-to-noise ratio
- Handles polygenicity and sparse effects flexibly

**Workflow:**
1. Collect GWAS summary stats.
2. Prepare LD reference panel matching your cohort ancestry.
3. Apply [[Bayesian shrinkage]] to estimate posterior SNP effects.
4. Compute PRS as usual.

#### 3. Multi-trait and functional integration
- **MTAG / Genomic SEM:** Aggregate signals from genetically correlated traits to improve PRS for a target trait.
- **Functional priors:** Weight SNPs by regulatory importance, conservation, or coding impact.
- **Pathway-aware PRS:** Sum SNPs within pathways, then combine pathway-level scores.

These improve **biological interpretability and predictive performance**.

#### 4. Machine learning approaches (optional)
- **Elastic net, LASSO, ridge regression** on individual-level genotypes
- **Gradient boosting / random forests** to model non-linear interactions (rarely better for additive traits)
- Often limited by **overfitting** and need for large cohorts.
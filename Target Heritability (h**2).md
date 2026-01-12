- [[Polygenic Risk Score (PRS)]] simulations: determining how “strong” the genetic signal should be.
It refers to the **proportion of variance in a trait that a genetic model aims to capture or explain**More formally:
$h^2_\text{target} = \frac{\text{Var}(\text{genetic component used in model})}{\text{Var}(\text{total trait})}$

- **Trait variance decomposition**: For a trait Y, you can write:
    $Y=G+\epsilon$
    where G is the genetic contribution, and $\epsilon$ is environmental/noise. Total heritability is:
    $h^2 = \frac{\text{Var}(G)}{\text{Var}(Y)}$
    
- **Target heritability vs total heritability**:
    - **Total heritability**: The actual proportion of variance due to all genetics.
    - **Target heritability**: The portion of variance your model or study is designed to capture. Often used when generating **synthetic data** or designing **polygenic risk scores (PRS)**. For example, you might set $h^2_\text{target} = 0.3$ if you want your simulated genetic model to explain 30% of the trait variance.

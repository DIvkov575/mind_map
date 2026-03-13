[[Ensemble]] meta-algorithm designed to improve the stability and accuracy of ML classification and regression algorithms. It also reduces [[Bias-Variance Tradeoff|variance]] and [[Overfitting]]

Given a standard training set D of size n bagging generates m new training sets 
$D_i$, each of size n' by sampling from  D uniformly and with replacement. By sampling with replacement, some observations may be repeated in each  $D_i$ If n = n' then for large n the set $D_i$ is expected to have the fraction (1 - 1/e) (~63.2%) of the unique samples of D the rest being duplicates.This kind of sample is known as a bootstrap sample. Sampling with replacement ensures each bootstrap is independent from its peers, as it does not depend on previous chosen samples when sampling. Then, m models are fitted using the above bootstrap samples and combined by averaging the output (for regression) or voting (for classification).

Bagging leads to "improvements for unstable procedures"
Bagging was shown to improve preimage learning. On the other hand, it can mildly degrade the performance of stable methods such as k-nearest neighbors
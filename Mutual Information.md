$$
I(X;Y) = \mathbb{E}_{p(x,y)}\left[\log \frac{p(x,y)}{p(x)p(y)}\right] = D_{KL}\big(p(x,y) \,\|\, p(x)p(y)\big)
$$

- how much knowing $Y$ reduces uncertainty about $X$ (and vice versa — symmetric): $I(X;Y) = H(X) - H(X\mid Y)$
- $I(X;Y) = 0$ iff $X \perp Y$ (independent)
- a [[Kullback-Leibler (KL) Divergence|KL divergence]] between the joint and the product of marginals — measures deviation from independence

**Pointwise version**
[[Pointwise Mutual Information (PMI)]] is the un-averaged, per-event-pair quantity: $\mathrm{PMI}(x,y) = \log\frac{p(x,y)}{p(x)p(y)}$, so $I(X;Y) = \mathbb{E}_{p(x,y)}[\mathrm{PMI}(x,y)]$ — MI averages PMI over all outcome pairs.

**Uses**
- feature selection (keep features with high MI to the label)
- [[Word2Vec]]-style embeddings implicitly factorize a shifted PMI matrix
- disentanglement objectives in representation learning (minimize/maximize MI between latent factors)

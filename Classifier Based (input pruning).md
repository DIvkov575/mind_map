
eg. [[LLMLingua-2]]

### Problem
### Model

A bidirectional encoder fϕf_\phifϕ​ ([[BERT]]-style) produces contextual embeddings:

ht=fϕ(x1,…,xT)th_t = f_\phi(x_1,\dots,x_T)_tht​=fϕ​(x1​,…,xT​)t​

Token-wise Bernoulli classifier:

pϕ(yt=1∣x)=σ(Wht+b)p_\phi(y_t=1\mid x) = \sigma(W h_t + b)pϕ​(yt​=1∣x)=σ(Wht​+b)

---

### Supervision (key distinction)

Labels encode **semantic necessity**, not predictability:
$y_t = \mathbb{1}\big[\text{LLM}(x) \neq \text{LLM}(x^{(-t)})\big]$
where $x^{(-t)}$is the input with token t removed (or span-removed).

---

### Objective

Binary cross-entropy:
$\mathcal{L}(\phi)=\sum_{t=1}^T \Big( - y_t \log p_t - (1-y_t)\log(1-p_t) \Big)$
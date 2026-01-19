
$I(x_t​)=−log(p(x_t​∣x<t​))$
P value attained from 





---


Let a tokenized sequence be
x=(x1,x2,…,xT),xt∈Vx = (x_1, x_2, \dots, x_T), \quad x_t \in \mathcal{V}x=(x1​,x2​,…,xT​),xt​∈V

A causal language model defines

pθ(x)=∏t=1Tpθ(xt∣x<t)p_\theta(x) = \prod_{t=1}^T p_\theta(x_t \mid x_{<t})pθ​(x)=t=1∏T​pθ​(xt​∣x<t​)

Training minimizes **expected negative log-likelihood** (cross-entropy):

L(θ)=Ex∼D[−1T∑t=1Tlog⁡pθ(xt∣x<t)]\mathcal{L}(\theta) = \mathbb{E}_{x \sim \mathcal{D}}\Big[-\frac{1}{T}\sum_{t=1}^T \log p_\theta(x_t \mid x_{<t})\Big]L(θ)=Ex∼D​[−T1​t=1∑T​logpθ​(xt​∣x<t​)]

---

Perplexity (definition and meaning)

For a fixed trained model θ\thetaθ, define sequence cross-entropy:

$$H(x) = \frac{1}{T}\sum_{t=1}^T -\log p_\theta(x_t \mid x_{<t})$$

**Perplexity** is:

PPL(x)=exp⁡(H(x))\text{PPL}(x) = \exp(H(x))PPL(x)=exp(H(x))

Token-level perplexity:

PPLt=exp⁡ ⁣(−log⁡pθ(xt∣x<t))\text{PPL}_t = \exp\!\big(-\log p_\theta(x_t \mid x_{<t})\big)PPLt​=exp(−logpθ​(xt​∣x<t​))

### Interpretation

H(x)≈expected code length (nats/token)H(x) \approx \text{expected code length (nats/token)}H(x)≈expected code length (nats/token) PPL(x)≈effective branching factor\text{PPL}(x) \approx \text{effective branching factor}PPL(x)≈effective branching factor

Perplexity is therefore an **information-theoretic quantity**, not a heuristic score.
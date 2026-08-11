
### Definition

For a fixed trained model θ define sequence [[Cross Entropy|cross-entropy]]:
$$H(x) = \frac{1}{T}\sum_{t=1}^T -\log p_\theta(x_t \mid x_{<t})$$

Perplexity is: 
$$\text{PPL}(x) = \exp(H(x))$$

Token-level perplexity:
$$\text{PPL}_t = \exp\!\big(-\log p_\theta(x_t \mid x_{<t})\big)$$

### Interpretation
$H(x) \approx \text{expected code length (nats/token)}$, in the same units [[Entropy]] measures uncertainty in.
$\text{PPL}(x) \approx \text{effective branching factor}$

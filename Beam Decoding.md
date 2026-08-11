(a.k.a. beam search) — heuristic search algorithm commonly used at inference time for [[Autoregressive Models|autoregressive]] sequence generation (machine translation, text generation, speech recognition).

When generating a sequence $y_1, y_2, \dots, y_T$ given input $x$, an AR model's exact factorization $p(y\mid x) = \prod_{t=1}^T P(y_t \mid y_{<t}, x)$ makes finding the single best full sequence $\hat{y} = \arg\max_y P(y\mid x)$ exponentially expensive to search exactly — beam decoding is the standard tractable approximation.

**Greedy decoding** selects the most probable token at each step:
$$y_t = \arg\max_y P(y_t \mid y_{<t}, x)$$
Simple but can miss globally optimal sequences because early choices can block better overall sequences — a token that looks slightly suboptimal now might have led to a much better sequence overall.

**Beam search** keeps the top $k$ (the beam width) partial sequences at every step instead of just one, expanding each by every possible next token, then keeping only the $k$ highest-scoring resulting partial sequences — hedging against greedy's early-commitment problem without paying for the full exponential search.

- $k=1$ recovers greedy decoding exactly
- larger $k$ finds higher-probability sequences on average, but with diminishing returns and higher cost — and past a point, higher-probability isn't the same as higher-quality (see [[Semantic-guided Diverse Decoding (SemDiD)]] for one alternative that optimizes for diverse, high-quality *sets* of outputs rather than one single high-probability sequence)

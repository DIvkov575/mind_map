- process generated from several (discrete) latent states

$z_i \in \{1 \cdots K\}$

$z_1 = \pi \quad z_t \sim P(z_t \vert z_{t-1}) \quad x_t \sim P(x_t | z_t)$ 


Likelihood estimation (forward algorithm)
we want $P(x_{1:t} \vert \theta) \iff \underset{x_{1:t}}{\Sigma} P(x_{1:T}, z_{1:t})$ which can be solved with DP
1) Init $\alpha_1(i) = \pi_i P(x_1 | z_1 = i)$
2) Induction $\alpha_t(j) = P(x_t \mid z_t=j)\sum_i \alpha_{t-1}(i) A_{ij}$
3) Terminal $P(x_{1:T}) = \sum_i \alpha_T(i)$

State Decoding
[[Viterbi Algorithm]]


Parameter Learning
[[Baum–Welch algorithm]] ([[Expectation–Maximization (EM)|EM]])
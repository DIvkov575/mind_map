Find the **single most likely hidden state sequence**:
$z_{1:T}^* = \arg\max_{z_{1:T}} P(z_{1:T} \mid x_{1:T})$
This is **not** the same as marginally most likely states at each time.

---

Replace summation with maximization & Track **backpointers** to recover the path.
$\delta_t(j) = \max_{z_{1:t-1}} P(z_{1:t}, x_{1:t})$

---

### Recursion
**Initialization**
$\delta_1(i) = \pi_i P(x_1 \mid i)$
**Induction**
$\delta_t(j) = P(x_t \mid j)\max_i \left[\delta_{t-1}(i) A_{ij}\right]$
**Backtrace**  
Recover the optimal path by following argmax pointers backward. $\delta_i$
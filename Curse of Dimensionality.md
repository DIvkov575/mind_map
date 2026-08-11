Curse of dimensionality: covering a $d$-dimensional manifold to resolution $\varepsilon$ needs

$$
K(\varepsilon) \sim \varepsilon^{-d}
$$

components — exponential in $d$. 

Halving $\varepsilon$ multiplies $K$ by $2^d$, so tightening the fit is computationally hopeless once $d$ is even moderately large (natural images: $d$ in the hundreds).

---

**Theorem** (covering number of a $d$-dimensional set). Let $\mathcal{M}\subset\mathbb{R}^D$ be [[Compact]] with [[Lebesgue Measure|d-volume]] $V=\mathrm{vol}_d(\mathcal{M})<\infty$. Let $N(\varepsilon)$ be the minimum number of radius-$\varepsilon$ balls covering $\mathcal{M}$. Then

$$
N(\varepsilon) = \Theta(\varepsilon^{-d})
$$


**Proof** (packing/covering duality).

**Upper bound**. Take a maximal $\varepsilon$-separated packing ${x_1,\dots,x_M}\subset\mathcal{M}$. 
Maximality forces every point of $\mathcal{M}$ within $\varepsilon$ of some $x_i$, so ${B(x_i,\varepsilon)}$ covers $\mathcal{M}$:  $N(\varepsilon)\le M$. 

The disjoint balls $B(x_i,\varepsilon/2)$ pack into $\mathcal{M}$'s $\varepsilon/2$-neighborhood (volume $V+O(\varepsilon)$):

$$
M \cdot c_d(\varepsilon/2)^d \leq V + O(\varepsilon) \implies M \leq \frac{2^d V}{c_d} \varepsilon^{-d}(1+o(1))
$$
$c_d$ — volume of the unit ball in $d$ dimensions (a fixed constant, e.g. $c_1=2,\ c_2=\pi,\ c_3=\frac43\pi$). Ball of radius $r$ has volume $c_d r^d$.
$O(\varepsilon)$ — an error term that shrinks linearly in $\varepsilon$ as $\varepsilon\to0$; here, the extra volume from fattening $\mathcal{M}$'s boundary by $\varepsilon/2$.
$o(1)$ — a correction that vanishes ($\to0$) as $\varepsilon\to0$, no specific rate implied. $(1+o(1))$ = "1, plus a negligible fraction," i.e. the bound becomes exact in the limit.

**Lower bound.** Any covering by $N(\varepsilon)$ balls has total volume $\ge V$:
$$
N(\varepsilon)\cdot c_d\varepsilon^d \ge V \quad\Rightarrow\quad N(\varepsilon) \ge \frac{V}{c_d},\varepsilon^{-d}
$$

(Any covering by $N(\varepsilon)$ balls of radius $\varepsilon$ has total volume $\ge V$ since it must cover $\mathcal{M}$; dividing through by $c_d\varepsilon^d$ gives the lower bound on $N(\varepsilon)$.)
Combining gives $N(\varepsilon)=\Theta(\varepsilon^{-d})$. $\blacksquare$

($c_d$ = volume of the unit $d$-ball. Extension from flat $\mathbb{R}^d$ to a curved manifold — [[Kolmogorov–Tikhomirov ε-entropy]] — uses [[Bishop–Gromov volume comparison]] to control the correction terms via curvature.)
Choosing *where to sample* rather than what to do with samples you were handed. Called **optimal experimental design** in statistics and **active learning** in ML — same object, different traditions (batch/analytic vs. sequential/pool-based).

**The core move**
[[Cramér-Rao Bound|Cramér-Rao]] caps the variance of any unbiased estimator *for a fixed design*. But [[Fisher Information]] $\mathcal{I}(\theta)$ depends on where the data was taken, so choosing the design changes the bound itself. This is the one route to [[Sample Efficiency]] that beats an information floor instead of approaching it — every other technique ([[Maximum Likelihood Estimation (MLE)|MLE]], shrinkage, better priors) only moves you toward a floor set by data you already have.

For a design $\xi$ placing weights $w_i$ at points $x_i$:
$$\mathcal{I}(\xi,\theta) = \sum_i w_i\, \mathcal{I}(x_i,\theta)$$
A matrix, so "maximize information" needs a scalarization. The standard alphabet:
- **D-optimality** — maximize $\det \mathcal{I}$. Minimizes the volume of the confidence ellipsoid. The default.
- **A-optimality** — minimize $\operatorname{tr}(\mathcal{I}^{-1})$. Average parameter variance; sensitive to parameter scaling.
- **E-optimality** — maximize $\lambda_{\min}(\mathcal{I})$. Protects the worst-determined direction.
- **G / I-optimality** — minimize worst-case / average *prediction* variance. Use when you care about predictions, not parameters.

**Linear vs. nonlinear**
- Linear model: $\mathcal{I} = \sigma^{-2} X^{\top}X$, independent of $\theta$ → the optimal design is computable *before* collecting anything.
- Nonlinear/GLM: $\mathcal{I}$ depends on the unknown $\theta$ → chicken-and-egg. Resolved by *locally optimal* designs (plug in a best guess), *Bayesian* designs (average over a prior), or *sequential* designs (re-optimize as estimates update). This dependence is why nonlinear problems are inherently adaptive.

**Concrete designs, and why they look wrong**
- Fitting a straight line on $[-1,1]$: the D-optimal design puts half the mass at $-1$ and half at $+1$ — **nothing in the middle**. Interior points barely constrain a slope. Uniform sampling is strictly wasteful.
- Quadratic: mass at $\{-1, 0, +1\}$. Degree $d$ polynomial: $d+1$ clustered near Chebyshev points.
- Logistic dose-response: with slope only unknown, information peaks at the ED50 ($p = 0.5$). With intercept *and* slope unknown, the D-optimal design is two doses symmetric about ED50 at $\approx 17.6\%$ and $82.4\%$ response — you deliberately avoid the middle again.
- General pattern: **optimal designs are sparse and extremal**, supported on few points. Carathéodory bounds the support at $p(p+1)/2$ points for $p$ parameters. Space-filling is a robustness choice, not an efficiency one.

**Why the optimization is tractable**
Designs are probability measures on the design space, which is convex, and $\log\det$ is concave — so this is [[Convex Function|convex]] optimization ([[Numerical Optimization]]). Kiefer–Wolfowitz equivalence: a D-optimal design is exactly G-optimal, which turns a minimax prediction problem into a determinant maximization.

**Bayesian OED**
Drop the scalarization alphabet and maximize expected information gain, which *is* the [[Mutual Information]] between data and parameters:
$$\mathrm{EIG}(\xi) = \mathbb{E}_{y \sim p(y\mid\xi)}\big[\mathrm{KL}\big(p(\theta \mid y,\xi)\,\big\|\,p(\theta)\big)\big] = I(\theta; y \mid \xi)$$
Cleaner semantics (see [[Kullback-Leibler (KL) Divergence]], [[Entropy]]), nastier computation — nested expectations with no closed form. Handled with variational bounds on the MI or amortized policies that map history to the next design directly. Reduces to D-optimality in the Gaussian/linear limit.

**Active learning — the sequential ML incarnation**
Given a large unlabeled pool and an expensive labeler, pick the next query.
- **Uncertainty sampling** — max predictive entropy, smallest margin, least confidence. Cheap, effective, and wrong when uncertainty is *aleatoric*: it will happily spend the budget on irreducibly noisy points.
- **BALD** — the fix, an explicit epistemic/aleatoric split: $$\arg\max_{x}\; H\big[p(y\mid x, D)\big] - \mathbb{E}_{p(\theta\mid D)}\big[H\big[p(y \mid x,\theta)\big]\big]$$ total uncertainty minus expected aleatoric uncertainty = information about the *parameters*. Needs a posterior over weights ([[Bayesian Neural Network]], ensembles, MC dropout).
- **Query-by-committee** — label where an ensemble disagrees; disagreement as a poor man's epistemic uncertainty.
- **Expected error / model-change reduction** — decision-theoretically correct, usually too expensive.
- **Batch acquisition** needs an explicit diversity term or it returns $k$ near-copies of the same point (BatchBALD, core-set / $k$-center coverage). Greedy top-$k$ on any pointwise score is the classic failure.

**Where it actually pays, and where it doesn't**
- Pays when labels dominate cost and are individually expensive: clinical trials (adaptive designs), wet-lab assays, protein engineering, human annotation, simulation-based inference.
- Doesn't pay in web-scale pretraining — data is nearly free and compute is the binding constraint, so curation beats acquisition.

**Failure modes worth remembering**
- **Cold start**: early acquisition decisions are made by a bad model, and can be worse than random. Active learning underperforming random sampling is a common, real result.
- **Sampling bias**: the collected data is no longer i.i.d. from the population, so downstream estimates and any held-out evaluation need reweighting. You have bought efficiency for $\theta$ at the cost of an unrepresentative sample.
- **Model misspecification**: the design is optimal *for the assumed model*. A design that is efficient under the wrong model is confidently wrong in a specific direction.

**Adjacent**
Bandits and RL are sequential design with reward rather than information as the objective; Bayesian optimization is the same acquisition machinery aimed at finding an optimum rather than estimating parameters.

Sinkhorn regularization makes optimal transport computationally tractable by adding an entropy term. Instead of $\langle \gamma, C \rangle$ we minimize 
$$\min_{\gamma\in\Pi(\mu,\nu)} \langle \gamma,C\rangle-\varepsilon H(\gamma)$$
where $C_{ij}$ is transport cost matrix; $H(\gamma)$ is the entropy of coupling; $\varepsilon$ regularization strength

- Without regularizatino, transport plan can be super sparse
- Makes smoother

Optimal coupling becomes:
$\gamma^*=\operatorname{diag}(u)K\operatorname{diag}(v),\quad K_{ij}=e^{-C_{ij}/\varepsilon}$
which allows [[Iterative matrix scaling]]


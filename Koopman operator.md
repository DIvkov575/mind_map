A linear operator $\mathcal{K}$ that advances *observables* (functions of the state) forward in time for a (possibly nonlinear) dynamical system $x_{t+1} = F(x_t)$:
$$
(\mathcal{K}g)(x) = g(F(x))
$$

- the state-space dynamics $F$ can be nonlinear, but $\mathcal{K}$ acting on the (infinite-dimensional) space of observable functions is always **linear** — the nonlinearity is traded for infinite dimensionality
- in practice: approximate $\mathcal{K}$ on a finite-dimensional subspace of observables (a dictionary of functions), then use linear-systems tools (eigendecomposition, spectral analysis) on the approximation — this is the basis of Dynamic Mode Decomposition (DMD)
- gives a way to analyze/predict nonlinear time series using linear-algebra machinery, once a good observable dictionary is chosen

Related: [[Time Series Modeling]] (phase-space/dynamical-systems analysis), [[Neural ODE]] (an alternative, differential rather than operator-theoretic, way to fit continuous nonlinear dynamics).

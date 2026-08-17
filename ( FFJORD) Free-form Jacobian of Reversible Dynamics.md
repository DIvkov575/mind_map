Cannonical Implementatino of [[Continuous Normalizing Flows (CNFs)]]
Removes need to compute jacobians

We have $z = f(x)$ where to compute likelihood we use
$$\log p(x)=\log p(z)+\log\left|\det\frac{\partial z}{\partial x}\right|$$
but computing determinant is $O(|D^3|)$
or you must severely restrict the architecture (coupling layers, autoregressive layers, etc.) so the determinant becomes cheap.


Use small changes -> Instantaneous change of variables formula says
$\frac{d}{dt}\log p(x(t))=-\operatorname{Tr}\left(\frac{\partial f}{\partial x}\right)$
But det is O(D^2) calculation so


**FFJORD**
Estimate $Tr(J) = E_{\varepsilon}[\varepsilon^T J \varepsilon]$ where ($\varepsilon \approx N(0,I)$ or a [[Radmacher vector]] ($\pm 1$))
This is called [[Hutchinson Trace Esimator]]
Most [[Autodiff]]s compute Jacobian-vector products (J\varepsilon) directly without jacobian
Cost O(D)

**Training**
x(T)
Solve ODE backwards and simultaneously solve $$\frac{d}{dt}\log p(x)=-\varepsilon^T\frac{\partial f}{\partial x}\varepsilon$$
Train by maximizing
$$\log p(x)=\log p(z)-\int_0^T\operatorname{Tr}\left(\frac{\partial f}{\partial x}\right)dt$$

**Who Cares**
Before FFJORD:
- invertible neural networks had carefully engineered architectures,
- Jacobian determinants dominated computation.
After FFJORD:
- the vector field $f_\theta(x,t)$ can be an ordinary neural network (e.g., an MLP or CNN),
- invertibility comes from solving an ODE rather than designing special layers.
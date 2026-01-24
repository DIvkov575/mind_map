 A [[Delay Differential Equation (DDE)]] introduced to model physiological control systems (originally blood cell production). It is a canonical example of how time delay alone can induce chaos
 - [[Time Series Modeling]] benchmarks,
- [[Reservoir computing]],
- [[RNN]]/[[LSTM]] evaluation,
- delay embedding and attractor reconstruction ([[Takens]]).
The standard form
$$\frac{dx(t)}{dt}
=
\beta \frac{x(t-\tau)}{1 + x(t-\tau)^n}
-
\gamma x(t)$$$where:
- x(t): state variable (e.g., cell concentration),
- τ>0: time delay,
- β>0: production rate,
- γ>0: decay rate,
- n>0: nonlinearity exponent.


Discretization (for simulations)
Often simulated via [[Euler's Method]] or [[Runge–Kutta]] with a history buffer:
$$x_{k+1}
=
x_k
+
\Delta t
\left(
\beta \frac{x_{k-m}}{1 + x_{k-m}^n}
-
\gamma x_k
\right),
\quad m = \tau / \Delta t$$
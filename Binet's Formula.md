Binet's formula gives a closed-form expression for the $n$-th Fibonacci number:
$$F_n = \frac{\varphi^n - \psi^n}{\varphi - \psi}$$
where
$$\varphi = \frac{1 + \sqrt{5}}{2} \quad \text{and} \quad \psi = \frac{1 - \sqrt{5}}{2}$$
are the two roots of $x^2 = x + 1$ (the characteristic equation of the recurrence $F_n = F_{n-1} + F_{n-2}$).

**Derivation via generating functions**
The [[Generating Functions|ordinary generating function]] $A(x) = \sum_{n\geq0} F_n x^n$ of the Fibonacci sequence satisfies $A(x) = x + xA(x) + x^2A(x)$ (encoding the recurrence directly as an algebraic equation on $A$), giving the closed form:
$$
A(x) = \frac{x}{1 - x - x^2}
$$
Partial-fractioning $\frac{x}{1-x-x^2}$ over its two roots $1/\varphi, 1/\psi$ and reading off the coefficient of $x^n$ recovers Binet's formula directly — the generic pattern for any linear recurrence: characteristic-equation roots $\leftrightarrow$ poles of the rational generating function $\leftrightarrow$ exponential terms in the closed form.

Since $|\psi| < 1$, $\psi^n \to 0$ — so $F_n$ is well-approximated by $\varphi^n/\sqrt5$ alone for large $n$, and in fact $F_n$ is always the nearest integer to $\varphi^n/\sqrt5$.

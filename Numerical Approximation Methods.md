The standard toolkit for computing an expensive function (exp, log, sin, sqrt, ...) cheaply and to acceptable precision, in software or in dedicated hardware:

- **Range reduction**: rewrite the input in terms of a small, easy-to-approximate argument plus a cheap correction — e.g. $e^x = e^{x_0} \cdot 2^k$ for $x_0$ restricted to a small interval. Makes the hard part of the approximation only ever have to work on a bounded, small domain.
- **Lookup tables**: precompute the function's value at a grid of nearby points, so a query only needs cheap interpolation between two stored values instead of evaluating the real function.
- **Polynomial approximation**: fit a low-degree polynomial (Taylor, minimax/Chebyshev) to the function over the reduced small range and evaluate that instead — see [[Efficient Exponent (10^x)]] for $\exp$ worked through this exact pipeline.
- **FMA** ($a \cdot b + c$ in one rounding step): lets a polynomial's Horner-scheme evaluation stay both fast and numerically accurate, since each term only rounds once instead of twice.

**In hardware**: GPUs implement this whole pipeline directly in silicon as [[Special Function Units (SFUs)]] — dedicated units for [[Transcendental Instructions]] (sin, cos, exp, log, rsqrt, ...) using exactly these techniques (polynomials, table lookup), because running them through the general-purpose [[ALU]] would slow down every other instruction and waste area on a workload most instructions don't need.

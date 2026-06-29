A numerical method for integrating ODE's


Numerical ODE example

$\frac{dx(t)}{dt} = f(x(t), t, \theta); \quad x(t_0) \text{ is given}; \quad x(t_1) = \text{ ?}$
$x(t_1) = x(t_0) + \int_{t_0}^{t_1} f(x(t), t, \theta) \, dt$


1st-order Runge-Kutta / [[Euler's Method]]:
$t_{n+1} = t_n + h$
$x(t_{n+1}) = x(t_n) + h f(x(t_n), t_n)$


4th-order Runge Kutta:
$k_1 = f(x(t_n), t_n)$

$k_2 = f\!\left(x(t_n) + \frac{h}{2}k_1,\ t_n + \frac{h}{2}\right)$

$k_3 = f\!\left(x(t_n) + \frac{h}{2}k_2,\ t_n + \frac{h}{2}\right)$

$k_4 = f\!\left(x(t_n) + h k_3,\ t_n + h\right)$

$$x(t_{n+1}) = x(t_n) + \frac{h}{6}\left(k_1 + 2k_2 + 2k_3 + k_4\right)$$  
The coefficients in RK4 come from requiring the method to match the [[Taylor Series]] expansion of the true solution up to the 4th order term
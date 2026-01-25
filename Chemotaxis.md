Chemotaxis is the movement of an organism or cell in response to a chemical stimulus. The movement can be:
- Toward a beneficial chemical (positive chemotaxis) – e.g., bacteria moving toward nutrients.
- Away from a harmful chemical (negative chemotaxis) – e.g., moving away from toxins.
Mechanism:
-  Cells detect concentration gradients of chemicals in their environment.
- They adjust the activity of their [[Motility Structures]] to move toward or away from the chemical source.


---
Bacterial chemotaxis (E. Coli - or run/tumble organisms) Can be modeled with an active [[Brownian Motion]] model w/ multiple internal states "run" and "change of direction". 
position $r$ and velocity/direction $e$
![[Screenshot 2026-01-25 at 4.15.23 PM.png]]
Observe similarity to [[Langevin Dynamics]]
$$\begin{aligned} dx_t &= v_t\,dt \\ dv_t &= -\gamma v_t\,dt - \nabla U(x_t)\,dt + \sqrt{2\gamma\beta^{-1}}\,dW_t \end{aligned}$$
Given operator $A : V \to W$
Adjoint is $A^* : W \to V$
is the unique operator satisfying $\langle Ax, y\rangle=\langle x, A^*y\rangle$




**Why useful?**
Suppose $y = Ax$ and a scalar loss $L(y)$ where we know $\frac{\partial L}{\partial y}$
How do we get $\frac{\partial L}{\partial x}$
By the [[Chain Rule]] $\delta L=\left\langle\frac{\partial L}{\partial y},Ay\right\rangle$
$\delta L=\left\langle A^*\frac{\partial L}{\partial y},\delta x\right\rangle$
$$\frac{\partial L}{\partial x}=A^*\frac{\partial L}{\partial y}$$
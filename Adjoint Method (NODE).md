For Neural ODEs, the adjoint method lets you compute gradients without storing every intermediate state from the ODE solver.
$$\frac{dh(t)}{dt} = f(h(t), t, \theta)$$
h(0) is input embedding
h(T) is output

you numerical solve from 0 to T; Loss is $L = \ell(h(T))$


**Naive**
To compute $\frac{dL}{d\theta}$, [[Autodiff]] would record every solver step
```
h0 -> h1 -> h2 -> ... -> hN
```
then backprop => O(n) steps

**Adjoint**
$$a(t)=\frac{\partial L}{\partial h(t)}$$
at the end
$$a(T)=\frac{\partial L}{\partial h(T)}$$
which is easy to obtain from the loss.

Differentiate using the chain rule: (see [[Adjoint]])
$$\frac{da}{dt}=-a^\top\frac{\partial f}{\partial h}$$
$$\frac{da}{dt}=-\left(\frac{\partial f}{\partial h}\right)^Ta$$
while integrating backward (minus sign)
$$\frac{dL}{d\theta}=-\int_T^0a(t)^T\frac{\partial f}{\partial\theta}\,dt$$

**Summary**
Regenerate and integrate 'h' states as you compute back prop backwardsw
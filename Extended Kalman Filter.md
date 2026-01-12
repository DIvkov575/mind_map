Consider a discrete-time nonlinear system:

{xt=f(xt−1,ut)+ηt(state transition)yt=h(xt)+ϵt(observation)\begin{cases} x_t = f(x_{t-1}, u_t) + \eta_t & \text{(state transition)} \\ y_t = h(x_t) + \epsilon_t & \text{(observation)} \end{cases}{xt​=f(xt−1​,ut​)+ηt​yt​=h(xt​)+ϵt​​(state transition)(observation)​

Where:
- fff and hhh are **nonlinear** functions
- ηt\eta_tηt​ ~ process noise, ϵt\epsilon_tϵt​ ~ measurement noise
The goal: estimate xtx_txt​ given observations y1:ty_{1:t}y1:t​.


### Method:
- **Linearizes the nonlinear functions** fff and hhh using a **first-order Taylor expansion** around the current estimate.
- Uses **Jacobian matrices** to propagate the mean and covariance:

$F_t = \frac{\partial f}{\partial x} \bigg|_{x=\hat{x}_{t-1}} \quad,\quad H_t = \frac{\partial h}{\partial x} \bigg|_{x=\hat{x}_t^-}$

- Standard Kalman update equations are applied using these Jacobians

### Pro
Computationally cheaper than [[Unscented Kalman filters | UKF]]
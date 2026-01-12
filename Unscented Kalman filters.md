[[Kalman filter]]

Uses the **Unscented Transform (UT)**:
- Instead of linearizing, UKF generates **sigma points** around the current estimate.
- Each sigma point is propagated through the **exact nonlinear function**.
- The mean and covariance of the transformed points approximate the posterior distribution.
bruh...



### Pros:
- Higher-order accuracy (typically **third-order** for Gaussian distributions) without derivatives.
- Handles **strong nonlinearity** better than EKF.
- Easier to implement if fff and hhh are complex (no Jacobians).
    

### Cons:
- Slightly higher computational cost (propagates multiple sigma points per step).
- Performance degrades in **very high-dimensional** state spaces due to the number of sigma points scaling with dimension.
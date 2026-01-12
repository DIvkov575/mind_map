
$z_t​​ ​\sim p(z_t​∣z_{t−1}​)$
$x_t \sim p(x_t​∣z_t​)​$

All models differ only in:
- domain of ztz_tzt​
- functional form of p(zt∣zt−1)p(z_t \mid z_{t-1})p(zt​∣zt−1​)
- functional form of p(xt∣zt)p(x_t \mid z_t)p(xt​∣zt​)


### Latent State Type

### Discrete Latent States

#### 1. Dynamics
- **Stationary / Fixed:** first-order Markov transitions
    [[Hidden Markov Model (HMMs)]]
- **Nonstationary / Switching / Semi-Markov:** duration-dependent or time-varying transitions
    Semi-Markov HMMs, Hierarchical HMMs
#### 2. Observation / Emission Model
- Arbitrary / discrete or continuous conditional emissions (e.g., multinomial, Gaussian).
    

---

### Continuous Latent States
#### 1. Dynamics
##### 1.1 Linear
- Gaussian noise, first-order Markov
- **Models:**
    - Linear dynamical systems (LDS)
    - [[Kalman filters]] / smoothers
    - AR / VAR models
##### 1.2 Nonlinear Parametric
- Known nonlinear functions
- **Models:**
    - Nonlinear SSMs
    - Extended / [[Unscented Kalman filters]]
    - Biophysical ODE/SDE models
##### 1.3 Learned / Neural
- Dynamics approximated from data via neural networks
- **Models:**
    - Neural state-space models
    - Deep Kalman filters
    - Latent RNNs / sequence VAEs
##### 1.4 Continuous-Time
- Continuous-time evolution
- **Models:**
    - Latent ODEs
    - Continuous-time SDEs

#### 2. Observation / Emission
##### 2.1 Linear / Gaussian
- **Models:** [[Kalman filter]], LDS
##### 2.2 Generalized Linear / Exponential Family
- **Models:** Poisson LDS, Negative Binomial SSMs, State-space GLMs
##### 2.3 Nonlinear / Neural
- **Models:** Deep generative SSMs, neural observation models

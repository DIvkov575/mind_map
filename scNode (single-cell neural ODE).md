
- Designed for **temporal, time-series single-cell data** where multiple timepoints are measured.
- Integrates a [[Variational Auto Encoder (VAE)]] and [[neural ODE]] to **predict gene expression at unobserved timepoints** (interpolation and extrapolation), effectively _generating realistic in-silico expression profiles_ in continuous time.
- Adds a **dynamic regularization term** so the latent representation is robust to distribution shifts when predicting at new times, improving forecast accuracy across time.
- The primary goal is **predictive modeling** of transcriptomic states across time and to help with trajectory inference when timepoints are missing.
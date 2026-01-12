[[Fitting Latent Dynamics]]
[[Koopman operator]]


### Time Series Analysis
#### 1. Graphically
- Plot both series on the same time axis.
- Also plot:
    - Each series detrended
    - Each series differenced
- Look for:
    - Shared trends
    - Lagged responses
    - Regime changes
        

This often suggests whether the relationship is contemporaneous, lagged, or spurious (trend-driven).

#### 2. Correlation and cross-correlation
Coefficients can be helpful for identifying trends/relationships, but 
[[Pearson coefficient (r)]]
[[Spearman’s rank coefficient (ρ_s)]]

[[Cross Correlation Function (CCF)]] (correlation/linearity of movents)

#### 3. Stationarity checks
Before most statistical methods:

- Augmented Dickey–Fuller (ADF)
    
- KPSS
    

If non-stationary:

- Difference
    
- Detrend
    
- Work with returns / growth rates
    

---
phenomenon where test error as a function of model capacity has two decreasing regimes separated by a peak near the interpolation threshold.
- First descent (classical regime): increasing model capacity reduces bias, so test error decreases
- Peak @ [[Interpolation Threshold]]: model is expressive enough to fit training data; variance&sensitivity are highest; test error spikes
- Second Descent (over parameterized regime): reduces test error again (begins interpolation


- Second Descent - defies incomplete classical belief ([[Bias-Variance Tradeoff]])  which assumes variance always increases with model capacity (this holds for small/medium models but fails in overparameterized regimes.
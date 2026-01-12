
### Underfitting
**What you see**
- High training error
- High validation/test error
- Training and validation errors are similar
**Interpretation**
- Model is too simple to capture the signal
- Bias-dominated regime
**Typical causes**
- Insufficient model complexity
- Insufficient training examples
- Excessive regularization
- Poor features
- Too few training steps

### Overfitting
**What you see**
- Low training error
- High validation/test error
- Large gap between training and validation error
**Interpretation**
- Model is memorizing noise
- Variance-dominated regime
**Typical causes**
- Model too complex for dataset size
- Insufficient regularization
- Data leakage or label noise
- Training too long

---
## Solutions
- regularization techniques [[Lasso regularization (L1)]] [[Ridge regularization (L2)]]
- (training) [[Dropout]] to reduce reliance on single features/neurons
- [[Early stopping]] by monitoring validation error
- 
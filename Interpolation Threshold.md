is the point at which a model first becomes expressive enough to fit the training data almost perfectly
- The interpolation threshold is smallest model cap such: $\min_\theta \; \mathcal{L}_{\text{train}}(\theta) \approx 0$

- Below threshold
	- model cannot it data (training error > 0)
	- test eror dominated by bias ([[Underfitting]])
- Near threshold
	- Model barely fits data
	- Small data/noise changes -> large param changes
	- Model unstable + worst test error
- Above threshold
	- Not necessarily overfitting
	- GD prefers smoother solutions - hence may generalize better
	- Can begin interpolating the data

- Marks point/regime where model is sufficiently expressive
- (Generalization dynamics shift) Test error peaks then improves as model size increases further ([[Double Descent]]) - contradicting [[Bias-Variance Tradeoff]] intuition



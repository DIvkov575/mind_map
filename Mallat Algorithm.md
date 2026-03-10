The **Mallat algorithm** is a fast method for computing the [[Discrete Wavelet Transform (DWT)]]  of a signal using a [[Filter Bank]] 

- **Start with the signal** x[n]
- **Filter the signal**:
    - Apply a **low-pass filter** h[n]→ gives the **approximation coefficients** A_1[n]
    - Apply a **high-pass filter** g[n] → gives the **detail coefficients** D_1[n]
- **Downsample** both outputs by 2 (keep every other sample):
	$A_1[n] = \sum_k h[k] \, x[2n - k], \quad D_1[n] = \sum_k g[k] \, x[2n - k]$
1. **Recursive decomposition**:
    - Take the approximation A_1[n] and repeat steps 2–3 to get A2,D2 and so on, for the desired number of levels.
2. **Output**:
    - The algorithm produces a **tree-like structure** of coefficients: the last approximation plus all detail coefficients at each level.


Downsampling both makes sense because of [[Nyquist-Shannon sampling theorem]]. (A sample frequency of one half is the minimum rate from which we can still reconstruct ... 🤷‍♂️)
 A wavelet is a wave like oscillation where amplitude begins at zero, increases, returns to zero.
If this wavelet were to be [[convolution | convolved]] with a signal created from the recording of a melody, then the resulting signal would be useful for determining when the middle C note appeared in the song.
- sets of complementary wavelets are useful in [[wavelet-base compression]] algorithms

<u>Definition</u>
**Wavelets** are functions used as building blocks to represent signals or functions via _scale_ and _location_, rather than only via global frequency (as with Fourier series).
Formally, given a **mother wavelet** ψ(t)\psi(t)ψ(t), a wavelet family is
$$\psi_{a,b}(t) = \frac{1}{\sqrt{|a|}}\,\psi\!\left(\frac{t-b}{a}\right)$$
where
- a = **scale** (controls frequency / resolution),
- b = **translation** (controls location).

<u>Localized Wavelets</u>
- Compact support (exactly zero outside a finite interval), or
- Rapid decay away from a center point
$$\psi(t) \approx 0 \quad \text{for } |t| \gg 0$$
$$\hat{\psi}(\omega) \approx 0 \quad \text{for } |\omega| \gg \omega_0$$
Types
- Haar Wavelet (perfect local in time)$$\begin{array}{c} \psi(t) =
\begin{cases}
1 & 0 \le t < \tfrac12 \\
-1 & \tfrac12 \le t < 1 \\
0 & \text{otherwise}
\end{cases} \end{array}$$
- Daubechies wavelets
- Morlet wavelet


<u>Why</u>?... (as opposed to [[Fourier transform | fourier]])
- **Fourier basis** $\sin(\omega t)$ $e^{i\omega t}$
    - Perfect frequency resolution
    - Completely _non-local_ in time (extends over all ttt)
- **Wavelet basis**:
    - Trades some frequency resolution for time (or space) localization
    - Can capture _where_ different frequencies occur
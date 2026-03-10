If a continuous-time signal x(t) is **band-limited** (i.e., its highest frequency component is $f_\text{max}$ Hz), then:
$$f_s \ge 2 f_\text{max} \implies x(t) \text{ can be perfectly reconstructed from its samples.}$$
Where:

- $fs$​ = sampling rate (samples per second)
- $f_\text{max}$​ = maximum frequency in the signal
- $2f_\text{max}$ is called the **Nyquist rate**.

Intuition
- Think of sampling as taking snapshots of a signal at regular intervals.
- If you sample **too slowly** (below Nyquist rate), **high frequencies overlap with low frequencies** — this is called **aliasing**.
- If you sample **fast enough** (at or above Nyquist rate), you capture all the information, and you can reconstruct the original continuous signal exactly using interpolation (e.g., sinc interpolation).


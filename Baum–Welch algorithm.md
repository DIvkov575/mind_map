Use **[[Expectation–Maximization (EM)]]**.
- **E-step**: compute expected state occupancies and transitions
- **M-step**: re-estimate parameters from these expectations
    
---

### E-step quantities

Using **forward–backward**:

**State posterior**

γt(i)=P(zt=i∣x1:T)\gamma_t(i) = P(z_t=i \mid x_{1:T})γt​(i)=P(zt​=i∣x1:T​)

**Transition posterior**

ξt(i,j)=P(zt=i,zt+1=j∣x1:T)\xi_t(i,j) = P(z_t=i, z_{t+1}=j \mid x_{1:T})ξt​(i,j)=P(zt​=i,zt+1​=j∣x1:T​)

---

### M-step updates (example)

**Transitions**

Aij=∑t=1T−1ξt(i,j)∑t=1T−1γt(i)A_{ij} = \frac{\sum_{t=1}^{T-1} \xi_t(i,j)}{\sum_{t=1}^{T-1} \gamma_t(i)}Aij​=∑t=1T−1​γt​(i)∑t=1T−1​ξt​(i,j)​

**Emissions**

- Gaussian: update means/variances weighted by γt(i)\gamma_t(i)γt​(i)
    
- Discrete: update symbol frequencies
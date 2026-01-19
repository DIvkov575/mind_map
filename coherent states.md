Coherent states are a special class of [[quantum states]] that most closely resemble classical behavior, especially for systems like the quantum [[harmonic oscillator]].

A coherent state $\vert \alpha \rangle$ is an eigenstate of the annihilation operator $\hat{a}$

a^ ∣α⟩=α ∣α⟩,\hat a \,|\alpha\rangle = \alpha \,|\alpha\rangle,a^∣α⟩=α∣α⟩,

where α∈C\alpha \in \mathbb{C}α∈C.

**Equivalent constructions:**

1. **Displacement-operator form**
	$|\alpha\rangle = \hat D(\alpha)\,|0\rangle, \quad \hat D(\alpha)=\exp(\alpha \hat a^\dagger-\alpha^*\hat a)$ i.e., a displaced vacuum.  
2. **Fock-basis expansion**
	$|\alpha\rangle = e^{-|\alpha|^2/2}\sum_{n=0}^{\infty}\frac{\alpha^n}{\sqrt{n!}}\,|n\rangle$ a Poissonian superposition of number states.

**Key properties:**
- **Minimum uncertainty:** They saturate the Heisenberg bound  
    $\Delta x\,\Delta p = \hbar/2$
- **Classical dynamics:** Expectation values follow the classical equations of motion of the oscillator.
- **Poissonian number statistics:**  
	$\langle n\rangle = |\alpha|^2$
	$\mathrm{Var}(n)=|\alpha|^2$    
- **Overcomplete, non-orthogonal:**  
    $\langle \alpha|\beta\rangle = \exp\!\left(-\tfrac12|\alpha|^2-\tfrac12|\beta|^2+\alpha^*\beta\right)$
- **Phase-space localization:** Gaussian packets in phase space (Wigner function is Gaussian and nonnegative).
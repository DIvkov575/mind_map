Homomorphic encryption is a cryptographic scheme that allows **computation directly on encrypted data**
Homomorphic encryption enables:

$\text{Dec}\big(f(\text{Enc}(x))\big) = f(x)$

- **Partially homomorphic encryption (PHE)**  
    Supports one operation only:
    - RSA: multiplication
    - Paillier: addition
- **Somewhat homomorphic encryption (SHE)**  
    Supports both addition and multiplication, but only a **limited number** of operations before noise becomes too large.
- **Fully homomorphic encryption (FHE)**  
    Supports **arbitrary computations** (any circuit depth).
    - First practical construction: Gentry (2009)
    - Modern schemes: BGV, BFV, CKKS
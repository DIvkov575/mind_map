The coefficients that decompose a tensor product of two [[Irreducable Representation (irrep)|irreps]] into a direct sum of irreps:
$$
V_{\lambda}\otimes V_{\mu}\;\cong\;\bigoplus_{\nu} N^{\nu}_{\lambda\mu}\,V_{\nu}.
$$
CG coefficients are the entries of the change-of-basis matrix from the product basis to the irrep basis. For $\mathfrak{su}(2)$ they are the familiar angular-momentum coupling coefficients $\langle j_1 m_1\, j_2 m_2 \mid J M\rangle$.

**Where they come from**

They are fixed entirely at the algebra level: apply [[Ladder Operators]] to the highest-weight vector of the product and read off the components. So you never need the group's [[Wigner-D matrices]] to compute them — the raising/lowering structure of the [[Lie Algebra]] is enough. This is the practical reason to work in the algebra when a group has no tabulated $D$-matrices.

**Why ML cares**

A layer that combines features by CG products maps irreps to irreps, so it is [[Equivariance|equivariant]] by construction. This is the tensor-product nonlinearity behind SO(3)-equivariant networks; the same recipe extends to $\mathfrak{su}(3)$, $\mathfrak{sp}(2n)$ once you have the ladder operators.

See [[Representation Theory]], [[Weight (Representation Theory)]].

- A [[Positional Encoding]] mechanism for [[Embeddings]]





SO(2)'s Lie algebra is 1-dimensional, spanned by a single skew-symmetric generator $J = \begin{pmatrix}0&-1\1&0\end{pmatrix}$. 
RoPE defines $\rho(\theta) = \exp(\theta J)$, a rotation by angle proportional to position — the representation is built directly by exponentiating the algebra's generator, not by looking up a group element table. 
That's the general recipe: pick a Lie algebra element (generator), representation = its exponential.
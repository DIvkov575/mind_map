Under the Linear Representation Hypothesis on ℎ, if the sequence of all latent thoughts with length 𝑚 can be expressed losslessly through corresponding text-based reasoning, then the length of text (in tokens) needs to be at least $\omega(\frac{d_h m} {log |V |})$ , where |V| denotes the vocabulary size


<u>Proof</u>  the set $\mathcal{H}$ of hidden embeddings is
$$\mathcal{H} = \left\{ \sum_{i=1}^{d_h} c_i s_i : c_1, \ldots, c_{d_h} \in \{0, \pm 1\} \right\},$$

where $\{s_1, \ldots, s_{d_h}\} \subset \mathbb{R}^{d_h}$ is the underlying semantic basis. Then, the set of length-$t$ latent reasoning sequences is $\mathcal{H}^m$. Since the semantic basis is linearly independent, the size of the set $\mathcal{H}$ of hidden embeddings is

$$|\mathcal{H}| = |\{0, \pm 1\}|^{|\{s_1, \ldots, s_{d_h}\}|} = 3^{d_h}.$$

Thus, the size of the set of length-$m$ latent reasoning sequences is

$$|\mathcal{H}^m| = |\mathcal{H}|^m = (3^{d_h})^m = 3^{d_h m}.$$

To represent the set $\mathcal{H}^m$ of length-$m$ latent reasoning sequences via the set $\mathcal{V}^{m'}$ of length-$m'$ text-based reasoning sequences losslessly, there needs to exist a surjective map from $\mathcal{V}^{m'}$ to $\mathcal{H}^m$, which implies that $|\mathcal{V}^{m'}| \geq |\mathcal{H}^m|$. Therefore,

$$m' = \log_{|\mathcal{V}|}(|\mathcal{V}|^{m'}) = \log_{|\mathcal{V}|} |\mathcal{V}^{m'}|$$
$$\geq \log_{|\mathcal{V}|} |\mathcal{H}^m| = \log_{|\mathcal{V}|}(3^{d_h m}) = \frac{d_h m \log 3}{\log |\mathcal{V}|} = \Omega\!\left(\frac{d_h m}{\log |\mathcal{V}|}\right). \qquad \square$$
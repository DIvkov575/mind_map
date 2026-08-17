[[Regularization]]
Layer normalization (LayerNorm) is a common operation used to stabilize the training process of deep neural networks (Ba et al., 2016). Although early Transformer models implemented LayerNorm at the output of each block, modern models consistently normalize preceding each block (Xiong et al., 2020; Takase et al., 2023). Given a representation z, the LayerNorm computes ( (z−µ(z))/σ(z))⊙γ +β, where µ and σ calculate the mean and standard deviation, and γ ∈ R d and β ∈ R d refer to learned element-wise transformation and bias respectively. 

Layer normalization can be interpreted geometrically by visualizing the mean subtraction operation as a projection of input representations onto a hyperplane defined by the normal vector [1, 1, . . . , 1] ∈ R d , and the following scaling to √ d norm as a mapping of the resulting representations to a hypersphere (Brody et al., 2023; Riechers, 2024). 

Kobayashi et al. (2021) notes that LayerNorm can be treated as an affine transformation zL + β, as long as σ(z) is considered as a constant (Appendix B). In this view, the matrix L computes the centering and scaling operations. Furthermore, the weights of the affine transformation can be folded into the following linear layer (Appendix C), simplifying the analysis. 

We note that current LMs such as Llama 2 (Touvron et al., 2023) adopt an alternative layer normalization procedure, [[RMSNorm]]
z(Zhang & Sennrich, 2019), where the centering operation is removed, and scaling is performed using the root mean square (RMS) statistic
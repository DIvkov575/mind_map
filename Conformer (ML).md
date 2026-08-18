
 The neural Conformer is a convolution-augmented [[Transformers]] originally developed for
 speech recognition.

 A typical Conformer block is:

$$
x_1 = x + \frac{1}{2}\operatorname{FFN}(x)
$$

$$
x_2 = x_1 + \operatorname{SelfAttention}(x_1)
$$


$$x_3 = x_2 + \operatorname{Convolution}(x_2)
$$


$$x_4 = x_3 + \frac{1}{2}\operatorname{FFN}(x_3)$$



$$y = \operatorname{LayerNorm}(x_4)
$$

 Its motivation is to combine:
 - [[Self-Attention]] for long-range dependencies.
 - [[Convolution]] for local patterns.
 - Feed-forward networks for position-wise transformations.


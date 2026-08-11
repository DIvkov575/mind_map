Stack several [[Boltzmann Machines]] specifically [[Restricted Boltzmann Machines (RBM)]] and train them jointly (unlike [[Deep Belief Networks (DBN)]] which stacked and greedily/sequentially trained the models)





Issues:
- Very sensitive to hyperparameter config
- [[Generative Adversarial Network (GAN)]]s give better sample quality
- [[Variational Auto Encoder (VAE)]] give tractable backprop-only training - no sampling
- [[ReLU]] and [[Batch Norm]] and better initialization schemes solved the orignal motivating problems (how to train a deep net without getting stuck)
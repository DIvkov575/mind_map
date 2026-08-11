Combining datasets from different sources (institutions, devices, users) into a single training set, as opposed to keeping data siloed and training only where it lives.

- the default/naive approach [[Federated learning]] exists to avoid — pooling requires moving raw data to one place, which [[Federated learning]] specifically sidesteps by moving model updates instead of data
- when pooling is done but privacy still matters, the pooled data itself is protected via [[Differential Privacy]] mechanisms (e.g. [[Laplace Privacy Mechanism]]) or [[Homomorphic Encryption]] (computing directly on encrypted pooled data without ever decrypting it)

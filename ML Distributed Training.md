

One layer of [[Distributed Compute]], specific to splitting ML training across devices.

**Data Paralelism**
Dataset too big
[[Collective Operation|All Reduce]]
[[Parameter-server]]

**Model Parallelism**
Model too big to fit into single device
[[Sharded Data Parallelism]]
[[Expert Parallelism]] - MoE
[[Tensor Parallelism]]

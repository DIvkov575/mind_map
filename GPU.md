- A GPU runs **thousands of threads at once**.
- Threads are grouped into **[[Warp]]** (usually 32 threads).
- warp scheduled on an [[Streaming Multiprocessing Unit (SM) | SM]]

Scaling beyond one GPU's own threads is [[Distributed Compute]]'s concern, not this note's.
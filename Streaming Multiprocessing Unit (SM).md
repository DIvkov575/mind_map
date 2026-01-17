core compute unit of an NVIDIA [[GPU]], where the GPU actually executes instructions on data.
An SM contains:
- **[[CUDA cores]]**: The “real” execution units that do arithmetic (like floating-point adds, multiplies, etc.). Each SM has many CUDA cores (e.g., 128 cores per SM on some GPUs).
- **[[Tensor cores]]** (on modern GPUs): Specialized cores for **matrix multiplications**, heavily used in deep learning.
- **Shared memory / L1 cache**: Fast memory shared between threads in the SM.
- **[[Warp]] scheduler**: Controls which threads execute when.
	- Figures out which instructions (threads/warps) to run where (core) and when
More
- SM executes in SIMD manor (NVIDIA [[SIMT]] (Single Instruction, Multiple Threads)
- SM schedules SIMT, but [[CUDA cores]] executes SIMD, [[Tensor cores]] specialized SIMD
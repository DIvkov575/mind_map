fundamental linear algebra operation where two matrices are multiplied:
$C = \alpha \cdot A \cdot B + \beta \cdot C$
- A is an $m \times k$ matrix
- B is a k×n matrix
- C is an m×n matrix
- α,β are scalars

- Eg. Multiplying datapoints x weight matrix + bias matrix
- **max_autotune_gemm mode** tries to pick the _fastest GEMM kernel_ using autotuning.

**GEMM autotuning** is the process of **optimizing the performance of GEMM on a specific hardware setup**
- CPU/GPU architecture
- Cache sizes
- Memory bandwidth
- Matrix dimensions
- Data layout (row-major vs column-major)
    
Autotuning involves automatically trying different 
- tiling sizes 
	-  Instead of multiplying the full matrices at once, you divide them into smaller “tiles” or blocks (submatrices).
	- Modern CPUs and GPUs have [[hierarchical memory]] (registers → L1 cache → L2 cache → RAM). Accessing data in cache is much faster than from main memory. Tiling ensures each small block fits in cache.
- loop unrolling factors
	- how many threads per block - minimize thread idle times
- thread/block configurations
- low-level parameters
to find the combination that gives the fastest execution for a given hardware and matrix size. Libraries like
- [[cuBLAS]]
- [[MKL]] 
- [[OpenBLAS]]
- [[CUTLASS]]
- [[TVM]]
often perform GEMM autotuning internally or provide interfaces to do so.
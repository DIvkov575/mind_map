- A **warp** = a group of threads executed together under [[SIMT]].
- threads in warp execute same instruction simultaneously -> multiple data part
- If threads diverge (e.g., an `if` branch), the warp executes each branch **serially**, masking inactive threads — this is called [[warp divergence]], and it hurts performance.
[[Thread (GPU)]]
- A **thread** is a **logical execution unit**: a small program running on the GPU.
- Each thread has:
    - Its **own registers** (private variables).
    - Its **own instruction pointer**.
    - Its **own view of memory** (local + access to shared/global memory).
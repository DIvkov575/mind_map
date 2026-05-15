The problem it solves: naive attention builds the full $N \times N$ attention score matrix in GPU memory. Kernel is memory-bandwidth bound — most time is spent shuffling that matrix to and from slow [[High Bandwidth Memory (HBM)]] not doing math.

	

Never materialize the full N×N matrix
  - Tile Q, K, V into blocks.
  - For each block, compute partial attention scores, 
  - Do softmax incrementally (with "[[Online softmax]]" trick — running max and sum that get corrected as new blocks arrive), and accumulate the output — all while keeping intermediates in fast on-chip [[SRAM]] (shared memory/registers) instead of [[High Bandwidth Memory (HBM)]]


  Result:
  - Big speedups (2–4×+) and, crucially, memory goes from O(N²) to O(N) — which is what made long context lengths practical.
  - It's exact, not an approximation — same numerical result as standard attention, just computed in a smarter order.

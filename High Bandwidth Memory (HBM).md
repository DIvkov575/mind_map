- HBM gets speed mostly by making the memory interface _extremely wide_

- DDR5 channel: ~64 bits
- GDDR6 GPU memory: ~32 bits per chip
- HBM stack: 1024-bit interface per stack

HBM is vertically stacked DRAM.
Instead of placing memory chips side-by-side on a PCB:
- multiple DRAM dies are stacked on top of each other
- connected using [[Through-Silicon Via (TSV)]]
- exposes many independent channels simultaneously.
Then the HBM stack sits very close to the GPU/accelerator on an [[Interposer]]
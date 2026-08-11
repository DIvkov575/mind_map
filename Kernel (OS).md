The privileged core of an operating system — the layer that manages hardware and exposes controlled abstractions (processes, files, devices, memory) to everything running above it in userspace. (Not to be confused with [[Kernel]], the RKHS/similarity-function sense.)

**Memory management**
- Every process has its own virtual address space; the kernel maps virtual addresses to physical RAM via page tables. On x86-64, only 48 of the 64 pointer bits are actually implemented — see [[Canonical Address Rule]] for the sign-extension rule that keeps the unused high bits self-consistent.
- [[Resident Set Size (RSS)]] is the kernel's own accounting of how much of a process's memory currently sits in physical RAM, as opposed to swapped out or never paged in.

**Device abstraction**
- The kernel exposes hardware as files under `/dev`. A [[Teletypewritter (TTY)]] is the abstraction for a real terminal device; a [[Pseudoterminal (PTTY)]] is a purely software-only pair of virtual devices the kernel exposes so a program can convincingly impersonate a real terminal for another program — same interface, no physical hardware required.

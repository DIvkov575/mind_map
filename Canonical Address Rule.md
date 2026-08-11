Rule applies to **64-bit x86 processors** and defines which virtual addresses the [[Kernel (OS)|kernel]]'s memory-management unit considers valid.

Although x86-64 uses **64-bit pointers**, current CPUs do **not implement all 64 bits** of virtual address space.

Typical implementations use **48 bits** of virtual address space. The remaining high bits must follow a rule so the address can be validated quickly.

Bits 63–48 must equal bit 47** = This is called **sign-extension** of bit 47.i
The amount of a process's memory that is currently held in physical RAM (as opposed to swapped out to disk or never paged in)

[[Proportional Set Size (PSS)]]


- Reported by ps, top, htop, /proc/<pid>/status (Linux), psutil.Process().memory_info().rss (Python).
- Includes code, data, stack, heap pages actually resident.
- Counts shared memory (e.g. shared libraries) against every process using it, so summing RSS across processes overcounts total RAM use.
- On Linux, [[Proportional Set Size (PSS)]] divides shared memory fairly across sharers — a better number when you care about "real" footprint


Buliding blocks for itneractoin patterns which are often used in in [[Single Program Multiple Data (SPMD)]] programs.
Eg.
[[Message Passing Interface (MPI)]]



**Broadcast**
- distrbute data from one processing unit to all processing units
**Reduce**
- Used to collect data or partial results from different processing units and combine them into a global result 
- Given $p$ units, message $m_i$ is on $p_i$. All $m_i$ are aggregated by $\otimes$ and result eventually stored on $p_0$.
- Reduction operator $\otimes$ must be associative at least
- Some algos require $\otimes$ to be commutative
**All Reduce**
- If result of reduce operation must be distributed to all procesing units
- Reduce + Broadcast
- For short messages, latency can be reduced by using a [[Hypercube (communication pattern)]] topology.
- If $p$ is power of two, can eb implemented with a [[Butterfly Algorithm]] and achieve optimal latency/bandwidth
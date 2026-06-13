[![](https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Butterfly_Network.jpg/500px-Butterfly_Network.jpg)](https://en.wikipedia.org/wiki/File:Butterfly_Network.jpg)

Tehcnique to link multiple computers into a high-speed network. This form of [[Multistage Interconnected Network Topology]] used to connect diff nodes in a multiprocessor system.

- Predictable routing paths
- Scales well as the number of nodes increases
- Lower hardware cost than a full mesh
- Supports parallel communication efficiently

### Routing idea
Each stage of the network examines one bit of the destination address and forwards the packet accordingly. For a network with NNN nodes, routing typically takes log⁡2N\log_2 Nlog2​N stages.

For example, in an 8-node butterfly network:

- 8 nodes = $2^3$
- Routing requires 3 stages
- At each stage, one destination-address bit determines the next hop
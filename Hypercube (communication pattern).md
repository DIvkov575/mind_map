![{\displaystyle d}](https://wikimedia.org/api/rest_v1/media/math/render/svg/e85ff03cbe0c7341af6b982e47e9f90d235c66ab)-dimensional hypercube is a network topology for parallel computers with 2 d ![{\displaystyle 2^{d}}](https://wikimedia.org/api/rest_v1/media/math/render/svg/e78df590f3fc81f0201082eaaa6844c145c8bdf3) processing elements. The topology allows for an efficient implementation of some basic communication primitives such as [[Collective Operation|Broadcast, AllReduce, and Prefix Sum]] The processing elements are numbered 0 ![{\displaystyle 0}](https://wikimedia.org/api/rest_v1/media/math/render/svg/2aae8864a3c1fec9585261791a809ddec1489950) through  ![{\displaystyle 2^{d}-1}](https://wikimedia.org/api/rest_v1/media/math/render/svg/54694717eaabc19537522464cb0d72b9be4541d9) . Each processing element is adjacent to processing elements whose numbers differ in one and only one bit. The algorithms described in this page utilize this structure efficiently.



Most of the communication primitives presented in this article share a common template.Initially, each processing element possesses one message that must reach every other processing element duringw the course of the algorithm. The following pseudo code sketches the communication steps necessary. Hereby, **Initialization**, **Operation**, and **Output** are placeholders that depend on the given communication primitive (see next section).

```
Input: message m
Output; depeonds on Init, operation, and output

Init
s \coloneqq m
for 0 \leq k \le d do
	y \coloneqq i XOR 2^k
	Send s to y
	Receive m from y
	Operation (s,m)
endfor
Output
```
- generalization of [[Radial Basis Function Networks (RBFN)]]
- WNs are single hidden layer networks that use a [[Wavelet]] as an [[Activation Function]]
- multidimensional wavelets preserve the “[[Universal Approximation Theorem (UAT)| universal approximation]]” 
	- Dense in L^2
	- Convergence rates tied to function smoothness
	- Often better sample efficiency for **piecewise-smooth** functions than sigmoids

- With [[Wavelet Decomposition]] a "wavelet library" can be built
- Each [[Wavelon]] (node within WN) can be constructed as best wavelet from our wavelet library

- linear combination of localized wavelets

Defined
$$f(x) \approx \sum_{k=1}^K a_k \, \psi\!\left(\frac{x - b_k}{s_k}\right)$$
- ψ: a mother wavelet (e.g., Morlet, Mexican hat)
- a_k​: output weights
- b_k​: translations (centers)
- s_k​: scales (dilations)


***
<u>Training</u>
#### Stage 1: fix wavelets
Choose $(b_k, s_k)$ **before** optimization.
Typical choices:
- bk​: k-means centers of $\{x_i\}$
- sk​: proportional to cluster radius / nearest-neighbor distance
- ψ: fixed (e.g. Morlet, Mexican hat)
Define design matrix:
$$\Phi_{ik} = \psi\!\left(\frac{x_i - b_k}{s_k}\right)$$



---
**Optimal Impl** 
(https://www.sciencedirect.com/science/article/pii/S0893608013000129#f000005)
1 HU model
$$g_{\lambda} \left(\right. x ; w \left.\right) = \hat{y} \left(\right. x \left.\right) = w_{\lambda + 1}^{\left[\right. 2 \left]\right.} + \sum_{j = 1}^{\lambda} w_{j}^{\left[\right. 2 \left]\right.} \cdot \Psi_{j} \left(\right. x \left.\right) + \sum_{i = 1}^{m} w_{i}^{\left[\right. 0 \left]\right.} \cdot x_{i}$$
Where $\Psi_{j} \left(\right. x \left.\right)$ is a multidimensional wavelet which is constructed by the product of $m$ scalar wavelets, $x$ is the input vector, m is the number of network inputs, $\lambda$ is the number of HUs and  stands for a network weight. 
The multidimensional wavelets are computed as follows:
$$\Psi_{j} \left(\right. x \left.\right) = \prod_{i = 1}^{m} \psi \left(\right. z_{i j} \left.\right)$$
where  $\psi$ is the mother wavelet and $z_{i j} = \frac{x_{i} - w_{\left(\right. \xi \left.\right) i j}^{\left[\right. 1 \left]\right.}}{w_{\left(\right. \zeta \left.\right) i j}^{\left[\right. 1 \left]\right.}}$

In the above expression, $i = 1 , \ldots , m , j = 1 , \ldots , \lambda + 1$ and the weights $w$  correspond to the translation ($w_{\left(\right. \xi \left.\right) i j}^{\left[\right. 1 \left]\right.}$) and the dilation ($w_{\left(\right. \zeta \left.\right) i j}^{\left[\right. 1 \left]\right.}$) factors. The complete vector of the **network parameters** comprises: $w = \left(\right. w_{i}^{\left[\right. 0 \left]\right.} , w_{j}^{\left[\right. 2 \left]\right.} , w_{\lambda + 1}^{\left[\right. 2 \left]\right.} , w_{\left(\right. \xi \left.\right) i j}^{\left[\right. 1 \left]\right.} , w_{\left(\right. \zeta \left.\right) i j}^{\left[\right. 1 \left]\right.} \left.\right)$. These parameters are adjusted during the training phase.![[Pasted image 20260125193706.png]]

%% **Initial Paramters**
- Cannot select randomly  [Ousar](https://www.sciencedirect.com/science/article/pii/S0893608013000129#br000230)

- The initialization of the direct connections  and the weights  is less important and they are initialized in small random values between 0 and 1.
- (SHOWN INNEFICIENT -- UNSURE WHY PAPER INCLUDED TS) Translation/Dilation initalization scores can be optimally determined by
	$w_{\left(\right. \xi \left.\right) i j}^{\left[\right. 1 \left]\right.} = 0.5 \left(\right. N_{i} + M_{i} \left.\right)$
	$w_{\left(\right. \zeta \left.\right) i j}^{\left[\right. 1 \left]\right.} = 0.2 \left(\right. M_{i} - N_{i} \left.\right)$
	where  and  are defined as the maximum and minimum of input .
	$M_{i} = max_{p = 1 , \ldots , n} \left(\right. x_{i p} \left.\right)$
	$N_{i} = min_{p = 1 , \ldots , n} \left(\right. x_{i p} \left.\right)$
-  %%

**Initial Parameters**
1) Construct a library  of wavelets.
	- Orthogonal Wavelet Library
	- Wavelet Frame
2) Remove the wavelets where support doesn't contain any sample points of the training data. 
	- remove the wavelets that have very few training patterns (Zhang 1993)
	- Magnitude based methos (Cannon 1995)
3) Rank the remaining wavelets and select the best wavelet regressors.

Alaternatively
- Residual Based Selection RBS is simple but innefective
- Orthogonal Residual Based Selection (ORBS) (RBS + OLS)
- ...
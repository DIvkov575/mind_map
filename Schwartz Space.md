
- Let S(Rn) be the **Schwartz space** of smooth functions that, together with all derivatives, decay faster than any polynomial.
- motivation
	- avoid boundary term in integration by parts
	- makes fourier transform clean and symmetric
	- natrual test space for tempered distribution
- closed
	- differentiation
	- multiplication by polynomials
	- [[Fourier transform]]
- smooth
- extermely well behaved test functions 
- eg. 
	- $e^{-x^2}$
- $neq$ eg. 
	- $\frac{1}{1+x^2}$
	- $e^{-|x|}$
	- 


The [Schwartz space](https://en.wikipedia.org/wiki/Schwartz_space "Schwartz space") S(R^n) is the space of all smooth functions that are [rapidly decreasing](https://en.wikipedia.org/wiki/Rapidly_decreasing "Rapidly decreasing") at infinity along with all partial derivatives. Thus ![{\displaystyle \phi :\mathbb {R} ^{n}\to \mathbb {R} }](https://wikimedia.org/api/rest_v1/media/math/render/svg/c09d2ad9304a0ab33ca6bff65e97bd109aa9d2a4) is in the Schwartz space provided that any derivative of ![{\displaystyle \phi ,}](https://wikimedia.org/api/rest_v1/media/math/render/svg/40d29807959b8784f00e4d77130fd93d90a628df) multiplied with any power of |x|, converges to 0 as |x|→∞. These functions form a complete TVS with a suitably defined family of [[Seminorms]]. More precisely, for any [[multi-indices]] and \alpha & \beta .![{\displaystyle p_{\alpha ,\beta }(\phi )=\sup _{x\in \mathbb {R} ^{n}}\left|x^{\alpha }\partial ^{\beta }\phi (x)\right|.}](https://wikimedia.org/api/rest_v1/media/math/render/svg/211730b9a06425c1904870029ee091660fe29711)

Then ![{\displaystyle \phi }](https://wikimedia.org/api/rest_v1/media/math/render/svg/72b1f30316670aee6270a28334bdf4f5072cdde4) is in the Schwartz space if all the values satisfy ![{\displaystyle p_{\alpha ,\beta }(\phi )<\infty .}](https://wikimedia.org/api/rest_v1/media/math/render/svg/d19d2347536c3ac6059c9b048d78d83ce861b2ed)

The family of seminorms pα,β![{\displaystyle p_{\alpha ,\beta }}](https://wikimedia.org/api/rest_v1/media/math/render/svg/1e3723b70548b8ab3f4d14471c57696d23068afc) defines a [locally convex](https://en.wikipedia.org/wiki/Locally_convex "Locally convex") topology on the Schwartz space. For n=1,![{\displaystyle n=1,}](https://wikimedia.org/api/rest_v1/media/math/render/svg/dba4db03e5186e479ecd9611484b8657140a7ff0) the seminorms are, in fact, [norms](https://en.wikipedia.org/wiki/Norm_\(mathematics\) "Norm (mathematics)") on the Schwartz space. One can also use the following family of seminorms to define the topology:![{\displaystyle |f|_{m,k}=\sup _{|p|\leq m}\left(\sup _{x\in \mathbb {R} ^{n}}\left\{(1+|x|)^{k}\left|(\partial ^{\alpha }f)(x)\right|\right\}\right),\qquad k,m\in \mathbb {N} .}](https://wikimedia.org/api/rest_v1/media/math/render/svg/1e1f2cff1d61f4b9a927010f3034fd16ef6e7797)

Otherwise, one can define a norm on S(Rn)![{\displaystyle {\mathcal {S}}(\mathbb {R} ^{n})}](https://wikimedia.org/api/rest_v1/media/math/render/svg/0078d18e4675b6e7e2acb6c2c25c65294193e36d) via ![{\displaystyle \|\phi \|_{k}=\max _{|\alpha |+|\beta |\leq k}\sup _{x\in \mathbb {R} ^{n}}\left|x^{\alpha }\partial ^{\beta }\phi (x)\right|,\qquad k\geq 1.}](https://wikimedia.org/api/rest_v1/media/math/render/svg/7a84f7aa32710210cdb46c980e61086758f9b780)

The Schwartz space is a [Fréchet space](https://en.wikipedia.org/wiki/Fr%C3%A9chet_space "Fréchet space") (that is, a [complete](https://en.wikipedia.org/wiki/Complete_topological_vector_space "Complete topological vector space") [metrizable](https://en.wikipedia.org/wiki/Metrizable_topological_vector_space "Metrizable topological vector space") locally convex space). Because the [Fourier transform](https://en.wikipedia.org/wiki/Fourier_transform "Fourier transform") changes ![{\displaystyle \partial ^{\alpha }}](https://wikimedia.org/api/rest_v1/media/math/render/svg/456c1354f357e40cdb9f5ee48e919b408d3171bb) into multiplication by xα![{\displaystyle x^{\alpha }}](https://wikimedia.org/api/rest_v1/media/math/render/svg/c7ecb06c51aa5eb67cb4363751c8774977ba3cd5) and vice versa, this symmetry implies that the Fourier transform of a Schwartz function is also a Schwartz function.

A sequence {fi}![{\displaystyle \{f_{i}\}}](https://wikimedia.org/api/rest_v1/media/math/render/svg/a98b80e62d2a39bb2bdf0dc2c882a3fd4b810c48) in S(Rn)![{\displaystyle {\mathcal {S}}(\mathbb {R} ^{n})}](https://wikimedia.org/api/rest_v1/media/math/render/svg/0078d18e4675b6e7e2acb6c2c25c65294193e36d) converges to 0 in S(Rn)![{\displaystyle {\mathcal {S}}(\mathbb {R} ^{n})}](https://wikimedia.org/api/rest_v1/media/math/render/svg/0078d18e4675b6e7e2acb6c2c25c65294193e36d) if and only if the functions (1+|x|)k(∂pfi)(x)![{\displaystyle (1+|x|)^{k}(\partial ^{p}f_{i})(x)}](https://wikimedia.org/api/rest_v1/media/math/render/svg/e982683596f5044cdccffc690936b18d089adba2) converge to 0 uniformly in the whole of Rn,![{\displaystyle \mathbb {R} ^{n},}](https://wikimedia.org/api/rest_v1/media/math/render/svg/d7035fcb9fe3ebecc6bc9f372f82d0352202c8bf) which implies that such a sequence must converge to zero in C∞(Rn).![{\displaystyle C^{\infty }(\mathbb {R} ^{n}).}](https://wikimedia.org/api/rest_v1/media/math/render/svg/748b2b926a6292230c217b0c47668748c00516a6)

D(Rn)![{\displaystyle {\mathcal {D}}(\mathbb {R} ^{n})}](https://wikimedia.org/api/rest_v1/media/math/render/svg/40967820fe4c745ac9e5246e47e5897b08b2dc9a) is dense in S(Rn).![{\displaystyle {\mathcal {S}}(\mathbb {R} ^{n}).}](https://wikimedia.org/api/rest_v1/media/math/render/svg/bde2a386c57e6ddd8f235df46adc909f26a470e0) The subset of all analytic Schwartz functions is dense in S(Rn)![{\displaystyle {\mathcal {S}}(\mathbb {R} ^{n})}](https://wikimedia.org/api/rest_v1/media/math/render/svg/0078d18e4675b6e7e2acb6c2c25c65294193e36d) as well.

The Schwartz space is [nuclear](https://en.wikipedia.org/wiki/Nuclear_space "Nuclear space"), and the tensor product of two maps induces a canonical surjective TVS-isomorphismsS(Rm) ⊗^ S(Rn)→S(Rm+n),![{\displaystyle {\mathcal {S}}(\mathbb {R} ^{m})\ {\widehat {\otimes }}\ {\mathcal {S}}(\mathbb {R} ^{n})\to {\mathcal {S}}(\mathbb {R} ^{m+n}),}](https://wikimedia.org/api/rest_v1/media/math/render/svg/d5c99948f4f689ddb466e6853e1e741af403e097)where ⊗^![{\displaystyle {\widehat {\otimes }}}](https://wikimedia.org/api/rest_v1/media/math/render/svg/769aaba98f277892ad4872fa3a3620550e96323d) represents the completion of the [injective tensor product](https://en.wikipedia.org/wiki/Injective_tensor_product "Injective tensor product") (which in this case is identical to the completion of the [projective tensor product](https://en.wikipedia.org/wiki/Projective_tensor_product "Projective tensor product")).
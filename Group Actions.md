Describes how a [[Groups|group]] $G$ "acts" on a set $X$ that respects structure

**Def** map $G \times X \to X \quad (g,x) \mapsto g\cdot x$
such that 
(i) $e\cdot x = x$
(ii) $(gh)\cdot x = g \cdot (h \cdot x) \quad g,h \in G,~ x \in X$

Contains same info as a homomorphism from G to the set of bijections on X

$\varphi: G \to Aut (X)$
$g \mapsto (x \mapsto g \cdot x)$



**
**Example**

Action answers "what do these group elements actually do"
Consider $G = \{0,1,2,3\}$ with addition mod 4
By itself these are symbols, but if $X$ are the corners of a square an action could be
0 = do nothign
1 = rotate 90
2 = rotate 180
3 = rotate 270
And the "compatability" condition $$(gh)\cdot x = g\cdot(h\cdot x)$$ just says that multiplying group elemenets corresponds to preforming their actions in sequence
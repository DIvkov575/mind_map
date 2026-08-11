
A Lie group is a set $G$ with two compatible structures:

1. [[Groups]] structure 
	1. multiplication $\mu: G\times G \to G$, $\mu(g,h)=gh$
	2. inversion $\iota: G\to G$, $\iota(g)=g^{-1}$
	3. associativity
	4. identity $e$
	5. inverses.
2. [[Smooth Manifold]] structure
	1. $G$ is covered by charts to $\mathbb{R}^n$ with smooth transition maps.



Examples
- $G$: $(\mathbb{R}^n,+)$
	translations $\dim_\mathbb{R}$: $n$
- $G$: $S^1=U(1)$
	unit complex numbers $\dim_\mathbb{R}$: $1$
- $G$: $GL_n(\mathbb{R})$
	invertible matrices $\dim_\mathbb{R}$: $n^2$
- $G$: $SO(3)$
	rotations of $\mathbb{R}^3$ $\dim_\mathbb{R}$: $3$
- $G$: $SU(2)$ description: unit quaternions; double-covers
	$SO(3)$ $\dim_\mathbb{R}$: $3$



The induced [[Lie Algebra]]


Start with $\mathfrak g := T_eG$ — the [[Tangent Space]] at the identity. This is the "derivative of $G$ at $e$"

Step 1: derive a vector field from a single tangent vector.
A lone $X\in\mathfrak g$ only lives at $e$. To turn it into something you can differentiate again, spread it across all of $G$ using left translation: $\tilde X_g := (dL_g)_e(X)$. This produces a left-invariant vector field $\tilde X$ — literally the derivative of the left-translation maps $L_g$, evaluated at $X$, at every point $g$.

Step 2: differentiate the vector fields against each other.
Vector fields have a standard bracket $[\tilde X,\tilde Yfromdifferentiating one vector field's flow along the other der failureof their flows to commute). Take this braand evalua
$$[X,Y] := [\tilde X,\tilde Y]_e \in \matg.$$
So the bracket on $\mathfrak g$ is, quiteliterally,$'s groupstructure at the identity — it's what's l"$G$ is no thrown away everything but the leading-order, linear approximat

Step 3: thy satisfiesthe Lie algebra axioms.
Bilineariti all comefor free from the vector-field bracket — no     separate c\mathfrakg,[\cdot,\cdot])$, the object derived from $G$, is a genuiract sense.
                                                Matrix shoall thisdifferentiation collapses to $[X,Y] = XY-YX$ —  you never ld machinery by hand.                                        
Recovering $G$ from what you derived: $\exp$    
Having derived $\mathfrak g$ from $G$, you want to know hod. Theexponential map $\exp:\mathfrak g \to G$, $\exp(X)=\ntial$e^X=\sum X^n/n!$ in the matrix case)integratesvative,locally. Near $0$, $\exp$ is a diffeoso near $eebra$\mathfrak g$ carry exactly the same informatiocurved group and the other as a flat vector space with a bracket.
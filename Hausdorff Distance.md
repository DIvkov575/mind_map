Measures how far two subsets of a [[Metric Space]] are from each other — not point-to-point distance, but *set-to-set* distance.

Let $(M,d)$ be a metric space. For each pair of non-empty subsets $X, Y \subset M$, the Hausdorff distance is:
$$d_{\mathrm{H}}(X,Y) := \max\left\{\, \sup_{x\in X} d(x,Y),\ \sup_{y\in Y} d(X,y) \,\right\}$$
![[Screenshot 2026-05-09 at 1.10.31 AM.png]]

- $\sup_{x\in X} d(x,Y)$ asks: what's the worst-case distance from a point in $X$ to its *nearest* point in $Y$? Taking the max of both directions makes it symmetric — $X$ could be entirely covered by $Y$ while $Y$ has one far-flung outlier, and the outlier is what determines $d_H$
- $d_H(X,Y) = 0$ iff $X$ and $Y$ have the same closure — this makes $d_H$ itself a genuine metric ($d$'s [[Metric Space|axioms]] lift to it) on the space of (closed, bounded) subsets of $M$
- used to compare shapes/point clouds directly (e.g. comparing two segmentation masks, or two predicted vs. ground-truth 3D structures) without needing point-to-point correspondence between them

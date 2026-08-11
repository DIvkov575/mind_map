Content-aware image resizing: instead of uniformly scaling or cropping, remove/insert the lowest-energy connected path ("seam") of pixels through the image, one at a time — typically found via [[Dynamic Programming]] over a pixel energy map (e.g. gradient magnitude).

- preserves visually important content (edges, salient objects) since low-energy seams tend to run through flat/low-detail regions, avoiding them cutting through edges
- computed classically as an energy-minimization DP: for each row, propagate the minimum cumulative energy path from the row above, then backtrack from the minimum endpoint

**Modern reuse as a training/eval objective**
Rather than only using seam carving for resizing itself, its edge-respecting property is repurposed as a *training objective* for attention-map upsampling in vision transformers: penalize attention values that cross detected edges (see [[Vision-Model Input Optimization]]) — turning "does this map respect boundaries the way a good seam-carving energy map would" into a differentiable signal. Also motivates new evaluation frameworks, since standard seam-carving benchmarks don't check whether a resized image still preserves downstream ViT performance.

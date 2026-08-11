Tracking note for the isolated-node reconnection pass (2026-08-11). 19 true isolates + 2 islands were reconnected to the main component; this note lists what's left, for later review. Delete this note once resolved.

## Weak/tentative links proposed but NOT made (need your judgment)

- **Cross Encoder** ↔ **Positional Encoding** — both are attention/query-key mechanics, but at different levels of abstraction (Cross Encoder is a retrieval-scoring architecture pattern; Positional Encoding is about how position enters attention's Q/K math). Real topical adjacency, but not a link a domain expert would necessarily write. Left unconnected.
- **Epistatic Interactions** ↔ **Linkage Disequilibrium** — both population/quantitative genetics, but LD is about allele *co-occurrence*, epistasis is about allele *interaction effects on phenotype* — related field, not the same mechanism. Left unconnected (unlike MAF, which got a real, direct link to LD).

## Islands/isolates with genuinely no candidate found in main (documented, not linked)

Grouped by apparent missing topic-hub — if you ever write a note on one of these topics, most of the cluster below it would attach immediately:

**No AI-agent-tooling/eval/safety hub:**
- Continuous Claude V3, Evals, Model Forensics, Linear Representation Hypothesis, J-Space (these five are also each other's most natural neighbors — none currently link to each other despite obvious overlap)

**No retrieval/RAG hub:**
- Corrective Retrieval-Augmented Generation (CRAG), Maximal Marginal Relevance (MMR), (RAG) Retrieval Augmented Generation + Context Engineering (island), Mem0 + Okapi BM25 (island) — all four/five are mutually relevant to each other too

**No systems/OS/DB hub:**
- Cache-Aside, Canonical Address Rule, RDBMs, Resident Set Size (RSS), Pseudoterminal (PTTY) + Teletypewritter (TTY) (island)

**No GPU/distributed-training hub:**
- ML Distributed Training cluster (10 nodes: Butterfly Algorithm, Collective Operation, Expert Parallelism, Hypercube, ML, ML Performance Optimization, Parameter-server, Sharded/Tensor Parallelism)
- GEMM/GPU/SM/Warp/cuBLAS (5 nodes)
- Flash Attention + High Bandwidth Memory (HBM)
- Special Function Units (SFUs) + Transcendental Functions/Instructions (3 nodes)

**No privacy hub:**
- Differential Privacy cluster (7 nodes: Additive noise mechanisms, Federated learning, Homomorphic Encryption, Laplace Privacy Mechanism, Laplace distribution, Pooling (datasets))

**No serverless/cloud hub:**
- (LFIS) Lambda Frontend Invoke Service, (eLSA) Lambda Sandbox Assignment, Firecracker microVM, Lambda (4 nodes)

**No stroke/vascular-model hub (own island, content improved but unconnected to main):**
- Ischemia, Occlusion, pMCAO

**No biochemistry/pharma/immunology hub:**
- IVYWREL enrichment, Immunoglobulins (Ig), Michaelis–Menten kinetics, Quinine, mmCIF
- Lys Bridge Swap + Salt Bridge (island)
- Sensorgram + Surface Plasmon Resonance (SPR) (island)
- Chemokines + Cytokines (island)
- Homolog + MSA (island)

**No crystallography hub:**
- Bravais Lattice, Honey Comb Lattice, Lattice (island)

**No complex-analysis hub:**
- Analytic Continuation + Cesàro Sum (island)
- Power Series + Radius of Convergence (island)

**No statistics/hypothesis-testing hub:**
- Kolmogorov–Smirnov (KS) test + Nonparametric (island)

**No dynamical-systems/physics hub:**
- Kuramoto Model + Oscillators (island)
- coherent states

**No neuroscience hub:**
- Cerebral Cortex + fsaverage (island)

**No tokenization hub:**
- Byte-Pair Encoding (BPE) + Tokenization Algorithms (island)

**No economics hub:**
- Efficient Market Hypothesis (EMH) + Stochastic Discount Factor (island)

**No C++/templates hub:**
- SFINAE + overload set (island)

**No bias-variance/model-selection hub (would need `Fitting`-adjacent hub, exists but weak):**
- Bias-Variance Tradeoff, Bootstrap Aggregating (Bagging), Double Descent, Interpolation Threshold (4-node island) — closest real candidate is `Fitting.md` (now linked to `Inductive Bias`), worth revisiting whether this island should link there too

## Genuine orphans (content reviewed, no defensible connection to anything)

- Efficient Exponent (10^x), Efficient Logarithm (log_10(x)) — the latter is literally just a venting comment about Obsidian's UI, not real content; candidate for deletion rather than reconnection
- Meme
- Ridge Function — its only link target, `Ridge Wavelets`, doesn't exist as a file (dead end)
- _temp — unlabeled scratch math, no identifiable topic
- Luc-Olivier Merson + Rest on the Flight into Egypt (1879) (art history island — no connection possible to anything else in the vault)

## Caveat on the graph analysis itself

macOS's filesystem is case-insensitive, so `[[Preregular Space]]` and the file `Preregular space.md` already resolved to the same file in real Obsidian use even before this pass — the analysis script used case-sensitive string matching in Python, which is stricter than Obsidian's actual link resolution. A handful of "isolate" classifications elsewhere in the original scan could in principle be affected by the same case-mismatch quirk; this wasn't exhaustively re-checked case-insensitively across all 119 originally-isolated nodes.


**The mental model**

Every eval, no matter how fancy, is four components:

dataset  →  task runner  →  scorer  →  aggregator  →  report
(cases)     (run system)    (grade)    (combine)      (number + uncertainty)

Two ways it fails:
- Construct invalidity — it measures something adjacent to what you care about (accuracy on a leaked test set; "helpfulness" that's really just length).
- [[Goodhart's Law]] — the instant you optimize against the metric, the optimizer finds the gap between the metric and the construct. Every metric you optimize degrades as a measure.

Keep those two failure modes in your head

---
1. The dataset

The cases are the eval. A brilliant scorer over a bad dataset measures nothing.

Sourcing cases, roughly in order of value:
- Real production/usage traffic (highest validity — it's the actual distribution).
- Curated hard cases — bugs you've hit, adversarial inputs, edge cases.
- Synthetic/generated — cheap, scalable, but risks measuring a fake distribution.

Non-negotiable properties:

- Held-out. Cases must not be in training data. Contamination is the #1 silent killer of benchmarks — a model "scoring 90%" that memorized the test set measures nothing. Hash your cases and check for overlap. Prefer cases created after the model's training cutoff.
- Stratified. Tag each case with metadata (difficulty, category, length, language). You report per-stratum, not just an average — an aggregate of 92% can hide 40% on the one slice you care about.
- Sized for the effect you need to see (see §4 — this is a statistics decision, not a vibe).
- Versioned & immutable. A case is {id, input, metadata, [reference]}. Freeze it. When you change a case, bump the eval version — otherwise scores across time are incomparable.

# A case is data, not code. JSONL, one per line, with a stable id.
{"id": "math-0042", "input": "What is 17*23?", "reference": "391",
 "meta": {"category": "arithmetic", "difficulty": "easy"}}

Rule of thumb: the case format should let a scorer run without knowing which system produced the output. Keep the dataset, the runner, and the scorer decoupled.

---
2. The task runner

Runs the system under test on each case, produces {case_id, output, trace}. Keep it dumb and separate from scoring. Two engineering requirements dominate:

- Determinism where possible. Pin temperature=0 (or a fixed seed), pin model version, pin prompt template. Log all of it into the run record. A run you can't reproduce isn't evidence.
- Cache by content hash. Key = hash(system_version, prompt, params). Generation is the expensive part; you'll re-score outputs many times while iterating on the scorer. Never re-generate to re-score.

run = {"case_id": "math-0042", "output": "391",
       "system": {"model": "X", "temp": 0, "prompt_sha": "ab12…"},
       "trace": {...}}  # tokens, latency, tool calls — for debugging failures

---
3. The scorer (the heart of it)

This is where the craft lives. There's a ladder from cheap+objective to expensive+subjective. Climb only as high as your task forces you to — every rung up costs money and adds noise.

Rung 0 — Exact / normalized match

When there's one right answer. The whole game is normalization: strip whitespace, lowercase, parse numbers, canonicalize.

def exact_match(output, reference):
    norm = lambda s: " ".join(s.strip().lower().split())
    return float(norm(output) == norm(reference))
The trap: too strict → false negatives ("391" vs "391."); too loose → false positives. Always eyeball the false negatives — they're usually normalization bugs, not model failures. For free-form answers, extract the answer span first (regex the final number, parse the boxed answer) then match.

Rung 1 — Programmatic / execution-based

The gold standard when it applies, because it's objective and ungameable. Code → run the unit tests. SQL → execute and compare result sets. JSON → validate against a schema. Math → symbolic equality (sympy), not string equality (x+1 vs 1+x).

def code_passes(output_code, test_code):
    try:
        exec(output_code + "\n" + test_code, {})   # sandbox this for real!
        return 1.0
    except Exception:
        return 0.0
This is why coding/math evals are trusted and "essay quality" evals aren't: verifiability. If you can turn your fuzzy task into a verifiable one, do it — it dominates every other scorer.

Rung 2 — Reference-based fuzzy match

You have a reference but exact match is too strict (translation, summarization, QA).

- Token F1 / ROUGE / BLEU — n-gram overlap. Cheap, interpretable, weak — insensitive to meaning, gameable by keyword stuffing. Fine as a coarse regression guard, bad as a north star.
- Embedding similarity — cosine between output and reference embeddings. Captures meaning better; blind to factual flips ("is safe" vs "is not safe" embed nearly identically). Never use alone for correctness.

def embedding_score(output, reference, embed):
    a, b = embed(output), embed(reference)
    return float(a @ b / (np.linalg.norm(a)*np.linalg.norm(b)))

Rung 3 — Model-graded (LLM-as-judge)

When quality is genuinely subjective (helpfulness, tone, "is this a good explanation"). Powerful and dangerous — full deep-dive in §5. Two shapes:
- Pointwise: "Score this 1–5 on the rubric." Easy to aggregate, but scores drift and compress (everything clusters at 3–4).
- Pairwise: "Is A or B better?" Far more reliable for subjective quality — humans and models are much better at comparing than absolute rating. Prefer pairwise whenever you can.

Rung 4 — Learned scorers

Train a model to be the metric.
- Reward models — regress human preference labels; this is the RLHF scorer.
- Classifier / discriminator — train a classifier to tell "good" from "bad" outputs; use P(good) as the score.
- C2ST (Classifier Two-Sample Test) — for distribution-matching tasks (does model output look like the target distribution?): train a classifier to separate model outputs from target outputs; its test accuracy is your distance — 50% = indistinguishable (perfect), 100% = trivially separable (bad). It's the ML form of a two-sample test, and it learns which features matter instead of you hand-weighting them.

Failure mode of learned scorers: confounds. A discriminator will cheat — latch onto length, formatting, or a topic keyword instead of the real construct. You catch this exactly like a science experiment: control the confound (match lengths), ablate (does accuracy survive truncation to equal length? stripping content words?), and report what it keyed on. Volunteering "60% of my discriminator's power was just length" is the difference between a real eval and a fooled one.

The ladder's lesson: pick the lowest rung that captures your construct. Every rung up trades objectivity for coverage.

---
4. Aggregation & statistics (where most people stop too early)

A ranking without uncertainty is not a result. A number with no error bar is a rumor.

Point estimates

- Mean accuracy for independent binary cases.
- pass@k for generative tasks where you sample k times and care if any is correct. Use the unbiased estimator, not "did any of my k samples pass" (that's biased):

def pass_at_k(n, c, k):          # n samples drawn, c correct, report@k
    if n - c < k: return 1.0
    return 1.0 - np.prod(1.0 - k/np.arange(n-c+1, n+1))

Uncertainty — always report it

Bootstrap CI is the universal tool — resample cases with replacement, recompute the metric, take percentiles. Works for any metric, no distributional assumptions:

def bootstrap_ci(scores, B=10000, alpha=0.05, rng=np.random.default_rng(0)):
    s = np.asarray(scores); n = len(s)
    boot = np.array([rng.choice(s, n, replace=True).mean() for _ in range(B)])
    return s.mean(), *np.percentile(boot, [100*alpha/2, 100*(1-alpha/2)])

Comparing two systems — the mistake everyone makes

Do not compare two independent CIs and check for overlap — that's underpowered and wrong. Because both systems run on the same cases, use a paired test — resample cases, take each system's score on the resampled set, look at the difference:

def paired_bootstrap(a, b, B=10000, rng=np.random.default_rng(0)):
    a, b = np.asarray(a), np.asarray(b); n = len(a)
    diffs = np.array([(lambda idx: (a[idx]-b[idx]).mean())
                      (rng.integers(0, n, n)) for _ in range(B)])
    return (a-b).mean(), np.mean(diffs > 0)   # effect, P(A>B)
Pairing removes the huge variance component of "some cases are just harder," so you detect much smaller true differences with the same N. For paired binary outcomes use McNemar's test (only the disagreement cases carry information).

Ranking many systems

Pairwise preference data → fit Bradley-Terry (a logistic model of P(A beats B)), report win-rates with CIs. Elo is an online approximation of Bradley-Terry — fine as a live leaderboard, but it's order-dependent and needs hundreds of games to converge, so it's the wrong estimator for a final report on a handful of systems.

Sample size / power — decide before you run

"How many cases?" is answered by the effect you need to detect. Detecting a 2-point difference at 80% power needs far more cases than detecting 20 points. Ballpark for a proportion, the CI half-width is ≈ 1/√N (N=100 → ±10%, N=1000 → ±3%). If configs differ by less than your CI, the honest report is "this eval cannot separate them" — not a confident #1.

Variance reduction

- Pair everything (same cases across systems).
- Temperature 0 where determinism is acceptable.
- Stratify and report per-slice.
- More cases beat more samples-per-case for tightening a mean.

---
5. LLM-as-judge, done properly

The most useful and most abused scorer. Treat the judge as another system that needs its own eval.

Rubric design. Vague rubric → noisy judge. Give it:
- a specific, decomposed rubric (score each dimension separately, not one holistic 1–10),
- anchored scales (what does a 2 vs a 4 concretely look like — with examples),
- structured output (force JSON: {reasoning, scores:{...}, verdict}) so it's parseable and so it reasons before it scores,
- reference/rubric in context when you have one (reference-guided grading is much more reliable than open-ended).

JUDGE = '''Compare reply A and reply B to the user message.
Judge ONLY on {criterion}. Ignore length and formatting.
Return JSON: {{"reasoning": "...", "winner": "A"|"B"|"tie"}}.
User: {input}
A: {a}
B: {b}'''

Known judge biases — you must neutralize each:

┌──────────────────┬─────────────────┬─────────────────────────────┐
│       Bias       │     Symptom     │         Mitigation          │
├──────────────────┼─────────────────┼─────────────────────────────┤
│                  │ Favors          │ Randomize order; run both   │
│ Position         │ whichever is    │ orders, keep the vote only  │
│                  │ "A" (or "B")    │ if consistent, else call it │
│                  │                 │  a tie                      │
├──────────────────┼─────────────────┼─────────────────────────────┤
│                  │                 │ Instruct to ignore length;  │
│ Verbosity        │ Favors the      │ control/match lengths; be   │
│                  │ longer answer   │ suspicious if winner is     │
│                  │                 │ always longer               │
├──────────────────┼─────────────────┼─────────────────────────────┤
│                  │ Favors text     │ Use a different model       │
│ Self-preference  │ from its own    │ family as judge than the    │
│                  │ model family    │ one under test              │
├──────────────────┼─────────────────┼─────────────────────────────┤
│ Sycophancy /     │ Everything      │ Pairwise instead of         │
│ leniency         │ scores 4/5      │ pointwise; force a decision │
└──────────────────┴─────────────────┴─────────────────────────────┘

Calibrate the judge against humans — this is mandatory before you trust it. Have humans label a sample (50–100 pairs). Run the judge on the same pairs. Measure agreement with Cohen's κ (agreement corrected for chance — raw % agreement is misleading when one label dominates):

def cohen_kappa(y_human, y_judge):
    labels = sorted(set(y_human) | set(y_judge))
    idx = {l:i for i,l in enumerate(labels)}
    n = len(y_human); m = np.zeros((len(labels),)*2)
    for h,j in zip(y_human, y_judge): m[idx[h], idx[j]] += 1
    po = np.trace(m)/n
    pe = (m.sum(0) @ m.sum(1))/n**2
    return (po - pe)/(1 - pe)
κ < 0.4 → the judge is basically noise; don't scale it. κ > 0.6 → reasonable; let it grade thousands. Also measure human–human agreement — that's the ceiling. If two humans only agree κ=0.5, no judge can beat that, and it tells you the task itself is ambiguous.

---
6. Meta-evaluation — how you know the eval is good

This is the step that separates people who have an eval from people who are good at evals. Your cheap eval is only trustworthy to the degree it agrees with an expensive oracle.

- Build a small gold set graded by the highest-validity method you have (careful humans).
- Run your cheap eval on the same items.
- Report rank correlation (Spearman ρ / Kendall τ) between cheap-eval ranking and gold ranking. That correlation is the quality of your eval.
- When they diverge, the cheap eval is wrong — fix it or throw it out.

Two more sanity instruments that catch broken evals instantly:
- Gold anchor / known-good baseline. Put a known-best system (or the human reference) into the eval as a hidden contestant. If your eval can't rank the known-best on top, the eval is broken — stop and fix it before trusting any ranking. It also gives you a ceiling ("system X reaches 94% of human").
- Negative controls. Feed deliberately-bad or shuffled inputs; the score must drop. If a scrambled answer scores well, your scorer is keying on the wrong thing.

---
7. The engineering around it

Evals are software; treat them like it.

- Cache generations by content hash (§2). Iterate on scorers for free.
- Version everything: dataset version, prompt version, model version, scorer version, all in the run record. A score without provenance is uncomparable.
- Regression suite in CI. A small, fast, high-signal subset that runs on every change and fails the build on a drop. Separate from the big periodic eval.
- Store per-case results, not just aggregates. The aggregate tells you if something regressed; the per-case diff tells you what. Build a "what flipped from pass→fail" view — that's where debugging happens.
- Golden transcripts / snapshot tests for deterministic behaviors.
- Track cost & latency as first-class metrics next to quality — a config that's 1% better and 5× slower usually loses.

---
8. The pitfalls checklist (print this)

9. Contamination — test data leaked into training. Check.
10. No error bars — you can't distinguish signal from noise. Always bootstrap.
11. Comparing overlapping CIs instead of a paired test — underpowered; use paired bootstrap / McNemar.
12. Aggregate hides slices — always report per-stratum.
13. Uncalibrated judge — measure κ vs humans before trusting it.
14. Judge biases — position/verbosity/self-preference uncontrolled.
15. Pointwise where pairwise would be stable — subjective quality wants comparisons.
16. Goodhart — you're now optimizing the metric; it has stopped measuring the construct. Rotate held-out sets; keep a metric you don't optimize.
17. Normalization bugs counted as model failures — eyeball false negatives.
18. No meta-eval — you never checked the cheap metric correlates with ground truth.
19. Under-powered N — you're ranking systems whose true difference is below your resolution.
20. Elo on tiny N — order-dependent; use Bradley-Terry with CIs.

---
The through-line

Cheap objective scorers where you can (climb down the ladder by making tasks verifiable), model/human judges only where you must, always with uncertainty, always paired for comparisons, judges calibrated against humans, and the whole instrument meta-evaluated against a gold oracle. The flashy aggregate number is the one most likely to be lying; the controlled, distributional, significance-tested, oracle-calibrated version is the one that tells the truth.

Want me to go deep on any single piece — I'd suggest the statistics (bootstrap/Bradley-Terry/power, with worked numbers), LLM-judge calibration (full rubric + bias-control harness), or learned scorers / C2ST (build one end to end)?
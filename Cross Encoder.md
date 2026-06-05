is a type of model used in information retrieval and NLP that takes **two texts as input together** and outputs a relevance score.

A [[Bi-Encoder]] compresses each text into a fixed-size vector independently— it can't see the other text while encoding. A cross-encoder sees both together, so it can reason about word-level interactions:
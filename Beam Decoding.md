- ( beam search )
- Heuristic search algorithm commonly used in sequence generation tasks (eg. machine translation, text generation, and speech recognition)

When generating a sequence $y_1, y_2, \dots, y_T$​ given input x (e.g., a sentence in another language):
$\hat{y} = \arg\max_{y} P(y|x) = \arg\max_{y} \prod_{t=1}^T P(y_t | y_{<t}, x)$

**Greedy decoding** selects the most probable token at each step:
$y_t = \arg\max_{y} P(y_t | y_{<t}, x)$

- Simple but can miss globally optimal sequences because early choices can block better overall sequences.
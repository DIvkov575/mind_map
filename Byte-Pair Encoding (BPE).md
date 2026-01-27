Byte-Pair Encoding (BPE) is a subword [[Tokenization Algorithms| tokenization algorithm]] used to convert text into a sequence of tokens for models such as language models.

- Start with text split into individual characters (plus an end-of-word marker, often `</w>`).
- Count all adjacent character pairs.
- Replace the most frequent pair with a new merged symbol (add rather than replace w/in vocabulary)
- Repeat steps 2–3 until a target vocabulary size is reached.

Byte-level BPE
- Symbols = bytes
- Alphabet size = 256
- Text is first encoded as UTF-8 bytes
- Each byte becomes one symbol

Codepoint-level BPE
- Symbols = Unicode codepoints
- Alphabet size ≈ 100k+
- Text is decoded first
- Each codepoint is one symbol
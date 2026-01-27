*Not an official term - I made ts up*

Quality on sequence/transformer models degrades as seqeunces get long 
Because:
- attention dilutes with long sequences -> signal:noise ratio decreases
- Harder to distinguish [[Positional Encoding]]s in long sequences
- May extrapolate poorly (if seq. longer than training data)
- Difficulty packing information into [[Embeddings]] of finite/fixed dimension 


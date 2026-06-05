
technique that improves standard RAG by adding a self-correction step— it evaluates whether the retrieved documents are actually relevant before using them to generate an answer.

**How CRAG Works**

```
Query → Retrieve documents → EVALUATE relevance → Then decide what to do
```
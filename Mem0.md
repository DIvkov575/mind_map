
Based on [[MemGPT]] Paper. Applies [[Information Retrieval]] techniques to an agent's long-term memory store — the same underlying problem [[Continuous Claude V3]]'s persistence layer solves for a coding agent specifically.

**Write** - save embedding, relationships, timestamp
**Read** - Semantic search, keyword match ([[Okapi BM25]]), graph traversal -> fuse


**Three Stores**
[[Vector Database]]
[[Graph Database]]
[[SQLite]]


--- 
The Three Stores

┌─────────────────────────────────┬───────────────────────────────┬────────────────────────────┐
│              Store              │         What it holds         │        Query method        │
├─────────────────────────────────┼───────────────────────────────┼────────────────────────────┤
│ Vector                          │ Embedded fact strings         │ Cosine similarity against  │
│ (Qdrant/Chroma/Pinecone/etc)    │                               │ query embedding            │
├─────────────────────────────────┼───────────────────────────────┼────────────────────────────┤
│ Graph (Neo4j, optional)         │ Entities + relationships      │ Traversal — "what entities │
│                                 │ extracted from facts          │  relate to X?"             │
├─────────────────────────────────┼───────────────────────────────┼────────────────────────────┤
│ SQLite (local metadata)         │ Timestamps, user_id,          │ Filtering before/after     │
│                                 │ agent_id, hash dedup          │ vector search              │
└─────────────────────────────────┴───────────────────────────────┴────────────────────────────┘


How They Combine on Read

1. Semantic search — embed the query, find top-K nearest vectors
2. BM25 keyword search — lemmatized token overlap (catches exact names/terms vectors miss)
3. Entity boost — if the query mentions a known entity, memories linked to that entity get a score bump via the graph
4. Score fusion — weighted sum of all three signals → final ranking
5. Optional reranker — a [[Cross Encoder]] model re-scores the top candidates for precision

How They Combine on Write

1. LLM extracts atomic facts from conversation
2. LLM extracts entities + relationships (separate call)
3. Each fact → embedded → stored in vector DB with metadata
4. Each entity pair → upserted into graph as (entity)-[relationship]->(entity)
5. Dedup: new facts compared against existing memories by vector similarity — if above threshold, skip (or link)

---
Key Design Choice: Additive-Only

Memories are never updated or overwritten. If your preference changes ("I now prefer dark mode"), that's a new memory. Old one stays. Recency + scoring handles which surfaces — the latest "prefers dark mode" outranks the older "prefers light mode" at query time. No conflict resolution logic needed.

This is the architectural bet: easier writes (append-only) at the cost of slightly noisier reads (old facts still exist, just ranked lower).
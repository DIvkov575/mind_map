Maximalist Harness (4 Layers)

**Layer 1** - Skills

|                   | eg.                                               |
| ----------------- | ------------------------------------------------- |
| **Planning**      | create-plan, implement-plan, discovery-interview  |
| **Debugging**     | fix, debug, sleuth-workflow                       |
| **Code Quality**  | qlty-check, commit, premortem                     |
| **Understanding** | explore, tldr-context, semantic-search            |
| **Session**       | create-handoff, resume-handoff, continuity-ledger |


**Layer 2** - Hooks

|     | eg                         |
| --- | -------------------------- |
|     | Formatting                 |
|     | Inject skills              |
|     | Include summary            |
|     | Formatting/Linting         |
|     | Subagent Learning          |
|     | Session Learning + Handoff |



**Layer 3** - subagents

|     |     |
| --- | --- |
|     |     |


**Layer 4** - Persistence + Analysis ([[Context Engineering]] applied to a coding agent's session state — the same [[Information Retrieval]] problem [[Mem0]] solves for general agent memory)

5-layer static analysis that replaces reading raw code:
L1: AST        → "what functions exist?" (signatures, classes)
L2: Call Graph  → "who calls what?" (forward + backward)
L3: CFG        → "how complex?" (cyclomatic, branches)
L4: DFG        → "where do values come from?" (variable tracking)
L5: PDG        → "what affects line N?" (program slicing)

|                   | Tech                          | Purpose                               |
| ----------------- | ----------------------------- | ------------------------------------- |
| Archival          | [[PostgreSQL]] + [[pgvector]] | Semantic search across past sessions  |
| Session State     | PostgreSQL                    | Current session tracking, file claims |
| Handoffs          | [[YAML]]                      | Cross-session continuity              |
| Symbol Index      | Json files in /tmp            | AST-derived function/class registry   |
| Continuity Ledger |                               |  AST-derived function/class registry  |


 Index is an auxiliary data structure — usually a [[B-Tree]] — that maps column values to row locations. Instead of scanning every row (a "full table scan"), the engine walks the tree to jump straight to matching rows. 
 - B-tree: ordered, great for equality and range queries (WHERE x > 5).
- Hash index: O(1) equality lookups, useless for ranges.
- Bitmap index: efficient for low-cardinality columns (e.g. a boolean or status flag).
- Composite index: multi-column; order matters (leftmost-prefix rule).








IN (subquery) vs JOIN

IN (SELECT …) is a semi-join: 
- "keep attainment rows whose id appears anywhere in that subquery's results."
- It doesn't add columns, doesn't duplicate rows. Like a filter

Engines can execute IN (subquery) two ways
- (a) as a streaming hash semi-join
- (b) by materializing the whole subquery result first, then probing.
 
Caveat: a JOIN can multiply rows if the right side has duplicate keys (that's the fan-out we hit in our local join). Here it's safe only because mapper_filtered is deduped to unique attainment_report_id… actually it's deduped on the pair, so this rewrite needs the same care our split did. Not free.

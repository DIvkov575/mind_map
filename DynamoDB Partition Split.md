A [[DynamoDB]] partition ([[DynamoDB Replication Group|replication group]]) is not fixed. The engine **splits** it automatically along the key space. Splits are one-way and transparent.

### Key space

The [[Partition Key]] value is run through an **MD5-based hash** into a 128-bit ring; contiguous hash **ranges** are assigned to partitions. A split picks a **split point** in the range and hands each half to a new replication group; the parent is retired.

### Split triggers

- **Size split** — partition exceeds **~10 GB**. Split point chosen near the storage midpoint of the B-tree so each child holds ~half the bytes.
- **Throughput split** — sustained load approaches the partition's hardware ceiling (**~3000 RCU / ~1000 WCU**). Split point chosen to separate the hot key range from the cold one, redistributing load.

### The unsplittable unit

All items sharing one partition-key value hash to the **same** point, so they always live in one partition. A single hyper-hot key therefore **cannot** be split apart — it caps at one partition's throughput. Mitigations: [[DynamoDB Capacity Modes|adaptive capacity]] can isolate that key onto its own partition, but true fixes are **write sharding** (suffix the key) or caching via [[DAX]] / [[Cache-Aside]].

### Historical gotcha

Early DynamoDB divided a table's provisioned throughput **evenly** across partitions (`table_throughput / num_partitions`). After a split, each child inherited half, so a table that had been scaled up then split could **shrink** the per-partition allowance and start throttling — the notorious "splitting for throughput dilution" problem. This is why the admission model moved to **bursting → adaptive capacity → global admission control** (see [[DynamoDB Capacity Modes]]).

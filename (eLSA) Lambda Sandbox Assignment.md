 (service) the internal routing/assignment layer [[(LFIS) Lambda Frontend Invoke Service]] calls into. It owns the actual decision of "which sandbox handles this invoke," separate from LFIS, which only gets you to the right eLSA node.

**IdleSandboxTracker.** A per-function-version data structure eLSA maintains — a queue of sandbox IDs currently idle (not running anything) for that function version. When eLSA needs to satisfy an invoke, it pops the front of this queue if non-empty; that's the entire "find a warm [[Firecracker microVM|sandbox]]" step.




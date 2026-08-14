The [[Lambda]] request-routing step. It receives an admitted invocation, forwards it to [[Lambda Environment Assignment]], and returns or records the result for the invocation mode.

Routing does not choose a worker, initialize code, or keep an environment warm. There is no customer control for this step: remove unnecessary Lambda invocations and keep payloads small enough that routing and serialization do not dominate short handlers.

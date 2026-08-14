The execution-environment reuse and cleanup concept referenced by [[Lambda]]. AWS publishes lifecycle behavior but no fixed idle-retention period or reclamation algorithm.

### Lifecycle quantities

- After the runtime and all extensions finish an invocation, Lambda freezes the environment. A later invocation may thaw and reuse initialized objects, connections, and `/tmp` contents.
- `/tmp` is configurable from **512 MB to 10,240 MB** and survives both freezing and an invocation-failure reset, but not eventual environment destruction.
- Shutdown allows **0 ms** with no extensions, **500 ms** with an internal extension, and **2,000 ms** with one or more external extensions. Lambda sends `SIGKILL` if the limit expires.
- Lambda terminates environments every few hours for runtime updates and maintenance, including environments serving continuously invoked functions. Code therefore cannot assume indefinite lifetime.
- Provisioned concurrency maintains the configured number of pre-initialized environments, although individual environments are still recycled in the background.
- An invocation failure resets the environment. A later invocation can perform a suppressed initialization whose Init time is included in the reported invocation duration.

### Optimization implications

- Cache immutable assets and reusable clients in process state or `/tmp`, but never depend on that cache for correctness.
- Maintain keep-alive connections and reconnect when reuse fails; Lambda purges idle connections over time.
- External extensions consume part of the function timeout during Invoke and receive at most 2 seconds for shutdown cleanup.
- Provisioned concurrency improves latency consistency, not permanence: recycling and rare resets can still reinitialize an environment.

Source: [Lambda execution environment lifecycle](https://docs.aws.amazon.com/lambda/latest/dg/lambda-runtime-environment.html).

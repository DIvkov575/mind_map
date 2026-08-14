The execution-environment cleanup concept referenced by [[Lambda]]. AWS does not publish an internal reclamation algorithm or a fixed idle-retention period as a customer contract.

Public lifecycle behavior:

- After an invocation, Lambda freezes and retains the execution environment for some time so a later invocation can reuse initialized objects, connections, and `/tmp` contents.
- Lambda may terminate an environment after inactivity and also recycles environments for runtime updates and maintenance, including environments serving continuously invoked functions.
- An invocation failure can reset the environment; a later invocation may perform a suppressed initialization.
- Provisioned concurrency maintains the configured number of pre-initialized environments, although Lambda can still recycle individual environments in the background.
- Code must remain stateless and must not assume that any environment survives indefinitely.

Source: [Lambda execution environment lifecycle](https://docs.aws.amazon.com/lambda/latest/dg/lambda-runtime-environment.html).

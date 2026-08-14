The customer-visible cold path in [[Lambda]]: when no reusable execution environment is available, Lambda creates and initializes another environment before invoking the function.

AWS does not expose the worker-selection or fleet-placement algorithm as a public contract. What is public:

- Each standard Lambda execution environment handles one invocation at a time.
- A function can add up to **1,000 execution environments every 10 seconds** in each Region; Lambda attempts to refill that allowance continuously.
- The allowance is per function, does not accumulate while unused, and remains bounded by account and function concurrency controls.
- Reserved concurrency limits and reserves concurrency but does not pre-initialize environments; provisioned concurrency pre-initializes them.

See [[Lambda Concurrency and Scaling]] for the throughput model.

Sources: [Lambda scaling behavior](https://docs.aws.amazon.com/lambda/latest/dg/scaling-behavior.html) and [Understanding Lambda function scaling](https://docs.aws.amazon.com/lambda/latest/dg/lambda-concurrency.html).

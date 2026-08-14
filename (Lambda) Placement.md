The customer-visible [[Lambda]] cold path. When no reusable execution environment is available, Lambda downloads the function code, prepares an environment, starts extensions and the runtime, and runs static initialization before invoking the handler.

### Quantitative envelope

- Standard on-demand initialization has a **10-second** Init-phase limit. If initialization does not finish, Lambda retries it with the first invocation under the function's configured timeout, up to **900 seconds**.
- Each function can add at most **1,000 execution environments per 10 seconds** in a Region. Lambda attempts to refill this allowance continuously at an idealized average of 100 environments/s, but unused allowance never accumulates above 1,000.
- Even with a full initial allowance, a completely cold request for 5,000 additional environments needs the first 1,000 plus roughly **40 seconds** to refill the remaining 4,000 under ideal conditions. This is a lower-bound estimate, not a latency guarantee.
- For short synchronous functions, the same scaling envelope is capped at **10,000 additional requests/s per 10 seconds**.

### Optimization implications

- Provisioned concurrency removes environment creation from the request path for its configured baseline; AWS suggests observed peak concurrency plus about **10%** headroom.
- Smaller dependency packages and less static initialization reduce cold-start duration. Moving reusable initialization outside the handler improves warm duration but increases cold initialization, so lazy-load features that are rarely used.
- More memory supplies more CPU; CPU-bound initialization may become faster at a higher memory setting.
- Existing warm environments and provisioned concurrency reduce the number of new environments needed during a burst.

AWS does not expose its worker-selection or fleet-placement algorithm as a public contract. See [[Lambda Concurrency and Scaling]] for the full capacity model.

Sources: [Lambda execution environment lifecycle](https://docs.aws.amazon.com/lambda/latest/dg/lambda-runtime-environment.html), [Lambda scaling behavior](https://docs.aws.amazon.com/lambda/latest/dg/scaling-behavior.html), and [provisioned concurrency](https://docs.aws.amazon.com/lambda/latest/dg/provisioned-concurrency.html).

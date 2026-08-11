The set of function-template specializations still under consideration during C++ overload resolution, for a given call.

- during overload resolution, the compiler substitutes candidate types into every template in the overload set and picks the best-matching viable candidate
- [[SFINAE]] ("Substitution Failure Is Not An Error") is the rule that governs what happens when a substitution fails: the failing specialization is silently **removed from the overload set** rather than triggering a hard compile error — this is what makes SFINAE-based template metaprogramming possible (conditionally enabling/disabling overloads based on type traits)

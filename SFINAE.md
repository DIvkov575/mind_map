"Substitution Failure Is Not An Error"

Rule applies during overload resolution of function templates: When substituting the explicitly specified or deduced type for the template parameter fails, the specialization is discarded from the [[overload set]] instead of causing a compile error.

This feature is used in template metaprogramming.
is a ranking function used by search engines to estimate the relevance of documents to a given search query — a core [[Information Retrieval]] technique.

BM25 is a bag-of-words retrieval function that ranks a set of documents based on the query terms appearing in each document, regardless of their proximity within the document. 


**One of the most prominent instantiations** 
Given a query $Q$ containing keywords $q_1 \cdots q_n$ the BM25 score of a document $D$ is:
$$\displaystyle {\text{score}}(D,Q)=\sum _{i=1}^{n}{\text{IDF}}(q_{i})\cdot {\frac {f(q_{i},D)\cdot (k_{1}+1)}{f(q_{i},D)+k_{1}\cdot \left(1-b+b\cdot {\frac {|D|}{\text{avgdl}}}\right)}}$$
where $f(q_i, D)$ is is the number of times that the keyword q i $q_{i}$ occurs in the document $D$, $| D |$ is the length of the document D in words, and avgdl is the average document length in the text collection from which documents are drawn. $k_1$ and b are free parameters, usually chosen, in absence of an advanced optimization, as  $k_{1}\in [1.2,2.0]$and $b = 0.75$
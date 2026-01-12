Not to be confused with a [[Bayesian Neural Network]]

Bayesian Networks (BNs) are probabilistic graphical models that represent a joint probability distribution over a set of random variables using a directed acyclic graph (DAG).

## 1. Structure
- **Nodes**: random variables X1,…,XnX_1, \dots, X_nX1​,…,Xn​
- **Directed edges**: conditional dependencies
- **No cycles** (DAG)
    

An edge X→YX \rightarrow YX→Y means XXX is a _direct parent_ of YYY and YYY is conditionally dependent on XXX.

---

## 2. Semantics (Factorization)

A BN encodes the joint distribution as

P(X1,…,Xn)=∏i=1nP(Xi∣Pa(Xi))P(X_1, \dots, X_n) = \prod_{i=1}^n P(X_i \mid \text{Pa}(X_i))P(X1​,…,Xn​)=i=1∏n​P(Xi​∣Pa(Xi​))

where Pa(Xi)\text{Pa}(X_i)Pa(Xi​) are the parents of XiX_iXi​ in the graph.

This is the key idea: **global joint probability = product of local conditional distributions**.

---

## 3. Conditional Independence

The graph encodes conditional independence assumptions.

### Local Markov property

Each variable is conditionally independent of its non-descendants given its parents.

### d-separation

A graphical criterion to determine whether

X⊥Y∣ZX \perp Y \mid ZX⊥Y∣Z

holds by inspecting paths in the DAG.

Three canonical structures:

- **Chain**: X→Z→YX \rightarrow Z \rightarrow YX→Z→Y
    
- **Fork**: X←Z→YX \leftarrow Z \rightarrow YX←Z→Y
    
- **Collider**: X→Z←YX \rightarrow Z \leftarrow YX→Z←Y
    

Colliders behave oppositely: conditioning on them _introduces_ dependence.
For a sequence $a_0, a_1, \ldots$ the ordinary generating function (OGF) is 
$$ A(x) = a_0 = a_1x + a_2x^2 + \cdots = \overset{\infty}{\underset{n_0}{\Sigma}} a_nx^n$$
Here the coefficients of $x^n$ represent $a_n$ the n'th term of your sequence

- Gen funcs can encode infinite sequences
- Operatios on generating functions correspond to ops on seq.
- Eg Addition valid, Multipilcation corresponds to [[Convolution]], exponentiation, derviatives, etc
- A_n is what we care about
- Closed forms ofers succinct algebraicly-manipulable form

Example 1: counting subsets.
	Supposed you ahve an unlimited supply of itms, each contributing 0 or 1 to subset. Then each time contributes (1+x) to the generating function. 
	So for 3 items, $(1+x)^3 = 1 +3x + 3x^2 + x^3$
	Coefficients of x^2 is 3 -> 3 ways to choose 2 items
Example 2: [[Ordered Set Partition | partitions]] of n
	The generating function of the number of ways to write $n$ as the sum fo positive integers is:
	$$
	\newcommand{\infsum}[1]{\overset{\infty}{\underset{#1}{\Sigma}}}
	\newcommand{\infprod}[1]{\overset{\infty}{\underset{#1}{\Pi}}}
	\infprod{k=1}\frac{1}{1-x^k} = 1 + x + 2x^2 + 3x^3 + 5x^4\cdots
	$$
 	coefficients of x^n give you the numbero of partiions of n 
Example 3: counting coins
	Each coin type contributes a factor to A(x)
		Penny 1 unlimited: $1 + x + x^2 + x^3 + \cdots = \frac{1}{1-x}$
		Nickel 5 unlimited $1 + x^5 + x^{10} + \cdots = \frac{1}{1-x^5}$
		Dime 10c unlimited $1 + x^{10} + x^{20} + \cdots = \frac{1}{1-x^{10}}$
	We are now able to take the sum ... to get coefficients $x^{\text{usd total}}$
	x serves as a placeholder which tracks the index of n -> x^n corresponds to what we're counting
	x^2 can only be expressed on single way in terms of pennies hence 1 coeff.
$$A(x) = \frac{1}{(1-x)(1-x^5)(1-x^{10})}$$
	Coefficient of x^n in the product counts all teh ways to split n into two parts (k from first seqeunce, n-k from second sequence)
$$\sum_{k=0}^n a_k b_{n-k}$$
	
A type of [[Centered Polygonal Number]]
![[Screenshot 2026-02-16 at 4.40.33 PM.png]]

$${\displaystyle H(n)=n^{3}-(n-1)^{3}=3n(n-1)+1=3n^{2}-3n+1.\,}$$
$${\displaystyle H(n)=1+6\left({\frac {n(n-1)}{2}}\right)}$$
shows that the centered hexagonal number for n is 1 more than 6 times the (_n_ − 1)th [[Triangular Number]]


$${\displaystyle H(n+1)=H(n)+6n.}$$
From which we can produce the [[Generating Functions]]
$${\displaystyle F(x)=\sum _{n\geq 0}H(n)x^{n}}$$
$${\displaystyle F(x)=x+xF(x)+\sum _{n\geq 2}6nx^{n}.}$$

where the latter terms is hte taylor series of ${\displaystyle {\frac {6x}{(1-x)^{2}}}-6x}$ so we get
$${\displaystyle (1-x)F(x)=x+{\frac {6x}{(1-x)^{2}}}-6x={\frac {x+4x^{2}+x^{3}}{(1-x)^{2}}}}$$ and end up at 
$${\displaystyle F(x)={\frac {x+4x^{2}+x^{3}}{(1-x)^{3}}}.}$$
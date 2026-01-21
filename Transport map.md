- function that moves samples from one distribution p0p_0p0​ to another p1p_1p1​.
- Mathematically:


T:Rd→Rd,x1=T(x0)T: \mathbb{R}^d \to \mathbb{R}^d, \quad x_1 = T(x_0)T:Rd→Rd,x1​=T(x0​)

- If TTT is **invertible**, it exactly moves the “mass” from the source to the target.
    

Example:

- x0∼x_0 \simx0​∼ uniform on [0,1]
    
- x1=x02∼x_1 = x_0^2 \simx1​=x02​∼ non-uniform on [0,1]
    
- Then T(x)=x2T(x) = x^2T(x)=x2 is a transport map.
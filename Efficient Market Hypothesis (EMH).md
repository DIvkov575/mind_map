The efficient-market hypothesis (EMH)is a hypothesis in financial economics that states that asset prices reflect all available information.A direct implication is that it is impossible to "beat the market" consistently on a risk-adjusted basis since market prices should only react to new information

Note that this thought experiment does not necessarily imply that stock prices are unpredictable

How efficient markets are (and are not) linked to the [[Random walk theory]] can be described through the [[Fundamental Theorem of Asset Pricing]]. Formally, if arbitrage is impossible, then the theorem predicts that the price of a stock is the discounted value of its future price and dividend:
$${\displaystyle P_{t}=E_{t}[M_{t+1}(P_{t+1}+D_{t+1})]}$$
where $E_t$ is price given all information in market at time t, $M_t$ is [[Stochastic Discount Factor]], and $D_t$ is the dividends the stock pays next period. 

However, if we assume the stochastic discount factor is constant and the time interval is short enough so that no dividend is being paid, we have
$${\displaystyle P_{t}=ME_{t}[P_{t+1}]}$$
Taking logs and assuming that the [[Jensen's Inequality]] term is negligible, we have
$${\displaystyle \log P_{t}=\log M+E_{t}[\log P_{t+1}]}$$
which implies that the log of stock prices follows a random walk with drift. Although the concept of an efficient market is similar to the assumption that stock prices follow: $E[S_{t+1}|S_{t}]=S_{t}$ which follows a [[Martingale]] the EMH does not always assume that stocks follow a martingale
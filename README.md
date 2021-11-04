# pine-indicators
Sample of Indicators written in pinescript 

## Volatility Range
- Adaptively identifies volatility breakouts at key standard deviation crossovers if price direction is in agreement
- Draws horizontal levels (line style determined by volatility params) at breakouts 
- These levels then function as volatility derived horizontal S/R, which is to say, based on multiple measures of volatility at multiple time resolutions, price distribution increased dramatically enough at this level to identify this as a high probability level for future price movement
- These levels also represent retest of previous breakout levels - especially in Forex and metals - and once broken through will successively function as "support flips to resistance" or vice-versa

More current versions include signals and inclusion of filtering functions for use in algorithmic strategies.

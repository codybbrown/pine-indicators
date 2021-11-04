# pine-indicators
Sample of Indicators written in pinescript 

---

## Volatility Range
- Adaptively identifies volatility breakouts at key standard deviation crossovers if price direction is in agreement
- Draws horizontal levels (line style determined by UI defineable volatility params at breakouts 
- These levels then function as volatility derived horizontal S/R, which is to say, based on multiple measures of volatility at multiple time resolutions, price distribution increased dramatically enough at this level to identify this as a high probability level for future price movement
- These levels also represent retest of previous breakout levels - especially in Forex and metals - and once broken through will successively function as "support flips to resistance" or vice-versa
- Includes defineable MTF range boundary finder based on user definable innput source and lookback window
- Range is used to draw show/hideable standard fibonacci retracement levels for the current range parameters
- If enabled will draw vertical background color bars during 1 of 3 active user defineable session windows (defaults are set to London session, NY session, and the high volatility London/NY confluence
- Ability to show/hide the low and high levels that determine range

### Other Things/Future Features
- More current versions include signals and inclusion of filtering functions for use in algorithmic strategies
- I am sure I'm missing some things here as I coded this up a few months back and haven't looked much recently

---

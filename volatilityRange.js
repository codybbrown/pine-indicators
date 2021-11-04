// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © bright_infinite
// =============================================================================
//@version=4
study("[CBB] Line & Range Developmenty", 
     shorttitle="Line/Range Dev", 
     overlay=true,  
     max_bars_back=5000, 
     max_lines_count=12) 
// =============================================================================
white       = #ffffff
royal       = #a55eea
salmon      = #FF6961
royalblue   = #4169E1
red         = color.rgb(255, 0, 40, 0)
blue        = color.rgb(50, 30, 230, 0)
darkGray    = color.rgb(0, 0, 0, 80)
lightGray   = color.rgb(0, 0, 0, 90)
paleBlue    = color.rgb(33, 150, 243, 90)
exN         = extend.none
exR         = extend.right
exL         = extend.left
exB         = extend.both
dot         = line.style_dotted
solid       = line.style_solid
dash        = line.style_dashed
// -----------------------------------------------------------------------------
// src         = input(high, type=input.source, title="Source")
src_HI      = input(high, type=input.source, title="HTF Range Source High")
src_LO      = input(low, type=input.source, title="HTF Range Source Low")
len_range   = input(200, type=input.integer, title="HTF Range Length", options=[8, 10, 14, 20, 21, 34, 50, 89, 96, 100, 141, 144, 200, 333, 500, 633, 1000])
len_cci     = input(200, type=input.integer, title="CCI Length", options=[8, 10, 14, 20, 21, 34, 50, 89, 96, 100, 141, 144, 200, 333, 500, 633, 1000])
lev_ccixUP  = input(200, type=input.integer, title="CCI xUP Level", options=[0, 50, -50, 100, -100, 200, -200, 300, -300, 400, -400, 500, -500])
lev_ccixDN  = input(-200, type=input.integer, title="CCI xDN Level", options=[0, 50, -50, 100, -100, 200, -200, 300, -300, 400, -400, 500, -500])
show_range  = input(false, type=input.bool, title="Show Range")
show_fibs   = input(false, type=input.bool, title="Show Fibs")
show_hilo   = input(false, type=input.bool, title="Plot Recent HI/LO")
show_htf    = input(false, type=input.bool, title="Show Prev HTF HI/LO")
show_bgcol  = input(false, type=input.bool, title="Show BG Color")
// -----------------------------------------------------------------------------

av1                 = sma(high, 100)
av2                 = sma(low, 20)

[bb1m, bb1t, bb1b] = bb(close, 20, 3)
[bb2m, bb2t, bb2b] = bb(close, 50, 2)

newLineX(xdir, src1, src2, srcY1, col, lStyle, width, extend, occurance) =>
    xUP                 = crossover(src1, src2)
    xDN                 = crossunder(src1, src2)
    line newLineUp      = na
    line newLineDn      = na
    if(xdir=="up")
        _X              = barssince(xUP)
        _Y              = valuewhen(xUP, srcY1, occurance)
        newLineUp       := line.new(bar_index[_X], _Y, bar_index, _Y, extend=extend, color=col, style=lStyle, width=width)
        
    if(xdir=="down")
        _X              = barssince(xDN)
        _Y              = valuewhen(xDN, srcY1, occurance)
        newLineDn       := line.new(bar_index[_X], _Y, bar_index, _Y, extend=extend, color=col, style=lStyle, width=width)
        
xUP_lowHi               = newLineX("up", av2, av1, hl2, blue, solid, 1, extend=exN, occurance=0)
xDN_lowHi               = newLineX("down", av2, av1, hl2, red, solid, 1, extend=exN, occurance=0)
xUP_lowHi1              = newLineX("up", bb1t, bb2t, hl2, royal, solid, 1, extend=exN, occurance=0)
xDN_lowHi1              = newLineX("down", bb1t, bb2t, hl2, salmon, solid, 1, extend=exN, occurance=0)
xUP_cci200              = newLineX("up", cci(close, len_cci), lev_ccixUP, hl2, blue, dash, 2, extend=exN, occurance=0)
xDN_cci200              = newLineX("down", cci(close, len_cci), lev_ccixDN, hl2, red, dash, 2, extend=exN, occurance=0)

line.delete(xUP_lowHi[1])
line.delete(xDN_lowHi[1])
line.delete(xUP_lowHi1[1])
line.delete(xDN_lowHi1[1])
line.delete(xUP_cci200[1])
line.delete(xDN_cci200[1])

// -----------------------------------------------------------------------------
//              SESSION & HTF 
// -----------------------------------------------------------------------------
bSession(session) =>
    val = na(time(timeframe.period, session)) ? 1 : 0
    val
    
htfHL           = input("60", type=input.resolution, title="HTF H/L Resolution")
session1        = input("0300-0830:12345", type=input.session, title="Session 1") 
session2        = input("0900-1600", type=input.session, title="Session 2")
session3        = input("0500-0830", type=input.session, title="Session 3")

htfH            = security(syminfo.tickerid, htfHL, high)
htfL            = security(syminfo.tickerid, htfHL, low)
plot(show_htf ? htfH : na, color=red)
plot(show_htf ? htfL : na, color=blue)

col_sesh1       = bSession(session1) ? na : darkGray
col_sesh2       = bSession(session2) ? na : lightGray
col_sesh3       = bSession(session3) ? na : paleBlue
bgcolor(show_bgcol ? col_sesh1 : na)
bgcolor(show_bgcol ? col_sesh2 : na)
bgcolor(show_bgcol ? col_sesh3 : na)

// -----------------------------------------------------------------------------
//              FIB LEVELS & FUNCTIONS
// -----------------------------------------------------------------------------
 
set_labelXY(id, x , y) => 
    label.set_xy(id=id, x=x, y=y)

set_lineXY(id, x, y) =>
    line.set_xy1(id=id, x=bar_index[x], y=y)
    line.set_xy2(id=id, x=bar_index, y=y)

set_lineX(id, x) =>
    line.set_x1(id=id, x=bar_index[x])
    line.set_x2(id=id, x=bar_index)
    
// calculate fibs
calcFib(h, l, fib, dir) =>
    _fib = 0.0
    range = h - l
    if (dir == "up")
        _fib := l + (range * fib)
    _fib
    if (dir == "down")
        _fib := h - (range * fib)
    _fib

cond_newHI      = valuewhen(high == highest(high, len_range), src_HI, 0)
xloc_newHI      = barssince(high == highest(high, len_range))
cond_newLO      = valuewhen(low == lowest(low, len_range), src_LO, 0)
xloc_newLO      = barssince(low == lowest(low, len_range))    
// fib_range       = cond_newHI - cond_newLO

// Main Block
fib_382         = calcFib(cond_newHI, cond_newLO, .382, "down")
fib_50          = calcFib(cond_newHI, cond_newLO, .5,   "down")
fib_618         = calcFib(cond_newHI, cond_newLO, .618, "down")
fib_786up       = calcFib(cond_newHI, cond_newLO, .786, "up")
fib_786dn       = calcFib(cond_newHI, cond_newLO, .786, "down")

var hiLine          = line.new(x1=bar_index[xloc_newHI], y1=cond_newHI, x2=bar_index, y2=cond_newHI, color=color.maroon,    extend=extend.none, width=2)
var loLine          = line.new(x1=bar_index[xloc_newLO], y1=cond_newLO, x2=bar_index, y2=cond_newLO, color=color.navy,   extend=extend.none, width=2)

var line_382        = line.new(x1=bar_index[xloc_newHI], y1=fib_382,    x2=bar_index, y2=fib_382,    color=color.navy,   extend=extend.none)
var line_50         = line.new(x1=bar_index[xloc_newHI], y1=fib_50,     x2=bar_index, y2=fib_50,     color=color.green,   extend=extend.none)
var line_618        = line.new(x1=bar_index[xloc_newHI], y1=fib_618,    x2=bar_index, y2=fib_618,    color=color.navy,   extend=extend.none)
var line_786up      = line.new(x1=bar_index[xloc_newHI], y1=fib_786up,  x2=bar_index, y2=fib_786up,  color=royal,   extend=extend.none)
var line_786dn      = line.new(x1=bar_index[xloc_newHI], y1=fib_786dn,  x2=bar_index, y2=fib_786dn,  color=royal,   extend=extend.none)

if (show_range)
    set_lineXY(hiLine,          xloc_newLO, cond_newHI)
    set_lineXY(loLine,          xloc_newLO, cond_newLO)
if (show_fibs)
    set_lineXY(line_382,        xloc_newLO, fib_382)
    set_lineXY(line_50,         xloc_newLO, fib_50)
    set_lineXY(line_618,        xloc_newLO, fib_618)
    set_lineXY(line_786up,      xloc_newLO, fib_786up)
    set_lineXY(line_786dn,      xloc_newLO, fib_786dn)


// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------
newHigh     = (high == highest(high, len_range))
newLow      = (low  == lowest(low,   len_range))

var label highLabel     = label.new(x=bar_index, y=high, text="", textcolor=white,color=royalblue, style=label.style_label_left, size=size.tiny)
var label lowLabel      = label.new(x=bar_index, y=low, text="", textcolor=white,color=salmon, style=label.style_label_left, size=size.tiny)

if (newLow)
    set_labelXY(lowLabel, bar_index, low)
if (newHigh)
    set_labelXY(highLabel, bar_index, high)
    

// -----------------------------------------------------------------------------    
// Plot all label prices on the chart
plot(show_hilo and newHigh ? label.get_y(id=highLabel) : na,
     color=color.new(royalblue, 0), linewidth=1,
     style=plot.style_circles, join=true, title="New High") // trackprice=true, 

plot(show_hilo and newLow ? label.get_y(id=lowLabel) : na,
     color=salmon, linewidth=1,
     style=plot.style_circles, join=true, title="New Low")
// -----------------------------------------------------------------------------







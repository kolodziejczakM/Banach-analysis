## Description
Dealing with someone else's code is the norm. It takes more time and is often very tiring -
unless you are using <span style="font-style=italic;color:#067046;">Banach-analysis</span>.
<span style="font-style=italic;color:#067046;">Banach-analysis</span> is a JavaScript parsing library which:

1. listing all functions predefined by another programmer (avoids standard JS fn's like: console, Math etc.)
2. listing invoked functions
3. checking performance of examined code
4. pausing examined code before each function is invoked
5. listing names of invoked functions
6. listing number of lines of examined code
7. listing number of empty lines of examined code

## Basic usage
Just append some of attributes to script tag that you want to check:
<code><script src="your-code.js" data-banach="functional_analysis" data-js-ver="es5" data-banach-angular="0" data-banach-gui="1">*</code>

<span style="color:darkgray;font-size:10px;">* Note that data-banach && data-js-ver attributes are required. Until version 1.0 Angular and ES6 are not supported</span>
then attach the library code:
<code><script src="banach-analysis.js"></script></code>

and that's it!
<img src="https://www.cubbyusercontent.com/pl/GUI%20alert.png/_4ad93362bf184711b80e9cd671d4dbb4" alt="Banach-analysis GUI"/>
## Advanced usage
If you dont wan't to see any additional sh** on tested website you can hide banach GUI by simply set data-banach-gui to 0:
<code><script src="your-code.js" data-banach="functional_analysis" data-js-ver="es5" data-banach-angular="0" data-banach-gui="0"></code>
<img src="https://www.cubbyusercontent.com/pl/console.png/_b4210dfda4d649369fe776e98c802594" alt="Banach-analysis without GUI"/>

You can also open banach-analysis.js and check code-interface configuration panel:
<img src="https://www.cubbyusercontent.com/pl/configurationCode.png/_8b5971ff3a8a4ffd9ac5f706ee2f5e36" alt="Configuration within library code"/>

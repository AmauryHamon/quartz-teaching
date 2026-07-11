---
title: Functions
draft: false
tags:
  - débutant
  - essentiels
  - JS
description: Functions, parameters
---

# Functions

## Basic function syntax

```js
function sum(x, y) {
    return x + y;
}
```

This code defines a function named `sum`. We can then ==call== this function `sum(1, 3)` which ==returns== 4. And call it even more with other values `sum(2, 7)` which ==returns== 9.

## return value

In JavaScript, we must ==return== a value from within a function. If nothing is returned, the function returns [[Ressources/3-JS/1-data-types#undefined|undefined]]

In addition, the `return` keyword ==exits== the function. This means any code written after a `return` won't be executed.

```js
function sum(x, y) {
    return x + y; // exits function with a value
    console.log("Hello World"); // code never executed
}
```

## Parameters vs Arguments

In the above function, `(x, y)` are ==parameters== of the function. It means they are variables created within a function definition.

When we call this function, `(x, y)` can be assign those variables any data/values: we call those ==arguments==. 

```js
function sum(x, y) { //(x, y) are parameters of the sum function
    return x + y;
}

sum(1, 2) // 1 and 2 are arguments, where x = 1, y = 2
```

If we call a function with parameters, without arguments, the function will return `undefined`.

```js
function sum(x, y) { 
    return x + y;
}
sum() // return undefined
```

TLDR: Parameters are the named inputs defined in the function. Arguments are the actual values passed when calling it.

```html:index.html
<div class="fn-demo">
    <div class="code-out">const makeColor = (h, s, l) => &#96;hsl(\${h}, \${s}%, \${l}%)&#96;</div>
    <hr class="divider">
    <div class="row">
        <span class="label">hue</span>   
        <input type="range" class="input-range" id="fn-h" min="0" max="360" value="247"> 
        <span id="fn-h-val">247</span>
    </div>
    <div class="row">
        <span class="label">sat</span>   
        <input type="range" class="input-range" id="fn-s" min="0" max="100" value="70">  
        <span id="fn-s-val">70</span>%
    </div>
    <div class="row">
        <span class="label">light</span> 
        <input type="range" class="input-range" id="fn-l" min="0" max="100" value="65">  
        <span id="fn-l-val">65</span>%
    </div>
    <div class="row">
        <div class="swatch" id="fn-swatch"></div>
        <div class="code-out" id="fn-out">makeColor(247, 70, 65)</div>
    </div>
</div>
```
```css:style.css
.fn-demo {
    display: flex;
    flex-direction: column;
    gap: .75rem;
}

.row {
    display: flex;
    align-items: center;
    gap: .75rem;
    flex-wrap: wrap;
}

.label {
    font-size: .75rem;
    font-family: monospace;
    color: #64748b;
    width: 5rem;
    flex-shrink: 0;
}

.input-range {
    flex: 1;
    min-width: 100px;
}

.swatch {
    width: 3rem;
    height: 3rem;
    border-radius: 8px;
    flex-shrink: 0;
}

.code-out {
    font-family: monospace;
    font-size: .8rem;
    color: #6366f1;
}

.divider {
    border: none;
    border-top: 1px solid #e2e8f0;
}
```
```js:script.js
setTimeout(() => {
    const h = document.getElementById("fn-h");
    const s = document.getElementById("fn-s");
    const l = document.getElementById("fn-l");
    const swatch = document.getElementById("fn-swatch");
    const out    = document.getElementById("fn-out");
    if (!h) return;
    const makeColor = (hv, sv, lv) => `hsl(${hv}, ${sv}%, ${lv}%)`;
    const update = () => {
    const hv = h.value, sv = s.value, lv = l.value;
    document.getElementById("fn-h-val").textContent = hv;
    document.getElementById("fn-s-val").textContent = sv;
    document.getElementById("fn-l-val").textContent = lv;
    const color = makeColor(hv, sv, lv);
    swatch.style.background = color;
    out.textContent = `makeColor(${hv}, ${sv}, ${lv})  →  "${color}"`;
    };
    [h, s, l].forEach(el => el.addEventListener("input", update));
    update();
}, 0);
```

```js
// function declaration — hoisted, can be called before it's defined
function makeColor(h, s, l) {
    return `hsl(${h}, ${s}%, ${l}%)`
}

// arrow function — shorter syntax, common in modern JS
const makeColor = (h, s, l) => `hsl(${h}, ${s}%, ${l}%)`

const color = makeColor(247, 90, 65)  // "hsl(247, 90%, 65%)"
```

---

# Parameters in Depth & Error Handling

Default parameters kick in when an argument is omitted. Rest (`...name`) collects remaining arguments. `try/catch` handles errors without crashing.

```html:index.html
<div class="pe-demo">
<div class="section">
    <div class="sec-label">Default parameters: tint(hue, sat=70, lit=55)</div>
    <div class="row">
        <input class="input" id="pe-hue" value="247" placeholder="hue" />
        <input class="input" id="pe-sat" value="" placeholder="sat (opt)" />
        <button class="btn" id="pe-btn">Call</button>
    </div>
    <div class="output ok" id="pe-out">—</div>
</div>
<div class="section">
    <div class="sec-label">try / catch — parse user JSON</div>
    <div class="row">
        <input class="json-input" id="tc-in" value='{"color":"red"}' />
        <button class="btn" id="tc-btn">Parse</button>
    </div>
    <div class="output" id="tc-out">—</div>
</div>
</div>    
```
```css:style.css
.pe-demo {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.section {
    background: #f8fafc;
    border-radius: 8px;
    padding: .75rem;
}

.sec-label {
    font-size: .75rem;
    font-family: monospace;
    font-weight: 600;
    color: #64748b;
    margin-bottom: .5rem;
}

.row {
    display: flex;
    align-items: center;
    gap: .5rem;
    flex-wrap: wrap;
    margin-bottom: .25rem;
}

.input {
    padding: .35rem .6rem;
    border: 1px solid #e2e8f0;
    border-radius: 6px;
    font-size: .875rem;
    width: 80px;
    font-family: monospace;
}

.btn {
    padding: .35rem .7rem;
    background: #6366f1;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: .8rem;
}

.output {
    font-family: monospace;
    font-size: .8rem;
    padding: .3rem .6rem;
    border-radius: 4px;
    margin-top: .25rem;
}

.ok {
    background: #dcfce7;
    color: #166534;
}

.err {
    background: #fee2e2;
    color: #991b1b;
}

.json-input {
    padding: .35rem .6rem;
    border: 1px solid #e2e8f0;
    border-radius: 6px;
    font-size: .8rem;
    width: 160px;
    font-family: monospace;
}
```
```js:script.js
setTimeout(() => {
    const peHue = document.getElementById("pe-hue");
    if (!peHue) return;
    const tint = (hue, sat = 70, lit = 55) => `hsl(${hue}, ${sat}%, ${lit}%)`;
    document.getElementById("pe-btn").onclick = () => {
        const h = peHue.value || 247;
        const s = document.getElementById("pe-sat").value || 70;
        const result = tint(h, s);
        const out = document.getElementById("pe-out");
        out.textContent = result;
        out.style.background = result;
        out.style.color = Number(document.getElementById("pe-sat").value || 55) > 50 ? "white" : "#1a1a2e";
    };
    document.getElementById("tc-btn").onclick = () => {
        const out = document.getElementById("tc-out");
        try {
            const data = JSON.parse(document.getElementById("tc-in").value);
            out.className = "output ok";
            out.textContent = "✓ " + JSON.stringify(data);
        } catch (e) {
            out.className = "output err";
            out.textContent = "✗ " + e.message;
        }
    };
}, 0);
```

```js
function tint(hue, sat = 70, lit = 55) {
    return `hsl(${hue}, ${sat}%, ${lit}%)`
}
tint(247)          // uses defaults: "hsl(247, 70%, 55%)"
tint(247, 30, 80)  // overrides defaults

// rest — gathers remaining args into an array
function logAll(label, ...items) {
    items.forEach(item => console.log(label, item))
}

try {
    const data = JSON.parse(userInput)
    console.log(data)
} catch (err) {
    console.error("Failed:", err.message)
} finally {
    console.log("this always runs")
}
```

---

# Arrow functions

Arrow functions have multiple advantages:

- They are shorter to write
- Can benefit from [[Ressources/3-JS/1-functions#implicit-return|implicit return]]

Arrow functions always start with parameters, followed by `=>` then with the function body `{...}`.

```js
//basic function
function sum(a, b) {
    return a + b;
}
// can also be written as
const sum = function(a, b) {
    // definition of sum variable
    // sum is assigned a function with two parameters
    return a + b;
}


// arrow function
const sum = (a, b) => {
    // function is removed
    // an arrow is added between parameters and curly brackets
    return a + b;
}
```

# Implicit return

When forgetting to write `return` in a function, it returns an implicite `undefined`. It means it is infered but not specifically expressed.

For example:
```js
const sum = (a, b) => {
    a + b; // return is missing
}

sum(1, 3); // undefined
```

With arrow functions, we can implicitely return based on specific conditions:

1. Function needs to be an [[Ressources/3-JS/1-functions#arrow-functions|arrow function]]
2. The function body can only have one expression (no curly brackets)
3. `return` keyword must be removed

```js
// This works (implicit return)
const sum = (a, b) => a + b;

sum(1, 3); // 4
```

>[!warning]
>
> Only use implicit return when the function body is short and sits on one line. Never sacrifice readability and code clarity to use certain functionalities.



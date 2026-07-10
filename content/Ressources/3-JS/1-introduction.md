---
title: JS Introduction
draft: false
tags:
  - débutant
  - essentiels
  - JS
description: Variables, data types, strings, numbers, functions, and conditionals
---



<!-- import StoryEmbed from "../../../components/StoryEmbed.astro"; -->

## 01. Variables

`let` can be reassigned. `const` is fixed after assignment — use this by default. Both are block-scoped.

```html:index.html
<div class="var-demo">
    <div class="var-box">
        <div class="var-title let-title">let count = 0</div>
        <div class="var-val" id="let-val">0</div>
        <button class="btn" id="let-btn">count = count + 1</button>
    </div>
    <div class="var-box">
        <div class="var-title const-title">const COLOR = "#7c6ef7"</div>
        <div class="var-val" id="const-val" style="color:#7c6ef7">#7c6ef7</div>
        <button class="btn" id="const-btn">Try to reassign</button>
        <div class="error" id="const-err"></div>
    </div>
</div>
       
```
```css:style.css
.var-demo {
    display: flex;
    gap: 1.5rem;
    flex-wrap: wrap;
}

.var-box {
    flex: 1;
    min-width: 140px;
    background: #f1f5f9;
    border-radius: 8px;
    padding: 1rem;
}

.var-title {
    font-family: monospace;
    font-size: .875rem;
    font-weight: 600;
    margin-bottom: .5rem;
}

.let-title {
    color: #6366f1;
}

.const-title {
    color: #10b981;
}

.var-val {
    font-family: monospace;
    font-size: 1.5rem;
    font-weight: 700;
    margin: .5rem 0;
}

.btn {
    width: 100%;
    padding: .4rem;
    background: white;
    border: 1px solid #e2e8f0;
    border-radius: 6px;
    cursor: pointer;
    font-size: .8rem;
    margin-top: .25rem;
}

.btn:hover {
    border-color: #6366f1;
}

.error {
    font-size: .75rem;
    color: #ef4444;
    margin-top: .25rem;
    min-height: 1em;
}
```
```js:script.js
setTimeout(() => {
    let count = 0;
    const COLOR = "#7c6ef7";
    const letVal = document.getElementById("let-val");
    
    if (!letVal) return;

    document.getElementById("let-btn").onclick = () => { 
        count++; letVal.textContent = count; 
    };
    document.getElementById("const-btn").onclick = () => {
        document.getElementById("const-err").textContent = "TypeError: Assignment to constant variable.";
    };
}, 0);
```

```js
let count = 0
const BRAND_COLOR = "#7c6ef7"

count = count + 1   // ✓ let can be reassigned
// BRAND_COLOR = "red"  // ✗ TypeError

// avoid var — it's function-scoped, not block-scoped, which causes confusing bugs
```

---

## 02. Data Types

`typeof` returns a string describing the type of a value. Quirk: `typeof null === "object"` — a historic JS bug.

```html:index.html
<div class="dt-grid">
    <div class="dt-row"><div class="dt-val">"hello"</div>       
    <div class="dt-type t-string">string</div></div>
    <div class="dt-row"><div class="dt-val">42</div>            
    <div class="dt-type t-number">number</div></div>
    <div class="dt-row"><div class="dt-val">3.14</div>          
    <div class="dt-type t-number">number</div></div>
    <div class="dt-row"><div class="dt-val">true</div>          
    <div class="dt-type t-boolean">boolean</div></div>
    <div class="dt-row"><div class="dt-val">undefined</div>     
    <div class="dt-type t-undefined">undefined</div></div>
    <div class="dt-row"><div class="dt-val">null</div>          
    <div class="dt-type t-object">object ← bug</div></div>
    <div class="dt-row"><div class="dt-val">{ key: "val" }</div>
    <div class="dt-type t-object">object</div></div>
    <div class="dt-row"><div class="dt-val">[1, 2, 3]</div>     
    <div class="dt-type t-object">object (array)</div></div>
    <div class="dt-row"><div class="dt-val">function(){}</div>  
    <div class="dt-type t-function">function</div></div>
</div>
```
```css:style.css
.dt-grid {
    display: flex;
    flex-direction: column;
    gap: .5rem;
}

.dt-row {
    display: flex;
    align-items: center;
    gap: .75rem;
}

.dt-val {
    font-family: monospace;
    font-size: .875rem;
    background: #f1f5f9;
    padding: .3rem .6rem;
    border-radius: 4px;
    min-width: 10rem;
}

.dt-type {
    font-family: monospace;
    font-size: .875rem;
    padding: .3rem .6rem;
    border-radius: 4px;
    font-weight: 600;
}

.t-string {
    background: #dbeafe;
    color: #1d4ed8;
}

.t-number {
    background: #dcfce7;
    color: #166534;
}

.t-boolean {
    background: #fef9c3;
    color: #854d0e;
}

.t-undefined {
    background: #f1f5f9;
    color: #64748b;
}

.t-object {
    background: #fce7f3;
    color: #9d174d;
}

.t-function {
    background: #ede9fe;
    color: #5b21b6;
}
```


```js
typeof "hello"      // "string"
typeof 42           // "number"
typeof true         // "boolean"
typeof undefined    // "undefined"
typeof null         // "object"  ← famous bug
typeof {}           // "object"
typeof []           // "object"  ← arrays are objects
typeof function(){} // "function"
```

---

## 03. Strings

Strings are immutable — methods return a **new string**. Template literals (backticks) let you embed expressions inline.

```html:index.html        
<input class="str-input" id="str-in" value="Hello, World!" />
<div class="str-btns">
    <button class="btn" data-op="upper">.toUpperCase()</button>
    <button class="btn" data-op="lower">.toLowerCase()</button>
    <button class="btn" data-op="length">.length</button>
    <button class="btn" data-op="slice">.slice(0, 5)</button>
    <button class="btn" data-op="includes">.includes("World")</button>
    <button class="btn" data-op="replace">.replace("World","JS")</button>
    <button class="btn" data-op="split">.split(", ")</button>
</div>
<div class="str-label">Result:</div>
<div class="str-output" id="str-out">—</div>    
```
```css:style.css
.str-input {
    padding: .5rem .75rem;
    border: 1px solid #e2e8f0;
    border-radius: 6px;
    font-size: .875rem;
    width: 100%;
    max-width: 280px;
    font-family: monospace;
}

.str-btns {
    display: flex;
    gap: .5rem;
    flex-wrap: wrap;
    margin-top: .75rem;
}

.btn {
    padding: .3rem .7rem;
    border: 1px solid #6366f1;
    background: white;
    color: #6366f1;
    border-radius: 6px;
    cursor: pointer;
    font-family: monospace;
    font-size: .8rem;
}

.btn:hover {
    background: #6366f1;
    color: white;
}

.str-output {
    margin-top: .75rem;
    font-family: monospace;
    font-size: .875rem;
    background: #f1f5f9;
    padding: .6rem .9rem;
    border-radius: 6px;
    min-height: 2rem;
}

.str-label {
    font-size: .75rem;
    color: #94a3b8;
    margin-top: 1rem;
}
```
```js:script.js
setTimeout(() => {
    const input = document.getElementById("str-in");
    const out   = document.getElementById("str-out");
    if (!input) return;
    const ops = {
        upper:   s => s.toUpperCase(),
        lower:   s => s.toLowerCase(),
        length:  s => s.length,
        slice:   s => s.slice(0, 5),
        includes:s => s.includes("World"),
        replace: s => s.replace("World", "JS"),
        split:   s => JSON.stringify(s.split(", ")),
    };
    document.querySelectorAll(".btn[data-op]").forEach(btn => {
    btn.onclick = () => { out.textContent = String(ops[btn.dataset.op](input.value)); };
    });
}, 0);
```

```js
const str = "Hello"

str.toUpperCase()          // "HELLO"
str.toLowerCase()          // "hello"
str.length                 // 5
str.slice(0, 3)            // "Hel"
str.includes("ell")        // true
str.replace("Hello", "Hi") // "Hi"
str.split("")              // ["H","e","l","l","o"]

// template literal
const name = "world"
`Hello, ${name}!`          // "Hello, world!"
`${5 + 3} items`           // "8 items"
```

---

## 04. Numbers

`Math.random()` returns a float between 0 (inclusive) and 1 (exclusive). Multiply and floor to get an integer.

```html:index.html
<div class="num-grid">
    <div class="num-row">
        <span class="num-expr">Math.round(4.7)</span>
        <span class="num-res">5</span>
    </div>
    <div class="num-row">
        <span class="num-expr">Math.floor(4.9)</span>
        <span class="num-res">4</span>
    </div>
    <div class="num-row">
        <span class="num-expr">Math.ceil(4.1)</span> 
        <span class="num-res">5</span>
    </div>
    <div class="num-row">
        <span class="num-expr">Math.abs(-8)</span>   
        <span class="num-res">8</span>
    </div>
    <div class="num-row">
        <span class="num-expr">Math.max(1,5,3)</span>
        <span class="num-res">5</span>
    </div>
    <div class="num-row">
        <span class="num-expr">Math.PI</span>        
        <span class="num-res">3.14159…</span>
    </div>
    </div>
    <hr class="divider">
    <div class="random-box">
    <div class="random-label">Math.floor(Math.random() * 360)</div>
    <div class="random-val" id="rand-val">—</div>
    <div style="width:2rem;height:2rem;border-radius:4px;margin-top:.25rem" id="rand-swatch"></div>
    <button class="btn" id="rand-btn">Generate</button>
</div>
```
```css:style.css
.num-grid { 
    display: flex;
    flex-direction: column;
    gap: .4rem;
    margin-bottom: 1rem;
}

.num-row {
    display: flex;
    align-items: center;
    gap: .75rem;
}

.num-expr {
    font-family: monospace;
    font-size: .8rem;
    color: #475569;
    width: 14rem;
    flex-shrink: 0;
}

.num-res {
    font-family: monospace;
    font-size: .875rem;
    font-weight: 600;
    color: #6366f1;
}

.divider {
    border: none;
    border-top: 1px solid #e2e8f0;
    margin: .5rem 0;
}

.random-box {
    background: #f1f5f9;
    border-radius: 8px;
    padding: .75rem;
}

.random-label {
    font-size: .75rem;
    color: #94a3b8;
    margin-bottom: .25rem;
}

.random-val {
    font-family: monospace;
    font-size: 1.5rem;
    font-weight: 700;
    color: #6366f1;
}

.btn {
    margin-top: .5rem;
    padding: .4rem .9rem;
    background: #6366f1;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: .8rem;
}
```
```js:script.js
setTimeout(() => {
    const val = document.getElementById("rand-val");
    const sw  = document.getElementById("rand-swatch");
    if (!val) return;
    document.getElementById("rand-btn").onclick = () => {
        const hue = Math.floor(Math.random() * 360);
        val.textContent = hue;
        sw.style.background = `hsl(${hue},70%,55%)`;
    };
}, 0);
```

```js
Math.round(4.7)    // 5
Math.floor(4.9)    // 4  ← rounds down
Math.ceil(4.1)     // 5  ← rounds up
Math.abs(-8)       // 8
Math.max(1, 5, 3)  // 5

// random integer from 0 to 359
Math.floor(Math.random() * 360)

function randInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}
```

---

## 05. Functions

Parameters are the named inputs defined in the function. Arguments are the actual values passed when calling it.

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

## 06. Parameters in Depth & Error Handling

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

## 07. Conditionals — if, else, ternary

`if / else if / else` runs different code depending on a condition. The **ternary** `?` `:` is a compact one-liner for simple cases.

```html:index.html
<div class="slider-row">
<span class="slider-label">hue</span>
<input type="range" id="cd-hue" min="0" max="360" value="247">
<span id="cd-hue-val">247</span>°
<div class="swatch" id="cd-swatch"></div>
</div>
<div class="result">
<span class="res-label">getVibe(hue) → </span><span class="res-val" id="cd-vibe">—</span>
</div>
<div class="result" style="margin-top:.25rem">
<span class="res-label">mode → </span><span class="res-val" id="cd-mode">—</span>
</div>
```
```css:style.css
.slider-row {
    display: flex;
    align-items: center;
    gap: .75rem;
    margin-bottom: 1rem;
}

.slider-label {
    font-size: .75rem;
    font-family: monospace;
    color: #64748b;
    width: 2.5rem;
}

input[type=range] {
    flex: 1;
}

.swatch {
    width: 4rem;
    height: 4rem;
    border-radius: 8px;
    transition: background .2s;
    flex-shrink: 0;
}

.result {
    font-family: monospace;
    font-size: .875rem;
}

.res-label {
    color: #94a3b8;
}

.res-val {
    color: #6366f1;
    font-weight: 600;
}
```
```js:script.js
setTimeout(() => {
    const slider = document.getElementById("cd-hue");
    const swatch = document.getElementById("cd-swatch");
    if (!slider) return;
    const getVibe = h => {
        if (h < 30 || h >= 330) return "warm";
        if (h < 90) return "sunny";
        if (h < 180) return "natural";
        if (h < 270) return "cool";
        return "electric";
    };
    const update = () => {
        const h = Number(slider.value);
        const color = `hsl(${h}, 65%, 55%)`;
        document.getElementById("cd-hue-val").textContent = h;
        swatch.style.background = color;
        document.getElementById("cd-vibe").textContent = `"${getVibe(h)}"`;
        document.getElementById("cd-mode").textContent = h > 180 
            ? '"cool side"' 
            : '"warm side"';
    };
    slider.addEventListener("input", update);
    update();
}, 0);
```

```js
function getVibe(hue) {
    if (hue < 30 || hue >= 330)  return "warm"
    else if (hue < 90)           return "sunny"
    else if (hue < 180)          return "natural"
    else if (hue < 270)          return "cool"
    else                         return "electric"
}

// ternary — one-line if/else
const mode = lightness > 50 ? "light" : "dark"
el.style.color = isActive ? "#fff" : "#888"
```

---

## 08. switch & Nested Conditionals

`switch` is cleaner than a long `else if` chain for exact value matching. Keep nesting to two levels max.

```html:index.html
<div class="sw-btns" id="sw-btns">
    <button class="token-btn" data-tok="xs">xs</button>
    <button class="token-btn" data-tok="sm">sm</button>
    <button class="token-btn active" data-tok="md">md</button>
    <button class="token-btn" data-tok="lg">lg</button>
    <button class="token-btn" data-tok="xl">xl</button>
</div>
<div class="sw-result">getSize("<span id="sw-tok">md</span>") → 
    <span class="sw-px" id="sw-px">18</span>px
</div>
```
```css:style.css
.sw-btns {
    display: flex;
    gap: .5rem;
    flex-wrap: wrap;
    margin-bottom: .75rem;
}

.token-btn {
    padding: .4rem .8rem;
    border: 1px solid #e2e8f0;
    background: white;
    border-radius: 6px;
    cursor: pointer;
    font-family: monospace;
    font-size: .875rem;
}

.token-btn.active {
    background: #6366f1;
    color: white;
    border-color: #6366f1;
}

.sw-result {
    font-family: monospace;
    font-size: .875rem;
    background: #f1f5f9;
    border-radius: 6px;
    padding: .6rem .9rem;
}

.sw-px {
    font-size: 2rem;
    font-weight: 700;
    color: #6366f1;
    display: inline;
}
```
```js:script.js
setTimeout(() => {
    const container = document.getElementById("sw-btns");
    if (!container) return;
    const getSize = tok => ({ xs:10, sm:14, md:18, lg:24, xl:32 }[tok] ?? 16);
    container.addEventListener("click", e => {
        const btn = e.target.closest(".token-btn");
        if (!btn) return;
        container.querySelectorAll(".token-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        document.getElementById("sw-tok").textContent = btn.dataset.tok;
        document.getElementById("sw-px").textContent = getSize(btn.dataset.tok);
    });
}, 0);
```

```js
function getSize(token) {
    switch (token) {
        case "xs": return 10
        case "sm": return 14
        case "md": return 18
        case "lg": return 24
        case "xl": return 32
        default:   return 16
    }
}
```


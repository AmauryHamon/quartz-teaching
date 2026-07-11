---
title: Data Types
draft: false
tags:
  - débutant
  - essentiels
  - JS
description: Data types, strings, numbers
---

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

# Strings

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

# Numbers

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

# Boolean

Boolean values can be one of two values: ==true== or ==false==, representing the truth value of a logical proposition.

They are used a lot in [[Ressources/3-JS/1-conditionals|conditional statements]]

[MDN: boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)

--- 

# undefined

`undefined` is a primitive type of JavaScript, and is a property of the *global object* – meaning a variable in the global scope.

You can encounter this in multiple usecases:

- A variable without an assigned value is `undefined`.
- A function not returning anything can still return `undefined`.
- Accessing a property not existing returns `undefined`.
- The void operator always return `undefined`.

[MDN: undefined](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined)

---

# null

The `null` keyword refers to the null primitive value, which represents the intentional absence of any object value. 

Unlike [[Ressources/3-JS/1-data-types#undefined|undefined]], which is a global variable, null is not an identifier but a syntax keyword.

Semantically, their difference is very minor: undefined represents the absence of a value, while null represents the absence of an object. 

```js
typeof null; // "object" (not "null" for legacy reasons)
typeof undefined; // "undefined"
null === undefined; // false
null == undefined; // true
null === null; // true
null == null; // true
!null; // true
Number.isNaN(1 + null); // false
Number.isNaN(1 + undefined); // true
```

[MDN: null](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/null)

---

# objects (and arrays)

See dedicated [[Ressources/3-JS/5-arrays-objects|Arrays & Objects]] note.

---

# Functions

See dedicated [[Ressources/3-JS/1-functions|Functions]] note.



---
title: Variables
draft: false
tags:
  - débutant
  - essentiels
  - JS
description: Variables
---

Variables allow to assign values, data, or functions to a reusable named entity.
Think of variables as a box with a ==declared== name, which contains something inside, a value ==assigned==.

There are two ways to define variables in JavaScript: `let` and `const`.
(Actually, there is also `var` coming from previous versions of JavaScript, try not to use it, replace by `let`, or `const` if possible)

The first time we define a variable, we must declare it:

```js
let count = 0
const BRAND_COLOR = "#7c6ef7"

count = count + 1   // ✓ let can be reassigned
// BRAND_COLOR = "red"  // ✗ TypeError

// avoid var — it's function-scoped, not block-scoped, which causes confusing bugs
```

# let

`let` can be reassigned. 

```js
let count = 0

count = count + 1   // ✓ let can be reassigned
```

This defines a `count` variable with a value of `0`. `let` allows to reassign `count` another value. `let` is only used once for declaration, next time you want to use `count` variable, it can be directly referenced by its name.

`let` is particularly useful for variables which need incrementation/decrementation such as counters:

```js
let sum = 0;
sum = sum + 1; // 1
sum += 1; // shorthand operator
sum ++; // shorthand increment
```


# const

`const` is fixed after assignment — meaning it can only use once `=` when variable is defined – use this by default. Both are block-scoped.

```js
const BRAND_COLOR = "#7c6ef7"
// BRAND_COLOR = "red"  // ✗ TypeError

// avoid var — it's function-scoped, not block-scoped, which causes confusing bugs
```

> [!info] About const
> 
> Something to remember about `const` is that while it can only be assigned once `const=...`, its value is not ==constant== or ==immutable==. 
> The `const` declaration creates an immutable reference to a value. The variable identifier cannot be reassigned
> The value is not immutable and can be altered

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



[MDN: const](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const)
[MDN: let](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let)
[MDN: var](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/var)


# let vs const

How to decide between using `const` or `let`? 

- Always use `const` by default
- If you realize variable needs reaffectation, replace by `let``

# Should I use `var`?

Even if `var` still works, it is discouraged due to potential confusion in many case. Replace `var` by `let`, or better by `const` if variable is not reassigned.
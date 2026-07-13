---
title: Loops
draft: false
tags:
  - débutant
  - essentiels
  - JS
description: Iterating through content with loops
---

Loops allows to repeat the same code many times without re-writing it.

This is typically what allows us to list out a grid of projects in a web portfolio for example.

# while

`while` creates a loop in which we need to update the iterated value:

```js
let i = 0
while (i < 5){
    console.log(i);
    i = i + 1;
}
// i = 5, loop stops
```


# for, for…of, for…in, forEach

While `for` is the most common way of creating loop, I encourage to use `for...of` for arrays by default. 

Reach for the classic `for` when you need the index or want to `break` early.

## forEach(callback)

`forEach` is an array method allowing to iterating and run code through the items of an array. The run code is what sits inside the `callback` function.

A `callback` function is a function passed as a parameter to another function. In the below example, `function(grade){...}` is the callback function.

```js
const grades = [10, 8, 13];
grades.forEach(function(grade){
    //do something
    console.log(grade);
})
```

The above code will then console log each item of the array one at a time.

## for

`for` takes three parameters: an initial variable, a condition, and a final expression. All three parameters are seperated by `;`.

```js
for(let i = 0; i < 5; i++){
    console.log(i);
}
```

## for...of

`for... of...` coming from ES6 is more compact to use:

```js
const symbols = "◻︎◼︎►"
for(symbol of symbols){
    console.log(symbol)
}
```

```html:index.html
<div class="loop-btns">
    <button class="btn active" data-loop="for">for (i)</button>
    <button class="btn" data-loop="forof">for…of</button>
    <button class="btn" data-loop="forin">for…in (object)</button>
    <button class="btn" data-loop="foreach">forEach</button>
</div>
<div class="loop-out" id="loop-out"></div>
```

```css:style.css
.loop-btns {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
    margin-bottom: 0.75rem;
}

.btn {
    padding: 0.35rem 0.75rem;
    border: 1px solid #e2e8f0;
    background: white;
    border-radius: 6px;
    cursor: pointer;
    font-size: 0.8rem;
    font-family: monospace;
}

.btn.active {
    background: #6366f1;
    color: white;
    border-color: #6366f1;
}

.loop-out {
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
}

.loop-row {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-family: monospace;
    font-size: 0.8rem;
    background: #f8fafc;
    padding: 0.3rem 0.6rem;
    border-radius: 4px;
}

.loop-i {
    width: 1.5rem;
    color: #94a3b8;
    flex-shrink: 0;
}

.loop-val {
    color: #6366f1;
    font-weight: 600;
}

.loop-swatch {
    width: 1.25rem;
    height: 1.25rem;
    border-radius: 3px;
    flex-shrink: 0;
}
```

```js:script.js
const palette = ["#7c6ef7", "#4ecdc4", "#ff6b6b", "#ffd93d", "#a29bfe"];
const tokens = { primary: "#7c6ef7", accent: "#4ecdc4", warn: "#ffd93d" };
const out = document.getElementById("loop-out");

if (out) {
    const row = (i, val, c) =>
        `<div class="loop-row"><span class="loop-i">${i}</span>` +
        `<div class="loop-swatch" style="background:${c || val}"></div>` +
        `<span class="loop-val">${val}</span></div>`;

    const modes = {
        for: () => palette.map((c, i) => row(i, c, c)).join(""),
        forof: () => palette.map((c, i) => row(i, c, c)).join(""),
        forin: () => Object.keys(tokens).map((k, i) => row(i, `${k}: "${tokens[k]}"`, tokens[k])).join(""),
        foreach: () => palette.map((c, i) => row(i, c, c)).join(""),
    };

    const render = (m) => {
        out.innerHTML = modes[m]();
    };

    render("for");
    document.querySelectorAll(".btn[data-loop]").forEach((btn) => {
        btn.onclick = () => {
            document.querySelectorAll(".btn[data-loop]").forEach((b) => b.classList.remove("active"));
            btn.classList.add("active");
            render(btn.dataset.loop);
        };
    });
}
```

```js
const palette = ["#7c6ef7", "#4ecdc4", "#ff6b6b"]
const tokens  = { primary: "#7c6ef7", accent: "#4ecdc4" }

// for — use when you need the index or want to break
for (let i = 0; i < palette.length; i++) {
    console.log(i, palette[i])
}

// for…of — cleanest for array values
for (const color of palette) { console.log(color) }

// for…in — loops over object keys (don't use on arrays)
for (const key in tokens) { console.log(key, tokens[key]) }

// forEach — like for…of but the callback also receives the index
palette.forEach((color, index) => console.log(index, color))
```

# Best practices and optimization

This section is more advanced and only useful to consider for bigger data iteration.

## Caching repeated property/array accesses in the body loop

```js
for (let i = 0; i < arr.length; i++) {
  const item = arr[i]; // access once, use many times
  console.log(item.name, item.value, item.id);
}
```

## Loop types and their overhead differences

Especially within big data content (game loop, large dataset, real-time rendering)

- `for (;;)` — fastest, least overhead
- `for...of` — iterator protocol overhead (has improved a lot, but still not free)
- `.forEach()` / `.map()` — function call overhead per iteration, can't break
- `for...in` — avoid for arrays entirely; iterates enumerable keys including inherited ones, and is slow

## Don't mutate the array you are iterating

No pushing/splicing mid-loop. It causes re-indexing and unpredictable iteration length.

## Keep loop bodies monomorphic

If an array always holds the same "shape" of object, the V8 JavaScript runtime can optimize property access much better than if types are mixed.

## Break/return early if possible

```js
for (let i = 0; i < arr.length; i++) {
  if (arr[i] === target) return i; // don't keep going
}
```

## Avoid creating closures/functions inside the loop

Unless necessary. Because each iteration will create a new function otherwise.
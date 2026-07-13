---
title: Sorting
draft: false
tags:
  - avancé
  - JS
description: Sorting data in JavaScript
---

There are many ways to sort and arrange content within an array or list, generally in ascending or descending ways. Here are the most basic ones.

## Array.sort()

### 01. sort() — the Default Sort's Trap

`sort()` mutates the array in place and, by default, compares items as **strings**. That's fine for words, but a trap for numbers.

```html:index.html
<div class="chips" id="sb-chips"></div>
<button class="btn" id="sb-sort">array.sort()</button>
<div class="out" id="sb-out">Click to sort — guess the order first!</div>
```
```css:style.css
.chips {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
    margin-bottom: 0.75rem;
}

.chip {
    padding: 0.4rem 0.8rem;
    background: #6366f1;
    color: white;
    border-radius: 6px;
    font-family: monospace;
    font-weight: 600;
    font-size: 0.9rem;
}

.btn {
    padding: 0.35rem 0.75rem;
    background: #6366f1;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 0.8rem;
    font-family: monospace;
    margin-bottom: 0.75rem;
}

.out {
    font-family: monospace;
    font-size: 0.8rem;
    color: #64748b;
}
```
```js:script.js
const chips = document.getElementById("sb-chips");
const out = document.getElementById("sb-out");

if (chips && out) {
    let arr = [40, 100, 21, 5, 9];

    const render = () => {
        chips.innerHTML = arr.map((n) => `<div class="chip">${n}</div>`).join("");
    };

    render();

    document.getElementById("sb-sort").onclick = () => {
        arr.sort();
        render();
        out.textContent = `[${arr.join(", ")}]  ->  compared as strings: "100" < "21" < "40" < "5" < "9"`;
    };
}
```

```js
const nums = [40, 100, 21, 5, 9]

nums.sort()
// [100, 21, 40, 5, 9]  — sorted alphabetically, NOT numerically!
// "100" comes before "21" because "1" < "2" as characters
```

---

### 02. Compare Functions — Ascending & Descending

Pass a **compare function** `(a, b) => a - b` to sort numbers correctly. Return negative to put `a` first, positive to put `b` first, `0` to keep their order.

```html:index.html
<div class="chips" id="cf-chips"></div>
<div class="btns">
    <button class="btn active" id="cf-asc">(a, b) =&gt; a - b</button>
    <button class="btn" id="cf-desc">(a, b) =&gt; b - a</button>
</div>
<div class="out" id="cf-out">-</div>
```
```css:style.css
.chips {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
    margin-bottom: 0.75rem;
}

.chip {
    padding: 0.4rem 0.8rem;
    background: #6366f1;
    color: white;
    border-radius: 6px;
    font-family: monospace;
    font-weight: 600;
    font-size: 0.9rem;
}

.btns {
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

.out {
    font-family: monospace;
    font-size: 0.8rem;
    color: #64748b;
}
```
```js:script.js
const chips = document.getElementById("cf-chips");
const out = document.getElementById("cf-out");

if (chips && out) {
    const original = [40, 100, 21, 5, 9];

    const render = (arr, label) => {
        chips.innerHTML = arr.map((n) => `<div class="chip">${n}</div>`).join("");
        out.textContent = label;
    };

    render(original, "click a button to sort");

    document.getElementById("cf-asc").onclick = () => {
        document.getElementById("cf-asc").classList.add("active");
        document.getElementById("cf-desc").classList.remove("active");
        const sorted = [...original].sort((a, b) => a - b);
        render(sorted, `[...arr].sort((a, b) => a - b) -> [${sorted.join(", ")}]`);
    };

    document.getElementById("cf-desc").onclick = () => {
        document.getElementById("cf-desc").classList.add("active");
        document.getElementById("cf-asc").classList.remove("active");
        const sorted = [...original].sort((a, b) => b - a);
        render(sorted, `[...arr].sort((a, b) => b - a) -> [${sorted.join(", ")}]`);
    };
}
```

```js
const nums = [40, 100, 21, 5, 9]

const ascending = [...nums].sort((a, b) => a - b)   // [5, 9, 21, 40, 100]
const descending = [...nums].sort((a, b) => b - a)  // [100, 40, 21, 9, 5]

// spread (...nums) copies the array first — sort() mutates otherwise!
```

---

### 03. Sorting Strings

Default string sort compares **character codes** — uppercase letters (`A`–`Z`) all come before lowercase (`a`–`z`). Use `.toLowerCase()` with `localeCompare` to sort the way people expect.

```html:index.html
<div class="chips" id="ss-chips"></div>
<div class="btns">
    <button class="btn active" data-mode="default">sort() default</button>
    <button class="btn" data-mode="lower">case-insensitive</button>
</div>
<div class="out" id="ss-out">-</div>
```
```css:style.css
.chips {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
    margin-bottom: 0.75rem;
}

.chip {
    padding: 0.4rem 0.8rem;
    background: #6366f1;
    color: white;
    border-radius: 6px;
    font-family: monospace;
    font-weight: 600;
    font-size: 0.9rem;
}

.btns {
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

.out {
    font-family: monospace;
    font-size: 0.8rem;
    color: #64748b;
}
```
```js:script.js
const chips = document.getElementById("ss-chips");
const out = document.getElementById("ss-out");

if (chips && out) {
    const words = ["banana", "Cherry", "apple", "Date"];

    const render = (arr, label) => {
        chips.innerHTML = arr.map((w) => `<div class="chip">${w}</div>`).join("");
        out.textContent = label;
    };

    const modes = {
        default: () => {
            const sorted = [...words].sort();
            return [sorted, `sort() -> [${sorted.join(", ")}]  (uppercase sorts first!)`];
        },
        lower: () => {
            const sorted = [...words].sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
            return [sorted, `sort((a,b) => a.toLowerCase().localeCompare(b.toLowerCase())) -> [${sorted.join(", ")}]`];
        },
    };

    const apply = (mode) => {
        const [sorted, label] = modes[mode]();
        render(sorted, label);
    };

    apply("default");

    document.querySelectorAll(".btn[data-mode]").forEach((btn) => {
        btn.onclick = () => {
            document.querySelectorAll(".btn[data-mode]").forEach((b) => b.classList.remove("active"));
            btn.classList.add("active");
            apply(btn.dataset.mode);
        };
    });
}
```

```js
const words = ["banana", "Cherry", "apple", "Date"]

words.sort()
// ["Cherry", "Date", "apple", "banana"] — uppercase letters sort first

words.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()))
// ["apple", "banana", "Cherry", "Date"] — alphabetical, ignoring case
```

---

### 04. Sorting Objects by a Property

Arrays of objects sort the same way — the compare function just reaches into each object to pick the field to compare.

```html:index.html
<div class="products" id="so-products"></div>
<div class="btns">
    <button class="btn active" data-sort="name">by name</button>
    <button class="btn" data-sort="price-asc">by price ↑</button>
    <button class="btn" data-sort="price-desc">by price ↓</button>
</div>
<div class="out" id="so-out">-</div>
```
```css:style.css
.products {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    margin-bottom: 0.75rem;
}

.product {
    display: flex;
    justify-content: space-between;
    background: #f8fafc;
    padding: 0.5rem 0.75rem;
    border-radius: 6px;
    font-family: monospace;
    font-size: 0.85rem;
}

.product-price {
    color: #6366f1;
    font-weight: 600;
}

.btns {
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

.out {
    font-family: monospace;
    font-size: 0.8rem;
    color: #64748b;
}
```
```js:script.js
const list = document.getElementById("so-products");
const out = document.getElementById("so-out");

if (list && out) {
    const products = [
        { name: "Mug", price: 12 },
        { name: "Notebook", price: 5 },
        { name: "Backpack", price: 45 },
        { name: "Pen", price: 2 },
    ];

    const render = (arr, label) => {
        list.innerHTML = arr
            .map((p) => `<div class="product"><span>${p.name}</span><span class="product-price">$${p.price}</span></div>`)
            .join("");
        out.textContent = label;
    };

    const sorts = {
        name: () => [...products].sort((a, b) => a.name.localeCompare(b.name)),
        "price-asc": () => [...products].sort((a, b) => a.price - b.price),
        "price-desc": () => [...products].sort((a, b) => b.price - a.price),
    };

    const labels = {
        name: "sort((a, b) => a.name.localeCompare(b.name))",
        "price-asc": "sort((a, b) => a.price - b.price)",
        "price-desc": "sort((a, b) => b.price - a.price)",
    };

    const apply = (mode) => render(sorts[mode](), labels[mode]);

    apply("name");

    document.querySelectorAll(".btn[data-sort]").forEach((btn) => {
        btn.onclick = () => {
            document.querySelectorAll(".btn[data-sort]").forEach((b) => b.classList.remove("active"));
            btn.classList.add("active");
            apply(btn.dataset.sort);
        };
    });
}
```

```js
const products = [
    { name: "Mug", price: 12 },
    { name: "Notebook", price: 5 },
    { name: "Backpack", price: 45 },
]

products.sort((a, b) => a.name.localeCompare(b.name))  // alphabetical by name
products.sort((a, b) => a.price - b.price)              // cheapest first
products.sort((a, b) => b.price - a.price)              // priciest first
```

---

## Sorting Algorithms

Built-in `sort()` is what you'll use in real code — but it helps to understand what an actual sorting algorithm does under the hood.

### 05. Bubble Sort — Step by Step

Bubble sort repeatedly compares **neighbors** and swaps them if they're in the wrong order — the largest values "bubble up" to the end. It's slow (`O(n²)`) but the easiest algorithm to understand.

```html:index.html
<div class="bars" id="bs-bars"></div>
<div class="btns">
    <button class="btn" id="bs-next">Next step</button>
    <button class="btn" id="bs-reset">Reset</button>
</div>
<div class="out" id="bs-out">Click "Next step" to compare the first pair</div>
```

```css:style.css
.bars {
    display: flex;
    align-items: flex-end;
    gap: 0.5rem;
    height: 130px;
    margin-bottom: 0.75rem;
}

.bar {
    width: 2.5rem;
    border-radius: 4px 4px 0 0;
    background: #94a3b8;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    color: white;
    font-family: monospace;
    font-size: 0.75rem;
    padding-bottom: 0.25rem;
    transition: background 0.15s;
}

.bar.compare {
    background: #f59e0b;
}

.bar.sorted {
    background: #10b981;
}

.btns {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 0.5rem;
}

.btn {
    padding: 0.35rem 0.75rem;
    background: #6366f1;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 0.8rem;
    font-family: monospace;
}

.out {
    font-family: monospace;
    font-size: 0.8rem;
    color: #64748b;
}
```

```js:script.js
const barsEl = document.getElementById("bs-bars");
const out = document.getElementById("bs-out");

if (barsEl && out) {
    const initial = [8, 3, 10, 5, 1];
    const n = initial.length;

    const buildSteps = (input) => {
        const arr = [...input];
        const steps = [];
        let sortedCount = 0;
        for (let i = 0; i < n - 1; i++) {
            for (let j = 0; j < n - 1 - i; j++) {
                const swapped = arr[j] > arr[j + 1];
                if (swapped) [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                if (j === n - 2 - i) sortedCount++;
                steps.push({ j, swapped, sortedCount, snapshot: [...arr] });
            }
        }
        steps.push({ done: true, sortedCount: n, snapshot: [...arr] });
        return steps;
    };

    const steps = buildSteps(initial);
    let idx = -1;

    const render = () => {
        const snap = idx < 0 ? initial : steps[idx].snapshot;
        const step = idx < 0 ? null : steps[idx];
        barsEl.innerHTML = snap
            .map((v, i) => {
                let cls = "bar";
                if (step) {
                    if (step.done || i >= n - step.sortedCount) cls += " sorted";
                    else if (i === step.j || i === step.j + 1) cls += " compare";
                }
                return `<div class="${cls}" style="height:${v * 10}px">${v}</div>`;
            })
            .join("");
    };

    render();

    document.getElementById("bs-next").onclick = () => {
        if (idx >= steps.length - 1) return;
        idx++;
        const step = steps[idx];
        render();
        out.textContent = step.done
            ? "Sorted! ✅"
            : `compare arr[${step.j}] and arr[${step.j + 1}] -> ${step.swapped ? "swap" : "no swap"}`;
    };

    document.getElementById("bs-reset").onclick = () => {
        idx = -1;
        render();
        out.textContent = 'Click "Next step" to compare the first pair';
    };
}
```

```js
function bubbleSort(arr) {
    const result = [...arr]
    for (let i = 0; i < result.length - 1; i++) {
        for (let j = 0; j < result.length - 1 - i; j++) {
            if (result[j] > result[j + 1]) {
                // swap neighbors
                ;[result[j], result[j + 1]] = [result[j + 1], result[j]]
            }
        }
    }
    return result
}

bubbleSort([8, 3, 10, 5, 1])  // [1, 3, 5, 8, 10]
```

---

### 06. Selection Sort — Step by Step

Selection sort scans the unsorted part of the array to find the **minimum**, then swaps it into place at the front. Fewer swaps than bubble sort, but still `O(n²)`.

```html:index.html
<div class="bars" id="ss2-bars"></div>
<div class="btns">
    <button class="btn" id="ss2-next">Next step</button>
    <button class="btn" id="ss2-reset">Reset</button>
</div>
<div class="out" id="ss2-out">Click "Next step" to scan for the minimum</div>
```

```css:style.css
.bars {
    display: flex;
    align-items: flex-end;
    gap: 0.5rem;
    height: 130px;
    margin-bottom: 0.75rem;
}

.bar {
    width: 2.5rem;
    border-radius: 4px 4px 0 0;
    background: #94a3b8;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    color: white;
    font-family: monospace;
    font-size: 0.75rem;
    padding-bottom: 0.25rem;
    transition: background 0.15s;
}

.bar.compare {
    background: #f59e0b;
}

.bar.sorted {
    background: #10b981;
}

.btns {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 0.5rem;
}

.btn {
    padding: 0.35rem 0.75rem;
    background: #6366f1;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 0.8rem;
    font-family: monospace;
}

.out {
    font-family: monospace;
    font-size: 0.8rem;
    color: #64748b;
}
```

```js:script.js
const barsEl = document.getElementById("ss2-bars");
const out = document.getElementById("ss2-out");

if (barsEl && out) {
    const initial = [6, 2, 9, 1, 5];
    const n = initial.length;

    const buildSteps = (input) => {
        const arr = [...input];
        const steps = [];
        for (let i = 0; i < n - 1; i++) {
            let minIdx = i;
            for (let j = i + 1; j < n; j++) {
                if (arr[j] < arr[minIdx]) minIdx = j;
                steps.push({ type: "compare", i, j, minIdx, snapshot: [...arr] });
            }
            if (minIdx !== i) [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
            steps.push({ type: "swap", i, minIdx, snapshot: [...arr] });
        }
        steps.push({ type: "done", i: n, snapshot: [...arr] });
        return steps;
    };

    const steps = buildSteps(initial);
    let idx = -1;

    const render = () => {
        const snap = idx < 0 ? initial : steps[idx].snapshot;
        const step = idx < 0 ? null : steps[idx];
        barsEl.innerHTML = snap
            .map((v, i) => {
                let cls = "bar";
                if (step) {
                    if (step.type === "done" || i < step.i) cls += " sorted";
                    else if (step.type === "compare" && (i === step.j || i === step.minIdx)) cls += " compare";
                    else if (step.type === "swap" && (i === step.i || i === step.minIdx)) cls += " compare";
                }
                return `<div class="${cls}" style="height:${v * 10}px">${v}</div>`;
            })
            .join("");
    };

    render();

    document.getElementById("ss2-next").onclick = () => {
        if (idx >= steps.length - 1) return;
        idx++;
        const step = steps[idx];
        render();
        if (step.type === "compare") {
            out.textContent = `checking arr[${step.j}] -> current minimum is arr[${step.minIdx}]`;
        } else if (step.type === "swap") {
            out.textContent =
                step.minIdx !== step.i
                    ? `swap arr[${step.i}] and arr[${step.minIdx}]`
                    : `arr[${step.i}] is already the minimum -> no swap`;
        } else {
            out.textContent = "Sorted! ✅";
        }
    };

    document.getElementById("ss2-reset").onclick = () => {
        idx = -1;
        render();
        out.textContent = 'Click "Next step" to scan for the minimum';
    };
}
```

```js
function selectionSort(arr) {
    const result = [...arr]
    for (let i = 0; i < result.length - 1; i++) {
        let minIndex = i
        for (let j = i + 1; j < result.length; j++) {
            if (result[j] < result[minIndex]) minIndex = j
        }
        if (minIndex !== i) {
            ;[result[i], result[minIndex]] = [result[minIndex], result[i]]
        }
    }
    return result
}

selectionSort([6, 2, 9, 1, 5])  // [1, 2, 5, 6, 9]
```

---

### 07. Insertion Sort — Step by Step

Insertion sort grows a sorted section at the front, one item at a time. It lifts the next item out (the "hole"), then shifts bigger items right until it finds where the lifted item belongs.

```html:index.html
<div class="hold" id="is-hold"></div>
<div class="bars" id="is-bars"></div>
<div class="btns">
    <button class="btn" id="is-next">Next step</button>
    <button class="btn" id="is-reset">Reset</button>
</div>
<div class="out" id="is-out">Click "Next step" to lift out the second item</div>
```

```css:style.css
.hold {
    font-family: monospace;
    font-size: 0.8rem;
    color: #6366f1;
    font-weight: 600;
    min-height: 1.2em;
    margin-bottom: 0.4rem;
}

.bars {
    display: flex;
    align-items: flex-end;
    gap: 0.5rem;
    height: 130px;
    margin-bottom: 0.75rem;
}

.bar {
    width: 2.5rem;
    border-radius: 4px 4px 0 0;
    background: #94a3b8;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    color: white;
    font-family: monospace;
    font-size: 0.75rem;
    padding-bottom: 0.25rem;
    transition: background 0.15s;
}

.bar.hole {
    background: transparent;
    border: 2px dashed #cbd5e1;
    align-self: flex-end;
}

.bar.compare {
    background: #f59e0b;
}

.bar.placed {
    background: #818cf8;
}

.bar.sorted {
    background: #10b981;
}

.btns {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 0.5rem;
}

.btn {
    padding: 0.35rem 0.75rem;
    background: #6366f1;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 0.8rem;
    font-family: monospace;
}

.out {
    font-family: monospace;
    font-size: 0.8rem;
    color: #64748b;
}
```

```js:script.js
const holdEl = document.getElementById("is-hold");
const barsEl = document.getElementById("is-bars");
const out = document.getElementById("is-out");

if (holdEl && barsEl && out) {
    const initial = [7, 4, 9, 2, 6];
    const n = initial.length;

    const buildSteps = (input) => {
        const arr = [...input];
        const steps = [];
        for (let i = 1; i < n; i++) {
            const current = arr[i];
            let hole = i;
            arr[hole] = null;
            while (hole > 0 && arr[hole - 1] > current) {
                steps.push({ type: "compare", i, hole, current, neighbor: hole - 1, snapshot: [...arr] });
                arr[hole] = arr[hole - 1];
                arr[hole - 1] = null;
                hole--;
                steps.push({ type: "shift", i, hole, current, snapshot: [...arr] });
            }
            if (hole > 0) {
                steps.push({ type: "compare", i, hole, current, neighbor: hole - 1, stop: true, snapshot: [...arr] });
            }
            arr[hole] = current;
            steps.push({ type: "place", i, hole, current, snapshot: [...arr] });
        }
        steps.push({ type: "done", i: n, snapshot: [...arr] });
        return steps;
    };

    const steps = buildSteps(initial);
    let idx = -1;

    const render = () => {
        const snap = idx < 0 ? initial : steps[idx].snapshot;
        const step = idx < 0 ? null : steps[idx];
        holdEl.textContent = step && step.type !== "done" ? `holding: ${step.current}` : "";
        barsEl.innerHTML = snap
            .map((v, i) => {
                if (v === null) return `<div class="bar hole" style="height:20px"></div>`;
                let cls = "bar";
                if (step) {
                    if (step.type === "done") cls += " sorted";
                    else if (step.type === "compare" && i === step.neighbor) cls += " compare";
                    else if (i < step.i) cls += " placed";
                }
                return `<div class="${cls}" style="height:${v * 10}px">${v}</div>`;
            })
            .join("");
    };

    render();

    document.getElementById("is-next").onclick = () => {
        if (idx >= steps.length - 1) return;
        idx++;
        const step = steps[idx];
        render();
        if (step.type === "compare") {
            const neighborVal = step.snapshot[step.neighbor];
            out.textContent = step.stop
                ? `arr[${step.neighbor}] = ${neighborVal} <= ${step.current} -> stop, insert here`
                : `arr[${step.neighbor}] = ${neighborVal} > ${step.current} -> shift right`;
        } else if (step.type === "shift") {
            out.textContent = `shifted right -> hole now at index ${step.hole}`;
        } else if (step.type === "place") {
            out.textContent = `place ${step.current} at index ${step.hole}`;
        } else {
            out.textContent = "Sorted! ✅";
        }
    };

    document.getElementById("is-reset").onclick = () => {
        idx = -1;
        render();
        out.textContent = 'Click "Next step" to lift out the second item';
    };
}
```

```js
function insertionSort(arr) {
    const result = [...arr]
    for (let i = 1; i < result.length; i++) {
        const current = result[i]
        let j = i - 1
        while (j >= 0 && result[j] > current) {
            result[j + 1] = result[j]  // shift bigger item right
            j--
        }
        result[j + 1] = current  // drop current into the gap
    }
    return result
}

insertionSort([7, 4, 9, 2, 6])  // [2, 4, 6, 7, 9]
```

---

### 08. Merge Sort — Divide & Conquer

Merge sort splits the array in half **recursively** until every piece has a single item (already "sorted" on its own), then **merges** pairs of sorted pieces back together. The clever part is the merge — try it below with two halves that are already sorted.

```html:index.html
<div class="merge-row">
    <div class="merge-col">
        <div class="merge-label">left</div>
        <div class="chips" id="ms-left"></div>
    </div>
    <div class="merge-col">
        <div class="merge-label">right</div>
        <div class="chips" id="ms-right"></div>
    </div>
</div>
<div class="merge-label">result</div>
<div class="chips" id="ms-result"></div>
<div class="btns">
    <button class="btn" id="ms-next">Next step</button>
    <button class="btn" id="ms-reset">Reset</button>
</div>
<div class="out" id="ms-out">Click "Next step" to compare the heads of each half</div>
```

```css:style.css
.merge-row {
    display: flex;
    gap: 2rem;
    margin-bottom: 0.75rem;
}

.merge-label {
    font-family: monospace;
    font-size: 0.75rem;
    color: #64748b;
    margin-bottom: 0.25rem;
}

.chips {
    display: flex;
    gap: 0.4rem;
    flex-wrap: wrap;
    min-height: 2.2rem;
    margin-bottom: 0.5rem;
}

.chip {
    padding: 0.3rem 0.6rem;
    background: #6366f1;
    color: white;
    border-radius: 6px;
    font-family: monospace;
    font-weight: 600;
    font-size: 0.85rem;
}

.chip.used {
    opacity: 0.25;
}

.chip.active {
    outline: 2px solid #f59e0b;
    outline-offset: 1px;
}

.btns {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 0.5rem;
}

.btn {
    padding: 0.35rem 0.75rem;
    background: #6366f1;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 0.8rem;
    font-family: monospace;
}

.out {
    font-family: monospace;
    font-size: 0.8rem;
    color: #64748b;
}
```

```js:script.js
const leftEl = document.getElementById("ms-left");
const rightEl = document.getElementById("ms-right");
const resultEl = document.getElementById("ms-result");
const out = document.getElementById("ms-out");

if (leftEl && rightEl && resultEl && out) {
    const left = [2, 5, 8];
    const right = [1, 6, 7];

    const buildSteps = () => {
        const steps = [];
        let i = 0;
        let j = 0;
        const result = [];

        while (i < left.length && j < right.length) {
            const takeLeft = left[i] <= right[j];
            steps.push({ i, j, compareLeft: i, compareRight: j, takeLeft, snapshot: [...result] });
            if (takeLeft) result.push(left[i++]);
            else result.push(right[j++]);
            steps.push({ i, j, placed: result[result.length - 1], snapshot: [...result] });
        }
        while (i < left.length) {
            steps.push({ i, j, compareLeft: i, onlyLeft: true, snapshot: [...result] });
            result.push(left[i++]);
            steps.push({ i, j, placed: result[result.length - 1], snapshot: [...result] });
        }
        while (j < right.length) {
            steps.push({ i, j, compareRight: j, onlyRight: true, snapshot: [...result] });
            result.push(right[j++]);
            steps.push({ i, j, placed: result[result.length - 1], snapshot: [...result] });
        }
        steps.push({ done: true, i, j, snapshot: [...result] });
        return steps;
    };

    const steps = buildSteps();
    let idx = -1;

    const render = () => {
        const step = idx < 0 ? null : steps[idx];
        const iNow = step ? step.i : 0;
        const jNow = step ? step.j : 0;
        const resultSnap = step ? step.snapshot : [];

        leftEl.innerHTML = left
            .map((v, k) => {
                let cls = "chip";
                if (k < iNow) cls += " used";
                else if (step && step.compareLeft === k) cls += " active";
                return `<div class="${cls}">${v}</div>`;
            })
            .join("");

        rightEl.innerHTML = right
            .map((v, k) => {
                let cls = "chip";
                if (k < jNow) cls += " used";
                else if (step && step.compareRight === k) cls += " active";
                return `<div class="${cls}">${v}</div>`;
            })
            .join("");

        resultEl.innerHTML = resultSnap.map((v) => `<div class="chip">${v}</div>`).join("");
    };

    render();

    document.getElementById("ms-next").onclick = () => {
        if (idx >= steps.length - 1) return;
        idx++;
        const step = steps[idx];
        render();
        if (step.done) {
            out.textContent = "Merged! ✅";
        } else if (step.placed !== undefined) {
            out.textContent = `take ${step.placed} -> result: [${step.snapshot.join(", ")}]`;
        } else if (step.onlyLeft) {
            out.textContent = `right is empty -> take ${left[step.compareLeft]} from left`;
        } else if (step.onlyRight) {
            out.textContent = `left is empty -> take ${right[step.compareRight]} from right`;
        } else {
            out.textContent = step.takeLeft
                ? `${left[step.compareLeft]} <= ${right[step.compareRight]} -> take from left`
                : `${right[step.compareRight]} < ${left[step.compareLeft]} -> take from right`;
        }
    };

    document.getElementById("ms-reset").onclick = () => {
        idx = -1;
        render();
        out.textContent = 'Click "Next step" to compare the heads of each half';
    };
}
```

```js
function mergeSort(arr) {
    if (arr.length <= 1) return arr  // one item is already "sorted"

    const mid = Math.floor(arr.length / 2)
    const left = mergeSort(arr.slice(0, mid))    // sort left half
    const right = mergeSort(arr.slice(mid))      // sort right half

    return merge(left, right)
}

function merge(left, right) {
    const result = []
    let i = 0
    let j = 0

    while (i < left.length && j < right.length) {
        if (left[i] <= right[j]) result.push(left[i++])
        else result.push(right[j++])
    }

    return [...result, ...left.slice(i), ...right.slice(j)]  // append any leftovers
}

mergeSort([8, 3, 10, 5, 1])  // [1, 3, 5, 8, 10]
```

---

Read more examples on [this article](https://www.geeksforgeeks.org/javascript/sorting-algorithms-in-javascript/)
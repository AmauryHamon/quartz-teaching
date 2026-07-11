---
title: Arrays & Objects
draft: false
tags:
  - débutant
  - essentiels
  - JS
description: Two ways to group data — and how to combine them
---

## Arrays

### 01. Basics — create, access, length

An array is an **ordered list**. Items sit at numbered **indices**, always starting at `0`. Click a swatch to see its index.

```html:index.html
<div class="palette" id="ab-palette">
    <div class="swatch" style="background:#7c6ef7" data-i="0" data-c="#7c6ef7"></div>
    <div class="swatch" style="background:#4ecdc4" data-i="1" data-c="#4ecdc4"></div>
    <div class="swatch" style="background:#ff6b6b" data-i="2" data-c="#ff6b6b"></div>
    <div class="swatch" style="background:#ffd93d" data-i="3" data-c="#ffd93d"></div>
    <div class="swatch" style="background:#a29bfe" data-i="4" data-c="#a29bfe"></div>
</div>
<div class="output" id="ab-out">Click a swatch</div>
```

```css:style.css
.palette {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
    margin-bottom: 0.75rem;
}

.swatch {
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 8px;
    cursor: pointer;
    position: relative;
    border: 2px solid transparent;
    transition: border-color 0.15s;
}

.swatch.active {
    border-color: #1a1a2e;
}

.output {
    font-family: monospace;
    font-size: 0.875rem;
    background: #f1f5f9;
    padding: 0.5rem 0.75rem;
    border-radius: 6px;
}
```

```js:script.js
const PALETTE = ["#7c6ef7", "#4ecdc4", "#ff6b6b", "#ffd93d", "#a29bfe"];

const pal = document.getElementById("ab-palette");
const out = document.getElementById("ab-out");

if (pal && out) {
    pal.addEventListener("click", (e) => {
        const s = e.target.closest(".swatch");
        if (!s) return;

        pal.querySelectorAll(".swatch").forEach((sw) => sw.classList.remove("active"));
        s.classList.add("active");

        const i = Number(s.dataset.i);
        out.textContent = `palette[${i}] = "${s.dataset.c}"  |  palette.length = ${PALETTE.length}`;
    });
}
```

```js
const palette = ["#7c6ef7", "#4ecdc4", "#ff6b6b", "#ffd93d", "#a29bfe"]

palette[0]                   // "#7c6ef7"  — first item
palette[2]                   // "#ff6b6b"  — third item
palette[palette.length - 1]  // "#a29bfe"  — last item
palette.length               // 5
```

---

### 02. Add & Remove — push, pop, unshift, shift

`push`/`pop` work at the **end**. `unshift`/`shift` work at the **start**. All four modify the original array.

```html:index.html
<div class="arr-viz" id="ar-viz"></div>
<div class="btns">
    <button class="btn b-push" id="ar-push">push("🟣")</button>
    <button class="btn b-pop" id="ar-pop">pop()</button>
    <button class="btn b-unshift" id="ar-unshift">unshift("🟢")</button>
    <button class="btn b-shift" id="ar-shift">shift()</button>
</div>
<div class="log" id="ar-log">-</div>
```

```css:style.css
.arr-viz {
    display: flex;
    gap: 0.4rem;
    align-items: center;
    min-height: 3rem;
    flex-wrap: wrap;
    margin-bottom: 0.75rem;
    background: #f1f5f9;
    padding: 0.5rem;
    border-radius: 8px;
}

.arr-item {
    padding: 0.3rem 0.7rem;
    border-radius: 6px;
    font-family: monospace;
    font-size: 0.8rem;
    font-weight: 600;
    color: white;
}

.btns {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
}

.btn {
    padding: 0.35rem 0.75rem;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 0.8rem;
    font-family: monospace;
}

.b-push {
    background: #6366f1;
    color: white;
}

.b-pop {
    background: #a78bfa;
    color: white;
}

.b-unshift {
    background: #10b981;
    color: white;
}

.b-shift {
    background: #34d399;
    color: white;
}

.log {
    font-family: monospace;
    font-size: 0.75rem;
    color: #64748b;
    margin-top: 0.5rem;
    min-height: 1.2em;
}
```

```js:script.js
const viz = document.getElementById("ar-viz");
const log = document.getElementById("ar-log");

if (viz && log) {
    const colors = ["#6366f1", "#8b5cf6", "#a855f7", "#6366f1", "#4f46e5"];
    let arr = ["A", "B", "C"];
    let pushCount = 0;
    let unshiftCount = 0;

    const render = () => {
        viz.innerHTML = arr
            .map(
                (v, i) => `<div class="arr-item" style="background:${colors[i % colors.length]}">[${i}] ${v}</div>`,
            )
            .join("");
    };

    render();

    document.getElementById("ar-push").onclick = () => {
        const items = ["🟣", "🔵", "🟤"];
        const item = items[pushCount++ % items.length];
        arr.push(item);
        log.textContent = `push("${item}") -> new length: ${arr.length}`;
        render();
    };

    document.getElementById("ar-pop").onclick = () => {
        if (!arr.length) return;
        const removed = arr.pop();
        log.textContent = `pop() -> returned: "${removed}"`;
        render();
    };

    document.getElementById("ar-unshift").onclick = () => {
        const items = ["🟢", "🟡", "🟠"];
        const item = items[unshiftCount++ % items.length];
        arr.unshift(item);
        log.textContent = `unshift("${item}") -> new length: ${arr.length}`;
        render();
    };

    document.getElementById("ar-shift").onclick = () => {
        if (!arr.length) return;
        const removed = arr.shift();
        log.textContent = `shift() -> returned: "${removed}"`;
        render();
    };
}
```

```js
const colors = ["#4ecdc4", "#ff6b6b"]

colors.push("#ffd93d")    // adds to end
colors.pop()              // removes from end — returns the item
colors.unshift("#7c6ef7") // adds to start
colors.shift()            // removes from start — returns the item
```

---

### 03. map — Transform Every Item

`map` creates a **brand new array** by running a function on each item. The original is never changed.

```html:index.html
<div class="hues" id="mp-hues"></div>
<div class="arrow">↓ hues.map(h =&gt; `hsl(${h}, 70%, 55%)`)</div>
<div class="swatches" id="mp-swatches"></div>
<button class="btn" id="mp-regen">Regenerate hues</button>
```

```css:style.css
.hues {
    display: flex;
    gap: 0.4rem;
    flex-wrap: wrap;
    margin-bottom: 0.5rem;
}

.hue-chip {
    padding: 0.25rem 0.5rem;
    background: #f1f5f9;
    border-radius: 4px;
    font-family: monospace;
    font-size: 0.8rem;
    color: #64748b;
}

.arrow {
    font-size: 1.5rem;
    color: #94a3b8;
    margin: 0.25rem 0;
}

.swatches {
    display: flex;
    gap: 0.4rem;
    flex-wrap: wrap;
}

.map-swatch {
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 6px;
}

.btn {
    padding: 0.4rem 0.9rem;
    background: #6366f1;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 0.8rem;
    margin-top: 0.75rem;
}
```

```js:script.js
const huesEl = document.getElementById("mp-hues");
const swEl = document.getElementById("mp-swatches");

if (huesEl && swEl) {
    const render = () => {
        const hues = Array.from({ length: 7 }, () => Math.floor(Math.random() * 360));
        huesEl.innerHTML = hues.map((h) => `<div class="hue-chip">${h}</div>`).join("");

        const colors = hues.map((h) => `hsl(${h}, 70%, 55%)`);
        swEl.innerHTML = colors
            .map((c) => `<div class="map-swatch" style="background:${c}" title="${c}"></div>`)
            .join("");
    };

    render();
    document.getElementById("mp-regen").onclick = render;
}
```

```js
const hues = [0, 40, 90, 160, 210, 270, 320]

const colors = hues.map(h => `hsl(${h}, 70%, 55%)`)
// ["hsl(0,70%,55%)", "hsl(40,70%,55%)", ...]

const sizes = [8, 12, 16, 24]
const doubled = sizes.map(s => s * 2)  // [16, 24, 32, 48]
```

---

### 04. filter — Keep Matching Items

`filter` returns a **new array** keeping only items where the function returns `true`. Original untouched.

```html:index.html
<div class="filter-all" id="fi-all"></div>
<div class="filter-label" id="fi-label">all 12 hues</div>
<div class="filter-result" id="fi-result"></div>
<div class="btns">
    <button class="btn active" data-filter="all">all</button>
    <button class="btn" data-filter="warm">warm (h &lt; 90 || h &gt;= 300)</button>
    <button class="btn" data-filter="cool">cool (h &gt;= 90 &amp;&amp; h &lt; 300)</button>
</div>
```

```css:style.css
.filter-all {
    display: flex;
    gap: 0.3rem;
    flex-wrap: wrap;
    margin-bottom: 0.5rem;
}

.filter-swatch {
    width: 2rem;
    height: 2rem;
    border-radius: 4px;
    position: relative;
}

.filter-swatch.dimmed {
    opacity: 0.15;
}

.filter-label {
    font-size: 0.75rem;
    font-family: monospace;
    color: #64748b;
    margin: 0.4rem 0 0.25rem;
}

.filter-result {
    display: flex;
    gap: 0.3rem;
    flex-wrap: wrap;
}

.btns {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
    margin-top: 0.75rem;
}

.btn {
    padding: 0.35rem 0.75rem;
    background: white;
    border: 1px solid #e2e8f0;
    border-radius: 6px;
    cursor: pointer;
    font-size: 0.8rem;
}

.btn.active {
    background: #6366f1;
    color: white;
    border-color: #6366f1;
}
```

```js:script.js
const hues = [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330];
const allEl = document.getElementById("fi-all");
const resEl = document.getElementById("fi-result");
const labEl = document.getElementById("fi-label");

if (allEl && resEl && labEl) {
    allEl.innerHTML = hues
        .map((h) => `<div class="filter-swatch" style="background:hsl(${h},65%,55%)" data-h="${h}"></div>`)
        .join("");

    const filters = {
        all: (h) => true,
        warm: (h) => h < 90 || h >= 300,
        cool: (h) => h >= 90 && h < 300,
    };

    const apply = (name) => {
        const fn = filters[name];
        const filtered = hues.filter(fn);

        allEl.querySelectorAll(".filter-swatch").forEach((s) => {
            s.classList.toggle("dimmed", !fn(Number(s.dataset.h)));
        });

        resEl.innerHTML = filtered
            .map((h) => `<div class="filter-swatch" style="background:hsl(${h},65%,55%)"></div>`)
            .join("");
        labEl.textContent = `filter -> ${filtered.length} hues`;
    };

    apply("all");
    document.querySelectorAll(".btn[data-filter]").forEach((btn) => {
        btn.onclick = () => {
            document.querySelectorAll(".btn[data-filter]").forEach((b) => b.classList.remove("active"));
            btn.classList.add("active");
            apply(btn.dataset.filter);
        };
    });
}
```

```js
const hues = [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330]

const warm = hues.filter(h => h < 90 || h >= 300)
const cool = hues.filter(h => h >= 90 && h < 300)

const scale = [10, 12, 14, 16, 20, 24, 32]
const large = scale.filter(s => s > 16)  // [20, 24, 32]
```

---

### 05. find, includes, join

`find` returns the first match. `includes` checks membership. `join` collapses an array into a string.

```html:index.html
<div class="fij">
    <div class="section">
        <div class="sec-label">sizes = [10, 12, 14, 16, 20, 24, 32, 48]</div>
        <div class="row">
            <span style="font-family:monospace;font-size:.8rem">find(s =&gt; s &gt;</span>
            <input class="input" id="fij-find-n" value="18" />
            <span style="font-family:monospace;font-size:.8rem">)</span>
            <button class="btn" id="fij-find-btn">Run</button>
            <div class="out ok" id="fij-find-out">-</div>
        </div>
    </div>
    <div class="section">
        <div class="sec-label">fonts = ["Inter","Arial","Helvetica","sans-serif"]</div>
        <div class="row">
            <span style="font-family:monospace;font-size:.8rem">includes(</span>
            <input class="input" id="fij-inc-n" value="Arial" style="width:90px" />
            <span style="font-family:monospace;font-size:.8rem">)</span>
            <button class="btn" id="fij-inc-btn">Run</button>
            <div class="out ok" id="fij-inc-out">-</div>
        </div>
    </div>
    <div class="section">
        <div class="sec-label">fonts.join(sep)</div>
        <div class="row">
            <span style="font-family:monospace;font-size:.8rem">sep: "</span>
            <input class="input" id="fij-sep" value=", " style="width:50px" />
            <span style="font-family:monospace;font-size:.8rem">"</span>
            <button class="btn" id="fij-join-btn">Run</button>
        </div>
        <div class="out na" id="fij-join-out" style="margin-top:.4rem">-</div>
    </div>
</div>
```

```css:style.css
.fij {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
}

.section {
    background: #f8fafc;
    border-radius: 8px;
    padding: 0.6rem 0.9rem;
}

.sec-label {
    font-size: 0.75rem;
    font-family: monospace;
    font-weight: 600;
    color: #64748b;
    margin-bottom: 0.4rem;
}

.row {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    flex-wrap: wrap;
}

.input {
    padding: 0.3rem 0.6rem;
    border: 1px solid #e2e8f0;
    border-radius: 6px;
    font-size: 0.8rem;
    width: 60px;
    font-family: monospace;
}

.btn {
    padding: 0.3rem 0.6rem;
    background: #6366f1;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 0.8rem;
}

.out {
    font-family: monospace;
    font-size: 0.8rem;
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
}

.ok {
    background: #dcfce7;
    color: #166534;
}

.na {
    background: #f1f5f9;
    color: #64748b;
}
```

```js:script.js
const sizes = [10, 12, 14, 16, 20, 24, 32, 48];
const fonts = ["Inter", "Arial", "Helvetica", "sans-serif"];

const findIn = document.getElementById("fij-find-n");

if (findIn) {
    document.getElementById("fij-find-btn").onclick = () => {
        const n = Number(findIn.value);
        const r = sizes.find((s) => s > n);
        document.getElementById("fij-find-out").textContent = r !== undefined ? String(r) : "undefined";
    };

    document.getElementById("fij-inc-btn").onclick = () => {
        const v = document.getElementById("fij-inc-n").value;
        document.getElementById("fij-inc-out").textContent = String(fonts.includes(v));
    };

    document.getElementById("fij-join-btn").onclick = () => {
        const sep = document.getElementById("fij-sep").value;
        document.getElementById("fij-join-out").textContent = fonts.join(sep);
    };
}
```

```js
const sizes = [10, 12, 14, 16, 20, 24, 32, 48]
const fonts = ["Inter", "Arial", "Helvetica", "sans-serif"]

sizes.find(s => s > 18)   // 20 — first match
fonts.includes("Arial")   // true
fonts.includes("Comic Sans") // false

fonts.join(", ")  // "Inter, Arial, Helvetica, sans-serif"
sizes.join(" / ") // "10 / 12 / 14 / 16 / 20 / 24 / 32 / 48"
```

---

## Objects

### 06. Basics — Key-value Pairs, Read, Write

An object stores named values. Use **dot notation** for known keys, **bracket notation** when the key is in a variable.

```html:index.html
<div class="obj-view">
    {<br />
    &nbsp;&nbsp;<span class="obj-key">"color"</span>: <span class="obj-val">"#7c6ef7"</span>,<br />
    &nbsp;&nbsp;<span class="obj-key">"fontSize"</span>: <span class="obj-val">32</span>,<br />
    &nbsp;&nbsp;<span class="obj-key">"letterSpacing"</span>: <span class="obj-val">2</span><br />
    }
</div>
<div class="controls">
    <button class="btn" data-op="dot">token.color</button>
    <button class="btn" data-op="bracket">token["fontSize"]</button>
    <button class="btn" data-op="update">token.color = "#ff6b6b"</button>
    <button class="btn" data-op="add">token.weight = 700</button>
</div>
<div class="out" id="ob-out">Click a button to read or write</div>
```

```css:style.css
.obj-view {
    font-family: monospace;
    font-size: 0.875rem;
    background: #0f172a;
    color: #e2e8f0;
    border-radius: 8px;
    padding: 1rem;
    margin-bottom: 0.75rem;
    line-height: 1.8;
}

.obj-key {
    color: #93c5fd;
}

.obj-val {
    color: #86efac;
}

.controls {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
}

.btn {
    padding: 0.35rem 0.7rem;
    background: white;
    border: 1px solid #e2e8f0;
    border-radius: 6px;
    cursor: pointer;
    font-size: 0.8rem;
}

.btn:hover {
    border-color: #6366f1;
}

.out {
    font-family: monospace;
    font-size: 0.8rem;
    color: #64748b;
    margin-top: 0.5rem;
}
```

```js:script.js
const token = { color: "#7c6ef7", fontSize: 32, letterSpacing: 2 };
const out = document.getElementById("ob-out");

if (out) {
    const ops = {
        dot: () => `token.color -> "${token.color}"`,
        bracket: () => `token["fontSize"] -> ${token.fontSize}`,
        update: () => {
            token.color = "#ff6b6b";
            return `token.color updated -> "${token.color}"`;
        },
        add: () => {
            token.weight = 700;
            return `token.weight created -> ${token.weight}`;
        },
    };

    document.querySelectorAll(".btn[data-op]").forEach((btn) => {
        btn.onclick = () => {
            out.textContent = ops[btn.dataset.op]();
        };
    });
}
```

```js
const token = { color: "#7c6ef7", fontSize: 32, letterSpacing: 2 }

token.color       // "#7c6ef7"  — dot notation
token.fontSize    // 32

const key = "color"
token[key]        // "#7c6ef7"  — bracket notation (dynamic key)

token.color = "#ff6b6b"   // update
token.weight = 700        // create new property
```

---

### 07. Object.keys, values, entries

`entries()` is the most useful — it gives you both key and value. Objects can be **nested**: values can themselves be objects.

```html:index.html
<div class="oe-btns">
    <button class="btn" data-m="keys">Object.keys()</button>
    <button class="btn" data-m="values">Object.values()</button>
    <button class="btn active" data-m="entries">Object.entries()</button>
</div>
<div class="oe-result" id="oe-result"></div>
```

```css:style.css
.oe-btns {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
    margin-bottom: 0.75rem;
}

.btn {
    padding: 0.35rem 0.75rem;
    border: 1px solid #6366f1;
    background: white;
    color: #6366f1;
    border-radius: 6px;
    cursor: pointer;
    font-family: monospace;
    font-size: 0.8rem;
}

.btn.active {
    background: #6366f1;
    color: white;
}

.oe-result {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
}

.oe-row {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background: #f8fafc;
    padding: 0.4rem 0.75rem;
    border-radius: 6px;
    font-family: monospace;
    font-size: 0.8rem;
}

.oe-key {
    color: #6366f1;
    font-weight: 600;
    min-width: 4rem;
}

.oe-val {
    color: #64748b;
}
```

```js:script.js
const scale = { xs: 12, sm: 14, base: 16, lg: 20, xl: 24 };
const result = document.getElementById("oe-result");

if (result) {
    const modes = {
        keys: () => Object.keys(scale).map((k) => `<div class="oe-row"><span class="oe-key">${k}</span></div>`),
        values: () => Object.values(scale).map((v) => `<div class="oe-row"><span class="oe-val">${v}px</span></div>`),
        entries: () =>
            Object.entries(scale).map(
                ([k, v]) => `<div class="oe-row"><span class="oe-key">${k}</span><span class="oe-val">-> ${v}px</span></div>`,
            ),
    };

    const render = (m) => {
        result.innerHTML = modes[m]().join("");
    };

    render("entries");
    document.querySelectorAll(".btn[data-m]").forEach((btn) => {
        btn.onclick = () => {
            document.querySelectorAll(".btn[data-m]").forEach((b) => b.classList.remove("active"));
            btn.classList.add("active");
            render(btn.dataset.m);
        };
    });
}
```

```js
const scale = { xs: 12, sm: 14, base: 16, lg: 20, xl: 24 }

Object.keys(scale)    // ["xs", "sm", "base", "lg", "xl"]
Object.values(scale)  // [12, 14, 16, 20, 24]
Object.entries(scale) // [["xs", 12], ["sm", 14], ...]

Object.entries(scale).forEach(([key, value]) => {
    console.log(`${key}: ${value}px`)
})
```

---

## Together

### 08. Arrays of Objects — the Real-world Pattern

An array where every item is an object. Use `map` to render, spread (`...`) to copy, destructuring to unpack.

```html:index.html
<div class="ao-list" id="ao-list"></div>
<button class="btn" id="ao-add">spread + add new swatch</button>
<div class="out" id="ao-out">-</div>
```

```css:style.css
.ao-list {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin-bottom: 0.75rem;
}

.ao-card {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    background: #f8fafc;
    padding: 0.5rem 0.75rem;
    border-radius: 8px;
}

.ao-swatch {
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 6px;
    flex-shrink: 0;
}

.ao-name {
    font-weight: 600;
    font-size: 0.875rem;
}

.ao-detail {
    font-family: monospace;
    font-size: 0.75rem;
    color: #64748b;
}

.btn {
    padding: 0.35rem 0.75rem;
    background: #6366f1;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 0.8rem;
}

.out {
    font-family: monospace;
    font-size: 0.75rem;
    color: #64748b;
    margin-top: 0.5rem;
}
```

```js:script.js
const list = document.getElementById("ao-list");

if (list) {
    let swatches = [
        { name: "Violet", hue: 260, sat: 70 },
        { name: "Teal", hue: 175, sat: 65 },
        { name: "Amber", hue: 40, sat: 80 },
    ];

    const extras = [
        { name: "Rose", hue: 340, sat: 75 },
        { name: "Emerald", hue: 145, sat: 70 },
        { name: "Sky", hue: 200, sat: 65 },
    ];

    let idx = 0;

    const render = () => {
        list.innerHTML = swatches
            .map(
                (s, i) => `
            <div class="ao-card">
                <div class="ao-swatch" style="background:hsl(${s.hue},${s.sat}%,55%)"></div>
                <div>
                    <div class="ao-name">${s.name}</div>
                    <div class="ao-detail">swatches[${i}].hue = ${s.hue}</div>
                </div>
            </div>
        `,
            )
            .join("");
    };

    render();

    document.getElementById("ao-add").onclick = () => {
        const next = extras[idx % extras.length];
        swatches = [...swatches, next];
        idx++;
        render();
        document.getElementById("ao-out").textContent = `[...swatches, ${JSON.stringify(next)}]  ->  length: ${swatches.length}`;
    };
}
```

```js
const swatches = [
    { name: "Violet", hue: 260, sat: 70 },
    { name: "Teal",   hue: 175, sat: 65 },
]

swatches[0].name    // "Violet"
swatches[1].hue     // 175

swatches.map(s => `hsl(${s.hue}, ${s.sat}%, 55%)`)

// spread — add without mutating
const updated = [...swatches, { name: "Amber", hue: 40, sat: 80 }]

// destructuring
const { name, hue, sat } = swatches[0]
```

---

## Loops

### 09. for, for…of, for…in, forEach

Use `for...of` for arrays by default. Reach for the classic `for` when you need the index or want to `break` early.

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

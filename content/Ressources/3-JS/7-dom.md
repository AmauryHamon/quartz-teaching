---
title: DOM
draft: false
tags:
  - débutant
  - essentiels
  - JS
description: Select, modify, create and remove elements with JavaScript
---

# Select elements

## 01. querySelector

Finds the **first** element matching a CSS selector. Call it on `document` to search the whole page, or on any element to scope the search.

```html:index.html
<div class="qs-stage" id="qs-stage">
  <p class="qs-para" id="qs-para">
    A paragraph inside the stage. It contains an <em class="qs-item">em element</em> inside.
  </p>
  <div>
    <span class="qs-chip">Chip A</span>
    <span class="qs-chip">Chip B</span>
    <span class="qs-chip">Chip C</span>
  </div>
</div>
<div class="qs-btns">
  <button class="btn" data-sel="#qs-para">querySelector("#qs-para")</button>
  <button class="btn" data-sel=".qs-chip">querySelector(".qs-chip")</button>
  <button class="btn" data-sel="em">querySelector("em")</button>
</div>
<div class="qs-out" id="qs-out">Click a button to select</div>
```
```css:style.css

.qs-para {
  font-size: .9rem;
}

.btn {
  padding: .4rem .9rem;
  background: #6366f1;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: .8rem;
}

.qs-chip{
  border-radius: 4px;
  font-size: .8rem;
  margin: .2rem;
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

.qs-out {
  font-family: monospace;
  font-size: .8rem;
  background: #0f172a;
  color: #86efac;
  padding: .5rem .75rem;
  border-radius: 6px;
}

.qs-highlight {
  outline: 2px solid #6366f1;
  outline-offset: 2px;
  background: #ede9fe !important;
}
```
```js:script.js
setTimeout(() => {
  const out = document.getElementById("qs-out");
  if (!out) return;
  let last = null;
  document.querySelectorAll(".btn[data-sel]").forEach(btn => {
    btn.onclick = () => {
      if (last) last.classList.remove("qs-highlight");
      const found = document.querySelector(btn.dataset.sel);
      if (found) { found.classList.add("qs-highlight"); last = found; }
      out.textContent = found ? `→ <${found.tagName.toLowerCase()}> "${found.textContent.trim().slice(0,40)}"` : "null";
    };
  });
}, 0);
```

```js
document.querySelector("#qs-para")   // by ID
document.querySelector(".qs-chip")   // by class
document.querySelector("em")         // by tag

// scope the search inside a specific element
const stage = document.querySelector("#stage")
const el    = stage.querySelector(".item")
```

---

## 02. querySelectorAll

Returns **all** matching elements as a NodeList. Use `.forEach()` to loop over them.

```html:index.html
<div class="qsa-grid" id="qsa-grid">
  <div class="chip">Red</div>
  <div class="chip">Green</div>
  <div class="chip">Blue</div>
  <div class="chip">Yellow</div>
  <div class="chip">Purple</div>
  <div class="chip">Orange</div>
</div>
<div class="qsa-btns">
  <button class="btn" id="qsa-select">Select all .chip</button>
  <button class="btn btn-clear" id="qsa-clear">Clear</button>
</div>
<div class="out" id="qsa-out">—</div>
```
```css:style.css
.qsa-grid {
  display: flex;
  gap: .4rem;
  flex-wrap: wrap;
  margin-bottom: .75rem;
}

.chip {
  padding: .4rem .8rem;
  background: #e0e7ff;
  color: #3730a3;
  border-radius: 6px;
  font-size: .875rem;
  cursor: pointer;
  transition: background .15s, color .15s;
}

.chip.selected {
  background: #6366f1;
  color: white;
}

.qsa-btns {
  display: flex;
  gap: .5rem;
  flex-wrap: wrap;
  margin-bottom: .5rem;
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

.btn-clear {
  background: white;
  color: #6366f1;
  border: 1px solid #6366f1;
}

.out {
  font-family: monospace;
  font-size: .8rem;
  color: #64748b;
}
```
```js:script.js
setTimeout(() => {
      const out = document.getElementById("qsa-out");
      if (!out) return;
      document.getElementById("qsa-select").onclick = () => {
        const chips = document.querySelectorAll(".chip");
        chips.forEach(c => c.classList.add("selected"));
        out.textContent = `querySelectorAll(".chip") → NodeList(${chips.length})`;
      };
      document.getElementById("qsa-clear").onclick = () => {
        document.querySelectorAll(".chip").forEach(c => c.classList.remove("selected"));
        out.textContent = "—";
      };
    }, 0);
```

```js
const items = document.querySelectorAll(".chip")

items.forEach(item => {
    item.style.background = "purple"
})
```

---

# Edit text elements

## 03. textContent vs innerHTML

`textContent` treats everything as plain text. `innerHTML` parses HTML tags. Only use `innerHTML` with content you control — never with raw user input.

```html:index.html
      <div class="tc-demo">
        <div class="col">
          <div class="col-label">textContent</div>
          <div class="target-box" id="tc-target">Original text</div>
          <button class="btn" id="tc-btn">Set "Hello &lt;b&gt;world&lt;/b&gt;"</button>
          <p class="warn">Tags shown as plain text — safe</p>
        </div>
        <div class="col">
          <div class="col-label">innerHTML</div>
          <div class="target-box" id="ih-target">Original text</div>
          <button class="btn" id="ih-btn">Set "Hello &lt;b&gt;world&lt;/b&gt;"</button>
          <p class="warn">Tags are parsed — bold appears</p>
        </div>
      </div>

```
```css:style.css
.tc-demo {
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
}

.col {
  flex: 1;
  min-width: 140px;
}

.col-label {
  font-size: .7rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: .05em;
  color: #94a3b8;
  margin-bottom: .5rem;
}

.target-box {
  background: #f1f5f9;
  border-radius: 6px;
  padding: .6rem .9rem;
  font-size: .875rem;
  min-height: 2rem;
}

.btn {
  margin-top: .5rem;
  width: 100%;
  padding: .35rem;
  background: #6366f1;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: .8rem;
  font-family: monospace;
}

.warn {
  font-size: .7rem;
  color: #f59e0b;
  margin-top: .25rem;
}
```
```js:script.js
setTimeout(() => {
      const tcT = document.getElementById("tc-target");
      const ihT = document.getElementById("ih-target");
      if (!tcT) return;
      document.getElementById("tc-btn").onclick = () => { tcT.textContent = "Hello <b>world</b>"; };
      document.getElementById("ih-btn").onclick = () => { ihT.innerHTML   = "Hello <b>world</b>"; };
    }, 0);
```

```js
el.textContent = "Hello <b>world</b>"
// renders as: Hello <b>world</b>  (tags shown as text)

el.innerHTML = "Hello <b>world</b>"
// renders as: Hello world  (tag is parsed)
```

---

# Style elements

## 04. style

Set any CSS property via `element.style`. Property names become camelCase: `font-size` → `fontSize`.

Check this [list](https://www.w3schools.com/jsref/dom_obj_style.asp) for all style possibilities.

```html:index.html

      <div class="sp-target" id="sp-target">Drag the sliders</div>
      <div class="sp-controls">
        <div class="row"><span class="sp-label">fontSize</span>      <input type="range" id="sp-size" min="12" max="48" value="16"> <span class="val" id="sp-size-v">16px</span></div>
        <div class="row"><span class="sp-label">letterSpacing</span> <input type="range" id="sp-ls"   min="0"  max="16" value="0">  <span class="val" id="sp-ls-v">0px</span></div>
        <div class="row"><span class="sp-label">color (hue)</span>   <input type="range" id="sp-hue"  min="0"  max="360" value="0"> <span class="val" id="sp-hue-v">0°</span></div>
        <div class="row"><span class="sp-label">rotate</span>        <input type="range" id="sp-rot"  min="-45" max="45" value="0"> <span class="val" id="sp-rot-v">0°</span></div>
      </div>

```
```css:style.css
.sp-target {
  padding: 1rem 1.5rem;
  background: #f1f5f9;
  border-radius: 8px;
  font-size: 1rem;
  transition: all .2s;
  display: inline-block;
  margin-bottom: .75rem;
}

.sp-controls {
  display: flex;
  flex-direction: column;
  gap: .4rem;
}

.row {
  display: flex;
  align-items: center;
  gap: .75rem;
}

.sp-label {
  width: 8rem;
  font-family: monospace;
  font-size: .75rem;
  color: #64748b;
  flex-shrink: 0;
}

input[type=range] {
  flex: 1;
}

.val {
  font-family: monospace;
  font-size: .75rem;
  color: #6366f1;
  width: 4rem;
}
```
```js:script.js
    setTimeout(() => {
      const target = document.getElementById("sp-target");
      if (!target) return;
      const bind = (id, valId, fn) => {
        const el = document.getElementById(id);
        const updateVal = () => { document.getElementById(valId).textContent = fn(el.value); };
        el.addEventListener("input", updateVal);
        updateVal();
        return el;
      };
      bind("sp-size", "sp-size-v", v => { target.style.fontSize = v+"px"; return v+"px"; });
      bind("sp-ls",   "sp-ls-v",   v => { target.style.letterSpacing = v+"px"; return v+"px"; });
      bind("sp-hue",  "sp-hue-v",  v => { target.style.color = `hsl(${v},70%,40%)`; return v+"°"; });
      bind("sp-rot",  "sp-rot-v",  v => { target.style.transform = `rotate(${v}deg)`; return v+"°"; });
    }, 0);
```

```js
el.style.fontSize      = "48px"
el.style.letterSpacing = "4px"
el.style.color         = "#ff6b6b"
el.style.transform     = "rotate(5deg)"
el.style.backgroundColor = "#111"
```

---

## 05. classList

The cleanest way to change visual state. Define all variants in CSS, switch classes in JS.

```html:index.html
<div class="box" id="cls-box">I have classes: (none)</div>
<div class="controls" id="cls-controls">
  <button class="btn" data-action="toggle" data-class="is-active">toggle is-active</button>
  <button class="btn" data-action="toggle" data-class="is-hidden">toggle is-hidden</button>
  <button class="btn" data-action="toggle" data-class="is-error">toggle is-error</button>
  <button class="btn" data-action="clear">clear all</button>
</div>
<div class="code" id="cls-code">el.classList = ""</div>
```
```css:style.css
.box {
  padding: 1rem 1.5rem;
  border-radius: 8px;
  background: #f1f5f9;
  border: 2px solid transparent;
  transition: all .2s;
  display: inline-block;
}

.box.is-active {
  background: #dbeafe;
  border-color: #6366f1;
  color: #1d4ed8;
  font-weight: 600;
}

.box.is-hidden {
  opacity: 0;
}

.box.is-error {
  background: #fee2e2;
  border-color: #ef4444;
  color: #b91c1c;
}

.controls {
  margin-top: 1rem;
  display: flex;
  gap: .5rem;
  flex-wrap: wrap;
}

.btn {
  padding: .4rem .9rem;
  border: 1px solid #94a3b8;
  background: white;
  border-radius: 6px;
  cursor: pointer;
  font-size: .875rem;
}

.code {
  font-family: monospace;
  font-size: .8rem;
  color: #64748b;
  margin-top: .75rem;
}
```
```js:script.js
setTimeout(() => {
  const box = document.getElementById("cls-box");
  const code = document.getElementById("cls-code");
  const controls = document.getElementById("cls-controls");
  if (!box || !code || !controls) return;

  const updateUI = () => {
    const activeClasses = [...box.classList].filter((c) => c !== "box");
    box.textContent = `I have classes: ${activeClasses.join(", ") || "(none)"}`;
    code.textContent = `el.classList = "${activeClasses.join(" ")}"`;
  };

  controls.addEventListener("click", (e) => {
    const btn = e.target.closest("button[data-action]");
    if (!btn) return;

    if (btn.dataset.action === "clear") {
      box.className = "box";
      updateUI();
      return;
    }

    if (btn.dataset.action === "toggle" && btn.dataset.class) {
      box.classList.toggle(btn.dataset.class);
      updateUI();
    }
  });

  updateUI();
}, 0);
```


```js
el.classList.add("rounded")       // adds
el.classList.remove("rounded")    // removes
el.classList.toggle("rounded")    // adds if absent, removes if present
el.classList.contains("rounded")  // → true or false
```

---

## 06. CSS Variables

Set a CSS variable once via JS and every element that uses it updates instantly — the design token approach.

```html:index.html
<div class="cv-card" id="cv-card">
  Card using <span class="cv-badge" id="cv-badge">--cv-brand</span>
</div>
<div class="cv-row">
  <span class="cv-label">Set --cv-brand:</span>
  <button class="btn" data-color="#6366f1" style="border-color:#6366f1;color:#6366f1">Indigo</button>
  <button class="btn" data-color="#10b981" style="border-color:#10b981;color:#10b981">Emerald</button>
  <button class="btn" data-color="#ef4444" style="border-color:#ef4444;color:#ef4444">Red</button>
  <button class="btn" data-color="#f59e0b" style="border-color:#f59e0b;color:#f59e0b">Amber</button>
</div>
```
```css:style.css
:root {
  --cv-brand: #6366f1;
}

.cv-card {
  background: var(--cv-brand);
  color: white;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: .75rem;
  transition: background .3s;
}

.cv-badge {
  display: inline-block;
  background: white;
  color: var(--cv-brand);
  padding: .2rem .6rem;
  border-radius: 4px;
  font-size: .8rem;
  font-weight: 600;
  transition: color .3s;
}

.cv-row {
  display: flex;
  align-items: center;
  gap: .75rem;
  margin-bottom: .5rem;
}

.cv-label {
  font-size: .75rem;
  font-family: monospace;
  color: #64748b;
}

.btn {
  padding: .35rem .75rem;
  border: 2px solid;
  border-radius: 6px;
  cursor: pointer;
  font-size: .8rem;
  font-weight: 600;
  background: white;
}
```
```js:script.js
setTimeout(() => {
  const row = document.querySelector(".cv-row");
  if (!row) return;

  row.addEventListener("click", (e) => {
    const btn = e.target.closest(".btn[data-color]");
    if (!btn) return;
    document.documentElement.style.setProperty("--cv-brand", btn.dataset.color);
  });
}, 0);
```


```js
// set on :root so it's available everywhere
document.documentElement.style.setProperty("--color-a", "#ff6b6b")

// read a variable's current value
const val = getComputedStyle(document.documentElement)
              .getPropertyValue("--color-a")
```

---

# Add elements

## 07. createElement + append

Build new elements in JS and insert them. `appendChild` adds at the end, `prepend` adds at the start.

```html:index.html
<ul class="list" id="item-list">
  <li>First item <button>×</button></li>
</ul>
<div class="controls">
  <input class="input" id="item-input" placeholder="New item..." />
  <button class="btn" id="add-btn">Add</button>
</div>
```
```css:style.css
.list {
  list-style: none;
  padding: 0;
  margin: 0 0 1rem;
  display: flex;
  flex-direction: column;
  gap: .4rem;
}

.list li {
  padding: .5rem 1rem;
  background: #f1f5f9;
  border-radius: 6px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.list li button {
  border: none;
  background: none;
  color: #ef4444;
  cursor: pointer;
  font-size: 1rem;
}

.controls {
  display: flex;
  gap: .5rem;
}

.input {
  padding: .5rem .75rem;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  font-size: .875rem;
}

.btn {
  padding: .5rem 1rem;
  background: #6366f1;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: .875rem;
}
```
```js:script.js
setTimeout(() => {
  const list = document.getElementById("item-list");
  const input = document.getElementById("item-input");
  const btn = document.getElementById("add-btn");
  if (!list || !input || !btn) return;

  list.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      e.target.closest("li").remove();
    }
  });

  const addItem = () => {
    const text = input.value.trim();
    if (!text) return;

    const li = document.createElement("li");
    li.append(document.createTextNode(`${text} `));

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "×";
    li.appendChild(removeBtn);

    list.appendChild(li);
    input.value = "";
    input.focus();
  };

  btn.onclick = addItem;
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") addItem();
  });
}, 0);
```

```js
const tile = document.createElement("div")
tile.className   = "tile"
tile.textContent = "New"
tile.style.background = `hsl(${Math.random() * 360}, 65%, 55%)`

container.appendChild(tile)  // insert at the end
container.prepend(tile)       // insert at the start
```

---

# Remove elements

## 08. remove

Remove any element from the DOM with `.remove()`. Works great inside a click handler.

```html:index.html
<div class="rm-list" id="rm-list">
  <div class="rm-item">Item A <button class="rm-btn">×</button></div>
  <div class="rm-item">Item B <button class="rm-btn">×</button></div>
  <div class="rm-item">Item C <button class="rm-btn">×</button></div>
</div>
<button class="btn" id="rm-restore">Restore items</button>
<div class="out" id="rm-out">Click × to call el.remove()</div>
```
```css:style.css
.rm-list {
  display: flex;
  flex-direction: column;
  gap: .4rem;
  margin-bottom: .75rem;
}

.rm-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #f1f5f9;
  padding: .5rem .75rem;
  border-radius: 6px;
  font-size: .875rem;
}

.rm-btn {
  background: none;
  border: none;
  color: #ef4444;
  cursor: pointer;
  font-size: 1rem;
  padding: 0 .25rem;
}

.rm-btn:hover {
  color: #b91c1c;
}

.btn {
  padding: .4rem .9rem;
  background: #6366f1;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: .8rem;
}

.out {
  font-family: monospace;
  font-size: .75rem;
  color: #94a3b8;
  margin-top: .5rem;
}
```
```js:script.js
setTimeout(() => {
  const list = document.getElementById("rm-list");
  const out = document.getElementById("rm-out");
  const restoreBtn = document.getElementById("rm-restore");
  if (!list || !out || !restoreBtn) return;

  const createItem = (label) => {
    const item = document.createElement("div");
    item.className = "rm-item";
    item.append(document.createTextNode(`${label} `));

    const btn = document.createElement("button");
    btn.className = "rm-btn";
    btn.textContent = "×";
    item.appendChild(btn);

    return item;
  };

  list.addEventListener("click", (e) => {
    if (e.target.classList.contains("rm-btn")) {
      const item = e.target.closest(".rm-item");
      const name = item.textContent.trim().slice(0, 6);
      item.remove();
      out.textContent = `"${name}".remove() - gone from DOM`;
    }
  });

  restoreBtn.onclick = () => {
    list.replaceChildren(
      createItem("Item A"),
      createItem("Item B"),
      createItem("Item C")
    );
    out.textContent = "Restored";
  };
}, 0);
```

```js
el.remove()  // removes it from the DOM immediately

el.addEventListener("click", () => el.remove())
```

---

# Add data to elements

## 09. dataset

Embed data in HTML with `data-*` attributes. Read and write via `element.dataset`. `data-my-value` becomes `dataset.myValue`.

```html:index.html
<div class="ds-cards">
  <div class="ds-card" style="background:#6366f1" data-name="Typography" data-color="#6366f1" data-hue="247">
    <div class="ds-name">Typography</div>
    <div class="ds-sub">data-hue="247"</div>
  </div>
  <div class="ds-card" style="background:#10b981" data-name="Animation" data-color="#10b981" data-hue="145">
    <div class="ds-name">Animation</div>
    <div class="ds-sub">data-hue="145"</div>
  </div>
  <div class="ds-card" style="background:#f59e0b" data-name="Layout" data-color="#f59e0b" data-hue="40">
    <div class="ds-name">Layout</div>
    <div class="ds-sub">data-hue="40"</div>
  </div>
</div>
<div class="ds-out" id="ds-out">Click a card to read its dataset</div>
```
```css:style.css
.ds-cards {
  display: flex;
  gap: .6rem;
  flex-wrap: wrap;
  margin-bottom: .75rem;
}

.ds-card {
  padding: .6rem 1rem;
  border-radius: 8px;
  cursor: pointer;
  border: 2px solid transparent;
  transition: border-color .15s;
}

.ds-card.active {
  border-color: #6366f1;
}

.ds-name {
  font-weight: 600;
  font-size: .875rem;
  color: white;
}

.ds-sub {
  font-size: .7rem;
  color: rgba(255,255,255,.7);
  font-family: monospace;
  margin-top: .1rem;
}

.ds-out {
  font-family: monospace;
  font-size: .8rem;
  background: #0f172a;
  color: #86efac;
  padding: .6rem .9rem;
  border-radius: 6px;
}
```
```js:script.js
setTimeout(() => {
  const out = document.getElementById("ds-out");
  if (!out) return;
  document.querySelectorAll(".ds-card").forEach((card) => {
    card.addEventListener("click", () => {
      document.querySelectorAll(".ds-card").forEach((c) => c.classList.remove("active"));
      card.classList.add("active");
      out.textContent = [
        `dataset.name  = "${card.dataset.name}"`,
        `dataset.color = "${card.dataset.color}"`,
        `dataset.hue   = "${card.dataset.hue}"`,
      ].join("\n");
    });
  });
}, 0);
```

```js
// HTML: <div data-name="Typography" data-color="#7c6ef7">

card.dataset.name   // "Typography"
card.dataset.color  // "#7c6ef7"

card.dataset.clicked = "true"  // creates data-clicked="true"
```

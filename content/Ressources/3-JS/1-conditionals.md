---
title: Conditionals
draft: false
tags:
  - débutant
  - essentiels
  - JS
description: If... else if... else
---

# Conditionals — if, else, ternary

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


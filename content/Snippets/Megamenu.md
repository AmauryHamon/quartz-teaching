---
title: Megamenu
draft: false
tags:
  - initié
  - snippet
  - HTML
  - CSS
  - JS
  - Component
---

A nav item whose dropdown is a big multi-column panel instead of a short list — the same idea as the dropdown note, scaled up, with one added wrinkle: it has to work on hover (desktop) *and* on tap (touch, which has no hover).

# Pseudocode

## Structure

- A nav `<li>` holds a trigger and a full-width panel (`.mm-panel`), same shape as the dropdown note, just bigger and organized into grouped columns.

## Style

- The panel is `position: absolute`, spans a good chunk of the nav's width, and lays its columns out with flex/grid.

## Features

- Desktop: opens on `:hover`/`:focus-within` — pure CSS.
- Touch devices don't have `:hover`, so the trigger also needs to work as a click target. `@media (hover: hover)` gates the CSS-hover behavior to devices that actually support hovering; JS handles the click-toggle for everything else.

# Megamenu (hover on desktop, click on touch)

```html:index.html
<nav class="mm-nav">
    <div class="mm-item" id="mm-item">
        <button class="mm-trigger" id="mm-trigger" aria-expanded="false">Shop ▾</button>
        <div class="mm-panel" id="mm-panel">
            <div class="mm-col">
                <h4>Outerwear</h4>
                <a href="#">Jackets</a>
                <a href="#">Shells</a>
                <a href="#">Fleece</a>
            </div>
            <div class="mm-col">
                <h4>Footwear</h4>
                <a href="#">Boots</a>
                <a href="#">Sandals</a>
                <a href="#">Socks</a>
            </div>
            <div class="mm-col">
                <h4>Accessories</h4>
                <a href="#">Hats</a>
                <a href="#">Bottles</a>
                <a href="#">Bags</a>
            </div>
        </div>
    </div>
    <a class="mm-link" href="#">About</a>
    <a class="mm-link" href="#">Contact</a>
</nav>
```

```css:style.css
.mm-nav {
    display: flex;
    align-items: center;
    gap: 1.2rem;
    padding: 0.75rem 1rem;
    border-bottom: 1px solid #e2e8f0;
    position: relative;
}

.mm-item {
    position: relative;
}

.mm-trigger {
    border: none;
    background: none;
    font-size: 0.85rem;
    color: #334155;
    cursor: pointer;
    padding: 0;
}

.mm-link {
    font-size: 0.85rem;
    color: #334155;
    text-decoration: none;
}

.mm-panel {
    display: none;
    position: absolute;
    top: calc(100% + 0.75rem);
    left: 0;
    width: 22rem;
    gap: 1.5rem;
    padding: 1rem;
    background: white;
    border: 1px solid #e2e8f0;
    border-radius: 10px;
    box-shadow: 0 20px 40px rgba(15, 23, 42, 0.12);
    z-index: 10;
}

.mm-panel.open {
    display: flex;
}

.mm-col h4 {
    margin: 0 0 0.5rem;
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    color: #94a3b8;
}

.mm-col a {
    display: block;
    padding: 0.25rem 0;
    font-size: 0.85rem;
    color: #334155;
    text-decoration: none;
}

.mm-col a:hover {
    color: #6366f1;
}

@media (hover: hover) {
    .mm-item:hover .mm-panel,
    .mm-item:focus-within .mm-panel {
        display: flex;
    }
}
```

```js:script.js
const item = document.getElementById("mm-item");
const trigger = document.getElementById("mm-trigger");
const panel = document.getElementById("mm-panel");

if (item && trigger && panel) {
    // only needed for devices that can't hover — `@media (hover: hover)` handles the rest in CSS
    trigger.onclick = () => {
        const isOpen = panel.classList.toggle("open");
        trigger.setAttribute("aria-expanded", String(isOpen));
    };

    document.addEventListener("click", (e) => {
        if (!item.contains(e.target)) {
            panel.classList.remove("open");
            trigger.setAttribute("aria-expanded", "false");
        }
    });
}
```

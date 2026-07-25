---
title: Dropdown
draft: false
tags:
  - initié
  - snippet
  - HTML
  - CSS
  - JS
  - Component
---

A button that reveals a menu of options. Based on [daisyUI's dropdown](https://daisyui.com/components/dropdown/), which itself supports three implementation strategies — starting with the native, zero-JS one.

# Pseudocode

## Structure

- A wrapper (`.dropdown`) holds a trigger (a button, or a `<summary>`) and a menu (`.dropdown-content`), positioned relative to it.
- The menu is hidden by default and only appears — and only then can be clicked — while open.

## Style

- `.dropdown { position: relative; }` so the menu can be `position: absolute` and anchored to it, rather than pushing the rest of the page around.
- The menu needs a `z-index` above surrounding content, plus a shadow or border to read as "floating" above the page.

## Features

- Opening/closing can be entirely native: `<details>`/`<summary>` needs nothing else, exactly like the accordion note.
- A more common real-world need — closing when the visitor clicks outside, or presses Escape — needs JS with the two techniques above, since neither `<details>` nor CSS `:focus-within` do that on their own. The [Popover API](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API) does both natively too (third variant below) — once dismissal is free, positioning relative to the trigger is the only thing left to solve, which is where [anchor positioning](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Anchor_positioning/Using) comes in.

# Basic dropdown (`<details>`, no JS)

Same trick as the accordion note: `<details>`/`<summary>` opens and closes on its own. The one limitation worth knowing: clicking *outside* the dropdown doesn't close it — only clicking the summary again does. The next section fixes that with a little JS.

```html:index.html
<details class="dropdown">
    <summary class="dropdown-trigger">Options ▾</summary>
    <ul class="dropdown-content">
        <li><a href="#">Edit</a></li>
        <li><a href="#">Duplicate</a></li>
        <li><a href="#">Delete</a></li>
    </ul>
</details>
```

```css:style.css
.dropdown {
    position: relative;
    display: inline-block;
}

.dropdown-trigger {
    list-style: none;
    padding: 0.5rem 0.9rem;
    border: 1px solid #e2e8f0;
    border-radius: 6px;
    cursor: pointer;
    font-size: 0.85rem;
    color: #1e293b;
}

.dropdown-trigger::-webkit-details-marker {
    display: none;
}

.dropdown-content {
    position: absolute;
    top: calc(100% + 0.4rem);
    left: 0;
    min-width: 10rem;
    margin: 0;
    padding: 0.4rem;
    list-style: none;
    background: white;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    box-shadow: 0 8px 24px rgba(15, 23, 42, 0.12);
    z-index: 10;
}

.dropdown-content li a {
    display: block;
    padding: 0.4rem 0.6rem;
    border-radius: 4px;
    font-size: 0.85rem;
    color: #334155;
    text-decoration: none;
}

.dropdown-content li a:hover {
    background: #f1f5f9;
}
```

# Dropdown with outside-click and Escape (JS)

A plain button and menu, toggled with JS instead of relying on `<details>`. Two listeners on `document` handle the parts the browser doesn't do for free: a click anywhere outside the dropdown closes it (`root.contains(e.target)` tells us whether the click was inside), and Escape closes it and returns focus to the trigger.

```html:index.html
<div class="dropdown" id="dd-root">
    <button class="dropdown-trigger" id="dd-trigger" aria-haspopup="true" aria-expanded="false">Options ▾</button>
    <ul class="dropdown-content" id="dd-menu" hidden>
        <li><a href="#">Edit</a></li>
        <li><a href="#">Duplicate</a></li>
        <li><a href="#">Delete</a></li>
    </ul>
</div>
```

```css:style.css
.dropdown {
    position: relative;
    display: inline-block;
}

.dropdown-trigger {
    padding: 0.5rem 0.9rem;
    border: 1px solid #e2e8f0;
    border-radius: 6px;
    background: white;
    cursor: pointer;
    font-size: 0.85rem;
    color: #1e293b;
}

.dropdown-content {
    position: absolute;
    top: calc(100% + 0.4rem);
    left: 0;
    min-width: 10rem;
    margin: 0;
    padding: 0.4rem;
    list-style: none;
    background: white;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    box-shadow: 0 8px 24px rgba(15, 23, 42, 0.12);
    z-index: 10;
}

.dropdown-content li a {
    display: block;
    padding: 0.4rem 0.6rem;
    border-radius: 4px;
    font-size: 0.85rem;
    color: #334155;
    text-decoration: none;
}

.dropdown-content li a:hover {
    background: #f1f5f9;
}
```

```js:script.js
const root = document.getElementById("dd-root");
const trigger = document.getElementById("dd-trigger");
const menu = document.getElementById("dd-menu");

if (root && trigger && menu) {
    const close = () => {
        menu.hidden = true;
        trigger.setAttribute("aria-expanded", "false");
    };

    const open = () => {
        menu.hidden = false;
        trigger.setAttribute("aria-expanded", "true");
    };

    trigger.onclick = () => {
        if (menu.hidden) open();
        else close();
    };

    document.addEventListener("click", (e) => {
        if (!root.contains(e.target)) close();
    });

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && !menu.hidden) {
            close();
            trigger.focus();
        }
    });
}
```

# Dropdown with Popover API + anchor positioning (no JS)

`popovertarget` on the button wires up open/close/outside-click/Escape entirely natively — no `document` listeners needed, and no `.dropdown { position: relative }` wrapper either. The one thing the Popover API doesn't do on its own is position the menu next to its trigger: opening a popover promotes it to the *top layer*, so it renders outside normal document flow, and a relatively-positioned ancestor no longer has any effect on it. That's exactly the gap [CSS anchor positioning](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Anchor_positioning/Using) fills — `anchor-name` on the trigger, `position-anchor` on the popover, then `top`/`left: anchor(...)` place it relative to the button as if it had never left the flow.

> [!warning] Support caveat (Progressive enhancement)
> As of summer 2026, the Popover API alone is broadly supported, but this combination also needs anchor positioning, which is newer. Without it, the menu still opens and closes correctly — it just won't be positioned next to the button, falling back to the browser's default (roughly centered) popover placement.
> [Can I Use: anchor positionning](https://caniuse.com/css-anchor-positioning)
> [MDN: position-anchor](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/position-anchor)

```html:index.html
<button id="dd-trigger" class="dropdown-trigger" popovertarget="dd-menu">Options ▾</button>
<ul id="dd-menu" class="dropdown-content" popover>
    <li><a href="#">Edit</a></li>
    <li><a href="#">Duplicate</a></li>
    <li><a href="#">Delete</a></li>
</ul>
```

```css:style.css
#dd-trigger {
    anchor-name: --dd-trigger;
}
#dd-menu {
    position-anchor: --dd-trigger;
}

.dropdown-trigger {
    padding: 0.5rem 0.9rem;
    border: 1px solid #e2e8f0;
    border-radius: 6px;
    background: white;
    cursor: pointer;
    font-size: 0.85rem;
    color: #1e293b;
}

.dropdown-content {
    /* Popovers render in the top layer, outside normal document flow —
       a relatively-positioned wrapper no longer helps position them,
       so `position: fixed` + anchor() replaces that entirely. */
    position: fixed;
    margin: 0;
    min-width: 10rem;
    padding: 0.4rem;
    list-style: none;
    background: white;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    box-shadow: 0 8px 24px rgba(15, 23, 42, 0.12);
}

@supports (anchor-name: --dd-trigger) {
    .dropdown-content {
        top: calc(anchor(bottom) + 0.4rem);
        left: anchor(left);
    }
}

.dropdown-content li a {
    display: block;
    padding: 0.4rem 0.6rem;
    border-radius: 4px;
    font-size: 0.85rem;
    color: #334155;
    text-decoration: none;
}

.dropdown-content li a:hover {
    background: #f1f5f9;
}
```

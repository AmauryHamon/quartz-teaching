---
title: Tabs
draft: false
tags:
- initié
- snippet
- HTML
- CSS
- JS
- Component
---

A reusable tabs component: click a button, show the matching panel, hide the rest. Structure first, then a horizontal version and a vertical one — same JS both times, only the CSS changes.

# Pseudocode

## Structure

- A wrapper (`.tabs`) holds two lists: `.tabs-buttons` (one `<li><button>` per tab) and `.tabs-panels` (one `<li class="tab-panel">` per tab).
- Every button and its matching panel share a `data-tab` value, so they're paired by id rather than by position — reordering either list doesn't break anything.
- Only one panel is visible at a time; the buttons stay put, only the panels swap.

## Style

- Inactive panels are just `display: none`; the active one is `display: block`. No animation to start with.
- The active button gets a visual marker (an underline, a colored border, a background) so the current tab is always obvious.
- Horizontal tabs put `.tabs-buttons` in a row above the panels; vertical tabs put `.tabs` itself in a row, with `.tabs-buttons` as a column beside the panels. That's the only real difference between the two.

## Features

- `activate(id)` toggles the `active` class on whichever button and panel match that `id`, and removes it from every other one.
- Clicking a button just calls `activate` with its own `data-tab` value.
- Bonus (not built here): keyboard support — arrow keys moving focus between tab buttons, following the ARIA `tablist`/`tab`/`tabpanel` pattern.

# Basic static tabs

Buttons and panels are matched by `data-tab`, not by their position in the list. Switching tabs is instant — just toggling `display` between `none` and `block`, no transition involved.

```html:index.html
<div class="tabs">
    <ul class="tabs-buttons">
        <li><button class="tab-btn active" data-tab="description">Description</button></li>
        <li><button class="tab-btn" data-tab="specs">Specs</button></li>
        <li><button class="tab-btn" data-tab="reviews">Reviews</button></li>
    </ul>
    <ul class="tabs-panels">
        <li class="tab-panel active" data-tab="description">
            <p>A lightweight, breathable jacket built for shoulder-season hikes — packs down to the size of a water bottle.</p>
        </li>
        <li class="tab-panel" data-tab="specs">
            <ul>
                <li>Weight: 240g</li>
                <li>Material: recycled ripstop nylon</li>
                <li>Sizes: XS–XXL</li>
            </ul>
        </li>
        <li class="tab-panel" data-tab="reviews">
            <p>"Kept me dry through a surprise storm on the ridge." — 4.7★ average, 128 reviews</p>
        </li>
    </ul>
</div>
```

```css:style.css
.tabs {
    border-radius: 8px;
    overflow: hidden;
    border: 1px solid #e2e8f0;
}

.tabs-buttons {
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
    border-bottom: 1px solid #e2e8f0;
}

.tab-btn {
    padding: 0.6rem 1rem;
    border: none;
    background: none;
    font-size: 0.85rem;
    color: #64748b;
    cursor: pointer;
    border-bottom: 2px solid transparent;
}

.tab-btn.active {
    color: #6366f1;
    border-bottom-color: #6366f1;
    font-weight: 600;
}

.tabs-panels {
    list-style: none;
    margin: 0;
    padding: 1rem;
    font-size: 0.9rem;
    color: #334155;
}

.tab-panel {
    display: none;
}

.tab-panel.active {
    display: block;
}

.tab-panel ul {
    margin: 0;
    padding-left: 1.2rem;
}
```

```js:script.js
const tabsEl = document.querySelector(".tabs");

if (tabsEl) {
    const buttons = tabsEl.querySelectorAll(".tab-btn");
    const panels = tabsEl.querySelectorAll(".tab-panel");

    const activate = (id) => {
        buttons.forEach((btn) => btn.classList.toggle("active", btn.dataset.tab === id));
        panels.forEach((panel) => panel.classList.toggle("active", panel.dataset.tab === id));
    };

    buttons.forEach((btn) => {
        btn.onclick = () => activate(btn.dataset.tab);
    });
}
```

# Vertical static tabs

Same JS as above, completely unchanged — only the CSS moves things around: `.tabs` becomes a flex row, `.tabs-buttons` becomes a column, and the active indicator moves from a bottom border to a left border. Layout direction is a styling decision, not a structural one.

```html:index.html
<div class="tabs">
    <ul class="tabs-buttons">
        <li><button class="tab-btn active" data-tab="description">Description</button></li>
        <li><button class="tab-btn" data-tab="specs">Specs</button></li>
        <li><button class="tab-btn" data-tab="reviews">Reviews</button></li>
    </ul>
    <ul class="tabs-panels">
        <li class="tab-panel active" data-tab="description">
            <p>A lightweight, breathable jacket built for shoulder-season hikes — packs down to the size of a water bottle.</p>
        </li>
        <li class="tab-panel" data-tab="specs">
            <ul>
                <li>Weight: 240g</li>
                <li>Material: recycled ripstop nylon</li>
                <li>Sizes: XS–XXL</li>
            </ul>
        </li>
        <li class="tab-panel" data-tab="reviews">
            <p>"Kept me dry through a surprise storm on the ridge." — 4.7★ average, 128 reviews</p>
        </li>
    </ul>
</div>
```

```css:style.css
.tabs {
    display: flex;
    border-radius: 8px;
    overflow: hidden;
    border: 1px solid #e2e8f0;
}

.tabs-buttons {
    display: flex;
    flex-direction: column;
    list-style: none;
    margin: 0;
    padding: 0;
    border-right: 1px solid #e2e8f0;
    min-width: 8rem;
}

.tab-btn {
    display: block;
    width: 100%;
    padding: 0.6rem 1rem;
    border: none;
    background: none;
    text-align: left;
    font-size: 0.85rem;
    color: #64748b;
    cursor: pointer;
    border-left: 2px solid transparent;
}

.tab-btn.active {
    color: #6366f1;
    border-left-color: #6366f1;
    background: #f8fafc;
    font-weight: 600;
}

.tabs-panels {
    list-style: none;
    margin: 0;
    padding: 1rem;
    font-size: 0.9rem;
    color: #334155;
    flex: 1;
}

.tab-panel {
    display: none;
}

.tab-panel.active {
    display: block;
}

.tab-panel ul {
    margin: 0;
    padding-left: 1.2rem;
}
```

```js:script.js
const tabsEl = document.querySelector(".tabs");

if (tabsEl) {
    const buttons = tabsEl.querySelectorAll(".tab-btn");
    const panels = tabsEl.querySelectorAll(".tab-panel");

    const activate = (id) => {
        buttons.forEach((btn) => btn.classList.toggle("active", btn.dataset.tab === id));
        panels.forEach((panel) => panel.classList.toggle("active", panel.dataset.tab === id));
    };

    buttons.forEach((btn) => {
        btn.onclick = () => activate(btn.dataset.tab);
    });
}
```

# Horizontal tabs with a height transition

CSS can't transition `height: auto` — there's no fixed start value to animate from. The trick is to measure the incoming panel's real height in JS (`scrollHeight`) and animate the container between explicit pixel values instead.

The panel itself still swaps instantly (`display: none` has no transition), but the panel's own padding has to live on `.tab-panel`, not on the outer `.tabs-panels` — `scrollHeight` only measures the element it's read from, so if the padding were on the container instead, the measured height would come up short and the content would get clipped.

```html:index.html
<div class="tabs">
    <ul class="tabs-buttons">
        <li><button class="tab-btn active" data-tab="description">Description</button></li>
        <li><button class="tab-btn" data-tab="specs">Specs</button></li>
        <li><button class="tab-btn" data-tab="reviews">Reviews</button></li>
    </ul>
    <ul class="tabs-panels">
        <li class="tab-panel active" data-tab="description">
            <p>A lightweight, breathable jacket built for shoulder-season hikes — packs down to the size of a water bottle.</p>
        </li>
        <li class="tab-panel" data-tab="specs">
            <ul>
                <li>Weight: 240g</li>
                <li>Material: recycled ripstop nylon</li>
                <li>Sizes: XS–XXL</li>
                <li>Colors: Slate, Moss, Rust</li>
                <li>Warranty: 2 years</li>
                <li>Care: machine wash cold, hang dry</li>
            </ul>
        </li>
        <li class="tab-panel" data-tab="reviews">
            <p>"Kept me dry through a surprise storm on the ridge." — 4.7★</p>
            <p>"Packs so small it lives in my bag permanently now." — 5★</p>
            <p>"Runs a little large, sized down and it's perfect." — 4★</p>
        </li>
    </ul>
</div>
```

```css:style.css
.tabs {
    border-radius: 8px;
    overflow: hidden;
    border: 1px solid #e2e8f0;
}

.tabs-buttons {
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
    border-bottom: 1px solid #e2e8f0;
}

.tab-btn {
    padding: 0.6rem 1rem;
    border: none;
    background: none;
    font-size: 0.85rem;
    color: #64748b;
    cursor: pointer;
    border-bottom: 2px solid transparent;
}

.tab-btn.active {
    color: #6366f1;
    border-bottom-color: #6366f1;
    font-weight: 600;
}

.tabs-panels {
    list-style: none;
    margin: 0;
    padding: 0;
    overflow: hidden;
    transition: height 0.35s ease;
}

.tab-panel {
    display: none;
    padding: 1rem;
    font-size: 0.9rem;
    color: #334155;
}

.tab-panel.active {
    display: block;
}

.tab-panel ul {
    margin: 0;
    padding-left: 1.2rem;
}

.tab-panel p {
    margin: 0 0 0.5rem;
}

.tab-panel p:last-child {
    margin-bottom: 0;
}
```

```js:script.js
const tabsEl = document.querySelector(".tabs");

if (tabsEl) {
    const buttons = tabsEl.querySelectorAll(".tab-btn");
    const panels = tabsEl.querySelectorAll(".tab-panel");
    const panelsEl = tabsEl.querySelector(".tabs-panels");

    const activate = (id) => {
        buttons.forEach((btn) => btn.classList.toggle("active", btn.dataset.tab === id));
        panels.forEach((panel) => panel.classList.toggle("active", panel.dataset.tab === id));

        // the new panel is already `display: block` at this point — measure its real height...
        const activePanel = tabsEl.querySelector(".tab-panel.active");
        // ...and animate the container to it. Old height -> new height, transitioned by CSS.
        panelsEl.style.height = `${activePanel.scrollHeight}px`;
    };

    // lock in a starting height in px first — transitioning FROM "auto" doesn't animate
    panelsEl.style.height = `${tabsEl.querySelector(".tab-panel.active").scrollHeight}px`;

    buttons.forEach((btn) => {
        btn.onclick = () => activate(btn.dataset.tab);
    });
}
```

Not built here: the pinned pixel height goes stale if the window resizes and the active panel's content reflows to a different height — a real component would re-measure on resize (or with a `ResizeObserver`) rather than trusting the value from the last `activate()` call.


# Tabs using radio inputs

```html:index.html
<div class="tabs">
      <!-- TYPE THE TABS MARKUP -->
      <input type="radio" name="t" id="t1" checked />
      <label for="t1">Tab1</label>
      <input type="radio" name="t" id="t2" />
      <label for="t2">Tab2</label>
      <input type="radio" name="t" id="t3" />
      <label for="t3">Tab3</label>
      <div class="panel" data-panel="1"><p>Tab content 1.</p></div>
      <div class="panel" data-panel="2"><p>Tab content 2.</p></div>
      <div class="panel" data-panel="3"><p>Tab content 3.</p></div>
</div>
```
```css:style.css
.tabs {
  position: relative;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: 100%;
  max-width: 600px;
  border: 2px solid #111111;
  background: #f5f5f5;
}
.tabs label {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  font-family: inherit;
  color: #111111;
  cursor: pointer;
  user-select: none;
  position: relative;
  z-index: 1;
}
.panel {
  grid-column: 1 / -1;
  padding: 2rem;
  border-top: 2px solid #111111;
  display: none;
  font-size: 1rem:
  color: #111111;
}
.tabs input[type="radio"] {
  position: absolute;
  clip-path: inset(50%);
  opacity: 0;
}
.tabs:has(#t1:checked) .panel[data-panel="1"],
.tabs:has(#t2:checked) .panel[data-panel="2"],
.tabs:has(#t3:checked) .panel[data-panel="3"] {
  display: block;
}
.tabs::before {
  content: "";
  position: absolute;
  bottom: 100%;
  height: 4px;
  width: calc(100% / 3);
  background: #e8410a;
  transform: translateY(34px);
  transition: transform .35s cubic-bezier(.4, 0, .2, 1);
}
.tabs:has(#t1:checked)::before { transform: translate(0,    4px); }
.tabs:has(#t2:checked)::before { transform: translate(100%, 4px); }
.tabs:has(#t3:checked)::before { transform: translate(200%, 4px); }

```

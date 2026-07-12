---
title: Tooltip
draft: false
tags:
  - initié
  - snippet
  - HTML
  - CSS
  - JS
  - Component
---

A short label that appears near an element on hover or focus. The base version needs zero JS — CSS `::before`/`::after` plus `:hover`/`:focus` covers it.

# Pseudocode

## Structure

- The trigger carries the tooltip text itself, usually in a `data-tooltip` attribute rather than a separate visible element — CSS's `content: attr(data-tooltip)` reads it directly.

## Style

- The tooltip is a `::after` pseudo-element, positioned `absolute` relative to the trigger (`position: relative`), hidden by default (`opacity: 0` plus a small transform) and revealed on `:hover`/`:focus`.
- A small triangle — another pseudo-element, `::before` — points from the tooltip back to the trigger.

## Features

- Pure CSS covers hover/focus and a fade-in.
- Smarter positioning (flipping to the other side when the tooltip would run off the edge of the screen) needs JS, since CSS alone can't measure where the viewport edge actually is.

# CSS-only tooltip

```html:index.html
<div class="tooltip-row">
    <button class="btn" data-tooltip="Saves your changes">Save</button>
    <button class="btn" data-tooltip="Permanently deletes this item">Delete</button>
    <button class="btn" data-tooltip="Copies a link to this page">Share</button>
</div>
```

```css:style.css
.tooltip-row {
    display: flex;
    gap: 1rem;
}

.btn {
    padding: 0.5rem 1rem;
    border: 1px solid #e2e8f0;
    border-radius: 6px;
    background: white;
    font-size: 0.85rem;
    cursor: pointer;
    position: relative;
}

.btn::after,
.btn::before {
    position: absolute;
    left: 50%;
    bottom: calc(100% + 0.4rem);
    transform: translateX(-50%) translateY(4px);
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.15s ease, transform 0.15s ease;
}

.btn::after {
    content: attr(data-tooltip);
    padding: 0.35rem 0.6rem;
    border-radius: 6px;
    background: #1e293b;
    color: white;
    font-size: 0.75rem;
    white-space: nowrap;
}

.btn::before {
    content: "";
    bottom: 100%;
    margin-bottom: -0.15rem;
    border: 5px solid transparent;
    border-top-color: #1e293b;
}

.btn:hover::after,
.btn:hover::before,
.btn:focus-visible::after,
.btn:focus-visible::before {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
}
```

# Tooltip that repositions to stay on screen

CSS alone can't tell whether the tooltip is about to run off the edge of the screen — that needs a real measurement. This version uses one shared floating element instead of a `::after` per button: on `mouseenter`/`focus`, JS measures the trigger and the tooltip with `getBoundingClientRect()`, prefers placing it above the button, flips it below if there isn't room, and clamps its horizontal position so it never overflows either edge.

```html:index.html
<div class="tooltip-row">
    <button class="btn" data-tooltip="Saves your changes">Save</button>
    <button class="btn" data-tooltip="Permanently deletes this item — long enough to force a flip">Delete</button>
    <button class="btn" data-tooltip="Copies a link">Share</button>
</div>
<div class="tooltip-float" id="tf-tooltip" role="tooltip"></div>
```

```css:style.css
.tooltip-row {
    display: flex;
    gap: 1rem;
    padding-top: 2rem; /* room for a tooltip that flips above */
}

.btn {
    padding: 0.5rem 1rem;
    border: 1px solid #e2e8f0;
    border-radius: 6px;
    background: white;
    font-size: 0.85rem;
    cursor: pointer;
}

.tooltip-float {
    position: fixed;
    max-width: 12rem;
    padding: 0.35rem 0.6rem;
    border-radius: 6px;
    background: #1e293b;
    color: white;
    font-size: 0.75rem;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.1s ease;
    z-index: 20;
}

.tooltip-float.visible {
    opacity: 1;
}
```

```js:script.js
const buttons = document.querySelectorAll(".btn[data-tooltip]");
const tooltip = document.getElementById("tf-tooltip");

if (buttons.length && tooltip) {
    const show = (btn) => {
        tooltip.textContent = btn.dataset.tooltip;
        tooltip.classList.add("visible");

        const btnRect = btn.getBoundingClientRect();
        const tipRect = tooltip.getBoundingClientRect();
        const gap = 8;

        // prefer above the button; flip below if there isn't room
        let top = btnRect.top - tipRect.height - gap;
        if (top < 0) top = btnRect.bottom + gap;

        // center on the button, then clamp so it never runs off either edge
        let left = btnRect.left + btnRect.width / 2 - tipRect.width / 2;
        left = Math.max(gap, Math.min(left, window.innerWidth - tipRect.width - gap));

        tooltip.style.top = `${top}px`;
        tooltip.style.left = `${left}px`;
    };

    const hide = () => tooltip.classList.remove("visible");

    buttons.forEach((btn) => {
        btn.addEventListener("mouseenter", () => show(btn));
        btn.addEventListener("mouseleave", hide);
        btn.addEventListener("focus", () => show(btn));
        btn.addEventListener("blur", hide);
    });
}
```

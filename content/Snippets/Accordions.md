---
title: Accordions
draft: false
tags:
  - initié
  - snippet
  - HTML
  - CSS
  - JS
  - Component
---

A collapsible list of items — click a header, reveal (or hide) its content. Structure first, then three versions: the native, zero-JS one, a native one-at-a-time variant, and a custom JS version that can actually animate.

# Pseudocode

## Structure

- Each item is a header (the always-visible, clickable part) plus a body (the part that collapses).
- A list of these items, stacked vertically, forms the accordion.
- The `<details>`/`<summary>` pair is a native HTML version of exactly this — the browser handles the open/closed state, no JS or `class="active"` needed for the basics.

## Style

- The header gets the cursor/hover styling and a marker (the default disclosure triangle, or a custom `+`/`−`) showing whether it's open.
- Height changes are either instant (the native default) or animated — animating means abandoning `<details>` for a custom button + `div` pair, since transitioning a native details element's open/close height isn't reliably supported yet.

## Features

- Multiple open at once is the default `<details>` behavior — nothing to build.
- Exactly one open at a time can also be done natively: give every `<details>` in the group the same `name` attribute and the browser closes the others for you.
- Animating the open/close height needs JS: measure the panel's content height and transition between `0` and that value.

# Basic static accordions

The `<details>`/`<summary>` pair is a native, built-in accordion item — click the summary, the browser handles opening and closing. No JS, no transition, and every item is independent: any number can be open at once.

```html:index.html
<div class="accordion">
    <details>
        <summary>What's your return policy?</summary>
        <p>Unworn items can be returned within 30 days for a full refund.</p>
    </details>
    <details>
        <summary>Do you ship internationally?</summary>
        <p>Yes — shipping costs are calculated at checkout based on destination.</p>
    </details>
    <details>
        <summary>How do I track my order?</summary>
        <p>You'll get a tracking link by email as soon as your order ships.</p>
    </details>
</div>
```

```css:style.css
.accordion {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

details {
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    padding: 0.75rem 1rem;
}

summary {
    cursor: pointer;
    font-size: 0.9rem;
    font-weight: 600;
    color: #1e293b;
}

summary::marker {
    color: #6366f1;
}

details p {
    margin: 0.6rem 0 0;
    font-size: 0.85rem;
    color: #64748b;
}
```

# Basic static accordions (one at a time)

Give every `<details>` the same `name` attribute and the browser makes them mutually exclusive — opening one closes the others, still with zero JS. (Supported in current Chrome, Edge, Firefox and Safari; older browsers just fall back to every item being independent, like the section above.)

```html:index.html
<div class="accordion">
    <details name="faq">
        <summary>What's your return policy?</summary>
        <p>Unworn items can be returned within 30 days for a full refund.</p>
    </details>
    <details name="faq">
        <summary>Do you ship internationally?</summary>
        <p>Yes — shipping costs are calculated at checkout based on destination.</p>
    </details>
    <details name="faq">
        <summary>How do I track my order?</summary>
        <p>You'll get a tracking link by email as soon as your order ships.</p>
    </details>
</div>
```

```css:style.css
.accordion {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

details {
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    padding: 0.75rem 1rem;
}

summary {
    cursor: pointer;
    font-size: 0.9rem;
    font-weight: 600;
    color: #1e293b;
}

summary::marker {
    color: #6366f1;
}

details p {
    margin: 0.6rem 0 0;
    font-size: 0.85rem;
    color: #64748b;
}
```

# Basic static accordions with a height transition

`<details>` can't be reliably height-animated yet, so this version swaps it for a plain `<button>` + `<div class="accordion-panel">` pair, with JS doing what the browser did for free above: tracking open/closed state (via `aria-expanded`, which does double duty for accessibility) and closing every other item when one opens.

The animation is the same trick as the tabs note: `height: 0` by default, and opening sets `height` to the panel's measured `scrollHeight` in pixels. `scrollHeight` reports the full content height even while the panel is visually collapsed and clipped by `overflow: hidden`, so there's no flash of the wrong size — closing just sets it back to `0px`.

Same caveat as before: the pinned height doesn't know about content that reflows later (a window resize, a font loading in) — a production version would re-measure rather than trust a value read once at open time.

```html:index.html
<div class="accordion">
    <div class="accordion-item">
        <button class="accordion-trigger" aria-expanded="false">What's your return policy?</button>
        <div class="accordion-panel">
            <p>Unworn items can be returned within 30 days for a full refund.</p>
        </div>
    </div>
    <div class="accordion-item">
        <button class="accordion-trigger" aria-expanded="false">Do you ship internationally?</button>
        <div class="accordion-panel">
            <p>Yes — shipping costs are calculated at checkout based on destination.</p>
        </div>
    </div>
    <div class="accordion-item">
        <button class="accordion-trigger" aria-expanded="false">How do I track my order?</button>
        <div class="accordion-panel">
            <p>You'll get a tracking link by email as soon as your order ships.</p>
        </div>
    </div>
</div>
```

```css:style.css
.accordion {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.accordion-item {
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    overflow: hidden;
}

.accordion-trigger {
    display: block;
    width: 100%;
    padding: 0.75rem 1rem;
    border: none;
    background: none;
    text-align: left;
    font-size: 0.9rem;
    font-weight: 600;
    color: #1e293b;
    cursor: pointer;
}

.accordion-trigger::after {
    content: "+";
    float: right;
    color: #6366f1;
}

.accordion-trigger[aria-expanded="true"]::after {
    content: "−";
}

.accordion-panel {
    height: 0;
    overflow: hidden;
    transition: height 0.3s ease;
}

.accordion-panel p {
    margin: 0;
    padding: 0 1rem 0.75rem;
    font-size: 0.85rem;
    color: #64748b;
}
```

```js:script.js
const accordionEl = document.querySelector(".accordion");

if (accordionEl) {
    const items = accordionEl.querySelectorAll(".accordion-item");

    const setOpen = (item, isOpen) => {
        const trigger = item.querySelector(".accordion-trigger");
        const panel = item.querySelector(".accordion-panel");
        trigger.setAttribute("aria-expanded", String(isOpen));
        panel.style.height = isOpen ? `${panel.scrollHeight}px` : "0px";
    };

    items.forEach((item) => {
        const trigger = item.querySelector(".accordion-trigger");
        trigger.onclick = () => {
            const isOpen = trigger.getAttribute("aria-expanded") === "true";
            items.forEach((other) => setOpen(other, other === item && !isOpen));
        };
    });
}
```

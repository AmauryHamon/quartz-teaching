---
title: Card
draft: false
tags:
  - initié
  - snippet
  - HTML
  - CSS
  - JS
  - Component
---

A self-contained block of content — media, title, text, actions. Mostly a styling exercise; the base version needs no JS at all.

# Pseudocode

## Structure

- A wrapper (`.card`) holds an optional media block, a body (title + text), and an optional footer (actions/price/buttons).
- Cards are almost never alone — they're usually laid out in a grid or a wrapped row.

## Style

- Rounded corners plus a border or shadow so the card reads as a distinct surface; `overflow: hidden` so the media block respects that corner radius instead of poking past it.
- Consistent internal spacing (padding on the body, a gap between title/text/actions) matters more than any single flashy property.

## Features

- Static cards need no JS.
- A common bit of interactivity: clamping long text to a couple of lines with a "Read more" toggle — reusing the height-transition trick from the tabs and accordion notes.

# Basic card

```html:index.html
<div class="card-grid">
    <article class="card">
        <div class="card-media" style="background:#6366f1">🏔️</div>
        <div class="card-body">
            <h3 class="card-title">Trailhead Jacket</h3>
            <p class="card-text">Lightweight shell for shoulder-season hikes, packs down to nothing.</p>
        </div>
        <div class="card-actions">
            <span class="card-price">$128</span>
            <button class="card-btn">Add to cart</button>
        </div>
    </article>
    <article class="card">
        <div class="card-media" style="background:#0ea5e9">🌊</div>
        <div class="card-body">
            <h3 class="card-title">Reef Sandals</h3>
            <p class="card-text">Quick-dry straps and a grippy sole for wet rocks and tide pools.</p>
        </div>
        <div class="card-actions">
            <span class="card-price">$54</span>
            <button class="card-btn">Add to cart</button>
        </div>
    </article>
    <article class="card">
        <div class="card-media" style="background:#f97316">🏜️</div>
        <div class="card-body">
            <h3 class="card-title">Canyon Cap</h3>
            <p class="card-text">Wide brim, UPF 50+, and a chin cord for windy ridgelines.</p>
        </div>
        <div class="card-actions">
            <span class="card-price">$32</span>
            <button class="card-btn">Add to cart</button>
        </div>
    </article>
</div>
```

```css:style.css
.card-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 0.75rem;
}

.card {
    display: flex;
    flex-direction: column;
    border: 1px solid #e2e8f0;
    border-radius: 10px;
    overflow: hidden;
    background: white;
}

.card-media {
    height: 90px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.8rem;
}

.card-body {
    padding: 0.75rem;
    flex: 1;
}

.card-title {
    margin: 0 0 0.3rem;
    font-size: 0.9rem;
    color: #1e293b;
}

.card-text {
    margin: 0;
    font-size: 0.8rem;
    color: #64748b;
}

.card-actions {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.6rem 0.75rem;
    border-top: 1px solid #f1f5f9;
}

.card-price {
    font-weight: 600;
    color: #1e293b;
    font-size: 0.85rem;
}

.card-btn {
    padding: 0.35rem 0.7rem;
    border: none;
    border-radius: 6px;
    background: #6366f1;
    color: white;
    font-size: 0.8rem;
    cursor: pointer;
}
```

# Card with expandable text

`.card-clamp` starts at a fixed height (`2.6em`, about two lines) with `overflow: hidden`. The toggle reads the panel's real height with `scrollHeight` — the same trick as the tabs and accordion notes — and animates between the collapsed height and that value.

```html:index.html
<article class="card" id="ec-card">
    <div class="card-media" style="background:#14b8a6">🧊</div>
    <div class="card-body">
        <h3 class="card-title">Glacier Bottle</h3>
        <div class="card-clamp" id="ec-clamp">
            <p class="card-text">
                Double-walled steel, keeps drinks cold for 24 hours or hot for 12. The wide mouth fits ice
                cubes and most filter straws, and the powder-coated finish resists scratches on the trail.
                Comes in five colors, all made from 90% recycled steel.
            </p>
        </div>
        <button class="card-toggle" id="ec-toggle">Read more</button>
    </div>
</article>
```

```css:style.css
.card {
    border: 1px solid #e2e8f0;
    border-radius: 10px;
    overflow: hidden;
    background: white;
    max-width: 20rem;
}

.card-media {
    height: 90px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.8rem;
}

.card-body {
    padding: 0.75rem;
}

.card-title {
    margin: 0 0 0.4rem;
    font-size: 0.9rem;
    color: #1e293b;
}

.card-clamp {
    height: 2.6em;
    overflow: hidden;
    transition: height 0.3s ease;
}

.card-text {
    margin: 0;
    font-size: 0.8rem;
    line-height: 1.3;
    color: #64748b;
}

.card-toggle {
    margin-top: 0.4rem;
    padding: 0;
    border: none;
    background: none;
    color: #6366f1;
    font-size: 0.8rem;
    cursor: pointer;
}
```

```js:script.js
const clamp = document.getElementById("ec-clamp");
const toggle = document.getElementById("ec-toggle");

if (clamp && toggle) {
    const collapsedHeight = clamp.getBoundingClientRect().height; // ~2.6em, measured once up front
    let expanded = false;

    toggle.onclick = () => {
        expanded = !expanded;
        clamp.style.height = expanded ? `${clamp.scrollHeight}px` : `${collapsedHeight}px`;
        toggle.textContent = expanded ? "Show less" : "Read more";
    };
}
```

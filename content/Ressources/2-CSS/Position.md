---
title: Position
draft: false
tags:
  - cheatsheet
  - débutant
  - CSS
description: static, relative, absolute, fixed, sticky — and z-index
---

import StoryEmbed from "../../../components/StoryEmbed.astro";

## 01. Static & Relative

`static` is the default — `top/right/bottom/left` do nothing. `relative` offsets an element from its natural position while keeping the original space reserved.

```html:index.html
<div class="sr-demo">
    <div class="col">
        <div class="col-label">position: static (default)</div>
        <div class="box b-static">Box A</div>
        <div class="box b-flow">Box B</div>
        <p class="note">top/left have no effect</p>
    </div>
    <div class="col">
        <div class="col-label">position: relative</div>
        <div class="box b-relative">Box A</div>
        <div class="box b-flow">Box B</div>
        <p class="note">Box A: top:-12px; left:12px<br>Original space is kept</p>
    </div>
</div>
```
```css:style.css
.sr-demo { 
    display: flex; 
    gap: 2rem; 
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
    margin-bottom: 1.5rem; 
}
.box { 
    width: 80px; 
    height: 40px; 
    border-radius: 6px; 
    display: flex; 
    align-items: center; 
    justify-content: center; 
    font-size: .75rem; 
    font-weight: 600; 
    color: white; 
    font-family: monospace; 
}
.b-static   { 
    background: #a5b4fc; 
    position: static; 
}
.b-flow     { 
    background: #e0e7ff; 
    color: #1e1b4b; 
}
.b-relative { 
    background: #6366f1; 
    position: relative; 
    top: -12px; 
    left: 12px; 
}
.b-placeholder { 
    background: #e0e7ff; 
    border: 2px dashed #a5b4fc; 
    color: #6366f1; 
}
.note { 
    font-size: .7rem; 
    color: #94a3b8; 
    margin-top: .5rem; 
}
```

```css
/* static — default, no special positioning */
.box { position: static; }  /* top/right/bottom/left have no effect */

/* relative — shift from normal position, original space kept */
.box {
    position: relative;
    top:  -12px;   /* moves up */
    left:  12px;   /* moves right */
}

/* relative also creates a positioning context for absolute children */
.parent { position: relative; }
```

---

## 02. Absolute

Removed from normal flow, placed relative to its nearest non-static ancestor. If no such ancestor exists, it positions relative to the viewport.

```html:index.html
<div class="abs-parent">
    <span class="parent-label">position: relative</span>
    <div class="abs-child c-tr">top:8 right:8</div>
    <div class="abs-child c-bl">bottom:8 left:8</div>
    <div class="abs-child c-center">centered</div>
</div>    
```
```css:style.css
.abs-parent {
    position: relative;
    width: 100%; height: 200px;
    background: #f1f5f9;
    border: 2px dashed #cbd5e1;
    border-radius: 8px;
}
.parent-label { 
    padding: .5rem; 
    font-size: .7rem; 
    color: #94a3b8; 
    font-family: monospace; 
}
.abs-child {
    position: absolute;
    background: #6366f1; color: white;
    padding: .35rem .75rem; border-radius: 6px;
    font-size: .75rem; font-family: monospace;
}

.c-tr { top: 8px;  right: 8px;  }
.c-bl { bottom: 8px; left: 8px; }
.c-center {
    top: 50%; left: 50%;
    transform: translate(-50%, -50%);
}
```


```css
.parent {
    position: relative; /* creates the positioning context */
    width: 400px;
    height: 200px;
}

.child {
    position: absolute;
    top:   0;
    right: 0;   /* top-right corner of parent */
}

/* centering trick with absolute + transform */
.centered {
    position: absolute;
    top:  50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
```

---

## 03. Fixed

Positioned relative to the **viewport**. Stays in place as you scroll — ideal for navbars, overlays, and floating buttons.

```html:index.html
<div class="fixed-demo">
    <div class="fixed-mock">
        position: fixed navbar (simulated)
    </div>
    <div class="fixed-content">
        <p>Scroll content line 1 — navbar stays fixed</p>
        <p>Scroll content line 2 — navbar stays fixed</p>
        <p>Scroll content line 3 — navbar stays fixed</p>
        <p>Scroll content line 4 — navbar stays fixed</p>
        <p>Scroll content line 5 — navbar stays fixed</p>
        <p>Scroll content line 6 — navbar stays fixed</p>
        <p>Scroll content line 7 — navbar stays fixed</p>
        <p>Scroll content line 8 — navbar stays fixed</p>
        <p>Scroll content line 9 — navbar stays fixed</p>
        <p>Scroll content line 10 — navbar stays fixed</p>
        <p>Scroll content line 11 — navbar stays fixed</p>
        <p>Scroll content line 12 — navbar stays fixed</p>
        <p>Scroll content line 13 — navbar stays fixed</p>
        <p>Scroll content line 14 — navbar stays fixed</p>
        <p>Scroll content line 15 — navbar stays fixed</p>
        <p>Scroll content line 16 — navbar stays fixed</p>
    </div>
    <div class="fixed-fab">+</div>
</div>
```
```css:style.css
.fixed-demo { 
    position: relative; height: 160px; 
    background: #f1f5f9; border-radius: 8px; 
    overflow: hidden; 
}
.fixed-mock {
    position: absolute;
    left: 0; right: 0; top: 0;
    background: #6366f1; color: white;
    padding: .5rem 1rem;
    font-size: .8rem; font-family: monospace;
    z-index: 10;
}
.fixed-content { 
    position: absolute; /* should be fixed */
    inset: 0;
    padding: 3rem 1rem 1rem; 
    font-size: .8rem; 
    color: #64748b; 
    overflow-y: auto; 
    box-sizing: border-box;
}
.fixed-fab {
    position: absolute; 
    bottom: 12px; right: 12px;
    width: 2.5rem; height: 2.5rem;
    background: #6366f1; color: white;
    border-radius: 50%; 
    display: flex; align-items: center; justify-content: center;
    font-size: 1.2rem; 
    box-shadow: 0 4px 12px rgba(99,102,241,.4);
}
```


```css
.navbar {
    position: fixed;
    top:   0;
    left:  0;
    right: 0;       /* full width */
    z-index: 100;
}

.fab {
    position: fixed;
    bottom: 24px;
    right:  24px;
}

.overlay {
    position: fixed;
    inset: 0;       /* shorthand for top:0 right:0 bottom:0 left:0 */
    background: rgba(0, 0, 0, 0.5);
}
```

---

## 04. Sticky

Behaves like `relative` until it reaches the threshold you define — then sticks like `fixed`. Scroll inside the demo to see it in action.

```html:index.html
<div class="scroll-area">
    <div class="sticky-header">
        Sticky header (position: sticky; top: 0)
    </div>
    <div class="item">Item 1 — scroll down</div>
    <div class="item">Item 2 — scroll down</div>
    <div class="item">Item 3 — scroll down</div>
    <div class="item">Item 4 — scroll down</div>
    <div class="item">Item 5 — scroll down</div>
    <div class="item">Item 6 — scroll down</div>
    <div class="item">Item 7 — scroll down</div>
    <div class="item">Item 8 — scroll down</div>
    <div class="item">Item 9 — scroll down</div>
    <div class="item">Item 10 — scroll down</div>
    <div class="item">Item 11 — scroll down</div>
    <div class="item">Item 12 — scroll down</div>
</div>
```
```css:style.css
.scroll-area { 
    height: 240px; 
    overflow-y: auto; 
    border: 1px solid #e2e8f0; 
    border-radius: 8px; 
}
.sticky-header {
    position: sticky; 
    top: 0;
    z-index: 1;
    background: #6366f1; color: white;
    padding: .6rem 1rem; font-weight: 600;
}
.item { 
    padding: .75rem 1rem; 
    border-bottom: 1px solid #f1f5f9; 
}
```

---

## 05. z-index & Stacking

`z-index` controls the stacking order. Higher numbers are on top. Each positioned element creates a **stacking context** — z-index is relative within it.

```html:index.html
<div class="stack">
    <div class="layer l1">z-index: 1</div>
    <div class="layer l2">z-index: 2</div>
    <div class="layer l3">z-index: 3</div>
</div>
```
```css:style.css
.stack { 
    position: relative; 
    width: 200px; height: 140px; 
}
.layer {
    position: absolute;
    width: 120px; height: 80px;
    border-radius: 8px;
    display: flex; align-items: center; justify-content: center;
    font-weight: 600; font-size: .875rem;
}
.l1 { 
    background: #bfdbfe; 
    top: 0; left: 0;   
    z-index: 1; 
}
.l2 { 
    background: #a5f3fc; 
    top: 60px; left: 60px; 
    z-index: 2; 
}
.l3 { 
    background: #bbf7d0; 
    top: 120px; left: 120px; 
    z-index: 3; 
}
```

```css
/* z-index only works on positioned elements (not static) */
.tooltip { position: absolute; z-index: 500; }
.modal   { position: fixed;    z-index: 1000; }
.overlay { position: fixed;    z-index: 900; }

/* common z-index scale */
--z-base:     1;
--z-dropdown: 10;
--z-sticky:   20;
--z-overlay:  30;
--z-modal:    40;
--z-toast:    50;
```

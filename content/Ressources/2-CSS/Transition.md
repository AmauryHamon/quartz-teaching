---
title: Transitions
draft: false
tags:
  - cheatsheet
  - débutant
  - CSS
description: Animate between CSS states smoothly — without JavaScript
---

## 01. Basic Transition

A transition animates a CSS property whenever it changes (on hover, focus, class toggle, etc.). Without a transition the change is instant.

```html:index.html
<button class="btn">Hover me</button>
```
```css:style.css
.btn {
    display: inline-block;
    padding: .75rem 1.5rem;
    background: #6366f1;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    cursor: pointer;
    transition: background .25s ease, transform .15s ease, box-shadow .25s ease;
}
.btn:hover {
    background: #4f46e5;
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgb(99 102 241 / .4);
}
.btn:active { transform: translateY(0); }
```

```css
/* shorthand: property  duration  timing-fn  delay */
transition: background 0.3s ease;
transition: all 0.3s ease;
transition: transform 0.4s ease, opacity 0.3s ease;  /* multiple */

/* individual longhand */
transition-property:        transform;
transition-duration:        0.4s;
transition-timing-function: ease-out;
transition-delay:           0.1s;

.btn { background: blue; transition: background 0.3s; }
.btn:hover  { background: purple; }
.btn:active { background: navy; }
```

---

## 02. Timing Functions

Controls how the transition progresses over time. Hover the track area in the demo to see all four run simultaneously.

```html:index.html
<div class="rows">
    <div class="row">
        <span class="row-label">linear</span>       
        <div class="track ease-linear">
            <div class="ball"></div>
        </div>
    </div>
    <div class="row">
        <span class="row-label">ease-in</span>      
        <div class="track ease-in">
            <div class="ball"></div>
        </div>
    </div>
    <div class="row">
        <span class="row-label">ease-out</span>     
        <div class="track ease-out">
            <div class="ball"></div>
        </div>
    </div>
    <div class="row">
        <span class="row-label">ease-in-out</span>  
        <div class="track ease-in-out">
            <div class="ball"></div>
        </div>
    </div>
</div>
<p>Hover to see each track animate.</p>
```
```css:style.css
.rows { 
    display: flex; 
    flex-direction: column; 
    gap: 1rem; 

    & .row  { 
        display: flex; 
        align-items: center; 
        gap: 1rem; 

        & .row-label { 
            width: 10rem; 
            font-size: .8rem; 
            flex-shrink: 0; 
        }
        & .track { 
            flex: 1; height: 2.5rem; 
            background: #f1f5f9; 
            border-radius: 99px; 
            position: relative; 
            overflow: hidden; 
            cursor: pointer; 

        }
    }
}
& .ball { 
    position: absolute; 
    left: 8px; top: 50%; 
    transform: translateY(-50%); 
    width: 1.75rem; height: 1.75rem; 
    background: #6366f1; 
    border-radius: 50%; 
    transition-duration: .6s; 
    transition-property: left; 
}
.rows:hover .ball { 
    left: calc(100% - 2.25rem); 
}
.ease-linear .ball { 
    transition-timing-function: linear; 
}
.ease-in .ball { 
    transition-timing-function: ease-in; 
}
.ease-out .ball {
    transition-timing-function: ease-out; 
}
.ease-in-out .ball { 
    transition-timing-function: ease-in-out; 
}
```

```css
transition-timing-function: linear;        /* constant speed */
transition-timing-function: ease;          /* slow → fast → slow (default) */
transition-timing-function: ease-in;       /* starts slow, ends fast */
transition-timing-function: ease-out;      /* starts fast, ends slow */
transition-timing-function: ease-in-out;   /* slow → fast → slow (symmetric) */

/* custom cubic-bezier — use cubic-bezier.com to find values */
transition-timing-function: cubic-bezier(0.34, 1.56, 0.64, 1); /* spring-like */

/* steps — discrete jumps, useful for sprite animation */
transition-timing-function: steps(5, end);
```

---

## 03. Delay & Staggering

`transition-delay` waits before the transition starts. Apply increasing delays to siblings to create a stagger effect. Hover the row in the demo.

```html:index.html
<div class="stagger-row">
    <div class="s-item"></div>
    <div class="s-item"></div>
    <div class="s-item"></div>
    <div class="s-item"></div>
    <div class="s-item"></div>
</div>
<p class="hint">Hover the row to trigger stagger.</p>
```
```css:style.css
.stagger-row {
    display: flex; 
    gap: .75rem; 
    padding: .5rem;
    border-radius: 8px; cursor: pointer;
}
.stagger-row:hover .s-item { 
    opacity: 1; 
    transform: translateY(0); 
}
.s-item {
    width: 3rem; height: 3rem; 
    border-radius: 6px;
    background: #6366f1; opacity: 0.1;
    transform: translateY(12px);
    transition: opacity .35s ease, transform .35s ease;
}
.s-item:nth-child(1) { transition-delay:   0ms; }
.s-item:nth-child(2) { transition-delay:  80ms; }
.s-item:nth-child(3) { transition-delay: 160ms; }
.s-item:nth-child(4) { transition-delay: 240ms; }
.s-item:nth-child(5) { transition-delay: 320ms; }
.hint { 
    font-size: .8rem; 
    color: #94a3b8; 
    margin-top: .75rem; 
}
```

```css
.item {
    opacity: 0;
    transform: translateY(12px);
    transition: opacity 0.4s ease, transform 0.4s ease;
}

.item:nth-child(1) { transition-delay: 0ms; }
.item:nth-child(2) { transition-delay: 80ms; }
.item:nth-child(3) { transition-delay: 160ms; }
.item:nth-child(4) { transition-delay: 240ms; }
.item:nth-child(5) { transition-delay: 320ms; }

.parent:hover .item {
    opacity: 1;
    transform: translateY(0);
}
```

---

## 04. Multiple Properties

Separate multiple transitions with a comma. Each property can have its own duration, timing, and delay.

```html:index.html
<div class="card">
    <h3>Card title</h3>
    <p>Hover to see multiple properties transitioning together.</p>
</div>
```
```css:style.css
.card {
    width: 200px;
    padding: 1.5rem;
    background: white;
    border: 1px solid #e2e8f0;
    border-radius: 12px;
    cursor: pointer;
    transition:
    transform   .2s ease,
    box-shadow  .2s ease,
    border-color .2s ease;
}
.card:hover {
    transform: translateY(-4px) scale(1.02);
    box-shadow: 0 12px 32px rgb(0 0 0 / .12);
    border-color: #6366f1;
}
.card h3 { 
    margin: 0 0 .5rem; 
    font-size: 1rem; 
}
.card p  { 
    margin: 0; 
    color: #64748b; 
    font-size: .875rem; 
}
```

```css
.card {
    background:    hsl(247, 70%, 30%);
    transform:     scale(1);
    border-radius: 8px;
    box-shadow:    0 2px 8px rgba(0,0,0,0.3);

    transition:
        background     0.4s ease,
        transform      0.3s cubic-bezier(0.34, 1.56, 0.64, 1),
        border-radius  0.4s ease,
        box-shadow     0.4s ease;
}

.card:hover {
    background:    hsl(175, 65%, 35%);
    transform:     scale(1.05);
    border-radius: 24px;
    box-shadow:    0 16px 40px rgba(0,0,0,0.5);
}
```

---

## 05. What Can (and Can't) Be Transitioned

Only properties with numeric or color values can be transitioned. `display` cannot — use `opacity` + `visibility` instead.

```html:index.html
<div class="rows">
    <div class="row"><span class="row-label">color ✓</span>      <div class="swatch t-color"></div></div>
    <div class="row"><span class="row-label">opacity ✓</span>    <div class="swatch t-opacity"></div></div>
    <div class="row"><span class="row-label">transform ✓</span>  <div class="swatch t-transform"></div></div>
    <div class="row"><span class="row-label">box-shadow ✓</span> <div class="swatch t-shadow"></div></div>
    <div class="row"><span class="row-label">display ✗</span>    <div class="t-display"><div class="swatch"></div></div></div>
</div>
<p style="font-size:.8rem;color:#94a3b8;margin-top:1rem">Hover each row.</p>
```
```css:style.css
.rows { 
    display: flex; 
    flex-direction: column; 
    gap: .75rem; 

    & .row { 
        display: flex; 
        align-items: center; 
        gap: 1rem; 

        & .row-label { 
            width: 11rem; 
            flex-shrink: 0; 
        }
    }
}
.swatch {
    display: inline-block; 
    width: 3rem; height: 2rem; 
    border-radius: 6px;
    background: #6366f1; 
    cursor: pointer;
    transition: all .4s ease;
}

/* can transition */
.t-color:hover  { background: #10b981; }
.t-opacity      { opacity: 1; }
.t-opacity:hover { opacity: 0.1; }
.t-transform:hover { transform: scale(1.5) rotate(12deg); }
.t-shadow:hover  { box-shadow: 0 8px 24px rgba(99,102,241,.5); }
/* cannot transition display */
.t-display { position: relative; }
.t-display::after {
content: 'display can\'t transition';
position: absolute; left: 3.5rem; top: 50%; transform: translateY(-50%);
font-size: .75rem; color: #ef4444; white-space: nowrap;
}
```

```css
/* can't transition display: none → block */
/* use opacity + visibility instead */
.panel {
    opacity: 0;
    visibility: hidden;   /* hidden removes from tab order */
    transition: opacity 0.3s, visibility 0.3s;
}
.panel.visible {
    opacity: 1;
    visibility: visible;
}

/* expand height workaround — transition max-height instead */
.drawer { max-height: 0; overflow: hidden; transition: max-height 0.4s ease; }
.drawer.open { max-height: 500px; }
```

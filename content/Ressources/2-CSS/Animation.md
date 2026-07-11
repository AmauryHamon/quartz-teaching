---
title: Animation
draft: false
tags:
  - cheatsheet
  - débutant
  - CSS
description: "@keyframes, duration, timing, delay, iteration, fill-mode, and play-state"
---

## 01. @keyframes

Define the animation's steps with `@keyframes`. Use `from`/`to` for a simple A→B animation, or percentage stops for multi-step sequences.

```css:style.css
@keyframes bounce {
    0%, 100% { 
        transform: translateX(0);    
        animation-timing-function: ease-in; 
    }
    50% { 
        transform: translateX(100%); 
        animation-timing-function: ease-out;
    }
}
.ball {
    width: 3rem; height: 3rem;
    background: #6366f1;
    border-radius: 50%;
    animation: bounce 1s infinite;
}
```
```html:index.html
<div class="ball"></div>
```

```css
/* from / to — simplest form */
@keyframes fade {
    from { opacity: 1; }
    to   { opacity: 0; }
}

/* percentage stops — multi-step */
@keyframes bounce {
    0%   { transform: translateY(0); }
    50%  { transform: translateY(-24px); }
    100% { transform: translateY(0); }
}

.el {
    animation-name:     bounce;
    animation-duration: 0.6s;
}
```

---

## 02. Duration & Timing Function

The same keyframes with different durations and timing functions produce very different feelings.

```css:style.css
@keyframes slide { 
    from { transform: translateX(0); } 
    to { transform: translateX(180px); } 
}
.rows { 
    display: flex; 
    flex-direction: column; 
    gap: .6rem; 
}
.row  { 
    display: flex; 
    align-items: center; 
    gap: .75rem; 
}
.row-label { 
    width: 12rem; 
    font-size: .7rem; 
    font-family: monospace; 
    color: #64748b; 
    flex-shrink: 0; 
}
.dot { 
    width: 2rem; 
    height: 2rem; 
    background: #6366f1; 
    border-radius: 50%;
    animation: slide infinite alternate; 
}
.d-short  { 
    animation-duration: .3s; 
    animation-timing-function: ease-out; 
}
.d-medium { 
    animation-duration: 1s;  
    animation-timing-function: ease-in-out; 
}
.d-long { 
    animation-duration: 2s;  
    animation-timing-function: ease; 
}
.d-linear { 
    animation-duration: 1s;  
    animation-timing-function: linear; 
}
.d-spring { 
    animation-duration: .8s; 
    animation-timing-function: cubic-bezier(0.34,1.56,0.64,1); 
}
```
```html:index.html
<div class="rows">
    <div class="row">
        <span class="row-label">0.3s ease-out</span>  
        <div class="dot d-short"></div>
    </div>
    <div class="row">
        <span class="row-label">1s ease-in-out</span>
        <div class="dot d-medium"></div>
    </div>
    <div class="row">
        <span class="row-label">2s ease</span>        
        <div class="dot d-long"></div>
    </div>
    <div class="row">
        <span class="row-label">1s linear</span>      
        <div class="dot d-linear"></div>
    </div>
    <div class="row">
        <span class="row-label">0.8s spring</span>    
        <div class="dot d-spring"></div>
    </div>
</div>
```

```css
/* animation shorthand */
/* name  duration  timing-fn  delay  iteration  direction  fill-mode */
animation: slide 0.4s ease-out 0s 1 normal forwards;

/* the four most important values */
animation: slide 0.4s ease-out forwards;

animation-timing-function: ease;
animation-timing-function: cubic-bezier(0.34, 1.56, 0.64, 1); /* spring */
animation-timing-function: steps(8, end);  /* choppy/sprite */
```

---

## 03. Delay & Iteration

Use `animation-delay` to stagger animations. `animation-iteration-count: infinite` loops forever.

```css:style.css
@keyframes pop {
    0%   { transform: scale(.5); opacity: 0; }
    60%  { transform: scale(1.15); }
    100% { transform: scale(1);   opacity: 1; }
}
.di-row { 
    display: flex; 
    gap: .75rem; 
    align-items: center; 
    margin-bottom: 1rem; 
    cursor: pointer; 
}
.dot {
    width: 2.25rem; 
    height: 2.25rem; 
    background: #6366f1; 
    border-radius: 50%;
    animation: pop .5s ease-out both;
    animation-play-state: paused;
}

.di-row.playing .dot { animation-play-state: running; }

.dot:nth-child(1) { animation-delay: 0ms; }
.dot:nth-child(2) { animation-delay: 100ms; }
.dot:nth-child(3) { animation-delay: 200ms; }
.dot:nth-child(4) { animation-delay: 300ms; }
.dot:nth-child(5) { animation-delay: 400ms; }

.iter-label { 
    font-size: .75rem; 
    color: #94a3b8; 
    font-family: monospace; 
    margin-bottom: .4rem; 
}

@keyframes spin-iter { to { transform: rotate(360deg); } }

.iter-box { 
    display: inline-block; 
    width: 2rem; 
    height: 2rem; 
    background: #a855f7; 
    border-radius: 4px; 
    animation: spin-iter 1s linear 3; 
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
```
```html:index.html
<div class="iter-label">stagger: start animation with progressive delay</div>
<div class="di-row" id="di-row">
    <div class="dot"></div>
    <div class="dot"></div>
    <div class="dot"></div>
    <div class="dot"></div>
    <div class="dot"></div>
</div>
<button class="btn" id="di-play">Replay stagger</button>
<hr>
<div class="iter-wrap">
    <div class="iter-label">iteration-count: 3 — spins exactly 3 times</div>
    <div class="iter-box" id="di-iter"></div>
    <button class="btn" id="di-iter-replay">Replay</button>
</div>
```
```js:script.js
function replayRow() {
    const row = document.getElementById('di-row');
    row.classList.remove('playing');
    row.querySelectorAll('.dot').forEach((dot) => {
        dot.style.animation = 'none';
        void dot.offsetWidth;
        dot.style.animation = '';
    });
    row.classList.add('playing');
}
function replayIter() {
    const el = document.getElementById('di-iter');
    el.style.animation = 'none';
    void el.offsetWidth;
    el.style.animation = '';
}
document.getElementById('di-play').onclick = replayRow;
document.getElementById('di-iter-replay').onclick = replayIter;
```

```css
animation-delay: 0.2s;
animation-delay: -0.5s;   /* negative starts mid-animation (skips ahead) */

/* stagger siblings */
.item:nth-child(1) { animation-delay: 0ms; }
.item:nth-child(2) { animation-delay: 100ms; }
.item:nth-child(3) { animation-delay: 200ms; }

animation-iteration-count: 1;        /* plays once */
animation-iteration-count: 3;        /* plays 3 times */
animation-iteration-count: infinite; /* loops forever */

/* always respect user preferences */
@media (prefers-reduced-motion: reduce) {
    * { animation-duration: 0.01ms !important; }
}
```

---

## 04. Direction & Fill-mode

`alternate` reverses on every other iteration — smooth loops without an abrupt reset. `forwards` keeps the final keyframe state when the animation ends.

```css:style.css
@keyframes slide-right {
    from { transform: translateX(0); }
    to   { transform: translateX(160px); }
}
.rows { 
    display: flex; 
    flex-direction: column; 
    gap: .75rem; 
}
.row { 
    display: flex; 
    align-items: center; 
    gap: .75rem; 
}

.row-label { 
    width: 11rem; 
    font-size: .7rem; 
    font-family: monospace; 
    color: #64748b; 
    flex-shrink: 0; 
}
.dot {
    width: 2rem; 
    height: 2rem; 
    background: #6366f1; 
    border-radius: 50%;
    animation: slide-right 1.2s ease-in-out 1 both paused;
}
.dir-normal    { animation-direction: normal; }
.dir-reverse   { animation-direction: reverse; }
.dir-alternate { animation-direction: alternate; animation-iteration-count: 4; }
.fill-none     { animation-fill-mode: none; animation-direction: normal; }
.fill-fwd      { animation-fill-mode: forwards; }
.fill-both     { animation-fill-mode: both; }
.playing .dot  { animation-play-state: running; }
.btn { 
    padding: .4rem .9rem; 
    background: #6366f1; 
    color: white; 
    border: none; 
    border-radius: 6px; 
    cursor: pointer; 
    font-size: .8rem; 
    margin-top: .75rem; 
}
```
```html:index.html
<div class="rows" id="df-rows">
<div class="row">
    <span class="row-label">normal</span>    
    <div class="dot dir-normal"></div>
</div>
<div class="row">
    <span class="row-label">reverse</span>   
    <div class="dot dir-reverse"></div>
</div>
<div class="row">
    <span class="row-label">alternate ×4</span>
    <div class="dot dir-alternate"></div>
</div>
<div class="row">
    <span class="row-label">fill: none</span>    
    <div class="dot fill-none"></div>
</div>
<div class="row">
    <span class="row-label">fill: forwards</span>
    <div class="dot fill-fwd"></div>
</div>
<div class="row">
    <span class="row-label">fill: both</span>    
    <div class="dot fill-both"></div>
</div>
</div>
<button class="btn" onclick="stopAnim()">Play all</button>
```
```js:script.js
const stopAnim = ()=>{
    const rows = document.getElementById('df-rows');
    rows.classList.remove('playing');
    rows.querySelectorAll('.dot').forEach((dot) => {
        dot.style.animation = 'none';
        void dot.offsetWidth;
        dot.style.animation = '';
    });
    void rows.offsetWidth;
    rows.classList.add('playing');
}

```



```css
animation-direction: normal;             /* always forward */
animation-direction: reverse;            /* always backward */
animation-direction: alternate;          /* forward, then backward, repeat */
animation-direction: alternate-reverse;

animation-fill-mode: none;       /* snaps back to original */
animation-fill-mode: forwards;   /* holds last keyframe state after end */
animation-fill-mode: backwards;  /* applies first keyframe before delay */
animation-fill-mode: both;
```

---

## 05. play-state & prefers-reduced-motion

Toggle `animation-play-state: paused` to pause any running animation without removing it.

```css:style.css
@keyframes spin-ps { to { transform: rotate(360deg); } }
@keyframes pulse-ps {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.3); }
}
.ps-demo { 
    display: flex; 
    gap: 2rem; 
    flex-wrap: wrap; 
    align-items: center; 
    margin-bottom: 1rem; 
}
.spinner {
    width: 3rem; 
    height: 3rem; 
    border: 4px solid #e2e8f0;
    border-top-color: #6366f1; 
    border-radius: 50%;
    animation: spin-ps 1s linear infinite;
}
.pulser {
    width: 3rem; 
    height: 3rem; 
    background: #6366f1; 
    border-radius: 50%;
    animation: pulse-ps 1s ease-in-out infinite;
}
.paused { 
    animation-play-state: paused !important; 
}
.btn { 
    padding: .4rem .9rem; 
    border: 1px solid #6366f1; 
    background: white; 
    color: #6366f1; 
    border-radius: 6px; 
    cursor: pointer; 
    font-size: .875rem; 
}
.btn.on { 
    background: #6366f1; 
    color: white; 
}
```
```html:index.html
<div class="ps-demo">
    <div class="spinner" id="ps-spin"></div>
    <div class="pulser" id="ps-pulse"></div>
</div>
<button class="btn on" id="ps-btn" onclick="pauseAnim()">Pause</button>
```
```js:script.js
const pauseAnim = ()=>{
    const spin = document.getElementById('ps-spin');
    const pulse = document.getElementById('ps-pulse');
    const btn = document.getElementById('ps-btn');
    const paused = spin.classList.toggle('paused');
    pulse.classList.toggle('paused');
    btn.textContent = paused ? 'Resume' : 'Pause';
    btn.classList.toggle('on', !paused);
}

```



```css
.el        { animation: spin 2s linear infinite; }
.el.paused { animation-play-state: paused; }

/* JS — just toggle a class */
el.classList.toggle("paused")

@media (prefers-reduced-motion: reduce) {
    /* option 1: remove animation entirely */
    * { animation: none !important; transition: none !important; }

    /* option 2: keep subtle motion, remove large movement */
    .spinner  { animation-duration: 10s; }
    .slide-in { transform: none; opacity: 1; }
}
```

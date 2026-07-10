---
title: Timing & Animation
draft: false
tags:
  - débutant
  - essentiels
  - JS
description: setTimeout, setInterval, requestAnimationFrame, easing, and when to use CSS vs JS
---

## 01. setTimeout

Runs a callback **once** after a delay in milliseconds. Returns an ID to cancel with `clearTimeout()`.

```html:index.html
<div class="status" id="st-status">Press Start to begin a 3-second countdown.</div>
<div class="countdown" id="st-count"></div>
<div class="controls">
    <button class="btn" id="st-start">Start</button>
    <button class="btn btn-cancel" id="st-cancel">Cancel</button>
</div>
```
```css:style.css
.status {
    font-family: monospace;
    font-size: .9rem;
    color: #64748b;
    margin-bottom: 1rem;
    min-height: 1.4rem;
}

.controls {
    display: flex;
    gap: .5rem;
}

.btn {
    padding: .5rem 1rem;
    background: #6366f1;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: .875rem;
}

.btn-cancel {
    background: white;
    color: #6366f1;
    border: 1px solid #6366f1;
}

.countdown {
    font-size: 2rem;
    font-weight: 700;
    color: #6366f1;
    font-family: monospace;
    margin: .5rem 0;
}
```
```js:script.js
setTimeout(() => {
    const status = document.getElementById("st-status");
    const count = document.getElementById("st-count");
    const startBtn = document.getElementById("st-start");
    const cancelBtn = document.getElementById("st-cancel");
    if (!status || !count || !startBtn || !cancelBtn) return;

    let timers = [];

    startBtn.onclick = () => {
        timers.forEach(clearTimeout);
        timers = [];
        let n = 3;
        count.textContent = n;
        status.textContent = "Counting down...";

        const tick = () => {
            n--;
            if (n > 0) {
                count.textContent = n;
                timers.push(setTimeout(tick, 1000));
            } else {
                count.textContent = "";
                status.textContent = "Fired! (setTimeout ran after 3s)";
            }
        };

        timers.push(setTimeout(tick, 1000));
    };

    cancelBtn.onclick = () => {
        timers.forEach(clearTimeout);
        timers = [];
        count.textContent = "";
        status.textContent = "Cancelled with clearTimeout().";
    };
}, 0);
```

```js
const id = setTimeout(() => {
    console.log("fired!")
}, 2000)

clearTimeout(id)  // cancel before it fires

// nested setTimeouts for a countdown
function countdown(n) {
    console.log(n)
    if (n > 0) setTimeout(() => countdown(n - 1), 1000)
}
```

---

## 02. setInterval

Runs a callback **repeatedly** at a fixed interval. Always store the ID — forgetting to `clearInterval` is a common memory leak.

```html:index.html
<div class="clock" id="si-clock">--:--:--</div>
<div class="controls">
    <button class="btn" id="si-start">Start</button>
    <button class="btn btn-stop" id="si-stop">Stop</button>
</div>
<p class="hint">setInterval runs every 1000ms. clearInterval cancels it.</p>
```
```css:style.css
.clock {
    font-size: 2.5rem;
    font-weight: 700;
    font-family: monospace;
    color: #6366f1;
    margin-bottom: 1rem;
    letter-spacing: .05em;
}

.controls {
    display: flex;
    gap: .5rem;
}

.btn {
    padding: .5rem 1rem;
    background: #6366f1;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: .875rem;
}

.btn-stop {
    background: white;
    color: #6366f1;
    border: 1px solid #6366f1;
}

.hint {
    font-size: .8rem;
    color: #94a3b8;
    margin-top: .75rem;
}
```
```js:script.js
setTimeout(() => {
    const clock = document.getElementById("si-clock");
    const startBtn = document.getElementById("si-start");
    const stopBtn = document.getElementById("si-stop");
    if (!clock || !startBtn || !stopBtn) return;

    let id = null;
    const tick = () => {
        clock.textContent = new Date().toLocaleTimeString();
    };

    startBtn.onclick = () => {
        if (id) return;
        tick();
        id = setInterval(tick, 1000);
    };

    stopBtn.onclick = () => {
        clearInterval(id);
        id = null;
    };
}, 0);
```

```js
let intervalId = null

intervalId = setInterval(() => {
    console.log("tick")
}, 100)

clearInterval(intervalId)
intervalId = null  // good habit: clear the reference too

// setInterval is NOT perfectly precise — use requestAnimationFrame for animations
```

---

## 03. requestAnimationFrame

Calls your function **before the next screen repaint** — ~60 times per second, synced to the display. The callback receives a high-precision timestamp.

```html:index.html
<div class="canvas-wrap"><canvas id="raf-canvas" width="360" height="120"></canvas></div>
<div class="controls">
    <button class="btn" id="raf-start">Start</button>
    <button class="btn btn-stop" id="raf-stop">Stop</button>
</div>
```
```css:style.css
.canvas-wrap {
    background: #0f172a;
    border-radius: 8px;
    overflow: hidden;
}

canvas {
    display: block;
}

.controls {
    display: flex;
    gap: .5rem;
    margin-top: .75rem;
}

.btn {
    padding: .5rem 1rem;
    background: #6366f1;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: .875rem;
}

.btn-stop {
    background: white;
    color: #6366f1;
    border: 1px solid #6366f1;
}
```
```js:script.js
setTimeout(() => {
    const canvas = document.getElementById("raf-canvas");
    const startBtn = document.getElementById("raf-start");
    const stopBtn = document.getElementById("raf-stop");
    if (!canvas || !startBtn || !stopBtn) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let rafId = null;
    let t = 0;

    const loop = (ts) => {
        t = ts / 1000;
        ctx.clearRect(0, 0, 360, 120);

        for (let i = 0; i < 8; i++) {
            const x = 30 + i * 45;
            const y = 60 + Math.sin(t * 2 + i * .7) * 30;
            ctx.beginPath();
            ctx.arc(x, y, 10, 0, Math.PI * 2);
            ctx.fillStyle = `hsl(${(t * 40 + i * 40) % 360}, 70%, 65%)`;
            ctx.fill();
        }

        rafId = requestAnimationFrame(loop);
    };

    startBtn.onclick = () => {
        if (!rafId) rafId = requestAnimationFrame(loop);
    };

    stopBtn.onclick = () => {
        cancelAnimationFrame(rafId);
        rafId = null;
    };
}, 0);
```

```js
let rafId = null

function loop(timestamp) {
    // put animation logic here

    rafId = requestAnimationFrame(loop)  // schedule next frame
}

rafId = requestAnimationFrame(loop)  // kick off the loop
cancelAnimationFrame(rafId)          // stop
```

---

## 04. Progress — the t Value

The core pattern for JS animation: normalise elapsed time into **t from 0 to 1**, then multiply by whatever you want to animate.

```html:index.html
<div class="t-display" id="tv-display">t = 0.00</div>
<div class="track"><div class="ball" id="tv-ball"></div></div>
<div class="controls">
    <button class="btn" id="tv-play">Play</button>
    <button class="btn btn-stop" id="tv-reset">Reset</button>
</div>
```
```css:style.css
.track {
    height: 3rem;
    background: #f1f5f9;
    border-radius: 99px;
    position: relative;
    overflow: hidden;
    margin-bottom: 1rem;
}

.ball {
    position: absolute;
    width: 2.5rem;
    height: 2.5rem;
    background: #6366f1;
    border-radius: 50%;
    top: .25rem;
    left: 0;
}

.t-display {
    font-family: monospace;
    font-size: .9rem;
    color: #64748b;
    margin-bottom: .75rem;
}

.controls {
    display: flex;
    gap: .5rem;
}

.btn {
    padding: .5rem 1rem;
    background: #6366f1;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: .875rem;
}

.btn-stop {
    background: white;
    color: #6366f1;
    border: 1px solid #6366f1;
}
```
```js:script.js
setTimeout(() => {
    const ball = document.getElementById("tv-ball");
    const display = document.getElementById("tv-display");
    const playBtn = document.getElementById("tv-play");
    const resetBtn = document.getElementById("tv-reset");
    if (!ball || !display || !playBtn || !resetBtn) return;

    let rafId = null;
    let start = null;
    const duration = 2000;
    const maxLeft = 360 - 40 - 8;

    const run = (ts) => {
        if (!start) start = ts;
        const t = Math.min((ts - start) / duration, 1);
        ball.style.left = t * maxLeft + 4 + "px";
        display.textContent = `t = ${t.toFixed(3)}`;

        if (t < 1) {
            rafId = requestAnimationFrame(run);
        } else {
            start = null;
            rafId = null;
        }
    };

    playBtn.onclick = () => {
        cancelAnimationFrame(rafId);
        start = null;
        rafId = requestAnimationFrame(run);
    };

    resetBtn.onclick = () => {
        cancelAnimationFrame(rafId);
        rafId = null;
        start = null;
        ball.style.left = "4px";
        display.textContent = "t = 0.00";
    };
}, 0);
```

```js
function animate(duration) {
    const start = performance.now()

    function step(now) {
        const t = Math.min((now - start) / duration, 1)

        el.style.transform = `translateX(${t * 400}px)`
        el.style.opacity   = t

        if (t < 1) requestAnimationFrame(step)
    }

    requestAnimationFrame(step)
}
```

---

## 05. Easing

An easing function takes t (0→1) and returns a **modified t** — curving the motion so it feels natural.

```html:index.html
<div class="rows" id="ease-rows">
    <div class="row"><span class="row-label">linear</span>    <div class="track"><div class="ball" data-ease="linear"></div></div></div>
    <div class="row"><span class="row-label">easeIn</span>    <div class="track"><div class="ball" data-ease="easeIn"></div></div></div>
    <div class="row"><span class="row-label">easeOut</span>   <div class="track"><div class="ball" data-ease="easeOut"></div></div></div>
    <div class="row"><span class="row-label">easeInOut</span> <div class="track"><div class="ball" data-ease="easeInOut"></div></div></div>
    <div class="row"><span class="row-label">elastic</span>   <div class="track"><div class="ball" data-ease="elastic"></div></div></div>
</div>
<div class="controls"><button class="btn" id="ease-play">Play all</button></div>
```
```css:style.css
.rows {
    display: flex;
    flex-direction: column;
    gap: .6rem;
}

.row {
    display: flex;
    align-items: center;
    gap: .75rem;
}

.row-label {
    width: 8rem;
    font-size: .75rem;
    font-family: monospace;
    color: #64748b;
    flex-shrink: 0;
}

.track {
    flex: 1;
    height: 2.25rem;
    background: #f1f5f9;
    border-radius: 99px;
    position: relative;
    overflow: hidden;
}

.ball {
    position: absolute;
    width: 2rem;
    height: 2rem;
    background: #6366f1;
    border-radius: 50%;
    top: .125rem;
    left: 4px;
    transition: none;
}

.controls {
    display: flex;
    gap: .5rem;
    margin-top: 1rem;
}

.btn {
    padding: .45rem 1rem;
    background: #6366f1;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: .875rem;
}
```
```js:script.js
setTimeout(() => {
    const btn = document.getElementById("ease-play");
    if (!btn) return;

    const easings = {
        linear: (t) => t,
        easeIn: (t) => t * t,
        easeOut: (t) => 1 - (1 - t) ** 2,
        easeInOut: (t) => t < .5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2,
        elastic: (t) => t <= 0 ? 0 : t >= 1 ? 1 : Math.pow(2, -10 * t) * Math.sin((t * 10 - .75) * 2.094) + 1,
    };

    btn.onclick = () => {
        const balls = document.querySelectorAll(".ball");
        if (!balls.length) return;

        const trackWidth = balls[0].closest(".track").offsetWidth - 32;
        let start = null;
        const dur = 1400;

        const step = (ts) => {
            if (!start) start = ts;
            const raw = Math.min((ts - start) / dur, 1);

            balls.forEach((b) => {
                const t = easings[b.dataset.ease](raw);
                b.style.left = 4 + t * trackWidth + "px";
            });

            if (raw < 1) requestAnimationFrame(step);
        };

        requestAnimationFrame(step);
    };
}, 0);
```

```js
const easings = {
    linear:    t => t,
    easeIn:    t => t * t,
    easeOut:   t => 1 - (1 - t) ** 2,
    easeInOut: t => t < 0.5 ? 2*t*t : 1 - (-2*t+2)**2/2,
    elastic:   t => t <= 0 ? 0 : t >= 1 ? 1 :
                    Math.pow(2,-10*t) * Math.sin((t*10-.75) * 2.094) + 1,
}

function animate(duration, easingFn) {
    const start = performance.now()
    function step(now) {
        const t      = Math.min((now - start) / duration, 1)
        const easedT = easingFn(t)  // ← bend the t value
        el.style.transform = `translateX(${easedT * 400}px)`
        if (t < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
}
```

---

## 06. CSS vs JS — When to Use Which

CSS handles most UI motion. Reach for JS when you need physics, interactivity mid-animation, or values CSS can't express.

```html:index.html
<div class="compare">
    <div class="col">
        <div class="col-label">CSS transition</div>
        <div class="css-box" id="css-box"></div>
        <button class="btn css-btn" id="css-toggle">Toggle class</button>
    </div>
    <div class="col">
        <div class="col-label">JS spring (rAF)</div>
        <div class="js-box" id="js-box"></div>
        <button class="btn js-btn" id="js-toggle">Animate</button>
    </div>
</div>
```
```css:style.css
.compare {
    display: flex;
    gap: 2rem;
    flex-wrap: wrap;
}

.col {
    flex: 1;
    min-width: 140px;
}

.col-label {
    font-size: .75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: .05em;
    color: #94a3b8;
    margin-bottom: .75rem;
}

.css-box {
    width: 3rem;
    height: 3rem;
    background: #6366f1;
    border-radius: 8px;
    cursor: pointer;
    transition: transform .5s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.css-box.moved {
    transform: translateX(100px);
}

.js-box {
    width: 3rem;
    height: 3rem;
    background: #10b981;
    border-radius: 8px;
    cursor: pointer;
}

.btn {
    margin-top: .75rem;
    padding: .4rem .9rem;
    border: 1px solid currentColor;
    background: white;
    border-radius: 6px;
    cursor: pointer;
    font-size: .8rem;
}

.css-btn {
    color: #6366f1;
}

.js-btn {
    color: #10b981;
}
```
```js:script.js
setTimeout(() => {
    const cssBox = document.getElementById("css-box");
    const jsBox = document.getElementById("js-box");
    const cssToggle = document.getElementById("css-toggle");
    const jsToggle = document.getElementById("js-toggle");
    if (!cssBox || !jsBox || !cssToggle || !jsToggle) return;

    cssToggle.onclick = () => cssBox.classList.toggle("moved");

    const s = { pos: 0, vel: 0, target: 0 };
    let rafId = null;

    const spring = () => {
        s.vel = (s.vel + (s.target - s.pos) * 0.08) * 0.75;
        s.pos += s.vel;
        jsBox.style.transform = `translateX(${s.pos}px)`;
        if (Math.abs(s.vel) > 0.01 || Math.abs(s.target - s.pos) > 0.01) {
            rafId = requestAnimationFrame(spring);
        }
    };

    jsToggle.onclick = () => {
        s.target = s.target === 0 ? 100 : 0;
        cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(spring);
    };
}, 0);
```

```js
// CSS — declare in stylesheet, trigger by toggling a class
// .box       { transform: translateX(0);    transition: transform 0.5s ease-in-out; }
// .box.moved { transform: translateX(300px); }
box.classList.toggle("moved")  // that's all the JS you need

// JS spring — position driven by physics each frame
const s = { pos: 0, vel: 0, target: 300, k: 0.06, damping: 0.78 }

function springLoop() {
    s.vel = (s.vel + (s.target - s.pos) * s.k) * s.damping
    s.pos += s.vel
    box.style.transform = `translateX(${s.pos}px)`
    requestAnimationFrame(springLoop)
}
```

**Use CSS when:** simple A→B on hover/focus, entrance & exit animations, looping decorative animations.  
**Use JS when:** physics, responding to input mid-flight, scroll/cursor-driven values, complex sequencing.

---

## 07. Optimisation

Animate only **composite properties** (transform & opacity), hint the browser with `will-change`, and debounce expensive handlers.

```html:index.html
<div class="counters">
    <div class="counter"><div class="count-label">raw</div><div class="count-num raw-num" id="raw-count">0</div></div>
    <div class="counter"><div class="count-label">debounced</div><div class="count-num deb-num" id="deb-count">0</div></div>
    <div class="counter"><div class="count-label">throttled</div><div class="count-num thr-num" id="thr-count">0</div></div>
</div>
<div class="zone" id="move-zone">Move mouse here</div>
<p class="hint">Raw fires on every mousemove. Debounce fires 300ms after you stop. Throttle fires at most every 100ms.</p>
```
```css:style.css
.counters {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 1rem;
    margin-bottom: 1rem;
}

.counter {
    background: #f1f5f9;
    border-radius: 8px;
    padding: .75rem;
    text-align: center;
}

.count-label {
    font-size: .7rem;
    text-transform: uppercase;
    letter-spacing: .05em;
    color: #94a3b8;
    margin-bottom: .25rem;
}

.count-num {
    font-size: 2rem;
    font-weight: 700;
    font-family: monospace;
}

.raw-num {
    color: #ef4444;
}

.deb-num {
    color: #6366f1;
}

.thr-num {
    color: #10b981;
}

.zone {
    height: 80px;
    background: #f8fafc;
    border: 2px dashed #e2e8f0;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: .875rem;
    color: #94a3b8;
    cursor: crosshair;
}

.hint {
    font-size: .75rem;
    color: #94a3b8;
    margin-top: .5rem;
}
```
```js:script.js
setTimeout(() => {
    const zone = document.getElementById("move-zone");
    if (!zone) return;

    let raw = 0;
    let deb = 0;
    let thr = 0;

    const rawEl = document.getElementById("raw-count");
    const debEl = document.getElementById("deb-count");
    const thrEl = document.getElementById("thr-count");
    if (!rawEl || !debEl || !thrEl) return;

    let debTimer = null;
    let lastThr = 0;

    zone.addEventListener("mousemove", () => {
        rawEl.textContent = ++raw;

        clearTimeout(debTimer);
        debTimer = setTimeout(() => {
            debEl.textContent = ++deb;
        }, 300);

        const now = Date.now();
        if (now - lastThr >= 100) {
            lastThr = now;
            thrEl.textContent = ++thr;
        }
    });
}, 0);
```

```js
el.style.transform = `translateX(${x}px) scale(${s})`  // ✓ GPU composite
el.style.left      = x + "px"                           // ✗ triggers layout

el.style.willChange = "transform"  // hint: promote to own GPU layer
el.style.willChange = "auto"       // release after animation

function debounce(fn, delay) {
    let timer = null
    return (...args) => { clearTimeout(timer); timer = setTimeout(() => fn(...args), delay) }
}

function throttle(fn, interval) {
    let last = 0
    return (...args) => {
        const now = Date.now()
        if (now - last >= interval) { last = now; fn(...args) }
    }
}

window.addEventListener("resize", debounce(onResize, 300))
window.addEventListener("scroll", throttle(onScroll, 100))
```

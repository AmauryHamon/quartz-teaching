---
title: Event Listeners
draft: false
tags:
  - débutant
  - essentiels
  - JS
description: Click, keyboard, mouse, drag & drop, resize, camera, mic, touch, clipboard
---

## 01. Click

The most common interaction. Fires once when the user releases the mouse button.

```html:index.html
<button class="btn" id="click-btn">Click me</button>
<div class="output" id="click-out">No clicks yet</div>
```
```css:style.css
.btn {
    padding: .75rem 1.5rem;
    background: #6366f1;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    cursor: pointer;
}

.output {
    margin-top: 1rem;
    font-family: monospace;
    font-size: .875rem;
    color: #64748b;
}
```
```js:script.js
setTimeout(() => {
    let count = 0;
    const btn = document.getElementById("click-btn");
    const out = document.getElementById("click-out");
    if (!btn || !out) return;

    btn.addEventListener("click", () => {
        count++;
        out.textContent = `Clicked ${count} time${count > 1 ? "s" : ""}`;
    });
}, 0);
```

```js
const btn = document.querySelector("#click-btn")

btn.addEventListener("click", () => {
    // runs every time the user clicks
})
```

---

## 02. Double Click

`dblclick` fires only on two rapid clicks. Useful for toggles or zooming.

```html:index.html
<div class="dbl-target" id="dbl-box">Double-click me</div>
<div class="out" id="dbl-out">Waiting for dblclick...</div>
```
```css:style.css
.dbl-target {
    width: 160px;
    height: 80px;
    background: #6366f1;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: 600;
    cursor: pointer;
    user-select: none;
    transition: transform .15s;
}

.dbl-target.zoomed {
    transform: scale(1.3);
    background: #4f46e5;
}

.out {
    margin-top: .75rem;
    font-family: monospace;
    font-size: .875rem;
    color: #64748b;
}
```
```js:script.js
setTimeout(() => {
    const box = document.getElementById("dbl-box");
    const out = document.getElementById("dbl-out");
    if (!box || !out) return;

    box.addEventListener("dblclick", () => {
        box.classList.toggle("zoomed");
        out.textContent = `dblclick fired - zoomed: ${box.classList.contains("zoomed")}`;
    });
}, 0);
```

```js
btn.addEventListener("dblclick", () => {
    // runs only on two rapid clicks
})
```

---

## 03. Mouse Move

Fires continuously as the cursor moves. `e.offsetX`/`e.offsetY` give position relative to the element.

```html:index.html
<div class="zone" id="mouse-zone">
    Move your mouse here
    <div class="dot" id="dot"></div>
</div>
<div class="output" id="mouse-out">x: - , y: -</div>
```
```css:style.css
.zone {
    width: 100%;
    max-width: 360px;
    height: 160px;
    background: #f1f5f9;
    border: 2px dashed #cbd5e1;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: .875rem;
    color: #94a3b8;
    cursor: crosshair;
    position: relative;
}

.dot {
    position: absolute;
    width: 10px;
    height: 10px;
    background: #6366f1;
    border-radius: 50%;
    transform: translate(-50%, -50%);
    pointer-events: none;
    display: none;
}

.output {
    margin-top: .75rem;
    font-family: monospace;
    font-size: .875rem;
    color: #64748b;
}
```
```js:script.js
setTimeout(() => {
    const zone = document.getElementById("mouse-zone");
    const dot = document.getElementById("dot");
    const out = document.getElementById("mouse-out");
    if (!zone || !dot || !out) return;

    zone.addEventListener("mousemove", (e) => {
        const rect = zone.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        dot.style.display = "block";
        dot.style.left = x + "px";
        dot.style.top = y + "px";
        out.textContent = `x: ${Math.round(x)} , y: ${Math.round(y)}`;
    });

    zone.addEventListener("mouseleave", () => {
        dot.style.display = "none";
    });
}, 0);
```

```js
area.addEventListener("mousemove", (e) => {
    const x = e.offsetX
    const y = e.offsetY

    const hue = Math.round((x / area.offsetWidth) * 360)
    area.style.background = `hsl(${hue}, 65%, 50%)`
})
```

---

## 04. Keyboard

`keydown` fires on press, `keyup` on release. `e.key` gives you the character name.

```html:index.html
<input class="input" id="key-input" placeholder="Type something..." />
<div class="output" id="key-out">Last key: -</div>
```
```css:style.css
.input {
    padding: .6rem 1rem;
    border: 2px solid #e2e8f0;
    border-radius: 8px;
    font-size: 1rem;
    width: 100%;
    max-width: 320px;
    outline: none;
    transition: border-color .15s;
}

.input:focus {
    border-color: #6366f1;
}

.output {
    margin-top: 1rem;
    font-family: monospace;
    font-size: .875rem;
    color: #64748b;
}
```
```js:script.js
setTimeout(() => {
    const input = document.getElementById("key-input");
    const out = document.getElementById("key-out");
    if (!input || !out) return;

    input.addEventListener("keydown", (e) => {
        out.textContent = `Last key: "${e.key}"  (code: ${e.code})`;
    });
}, 0);
```

```js
document.addEventListener("keydown", (e) => {
    console.log(e.key)  // "a", "Enter", "ArrowUp", " " (space)…
    display.classList.add("active")
})

document.addEventListener("keyup", () => {
    display.classList.remove("active")
})
```

---

## 05. Drag & Drop

Add `draggable="true"` to any element. You must call `e.preventDefault()` in `dragover` or `drop` will never fire.

```html:index.html
<div class="dnd-wrap">
    <div class="dnd-zone" id="dnd-a">
        <div class="dnd-item" draggable="true" id="dnd-item">Drag me -&gt;</div>
    </div>
    <div class="dnd-zone" id="dnd-b"></div>
</div>
<div class="out" id="dnd-out">Drag the item between the two zones</div>
```
```css:style.css
.dnd-wrap {
    display: flex;
    gap: 1rem;
    align-items: flex-start;
}

.dnd-zone {
    flex: 1;
    min-height: 80px;
    background: #f1f5f9;
    border: 2px dashed #cbd5e1;
    border-radius: 8px;
    padding: .5rem;
    transition: border-color .15s, background .15s;
}

.dnd-zone.over {
    border-color: #6366f1;
    background: #ede9fe;
}

.dnd-item {
    padding: .5rem 1rem;
    background: #6366f1;
    color: white;
    border-radius: 6px;
    cursor: grab;
    font-size: .875rem;
    font-weight: 600;
    display: inline-block;
}

.dnd-item:active {
    cursor: grabbing;
}

.out {
    margin-top: .75rem;
    font-family: monospace;
    font-size: .8rem;
    color: #64748b;
}
```
```js:script.js
setTimeout(() => {
    const item = document.getElementById("dnd-item");
    const zoneA = document.getElementById("dnd-a");
    const zoneB = document.getElementById("dnd-b");
    const out = document.getElementById("dnd-out");
    if (!item || !zoneA || !zoneB || !out) return;

    item.addEventListener("dragstart", (e) => {
        e.dataTransfer.setData("text/plain", "dnd-item");
    });

    [zoneA, zoneB].forEach((zone) => {
        zone.addEventListener("dragover", (e) => {
            e.preventDefault();
            zone.classList.add("over");
        });
        zone.addEventListener("dragleave", () => zone.classList.remove("over"));
        zone.addEventListener("drop", (e) => {
            e.preventDefault();
            zone.classList.remove("over");
            zone.appendChild(item);
            out.textContent = `Dropped in ${zone.id === "dnd-a" ? "Zone A" : "Zone B"}`;
        });
    });
}, 0);
```

```js
item.addEventListener("dragstart", (e) => {
    e.dataTransfer.setData("text/plain", item.id)
})

target.addEventListener("dragover", (e) => {
    e.preventDefault()  // required — without this, drop never fires
})

target.addEventListener("drop", (e) => {
    e.preventDefault()
    const id = e.dataTransfer.getData("text/plain")
    target.appendChild(document.getElementById(id))
})
```

---

## 06. Window Resize

Fires when the browser window changes size. Useful for responsive canvas or layout recalculations.

```html:index.html
<div class="wr-display" id="wr-size">- × -</div>
<div class="wr-label">window.innerWidth × window.innerHeight (resize the panel)</div>
<div class="wr-bar-wrap"><div class="wr-bar" id="wr-bar" style="width:50%"></div></div>
```
```css:style.css
.wr-display {
    font-family: monospace;
    font-size: 2rem;
    font-weight: 700;
    color: #6366f1;
}

.wr-label {
    font-size: .8rem;
    color: #94a3b8;
    margin-top: .25rem;
}

.wr-bar-wrap {
    margin-top: .75rem;
    height: 8px;
    background: #e2e8f0;
    border-radius: 4px;
}

.wr-bar {
    height: 100%;
    background: #6366f1;
    border-radius: 4px;
    transition: width .3s;
}
```
```js:script.js
setTimeout(() => {
    const sizeEl = document.getElementById("wr-size");
    const barEl = document.getElementById("wr-bar");
    if (!sizeEl || !barEl) return;

    const update = () => {
        const w = window.innerWidth;
        const h = window.innerHeight;
        sizeEl.textContent = `${w} × ${h}`;
        barEl.style.width = Math.min(100, (w / 1440) * 100) + "%";
    };

    window.addEventListener("resize", update);
    update();
}, 0);
```

```js
window.addEventListener("resize", () => {
    console.log(window.innerWidth, window.innerHeight)
})
```

---

## 07. Camera

`navigator.mediaDevices.getUserMedia()` requests webcam access. Requires **HTTPS** or `localhost`.

```html:index.html
<video id="cam-video" autoplay playsinline muted></video>
<div class="cam-status" id="cam-status">Camera not started</div>
<div class="btns">
    <button class="btn btn-start" id="cam-start">Request camera</button>
    <button class="btn btn-stop" id="cam-stop">Stop</button>
</div>
```
```css:style.css
video {
    width: 100%;
    max-width: 320px;
    border-radius: 8px;
    background: #0f172a;
    display: block;
}

.cam-status {
    font-size: .8rem;
    color: #64748b;
    margin: .5rem 0;
}

.btns {
    display: flex;
    gap: .5rem;
}

.btn {
    padding: .4rem .9rem;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: .8rem;
}

.btn-start {
    background: #6366f1;
    color: white;
}

.btn-stop {
    background: white;
    color: #6366f1;
    border: 1px solid #6366f1;
}
```
```js:script.js
setTimeout(() => {
    const video = document.getElementById("cam-video");
    const status = document.getElementById("cam-status");
    const startBtn = document.getElementById("cam-start");
    const stopBtn = document.getElementById("cam-stop");
    if (!video || !status || !startBtn || !stopBtn) return;

    let stream = null;

    startBtn.onclick = async () => {
        try {
            stream = await navigator.mediaDevices.getUserMedia({ video: true });
            video.srcObject = stream;
            status.textContent = "Camera active";
        } catch (e) {
            status.textContent = "Error: " + e.message;
        }
    };

    stopBtn.onclick = () => {
        if (stream) {
            stream.getTracks().forEach((t) => t.stop());
            video.srcObject = null;
        }
        status.textContent = "Camera stopped";
    };
}, 0);
```

```js
const stream = await navigator.mediaDevices.getUserMedia({ video: true })
videoEl.srcObject = stream

// turn the camera off
stream.getTracks().forEach(track => track.stop())
```

---

## 08. Microphone

`AudioContext` lets you analyse sound in real time. `requestAnimationFrame` redraws the meter ~60fps.

```html:index.html
<div class="mic-status" id="mic-status">Microphone not started</div>
<div class="mic-meter-wrap"><div class="mic-meter" id="mic-meter"></div></div>
<div class="btns">
    <button class="btn btn-start" id="mic-start">Request mic</button>
    <button class="btn btn-stop" id="mic-stop">Stop</button>
</div>
```
```css:style.css
.mic-meter-wrap {
    background: #f1f5f9;
    border-radius: 99px;
    height: 1.5rem;
    margin: .75rem 0;
    overflow: hidden;
}

.mic-meter {
    height: 100%;
    background: #6366f1;
    border-radius: 99px;
    width: 0;
    transition: width .08s;
}

.mic-status {
    font-size: .8rem;
    color: #64748b;
}

.btns {
    display: flex;
    gap: .5rem;
}

.btn {
    padding: .4rem .9rem;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: .8rem;
}

.btn-start {
    background: #6366f1;
    color: white;
}

.btn-stop {
    background: white;
    color: #6366f1;
    border: 1px solid #6366f1;
}
```
```js:script.js
setTimeout(() => {
    const meter = document.getElementById("mic-meter");
    const status = document.getElementById("mic-status");
    const startBtn = document.getElementById("mic-start");
    const stopBtn = document.getElementById("mic-stop");
    if (!meter || !status || !startBtn || !stopBtn) return;

    let audioCtx = null;
    let analyser = null;
    let rafId = null;
    let stream = null;

    startBtn.onclick = async () => {
        try {
            stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            audioCtx = new AudioContext();
            analyser = audioCtx.createAnalyser();
            audioCtx.createMediaStreamSource(stream).connect(analyser);
            const data = new Uint8Array(analyser.frequencyBinCount);
            status.textContent = "Listening...";

            const draw = () => {
                analyser.getByteFrequencyData(data);
                const avg = data.reduce((a, b) => a + b, 0) / data.length;
                meter.style.width = Math.min(100, (avg / 128) * 100) + "%";
                rafId = requestAnimationFrame(draw);
            };
            draw();
        } catch (e) {
            status.textContent = "Error: " + e.message;
        }
    };

    stopBtn.onclick = () => {
        cancelAnimationFrame(rafId);
        if (stream) stream.getTracks().forEach((t) => t.stop());
        if (audioCtx) audioCtx.close();
        meter.style.width = "0";
        status.textContent = "Stopped";
    };
}, 0);
```

```js
const stream   = await navigator.mediaDevices.getUserMedia({ audio: true })
const ctx      = new AudioContext()
const source   = ctx.createMediaStreamSource(stream)
const analyser = ctx.createAnalyser()
source.connect(analyser)

const data = new Uint8Array(analyser.frequencyBinCount)

function draw() {
    analyser.getByteFrequencyData(data)
    const avg = data.reduce((a, b) => a + b, 0) / data.length
    meter.style.width = (avg / 255 * 100) + "%"
    requestAnimationFrame(draw)
}
draw()
```

---

## 09. Touch

Works on phones, tablets, and drawing tablets. `e.touches` is a list — one entry per active finger.

```html:index.html
<div class="touch-area" id="touch-area">
    <div class="touch-dot" id="touch-dot"></div>
</div>
<div class="out" id="touch-out">Touch the area above</div>
<p class="hint">Works on mobile/tablet. On desktop, mouse events fire instead.</p>
```
```css:style.css
.touch-area {
    width: 100%;
    height: 160px;
    background: #f1f5f9;
    border-radius: 12px;
    position: relative;
    touch-action: none;
    overflow: hidden;
    border: 2px dashed #e2e8f0;
}

.touch-dot {
    position: absolute;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: #6366f1;
    opacity: 0;
    transform: translate(-50%, -50%);
    pointer-events: none;
    transition: opacity .15s;
}

.out {
    margin-top: .5rem;
    font-family: monospace;
    font-size: .8rem;
    color: #64748b;
}

.hint {
    font-size: .75rem;
    color: #94a3b8;
    margin-top: .25rem;
}
```
```js:script.js
setTimeout(() => {
    const area = document.getElementById("touch-area");
    const dot = document.getElementById("touch-dot");
    const out = document.getElementById("touch-out");
    if (!area || !dot || !out) return;

    const showDot = (x, y) => {
        const rect = area.getBoundingClientRect();
        dot.style.left = x - rect.left + "px";
        dot.style.top = y - rect.top + "px";
        dot.style.opacity = "0.8";
    };

    area.addEventListener("touchstart", (e) => {
        e.preventDefault();
        const t = e.touches[0];
        showDot(t.clientX, t.clientY);
        out.textContent = `touches: ${e.touches.length}  |  x: ${Math.round(t.clientX)}, y: ${Math.round(t.clientY)}`;
    }, { passive: false });

    area.addEventListener("touchmove", (e) => {
        e.preventDefault();
        const t = e.touches[0];
        showDot(t.clientX, t.clientY);
        out.textContent = `moving - touches: ${e.touches.length}  |  x: ${Math.round(t.clientX)}, y: ${Math.round(t.clientY)}`;
    }, { passive: false });

    area.addEventListener("touchend", () => {
        dot.style.opacity = "0";
        out.textContent = "touchend fired";
    });

    area.addEventListener("mousemove", (e) => {
        showDot(e.clientX, e.clientY);
        out.textContent = `mousemove (desktop) - x: ${e.offsetX}, y: ${e.offsetY}`;
    });

    area.addEventListener("mouseleave", () => {
        dot.style.opacity = "0";
    });
}, 0);
```

```js
area.addEventListener("touchstart", (e) => {
    console.log(e.touches.length)  // number of fingers
})

area.addEventListener("touchmove", (e) => {
    e.preventDefault()
    const t = e.touches[0]
    console.log(t.clientX, t.clientY)
}, { passive: false })

area.addEventListener("touchend", () => {
    // all fingers lifted
})
```

---

## 10. Clipboard

Copy text with `navigator.clipboard.writeText()`. Listen for `paste` to read what the user pastes. Requires **HTTPS** or `localhost`.

```html:index.html
<div class="cb-demo">
    <div class="section">
        <div class="sec-label">navigator.clipboard.writeText()</div>
        <div class="row">
            <span class="code-chip" id="cb-text">hsl(247, 70%, 55%)</span>
            <button class="btn" id="cb-copy">Copy</button>
        </div>
        <div class="out" id="cb-copy-out">-</div>
    </div>
    <div class="section">
        <div class="sec-label">paste event - paste into the field below</div>
        <input class="paste-target" id="cb-paste-target" placeholder="Paste here (Cmd/Ctrl+V)..." />
        <div class="out" id="cb-paste-out">-</div>
    </div>
</div>
```
```css:style.css
.cb-demo {
    display: flex;
    flex-direction: column;
    gap: .75rem;
}

.section {
    background: #f8fafc;
    border-radius: 8px;
    padding: .6rem .9rem;
}

.sec-label {
    font-size: .75rem;
    font-family: monospace;
    font-weight: 600;
    color: #64748b;
    margin-bottom: .4rem;
}

.row {
    display: flex;
    gap: .5rem;
    align-items: center;
}

.code-chip {
    font-family: monospace;
    font-size: .875rem;
    background: #e0e7ff;
    padding: .3rem .6rem;
    border-radius: 4px;
    color: #3730a3;
}

.btn {
    padding: .35rem .75rem;
    background: #6366f1;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: .8rem;
}

.out {
    font-family: monospace;
    font-size: .8rem;
    margin-top: .4rem;
    color: #64748b;
}

.paste-target {
    padding: .4rem .75rem;
    border: 1px solid #e2e8f0;
    border-radius: 6px;
    font-family: monospace;
    font-size: .8rem;
    width: 100%;
}
```
```js:script.js
setTimeout(() => {
    const copyOut = document.getElementById("cb-copy-out");
    const pasteOut = document.getElementById("cb-paste-out");
    const text = document.getElementById("cb-text");
    const copyBtn = document.getElementById("cb-copy");
    const pasteTarget = document.getElementById("cb-paste-target");
    if (!copyOut || !pasteOut || !text || !copyBtn || !pasteTarget) return;

    const fallbackCopy = (value) => {
        const ta = document.createElement("textarea");
        ta.value = value;
        ta.setAttribute("readonly", "");
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        ta.style.pointerEvents = "none";
        document.body.appendChild(ta);
        ta.select();
        const ok = document.execCommand("copy");
        document.body.removeChild(ta);
        return ok;
    };

    copyBtn.onclick = async () => {
        const value = text.textContent;
        try {
            if (!navigator.clipboard?.writeText) {
                const ok = fallbackCopy(value);
                copyOut.textContent = ok
                    ? "Copied with fallback (execCommand)."
                    : "Copy failed - use Cmd/Ctrl+C manually.";
                return;
            }

            await navigator.clipboard.writeText(value);
            copyOut.textContent = "Copied! Now paste it somewhere.";
        } catch (e) {
            const blocked = /permissions policy|NotAllowedError|blocked/i.test(String(e?.message || e));
            if (blocked) {
                const ok = fallbackCopy(value);
                copyOut.textContent = ok
                    ? "Clipboard API blocked, copied with fallback (execCommand)."
                    : "Clipboard blocked by policy. Use Cmd/Ctrl+C manually.";
                return;
            }
            copyOut.textContent = "Error: " + e.message;
        }
    };

    pasteTarget.addEventListener("paste", (e) => {
        const pasted = e.clipboardData.getData("text/plain");
        pasteOut.textContent = `pasted: "${pasted}"`;
    });
}, 0);
```

```js
await navigator.clipboard.writeText("Hello!")

document.addEventListener("paste", (e) => {
    const text = e.clipboardData.getData("text/plain")
    console.log(text)
})
```

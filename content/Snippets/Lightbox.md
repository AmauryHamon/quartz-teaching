---
title: Lightbox
draft: false
tags:
  - initié
  - snippet
  - HTML
  - CSS
  - JS
  - Component
---

Click a thumbnail, see the full image in an overlay, step through the rest of the gallery without leaving it. Built on the same native `<dialog>` element as the modal note.

# Pseudocode

## Structure

- A grid of thumbnail `<button>`s (images are interactive here, so buttons rather than plain `<img>`s), each tied to an index into a shared list of images.
- A single `<dialog>` reused for every thumbnail — its content is swapped by JS rather than having one dialog per image.

## Style

- The dialog is sized close to the full viewport for the "full image" feel, with the image itself constrained to fit inside it.

## Features

- Clicking a thumbnail opens the dialog and shows that image.
- Prev/next buttons — and, since the dialog already owns keyboard focus, the ← → arrow keys too — step through the same array the thumbnails came from, wrapping around at the ends.

# Basic lightbox

```html:index.html
<div class="lightbox-grid" id="lb-grid">
    <button class="lightbox-thumb" data-i="0" style="background:#6366f1">🏔️</button>
    <button class="lightbox-thumb" data-i="1" style="background:#0ea5e9">🌊</button>
    <button class="lightbox-thumb" data-i="2" style="background:#f97316">🏜️</button>
    <button class="lightbox-thumb" data-i="3" style="background:#14b8a6">🧊</button>
</div>

<dialog class="lightbox" id="lb-dialog">
    <div class="lightbox-media" id="lb-media"></div>
    <button class="lightbox-close" id="lb-close" aria-label="Close">✕</button>
    <button class="lightbox-arrow lightbox-prev" id="lb-prev" aria-label="Previous">‹</button>
    <button class="lightbox-arrow lightbox-next" id="lb-next" aria-label="Next">›</button>
</dialog>
```

```css:style.css
.lightbox-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 0.5rem;
}

.lightbox-thumb {
    height: 70px;
    border: none;
    border-radius: 8px;
    font-size: 1.4rem;
    color: white;
    cursor: pointer;
}

.lightbox {
    position: relative;
    width: min(90vw, 480px);
    height: min(80vh, 320px);
    border: none;
    border-radius: 10px;
    padding: 0;
    background: #0f172a;
}

.lightbox::backdrop {
    background: rgba(0, 0, 0, 0.75);
}

.lightbox-media {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 4rem;
}

.lightbox-close {
    position: absolute;
    top: 0.6rem;
    right: 0.6rem;
    width: 2rem;
    height: 2rem;
    border: none;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.15);
    color: white;
    cursor: pointer;
}

.lightbox-arrow {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 2.2rem;
    height: 2.2rem;
    border: none;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.15);
    color: white;
    font-size: 1.2rem;
    cursor: pointer;
}

.lightbox-prev {
    left: 0.6rem;
}

.lightbox-next {
    right: 0.6rem;
}
```

```js:script.js
const grid = document.getElementById("lb-grid");
const dialog = document.getElementById("lb-dialog");
const media = document.getElementById("lb-media");

if (grid && dialog && media) {
    const images = [
        { emoji: "🏔️", color: "#6366f1" },
        { emoji: "🌊", color: "#0ea5e9" },
        { emoji: "🏜️", color: "#f97316" },
        { emoji: "🧊", color: "#14b8a6" },
    ];
    let current = 0;

    const render = () => {
        const img = images[current];
        media.style.background = img.color;
        media.textContent = img.emoji;
    };

    const show = (i) => {
        current = (i + images.length) % images.length;
        render();
    };

    grid.querySelectorAll(".lightbox-thumb").forEach((thumb) => {
        thumb.onclick = () => {
            show(Number(thumb.dataset.i));
            dialog.showModal();
        };
    });

    document.getElementById("lb-close").onclick = () => dialog.close();
    document.getElementById("lb-prev").onclick = () => show(current - 1);
    document.getElementById("lb-next").onclick = () => show(current + 1);

    dialog.addEventListener("click", (e) => {
        if (e.target === dialog) dialog.close();
    });

    dialog.addEventListener("keydown", (e) => {
        if (e.key === "ArrowLeft") show(current - 1);
        if (e.key === "ArrowRight") show(current + 1);
    });
}
```

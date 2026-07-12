---
title: Slideshow
draft: false
tags:
- initié
- snippet
- HTML
- CSS
- JS
- Component
---

A reusable image/content slider. Plan the structure first, then build it up in layers: slides hardcoded in HTML, then generated from a JS array of objects (the version you'd actually reuse), then three ways to animate the transition between slides — sliding, a seamless infinite loop, and a crossfade.

Some useful libraries to implement sliders: [Embla](https://www.embla-carousel.com/)

# Pseudocode

## Structure

- A wrapper (`.slider`) holds a list of slides (`.slides > .slide`) — one `<li>` per slide, each wrapping a `<figure>` (image + caption).
- Only one slide is visible at a time; the others sit side by side, off-screen.
- Navigation lives inside the wrapper: prev/next arrow buttons, and a row of dots (one per slide).

## Style

- `.slider` clips overflow (`overflow: hidden`) so only the active slide shows.
- `.slides` is a flex row; each `.slide` takes `100%` of the wrapper's width.
- Moving between slides can be instant, or animated — either by shifting `.slides` sideways with `transform: translateX(...)`, or by cross-fading each slide's `opacity`. The sections below build this up one idea at a time.
- The active dot gets a different color so the current position is always visible.

## Features

- Track the current slide index in JS.
- `goTo(i)` updates the index (wrapping around with modulo, so "next" on the last slide loops back to the first), applies the transform, and updates the active dot.
- Prev/next buttons and dot clicks all just call `goTo`.
- Bonus: autoplay with `setInterval`, paused on hover so it doesn't fight the visitor.

# Basic static slideshow

In this example, slides are written directly in the HTML, and there's no animation yet — clicking prev/next or a dot jumps straight to the target slide. This section is about the structure and the JS logic; the sections further down layer transitions on top of it.

```html:index.html
<div class="slider">
    <ul class="slides" id="bs-slides">
        <li class="slide">
            <figure>
                <div class="slide-media" style="background:#6366f1">Mountains</div>
                <figcaption>A quiet morning in the mountains</figcaption>
            </figure>
        </li>
        <li class="slide">
            <figure>
                <div class="slide-media" style="background:#10b981">Ocean</div>
                <figcaption>Waves rolling over the reef</figcaption>
            </figure>
        </li>
        <li class="slide">
            <figure>
                <div class="slide-media" style="background:#f59e0b">Desert</div>
                <figcaption>Dunes at golden hour</figcaption>
            </figure>
        </li>
        <li class="slide">
            <figure>
                <div class="slide-media" style="background:#ec4899">Aurora</div>
                <figcaption>Northern lights over the fjord</figcaption>
            </figure>
        </li>
    </ul>
    <button class="slider-arrow slider-prev" id="bs-prev" aria-label="Previous slide">‹</button>
    <button class="slider-arrow slider-next" id="bs-next" aria-label="Next slide">›</button>
    <div class="slider-dots" id="bs-dots"></div>
</div>
```

```css:style.css
.slider {
    position: relative;
    overflow: hidden;
}

.slides {
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
}

.slide {
    flex: 0 0 100%;
}

.slide figure {
    margin: 0;
}

.slide-media {
    height: 180px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
}

.slide figcaption {
    padding: 0.5rem 1rem;
    background: #f8fafc;
    text-align: center;
}

.slider-arrow {
    position: absolute;
    top: 90px;
    transform: translateY(-50%);
    width: 2rem;
    height: 2rem;
    border: none;
    border-radius: 50%;
    background: rgba(15, 23, 42, 0.55);
    color: white;
    font-size: 1.1rem;
    line-height: 1;
    cursor: pointer;
}

.slider-prev {
    left: 0.5rem;
}

.slider-next {
    right: 0.5rem;
}

.slider-dots {
    display: flex;
    justify-content: center;
    gap: 0.5rem;
    padding: 0.5rem 0;
    background: #f8fafc;
}

.slider-dot {
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 50%;
    border: none;
    background: #cbd5e1;
    cursor: pointer;
    padding: 0;
}

.slider-dot.active {
    background: #6366f1;
}
```

```js:script.js
const slidesEl = document.getElementById("bs-slides");
const dotsEl = document.getElementById("bs-dots");
const prevBtn = document.getElementById("bs-prev");
const nextBtn = document.getElementById("bs-next");

if (slidesEl && dotsEl && prevBtn && nextBtn) {
    const slides = slidesEl.querySelectorAll(".slide");
    let current = 0;

    dotsEl.innerHTML = Array.from(slides)
        .map((_, i) => {
        return `
            <button class="slider-dot ${i === 0 ? " active" : ""}" data-i="${i}">
            </button>
        `})
        .join("");
    const dots = dotsEl.querySelectorAll(".slider-dot");

    const goTo = (i) => {
        current = (i + slides.length) % slides.length;
        slidesEl.style.transform = `translateX(-${current * 100}%)`;
        dots.forEach((dot, i2) => dot.classList.toggle("active", i2 === current));
    };

    prevBtn.onclick = () => goTo(current - 1);
    nextBtn.onclick = () => goTo(current + 1);
    dots.forEach((dot) => {
        dot.onclick = () => goTo(Number(dot.dataset.i));
    });
}
```

# Slideshow loading data from an array of objects

Same slider, but the markup is built from a JS array. This means the HTML markup for each slides' data is created by JavaScript in the slider container.

Add or remove an object from `slides` and the slideshow — slides, dots and all — updates itself. 

This version also adds autoplay, paused while the mouse is over the slider — still with no transition, same as above. The next sections add that.

```html:index.html
<div class="slider" id="ds-slider"></div>
```

```css:style.css
.slider {
    position: relative;
    overflow: hidden;
}

.slides {
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
}

.slide {
    flex: 0 0 100%;
}

.slide figure {
    margin: 0;
}

.slide-media {
    height: 180px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
}

.slide figcaption {
    padding: 0.5rem 1rem;
    background: #f8fafc;
    text-align: center;
}

.slider-arrow {
    position: absolute;
    top: 90px;
    transform: translateY(-50%);
    width: 2rem;
    height: 2rem;
    border: none;
    border-radius: 50%;
    background: rgba(15, 23, 42, 0.55);
    color: white;
    font-size: 1.1rem;
    line-height: 1;
    cursor: pointer;
}

.slider-prev {
    left: 0.5rem;
}

.slider-next {
    right: 0.5rem;
}

.slider-dots {
    display: flex;
    justify-content: center;
    gap: 0.5rem;
    padding: 0.5rem 0;
    background: #f8fafc;
}

.slider-dot {
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 50%;
    border: none;
    background: #cbd5e1;
    cursor: pointer;
    padding: 0;
}

.slider-dot.active {
    background: #6366f1;
}
```

```js:script.js
const sliderEl = document.getElementById("ds-slider");
const autoplayInterval = 2500;

if (sliderEl) {
    const slides = [
        { 
            title: "Sunrise", 
            caption: "First light over the ridge", 
            color: "#6366f1" 
        },
        { 
            title: "Reef", 
            caption: "Low tide at the coral reef", 
            color: "#0ea5e9" },
        { 
            title: "Canyon", 
            caption: "Layers of red sandstone", 
            color: "#f97316" 
        },
        { 
            title: "Glacier", 
            caption: "Blue ice, deep silence", 
            color: "#14b8a6" 
        },
        { 
            title: "Dusk", 
            caption: "The sky just before dark", 
            color: "#8b5cf6" 
        },
    ];

    sliderEl.innerHTML = `
        <ul class="slides" id="ds-slides">
            ${slides
                .map( 
                    // implicit return
                    (s) => ` 
                <li class="slide">
                    <figure>
                        <div class="slide-media" style="background:${s.color}">${s.title}</div>
                        <figcaption>${s.caption}</figcaption>
                    </figure>
                </li>
            `,
                )
                .join("")}
        </ul>
        <button class="slider-arrow slider-prev" id="ds-prev" aria-label="Previous slide">‹</button>
        <button class="slider-arrow slider-next" id="ds-next" aria-label="Next slide">›</button>
        <div class="slider-dots" id="ds-dots"></div>
    `;

    const slidesEl = document.getElementById("ds-slides");
    const dotsEl = document.getElementById("ds-dots");
    let current = 0;
    let timer = null;

    dotsEl.innerHTML = slides
        // `_` is just a convention for "I'm not using this parameter"
        // map gives (item, index), and we only need the index here
        .map((_, i) => `<button class="slider-dot${i === 0 ? " active" : ""}" data-i="${i}"></button>`)
        .join("");
    const dots = dotsEl.querySelectorAll(".slider-dot");

    const goTo = (i) => {
        current = (i + slides.length) % slides.length;
        slidesEl.style.transform = `translateX(-${current * 100}%)`;
        dots.forEach((dot, i2) => dot.classList.toggle("active", i2 === current));
    };

    const startAutoplay = () => {
        timer = setInterval(() => goTo(current + 1), autoplayInterval);
    };
    const stopAutoplay = () => clearInterval(timer);

    document.getElementById("ds-prev").onclick = () => goTo(current - 1);
    document.getElementById("ds-next").onclick = () => goTo(current + 1);
    dots.forEach((dot) => {
        dot.onclick = () => goTo(Number(dot.dataset.i));
    });

    sliderEl.addEventListener("mouseenter", stopAutoplay);
    sliderEl.addEventListener("mouseleave", startAutoplay);

    startAutoplay();
}
```

# Sliding transition

The data-driven slider from above, plus one CSS rule: `transition: transform 0.4s ease;` on `.slides`. The JS is unchanged — prev/next and the dots already move the strip with `transform`, they just snapped instead of animating without it.

Try going past the last slide: it slides backward all the way to the first one, instead of continuing forward. That seam is what the next section fixes.

```html:index.html
<div class="slider" id="st-slider"></div>
```

```css:style.css
.slider {
    position: relative;
    overflow: hidden;
}

.slides {
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
    transition: transform 0.4s ease;
}

.slide {
    flex: 0 0 100%;
}

.slide figure {
    margin: 0;
}

.slide-media {
    height: 180px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
}

.slide figcaption {
    padding: 0.5rem 1rem;
    background: #f8fafc;
    text-align: center;
}

.slider-arrow {
    position: absolute;
    top: 90px;
    transform: translateY(-50%);
    width: 2rem;
    height: 2rem;
    border: none;
    border-radius: 50%;
    background: rgba(15, 23, 42, 0.55);
    color: white;
    font-size: 1.1rem;
    line-height: 1;
    cursor: pointer;
}

.slider-prev {
    left: 0.5rem;
}

.slider-next {
    right: 0.5rem;
}

.slider-dots {
    display: flex;
    justify-content: center;
    gap: 0.5rem;
    padding: 0.5rem 0;
    background: #f8fafc;
}

.slider-dot {
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 50%;
    border: none;
    background: #cbd5e1;
    cursor: pointer;
    padding: 0;
}

.slider-dot.active {
    background: #6366f1;
}
```

```js:script.js
const sliderEl = document.getElementById("st-slider");

if (sliderEl) {
    const slides = [
        { title: "Sunrise", caption: "First light over the ridge", color: "#6366f1" },
        { title: "Reef", caption: "Low tide at the coral reef", color: "#0ea5e9" },
        { title: "Canyon", caption: "Layers of red sandstone", color: "#f97316" },
        { title: "Glacier", caption: "Blue ice, deep silence", color: "#14b8a6" },
    ];

    sliderEl.innerHTML = `
        <ul class="slides" id="st-slides">
            ${slides
                .map(
                    (s) => `
                <li class="slide">
                    <figure>
                        <div class="slide-media" style="background:${s.color}">${s.title}</div>
                        <figcaption>${s.caption}</figcaption>
                    </figure>
                </li>
            `,
                )
                .join("")}
        </ul>
        <button class="slider-arrow slider-prev" id="st-prev" aria-label="Previous slide">‹</button>
        <button class="slider-arrow slider-next" id="st-next" aria-label="Next slide">›</button>
        <div class="slider-dots" id="st-dots"></div>
    `;

    const slidesEl = document.getElementById("st-slides");
    const dotsEl = document.getElementById("st-dots");
    let current = 0;

    dotsEl.innerHTML = slides
        .map((_, i) => `<button class="slider-dot${i === 0 ? " active" : ""}" data-i="${i}"></button>`)
        .join("");
    const dots = dotsEl.querySelectorAll(".slider-dot");

    const goTo = (i) => {
        current = (i + slides.length) % slides.length;
        slidesEl.style.transform = `translateX(-${current * 100}%)`;
        dots.forEach((dot, i2) => dot.classList.toggle("active", i2 === current));
    };

    document.getElementById("st-prev").onclick = () => goTo(current - 1);
    document.getElementById("st-next").onclick = () => goTo(current + 1);
    dots.forEach((dot) => {
        dot.onclick = () => goTo(Number(dot.dataset.i));
    });
}
```

# Looping slideshow

To make the loop seamless, clone the last slide and place it before the first, and clone the first slide and place it after the last. Sliding onto a clone still animates forward — then, the instant that transition ends, we jump back to the matching real slide with the transition switched off. The visitor only ever sees the animation, never the jump.

```html:index.html
<div class="slider" id="ls-slider"></div>
```

```css:style.css
.slider {
    position: relative;
    overflow: hidden;
}

.slides {
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
    transition: transform 0.4s ease;
}

.slide {
    flex: 0 0 100%;
}

.slide figure {
    margin: 0;
}

.slide-media {
    height: 180px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
}

.slide figcaption {
    padding: 0.5rem 1rem;
    background: #f8fafc;
    text-align: center;
}

.slider-arrow {
    position: absolute;
    top: 90px;
    transform: translateY(-50%);
    width: 2rem;
    height: 2rem;
    border: none;
    border-radius: 50%;
    background: rgba(15, 23, 42, 0.55);
    color: white;
    font-size: 1.1rem;
    line-height: 1;
    cursor: pointer;
}

.slider-prev {
    left: 0.5rem;
}

.slider-next {
    right: 0.5rem;
}

.slider-dots {
    display: flex;
    justify-content: center;
    gap: 0.5rem;
    padding: 0.5rem 0;
    background: #f8fafc;
}

.slider-dot {
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 50%;
    border: none;
    background: #cbd5e1;
    cursor: pointer;
    padding: 0;
}

.slider-dot.active {
    background: #6366f1;
}
```

```js:script.js
const sliderEl = document.getElementById("ls-slider");

if (sliderEl) {
    const slides = [
        { title: "Sunrise", caption: "First light over the ridge", color: "#6366f1" },
        { title: "Reef", caption: "Low tide at the coral reef", color: "#0ea5e9" },
        { title: "Canyon", caption: "Layers of red sandstone", color: "#f97316" },
        { title: "Glacier", caption: "Blue ice, deep silence", color: "#14b8a6" },
    ];
    const n = slides.length;
    const extended = [slides[n - 1], ...slides, slides[0]]; // clone-of-last, real slides, clone-of-first

    sliderEl.innerHTML = `
        <ul class="slides" id="ls-slides">
            ${extended
                .map(
                    (s) => `
                <li class="slide">
                    <figure>
                        <div class="slide-media" style="background:${s.color}">${s.title}</div>
                        <figcaption>${s.caption}</figcaption>
                    </figure>
                </li>
            `,
                )
                .join("")}
        </ul>
        <button class="slider-arrow slider-prev" id="ls-prev" aria-label="Previous slide">‹</button>
        <button class="slider-arrow slider-next" id="ls-next" aria-label="Next slide">›</button>
        <div class="slider-dots" id="ls-dots"></div>
    `;

    const slidesEl = document.getElementById("ls-slides");
    const dotsEl = document.getElementById("ls-dots");

    dotsEl.innerHTML = slides
        .map((_, i) => `<button class="slider-dot${i === 0 ? " active" : ""}" data-i="${i}"></button>`)
        .join("");
    const dots = dotsEl.querySelectorAll(".slider-dot");

    let current = 1; // extended[1] is the real first slide
    let transitioning = false;

    const setPosition = (animate) => {
        slidesEl.style.transition = animate ? "" : "none";
        slidesEl.style.transform = `translateX(-${current * 100}%)`;
    };

    const updateDots = () => {
        const realIndex = (current - 1 + n) % n;
        dots.forEach((dot, i) => dot.classList.toggle("active", i === realIndex));
    };

    setPosition(false); // no animation on first paint
    updateDots();

    const goTo = (target) => {
        if (transitioning) return;
        transitioning = true;
        current = target;
        setPosition(true);
        updateDots();
    };

    slidesEl.addEventListener("transitionend", () => {
        transitioning = false;
        if (current === 0) {
            current = n; // snap from the clone-of-last to the real last slide
            setPosition(false);
        } else if (current === n + 1) {
            current = 1; // snap from the clone-of-first to the real first slide
            setPosition(false);
        }
    });

    document.getElementById("ls-prev").onclick = () => goTo(current - 1);
    document.getElementById("ls-next").onclick = () => goTo(current + 1);
    dots.forEach((dot) => {
        dot.onclick = () => goTo(Number(dot.dataset.i) + 1);
    });
}
```

# CrossFade transition

A different technique: instead of sliding the strip sideways, stack every slide on top of the others and fade the active one in and out with `opacity`. Only two CSS rules really change — `.slides` no longer needs to be a flex row (its children are now `position: absolute`, stacked on top of each other), and `.slide` fades via `opacity` instead of moving via `transform`. No seam to fix here either — fading from the last slide back to the first looks exactly like any other transition.

```html:index.html
<div class="slider" id="cf-slider"></div>
```

```css:style.css
.slider {
    position: relative;
    overflow: hidden;
}

.slides {
    position: relative;
    list-style: none;
    margin: 0;
    padding: 0;
    height: 220px;
}

.slide {
    position: absolute;
    inset: 0;
    opacity: 0;
    transition: opacity 0.5s ease;
}

.slide.active {
    opacity: 1;
}

.slide figure {
    margin: 0;
}

.slide-media {
    height: 180px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
}

.slide figcaption {
    padding: 0.5rem 1rem;
    background: #f8fafc;
    text-align: center;
}

.slider-arrow {
    position: absolute;
    top: 90px;
    transform: translateY(-50%);
    width: 2rem;
    height: 2rem;
    border: none;
    border-radius: 50%;
    background: rgba(15, 23, 42, 0.55);
    color: white;
    font-size: 1.1rem;
    line-height: 1;
    cursor: pointer;
}

.slider-prev {
    left: 0.5rem;
}

.slider-next {
    right: 0.5rem;
}

.slider-dots {
    display: flex;
    justify-content: center;
    gap: 0.5rem;
    padding: 0.5rem 0;
    background: #f8fafc;
}

.slider-dot {
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 50%;
    border: none;
    background: #cbd5e1;
    cursor: pointer;
    padding: 0;
}

.slider-dot.active {
    background: #6366f1;
}
```

```js:script.js
const sliderEl = document.getElementById("cf-slider");

if (sliderEl) {
    const slides = [
        { title: "Sunrise", caption: "First light over the ridge", color: "#6366f1" },
        { title: "Reef", caption: "Low tide at the coral reef", color: "#0ea5e9" },
        { title: "Canyon", caption: "Layers of red sandstone", color: "#f97316" },
        { title: "Glacier", caption: "Blue ice, deep silence", color: "#14b8a6" },
    ];

    sliderEl.innerHTML = `
        <ul class="slides" id="cf-slides">
            ${slides
                .map(
                    (s, i) => `
                <li class="slide${i === 0 ? " active" : ""}">
                    <figure>
                        <div class="slide-media" style="background:${s.color}">${s.title}</div>
                        <figcaption>${s.caption}</figcaption>
                    </figure>
                </li>
            `,
                )
                .join("")}
        </ul>
        <button class="slider-arrow slider-prev" id="cf-prev" aria-label="Previous slide">‹</button>
        <button class="slider-arrow slider-next" id="cf-next" aria-label="Next slide">›</button>
        <div class="slider-dots" id="cf-dots"></div>
    `;

    const slideEls = document.getElementById("cf-slides").querySelectorAll(".slide");
    const dotsEl = document.getElementById("cf-dots");
    let current = 0;

    dotsEl.innerHTML = slides
        .map((_, i) => `<button class="slider-dot${i === 0 ? " active" : ""}" data-i="${i}"></button>`)
        .join("");
    const dots = dotsEl.querySelectorAll(".slider-dot");

    const goTo = (i) => {
        current = (i + slides.length) % slides.length;
        slideEls.forEach((el, i2) => el.classList.toggle("active", i2 === current));
        dots.forEach((dot, i2) => dot.classList.toggle("active", i2 === current));
    };

    document.getElementById("cf-prev").onclick = () => goTo(current - 1);
    document.getElementById("cf-next").onclick = () => goTo(current + 1);
    dots.forEach((dot) => {
        dot.onclick = () => goTo(Number(dot.dataset.i));
    });
}
```

# Multiple slides in view

So far every slide has taken up the full width of the slider. Showing several at once (a common pattern for testimonials or product cards) only needs two changes: 

- each `.slide` is `100% / visibleCount` wide instead of `100%`, 
- moving "next" shifts by one slide's width, not by a full `100%`. 

No transition here yet — `current` is clamped instead of wrapped, and prev/next disable themselves at the edges, so there's no loop to animate.

```html:index.html
<div class="slider" id="mv-slider"></div>
```

```css:style.css
.slider {
    position: relative;
    overflow: hidden;
}

.slides {
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
}

.slide {
    flex: 0 0 calc(100% / var(--visible, 1));
    box-sizing: border-box;
    padding: 0 0.25rem;
}

.slide figure {
    margin: 0;
}

.slide-media {
    height: 140px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    border-radius: 6px;
    font-family: monospace;
    font-size: 0.9rem;
}

.slider-arrow {
    position: absolute;
    top: 70px;
    transform: translateY(-50%);
    width: 2rem;
    height: 2rem;
    border: none;
    border-radius: 50%;
    background: rgba(15, 23, 42, 0.55);
    color: white;
    font-size: 1.1rem;
    line-height: 1;
    cursor: pointer;
}

.slider-arrow:disabled {
    opacity: 0.3;
    cursor: default;
}

.slider-prev {
    left: 0.5rem;
}

.slider-next {
    right: 0.5rem;
}

.slider-status {
    padding: 0.4rem 0;
    font-family: monospace;
    font-size: 0.75rem;
    color: #64748b;
    text-align: center;
    background: #f8fafc;
}
```

```js:script.js
const sliderEl = document.getElementById("mv-slider");

if (sliderEl) {
    const slides = [
        { title: "Sunrise", color: "#6366f1" },
        { title: "Reef", color: "#0ea5e9" },
        { title: "Canyon", color: "#f97316" },
        { title: "Glacier", color: "#14b8a6" },
        { title: "Dusk", color: "#8b5cf6" },
        { title: "Meadow", color: "#22c55e" },
    ];
    const visibleCount = 3;
    const maxIndex = slides.length - visibleCount;

    sliderEl.innerHTML = `
        <ul class="slides" id="mv-slides" style="--visible:${visibleCount}">
            ${slides
                .map(
                    (s) => `
                <li class="slide">
                    <figure>
                        <div class="slide-media" style="background:${s.color}">${s.title}</div>
                    </figure>
                </li>
            `,
                )
                .join("")}
        </ul>
        <button class="slider-arrow slider-prev" id="mv-prev" aria-label="Previous slide">‹</button>
        <button class="slider-arrow slider-next" id="mv-next" aria-label="Next slide">›</button>
        <div class="slider-status" id="mv-status"></div>
    `;

    const slidesEl = document.getElementById("mv-slides");
    const statusEl = document.getElementById("mv-status");
    const prevBtn = document.getElementById("mv-prev");
    const nextBtn = document.getElementById("mv-next");
    let current = 0;

    const render = () => {
        const step = 100 / visibleCount; // width of a single slide, in %
        slidesEl.style.transform = `translateX(-${current * step}%)`;
        statusEl.textContent = `Showing ${current + 1}–${current + visibleCount} of ${slides.length}`;
        prevBtn.disabled = current === 0;
        nextBtn.disabled = current === maxIndex;
    };

    const goTo = (i) => {
        current = Math.max(0, Math.min(i, maxIndex)); // clamp — no wraparound
        render();
    };

    render();

    prevBtn.onclick = () => goTo(current - 1);
    nextBtn.onclick = () => goTo(current + 1);
}
```

To turn this into the sliding transition from earlier:

- Add `transition: transform 0.4s ease;` to `.slides` — same one line as before.
- The offset math doesn't change: it's already `current * (100 / visibleCount)`, which is what makes it slide by one card instead of jumping a whole page at a time.
- Making it loop seamlessly needs more than a single clone at each end, though. With one slide in view, one clone on either side is enough to cover the seam. With `visibleCount` slides in view, the visible window can straddle the real/clone boundary for up to `visibleCount - 1` steps, so you need `visibleCount` clones prepended and appended, not one.
- Clamping (`Math.max`/`Math.min`, disabled buttons) and wraparound (`% slides.length`, always-enabled buttons) are mutually exclusive — looping means going back to the modulo approach from the sections above.

Here's all four points put together — `visibleCount` slides in view, sliding, looping seamlessly:

```html:index.html
<div class="slider" id="mvl-slider"></div>
```

```css:style.css
.slider {
    position: relative;
    overflow: hidden;
}

.slides {
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
    transition: transform 0.4s ease;
}

.slide {
    flex: 0 0 calc(100% / var(--visible, 1));
    box-sizing: border-box;
    padding: 0 0.25rem;
}

.slide figure {
    margin: 0;
}

.slide-media {
    height: 140px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    border-radius: 6px;
    font-family: monospace;
    font-size: 0.9rem;
}

.slider-arrow {
    position: absolute;
    top: 70px;
    transform: translateY(-50%);
    width: 2rem;
    height: 2rem;
    border: none;
    border-radius: 50%;
    background: rgba(15, 23, 42, 0.55);
    color: white;
    font-size: 1.1rem;
    line-height: 1;
    cursor: pointer;
}

.slider-prev {
    left: 0.5rem;
}

.slider-next {
    right: 0.5rem;
}
```

```js:script.js
const sliderEl = document.getElementById("mvl-slider");

if (sliderEl) {
    const slides = [
        { title: "Sunrise", color: "#6366f1" },
        { title: "Reef", color: "#0ea5e9" },
        { title: "Canyon", color: "#f97316" },
        { title: "Glacier", color: "#14b8a6" },
        { title: "Dusk", color: "#8b5cf6" },
        { title: "Meadow", color: "#22c55e" },
    ];
    const visibleCount = 3;
    const n = slides.length;
    // visibleCount clones on each side, not just one
    const extended = [...slides.slice(n - visibleCount), ...slides, ...slides.slice(0, visibleCount)];

    sliderEl.innerHTML = `
        <ul class="slides" id="mvl-slides" style="--visible:${visibleCount}">
            ${extended
                .map(
                    (s) => `
                <li class="slide">
                    <figure>
                        <div class="slide-media" style="background:${s.color}">${s.title}</div>
                    </figure>
                </li>
            `,
                )
                .join("")}
        </ul>
        <button class="slider-arrow slider-prev" id="mvl-prev" aria-label="Previous slide">‹</button>
        <button class="slider-arrow slider-next" id="mvl-next" aria-label="Next slide">›</button>
    `;

    const slidesEl = document.getElementById("mvl-slides");
    const step = 100 / visibleCount; // width of a single slide, in % — unchanged from the plain version
    let current = visibleCount; // extended[visibleCount] is the real first slide
    let transitioning = false;

    const setPosition = (animate) => {
        slidesEl.style.transition = animate ? "" : "none";
        slidesEl.style.transform = `translateX(-${current * step}%)`;
    };

    setPosition(false); // no animation on first paint

    const goTo = (target) => {
        if (transitioning) return;
        transitioning = true;
        current = target;
        setPosition(true);
    };

    slidesEl.addEventListener("transitionend", () => {
        transitioning = false;
        if (current < visibleCount) {
            current += n; // snap from a start-clone to its real slide, one full loop forward
            setPosition(false);
        } else if (current >= visibleCount + n) {
            current -= n; // snap from an end-clone to its real slide, one full loop back
            setPosition(false);
        }
    });

    document.getElementById("mvl-prev").onclick = () => goTo(current - 1);
    document.getElementById("mvl-next").onclick = () => goTo(current + 1);
}
```

# Progress-bar dots

Round dots only tell you *which* slide is active. Thin rectangles that fill up over `autoplayInterval` tell you *how much time is left* — and here, the fill itself drives the autoplay: there's no `setInterval` at all, just a CSS animation whose `animationend` event advances the slide. Hovering sets `animation-play-state: paused`, which freezes the fill (and the countdown) exactly where it was — no separate timer to keep in sync.

```html:index.html
<div class="slider" id="pr-slider"></div>
```

```css:style.css
.slider {
    position: relative;
    overflow: hidden;
}

.slides {
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
    transition: transform 0.4s ease;
}

.slide {
    flex: 0 0 100%;
}

.slide figure {
    margin: 0;
}

.slide-media {
    height: 180px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
}

.slide figcaption {
    padding: 0.5rem 1rem;
    background: #f8fafc;
    text-align: center;
}

.slider-arrow {
    position: absolute;
    top: 90px;
    transform: translateY(-50%);
    width: 2rem;
    height: 2rem;
    border: none;
    border-radius: 50%;
    background: rgba(15, 23, 42, 0.55);
    color: white;
    font-size: 1.1rem;
    line-height: 1;
    cursor: pointer;
}

.slider-prev {
    left: 0.5rem;
}

.slider-next {
    right: 0.5rem;
}

@keyframes slider-progress-fill {
    from {
        width: 0%;
    }
    to {
        width: 100%;
    }
}

.slider-progress-track {
    display: flex;
    gap: 0.35rem;
    padding: 0.6rem;
    background: #f8fafc;
}

.slider-progress {
    flex: 1;
    height: 4px;
    padding: 0;
    border: none;
    border-radius: 2px;
    background: #e2e8f0;
    overflow: hidden;
    cursor: pointer;
}

.slider-progress-fill {
    display: block;
    height: 100%;
    width: 0%;
    background: #6366f1;
}

.slider-progress-fill.playing {
    animation-name: slider-progress-fill;
    animation-timing-function: linear;
    animation-fill-mode: forwards;
}
```

```js:script.js
const sliderEl = document.getElementById("pr-slider");
const autoplayInterval = 3000;

if (sliderEl) {
    const slides = [
        { title: "Sunrise", caption: "First light over the ridge", color: "#6366f1" },
        { title: "Reef", caption: "Low tide at the coral reef", color: "#0ea5e9" },
        { title: "Canyon", caption: "Layers of red sandstone", color: "#f97316" },
        { title: "Glacier", caption: "Blue ice, deep silence", color: "#14b8a6" },
    ];

    sliderEl.innerHTML = `
        <ul class="slides" id="pr-slides">
            ${slides
                .map(
                    (s) => `
                <li class="slide">
                    <figure>
                        <div class="slide-media" style="background:${s.color}">${s.title}</div>
                        <figcaption>${s.caption}</figcaption>
                    </figure>
                </li>
            `,
                )
                .join("")}
        </ul>
        <button class="slider-arrow slider-prev" id="pr-prev" aria-label="Previous slide">‹</button>
        <button class="slider-arrow slider-next" id="pr-next" aria-label="Next slide">›</button>
        <div class="slider-progress-track" id="pr-progress"></div>
    `;

    const slidesEl = document.getElementById("pr-slides");
    const progressTrack = document.getElementById("pr-progress");
    let current = 0;

    progressTrack.innerHTML = slides
        .map((_, i) => `<button class="slider-progress" data-i="${i}"><span class="slider-progress-fill"></span></button>`)
        .join("");
    const progressBtns = progressTrack.querySelectorAll(".slider-progress");
    const fills = progressTrack.querySelectorAll(".slider-progress-fill");

    const restartProgress = (i) => {
        fills.forEach((fill) => fill.classList.remove("playing"));
        const active = fills[i];
        void active.offsetWidth; // force reflow so the animation restarts even on the same rectangle
        active.style.animationDuration = `${autoplayInterval}ms`;
        active.classList.add("playing");
    };

    const goTo = (i) => {
        current = (i + slides.length) % slides.length;
        slidesEl.style.transform = `translateX(-${current * 100}%)`;
        restartProgress(current);
    };

    document.getElementById("pr-prev").onclick = () => goTo(current - 1);
    document.getElementById("pr-next").onclick = () => goTo(current + 1);
    progressBtns.forEach((btn) => {
        btn.onclick = () => goTo(Number(btn.dataset.i));
    });

    // the fill completing IS the autoplay timer — no setInterval needed
    progressTrack.addEventListener("animationend", (e) => {
        if (e.target.classList.contains("slider-progress-fill")) goTo(current + 1);
    });

    sliderEl.addEventListener("mouseenter", () => {
        const playing = progressTrack.querySelector(".slider-progress-fill.playing");
        if (playing) playing.style.animationPlayState = "paused";
    });
    sliderEl.addEventListener("mouseleave", () => {
        const playing = progressTrack.querySelector(".slider-progress-fill.playing");
        if (playing) playing.style.animationPlayState = "running";
    });

    restartProgress(0);
}
```

# Auto-scrolling loop

Every version above jumps by whole slides. This one drifts continuously: an `offset` (in slide-widths) increases every frame via `requestAnimationFrame`, and the transform is written directly from it — no CSS `transition` at all, since a transition would just fight a value that changes 60 times a second.

That also changes how the loop works. The step-based sections needed `visibleCount` clones at each edge, snapped back on `transitionend`. Here there's no transition to snap on, so instead the whole slide list is duplicated once, and `offset` is wrapped with `% n` every frame — since `extended[k]` and `extended[k + n]` are always the same slide, substituting one for the other never changes a single pixel on screen, so the "wrap" is invisible even though `offset` itself keeps climbing forever.

Scroll horizontally over the slider — trackpad swipe, or Shift + wheel — and the `wheel` event's `deltaX` is added straight onto `offset`: the loop speeds up, slows down, or reverses for a moment, then settles back into its steady drift once you stop.

```html:index.html
<div class="slider" id="as-slider"></div>
```

```css:style.css
.slider {
    position: relative;
    overflow: hidden;
}

.slides {
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
}

.slide {
    flex: 0 0 calc(100% / var(--visible, 1));
    box-sizing: border-box;
    padding: 0 0.25rem;
}

.slide figure {
    margin: 0;
}

.slide-media {
    height: 140px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    border-radius: 6px;
    font-family: monospace;
    font-size: 0.9rem;
}

.slider-hint {
    padding: 0.4rem 0;
    font-family: monospace;
    font-size: 0.75rem;
    color: #64748b;
    text-align: center;
    background: #f8fafc;
}
```

```js:script.js
const sliderEl = document.getElementById("as-slider");

if (sliderEl) {
    const slides = [
        { title: "Sunrise", color: "#6366f1" },
        { title: "Reef", color: "#0ea5e9" },
        { title: "Canyon", color: "#f97316" },
        { title: "Glacier", color: "#14b8a6" },
        { title: "Dusk", color: "#8b5cf6" },
        { title: "Meadow", color: "#22c55e" },
    ];
    const visibleCount = 3;
    const n = slides.length;
    const extended = [...slides, ...slides]; // one full duplicate is enough for a continuous loop

    sliderEl.innerHTML = `
        <ul class="slides" id="as-slides" style="--visible:${visibleCount}">
            ${extended
                .map(
                    (s) => `
                <li class="slide">
                    <figure>
                        <div class="slide-media" style="background:${s.color}">${s.title}</div>
                    </figure>
                </li>
            `,
                )
                .join("")}
        </ul>
        <div class="slider-hint">scroll horizontally over the slider to speed it up →</div>
    `;

    const slidesEl = document.getElementById("as-slides");
    const step = 100 / visibleCount; // one slide's width, in %

    const autoSpeed = 0.4; // slide-widths per second — the constant drift
    let offset = 0; // unwrapped, in slide-widths — keeps growing/shrinking forever
    let lastFrame = null;
    let idleUntil = 0; // auto-drift stays paused until this timestamp after user input

    const render = () => {
        const wrapped = ((offset % n) + n) % n; // wrap against ONE set — the duplicate covers the rest
        slidesEl.style.transform = `translateX(-${wrapped * step}%)`;
    };

    const tick = (time) => {
        if (lastFrame === null) lastFrame = time;
        const dt = (time - lastFrame) / 1000;
        lastFrame = time;

        if (time > idleUntil) offset += autoSpeed * dt;

        render();
        requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);

    sliderEl.addEventListener(
        "wheel",
        (e) => {
            if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return; // ignore plain vertical page scroll
            e.preventDefault();
            offset += e.deltaX / 40; // scroll gesture -> extra slide-widths, just a feel-good scale
            idleUntil = performance.now() + 800; // let the scroll gesture "win" before drifting resumes
            render();
        },
        { passive: false },
    );
}
```

# Swipeable controls

Back to the one-slide-at-a-time model, now combined with the seamless loop from "Looping slideshow" plus a third way to navigate: drag or swipe the slide itself. Pointer Events (`pointerdown`/`pointermove`/`pointerup`) unify mouse, touch and pen, so the same code handles a mouse drag and a finger swipe.

While dragging, the transition is switched off so the slide tracks the pointer directly, one-to-one. On release, if the drag crossed 20% of the slider's width it advances (or goes back) through `goTo` — the same function the arrows and dots use, clone-and-snap included, so swiping past the last slide loops to the first exactly like clicking "next" does. If the drag didn't cross the threshold it snaps back to where it started; a genuine tap (zero movement) skips `goTo` entirely instead of asking a transition to animate between two identical values, which would never fire `transitionend` and leave the slider stuck mid-navigation forever.

`setPointerCapture` keeps the drag going even if the pointer moves faster than the browser can track and briefly leaves the slider. `touch-action: pan-y` on `.slider` tells the browser "don't try to scroll the page horizontally here, that's mine" — without it, a swipe on a touchscreen fights the page's own scrolling. The listeners are attached to `.slides` itself rather than the whole `.slider`, so pointerdown on the prev/next buttons or the dots (which are siblings, not children of `.slides`) never starts a drag — and a new drag is ignored outright while a snap from the previous one is still animating.

```html:index.html
<div class="slider" id="sw-slider"></div>
```

```css:style.css
.slider {
    position: relative;
    overflow: hidden;
    touch-action: pan-y;
    user-select: none;
    cursor: grab;
}

.slider:active {
    cursor: grabbing;
}

.slides {
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
    transition: transform 0.4s ease;
}

.slide {
    flex: 0 0 100%;
}

.slide figure {
    margin: 0;
}

.slide-media {
    height: 180px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
}

.slide figcaption {
    padding: 0.5rem 1rem;
    background: #f8fafc;
    text-align: center;
}

.slider-arrow {
    position: absolute;
    top: 90px;
    transform: translateY(-50%);
    width: 2rem;
    height: 2rem;
    border: none;
    border-radius: 50%;
    background: rgba(15, 23, 42, 0.55);
    color: white;
    font-size: 1.1rem;
    line-height: 1;
    cursor: pointer;
}

.slider-prev {
    left: 0.5rem;
}

.slider-next {
    right: 0.5rem;
}

.slider-dots {
    display: flex;
    justify-content: center;
    gap: 0.5rem;
    padding: 0.5rem 0;
    background: #f8fafc;
}

.slider-dot {
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 50%;
    border: none;
    background: #cbd5e1;
    cursor: pointer;
    padding: 0;
}

.slider-dot.active {
    background: #6366f1;
}
```

```js:script.js
const sliderEl = document.getElementById("sw-slider");

if (sliderEl) {
    const slides = [
        { title: "Sunrise", caption: "First light over the ridge", color: "#6366f1" },
        { title: "Reef", caption: "Low tide at the coral reef", color: "#0ea5e9" },
        { title: "Canyon", caption: "Layers of red sandstone", color: "#f97316" },
        { title: "Glacier", caption: "Blue ice, deep silence", color: "#14b8a6" },
    ];
    const n = slides.length;
    const extended = [slides[n - 1], ...slides, slides[0]]; // clone-of-last, real slides, clone-of-first

    sliderEl.innerHTML = `
        <ul class="slides" id="sw-slides">
            ${extended
                .map(
                    (s) => `
                <li class="slide">
                    <figure>
                        <div class="slide-media" style="background:${s.color}">${s.title}</div>
                        <figcaption>${s.caption}</figcaption>
                    </figure>
                </li>
            `,
                )
                .join("")}
        </ul>
        <button class="slider-arrow slider-prev" id="sw-prev" aria-label="Previous slide">‹</button>
        <button class="slider-arrow slider-next" id="sw-next" aria-label="Next slide">›</button>
        <div class="slider-dots" id="sw-dots"></div>
    `;

    const slidesEl = document.getElementById("sw-slides");
    const dotsEl = document.getElementById("sw-dots");

    dotsEl.innerHTML = slides
        .map((_, i) => `<button class="slider-dot${i === 0 ? " active" : ""}" data-i="${i}"></button>`)
        .join("");
    const dots = dotsEl.querySelectorAll(".slider-dot");

    let current = 1; // extended[1] is the real first slide
    let transitioning = false;

    const setPosition = (animate) => {
        slidesEl.style.transition = animate ? "" : "none";
        slidesEl.style.transform = `translateX(-${current * 100}%)`;
    };

    const updateDots = () => {
        const realIndex = (current - 1 + n) % n;
        dots.forEach((dot, i) => dot.classList.toggle("active", i === realIndex));
    };

    setPosition(false); // no animation on first paint
    updateDots();

    const goTo = (target) => {
        if (transitioning) return;
        transitioning = true;
        current = target;
        setPosition(true);
        updateDots();
    };

    slidesEl.addEventListener("transitionend", () => {
        transitioning = false;
        if (current === 0) {
            current = n; // snap from the clone-of-last to the real last slide
            setPosition(false);
        } else if (current === n + 1) {
            current = 1; // snap from the clone-of-first to the real first slide
            setPosition(false);
        }
    });

    document.getElementById("sw-prev").onclick = () => goTo(current - 1);
    document.getElementById("sw-next").onclick = () => goTo(current + 1);
    dots.forEach((dot) => {
        dot.onclick = () => goTo(Number(dot.dataset.i) + 1);
    });

    let dragging = false;
    let startX = 0;
    let sliderWidth = 0;

    slidesEl.addEventListener("pointerdown", (e) => {
        if (transitioning) return; // don't start a drag mid-snap
        dragging = true;
        startX = e.clientX;
        sliderWidth = sliderEl.getBoundingClientRect().width;
        slidesEl.style.transition = "none"; // follow the pointer 1:1, no easing while dragging
        slidesEl.setPointerCapture(e.pointerId);
    });

    slidesEl.addEventListener("pointermove", (e) => {
        if (!dragging) return;
        const deltaPercent = ((e.clientX - startX) / sliderWidth) * 100;
        slidesEl.style.transform = `translateX(${-current * 100 + deltaPercent}%)`;
    });

    const endDrag = (e) => {
        if (!dragging) return;
        dragging = false;
        const deltaX = e.clientX - startX;
        const threshold = sliderWidth * 0.2; // swipe past 20% of the slider's width to change slide

        if (deltaX < -threshold) goTo(current + 1);
        else if (deltaX > threshold) goTo(current - 1);
        else if (deltaX !== 0) goTo(current); // dragged a little, not far enough — snap back
        else slidesEl.style.transition = ""; // a genuine tap — nothing moved, nothing to animate
    };

    slidesEl.addEventListener("pointerup", endDrag);
    slidesEl.addEventListener("pointercancel", endDrag);
}
```


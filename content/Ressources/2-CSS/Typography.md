---
title: Typography
draft: false
tags:
  - cheatsheet
  - débutant
  - CSS
description: font-family, size, weight, spacing, text utilities, and responsive type
---

## 01. font-family & Stacks

Always provide a **font stack** — a comma-separated fallback list. End with a generic family (`serif`, `sans-serif`, `monospace`) as the final fallback.

```html:index.html
<div class="ff-rows">
    <div class="ff-row">
        <span class="ff-label">system-ui</span>  
        <span class="ff-text ff-system">The quick brown fox jumps</span>
    </div>
    <div class="ff-row">
        <span class="ff-label">serif</span>       
        <span class="ff-text ff-serif">The quick brown fox jumps</span>
    </div>
    <div class="ff-row">
        <span class="ff-label">monospace</span>   
        <span class="ff-text ff-mono">The quick brown fox jumps</span>
    </div>
    <div class="ff-row">
        <span class="ff-label">sans-serif</span>  
        <span class="ff-text ff-generic">The quick brown fox jumps</span>
    </div>
</div>    
```
```css:style.css
.ff-system { 
    font-family: system-ui, -apple-system, sans-serif;
}
.ff-serif  { 
    font-family: Georgia, "Times New Roman", serif; 
}
.ff-mono   { 
    font-family: "Fira Code", "SF Mono", Consolas, monospace; 
}
.ff-generic { font-family: sans-serif; }

.ff-rows { 
    display: flex; 
    flex-direction: column; 
    gap: .75rem; 
    & .ff-row { 
        display: flex; 
        align-items: baseline; 
        gap: .75rem; 
    }
    & .ff-label { 
        width: 6rem; 
        font-size: .7rem; 
        font-family: monospace; 
        color: #94a3b8; 
        flex-shrink: 0; 
    }
    & .ff-text { 
        font-size: 1.1rem; 
    }
}
```

```css
/* system font stack — uses the OS's native UI font */
font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;

/* classic serif */
font-family: Georgia, "Times New Roman", Times, serif;

/* monospace */
font-family: "SF Mono", "Fira Code", Consolas, monospace;

/* Google Fonts — load in <head> first */
font-family: "Inter", system-ui, sans-serif;

@font-face {
    font-family: "MyFont";
    src: url("./fonts/myfont.woff2") format("woff2");
    font-display: swap;
}
```

---

## 02. font-size & Units

Use `rem` so sizes scale with user browser settings. Use `clamp()` for fluid type that stays within a readable range.

```html:index.html
<div class="scale">
    <div class="scale-row">
        <span class="scale-label">0.75rem</span> 
        <span class="xs">The quick brown fox</span>
    </div>
    <div class="scale-row">
        <span class="scale-label">0.875rem</span>
        <span class="sm">The quick brown fox</span>
    </div>
    <div class="scale-row">
        <span class="scale-label">1rem</span>    
        <span class="base">The quick brown fox</span>
    </div>
    <div class="scale-row">
        <span class="scale-label">1.125rem</span>
        <span class="lg">The quick brown fox</span>
    </div>
    <div class="scale-row">
        <span class="scale-label">1.25rem</span> 
        <span class="xl">The quick brown fox</span>
    </div>
    <div class="scale-row">
        <span class="scale-label">1.5rem</span>  
        <span class="xxl">The quick brown fox</span>
    </div>
    <div class="scale-row">
        <span class="scale-label">1.875rem</span>
        <span class="xxxl">The quick brown fox</span>
    </div>
    <div class="scale-row">
        <span class="scale-label">2.25rem</span> 
        <span class="h1">The quick brown fox</span>
    </div>
</div>
```
```css:style.css
.xs   { font-size: .75rem; }
.sm   { font-size: .875rem; }
.base { font-size: 1rem; }
.lg   { font-size: 1.125rem; }
.xl   { font-size: 1.25rem; }
.xxl  { font-size: 1.5rem; }
.xxxl { font-size: 1.875rem; }
.h1   { font-size: 2.25rem; font-weight: 700; }

.scale { 
    display: flex; 
    flex-direction: column; 
    gap: .75rem; 
    & .scale-row { 
        display: flex; 
        align-items: baseline; 
        gap: 1rem; 
        & .scale-label { 
            width: 5rem; 
            font-size: .75rem; 
            color: #94a3b8; 
            font-family: monospace; 
            flex-shrink: 0; }
    }
}
```

```css
font-size: 16px;    /* fixed — ignores user preferences */
font-size: 1rem;    /* 16px — scales with user settings */
font-size: 1.5rem;  /* 24px */
font-size: 1.2em;   /* 1.2× whatever the parent is */

/* clamp(min, fluid, max) */
font-size: clamp(1rem, 2.5vw, 2rem);

/* a modular scale (1.25 ratio) */
--text-sm:   0.8rem;
--text-base: 1rem;
--text-lg:   1.25rem;
--text-xl:   1.563rem;
--text-2xl:  1.953rem;
```

---

## 03. font-weight & font-style

Weight ranges from 100 (thin) to 900 (black). For variable fonts, any integer weight is valid.

```html:index.html
<div class="weights">
    <div>
        <span>300</span> 
        <p style="font-weight:300;margin:0">Designers love whitespace.</p>
    </div>
    <div>
        <span>400</span> 
        <p style="font-weight:400;margin:0">Designers love whitespace.</p>
    </div>
    <div>
        <span>500</span> 
        <p style="font-weight:500;margin:0">Designers love whitespace.</p>
    </div>
    <div>
        <span>600</span> 
        <p style="font-weight:600;margin:0">Designers love whitespace.</p>
    </div>
    <div>
        <span>700</span> 
        <p style="font-weight:700;margin:0">Designers love whitespace.</p>
    </div>
    <div>
        <span>800</span> 
        <p style="font-weight:800;margin:0">Designers love whitespace.</p>
    </div>
    <div>
        <span>900</span> 
        <p style="font-weight:900;margin:0">Designers love whitespace.</p>
    </div>
</div>
```
```css:style.css
.weights { 
    display: flex; flex-direction: column; 
    gap: .5rem; font-size: 1.25rem; 
    & div { 
        display: flex; align-items: baseline; gap: 1rem; 
    }
    & span { 
        width: 3.5rem; font-size: .75rem;
        color: #94a3b8; font-family: monospace; 
        font-weight: 400; 
    }
}
```

```css
font-weight: 400;        /* normal */
font-weight: 700;        /* bold */
font-weight: lighter;    /* one step lighter than parent */
font-weight: bolder;     /* one step heavier than parent */

font-style: normal;
font-style: italic;      /* uses italic variant */
font-style: oblique;     /* mathematically skewed */

/* variable fonts — any weight value */
font-weight: 350;
```

---

## 04. Spacing — line-height & letter-spacing

`line-height` controls vertical rhythm — set it as a unitless number so it scales with font size. Drag the sliders in the demo.

```html:index.html
<div class="sp-controls">
    <div class="ctrl">
    <span class="ctrl-label">line-height: 
        <span id="sp-lh-val">1.5</span>
    </span>
    <input type="range" min="1" max="2.5" step="0.1" value="1.5" id="sp-lh" />
    </div>
    <div class="ctrl">
    <span class="ctrl-label">letter-spacing: 
        <span id="sp-ls-val">0</span>em</span>
    <input type="range" min="-0.05" max="0.2" step="0.01" value="0" id="sp-ls" />
    </div>
</div>
<p class="sp-text" id="sp-text">Typography is the art of arranging letters and text in a way that makes the copy legible and visually appealing.</p>
    
```
```css:style.css
.sp-controls { 
    display: flex; gap: 1.5rem; flex-wrap: wrap; margin-bottom: 1rem; 
}
.ctrl { 
    display: flex; flex-direction: column; gap: .2rem; 
}
.ctrl-label { 
    font-size: .7rem; font-family: monospace; color: #94a3b8; 
}
.sp-text { 
    font-size: 1rem; color: #1a1a2e; max-width: 300px; 
    transition: letter-spacing .2s, line-height .2s; 
}
```
```js:script.js
const lh = document.getElementById('sp-lh');
const ls = document.getElementById('sp-ls');
const txt = document.getElementById('sp-text');

function upd() {
    txt.style.lineHeight = lh.value;
    txt.style.letterSpacing = ls.value + 'em';
    document.getElementById('sp-lh-val').textContent = lh.value;
    document.getElementById('sp-ls-val').textContent = ls.value;
}

lh.addEventListener('input', upd);
ls.addEventListener('input', upd);
```

```css
/* line-height — unitless is best */
line-height: 1;      /* tight — display/headings */
line-height: 1.4;    /* compact — UI text */
line-height: 1.6;    /* comfortable — body text */
line-height: 1.8;    /* relaxed — long-form reading */

/* letter-spacing — use em so it scales with font-size */
letter-spacing: -0.02em;   /* tighter — large headings */
letter-spacing:  0.05em;   /* looser — small caps, labels */
letter-spacing:  0.1em;    /* very open — uppercase labels */

word-spacing: 0.1em;
```

---

## 05. Text Utilities

One-liner properties that handle alignment, transformation, and decoration.

```html:index.html
<div class="tu-rows">
    <div class="tu-row"><span class="tu-label">text-align</span>           <div style="flex:1;background:#f1f5f9;padding:.3rem .5rem;border-radius:4px"><div style="text-align:center">centered text</div></div></div>
    <div class="tu-row"><span class="tu-label">uppercase</span>            <div class="tu-demo" style="text-transform:uppercase">transformed to uppercase</div></div>
    <div class="tu-row"><span class="tu-label">line-through</span>         <div class="tu-demo" style="text-decoration:line-through">struck through text</div></div>
    <div class="tu-row"><span class="tu-label">ellipsis</span>             <div class="tu-demo truncate-box">Very long text that will be truncated with an ellipsis</div></div>
    <div class="tu-row"><span class="tu-label">text-wrap: balance</span>   <div class="tu-demo balance-box">A heading that wraps evenly on both lines</div></div>
</div>
```
```css:style.css
.tu-demo  { font-size: .9rem; }
.truncate-box { max-width: 180px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.balance-box { max-width: 200px; text-wrap: balance; font-size: .85rem; }
.tu-rows { 
    display: flex; 
    flex-direction: column; 
    gap: .75rem; 
    & .tu-row  { 
        display: flex; 
        align-items: baseline; 
        gap: .75rem; 
        & .tu-label { 
            width: 8rem; font-size: .7rem; 
            font-family: monospace; color: #94a3b8; 
            flex-shrink: 0; 
        }
    }
}
```

```css
text-align: left | center | right | justify;
text-transform: none | uppercase | lowercase | capitalize;
text-decoration: none | underline | line-through | overline;

/* truncate overflowing text with ellipsis */
.truncate {
    white-space:   nowrap;
    overflow:      hidden;
    text-overflow: ellipsis;
}

/* multi-line truncation */
.clamp-3-lines {
    display:            -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow:           hidden;
}

text-wrap: balance;   /* even line lengths — great for headings */
text-wrap: pretty;    /* prevents single-word last lines */
```

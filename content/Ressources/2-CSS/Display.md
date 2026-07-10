---
title: Display
draft: false
tags:
  - cheatsheet
  - débutant
  - CSS
description: block, inline, flex, grid — how elements take up space and arrange themselves
---

## 01. Block, Inline, Inline-block

`block` fills the full width and stacks vertically. `inline` flows with text, ignores width/height. `inline-block` flows with text but respects width and height settings.

```html:index.html
<div class="demo">
    <div>
    <div class="label">block — fills width, stacks vertically</div>
    <div class="block-el">Block A</div>
    <div class="block-el">Block B</div>
    <div class="block-el">Block C</div>
    </div>
    <div>
    <div class="label">inline — flows with text</div>
    <span class="inline-el">Inline A</span>
    <span class="inline-el">Inline B</span>
    <span class="inline-el">Inline C — flows like text in a sentence</span>
    </div>
    <div>
    <div class="label">inline-block — inline flow + box model</div>
    <span class="dib-el">A</span>
    <span class="dib-el">B</span>
    <span class="dib-el dib-tall">C<br>tall</span>
    </div>
</div>
```
```css:style.css
.demo { 
    display: flex; 
    flex-direction: column; 
    gap: 1.5rem; 
}
.label { 
    font-size: .75rem; 
    font-weight: 600; 
    color: #666; 
    text-transform: uppercase; 
    letter-spacing: .05em; 
    margin-bottom: .5rem; 
}
.block-el { 
    display: block;        
    background: #dbeafe; 
    border: 1px solid #93c5fd; 
    padding: .5rem 1rem; 
    margin: .25rem 0; 
    border-radius: 4px; 
}
.inline-el { 
    display: inline;       
    background: #fef9c3; 
    border: 1px solid #fde047; 
    padding: .2rem .5rem; 
    border-radius: 4px; 
}
.dib-el    { 
    display: inline-block; 
    background: #dcfce7; 
    border: 1px solid #86efac; 
    padding: .5rem 1rem; 
    border-radius: 4px; 
}
.dib-tall  { 
    height: 3rem; 
}
```

```css
/* block — full width, stacks vertically, accepts width/height */
div, p, h1, section { display: block; }

/* inline — flows with text, width/height ignored */
span, a, strong { display: inline; }

/* inline-block — flows inline but respects box model */
.badge { display: inline-block; width: 80px; padding: 4px; }

/* display: none — removes completely, no space reserved */
.hidden { display: none; }

/* visibility: hidden — invisible but space is kept */
.invisible { visibility: hidden; }
```

---

## 02. Flexbox — Container

Setting `display: flex` on a container makes its direct children **flex items**. Control direction, wrapping, and gaps on the container.

```html:index.html
<div class="flex-container">
    <div class="flex-item">A</div>
    <div class="flex-item">B</div>
    <div class="flex-item">C</div>
    <div class="flex-item">D</div>
</div>
```
```css:style.css
.flex-container {
    display: flex;
    gap: 1rem;
    padding: 1rem;
    background: #f1f5f9;
    border-radius: 8px;
    flex-wrap: wrap;
}
.flex-item {
    background: #6366f1;
    color: white;
    padding: .75rem 1.25rem;
    border-radius: 6px;
    font-weight: 600;
}
```

```css
.container {
    display: flex;
    flex-direction: row;   /* row | column | row-reverse | column-reverse */
    flex-wrap:      wrap;  /* nowrap (default) | wrap | wrap-reverse */
    gap:            16px;  /* space between items */
}

/* flex-flow is shorthand for direction + wrap */
flex-flow: row wrap;
```

---

## 03. Flexbox — Alignment

`justify-content` aligns items along the **main axis**. `align-items` aligns them along the **cross axis**.

```html:index.html
<div class="al-controls">
    <div class="ctrl-group">
        <span class="ctrl-label">justify-content</span>
        <label><input type="radio" name="jc2" value="flex-start" checked> flex-start</label>
        <label><input type="radio" name="jc2" value="center"> center</label>
        <label><input type="radio" name="jc2" value="flex-end"> flex-end</label>
        <label><input type="radio" name="jc2" value="space-between"> space-between</label>
        <label><input type="radio" name="jc2" value="space-around"> space-around</label>
    </div>
    <div class="ctrl-group">
        <span class="ctrl-label">align-items</span>
        <label><input type="radio" name="ai2" value="flex-start"> flex-start</label>
        <label><input type="radio" name="ai2" value="center" checked> center</label>
        <label><input type="radio" name="ai2" value="flex-end"> flex-end</label>
        <label><input type="radio" name="ai2" value="stretch"> stretch</label>
    </div>
</div>
<div class="al-preview" id="al-preview">
    <div class="al-item">A</div>
    <div class="al-item">B<br>tall</div>
    <div class="al-item">C</div>
</div>
```
```css:style.css
.al-controls { 
    display: flex; 
    gap: 1.5rem; 
    flex-wrap: wrap; 
    margin-bottom: .75rem; 
}
.ctrl-group { 
    display: flex; 
    flex-direction: column; 
    gap: .25rem;
}
.ctrl-label { 
    font-size: .7rem; 
    font-weight: 600; 
    text-transform: uppercase; 
    letter-spacing: .05em; 
    color: #94a3b8; 
    margin-bottom: .1rem; 
}
label { 
    font-size: .8rem; 
    display: flex; 
    align-items: center; 
    gap: .3rem; 
    cursor: pointer; 
}
.al-preview {
    display: flex;
    background: #f1f5f9; 
    border-radius: 8px;
    height: 120px; 
    padding: .5rem;
}
.al-item { 
    background: #6366f1; 
    color: white; 
    border-radius: 6px; 
    padding: .5rem .75rem; 
    font-size: .8rem; 
    font-weight: 600; 
}
.al-item:nth-child(2) { 
    height: 3.5rem; 
    align-self: auto; 
}
```
```js:script.js
document.querySelectorAll('input[name=jc2]').forEach(r => {
    r.addEventListener('change', () => {
        document.getElementById('al-preview').style.justifyContent = r.value
    })
});
document.querySelectorAll('input[name=ai2]').forEach(r => {
    r.addEventListener('change', () => {
        document.getElementById('al-preview').style.alignItems = r.value
    })
});
```


```css
.container {
    display: flex;
    justify-content: center;  /* flex-start | center | flex-end | space-between | space-around | space-evenly */
    align-items:     center;  /* flex-start | center | flex-end | stretch | baseline */
}

/* override alignment for a single item */
.special { align-self: flex-start; }

/* center anything in one line */
.center-everything { display: flex; justify-content: center; align-items: center; }
```

---

## 04. Grid — Basics

CSS Grid is two-dimensional: rows _and_ columns at once. The `fr` unit distributes leftover space proportionally. `repeat()` avoids repetition.

```html:index.html
<div class="grid-container">
    <div class="grid-item">Header (spans all columns)</div>
    <div class="grid-item">1</div>
    <div class="grid-item">2</div>
    <div class="grid-item">3</div>
</div>
```
```css:style.css
.grid-container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
}
.grid-item {
    background: #a855f7;
    color: white;
    padding: 1.5rem;
    border-radius: 6px;
    font-weight: 600;
    text-align: center;
}
.grid-item:nth-child(1) { 
    grid-column: 1 / -1; 
}
```



```css
.grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;          /* 3 equal columns */
    grid-template-columns: repeat(3, 1fr);        /* same thing */
    grid-template-columns: 200px 1fr;             /* fixed + fluid */
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); /* responsive */
    gap: 16px;
}
```

---

## 05. Grid — Placement & Areas

Items can span multiple cells with `grid-column` and `grid-row`. Named `grid-template-areas` create a visual ASCII-art map of your layout.

```html:index.html
<div class="ga-grid">
    <div class="ga-area ga-header">header</div>
    <div class="ga-area ga-sidebar">sidebar</div>
    <div class="ga-area ga-main">main</div>
    <div class="ga-area ga-footer">footer</div>
</div>
```
```css:style.css
.ga-grid {
    display: grid;
    grid-template-columns: 140px 1fr;
    grid-template-rows: 48px 1fr 40px;
    grid-template-areas:
        "header  header"
        "sidebar main"
        "footer  footer";
    gap: 6px; height: 200px;
}
.ga-area { border-radius: 6px; 
    display: flex; 
    align-items: center; 
    justify-content: center; 
    font-size: .75rem; 
    font-weight: 600; 
    color: white; 
    font-family: monospace; 
}
.ga-header  { 
    grid-area: header; 
    background: #6366f1; 
}
.ga-sidebar { 
    grid-area: sidebar; 
    background: #818cf8; 
}
.ga-main    { 
    grid-area: main; 
    background: #a5b4fc; 
    color: #1e1b4b; 
}
.ga-footer  { 
    grid-area: footer; 
    background: #c7d2fe; 
    color: #1e1b4b; 
}
```


```css
.layout {
    display: grid;
    grid-template-columns: 200px 1fr;
    grid-template-rows:    60px 1fr 60px;
    grid-template-areas:
        "header  header"
        "sidebar main"
        "footer  footer";
    gap: 8px;
}

.header  { grid-area: header; }
.sidebar { grid-area: sidebar; }
.main    { grid-area: main; }
.footer  { grid-area: footer; }

/* manual placement */
.hero { grid-column: 1 / 3; }     /* spans columns 1 and 2 */
.wide { grid-column: 1 / -1; }    /* spans all columns */
.tall { grid-row: 1 / span 2; }   /* spans 2 rows */
```

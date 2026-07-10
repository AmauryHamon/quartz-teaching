---
title: Interactive Demo Test
draft: false
tags:
  - test
---

Test note for the `interactive` fenced code block.

```interactive
<button id="btn">Click me</button>
<p id="out">0</p>
<style>
  #btn { padding: 0.5rem 1rem; font-size: 1rem; }
</style>
<script>
  let count = 0
  document.getElementById("btn").addEventListener("click", () => {
    count++
    document.getElementById("out").textContent = count
  })
</script>
```
test

```html:index.html
<h1>Hi</h1>
<link rel="stylesheet" href="style.css">
<script src="script.js"></script>
```
```css:style.css
h1 { color: teal; }
```
```js:script.js
console.log("hi")
```
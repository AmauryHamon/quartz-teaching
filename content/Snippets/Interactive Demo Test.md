---
title: Interactive Demo Test
draft: true
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

Fullscreen is opt-in per embed: append `:fullscreen` to one fence's language token
(any file in a group, or the `interactive` block itself) to show a fullscreen toggle
button next to the tabs. Leave it off and no button appears.

```interactive:fullscreen
<button id="btn2">Click me</button>
<p id="out2">0</p>
<script>
  let n = 0
  document.getElementById("btn2").addEventListener("click", () => {
    n++
    document.getElementById("out2").textContent = n
  })
</script>
```
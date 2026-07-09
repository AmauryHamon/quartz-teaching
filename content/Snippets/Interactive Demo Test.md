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

---
title: Dark Mode
draft: false
tags:
  - initié
  - snippet
  - HTML
  - CSS
  - JS
  - Component
---

# Pseudocode

## Style

- Using `color-scheme: light-dark;` in `:root` [MDN: color-scheme](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/color-scheme)
- Using CSS variables in `:root` named with semantic tokens (e.g. `--bg`, `--text`, etc.), 
- Using `light-dark()` values for CSS Variables. [MDN: light-dark()](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/light-dark)
- Using `[data-theme]` custom attribute for theme override

## Features
- Respect system preference by default (`prefers-color-scheme`) [MDN: prefers-color-scheme](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/prefers-color-scheme)
- Inline script: Avoid flash of wrong theme on page reload
- Persistence: Save preferred user theme in `localStorage`
- A toggle button to switch theme


> [!warning]
> If color-scheme is not defined in `:root`, theme will always fall back to `light`.


> [!tip] Avoiding flash of wrong theme on page reload
> Instead of placing this in our main JS file, we need to set a tiny script inline script in the HTML `<head>` before the body parses. 
> ```html
> <script>
>    (()=>{
>        const saved = localStorage.getItem("theme");
>        const prefers = matchMedia("(prefers-color-scheme: dark)").matches;
>        const theme = saved ?? (prefers ? "dark" : "light");
>        document.documentElement.setAttribute("data-theme", theme);
>    })();
> </script>
> ```

> [!tip] Avoiding transition of theme colors
> This is expansive, only do on the body background at max.


> [!info]
> The following works for theme preferrence on a single device. In order to sync preference across multiple devices, we simply need to log theme elsewhere than in localStorage, i.e into a user profile database for example.



# Demo

```html:index.html
<head>
    <script>
    (()=>{
        const saved = localStorage.getItem("theme");
        const prefers = matchMedia("(prefers-color-scheme: dark)").matches;
        const theme = saved ?? (prefers ? "dark" : "light");
        document.documentElement.setAttribute("data-theme", theme);
    })();
    </script>
</head>
<body>
    <h1>Title</h1>
    <p class="hero-sub">
        Click the toggle. Reload. No flash. Resize. Open DevTools, change the
        OS theme. Everything updates. <strong>This is the whole system.</strong>
    </p>
    <button class="theme-toggle" id="themeToggle" aria-label="Toggle theme">
        <span class="toggle-light">Light</span>
        <span class="toggle-dark">Dark</span>
    </button>

</body>
```
```css:style.css
:root {
    /* inform browser this page support both themes. */
    /* If not defined, light-dark() values default to light */
    /* Bonus: this allows native form controls to pickup dark theme */
    color-scheme: light dark;

    /* Semantic tokens */
    --bg:   light-dark (#f5f5f5, #111111);
    --text: light-dark (#111111, #f5f5f5);
    /* add any other tokens needed  */
}

/* Manual override based on user input */
:root[data-theme="light"] {
    color-scheme: light;
    --bg:   #f5f5f5;
    --text: #111111;
    /* override any other tokens defined above */
}
:root[data-theme="dark"] {
    color-scheme: dark;
    --bg:   #111111;
    --text: #f5f5f5;
    /* override any other tokens defined above */
}

html, body {
    background: var(--bg);
    color: var(--text);
    min-height: 400px;
    transition: background-color 300ms ease, color 300ms ease;
}

:root[data-theme="light"] .toggle-light, :root[data-theme="dark"] .toggle-dark {
    display: none;
}
:root[data-theme="light"] .toggle-dark, :root[data-theme="dark"] .toggle-light  {
    display: inline;
}
  
```
```js:script.js
const toggle = document.getElementById("themeToggle");

toggle.addEventListener("click", () => {
  const current = document.documentElement.getAttribute("data-theme");
  const next = current === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", next);
  localStorage.setItem("theme", next);
});
```

# Further Resources

Discovered this method from Pixel Grid UI's YouTube Channel: [CSS Dark Mode Done Right](https://www.youtube.com/watch?v=k6fXi6G6Zow)
---
title: Responsive Menu
draft: false
tags:
  - initié
  - snippet
  - HTML
  - CSS
  - JS
  - Component
---

A horizontal nav that collapses behind a hamburger button on narrow screens.

# Pseudocode

## Structure

- A `<nav>` with a logo, a `<ul>` of links, and a hamburger `<button>` that's only meaningful below a breakpoint.

## Style

- Above the breakpoint, the link list is a row and the hamburger is hidden. Below it, the hamburger shows and the link list is hidden until toggled — then it drops down as a full-width panel.

## Features

- The hamburger toggles a class on the link list; CSS, scoped to the same breakpoint, decides what that class actually does.
- Clicking a link closes the open menu too — otherwise it's still open, invisibly, the next time the visitor opens it.

# Basic responsive menu

Uses a `@container` query rather than `@media`, exactly like the breadcrumb note, so the collapse depends on the width of `.menu-container` rather than the browser window — the wrapper is pinned to `340px` here purely so the collapsed state is always visible in this preview; in a real page, `container-type` would just live on whatever element actually wraps the nav.

```html:index.html
<div class="menu-container" style="max-width:340px">
    <nav class="menu" id="rm-nav">
        <span class="menu-logo">Acme</span>
        <button class="menu-toggle" id="rm-toggle" aria-label="Toggle menu" aria-expanded="false">
            <span></span><span></span><span></span>
        </button>
        <ul class="menu-links" id="rm-links">
            <li><a href="#">Home</a></li>
            <li><a href="#">Shop</a></li>
            <li><a href="#">About</a></li>
            <li><a href="#">Contact</a></li>
        </ul>
    </nav>
</div>
```

```css:style.css
.menu-container {
    container-type: inline-size;
    border: 1px dashed #e2e8f0;
}

.menu {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.75rem 1rem;
    border-bottom: 1px solid #e2e8f0;
    position: relative;
}

.menu-logo {
    font-weight: 700;
    color: #1e293b;
}

.menu-toggle {
    display: none;
    flex-direction: column;
    gap: 0.25rem;
    width: 1.6rem;
    border: none;
    background: none;
    cursor: pointer;
    padding: 0;
}

.menu-toggle span {
    height: 2px;
    background: #1e293b;
    border-radius: 1px;
}

.menu-links {
    display: flex;
    gap: 1.2rem;
    list-style: none;
    margin: 0;
    padding: 0;
}

.menu-links a {
    text-decoration: none;
    color: #334155;
    font-size: 0.85rem;
}

@container (max-width: 360px) {
    .menu-toggle {
        display: flex;
    }

    .menu-links {
        display: none;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        flex-direction: column;
        gap: 0;
        background: white;
        border-bottom: 1px solid #e2e8f0;
        padding: 0.5rem 0;
    }

    .menu-links.open {
        display: flex;
    }

    .menu-links a {
        padding: 0.6rem 1rem;
    }
}
```

```js:script.js
const toggle = document.getElementById("rm-toggle");
const links = document.getElementById("rm-links");

if (toggle && links) {
    toggle.onclick = () => {
        const isOpen = links.classList.toggle("open");
        toggle.setAttribute("aria-expanded", String(isOpen));
    };

    links.querySelectorAll("a").forEach((link) => {
        link.onclick = () => {
            links.classList.remove("open");
            toggle.setAttribute("aria-expanded", "false");
        };
    });
}
```

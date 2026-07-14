---
title: Breadcrumb
draft: false
tags:
  - initié
  - snippet
  - HTML
  - CSS
  - Component
---

A trail of links showing where the current page sits in a hierarchy. Pure HTML and CSS — no JS at all, even for the responsive version.

[MDN: Breadcrumbs](https://developer.mozilla.org/fr/docs/Web/CSS/Layout_cookbook/Breadcrumb_Navigation)

# Pseudocode

## Structure

- A `<nav aria-label="Breadcrumb">` wraps an ordered list (`<ol>`) — order matters here, it's a path, so `<ol>` is the more correct choice than `<ul>`.
- Every step is a link except the last one, which is the current page: plain text, marked `aria-current="page"`.

## Style

- Separators (`/`, `›`, …) are generated in CSS (`::before` on every item except the first) rather than typed into the HTML, so a screen reader doesn't read "slash" or "chevron" between every step.
- Long trails need to collapse on narrow screens — hiding the middle steps behind an ellipsis is the common pattern.

## Features

- None needed for the base version.
- Collapsing the middle steps on a narrow container can be done with a CSS container query alone — no JS needed there either.

# Basic breadcrumb

```html:index.html
<nav aria-label="Breadcrumb">
    <ol class="breadcrumb">
        <li><a href="#">Store</a></li>
        <li><a href="#">Outerwear</a></li>
        <li><a href="#">Jackets</a></li>
        <li aria-current="page">Trailhead Jacket</li>
    </ol>
</nav>
```

```css:style.css
.breadcrumb {
    display: flex;
    flex-wrap: wrap;
    gap: 0.35rem;
    margin: 0;
    padding: 0;
    list-style: none;
    font-size: 0.85rem;
}

.breadcrumb li {
    display: flex;
    align-items: center;
    gap: 0.35rem;
    color: #64748b;
}

.breadcrumb li:not(:first-child)::before {
    content: "›";
    color: #cbd5e1;
}

.breadcrumb a {
    color: #6366f1;
    text-decoration: none;
}

.breadcrumb a:hover {
    text-decoration: underline;
}

.breadcrumb li[aria-current="page"] {
    color: #1e293b;
    font-weight: 600;
}
```

# Breadcrumb that collapses in a narrow container

A regular `@media` query only responds to the *browser window's* size — not useful here, since the same breadcrumb might sit in a wide header on one page and a narrow sidebar on another. A `@container` query responds to the size of a containing element instead: mark an ancestor with `container-type: inline-size`, and `@container (max-width: ...)` inside it reacts to *that* element's width. Below, the exact same markup is dropped into a 500px and a 220px container to show both states side by side, without needing to actually resize anything.

The ellipsis is its own `<li>`, hidden by default — simpler than trying to style a `::before`/`::after` on an element that's itself `display: none`, since a hidden element's pseudo-elements never render.

```html:index.html
<div class="breadcrumb-demo">
    <p class="breadcrumb-label">500px container</p>
    <div class="breadcrumb-container" style="max-width:500px">
        <nav aria-label="Breadcrumb">
            <ol class="breadcrumb">
                <li><a href="#">Store</a></li>
                <li class="breadcrumb-ellipsis" aria-hidden="true">…</li>
                <li class="breadcrumb-collapse"><a href="#">Outerwear</a></li>
                <li class="breadcrumb-collapse"><a href="#">Jackets</a></li>
                <li class="breadcrumb-collapse"><a href="#">Shells</a></li>
                <li aria-current="page">Trailhead Jacket</li>
            </ol>
        </nav>
    </div>
    <p class="breadcrumb-label">220px container</p>
    <div class="breadcrumb-container" style="max-width:220px">
        <nav aria-label="Breadcrumb">
            <ol class="breadcrumb">
                <li><a href="#">Store</a></li>
                <li class="breadcrumb-ellipsis" aria-hidden="true">…</li>
                <li class="breadcrumb-collapse"><a href="#">Outerwear</a></li>
                <li class="breadcrumb-collapse"><a href="#">Jackets</a></li>
                <li class="breadcrumb-collapse"><a href="#">Shells</a></li>
                <li aria-current="page">Trailhead Jacket</li>
            </ol>
        </nav>
    </div>
</div>
```

```css:style.css
.breadcrumb-demo {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
}

.breadcrumb-label {
    margin: 0.5rem 0 0;
    font-family: monospace;
    font-size: 0.7rem;
    color: #94a3b8;
}

.breadcrumb-container {
    container-type: inline-size;
}

.breadcrumb {
    display: flex;
    flex-wrap: wrap;
    gap: 0.35rem;
    margin: 0;
    padding: 0;
    list-style: none;
    font-size: 0.85rem;
}

.breadcrumb li {
    display: flex;
    align-items: center;
    gap: 0.35rem;
    color: #64748b;
    white-space: nowrap;
}

.breadcrumb li:not(:first-child)::before {
    content: "›";
    color: #cbd5e1;
}

.breadcrumb a {
    color: #6366f1;
    text-decoration: none;
}

.breadcrumb a:hover {
    text-decoration: underline;
}

.breadcrumb li[aria-current="page"] {
    color: #1e293b;
    font-weight: 600;
}

.breadcrumb-ellipsis {
    display: none;
}

@container (max-width: 260px) {
    .breadcrumb-collapse {
        display: none;
    }

    .breadcrumb-ellipsis {
        display: flex;
    }
}
```

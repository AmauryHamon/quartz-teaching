---
title: Button
draft: false
tags:
  - initié
  - snippet
  - HTML
  - CSS
  - JS
  - Component
---

Buttons carry more state than they look like they do — variants, sizes, disabled, and (the one part that needs JS) a loading state for actions that take time.

# Pseudocode

## Structure

- A single `<button>` (or `<a class="btn">` when it navigates instead of acting) — classes control everything else, the element stays the same.

## Style

- A base `.btn` class for the shared shape and spacing, then modifier classes (`.btn-primary`, `.btn-outline`, `.btn-sm`/`.btn-lg`) that only touch color or size — the classic "base + modifier" pattern.
- `:disabled` needs its own dimmed, no-cursor styling; the browser's default disabled look is barely noticeable.

## Features

- Variants and sizes are pure CSS.
- A "loading" state (spinner + disabled, so a slow action can't be double-submitted) needs a little JS to toggle it on click and back off once the action resolves.

# Button variants

```html:index.html
<div class="btn-row">
    <button class="btn btn-primary">Primary</button>
    <button class="btn btn-secondary">Secondary</button>
    <button class="btn btn-outline">Outline</button>
    <button class="btn btn-ghost">Ghost</button>
    <button class="btn btn-primary" disabled>Disabled</button>
</div>
<div class="btn-row">
    <button class="btn btn-primary btn-sm">Small</button>
    <button class="btn btn-primary">Medium</button>
    <button class="btn btn-primary btn-lg">Large</button>
</div>
```

```css:style.css
.btn-row {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    flex-wrap: wrap;
    margin-bottom: 0.6rem;
}

.btn {
    padding: 0.5rem 1rem;
    border-radius: 6px;
    border: 1px solid transparent;
    font-size: 0.85rem;
    font-weight: 600;
    cursor: pointer;
}

.btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

.btn-primary {
    background: #6366f1;
    color: white;
}

.btn-secondary {
    background: #1e293b;
    color: white;
}

.btn-outline {
    background: none;
    border-color: #6366f1;
    color: #6366f1;
}

.btn-ghost {
    background: none;
    color: #6366f1;
}

.btn-ghost:hover {
    background: #eef2ff;
}

.btn-sm {
    padding: 0.3rem 0.7rem;
    font-size: 0.75rem;
}

.btn-lg {
    padding: 0.7rem 1.3rem;
    font-size: 0.95rem;
}
```

# Button with a loading state

Clicking disables the button and swaps its label for a spinner + "Saving…", so a slow action can't fire twice. The `setTimeout` here stands in for a real request — swap it for whatever `await fetch(...)` resolves.

```html:index.html
<button class="btn btn-primary" id="lb-btn">
    <span class="btn-spinner" id="lb-spinner" hidden></span>
    <span id="lb-label">Save changes</span>
</button>
```

```css:style.css
.btn {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    border-radius: 6px;
    border: none;
    font-size: 0.85rem;
    font-weight: 600;
    cursor: pointer;
}

.btn:disabled {
    opacity: 0.7;
    cursor: default;
}

.btn-primary {
    background: #6366f1;
    color: white;
}

.btn-spinner {
    width: 0.9rem;
    height: 0.9rem;
    border: 2px solid rgba(255, 255, 255, 0.4);
    border-top-color: white;
    border-radius: 50%;
    animation: btn-spin 0.6s linear infinite;
}

@keyframes btn-spin {
    to {
        transform: rotate(360deg);
    }
}
```

```js:script.js
const btn = document.getElementById("lb-btn");
const spinner = document.getElementById("lb-spinner");
const label = document.getElementById("lb-label");

if (btn && spinner && label) {
    btn.onclick = () => {
        btn.disabled = true;
        spinner.hidden = false;
        label.textContent = "Saving…";

        // stand-in for a real request — swap this for a fetch() in practice
        setTimeout(() => {
            btn.disabled = false;
            spinner.hidden = true;
            label.textContent = "Save changes";
        }, 1500);
    };
}
```

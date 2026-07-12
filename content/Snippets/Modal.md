---
title: Modal
draft: false
tags:
  - initié
  - snippet
  - HTML
  - CSS
  - JS
  - Component
---

An overlay that grabs focus and blocks interaction with the rest of the page until it's dismissed. The native `<dialog>` element does most of the hard parts — focus trapping, Escape-to-close, a backdrop — for free.

# Pseudocode

## Structure

- `<dialog>` wraps the modal's content. Unlike everything else covered so far, it's invisible and inert until opened from JS — there's no pure-CSS way to open one.

## Style

- The browser renders an open `<dialog>` centered on top of everything, with a `::backdrop` pseudo-element covering the rest of the page — both are stylable.

## Features

- `dialog.showModal()` opens it (and traps focus, and blocks the rest of the page); `dialog.close()` closes it.
- Escape already closes it natively. Clicking the backdrop doesn't, by default — that's a couple of lines of JS, checking whether the click landed on the `<dialog>` element itself or inside its content.
- A `<form method="dialog">` inside it closes the dialog on submit with *no JS at all*, and records which button was clicked.

# Basic modal (native `<dialog>`)

```html:index.html
<button class="btn" id="md-open">Delete item</button>

<dialog class="modal" id="md-dialog">
    <h3 class="modal-title">Delete this item?</h3>
    <p class="modal-text">This can't be undone.</p>
    <div class="modal-actions">
        <button class="btn btn-ghost" id="md-cancel">Cancel</button>
        <button class="btn btn-danger" id="md-confirm">Delete</button>
    </div>
</dialog>
```

```css:style.css
.btn {
    padding: 0.5rem 1rem;
    border-radius: 6px;
    border: none;
    font-size: 0.85rem;
    font-weight: 600;
    cursor: pointer;
}

.btn-ghost {
    background: none;
    color: #64748b;
}

.btn-danger {
    background: #ef4444;
    color: white;
}

.modal {
    border: none;
    border-radius: 10px;
    padding: 1.25rem;
    max-width: 20rem;
    box-shadow: 0 20px 40px rgba(15, 23, 42, 0.2);
}

.modal::backdrop {
    background: rgba(15, 23, 42, 0.5);
}

.modal-title {
    margin: 0 0 0.4rem;
    font-size: 1rem;
    color: #1e293b;
}

.modal-text {
    margin: 0 0 1rem;
    font-size: 0.85rem;
    color: #64748b;
}

.modal-actions {
    display: flex;
    justify-content: flex-end;
    gap: 0.5rem;
}
```

```js:script.js
const openBtn = document.getElementById("md-open");
const dialog = document.getElementById("md-dialog");
const cancelBtn = document.getElementById("md-cancel");
const confirmBtn = document.getElementById("md-confirm");

if (openBtn && dialog && cancelBtn && confirmBtn) {
    openBtn.onclick = () => dialog.showModal(); // traps focus and blocks the page, for free
    cancelBtn.onclick = () => dialog.close();
    confirmBtn.onclick = () => dialog.close();

    dialog.addEventListener("click", (e) => {
        if (e.target === dialog) dialog.close(); // click landed on the backdrop, not the content
    });
}
```

# Modal with a form (native close, no handler JS)

`<form method="dialog">` closes its `<dialog>` on submit by itself — any button inside it (they default to `type="submit"`) closes the dialog *without any JS*, and sets `dialog.returnValue` to whichever button's `value` was clicked. JS is only needed to open the dialog and to read the result afterward, via the dialog's `close` event.

```html:index.html
<button class="btn" id="mf-open">Rename item</button>
<p class="modal-result" id="mf-result"></p>

<dialog class="modal" id="mf-dialog">
    <form method="dialog" class="modal-form">
        <h3 class="modal-title">Rename item</h3>
        <input class="modal-input" name="itemName" value="Trailhead Jacket" autofocus />
        <div class="modal-actions">
            <button class="btn btn-ghost" value="cancel">Cancel</button>
            <button class="btn btn-primary" value="confirm">Save</button>
        </div>
    </form>
</dialog>
```

```css:style.css
.btn {
    padding: 0.5rem 1rem;
    border-radius: 6px;
    border: none;
    font-size: 0.85rem;
    font-weight: 600;
    cursor: pointer;
}

.btn-ghost {
    background: none;
    color: #64748b;
}

.btn-primary {
    background: #6366f1;
    color: white;
}

.modal {
    border: none;
    border-radius: 10px;
    padding: 1.25rem;
    max-width: 20rem;
    box-shadow: 0 20px 40px rgba(15, 23, 42, 0.2);
}

.modal::backdrop {
    background: rgba(15, 23, 42, 0.5);
}

.modal-title {
    margin: 0 0 0.6rem;
    font-size: 1rem;
    color: #1e293b;
}

.modal-input {
    width: 100%;
    box-sizing: border-box;
    padding: 0.5rem 0.6rem;
    border: 1px solid #e2e8f0;
    border-radius: 6px;
    font-size: 0.85rem;
    margin-bottom: 1rem;
}

.modal-actions {
    display: flex;
    justify-content: flex-end;
    gap: 0.5rem;
}

.modal-result {
    font-size: 0.85rem;
    color: #64748b;
}
```

```js:script.js
const openBtn = document.getElementById("mf-open");
const dialog = document.getElementById("mf-dialog");
const result = document.getElementById("mf-result");

if (openBtn && dialog && result) {
    openBtn.onclick = () => dialog.showModal();

    dialog.addEventListener("click", (e) => {
        if (e.target === dialog) dialog.close("cancel");
    });

    // form method="dialog" closes the dialog on its own — no JS needed for that part.
    // it also sets dialog.returnValue to whichever button's `value` was clicked.
    dialog.addEventListener("close", () => {
        result.textContent = dialog.returnValue === "confirm" ? "Renamed." : "Cancelled — nothing changed.";
    });
}
```

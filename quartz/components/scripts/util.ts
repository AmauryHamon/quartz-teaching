export function registerEscapeHandler(outsideContainer: HTMLElement | null, cb: () => void) {
  if (!outsideContainer) return
  function click(this: HTMLElement, e: HTMLElementEventMap["click"]) {
    if (e.target !== this) return
    e.preventDefault()
    cb()
  }

  function esc(e: HTMLElementEventMap["keydown"]) {
    if (!e.key.startsWith("Esc")) return
    e.preventDefault()
    cb()
  }

  outsideContainer?.removeEventListener("click", click)
  outsideContainer?.addEventListener("click", click)
  document.removeEventListener("keydown", esc)
  document.addEventListener("keydown", esc)
}

export function registerCloseHandler(container: HTMLElement | null, cb: () => void) {
  if (!container) return;
  function clickInsideOrOnChild(e: MouseEvent) {
    // Check if the click target is the container itself or a child element
    if (container.contains(e.target as Node)) {
      e.preventDefault();
      // Check if the click is a double-click (button === 0 indicates a left-click)
      // if (e.detail === 2 && e.button === 0) {
      //   // Double-click detected; do not close the container
      //   return;
      // }
      cb();
    }
  }

  function esc(e: HTMLElementEventMap["keydown"]) {
    if (!e.key.startsWith("Esc")) return
    e.preventDefault()
    cb()
  }
  document.removeEventListener("keydown", esc)
  document.addEventListener("keydown", esc)
  container.removeEventListener("click", clickInsideOrOnChild);
  container.addEventListener("click", clickInsideOrOnChild);
}

export function removeAllChildren(node: HTMLElement) {
  while (node.firstChild) {
    node.removeChild(node.firstChild)
  }
}

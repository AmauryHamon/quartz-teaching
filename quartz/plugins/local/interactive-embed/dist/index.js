// Hand-authored (no build step): turns ```interactive fenced code blocks into
// a Preview/Code tab widget so HTML/CSS/JS snippets can run inline in notes
// while still showing the source that produced them. Runs before the
// syntax-highlighting transformer (order 15 < 20): the preview iframe is
// fully assembled before rehype-pretty-code ever sees the node, but the
// injected code panel is a normal `pre>code` block, so rehype-pretty-code
// still highlights it (and the clipboard-copy button still attaches to it).

const LANGUAGE_CLASS = "language-interactive"
const MESSAGE_TYPE = "quartz-interactive-resize"

const defaultOptions = {
  defaultHeight: 400,
}

const resizeScript = `
window.addEventListener("message", function (event) {
  if (!event.data || event.data.type !== ${JSON.stringify(MESSAGE_TYPE)}) return
  var frames = document.getElementsByClassName("interactive-embed-frame")
  for (var i = 0; i < frames.length; i++) {
    var frame = frames[i]
    if (frame instanceof HTMLIFrameElement && frame.contentWindow === event.source) {
      frame.style.height = event.data.height + "px"
    }
  }
})
`

const tabsScript = `
function setupInteractiveEmbedTabs() {
  var containers = document.getElementsByClassName("interactive-embed")
  for (var i = 0; i < containers.length; i++) {
    ;(function (container) {
      var buttons = container.querySelectorAll(".interactive-embed-tab")
      for (var j = 0; j < buttons.length; j++) {
        ;(function (button) {
          var onClick = function () {
            var tab = button.getAttribute("data-tab")
            var allButtons = container.querySelectorAll(".interactive-embed-tab")
            for (var k = 0; k < allButtons.length; k++) allButtons[k].classList.remove("is-active")
            button.classList.add("is-active")
            var allPanels = container.querySelectorAll(".interactive-embed-panel")
            for (var k = 0; k < allPanels.length; k++) {
              allPanels[k].classList.toggle("is-active", allPanels[k].getAttribute("data-panel") === tab)
            }
          }
          button.addEventListener("click", onClick)
          window.addCleanup(function () {
            button.removeEventListener("click", onClick)
          })
        })(buttons[j])
      }
    })(containers[i])
  }
}
document.addEventListener("nav", setupInteractiveEmbedTabs)
document.addEventListener("render", setupInteractiveEmbedTabs)
`

function embedStyle(defaultHeight) {
  return `
.interactive-embed {
  margin: 1.5rem 0;
  border: 1px solid var(--lightgray);
  border-radius: 4px;
  overflow: hidden;
}
.interactive-embed .interactive-embed-tabs {
  display: flex;
  gap: 0.25rem;
  padding: 0.375rem 0.5rem;
  border-bottom: 1px solid var(--lightgray);
  background: var(--light);
}
.interactive-embed .interactive-embed-tab {
  font: inherit;
  font-size: 0.85rem;
  padding: 0.25rem 0.75rem;
  border: 1px solid transparent;
  border-radius: 4px;
  background: transparent;
  color: var(--gray);
  cursor: pointer;
}
.interactive-embed .interactive-embed-tab.is-active {
  background: var(--lightgray);
  color: var(--dark);
}
.interactive-embed .interactive-embed-panel {
  display: none;
}
.interactive-embed .interactive-embed-panel.is-active {
  display: block;
}
.interactive-embed .interactive-embed-panel pre {
  margin: 0;
  border-radius: 0;
}
.interactive-embed .interactive-embed-frame {
  display: block;
  width: 100%;
  height: ${defaultHeight}px;
  border: none;
  background: white;
}
`
}

function getCodeText(node) {
  let text = ""
  for (const child of node.children) {
    if (child.type === "text") text += child.value
  }
  return text
}

function buildSrcDoc(source) {
  return `<!doctype html>
<html>
<head>
<meta charset="utf-8" />
<style>html,body{margin:0;padding:0.75rem;font-family:system-ui,sans-serif;}</style>
</head>
<body>
${source}
<script>
function reportHeight() {
  parent.postMessage({ type: ${JSON.stringify(MESSAGE_TYPE)}, height: document.documentElement.scrollHeight }, "*")
}
new ResizeObserver(reportHeight).observe(document.body)
window.addEventListener("load", reportHeight)
<\/script>
</body>
</html>`
}

function isInteractiveCodeBlock(node) {
  if (!node || node.type !== "element" || node.tagName !== "pre") return false
  const code = node.children[0]
  if (!code || code.type !== "element" || code.tagName !== "code") return false
  const classNames = code.properties?.className ?? []
  return Array.isArray(classNames) && classNames.includes(LANGUAGE_CLASS)
}

function replaceInteractiveBlocks(tree) {
  const visit = (node) => {
    const children = node.children
    if (!children) return
    for (let i = 0; i < children.length; i++) {
      const child = children[i]
      if (isInteractiveCodeBlock(child)) {
        const code = child.children[0]
        const source = getCodeText(code)
        children[i] = {
          type: "element",
          tagName: "div",
          properties: { className: ["interactive-embed"] },
          children: [
            {
              type: "element",
              tagName: "div",
              properties: { className: ["interactive-embed-tabs"] },
              children: [
                {
                  type: "element",
                  tagName: "button",
                  properties: {
                    type: "button",
                    className: ["interactive-embed-tab", "is-active"],
                    dataTab: "preview",
                  },
                  children: [{ type: "text", value: "Preview" }],
                },
                {
                  type: "element",
                  tagName: "button",
                  properties: { type: "button", className: ["interactive-embed-tab"], dataTab: "code" },
                  children: [{ type: "text", value: "Code" }],
                },
              ],
            },
            {
              type: "element",
              tagName: "div",
              properties: { className: ["interactive-embed-panel", "is-active"], dataPanel: "preview" },
              children: [
                {
                  type: "element",
                  tagName: "iframe",
                  properties: {
                    className: ["interactive-embed-frame"],
                    srcDoc: buildSrcDoc(source),
                    sandbox: "allow-scripts allow-forms allow-modals allow-popups",
                    loading: "lazy",
                  },
                  children: [],
                },
              ],
            },
            {
              type: "element",
              tagName: "div",
              properties: { className: ["interactive-embed-panel"], dataPanel: "code" },
              children: [
                {
                  type: "element",
                  tagName: "pre",
                  properties: {},
                  children: [
                    {
                      type: "element",
                      tagName: "code",
                      properties: { className: ["language-html"] },
                      children: [{ type: "text", value: source }],
                    },
                  ],
                },
              ],
            },
          ],
        }
        continue
      }
      visit(child)
    }
  }
  visit(tree)
}

export const InteractiveEmbed = (userOpts) => {
  const opts = { ...defaultOptions, ...userOpts }

  return {
    name: "InteractiveEmbed",
    htmlPlugins() {
      return [() => (tree) => replaceInteractiveBlocks(tree)]
    },
    externalResources() {
      return {
        js: [
          {
            script: resizeScript,
            loadTime: "afterDOMReady",
            contentType: "inline",
          },
          {
            script: tabsScript,
            loadTime: "afterDOMReady",
            contentType: "inline",
          },
        ],
        css: [
          {
            content: embedStyle(opts.defaultHeight),
            inline: true,
          },
        ],
      }
    },
  }
}

export default InteractiveEmbed

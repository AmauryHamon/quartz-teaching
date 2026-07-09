// Hand-authored (no build step): turns ```interactive fenced code blocks (or
// a run of ```lang:filename fenced code blocks, e.g. ```html:index.html,
// ```css:style.css, ```js:script.js) into a Preview/file-tabs widget so
// HTML/CSS/JS snippets can run inline in notes while still showing the
// source that produced them. Runs before the syntax-highlighting transformer
// (order 15 < 20): the preview iframe is fully assembled before
// rehype-pretty-code ever sees the node, but the injected code panels are
// normal `pre>code` blocks, so rehype-pretty-code still highlights them (and
// the clipboard-copy button still attaches to them).

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
  flex-wrap: wrap;
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

function escapeRegExp(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
}

function buildSrcDoc({ body, headExtra = "", bodyAppend = "" }) {
  return `<!doctype html>
<html>
<head>
<meta charset="utf-8" />
<style>html,body{margin:0;padding:0.75rem;font-family:system-ui,sans-serif;}</style>
${headExtra}
</head>
<body>
${body}
${bodyAppend}
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

// Matches fenced blocks written as ```html:index.html, ```css:style.css, ```js:script.js
const FILE_BLOCK_PATTERN = /^language-([a-z0-9]+):(.+)$/i

function parseFileBlock(node) {
  if (!node || node.type !== "element" || node.tagName !== "pre") return null
  const code = node.children[0]
  if (!code || code.type !== "element" || code.tagName !== "code") return null
  const classNames = code.properties?.className ?? []
  if (!Array.isArray(classNames)) return null
  for (const className of classNames) {
    const match = FILE_BLOCK_PATTERN.exec(className)
    if (match) {
      return { lang: match[1].toLowerCase(), filename: match[2], source: getCodeText(code) }
    }
  }
  return null
}

// remark-rehype (with allowDangerousHtml) inserts a whitespace-only text node between
// every pair of block-level siblings, so "consecutive" blocks aren't literally adjacent
// array entries — this skips over those separators when looking for the next file block.
function isWhitespaceText(node) {
  return !!node && node.type === "text" && (!node.value || node.value.trim() === "")
}

// Consecutive ```lang:filename blocks starting at startIndex are treated as one group.
function collectFileGroup(children, startIndex) {
  const first = parseFileBlock(children[startIndex])
  if (!first) return null
  const files = [first]
  let endIndex = startIndex
  let i = startIndex + 1
  while (i < children.length) {
    if (isWhitespaceText(children[i])) {
      i++
      continue
    }
    const next = parseFileBlock(children[i])
    if (!next) break
    files.push(next)
    endIndex = i
    i++
  }
  return { files, endIndex }
}

function buildTabButton(dataTab, label, isActive) {
  return {
    type: "element",
    tagName: "button",
    properties: {
      type: "button",
      className: isActive ? ["interactive-embed-tab", "is-active"] : ["interactive-embed-tab"],
      dataTab,
    },
    children: [{ type: "text", value: label }],
  }
}

function buildCodePanel(dataPanel, lang, source) {
  return {
    type: "element",
    tagName: "div",
    properties: { className: ["interactive-embed-panel"], dataPanel },
    children: [
      {
        type: "element",
        tagName: "pre",
        properties: {},
        children: [
          {
            type: "element",
            tagName: "code",
            properties: { className: [`language-${lang}`] },
            children: [{ type: "text", value: source }],
          },
        ],
      },
    ],
  }
}

function buildPreviewPanel(srcDoc) {
  return {
    type: "element",
    tagName: "div",
    properties: { className: ["interactive-embed-panel", "is-active"], dataPanel: "preview" },
    children: [
      {
        type: "element",
        tagName: "iframe",
        properties: {
          className: ["interactive-embed-frame"],
          srcDoc,
          sandbox: "allow-scripts allow-forms allow-modals allow-popups",
          loading: "lazy",
        },
        children: [],
      },
    ],
  }
}

function buildEmbedContainer(fileTabs, panels) {
  return {
    type: "element",
    tagName: "div",
    properties: { className: ["interactive-embed"] },
    children: [
      {
        type: "element",
        tagName: "div",
        properties: { className: ["interactive-embed-tabs"] },
        children: [buildTabButton("preview", "Preview", true), ...fileTabs],
      },
      ...panels,
    ],
  }
}

function buildLegacyEmbed(source) {
  return buildEmbedContainer(
    [buildTabButton("code", "Code", false)],
    [buildPreviewPanel(buildSrcDoc({ body: source })), buildCodePanel("code", "html", source)],
  )
}

// html files become the iframe body; css/js files are inlined into <style>/<script> so the
// preview works without real network requests, replacing any matching <link>/<script src> tags
// so notes can still reference "style.css" / "script.js" the way a real project would.
function buildFileGroupEmbed(files) {
  const htmlFiles = files.filter((f) => f.lang === "html")
  const cssFiles = files.filter((f) => f.lang === "css")
  const jsFiles = files.filter((f) => f.lang === "js")

  let body = htmlFiles.map((f) => f.source).join("\n")
  for (const f of cssFiles) {
    const linkPattern = new RegExp(`<link\\b[^>]*href=["']${escapeRegExp(f.filename)}["'][^>]*>`, "gi")
    body = body.replace(linkPattern, "")
  }
  for (const f of jsFiles) {
    const scriptPattern = new RegExp(
      `<script\\b[^>]*src=["']${escapeRegExp(f.filename)}["'][^>]*>\\s*</script>`,
      "gi",
    )
    body = body.replace(scriptPattern, "")
  }

  const headExtra = cssFiles.length ? `<style>\n${cssFiles.map((f) => f.source).join("\n")}\n</style>` : ""
  const bodyAppend = jsFiles.length ? `<script>\n${jsFiles.map((f) => f.source).join("\n")}\n<\/script>` : ""

  return buildEmbedContainer(
    files.map((f) => buildTabButton(f.filename, f.filename, false)),
    [
      buildPreviewPanel(buildSrcDoc({ body, headExtra, bodyAppend })),
      ...files.map((f) => buildCodePanel(f.filename, f.lang, f.source)),
    ],
  )
}

function replaceInteractiveBlocks(tree) {
  const visit = (node) => {
    const children = node.children
    if (!children) return
    const newChildren = []
    for (let i = 0; i < children.length; i++) {
      const child = children[i]
      if (isInteractiveCodeBlock(child)) {
        const source = getCodeText(child.children[0])
        newChildren.push(buildLegacyEmbed(source))
        continue
      }
      const group = collectFileGroup(children, i)
      if (group) {
        newChildren.push(buildFileGroupEmbed(group.files))
        i = group.endIndex
        continue
      }
      visit(child)
      newChildren.push(child)
    }
    node.children = newChildren
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

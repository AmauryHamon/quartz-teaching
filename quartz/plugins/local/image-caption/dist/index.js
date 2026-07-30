// Hand-authored (no build step): turns a standalone `![caption text](image.png)` — an <img>
// that is the sole content of its paragraph — into <figure><img><figcaption>, so the alt text
// you're already writing becomes the visible caption instead of a duplicated plain-text
// paragraph underneath. No card border or tinted background: this replaces the old
// `p > img + em` CSS overlay hack with a real figure/figcaption, styled as plain muted text.
//
// The caption can end with a `[Source: X](url)` style link, e.g.
// `![Josh Duck, HTML Periodic Table [Source: Brad Frost](https://...)](img.png)` — written
// exactly like a normal markdown link nested inside the image's alt text. CommonMark itself
// throws the href away when it flattens that nested link into the img's plain-text `alt`
// attribute (browsers can't render markup inside `alt`), so by the time any hast-stage plugin
// sees the tree, the URL is already gone — the only place it still exists is the raw source
// text. This plugin re-slices the original markdown at the image's recorded position to
// recover it, then rebuilds the trailing `[label](url)` as a real <a> in the figcaption
// (which CrawlLinks then decorates like any other link, since it runs after this at order 60).
//
// Runs at order 35, after ObsidianFlavoredMarkdown's youtube/tweet embed pass (order 30) and
// arena-embed (order 16) — so an image already swapped for one of those embeds is never
// mistaken for a captioned photo.

function isWhitespaceText(node) {
  return !!node && node.type === "text" && (!node.value || node.value.trim() === "")
}

// A standalone `![alt](src)` is parsed as <p><img></p> by remark-rehype. Only a lone image
// with non-empty alt text qualifies — a paragraph mixing an image with other text, or an
// image used purely for accessibility decoration (empty alt), is left untouched.
function getCaptionableImage(node) {
  if (!node || node.type !== "element" || node.tagName !== "p") return null
  const meaningful = node.children.filter((c) => !isWhitespaceText(c))
  if (meaningful.length !== 1) return null
  const only = meaningful[0]
  if (only.type !== "element" || only.tagName !== "img") return null
  const alt = only.properties?.alt
  if (!alt || !String(alt).trim()) return null
  return only
}

// Greedy up to the *last* "](...)" in the slice, so a nested "[label](url)" inside the alt
// text (rather than the image's own closing src) is captured as part of the alt group.
const IMAGE_SOURCE_PATTERN = /^!\[([\s\S]*)\]\([^)]*\)$/
// Splits alt text into an optional plain-text prefix and a trailing "[label](url)" link.
const TRAILING_LINK_PATTERN = /^([\s\S]*?)\s*\[([^\]]+)\]\((\S+?)\)\s*$/

// Recovers the caption as hast children, preserving a trailing "[label](url)" as a real link
// instead of the flattened, href-less string CommonMark leaves in `img.alt`. Falls back to
// plain alt text if the raw source isn't available for some reason.
function buildCaptionChildren(imgNode, file) {
  const alt = String(imgNode.properties.alt)
  const start = imgNode.position?.start?.offset
  const end = imgNode.position?.end?.offset
  if (file && typeof start === "number" && typeof end === "number") {
    const raw = String(file).slice(start, end)
    const sourceMatch = IMAGE_SOURCE_PATTERN.exec(raw)
    const altRaw = sourceMatch ? sourceMatch[1] : alt
    const linkMatch = TRAILING_LINK_PATTERN.exec(altRaw)
    if (linkMatch) {
      const [, prefix, label, url] = linkMatch
      const children = []
      if (prefix.trim()) children.push({ type: "text", value: `${prefix.trim()} ` })
      children.push({
        type: "element",
        tagName: "a",
        properties: { href: url },
        children: [{ type: "text", value: label }],
      })
      return children
    }
  }
  return [{ type: "text", value: alt }]
}

function buildFigure(imgNode, file) {
  return {
    type: "element",
    tagName: "figure",
    properties: { className: ["captioned-image"] },
    children: [
      imgNode,
      {
        type: "element",
        tagName: "figcaption",
        properties: {},
        children: buildCaptionChildren(imgNode, file),
      },
    ],
  }
}

function replaceCaptionedImages(tree, file) {
  const visit = (node) => {
    const children = node.children
    if (!children) return
    for (let i = 0; i < children.length; i++) {
      const img = getCaptionableImage(children[i])
      if (img) {
        children[i] = buildFigure(img, file)
        continue
      }
      visit(children[i])
    }
  }
  visit(tree)
}

const style = `
figure.captioned-image {
  margin: 1rem 0;
}
figure.captioned-image img {
  margin: 0;
}
figure.captioned-image figcaption {
  margin-top: 0.35rem;
  font-size: 0.85rem;
  line-height: 1.4;
  color: var(--gray);
  text-align: center;
}
figure.captioned-image figcaption a {
  color: inherit;
  text-decoration: underline;
}
`

export const ImageCaption = (_userOpts) => {
  return {
    name: "ImageCaption",
    htmlPlugins() {
      return [() => (tree, file) => replaceCaptionedImages(tree, file)]
    },
    externalResources() {
      return {
        css: [{ content: style, inline: true }],
      }
    },
  }
}

export default ImageCaption

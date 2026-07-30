// Hand-authored (no build step): turns a standalone `![](https://www.are.na/block/12345)`
// or `![](https://www.are.na/username/channel-slug)` — an <img> that is the sole content of
// its paragraph, same convention as the stock YouTube/Tweet embed syntax — into a fetched
// preview card. Blocks render as a single link card (thumbnail, title, source); channels
// render as a small thumbnail grid of their first few blocks.
//
// Are.na's public v2 API (https://api.are.na/v2) requires no auth for public content and
// sends `access-control-allow-origin: *`, but fetching at build time (rather than client-side)
// keeps notes readable with JS disabled and avoids a runtime dependency on Are.na's uptime —
// same reasoning as this repo's other progressive-enhancement work. Results are cached to
// quartz/.quartz-cache/arena-embed.json so repeated builds don't re-hit the API.
//
// Runs at order 16 (right after interactive-embed), before ObsidianFlavoredMarkdown's
// htmlPlugins (order 30) resolve youtube/tweet embeds and well before image-caption
// (order 35) looks for lone captioned images — so an Are.na embed is never mistaken for
// either of those.

import fs from "fs"
import path from "path"

const API_ROOT = "https://api.are.na/v2"

const defaultOptions = {
  channelPreviewCount: 6,
  cacheTtlMinutes: 1440,
}

// https://www.are.na/block/12345
const ARENA_BLOCK_PATTERN = /^https?:\/\/(?:www\.)?are\.na\/block\/(\d+)\/?(?:[?#].*)?$/i
// https://www.are.na/username/channel-slug or the older bare https://www.are.na/channel-slug.
// Are.na doesn't put a distinguishing segment (like "/channel/") in these URLs, so anything
// under are.na that isn't /block/:id is treated as a channel reference.
const ARENA_CHANNEL_PATTERN =
  /^https?:\/\/(?:www\.)?are\.na\/(?!block\/)([^\/?#]+)(?:\/([^\/?#]+))?\/?(?:[?#].*)?$/i

function isWhitespaceText(node) {
  return !!node && node.type === "text" && (!node.value || node.value.trim() === "")
}

// A standalone `![](url)` is parsed as <p><img></p> by remark-rehype; this mirrors the same
// "lone element in its paragraph" check interactive-embed uses for fenced code blocks.
function getLoneImageSrc(node) {
  if (!node || node.type !== "element" || node.tagName !== "p") return null
  const meaningful = node.children.filter((c) => !isWhitespaceText(c))
  if (meaningful.length !== 1) return null
  const only = meaningful[0]
  if (only.type !== "element" || only.tagName !== "img") return null
  return only.properties?.src ?? null
}

function parseArenaUrl(url) {
  if (!url) return null
  const blockMatch = ARENA_BLOCK_PATTERN.exec(url)
  if (blockMatch) return { kind: "block", id: blockMatch[1], url }
  const channelMatch = ARENA_CHANNEL_PATTERN.exec(url)
  if (channelMatch) {
    const slug = channelMatch[2] ?? channelMatch[1]
    if (slug) return { kind: "channel", slug, url }
  }
  return null
}

// --- Build-time cache -------------------------------------------------------

const CACHE_PATH = path.join(process.cwd(), "quartz", ".quartz-cache", "arena-embed.json")
let cache = null

function loadCache() {
  if (cache) return cache
  try {
    cache = JSON.parse(fs.readFileSync(CACHE_PATH, "utf-8"))
  } catch {
    cache = {}
  }
  return cache
}

function saveCache() {
  try {
    fs.mkdirSync(path.dirname(CACHE_PATH), { recursive: true })
    fs.writeFileSync(CACHE_PATH, JSON.stringify(cache), "utf-8")
  } catch {
    // Cache is a build-speed optimization, not a correctness requirement — ignore write failures.
  }
}

async function fetchWithCache(cacheKey, ttlMinutes, fetcher) {
  const store = loadCache()
  const entry = store[cacheKey]
  const isFresh = entry && Date.now() - entry.fetchedAt < ttlMinutes * 60_000
  if (isFresh) return entry.data

  const data = await fetcher()
  store[cacheKey] = { data, fetchedAt: Date.now() }
  saveCache()
  return data
}

async function fetchArenaJson(endpoint) {
  const res = await fetch(`${API_ROOT}${endpoint}`)
  if (!res.ok) throw new Error(`Are.na API returned ${res.status} for ${endpoint}`)
  return res.json()
}

// --- Card markup --------------------------------------------------------------

function el(tagName, properties, children) {
  return { type: "element", tagName, properties: properties ?? {}, children: children ?? [] }
}

function text(value) {
  return { type: "text", value }
}

function stripHtml(html) {
  return (html ?? "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim()
}

function truncate(str, max) {
  if (!str || str.length <= max) return str
  return str.slice(0, max - 1).trimEnd() + "…"
}

function embedStyle() {
  return `
.arena-embed {
  display: block;
  margin: 1.5rem 0;
  border: 1px solid var(--lightgray);
  border-radius: 4px;
  overflow: hidden;
  text-decoration: none;
  color: inherit;
}
.arena-embed:hover {
  border-color: var(--gray);
}
.arena-embed .external-icon {
  /* CrawlLinks decorates every external <a> with a trailing icon; the badge row already
     carries its own "Are.na ↗" affordance, so suppress the generic one here. */
  display: none;
}
.arena-embed-badge {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  font-size: 0.8rem;
  color: var(--gray);
  border-top: 1px solid var(--lightgray);
}
.arena-block-body {
  display: flex;
  gap: 0.75rem;
  padding: 0.75rem;
}
.arena-block-thumb {
  flex: none;
  width: 96px;
  height: 96px;
  border-radius: 3px;
  object-fit: cover;
  background: var(--light);
}
.arena-block-text {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.25rem;
  min-width: 0;
}
.arena-block-title {
  font-weight: 600;
  font-size: 0.95rem;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.arena-block-desc {
  font-size: 0.85rem;
  color: var(--gray);
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.arena-channel-header {
  padding: 0.75rem 0.75rem 0;
  font-weight: 600;
  font-size: 0.95rem;
}
.arena-channel-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2px;
  margin: 0.75rem;
  border-radius: 3px;
  overflow: hidden;
}
.arena-channel-grid img {
  display: block;
  width: 100%;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  margin: 0;
  border-radius: 0;
}
.arena-embed-error {
  padding: 0.75rem;
  font-size: 0.85rem;
  color: var(--gray);
}
`
}

function buildArenaLink(children, url, extraClass) {
  return el(
    "a",
    {
      className: extraClass ? ["arena-embed", extraClass] : ["arena-embed"],
      href: url,
      target: "_blank",
      rel: "noopener noreferrer",
    },
    children,
  )
}

function buildBadge(label) {
  return el("div", { className: ["arena-embed-badge"] }, [text(label), text("Are.na ↗")])
}

function buildBlockCard(block, url) {
  const image = block.image?.display?.url ?? block.image?.large?.url ?? block.image?.original?.url
  const title = block.generated_title || block.title || "Untitled block"
  const description = truncate(stripHtml(block.description_html || block.content_html), 140)
  const sourceLabel = block.source?.provider?.name || block.source?.title

  const bodyChildren = []
  if (image) {
    bodyChildren.push(el("img", { className: ["arena-block-thumb"], src: image, loading: "lazy", alt: "" }))
  }
  const textChildren = [el("div", { className: ["arena-block-title"] }, [text(title)])]
  if (description) {
    textChildren.push(el("div", { className: ["arena-block-desc"] }, [text(description)]))
  }
  bodyChildren.push(el("div", { className: ["arena-block-text"] }, textChildren))

  return buildArenaLink(
    [
      el("div", { className: ["arena-block-body"] }, bodyChildren),
      buildBadge(sourceLabel ? `via ${sourceLabel}` : block.class || "Block"),
    ],
    url,
    "arena-block",
  )
}

function buildChannelCard(channel, url, previewCount) {
  const title = channel.title || "Untitled channel"
  const thumbs = (channel.contents ?? [])
    .map((c) => c.image?.square?.url ?? c.image?.thumb?.url)
    .filter(Boolean)
    .slice(0, previewCount)

  const children = [el("div", { className: ["arena-channel-header"] }, [text(title)])]
  if (thumbs.length > 0) {
    children.push(
      el(
        "div",
        { className: ["arena-channel-grid"] },
        thumbs.map((src) => el("img", { src, loading: "lazy", alt: "" })),
      ),
    )
  }
  children.push(buildBadge(`${channel.length ?? thumbs.length} blocks`))

  return buildArenaLink(children, url, "arena-channel")
}

function buildErrorCard(url) {
  return buildArenaLink(
    [el("div", { className: ["arena-embed-error"] }, [text("Couldn't load Are.na preview — ")]), buildBadge("Are.na ↗")],
    url,
    "arena-error",
  )
}

async function buildCard(match, opts) {
  try {
    if (match.kind === "block") {
      const block = await fetchWithCache(`block:${match.id}`, opts.cacheTtlMinutes, () =>
        fetchArenaJson(`/blocks/${match.id}`),
      )
      return buildBlockCard(block, match.url)
    }
    const channel = await fetchWithCache(`channel:${match.slug}`, opts.cacheTtlMinutes, () =>
      fetchArenaJson(`/channels/${match.slug}?per=${opts.channelPreviewCount}`),
    )
    return buildChannelCard(channel, match.url, opts.channelPreviewCount)
  } catch {
    return buildErrorCard(match.url)
  }
}

async function replaceArenaEmbeds(tree, opts) {
  const visit = async (node) => {
    const children = node.children
    if (!children) return
    for (let i = 0; i < children.length; i++) {
      const src = getLoneImageSrc(children[i])
      const match = src ? parseArenaUrl(src) : null
      if (match) {
        children[i] = await buildCard(match, opts)
        continue
      }
      await visit(children[i])
    }
  }
  await visit(tree)
}

export const ArenaEmbed = (userOpts) => {
  const opts = { ...defaultOptions, ...userOpts }

  return {
    name: "ArenaEmbed",
    htmlPlugins() {
      return [() => (tree) => replaceArenaEmbeds(tree, opts)]
    },
    externalResources() {
      return {
        css: [{ content: embedStyle(), inline: true }],
      }
    },
  }
}

export default ArenaEmbed

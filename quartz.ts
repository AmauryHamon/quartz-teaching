import { loadQuartzConfig, loadQuartzLayout } from "./quartz/plugins/loader/config-loader"
import * as ExternalPlugin from "./.quartz/plugins"
import type { ExplorerOptions } from "./.quartz/plugins"

// Sort by the file/folder slug segment (i.e. filename), not the display title, so notes
// can be manually ordered by prefixing filenames with numbers (e.g. "1 Intro.md") while
// keeping the `title` frontmatter clean.
const sortFn: ExplorerOptions["sortFn"] = (a, b) => {
  if ((!a.isFolder && !b.isFolder) || (a.isFolder && b.isFolder)) {
    return (a.slugSegment || "").localeCompare(b.slugSegment || "", undefined, {
      numeric: true,
      sensitivity: "base",
    })
  }
  return !a.isFolder && b.isFolder ? 1 : -1
}

ExternalPlugin.Explorer({ sortFn })

const config = await loadQuartzConfig()
export default config
export const layout = await loadQuartzLayout()

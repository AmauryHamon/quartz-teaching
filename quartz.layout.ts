import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [Component.PageTitle(),Component.MobileOnly(Component.Spacer()),Component.Search(),Component.Darkmode(),],
  footer: Component.Footer({
    links: {
      "email": "mailto:amaury.hamon@eduvaud.ch",
      // "Discord Community": "https://discord.gg/cRFFHYye7t",
    },
  }),
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [Component.ArticleTitle(), Component.ContentMeta(), Component.TagList()],
  left: [ 
    Component.DesktopOnly(Component.Explorer()), Component.DesktopOnly(Component.TableOfContents())
  ],
  right: [Component.Graph(), Component.Backlinks()],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.ArticleTitle(), Component.ContentMeta(), Component.TagList()],
  left: [Component.DesktopOnly(Component.Explorer())],
  right: [Component.Graph(), Component.Backlinks()],
}

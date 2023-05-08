import { getAllPaintingSlugs, getAllProjectsSlugs } from "lib/api"
import { getBaseUrl } from "utils/url"

interface SitemapField {
  loc: string
  lastmod: string
  changefreq: "daily"
  priority?: number
}

// Invalidate the sitemap every 24 hours, matching the changefreq
export const revalidate = 86400

const staticPages = [
  {
    loc: "",
    priority: 1,
  },
  {
    loc: "/",
    priority: 1,
  },
  {
    loc: "/projects",
    priority: 0.9,
  },
  {
    loc: "/videos",
    priority: 0.9,
  },
  {
    loc: "/style",
    priority: 0.3,
  },
  {
    loc: "/about",
    priority: 0.3,
  },
]

/**
 * This Route is using ISR and will update the cache every 24 hours (see «revalidate» above)
 * Returns a sitemap
 */
export async function GET() {
  const allPaintings = await getAllPaintingSlugs()

  const allProjects = await getAllProjectsSlugs()

  // Sitemap fields
  const fields: Array<SitemapField> = []

  // Add all static pages
  for (const page of staticPages) {
    const url = new URL(page.loc, getBaseUrl())
    fields.push({
      loc: url.toString(),
      lastmod: new Date().toISOString(),
      changefreq: "daily",
      priority: page.priority,
    })
  }

  // Add all articles
  for (const article of allPaintings) {
    const slug = article.slug

    const url = new URL(`/paintings/${slug}`, getBaseUrl())
    fields.push({
      loc: url.toString(),
      lastmod: new Date().toISOString(),
      changefreq: "daily",
      priority: 0.7,
    })
  }

  // Add all projects
  for (const project of allProjects) {
    const slug = project.slug
    const url = new URL(`/projects/${slug}`, getBaseUrl())
    fields.push({
      loc: url.toString(),
      lastmod: new Date().toISOString(),
      changefreq: "daily",
      priority: 0.7,
    })
  }

  const urlArray = fields.map((field) => {
    return `<url>
		<loc>${field.loc}</loc>
        <changefreq>${field.changefreq}</changefreq>
		<lastmod>${field.lastmod}</lastmod>
        <priority>${field.priority}</priority>
		</url>`
  })

  const body = `<?xml version="1.0" encoding="UTF-8" ?>
	<urlset
	  xmlns="https://www.sitemaps.org/schemas/sitemap/0.9"
	  xmlns:news="https://www.google.com/schemas/sitemap-news/0.9"
	  xmlns:xhtml="https://www.w3.org/1999/xhtml"
	  xmlns:mobile="https://www.google.com/schemas/sitemap-mobile/1.0"
	  xmlns:image="https://www.google.com/schemas/sitemap-image/1.1"
	  xmlns:video="https://www.google.com/schemas/sitemap-video/1.1"
	>
	  ${urlArray.join("")}
	</urlset>`

  const headers = {
    "Cache-Control": "max-age=0, s-maxage=3600",
    "Content-Type": "application/xml",
  }

  return new Response(body, { headers })
}

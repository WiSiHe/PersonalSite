import { getBaseUrl } from "utils/url"

/**
 * This Route is static (default)
 * Returns a robots.txt file
 */
export async function GET() {
  const body = `# *
    User-agent: *
    Disallow: *
    # Host
    Host: ${getBaseUrl()}

    # Sitemaps
    Sitemap: ${getBaseUrl()}/sitemap.xml`

  const headers = {
    "Cache-Control": "max-age=0, s-maxage=3600",
    "Content-Type": "text/plain",
  }

  return new Response(body, { headers })
}

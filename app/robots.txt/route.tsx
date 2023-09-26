// import { getBaseUrl } from "utils/url"

/**
 * This Route is static (default)
 * Returns a robots.txt file
 */
export async function GET() {
    const body = `# *
    User-agent: *
    Disallow: /studio
    # Host
    Host: https://wisihe.no/

    # Sitemaps
    Sitemap: https://wisihe.no/sitemap.xml`

    const headers = {
        "Cache-Control": "max-age=0, s-maxage=3600",
        "Content-Type": "text/plain",
    }

    return new Response(body, { headers })
}

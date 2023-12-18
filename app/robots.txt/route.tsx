const BASE_URL = "https://wisihe.no/"

/**
 * This Route is static (default)
 * Returns a robots.txt file
 */
export async function GET() {
    const body = `# *
    User-agent: *
    Disallow: /studio
    # Host
    Host: ${BASE_URL}

    # Sitemaps
    Sitemap: ${BASE_URL}/sitemap.xml`

    const headers = {
        "Cache-Control": "max-age=0, s-maxage=3600",
        "Content-Type": "text/plain",
    }

    return new Response(body, { headers })
}

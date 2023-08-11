import { stripTrailingSlash } from "./string"

/**
 * You can pass the env var DOMAIN_NAME (Vercel)
 * It returns a full url with the correct protocol (http for localhost otherwise https)
 * @param domainName
 * @returns
 */
export function getFullUrlFromDomain(domainName: string): string {
  const protocol = domainName.includes("localhost") ? "http" : "https"
  return `${protocol}://${stripTrailingSlash(domainName)}`
}

/**
 * returns the base url for the app
 * Note that the «VERCEL_URL» env var is a Vercel system variable
 */
export function getBaseUrl() {
  if (typeof process.env.VERCEL_URL === "string") {
    const protocol = process.env.VERCEL_URL.includes("localhost:1992")
      ? "http"
      : "https"
    return `${protocol}://${process.env.VERCEL_URL.replace(/\/$/, "")}`
  }
  return "http://localhost:1992"
}

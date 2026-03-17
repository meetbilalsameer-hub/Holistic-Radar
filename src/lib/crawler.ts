import * as cheerio from "cheerio"
import type { CrawlResult, HeadingData, LinkData, ImageData } from "@/types/crawl"
import { normalizeUrl } from "./utils"

const CRAWL_TIMEOUT = 10000
const USER_AGENT = "HolisticRadar/1.0 (Semantic Authority Grader; +https://holisticradar.com)"

async function fetchPage(url: string): Promise<string> {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), CRAWL_TIMEOUT)

  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent": USER_AGENT,
        Accept: "text/html,application/xhtml+xml",
      },
      signal: controller.signal,
      redirect: "follow",
    })

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }

    const contentType = response.headers.get("content-type") || ""
    if (!contentType.includes("text/html") && !contentType.includes("application/xhtml")) {
      throw new Error("Response is not HTML")
    }

    return await response.text()
  } finally {
    clearTimeout(timeout)
  }
}

function extractHeadings($: cheerio.CheerioAPI): HeadingData[] {
  const headings: HeadingData[] = []
  for (let level = 1; level <= 6; level++) {
    $(`h${level}`).each((_, el) => {
      const text = $(el).text().trim()
      if (text) headings.push({ level, text })
    })
  }
  return headings.sort((a, b) => {
    const aIndex = $(`h${a.level}`).index()
    const bIndex = $(`h${b.level}`).index()
    return aIndex - bIndex
  })
}

function extractLinks($: cheerio.CheerioAPI, baseUrl: string): { internal: LinkData[]; external: LinkData[] } {
  const internal: LinkData[] = []
  const external: LinkData[] = []

  let baseDomain: string
  try {
    baseDomain = new URL(baseUrl).hostname
  } catch {
    baseDomain = ""
  }

  $("a[href]").each((_, el) => {
    const href = $(el).attr("href") || ""
    const text = $(el).text().trim()

    if (!href || href.startsWith("#") || href.startsWith("javascript:") || href.startsWith("mailto:") || href.startsWith("tel:")) {
      return
    }

    try {
      const absoluteUrl = new URL(href, baseUrl).href
      const linkDomain = new URL(absoluteUrl).hostname

      const linkData: LinkData = { href: absoluteUrl, text, isInternal: linkDomain === baseDomain }
      if (linkDomain === baseDomain) {
        internal.push(linkData)
      } else {
        external.push(linkData)
      }
    } catch {
      // Skip malformed URLs
    }
  })

  return { internal, external }
}

function extractImages($: cheerio.CheerioAPI): ImageData[] {
  const images: ImageData[] = []
  $("img").each((_, el) => {
    const src = $(el).attr("src") || ""
    const alt = $(el).attr("alt") || ""
    images.push({ src, alt, hasAlt: alt.length > 0 })
  })
  return images
}

function extractSchemaMarkup($: cheerio.CheerioAPI): string[] {
  const schemas: string[] = []
  $('script[type="application/ld+json"]').each((_, el) => {
    const content = $(el).html()
    if (content) schemas.push(content)
  })
  return schemas
}

function detectTrustPages(links: LinkData[]): { hasAbout: boolean; hasContact: boolean; hasBlog: boolean; hasServices: boolean } {
  const hrefs = links.map(l => l.href.toLowerCase() + " " + l.text.toLowerCase())

  return {
    hasAbout: hrefs.some(h => h.includes("about") || h.includes("team") || h.includes("who-we-are")),
    hasContact: hrefs.some(h => h.includes("contact") || h.includes("get-in-touch")),
    hasBlog: hrefs.some(h => h.includes("blog") || h.includes("articles") || h.includes("insights") || h.includes("resources")),
    hasServices: hrefs.some(h => h.includes("service") || h.includes("solution") || h.includes("what-we-do") || h.includes("offering")),
  }
}

export async function crawlWebsite(inputUrl: string): Promise<CrawlResult> {
  const url = normalizeUrl(inputUrl)
  const html = await fetchPage(url)
  const $ = cheerio.load(html)

  // Remove script/style elements
  $("script, style, noscript").remove()

  const title = $("title").text().trim()
  const metaDescription = $('meta[name="description"]').attr("content")?.trim() || ""
  const headings = extractHeadings($)
  const { internal, external } = extractLinks($, url)
  const images = extractImages($)
  const schemaMarkup = extractSchemaMarkup($)
  const trustPages = detectTrustPages(internal)

  const paragraphs: string[] = []
  $("p").each((_, el) => {
    const text = $(el).text().trim()
    if (text.length > 20) paragraphs.push(text)
  })

  const rawText = $("body").text().replace(/\s+/g, " ").trim()
  const wordCount = rawText.split(/\s+/).filter(w => w.length > 0).length

  return {
    url,
    title,
    metaDescription,
    headings,
    paragraphs,
    internalLinks: internal,
    externalLinks: external,
    images,
    schemaMarkup,
    hasAboutPage: trustPages.hasAbout,
    hasContactPage: trustPages.hasContact,
    hasBlogSection: trustPages.hasBlog,
    hasServicesPage: trustPages.hasServices,
    contentLength: rawText.length,
    wordCount,
    rawText: rawText.substring(0, 5000), // Cap for API usage
  }
}

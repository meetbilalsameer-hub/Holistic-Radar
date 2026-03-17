import type { CrawlResult, ExtractedFeatures } from "@/types/crawl"

function tokenize(text: string): string[] {
  return text.toLowerCase().replace(/[^a-z0-9\s]/g, "").split(/\s+/).filter(w => w.length > 2)
}

function getNGrams(tokens: string[], n: number): Map<string, number> {
  const grams = new Map<string, number>()
  for (let i = 0; i <= tokens.length - n; i++) {
    const gram = tokens.slice(i, i + n).join(" ")
    grams.set(gram, (grams.get(gram) || 0) + 1)
  }
  return grams
}

function calculateTitleH1Alignment(title: string, headings: { level: number; text: string }[]): number {
  const h1 = headings.find(h => h.level === 1)
  if (!h1) return 0

  const titleTokens = new Set(tokenize(title))
  const h1Tokens = tokenize(h1.text)
  if (titleTokens.size === 0 || h1Tokens.length === 0) return 0

  const overlap = h1Tokens.filter(t => titleTokens.has(t)).length
  return Math.round((overlap / Math.max(titleTokens.size, h1Tokens.length)) * 100)
}

function hasLogicalHeadingHierarchy(headings: { level: number; text: string }[]): boolean {
  if (headings.length === 0) return false
  const h1Count = headings.filter(h => h.level === 1).length
  if (h1Count !== 1) return false

  for (let i = 1; i < headings.length; i++) {
    if (headings[i].level > headings[i - 1].level + 1) return false
  }
  return true
}

function detectIntentType(crawl: CrawlResult): string {
  const text = (crawl.title + " " + crawl.metaDescription + " " + crawl.rawText.substring(0, 1000)).toLowerCase()

  if (text.match(/how to|guide|tutorial|step[s]?\s/)) return "informational"
  if (text.match(/buy|price|shop|order|cart|checkout/)) return "transactional"
  if (text.match(/review|compare|best|top \d|vs\b/)) return "commercial"
  if (text.match(/contact|about|login|sign in/)) return "navigational"
  return "informational"
}

function detectContentFormat(crawl: CrawlResult): string {
  const hasLists = crawl.rawText.includes("•") || crawl.headings.length > 5
  const hasLongParagraphs = crawl.paragraphs.some(p => p.length > 300)

  if (crawl.headings.length > 8 && hasLists) return "comprehensive guide"
  if (crawl.paragraphs.length > 10 && hasLongParagraphs) return "long-form article"
  if (crawl.paragraphs.length < 5) return "landing page"
  return "standard page"
}

export function extractFeatures(crawl: CrawlResult): ExtractedFeatures {
  const bodyTokens = tokenize(crawl.rawText)
  const titleTokens = tokenize(crawl.title)
  const h1 = crawl.headings.find(h => h.level === 1)
  const h1Tokens = h1 ? tokenize(h1.text) : []

  const bigrams = getNGrams(bodyTokens, 2)
  const topPhrases = Array.from(bigrams.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 20)
    .map(([phrase, count]) => ({ phrase, count }))

  const uniqueWords = new Set(bodyTokens)
  const tokenDiversity = bodyTokens.length > 0 ? uniqueWords.size / bodyTokens.length : 0

  const headingTopics = crawl.headings.map(h => h.text)
  const contentTopics = topPhrases.map(p => p.phrase)

  const textLower = crawl.rawText.toLowerCase()
  const hasQuestions = /\?/.test(crawl.rawText)
  const hasFAQ = crawl.schemaMarkup.some(s => s.includes("FAQPage")) ||
    headingTopics.some(h => h.toLowerCase().includes("faq") || h.toLowerCase().includes("question"))
  const hasLists = textLower.includes("•") || /<[ou]l/i.test(crawl.rawText)
  const hasTables = /<table/i.test(crawl.rawText)

  const ctaPatterns = /get started|sign up|book|schedule|contact us|free trial|learn more|request|demo|call/gi
  const ctaMatches = textLower.match(ctaPatterns)
  const ctaCount = ctaMatches ? ctaMatches.length : 0

  const hasSocialProof = /testimonial|review|client|case stud|trusted by|featured in/i.test(textLower)
  const hasAuthorInfo = /author|written by|by\s[A-Z]/i.test(crawl.rawText)
  const hasTestimonials = /testimonial|what .* say|client .* say|review/i.test(textLower)

  const maxHeadingLevel = crawl.headings.length > 0 ? Math.max(...crawl.headings.map(h => h.level)) : 0

  const hasRelatedContent = /related|also read|you may|similar|more on/i.test(textLower)
  const hasNextSteps = /next step|what.*next|continue|proceed|get started/i.test(textLower)
  const hasResourceLinks = crawl.externalLinks.length > 0 || /resource|reference|source/i.test(textLower)

  const avgParagraphLength = crawl.paragraphs.length > 0
    ? crawl.paragraphs.reduce((sum, p) => sum + p.length, 0) / crawl.paragraphs.length
    : 0

  const contentSections = crawl.headings.filter(h => h.level === 2).length

  const trustPageCount = [crawl.hasAboutPage, crawl.hasContactPage, crawl.hasBlogSection, crawl.hasServicesPage]
    .filter(Boolean).length

  return {
    titleTokens,
    h1Tokens,
    topPhrases,
    tokenDiversity: Math.round(tokenDiversity * 100) / 100,
    contentWordCount: crawl.wordCount,
    uniqueWordRatio: Math.round((uniqueWords.size / Math.max(bodyTokens.length, 1)) * 100) / 100,

    titleH1Alignment: calculateTitleH1Alignment(crawl.title, crawl.headings),
    headingCount: crawl.headings.length,
    headingDepth: maxHeadingLevel,
    hasLogicalHierarchy: hasLogicalHeadingHierarchy(crawl.headings),
    hasIntroSection: crawl.paragraphs.length > 0 && crawl.paragraphs[0].length > 50,
    schemaCount: crawl.schemaMarkup.length,
    internalLinkCount: crawl.internalLinks.length,
    externalLinkCount: crawl.externalLinks.length,
    contentSections,
    avgParagraphLength: Math.round(avgParagraphLength),

    headingTopics,
    contentTopics,
    questionPresence: hasQuestions,
    faqPresence: hasFAQ,
    listPresence: hasLists,
    tablePresence: hasTables,
    estimatedTopicBreadth: Math.min(contentSections + (hasFAQ ? 2 : 0) + (hasLists ? 1 : 0), 15),

    likelyIntentType: detectIntentType(crawl),
    likelyContentFormat: detectContentFormat(crawl),
    ctaPresence: ctaCount > 0,
    ctaCount,
    hasMultipleFormats: [hasLists, hasTables, hasQuestions, crawl.images.length > 0].filter(Boolean).length >= 2,
    depthIndicator: crawl.wordCount > 2000 ? "deep" : crawl.wordCount > 800 ? "moderate" : "shallow",

    hasAboutPage: crawl.hasAboutPage,
    hasContactPage: crawl.hasContactPage,
    hasAuthorInfo,
    hasSocialProof,
    hasTestimonials,
    trustPageCount,
    brandMentions: 0, // Would need brand name to calculate

    hasNavigation: crawl.internalLinks.length > 3,
    hasRelatedContent,
    hasNextSteps,
    hasResourceLinks,
    contentCompleteness: Math.min(
      (contentSections / 5) * 25 +
      (crawl.wordCount > 1000 ? 25 : (crawl.wordCount / 1000) * 25) +
      (hasFAQ ? 15 : 0) +
      (hasLists ? 10 : 0) +
      (hasTables ? 10 : 0) +
      (crawl.images.length > 0 ? 15 : 0),
      100
    ),
    userJourneySupport: Math.min(
      (ctaCount > 0 ? 20 : 0) +
      (hasNextSteps ? 20 : 0) +
      (hasRelatedContent ? 20 : 0) +
      (crawl.internalLinks.length > 5 ? 20 : 0) +
      (hasResourceLinks ? 20 : 0),
      100
    ),
  }
}

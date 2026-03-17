export interface CrawlResult {
  url: string
  title: string
  metaDescription: string
  headings: HeadingData[]
  paragraphs: string[]
  internalLinks: LinkData[]
  externalLinks: LinkData[]
  images: ImageData[]
  schemaMarkup: string[]
  hasAboutPage: boolean
  hasContactPage: boolean
  hasBlogSection: boolean
  hasServicesPage: boolean
  contentLength: number
  wordCount: number
  rawText: string
}

export interface HeadingData {
  level: number
  text: string
}

export interface LinkData {
  href: string
  text: string
  isInternal: boolean
}

export interface ImageData {
  src: string
  alt: string
  hasAlt: boolean
}

export interface ExtractedFeatures {
  // Layer 1: N-Grams / Tokens
  titleTokens: string[]
  h1Tokens: string[]
  topPhrases: { phrase: string; count: number }[]
  tokenDiversity: number
  contentWordCount: number
  uniqueWordRatio: number

  // Layer 2: Structural Semantics
  titleH1Alignment: number
  headingCount: number
  headingDepth: number
  hasLogicalHierarchy: boolean
  hasIntroSection: boolean
  schemaCount: number
  internalLinkCount: number
  externalLinkCount: number
  contentSections: number
  avgParagraphLength: number

  // Layer 3: Topical Completeness
  headingTopics: string[]
  contentTopics: string[]
  questionPresence: boolean
  faqPresence: boolean
  listPresence: boolean
  tablePresence: boolean
  estimatedTopicBreadth: number

  // Layer 4: Contextual Intent
  likelyIntentType: string
  likelyContentFormat: string
  ctaPresence: boolean
  ctaCount: number
  hasMultipleFormats: boolean
  depthIndicator: string

  // Layer 5: Entity Authority
  hasAboutPage: boolean
  hasContactPage: boolean
  hasAuthorInfo: boolean
  hasSocialProof: boolean
  hasTestimonials: boolean
  trustPageCount: number
  brandMentions: number

  // Layer 6: Holistic Task / Need
  hasNavigation: boolean
  hasRelatedContent: boolean
  hasNextSteps: boolean
  hasResourceLinks: boolean
  contentCompleteness: number
  userJourneySupport: number
}

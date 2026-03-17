import type { ExtractedFeatures } from "@/types/crawl"
import type { LayerScore } from "@/types/analysis"
import { getScoreLabel } from "./utils"

function clamp(value: number, min: number = 0, max: number = 100): number {
  return Math.max(min, Math.min(max, Math.round(value)))
}

function scoreLayer1(features: ExtractedFeatures): number {
  let score = 30 // baseline

  // Token diversity
  if (features.tokenDiversity > 0.4) score += 15
  else if (features.tokenDiversity > 0.25) score += 8

  // Content word count
  if (features.contentWordCount > 2000) score += 15
  else if (features.contentWordCount > 1000) score += 10
  else if (features.contentWordCount > 500) score += 5

  // Unique word ratio
  if (features.uniqueWordRatio > 0.35) score += 10
  else if (features.uniqueWordRatio > 0.2) score += 5

  // Top phrases indicate topical focus
  if (features.topPhrases.length >= 10) score += 10
  else if (features.topPhrases.length >= 5) score += 5

  // Title tokens present in content
  const titleInContent = features.titleTokens.some(t =>
    features.topPhrases.some(p => p.phrase.includes(t))
  )
  if (titleInContent) score += 10

  // H1 tokens alignment with content
  if (features.h1Tokens.length > 0) score += 10

  return clamp(score)
}

function scoreLayer2(features: ExtractedFeatures): number {
  let score = 20

  // Title-H1 alignment
  if (features.titleH1Alignment > 70) score += 15
  else if (features.titleH1Alignment > 40) score += 8
  else if (features.titleH1Alignment > 0) score += 3

  // Heading structure
  if (features.hasLogicalHierarchy) score += 15
  if (features.headingCount >= 5) score += 10
  else if (features.headingCount >= 3) score += 5

  // Content sections
  if (features.contentSections >= 4) score += 10
  else if (features.contentSections >= 2) score += 5

  // Schema markup
  if (features.schemaCount >= 2) score += 10
  else if (features.schemaCount >= 1) score += 5

  // Internal links
  if (features.internalLinkCount >= 10) score += 10
  else if (features.internalLinkCount >= 5) score += 5

  // Intro section
  if (features.hasIntroSection) score += 5

  // Paragraph quality
  if (features.avgParagraphLength > 80 && features.avgParagraphLength < 300) score += 5

  return clamp(score)
}

function scoreLayer3(features: ExtractedFeatures): number {
  let score = 15

  // Topic breadth
  if (features.estimatedTopicBreadth >= 8) score += 20
  else if (features.estimatedTopicBreadth >= 5) score += 12
  else if (features.estimatedTopicBreadth >= 3) score += 6

  // FAQ presence
  if (features.faqPresence) score += 10

  // Question coverage
  if (features.questionPresence) score += 5

  // Multiple content formats
  if (features.hasMultipleFormats) score += 10

  // List presence
  if (features.listPresence) score += 5

  // Table presence
  if (features.tablePresence) score += 5

  // Content depth
  if (features.depthIndicator === "deep") score += 15
  else if (features.depthIndicator === "moderate") score += 8

  // Content completeness
  score += Math.round(features.contentCompleteness * 0.15)

  return clamp(score)
}

function scoreLayer4(features: ExtractedFeatures): number {
  let score = 25

  // CTA presence indicates purpose alignment
  if (features.ctaPresence) score += 10
  if (features.ctaCount >= 3) score += 5

  // Content format matches depth
  if (features.likelyContentFormat === "comprehensive guide" && features.depthIndicator === "deep") score += 15
  else if (features.likelyContentFormat === "landing page" && features.ctaPresence) score += 10
  else score += 5

  // Multiple formats support various micro-intents
  if (features.hasMultipleFormats) score += 10

  // Depth fit
  if (features.depthIndicator === "deep") score += 10
  else if (features.depthIndicator === "moderate") score += 5

  // Heading topics indicate angle coverage
  if (features.headingTopics.length >= 5) score += 10
  else if (features.headingTopics.length >= 3) score += 5

  // Content word count for depth
  if (features.contentWordCount > 1500) score += 5

  return clamp(score)
}

function scoreLayer5(features: ExtractedFeatures): number {
  let score = 15

  // Trust pages
  if (features.hasAboutPage) score += 15
  if (features.hasContactPage) score += 10

  // Author information
  if (features.hasAuthorInfo) score += 15

  // Social proof
  if (features.hasSocialProof) score += 10
  if (features.hasTestimonials) score += 10

  // Trust page count
  if (features.trustPageCount >= 3) score += 10
  else if (features.trustPageCount >= 2) score += 5

  // Schema presence supports entity clarity
  if (features.schemaCount >= 1) score += 10

  // Brand mentions
  if (features.brandMentions > 0) score += 5

  return clamp(score)
}

function scoreLayer6(features: ExtractedFeatures): number {
  let score = 15

  // User journey support
  score += Math.round(features.userJourneySupport * 0.3)

  // Navigation
  if (features.hasNavigation) score += 10

  // Related content
  if (features.hasRelatedContent) score += 10

  // Next steps
  if (features.hasNextSteps) score += 10

  // Resource links
  if (features.hasResourceLinks) score += 5

  // Content completeness
  score += Math.round(features.contentCompleteness * 0.15)

  // CTA as journey completion
  if (features.ctaPresence) score += 5
  if (features.ctaCount >= 2) score += 5

  return clamp(score)
}

export function calculateHeuristicScores(features: ExtractedFeatures): LayerScore[] {
  const scoreFunctions = [scoreLayer1, scoreLayer2, scoreLayer3, scoreLayer4, scoreLayer5, scoreLayer6]
  const layerNames = [
    "N-Grams / Tokens",
    "Structural Semantics",
    "Topical Completeness",
    "Contextual Intent",
    "Entity Authority",
    "Holistic Task / Need",
  ]

  return scoreFunctions.map((fn, i) => {
    const score = fn(features)
    return {
      layerNumber: i + 1,
      layerName: layerNames[i],
      score,
      label: getScoreLabel(score),
      insight: "",
      strengths: [],
      weaknesses: [],
      recommendation: "",
    }
  })
}

export function calculateOverallScore(layerScores: LayerScore[]): number {
  const weights = [0.10, 0.15, 0.20, 0.20, 0.15, 0.20]
  const weighted = layerScores.reduce((sum, layer, i) => sum + layer.score * weights[i], 0)
  return Math.round(weighted)
}

export function calculateConversionReadiness(features: ExtractedFeatures): number {
  let score = 0
  if (features.ctaPresence) score += 25
  if (features.ctaCount >= 3) score += 10
  if (features.hasContactPage) score += 15
  if (features.hasSocialProof) score += 15
  if (features.hasTestimonials) score += 10
  if (features.hasNextSteps) score += 15
  if (features.hasNavigation) score += 10
  return clamp(score)
}

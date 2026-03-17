export interface LayerDefinition {
  number: number
  name: string
  shortName: string
  weight: number
  question: string
  measures: string[]
}

export const LAYERS: LayerDefinition[] = [
  {
    number: 1,
    name: "N-Grams / Tokens",
    shortName: "Lexical Signals",
    weight: 0.10,
    question: "Can search systems clearly read the right lexical signals from this page?",
    measures: [
      "Lexical signals", "Important phrase presence", "Phrase positioning",
      "Token diversity", "Phrase neighborhood relevance", "Topic-language alignment"
    ]
  },
  {
    number: 2,
    name: "Structural Semantics",
    shortName: "Document Structure",
    weight: 0.15,
    question: "Is the document structured in a way that makes relevance legible?",
    measures: [
      "Title/H1 alignment", "Heading structure", "Semantic section hierarchy",
      "Intro clarity", "Schema signals", "Internal links", "Content architecture"
    ]
  },
  {
    number: 3,
    name: "Topical Completeness",
    shortName: "Topic Coverage",
    weight: 0.20,
    question: "Is this a partial resource or a complete one?",
    measures: [
      "Expected subtopics", "Missing concepts", "Semantic breadth and depth",
      "Question coverage", "Topic cluster support", "Gap detection", "Information gain"
    ]
  },
  {
    number: 4,
    name: "Contextual Intent",
    shortName: "Intent Alignment",
    weight: 0.20,
    question: "Does this content match what the user actually means and expects?",
    measures: [
      "User intent match", "Format match", "Audience fit", "Depth fit",
      "Angle fit", "Micro-intent coverage", "SERP expectation alignment"
    ]
  },
  {
    number: 5,
    name: "Entity Authority",
    shortName: "Trust Signals",
    weight: 0.15,
    question: "Who is behind this content, and should search systems trust them?",
    measures: [
      "Author clarity", "Organization identity", "About/Contact trust signals",
      "Expertise cues", "Topical specialization", "Brand-topic clarity", "Entity legibility"
    ]
  },
  {
    number: 6,
    name: "Holistic Task / Need",
    shortName: "Task Fulfillment",
    weight: 0.20,
    question: "Does this page merely answer a query, or does it genuinely help complete the user's broader task?",
    measures: [
      "Broader user task completion", "Journey support", "Next-step usefulness",
      "Ecosystem support", "Practical completion quality", "People-first usefulness"
    ]
  }
]

export interface LayerScore {
  layerNumber: number
  layerName: string
  score: number
  label: string
  insight: string
  strengths: string[]
  weaknesses: string[]
  recommendation: string
}

export interface AnalysisResult {
  id: string
  url: string
  overallScore: number
  overallSummary: string
  layerScores: LayerScore[]
  topBlockers: string[]
  strengths: string[]
  quickWins: string[]
  roadmapNow: string[]
  roadmapNext: string[]
  roadmapLater: string[]
  conversionReadiness: number
  createdAt: string
}

export interface PartialResult {
  overallScore: number
  highlightedLayers: LayerScore[]
  topInsights: string[]
  missedOpportunity: string
}

export interface ClaudeAnalysisResponse {
  overallSummary: string
  layerAdjustments: {
    layerNumber: number
    adjustment: number
    qualitativeInsight: string
    strengths: string[]
    weaknesses: string[]
    recommendation: string
  }[]
  topBlockers: string[]
  strengths: string[]
  quickWins: string[]
  roadmapNow: string[]
  roadmapNext: string[]
  roadmapLater: string[]
  conversionReadiness: number
  ctaRecommendation: string
}

export interface QualifierData {
  businessType?: string
  industry?: string
  market?: string
  growthGoal?: string
  primaryOffer?: string
}

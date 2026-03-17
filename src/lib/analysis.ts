import { crawlWebsite } from "./crawler"
import { extractFeatures } from "./feature-extraction"
import { calculateHeuristicScores, calculateOverallScore, calculateConversionReadiness } from "./scoring"
import { analyzeWithClaude, mergeClaudeWithHeuristics } from "./claude"
import type { AnalysisResult, QualifierData, ClaudeAnalysisResponse } from "@/types/analysis"

export async function runFullAnalysis(
  url: string,
  qualifiers?: QualifierData
): Promise<AnalysisResult> {
  // Step 1: Crawl website
  const crawlData = await crawlWebsite(url)

  // Step 2: Extract features
  const features = extractFeatures(crawlData)

  // Step 3: Calculate heuristic scores
  const heuristicScores = calculateHeuristicScores(features)

  // Step 4: Claude API analysis (optional — works without API key)
  let claudeResponse: ClaudeAnalysisResponse | null = null
  try {
    claudeResponse = await analyzeWithClaude(features, heuristicScores, qualifiers)
  } catch (error) {
    console.error("Claude analysis failed, using heuristic-only scores:", error)
  }

  // Step 5: Merge scores
  const finalScores = mergeClaudeWithHeuristics(heuristicScores, claudeResponse)
  const overallScore = calculateOverallScore(finalScores)
  const conversionReadiness = claudeResponse?.conversionReadiness ?? calculateConversionReadiness(features)

  // Build result
  const result: AnalysisResult = {
    id: "", // Will be set by database
    url,
    overallScore,
    overallSummary: claudeResponse?.overallSummary ??
      `This website shows ${overallScore >= 61 ? "solid" : overallScore >= 41 ? "developing" : "limited"} semantic authority signals across the 6-layer framework. ${overallScore >= 61 ? "The foundation is in place for strategic optimization." : "Several foundational improvements could significantly strengthen search visibility and conversion potential."}`,
    layerScores: finalScores,
    topBlockers: claudeResponse?.topBlockers ?? generateDefaultBlockers(finalScores),
    strengths: claudeResponse?.strengths ?? generateDefaultStrengths(finalScores),
    quickWins: claudeResponse?.quickWins ?? generateDefaultQuickWins(finalScores, features),
    roadmapNow: claudeResponse?.roadmapNow ?? ["Address the lowest-scoring layer immediately", "Fix structural issues that impact all other layers"],
    roadmapNext: claudeResponse?.roadmapNext ?? ["Build topical depth in underserved areas", "Strengthen entity authority signals"],
    roadmapLater: claudeResponse?.roadmapLater ?? ["Develop comprehensive topic cluster strategy", "Build systematic internal linking architecture"],
    conversionReadiness,
    createdAt: new Date().toISOString(),
  }

  return result
}

function generateDefaultBlockers(scores: { layerNumber: number; layerName: string; score: number }[]): string[] {
  return scores
    .filter(s => s.score < 50)
    .sort((a, b) => a.score - b.score)
    .slice(0, 3)
    .map(s => `${s.layerName} signals appear underdeveloped (score: ${s.score}/100)`)
}

function generateDefaultStrengths(scores: { layerNumber: number; layerName: string; score: number }[]): string[] {
  return scores
    .filter(s => s.score >= 50)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map(s => `${s.layerName} shows ${s.score >= 80 ? "strong" : "developing"} signals (score: ${s.score}/100)`)
}

function generateDefaultQuickWins(scores: { layerNumber: number; score: number }[], features: { schemaCount: number; hasAboutPage: boolean; faqPresence: boolean }): string[] {
  const wins: string[] = []
  if (features.schemaCount === 0) wins.push("Add structured data (schema markup) to improve search system understanding")
  if (!features.hasAboutPage) wins.push("Create a clear About page to establish entity authority")
  if (!features.faqPresence) wins.push("Add an FAQ section to improve topical completeness and question coverage")
  if (wins.length === 0) wins.push("Optimize heading hierarchy for better structural semantics")
  return wins.slice(0, 3)
}

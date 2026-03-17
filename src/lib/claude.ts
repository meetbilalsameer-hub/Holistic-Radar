import Anthropic from "@anthropic-ai/sdk"
import type { ExtractedFeatures } from "@/types/crawl"
import type { ClaudeAnalysisResponse, LayerScore, QualifierData } from "@/types/analysis"
import { LAYERS } from "@/types/analysis"

const client = process.env.ANTHROPIC_API_KEY
  ? new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })
  : null

const SYSTEM_PROMPT = `You are an expert semantic SEO analyst working for Holistic Radar, a premium agency that combines semantic SEO, persuasion psychology, and conversion strategy.

You analyze websites through Holistic Radar's proprietary 6-Layer Semantic Authority Framework — a strategic interpretive framework for analyzing how modern search systems likely evaluate content.

The 6 layers are:
${LAYERS.map(l => `Layer ${l.number}: ${l.name} — ${l.question}`).join("\n")}

IMPORTANT GUIDELINES:
- Use probabilistic, professional language: "signals suggest", "this appears", "likely gap", "this indicates"
- Never claim exact access to Google's private algorithm
- Never promise guaranteed rankings
- Separate observed signals from inferred strategic conclusions
- Be genuinely useful and specific in recommendations
- Return your analysis as valid JSON matching the exact schema requested`

function buildAnalysisPrompt(features: ExtractedFeatures, heuristicScores: LayerScore[], qualifiers?: QualifierData): string {
  return `Analyze this website's semantic authority based on the extracted signals below. The heuristic scoring system has already generated baseline scores — your role is to provide qualitative interpretation, adjust scores where your semantic analysis warrants it (±15 max per layer), and generate actionable recommendations.

EXTRACTED FEATURES:
${JSON.stringify(features, null, 2)}

HEURISTIC BASELINE SCORES:
${heuristicScores.map(s => `Layer ${s.layerNumber} (${s.layerName}): ${s.score}/100`).join("\n")}

${qualifiers ? `BUSINESS CONTEXT:
- Business Type: ${qualifiers.businessType || "Not specified"}
- Industry: ${qualifiers.industry || "Not specified"}
- Market: ${qualifiers.market || "Not specified"}
- Growth Goal: ${qualifiers.growthGoal || "Not specified"}
- Primary Offer: ${qualifiers.primaryOffer || "Not specified"}` : ""}

Return a JSON object with this exact structure:
{
  "overallSummary": "2-3 sentence executive summary of the site's semantic authority posture",
  "layerAdjustments": [
    {
      "layerNumber": 1,
      "adjustment": 0,
      "qualitativeInsight": "1-2 sentence interpretation of this layer's performance",
      "strengths": ["specific strength 1", "specific strength 2"],
      "weaknesses": ["specific weakness 1", "specific weakness 2"],
      "recommendation": "One specific, actionable improvement step"
    }
  ],
  "topBlockers": ["blocker 1", "blocker 2", "blocker 3"],
  "strengths": ["strength 1", "strength 2", "strength 3"],
  "quickWins": ["quick win 1", "quick win 2", "quick win 3"],
  "roadmapNow": ["immediate action 1", "immediate action 2"],
  "roadmapNext": ["next phase action 1", "next phase action 2"],
  "roadmapLater": ["long-term action 1", "long-term action 2"],
  "conversionReadiness": 65,
  "ctaRecommendation": "Specific recommendation for improving conversion path"
}

Include exactly 6 items in layerAdjustments (one per layer). Keep adjustments between -15 and +15. Be specific and actionable.`
}

export async function analyzeWithClaude(
  features: ExtractedFeatures,
  heuristicScores: LayerScore[],
  qualifiers?: QualifierData
): Promise<ClaudeAnalysisResponse | null> {
  if (!client) {
    console.warn("Claude API key not configured — using heuristic-only analysis")
    return null
  }

  try {
    const message = await client.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 4096,
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: "user",
          content: buildAnalysisPrompt(features, heuristicScores, qualifiers),
        },
      ],
    })

    const textBlock = message.content.find(b => b.type === "text")
    if (!textBlock || textBlock.type !== "text") {
      throw new Error("No text response from Claude")
    }

    // Extract JSON from response (handle potential markdown code blocks)
    let jsonStr = textBlock.text
    const jsonMatch = jsonStr.match(/```(?:json)?\s*([\s\S]*?)```/)
    if (jsonMatch) {
      jsonStr = jsonMatch[1]
    }

    const parsed = JSON.parse(jsonStr.trim()) as ClaudeAnalysisResponse
    return parsed
  } catch (error) {
    console.error("Claude API error:", error)
    return null
  }
}

export function mergeClaudeWithHeuristics(
  heuristicScores: LayerScore[],
  claudeResponse: ClaudeAnalysisResponse | null
): LayerScore[] {
  if (!claudeResponse) {
    return heuristicScores.map(score => ({
      ...score,
      insight: getDefaultInsight(score.layerNumber, score.score),
      strengths: getDefaultStrengths(score.layerNumber, score.score),
      weaknesses: getDefaultWeaknesses(score.layerNumber, score.score),
      recommendation: getDefaultRecommendation(score.layerNumber, score.score),
    }))
  }

  return heuristicScores.map(score => {
    const adjustment = claudeResponse.layerAdjustments.find(a => a.layerNumber === score.layerNumber)
    if (!adjustment) return score

    const adjustedScore = Math.max(0, Math.min(100, Math.round(score.score + adjustment.adjustment)))
    const label = getScoreLabelFromScore(adjustedScore)

    return {
      ...score,
      score: adjustedScore,
      label,
      insight: adjustment.qualitativeInsight,
      strengths: adjustment.strengths,
      weaknesses: adjustment.weaknesses,
      recommendation: adjustment.recommendation,
    }
  })
}

function getScoreLabelFromScore(score: number): string {
  if (score >= 91) return "Elite"
  if (score >= 81) return "Advanced"
  if (score >= 61) return "Strong"
  if (score >= 41) return "Developing"
  if (score >= 21) return "Emerging"
  return "Weak"
}

function getDefaultInsight(layer: number, score: number): string {
  const quality = score >= 61 ? "solid" : score >= 41 ? "moderate" : "limited"
  const insights: Record<number, string> = {
    1: `Lexical signal quality appears ${quality}. The page's token diversity and phrase positioning ${score >= 61 ? "suggest clear topical signaling" : "indicate room for improved topic-language alignment"}.`,
    2: `Document structure shows ${quality} semantic legibility. ${score >= 61 ? "Heading hierarchy and content architecture support relevance interpretation." : "Structural improvements could strengthen how search systems parse this content."}`,
    3: `Topical coverage is ${quality}. ${score >= 61 ? "The content addresses multiple relevant subtopics with reasonable depth." : "Several expected subtopics and information gain opportunities appear to be missing."}`,
    4: `Intent alignment appears ${quality}. ${score >= 61 ? "The content format and depth likely match user expectations for this query type." : "There may be gaps between what users expect and what this content delivers."}`,
    5: `Entity authority signals are ${quality}. ${score >= 61 ? "Trust markers and authorship clarity support credibility." : "Search systems may find it difficult to assess the authority behind this content."}`,
    6: `Task fulfillment capacity is ${quality}. ${score >= 61 ? "The page appears to support the broader user journey beyond just answering a query." : "The content may answer the immediate query but likely falls short of completing the user's broader task."}`,
  }
  return insights[layer] || ""
}

function getDefaultStrengths(layer: number, score: number): string[] {
  if (score < 30) return ["Basic content presence detected"]
  if (score < 60) return ["Foundation exists for improvement", "Some relevant signals detected"]
  return ["Solid foundational signals", "Appropriate content depth", "Relevant structural patterns"]
}

function getDefaultWeaknesses(layer: number, score: number): string[] {
  const weaknesses: Record<number, string[]> = {
    1: ["Token diversity could be improved", "Phrase positioning may lack strategic placement"],
    2: ["Heading hierarchy could be more intentional", "Schema markup opportunities exist"],
    3: ["Content gaps likely exist in subtopic coverage", "Information gain opportunities appear available"],
    4: ["Format-intent alignment could be strengthened", "Micro-intent coverage appears incomplete"],
    5: ["Author/entity clarity could be enhanced", "Trust signals may be insufficient"],
    6: ["User journey support appears limited", "Next-step guidance could be more explicit"],
  }
  return weaknesses[layer] || ["Improvement opportunities identified"]
}

function getDefaultRecommendation(layer: number, score: number): string {
  const recs: Record<number, string> = {
    1: "Audit your key phrases and ensure important terms appear in strategic positions — title, H1, first paragraph, and heading text.",
    2: "Review your heading hierarchy for logical flow, add schema markup where appropriate, and ensure your intro paragraph clearly signals the page's purpose.",
    3: "Map out the subtopics a comprehensive resource on this topic should cover, identify gaps in your current content, and prioritize adding the highest-value missing sections.",
    4: "Analyze the top-ranking content for your target queries to understand format and depth expectations, then align your content accordingly.",
    5: "Create or enhance your About page with clear expertise signals, add author information to content pages, and ensure your brand's topical specialization is clearly communicated.",
    6: "Add clear next-step guidance, link to related resources that support the broader user journey, and ensure your content resolves the user's complete task rather than just answering a narrow query.",
  }
  return recs[layer] || "Focus on improving the foundational signals for this layer."
}

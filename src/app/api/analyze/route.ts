import { NextRequest, NextResponse } from "next/server"
import { runFullAnalysis } from "@/lib/analysis"
import { normalizeUrl } from "@/lib/utils"
import type { QualifierData } from "@/types/analysis"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { url, qualifiers } = body as { url: string; qualifiers?: QualifierData }

    if (!url || typeof url !== "string") {
      return NextResponse.json({ error: "URL is required" }, { status: 400 })
    }

    // Validate URL format
    const normalized = normalizeUrl(url)
    try {
      new URL(normalized)
    } catch {
      return NextResponse.json({ error: "Invalid URL format" }, { status: 400 })
    }

    const result = await runFullAnalysis(normalized, qualifiers)

    // Generate a simple ID for the analysis (in production, this would be from the database)
    const id = generateId()
    result.id = id

    // Store in memory cache for retrieval (in production, use database)
    analysisCache.set(id, result)

    return NextResponse.json(result)
  } catch (error) {
    console.error("Analysis error:", error)
    const message = error instanceof Error ? error.message : "Analysis failed"
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

// Simple in-memory cache (replace with database in production)
const analysisCache = new Map<string, unknown>()

function generateId(): string {
  return "hr_" + Date.now().toString(36) + Math.random().toString(36).substring(2, 8)
}

// Export cache for use by report route
export { analysisCache }

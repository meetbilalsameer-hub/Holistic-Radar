import { NextRequest, NextResponse } from "next/server"
import { analysisCache } from "../../analyze/route"

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params

  if (!id) {
    return NextResponse.json({ error: "Report ID is required" }, { status: 400 })
  }

  const analysis = analysisCache.get(id)

  if (!analysis) {
    return NextResponse.json({ error: "Report not found" }, { status: 404 })
  }

  return NextResponse.json(analysis)
}

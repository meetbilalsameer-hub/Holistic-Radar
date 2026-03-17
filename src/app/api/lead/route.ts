import { NextRequest, NextResponse } from "next/server"
import { sendReportEmail, sendInternalNotification } from "@/lib/email"
import type { LeadFormData } from "@/types/lead"

// In-memory lead storage (replace with database in production)
const leadStore = new Map<string, unknown>()

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, company, website, monthlyTraffic, monthlyRevenue, challenge, analysisId } = body as LeadFormData & { analysisId: string }

    if (!name || !email) {
      return NextResponse.json({ error: "Name and email are required" }, { status: 400 })
    }

    if (!email.includes("@") || !email.includes(".")) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 })
    }

    const leadId = "lead_" + Date.now().toString(36) + Math.random().toString(36).substring(2, 8)

    const lead = {
      id: leadId,
      name,
      email,
      company,
      website,
      monthlyTraffic,
      monthlyRevenue,
      challenge,
      analysisId,
      createdAt: new Date().toISOString(),
    }

    leadStore.set(leadId, lead)

    // Send emails (placeholder)
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
    const reportUrl = `${appUrl}/report/${analysisId}`

    await Promise.all([
      sendReportEmail(email, name, reportUrl),
      sendInternalNotification(name, email, website, 0),
    ])

    return NextResponse.json({
      id: leadId,
      analysisId,
      reportUrl: `/report/${analysisId}`,
    })
  } catch (error) {
    console.error("Lead capture error:", error)
    return NextResponse.json({ error: "Failed to save lead" }, { status: 500 })
  }
}

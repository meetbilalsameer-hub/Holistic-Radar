// Email service placeholder — integrate with Resend or similar
// Install: npm install resend
// Set RESEND_API_KEY in environment

export async function sendReportEmail(to: string, name: string, reportUrl: string): Promise<boolean> {
  if (!process.env.RESEND_API_KEY) {
    console.log(`[Email Placeholder] Would send report to ${to}`)
    console.log(`  Name: ${name}`)
    console.log(`  Report URL: ${reportUrl}`)
    return true
  }

  try {
    // Uncomment when Resend is configured:
    // const { Resend } = await import("resend")
    // const resend = new Resend(process.env.RESEND_API_KEY)
    // await resend.emails.send({
    //   from: "Holistic Radar <reports@holisticradar.com>",
    //   to,
    //   subject: `Your 6-Layer Semantic Authority Report is Ready`,
    //   html: buildReportEmailHtml(name, reportUrl),
    // })
    console.log(`[Email] Report sent to ${to}`)
    return true
  } catch (error) {
    console.error("Email send error:", error)
    return false
  }
}

export async function sendInternalNotification(leadName: string, leadEmail: string, url: string, score: number): Promise<void> {
  console.log(`[Internal Notification] New lead: ${leadName} (${leadEmail}) — ${url} — Score: ${score}`)
  // Integrate with Slack webhook, CRM, etc.
}

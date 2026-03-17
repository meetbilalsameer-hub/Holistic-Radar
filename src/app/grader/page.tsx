import { GraderFlow } from "@/components/grader/GraderFlow"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "6-Layer Semantic Authority Grader | Holistic Radar",
  description: "Free tool to analyze your website's semantic authority across 6 critical layers. Get actionable insights and a strategic improvement roadmap.",
}

export default function GraderPage() {
  return <GraderFlow />
}

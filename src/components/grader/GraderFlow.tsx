"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { URLInput } from "./URLInput"
import { QualifierForm } from "./QualifierForm"
import { AnalysisProgress } from "./AnalysisProgress"
import { PartialResults } from "./PartialResults"
import { LeadCaptureForm } from "./LeadCaptureForm"
import type { AnalysisResult, QualifierData, PartialResult } from "@/types/analysis"

type Step = "url" | "qualifiers" | "analyzing" | "partial" | "lead-capture" | "redirecting"

export function GraderFlow() {
  const [step, setStep] = useState<Step>("url")
  const [url, setUrl] = useState("")
  const [qualifiers, setQualifiers] = useState<QualifierData>({})
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleURLSubmit = (submittedUrl: string) => {
    setUrl(submittedUrl)
    setStep("qualifiers")
  }

  const handleQualifiersSubmit = async (quals: QualifierData) => {
    setQualifiers(quals)
    setStep("analyzing")
    setError(null)

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, qualifiers: quals }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || "Analysis failed")
      }

      const result: AnalysisResult = await response.json()
      setAnalysisResult(result)
      setStep("partial")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong")
      setStep("url")
    }
  }

  const handleSkipQualifiers = () => {
    handleQualifiersSubmit({})
  }

  const handleUnlockReport = () => {
    setStep("lead-capture")
  }

  const handleLeadSubmit = async (leadData: { name: string; email: string; company?: string; monthlyTraffic?: string; monthlyRevenue?: string; challenge?: string }) => {
    if (!analysisResult) return

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...leadData,
          website: url,
          analysisId: analysisResult.id,
        }),
      })

      if (!response.ok) throw new Error("Failed to save")

      const data = await response.json()
      setStep("redirecting")

      // Redirect to full report
      window.location.href = data.reportUrl
    } catch {
      setError("Failed to save your information. Please try again.")
    }
  }

  const partialResult: PartialResult | null = analysisResult
    ? {
        overallScore: analysisResult.overallScore,
        highlightedLayers: analysisResult.layerScores.slice(0, 2),
        topInsights: analysisResult.strengths.slice(0, 2),
        missedOpportunity: analysisResult.quickWins[0] || "Optimization opportunities detected",
      }
    : null

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        {/* Step indicator */}
        <div className="flex items-center justify-center gap-2 mb-12">
          {["URL", "Details", "Analyzing", "Results", "Report"].map((label, i) => {
            const stepIndex = ["url", "qualifiers", "analyzing", "partial", "lead-capture"].indexOf(step)
            const isActive = i <= stepIndex
            return (
              <div key={label} className="flex items-center gap-2">
                <div className={`h-2 w-2 rounded-full transition-colors ${isActive ? "bg-cyan-400" : "bg-white/10"}`} />
                <span className={`text-xs hidden sm:inline ${isActive ? "text-cyan-400" : "text-gray-600"}`}>{label}</span>
                {i < 4 && <div className={`w-8 h-px ${isActive ? "bg-cyan-500/30" : "bg-white/5"}`} />}
              </div>
            )
          })}
        </div>

        {error && (
          <motion.div
            className="mb-6 rounded-lg border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-400"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {error}
          </motion.div>
        )}

        <AnimatePresence mode="wait">
          {step === "url" && (
            <motion.div key="url" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <URLInput onSubmit={handleURLSubmit} />
            </motion.div>
          )}

          {step === "qualifiers" && (
            <motion.div key="qualifiers" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <QualifierForm onSubmit={handleQualifiersSubmit} onSkip={handleSkipQualifiers} />
            </motion.div>
          )}

          {step === "analyzing" && (
            <motion.div key="analyzing" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <AnalysisProgress url={url} />
            </motion.div>
          )}

          {step === "partial" && partialResult && (
            <motion.div key="partial" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <PartialResults result={partialResult} onUnlock={handleUnlockReport} />
            </motion.div>
          )}

          {step === "lead-capture" && (
            <motion.div key="lead" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <LeadCaptureForm onSubmit={handleLeadSubmit} url={url} />
            </motion.div>
          )}

          {step === "redirecting" && (
            <motion.div key="redirecting" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
              <div className="w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-gray-400">Loading your full report...</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

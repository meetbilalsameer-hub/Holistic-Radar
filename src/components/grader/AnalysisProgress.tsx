"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Radar } from "lucide-react"

const stages = [
  "Crawling website...",
  "Extracting page signals...",
  "Analyzing lexical patterns...",
  "Evaluating document structure...",
  "Mapping topical coverage...",
  "Assessing intent alignment...",
  "Checking authority signals...",
  "Running 6-layer diagnosis...",
  "Generating insights...",
]

export function AnalysisProgress({ url }: { url: string }) {
  const [currentStage, setCurrentStage] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStage((prev) => (prev < stages.length - 1 ? prev + 1 : prev))
    }, 2500)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="text-center py-12">
      <div className="relative w-20 h-20 mx-auto mb-8">
        <div className="absolute inset-0 rounded-full border-2 border-cyan-500/20" />
        <div className="absolute inset-0 rounded-full border-2 border-cyan-500 border-t-transparent animate-spin" />
        <div className="absolute inset-0 flex items-center justify-center">
          <Radar className="h-8 w-8 text-cyan-400 animate-radar-pulse" />
        </div>
      </div>

      <h2 className="text-2xl font-bold text-white mb-2">Analyzing Your Website</h2>
      <p className="text-sm text-gray-500 mb-8 font-mono">{url}</p>

      <div className="max-w-sm mx-auto space-y-2">
        {stages.map((stage, i) => (
          <motion.div
            key={stage}
            className={`flex items-center gap-3 text-sm px-4 py-2 rounded-lg transition-colors ${
              i < currentStage
                ? "text-cyan-400 bg-cyan-500/5"
                : i === currentStage
                  ? "text-white bg-white/5"
                  : "text-gray-600"
            }`}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: i <= currentStage ? 1 : 0.3, x: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <div className={`h-1.5 w-1.5 rounded-full ${
              i < currentStage ? "bg-cyan-400" : i === currentStage ? "bg-white animate-pulse" : "bg-gray-700"
            }`} />
            {stage}
          </motion.div>
        ))}
      </div>
    </div>
  )
}

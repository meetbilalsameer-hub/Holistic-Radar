"use client"

import { motion } from "framer-motion"
import { getScoreColor, getScoreLabel, getScoreBgColor } from "@/lib/utils"
import type { AnalysisResult } from "@/types/analysis"

export function ScoreOverview({ result }: { result: AnalysisResult }) {
  return (
    <div className="text-center mb-12">
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, type: "spring" }}
      >
        <div className="relative inline-flex flex-col items-center mb-8">
          <div className="absolute inset-0 -m-8 rounded-full bg-cyan-500/5 blur-xl" />
          <div className={`relative text-8xl font-bold ${getScoreColor(result.overallScore)} mb-2`}>
            {result.overallScore}
          </div>
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-semibold ${getScoreBgColor(result.overallScore)} ${getScoreColor(result.overallScore)}`}>
            {getScoreLabel(result.overallScore)} Semantic Authority
          </div>
        </div>
      </motion.div>

      <motion.p
        className="text-gray-400 max-w-2xl mx-auto leading-relaxed"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        {result.overallSummary}
      </motion.p>

      {/* Quick stats */}
      <motion.div
        className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 max-w-2xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        {[
          { label: "Strongest Layer", value: result.layerScores.reduce((a, b) => a.score > b.score ? a : b).layerName.split("/")[0].trim() },
          { label: "Weakest Layer", value: result.layerScores.reduce((a, b) => a.score < b.score ? a : b).layerName.split("/")[0].trim() },
          { label: "Quick Wins", value: result.quickWins.length.toString() },
          { label: "Conversion Score", value: result.conversionReadiness.toString() },
        ].map((stat) => (
          <div key={stat.label} className="rounded-lg bg-white/[0.03] border border-white/5 p-3">
            <div className="text-sm font-bold text-white">{stat.value}</div>
            <div className="text-xs text-gray-500">{stat.label}</div>
          </div>
        ))}
      </motion.div>
    </div>
  )
}

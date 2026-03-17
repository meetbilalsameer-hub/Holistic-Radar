"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Lock, ArrowRight, TrendingUp, AlertTriangle, CheckCircle } from "lucide-react"
import { getScoreColor, getScoreLabel } from "@/lib/utils"
import type { PartialResult } from "@/types/analysis"

interface PartialResultsProps {
  result: PartialResult
  onUnlock: () => void
}

export function PartialResults({ result, onUnlock }: PartialResultsProps) {
  return (
    <div>
      <div className="text-center mb-10">
        <h2 className="text-2xl font-bold text-white mb-2">Analysis Complete</h2>
        <p className="text-gray-400 text-sm">Here&apos;s a preview of your 6-layer diagnosis.</p>
      </div>

      {/* Overall Score */}
      <motion.div
        className="text-center mb-10"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, type: "spring" }}
      >
        <div className="inline-flex flex-col items-center">
          <div className={`text-7xl font-bold ${getScoreColor(result.overallScore)} mb-2`}>
            {result.overallScore}
          </div>
          <div className="text-sm text-gray-400">Overall Semantic Authority Score</div>
          <div className={`text-xs font-semibold mt-1 ${getScoreColor(result.overallScore)}`}>
            {getScoreLabel(result.overallScore)}
          </div>
        </div>
      </motion.div>

      {/* Highlighted layers */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        {result.highlightedLayers.map((layer, i) => (
          <motion.div
            key={layer.layerNumber}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.15 }}
          >
            <Card>
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs text-gray-500">Layer {layer.layerNumber}</span>
                  <span className={`text-lg font-bold ${getScoreColor(layer.score)}`}>{layer.score}</span>
                </div>
                <h3 className="text-sm font-semibold text-white mb-1">{layer.layerName}</h3>
                <p className="text-xs text-gray-400 leading-relaxed">{layer.insight}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Insights preview */}
      <motion.div
        className="space-y-3 mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        {result.topInsights.map((insight, i) => (
          <div key={i} className="flex items-start gap-3 rounded-lg bg-emerald-500/5 border border-emerald-500/10 p-4">
            <CheckCircle className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
            <span className="text-sm text-gray-300">{insight}</span>
          </div>
        ))}

        <div className="flex items-start gap-3 rounded-lg bg-amber-500/5 border border-amber-500/10 p-4">
          <AlertTriangle className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
          <span className="text-sm text-gray-300">{result.missedOpportunity}</span>
        </div>
      </motion.div>

      {/* Locked content teaser */}
      <motion.div
        className="relative rounded-xl border border-white/10 bg-white/[0.02] p-8 text-center overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/80 to-transparent" />
        <div className="relative z-10">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Lock className="h-5 w-5 text-cyan-400" />
            <span className="text-sm font-medium text-white">Full Report Locked</span>
          </div>
          <p className="text-sm text-gray-400 mb-6 max-w-md mx-auto">
            Unlock your complete 6-layer breakdown, detailed recommendations, priority roadmap, and actionable improvement steps.
          </p>
          <div className="flex flex-wrap justify-center gap-2 mb-6 text-xs text-gray-500">
            {["4 more layer scores", "Detailed diagnostics", "Priority roadmap", "Quick wins", "Conversion analysis"].map((item) => (
              <span key={item} className="bg-white/5 px-2 py-1 rounded">
                <TrendingUp className="h-3 w-3 inline mr-1" />
                {item}
              </span>
            ))}
          </div>
          <Button onClick={onUnlock} size="lg" className="group">
            Unlock Full Report
            <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </motion.div>
    </div>
  )
}

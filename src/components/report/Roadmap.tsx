"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import type { AnalysisResult } from "@/types/analysis"

export function Roadmap({ result }: { result: AnalysisResult }) {
  const phases = [
    { title: "Now", subtitle: "Immediate Actions", items: result.roadmapNow, color: "border-cyan-500/30 bg-cyan-500/5" },
    { title: "Next", subtitle: "Short-Term Strategy", items: result.roadmapNext, color: "border-blue-500/30 bg-blue-500/5" },
    { title: "Later", subtitle: "Long-Term Growth", items: result.roadmapLater, color: "border-violet-500/30 bg-violet-500/5" },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8 }}
    >
      <h3 className="text-lg font-semibold text-white mb-6 text-center">Priority Roadmap</h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {phases.map((phase, i) => (
          <div key={phase.title} className={`rounded-xl border ${phase.color} p-5`}>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-bold text-white bg-white/10 px-2 py-0.5 rounded">{phase.title}</span>
              <span className="text-xs text-gray-400">{phase.subtitle}</span>
            </div>
            <ul className="space-y-2">
              {phase.items.map((item, j) => (
                <li key={j} className="flex items-start gap-2 text-sm text-gray-300">
                  <ArrowRight className="h-3.5 w-3.5 text-gray-500 shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
            {i < 2 && (
              <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2">
                <ArrowRight className="h-4 w-4 text-gray-600" />
              </div>
            )}
          </div>
        ))}
      </div>
    </motion.div>
  )
}

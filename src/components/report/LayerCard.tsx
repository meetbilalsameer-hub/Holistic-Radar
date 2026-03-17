"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, CheckCircle, AlertTriangle, Lightbulb } from "lucide-react"
import { Card } from "@/components/ui/card"
import { getScoreColor, getScoreBgColor } from "@/lib/utils"
import type { LayerScore } from "@/types/analysis"
import { LAYERS } from "@/types/analysis"

const layerGradients = [
  "from-violet-500/10", "from-blue-500/10", "from-cyan-500/10",
  "from-emerald-500/10", "from-amber-500/10", "from-rose-500/10",
]

export function LayerCard({ layer, index }: { layer: LayerScore; index: number }) {
  const [expanded, setExpanded] = useState(false)
  const definition = LAYERS[index]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Card
        className={`overflow-hidden cursor-pointer hover:border-white/20 transition-colors bg-gradient-to-r ${layerGradients[index]} to-transparent`}
        onClick={() => setExpanded(!expanded)}
      >
        <div className="p-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border ${getScoreBgColor(layer.score)} font-bold text-lg ${getScoreColor(layer.score)}`}>
                {layer.score}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500">Layer {layer.layerNumber}</span>
                  <span className={`text-xs px-1.5 py-0.5 rounded ${getScoreBgColor(layer.score)} ${getScoreColor(layer.score)}`}>
                    {layer.label}
                  </span>
                </div>
                <h3 className="font-semibold text-white">{layer.layerName}</h3>
              </div>
            </div>
            <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform ${expanded ? "rotate-180" : ""}`} />
          </div>

          {layer.insight && (
            <p className="text-sm text-gray-400 mt-3 leading-relaxed">{layer.insight}</p>
          )}
        </div>

        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="px-5 pb-5 border-t border-white/5 pt-4 space-y-4">
                {/* Question */}
                {definition && (
                  <p className="text-sm italic text-cyan-400/80">
                    &ldquo;{definition.question}&rdquo;
                  </p>
                )}

                {/* Strengths */}
                {layer.strengths.length > 0 && (
                  <div>
                    <h4 className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-2">Strengths</h4>
                    <ul className="space-y-1.5">
                      {layer.strengths.map((s, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                          <CheckCircle className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Weaknesses */}
                {layer.weaknesses.length > 0 && (
                  <div>
                    <h4 className="text-xs font-semibold text-amber-400 uppercase tracking-wider mb-2">Weaknesses</h4>
                    <ul className="space-y-1.5">
                      {layer.weaknesses.map((w, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                          <AlertTriangle className="h-3.5 w-3.5 text-amber-400 shrink-0 mt-0.5" />
                          {w}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Recommendation */}
                {layer.recommendation && (
                  <div className="rounded-lg bg-cyan-500/5 border border-cyan-500/10 p-3">
                    <div className="flex items-start gap-2">
                      <Lightbulb className="h-4 w-4 text-cyan-400 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-xs font-semibold text-cyan-400 mb-1">Recommendation</h4>
                        <p className="text-sm text-gray-300">{layer.recommendation}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </motion.div>
  )
}

"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"
import { LAYERS } from "@/types/analysis"

const layerColors = [
  "from-violet-500/20 to-violet-500/5 border-violet-500/20",
  "from-blue-500/20 to-blue-500/5 border-blue-500/20",
  "from-cyan-500/20 to-cyan-500/5 border-cyan-500/20",
  "from-emerald-500/20 to-emerald-500/5 border-emerald-500/20",
  "from-amber-500/20 to-amber-500/5 border-amber-500/20",
  "from-rose-500/20 to-rose-500/5 border-rose-500/20",
]

const layerAccentColors = [
  "text-violet-400",
  "text-blue-400",
  "text-cyan-400",
  "text-emerald-400",
  "text-amber-400",
  "text-rose-400",
]

export function FrameworkPreview() {
  const [expanded, setExpanded] = useState<number | null>(null)

  return (
    <section id="framework" className="py-24 sm:py-32 border-t border-white/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-xs font-semibold text-cyan-400 uppercase tracking-widest mb-3">Proprietary Framework</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            The 6-Layer Semantic Authority Framework
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Our strategic interpretive framework for analyzing how modern search systems likely evaluate content. Six layers. One complete picture.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-3">
          {LAYERS.map((layer, i) => (
            <motion.div
              key={layer.number}
              className={`rounded-xl border bg-gradient-to-r ${layerColors[i]} overflow-hidden cursor-pointer`}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              onClick={() => setExpanded(expanded === i ? null : i)}
            >
              <div className="flex items-center justify-between p-5">
                <div className="flex items-center gap-4">
                  <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-black/30 font-bold text-sm ${layerAccentColors[i]}`}>
                    L{layer.number}
                  </div>
                  <div>
                    <h3 className="font-semibold text-white text-sm sm:text-base">{layer.name}</h3>
                    <p className="text-xs text-gray-400">{layer.shortName}</p>
                  </div>
                </div>
                <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform ${expanded === i ? "rotate-180" : ""}`} />
              </div>

              <AnimatePresence>
                {expanded === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-5 border-t border-white/5 pt-4">
                      <p className={`text-sm italic mb-3 ${layerAccentColors[i]}`}>
                        &ldquo;{layer.question}&rdquo;
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {layer.measures.map((measure) => (
                          <span key={measure} className="text-xs bg-black/20 text-gray-300 px-2.5 py-1 rounded-md border border-white/5">
                            {measure}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

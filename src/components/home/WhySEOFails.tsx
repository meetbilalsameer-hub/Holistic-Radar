"use client"

import { motion } from "framer-motion"
import { X } from "lucide-react"

const failures = [
  {
    title: "Keyword Obsession",
    description: "Chasing individual keywords instead of building semantic relevance across topic clusters.",
  },
  {
    title: "Fragmented Content",
    description: "Publishing disconnected articles without a coherent topical architecture or internal linking strategy.",
  },
  {
    title: "Zero Authority Building",
    description: "No entity clarity, no author signals, no trust infrastructure — search systems can't validate the source.",
  },
  {
    title: "Ignoring Conversion",
    description: "Traffic without persuasion. Content that ranks but doesn't convert, guide, or move users forward.",
  },
]

export function WhySEOFails() {
  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-xs font-semibold text-red-400 uppercase tracking-widest mb-3">The Problem</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Why Traditional SEO Keeps Failing
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Most SEO strategies are stuck in 2015 — obsessing over keywords while ignoring how modern search systems actually evaluate content.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {failures.map((failure, i) => (
            <motion.div
              key={failure.title}
              className="relative rounded-xl border border-red-500/10 bg-red-500/[0.03] p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-500/10">
                  <X className="h-4 w-4 text-red-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1">{failure.title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{failure.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

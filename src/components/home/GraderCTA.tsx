"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Radar, ArrowRight, CheckCircle } from "lucide-react"

const features = [
  "6-layer semantic authority diagnosis",
  "Structural, topical, and intent analysis",
  "Entity authority assessment",
  "Actionable improvement roadmap",
  "Instant partial results, full report via email",
]

export function GraderCTA() {
  return (
    <section className="py-24 sm:py-32 border-t border-white/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="relative overflow-hidden rounded-2xl border border-cyan-500/20 bg-gradient-to-br from-cyan-500/10 via-transparent to-blue-500/10 p-8 sm:p-12 md:p-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl" />

          <div className="relative grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/5 px-3 py-1 text-xs text-cyan-400 mb-6">
                <Radar className="h-3.5 w-3.5" />
                Free Lead Magnet Tool
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                How Strong Is Your Semantic Authority?
              </h2>
              <p className="text-gray-400 mb-8 leading-relaxed">
                Enter your URL and get a comprehensive 6-layer analysis of how search systems likely perceive your content&apos;s authority, relevance, and strategic positioning.
              </p>
              <Link href="/grader">
                <Button size="lg" className="group">
                  Run Free Analysis
                  <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>

            <div className="space-y-3">
              {features.map((feature, i) => (
                <motion.div
                  key={feature}
                  className="flex items-center gap-3 bg-black/20 rounded-lg px-4 py-3 border border-white/5"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <CheckCircle className="h-4 w-4 text-cyan-400 shrink-0" />
                  <span className="text-sm text-gray-300">{feature}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

"use client"

import { motion } from "framer-motion"
import { Brain, Search, TrendingUp, Check } from "lucide-react"

const pillars = [
  {
    icon: Search,
    title: "Semantic SEO",
    description: "We don't chase keywords. We build semantic relevance — structuring content so search systems understand your topical authority at every layer.",
    points: ["Topical architecture", "Entity optimization", "Semantic structure"],
  },
  {
    icon: Brain,
    title: "Persuasion Psychology",
    description: "Every piece of content is engineered to move users. We apply conversion psychology to make your content work as a sales asset, not just a ranking target.",
    points: ["Conversion-driven copy", "Intent-matched messaging", "Strategic CTAs"],
  },
  {
    icon: TrendingUp,
    title: "Systems Thinking",
    description: "Individual pages don't win. Systems do. We build interconnected content ecosystems that compound authority and conversions over time.",
    points: ["Content architecture", "Internal linking systems", "Compounding authority"],
  },
]

export function HolisticDifference() {
  return (
    <section className="py-24 sm:py-32 border-t border-white/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-xs font-semibold text-cyan-400 uppercase tracking-widest mb-3">The Solution</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            The Holistic Radar Difference
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Three disciplines. One integrated strategy. We combine what others keep separate.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.title}
              className="rounded-xl border border-white/10 bg-white/[0.02] p-8 hover:border-cyan-500/20 transition-colors"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/10 border border-cyan-500/20 mb-5">
                <pillar.icon className="h-6 w-6 text-cyan-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">{pillar.title}</h3>
              <p className="text-sm text-gray-400 leading-relaxed mb-5">{pillar.description}</p>
              <ul className="space-y-2">
                {pillar.points.map((point) => (
                  <li key={point} className="flex items-center gap-2 text-sm text-gray-300">
                    <Check className="h-3.5 w-3.5 text-cyan-500" />
                    {point}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

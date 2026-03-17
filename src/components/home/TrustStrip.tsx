"use client"

import { motion } from "framer-motion"
import { Shield, Brain, Layers, Target, User, TrendingUp } from "lucide-react"

const trustItems = [
  { icon: User, label: "Founder-Led Strategy" },
  { icon: Brain, label: "Semantic SEO + Persuasion" },
  { icon: Layers, label: "6-Layer Methodology" },
  { icon: Shield, label: "Premium Strategy Only" },
  { icon: Target, label: "Conversion-Focused" },
  { icon: TrendingUp, label: "Intelligent Growth" },
]

export function TrustStrip() {
  return (
    <section className="border-y border-white/5 bg-white/[0.01]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {trustItems.map((item) => (
            <div key={item.label} className="flex items-center gap-2 text-gray-500">
              <item.icon className="h-4 w-4 text-cyan-500/60" />
              <span className="text-xs font-medium tracking-wide uppercase">{item.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

"use client"

import { motion } from "framer-motion"
import { Search, Layers, PenTool, Layout, FileText, ClipboardCheck } from "lucide-react"

const services = [
  {
    icon: Search,
    title: "Semantic SEO Strategy",
    description: "Deep semantic analysis and optimization strategy that makes search systems understand your topical authority and relevance.",
  },
  {
    icon: Layers,
    title: "Topical Authority Systems",
    description: "Complete content architecture — topic clusters, internal linking systems, and entity frameworks that compound authority.",
  },
  {
    icon: PenTool,
    title: "Persuasion Copywriting",
    description: "Copy that ranks and converts. We merge search relevance with persuasion psychology to create content that drives revenue.",
  },
  {
    icon: Layout,
    title: "Homepage Messaging",
    description: "Strategic homepage positioning that immediately communicates your value, builds trust, and converts visitors into leads.",
  },
  {
    icon: FileText,
    title: "Content Systems",
    description: "Scalable content operations — editorial frameworks, content briefs, and production systems designed for growth.",
  },
  {
    icon: ClipboardCheck,
    title: "Strategic Audits",
    description: "Deep-dive analysis through our 6-layer framework. We identify exactly where your content ecosystem is leaking authority and conversions.",
  },
]

export function ServicesSection() {
  return (
    <section id="services" className="py-24 sm:py-32 border-t border-white/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-xs font-semibold text-cyan-400 uppercase tracking-widest mb-3">What We Do</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Services Built for Authority
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Every service is designed around building real semantic authority — not surface-level optimization.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              className="group rounded-xl border border-white/5 bg-white/[0.02] p-7 hover:border-cyan-500/20 hover:bg-white/[0.04] transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-cyan-500/10 border border-cyan-500/20 mb-5 group-hover:bg-cyan-500/15 transition-colors">
                <service.icon className="h-5 w-5 text-cyan-400" />
              </div>
              <h3 className="text-base font-semibold text-white mb-2">{service.title}</h3>
              <p className="text-sm text-gray-400 leading-relaxed">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

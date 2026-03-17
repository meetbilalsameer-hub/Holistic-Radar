"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"

const faqs = [
  {
    q: "What makes Holistic Radar different from other SEO agencies?",
    a: "We don't just do SEO — we combine semantic SEO, persuasion psychology, and systems thinking into one integrated strategy. Our 6-layer framework analyzes content the way modern search systems actually evaluate it, not the way most agencies still assume they do.",
  },
  {
    q: "What is the 6-Layer Semantic Authority Framework?",
    a: "It's our proprietary strategic interpretive framework for analyzing how modern search systems likely evaluate content. It covers six dimensions — from lexical signals and document structure to topical completeness, intent alignment, entity authority, and holistic task fulfillment. Each layer represents a distinct dimension of content quality that search systems appear to assess.",
  },
  {
    q: "How does the free grader tool work?",
    a: "Enter your website URL, and our system extracts over 40 signals from your site. We then run a hybrid analysis — combining deterministic heuristic checks with AI-powered qualitative interpretation — to score your site across all 6 layers. You get a partial preview instantly, and the full report after providing your contact details.",
  },
  {
    q: "Is this tool claiming to know Google's algorithm?",
    a: "No. Our framework is a strategic interpretive model based on publicly available research, patents, documentation, and years of practical experience. We use language like 'signals suggest' and 'likely indicates' because we're interpreting observable patterns, not claiming insider access.",
  },
  {
    q: "Who should use Holistic Radar?",
    a: "We work best with businesses that are serious about building real search authority — not looking for quick hacks. If you want a strategic partner who combines deep search understanding with conversion psychology, we're a great fit. We typically work with B2B companies, SaaS, professional services, and content-driven businesses.",
  },
  {
    q: "What does a typical engagement look like?",
    a: "Every engagement starts with a deep strategic audit using our 6-layer framework. From there, we build a customized roadmap — which may include topical authority planning, content architecture, persuasion copywriting, entity optimization, and conversion system design. We focus on building compounding systems, not one-off tasks.",
  },
]

export function FAQSection() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section className="py-24 sm:py-32 border-t border-white/5">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-white mb-4">Frequently Asked Questions</h2>
          <p className="text-gray-400">Common questions about our approach and methodology.</p>
        </motion.div>

        <div className="space-y-2">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              className="rounded-xl border border-white/5 bg-white/[0.02] overflow-hidden"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <button
                className="flex items-center justify-between w-full p-5 text-left cursor-pointer"
                onClick={() => setOpen(open === i ? null : i)}
              >
                <span className="text-sm font-medium text-white pr-4">{faq.q}</span>
                <ChevronDown className={`h-4 w-4 text-gray-400 shrink-0 transition-transform ${open === i ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-5">
                      <p className="text-sm text-gray-400 leading-relaxed">{faq.a}</p>
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

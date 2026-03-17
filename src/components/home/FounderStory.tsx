"use client"

import { motion } from "framer-motion"
import { Quote } from "lucide-react"

export function FounderStory() {
  return (
    <section id="about" className="py-24 sm:py-32 border-t border-white/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="relative">
              <div className="aspect-square max-w-sm rounded-2xl bg-gradient-to-br from-cyan-500/20 via-blue-500/10 to-transparent border border-white/10 flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-cyan-500/30 to-blue-500/30 border border-cyan-500/20 mx-auto mb-4 flex items-center justify-center">
                    <span className="text-3xl font-bold text-cyan-400">HR</span>
                  </div>
                  <p className="text-sm text-gray-400">Founder & Strategist</p>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 rounded-xl bg-cyan-500/5 border border-cyan-500/10 -z-10" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-xs font-semibold text-cyan-400 uppercase tracking-widest mb-3">The Founder</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Built from the Intersection of Search, Language, and Systems
            </h2>

            <div className="relative mb-6">
              <Quote className="absolute -top-2 -left-2 h-8 w-8 text-cyan-500/20" />
              <p className="text-gray-400 leading-relaxed pl-6">
                I started as a content writer, became a copywriter, then went deep into semantic SEO. My engineering background gave me systems thinking — the ability to see how all the pieces connect. I studied under the work of pioneers like Koray Tugberk Gubur and Bill Slawski, and developed a proprietary 6-layer framework for understanding how modern search actually works.
              </p>
            </div>

            <p className="text-gray-400 leading-relaxed mb-8">
              After 6 years in SEO, I realized that the industry was broken — fragmented between keyword chasers, technical auditors, and content farms. Nobody was combining semantic understanding with persuasion psychology and systems thinking. That&apos;s why I built Holistic Radar — to offer what the market doesn&apos;t: complete semantic authority strategy.
            </p>

            <div className="grid grid-cols-3 gap-4">
              {[
                { value: "6 Years", label: "In SEO" },
                { value: "Semantic", label: "SEO Focus" },
                { value: "Systems", label: "Engineering Mind" },
              ].map((item) => (
                <div key={item.label} className="rounded-lg bg-white/[0.03] border border-white/5 p-3 text-center">
                  <div className="text-sm font-bold text-white">{item.value}</div>
                  <div className="text-xs text-gray-500">{item.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

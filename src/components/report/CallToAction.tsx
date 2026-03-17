"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Calendar } from "lucide-react"

export function ReportCTA() {
  return (
    <motion.div
      className="rounded-2xl border border-cyan-500/20 bg-gradient-to-br from-cyan-500/10 via-transparent to-blue-500/10 p-8 sm:p-12 text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.0 }}
    >
      <h3 className="text-2xl font-bold text-white mb-3">
        Ready to Build Real Semantic Authority?
      </h3>
      <p className="text-gray-400 max-w-xl mx-auto mb-8">
        This report shows you where you stand. Let us show you where you could be. Book a strategy call to discuss a custom roadmap for your business.
      </p>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <a href="mailto:hello@holisticradar.com">
          <Button size="lg" className="group">
            <Calendar className="h-4 w-4 mr-2" />
            Book Strategy Call
            <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </a>
      </div>

      <p className="text-xs text-gray-600 mt-4">
        Free 30-minute call. No obligation. Real strategy.
      </p>
    </motion.div>
  )
}

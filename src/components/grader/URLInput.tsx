"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Radar, ArrowRight, Globe } from "lucide-react"

interface URLInputProps {
  onSubmit: (url: string) => void
}

export function URLInput({ onSubmit }: URLInputProps) {
  const [url, setUrl] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (url.trim()) {
      onSubmit(url.trim())
    }
  }

  return (
    <div className="text-center">
      <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/5 px-4 py-1.5 text-xs text-cyan-400 mb-6">
        <Radar className="h-3.5 w-3.5" />
        6-Layer Semantic Authority Grader
      </div>

      <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
        How Strong Is Your Semantic Authority?
      </h1>
      <p className="text-gray-400 max-w-lg mx-auto mb-10">
        Enter your website URL to receive a comprehensive 6-layer analysis of how search systems likely perceive your content.
      </p>

      <form onSubmit={handleSubmit} className="max-w-xl mx-auto">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
            <Input
              type="text"
              placeholder="Enter your website URL..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="pl-10 h-13"
              autoFocus
            />
          </div>
          <Button type="submit" size="lg" disabled={!url.trim()} className="group shrink-0">
            Analyze
            <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </form>

      <p className="text-xs text-gray-600 mt-4">
        Free analysis. No credit card required. Results in under 30 seconds.
      </p>
    </div>
  )
}

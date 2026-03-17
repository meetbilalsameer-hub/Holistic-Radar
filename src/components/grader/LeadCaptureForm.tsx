"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowRight, Shield, Mail } from "lucide-react"

interface LeadCaptureFormProps {
  onSubmit: (data: {
    name: string
    email: string
    company?: string
    monthlyTraffic?: string
    monthlyRevenue?: string
    challenge?: string
  }) => void
  url: string
}

export function LeadCaptureForm({ onSubmit, url }: LeadCaptureFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    monthlyTraffic: "",
    monthlyRevenue: "",
    challenge: "",
  })
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.email) return
    setSubmitting(true)
    await onSubmit(formData)
    setSubmitting(false)
  }

  return (
    <div>
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/5 px-3 py-1 text-xs text-cyan-400 mb-4">
          <Mail className="h-3.5 w-3.5" />
          Almost There
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Unlock Your Full Report</h2>
        <p className="text-gray-400 text-sm max-w-md mx-auto">
          Enter your details to access the complete 6-layer diagnosis, priority roadmap, and actionable recommendations for <span className="text-white font-mono text-xs">{url}</span>.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-gray-400 mb-1.5">Name *</label>
            <Input
              required
              placeholder="Your name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-xs text-gray-400 mb-1.5">Email *</label>
            <Input
              required
              type="email"
              placeholder="you@company.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>
        </div>

        <div>
          <label className="block text-xs text-gray-400 mb-1.5">Company</label>
          <Input
            placeholder="Your company name"
            value={formData.company}
            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-gray-400 mb-1.5">Monthly Traffic (optional)</label>
            <Input
              placeholder="e.g., 10K-50K"
              value={formData.monthlyTraffic}
              onChange={(e) => setFormData({ ...formData, monthlyTraffic: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-xs text-gray-400 mb-1.5">Monthly Revenue (optional)</label>
            <Input
              placeholder="e.g., $10K-$50K"
              value={formData.monthlyRevenue}
              onChange={(e) => setFormData({ ...formData, monthlyRevenue: e.target.value })}
            />
          </div>
        </div>

        <div>
          <label className="block text-xs text-gray-400 mb-1.5">Main Marketing Challenge (optional)</label>
          <textarea
            className="flex w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all duration-200 min-h-[80px] resize-none"
            placeholder="What's your biggest content or SEO challenge right now?"
            value={formData.challenge}
            onChange={(e) => setFormData({ ...formData, challenge: e.target.value })}
          />
        </div>

        <Button type="submit" size="lg" className="w-full group" disabled={submitting || !formData.name || !formData.email}>
          {submitting ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
              Generating Report...
            </>
          ) : (
            <>
              Get Full Report
              <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </Button>

        <div className="flex items-center justify-center gap-2 text-xs text-gray-600">
          <Shield className="h-3 w-3" />
          We respect your privacy. No spam. Unsubscribe anytime.
        </div>
      </form>
    </div>
  )
}

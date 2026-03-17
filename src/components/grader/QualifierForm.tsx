"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { QualifierData } from "@/types/analysis"
import { ArrowRight, SkipForward } from "lucide-react"

interface QualifierFormProps {
  onSubmit: (data: QualifierData) => void
  onSkip: () => void
}

export function QualifierForm({ onSubmit, onSkip }: QualifierFormProps) {
  const [data, setData] = useState<QualifierData>({})

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(data)
  }

  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">Tell Us About Your Business</h2>
        <p className="text-gray-400 text-sm">
          Optional — helps us provide more targeted recommendations.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
        <div>
          <label className="block text-xs text-gray-400 mb-1.5">Business Type</label>
          <Input
            placeholder="e.g., SaaS, E-commerce, Agency, B2B..."
            value={data.businessType || ""}
            onChange={(e) => setData({ ...data, businessType: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-xs text-gray-400 mb-1.5">Industry</label>
          <Input
            placeholder="e.g., Technology, Healthcare, Finance..."
            value={data.industry || ""}
            onChange={(e) => setData({ ...data, industry: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-xs text-gray-400 mb-1.5">Target Market</label>
          <Input
            placeholder="e.g., US, Global, Europe..."
            value={data.market || ""}
            onChange={(e) => setData({ ...data, market: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-xs text-gray-400 mb-1.5">Main Growth Goal</label>
          <Input
            placeholder="e.g., Organic traffic, Lead generation, Brand authority..."
            value={data.growthGoal || ""}
            onChange={(e) => setData({ ...data, growthGoal: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-xs text-gray-400 mb-1.5">Primary Offer</label>
          <Input
            placeholder="e.g., Marketing software, Consulting services..."
            value={data.primaryOffer || ""}
            onChange={(e) => setData({ ...data, primaryOffer: e.target.value })}
          />
        </div>

        <div className="flex gap-3 pt-4">
          <Button type="button" variant="ghost" onClick={onSkip} className="flex-1">
            <SkipForward className="h-4 w-4 mr-2" />
            Skip
          </Button>
          <Button type="submit" className="flex-1 group">
            Continue
            <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </form>
    </div>
  )
}

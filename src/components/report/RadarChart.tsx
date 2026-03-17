"use client"

import { motion } from "framer-motion"
import {
  Radar,
  RadarChart as RechartsRadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts"
import type { LayerScore } from "@/types/analysis"

export function RadarChart({ layers }: { layers: LayerScore[] }) {
  const data = layers.map((layer) => ({
    subject: `L${layer.layerNumber}`,
    fullName: layer.layerName,
    score: layer.score,
    fullMark: 100,
  }))

  return (
    <motion.div
      className="rounded-xl border border-white/10 bg-white/[0.02] p-6"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.4 }}
    >
      <h3 className="text-sm font-semibold text-white mb-4 text-center">6-Layer Authority Radar</h3>
      <div className="h-[300px] sm:h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          <RechartsRadarChart data={data} cx="50%" cy="50%" outerRadius="75%">
            <PolarGrid stroke="rgba(255,255,255,0.05)" />
            <PolarAngleAxis
              dataKey="subject"
              tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 12 }}
            />
            <PolarRadiusAxis
              angle={90}
              domain={[0, 100]}
              tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 10 }}
              tickCount={5}
            />
            <Radar
              name="Score"
              dataKey="score"
              stroke="#06b6d4"
              fill="#06b6d4"
              fillOpacity={0.15}
              strokeWidth={2}
            />
          </RechartsRadarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-4">
        {layers.map((layer) => (
          <div key={layer.layerNumber} className="flex items-center gap-2 text-xs text-gray-400">
            <span className="text-cyan-400 font-mono">L{layer.layerNumber}</span>
            <span className="truncate">{layer.layerName}</span>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatScore(score: number): string {
  return Math.round(score).toString()
}

export function getScoreLabel(score: number): string {
  if (score >= 91) return "Elite"
  if (score >= 81) return "Advanced"
  if (score >= 61) return "Strong"
  if (score >= 41) return "Developing"
  if (score >= 21) return "Emerging"
  return "Weak"
}

export function getScoreColor(score: number): string {
  if (score >= 81) return "text-emerald-400"
  if (score >= 61) return "text-cyan-400"
  if (score >= 41) return "text-amber-400"
  if (score >= 21) return "text-orange-400"
  return "text-red-400"
}

export function getScoreBgColor(score: number): string {
  if (score >= 81) return "bg-emerald-500/20 border-emerald-500/30"
  if (score >= 61) return "bg-cyan-500/20 border-cyan-500/30"
  if (score >= 41) return "bg-amber-500/20 border-amber-500/30"
  if (score >= 21) return "bg-orange-500/20 border-orange-500/30"
  return "bg-red-500/20 border-red-500/30"
}

export function normalizeUrl(url: string): string {
  let normalized = url.trim().toLowerCase()
  if (!normalized.startsWith("http://") && !normalized.startsWith("https://")) {
    normalized = "https://" + normalized
  }
  try {
    const parsed = new URL(normalized)
    return parsed.origin + parsed.pathname.replace(/\/+$/, "")
  } catch {
    return normalized
  }
}

export function extractDomain(url: string): string {
  try {
    return new URL(normalizeUrl(url)).hostname
  } catch {
    return url
  }
}

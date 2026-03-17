"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, Radar } from "lucide-react"

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-gray-950/80 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-cyan-500/10 border border-cyan-500/20">
              <Radar className="h-5 w-5 text-cyan-400" />
            </div>
            <span className="text-lg font-bold text-white tracking-tight">
              Holistic<span className="text-cyan-400">Radar</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link href="/#framework" className="text-sm text-gray-400 hover:text-white transition-colors">
              Framework
            </Link>
            <Link href="/#services" className="text-sm text-gray-400 hover:text-white transition-colors">
              Services
            </Link>
            <Link href="/#about" className="text-sm text-gray-400 hover:text-white transition-colors">
              About
            </Link>
            <Link href="/grader">
              <Button size="sm">Free Analysis</Button>
            </Link>
          </div>

          <button
            className="md:hidden p-2 text-gray-400 hover:text-white"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {mobileOpen && (
          <div className="md:hidden border-t border-white/5 py-4 space-y-3">
            <Link href="/#framework" className="block text-sm text-gray-400 hover:text-white py-2" onClick={() => setMobileOpen(false)}>
              Framework
            </Link>
            <Link href="/#services" className="block text-sm text-gray-400 hover:text-white py-2" onClick={() => setMobileOpen(false)}>
              Services
            </Link>
            <Link href="/#about" className="block text-sm text-gray-400 hover:text-white py-2" onClick={() => setMobileOpen(false)}>
              About
            </Link>
            <Link href="/grader" onClick={() => setMobileOpen(false)}>
              <Button size="sm" className="w-full">Free Analysis</Button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}

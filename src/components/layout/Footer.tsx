import Link from "next/link"
import { Radar } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-gray-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-cyan-500/10 border border-cyan-500/20">
                <Radar className="h-5 w-5 text-cyan-400" />
              </div>
              <span className="text-lg font-bold text-white tracking-tight">
                Holistic<span className="text-cyan-400">Radar</span>
              </span>
            </Link>
            <p className="text-sm text-gray-500 max-w-sm leading-relaxed">
              Premium semantic SEO and persuasion strategy. We combine deep search understanding with conversion psychology to build authority systems that grow your business.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Services</h4>
            <ul className="space-y-2">
              <li><Link href="/#services" className="text-sm text-gray-500 hover:text-gray-300 transition-colors">Semantic SEO Strategy</Link></li>
              <li><Link href="/#services" className="text-sm text-gray-500 hover:text-gray-300 transition-colors">Topical Authority Systems</Link></li>
              <li><Link href="/#services" className="text-sm text-gray-500 hover:text-gray-300 transition-colors">Persuasion Copywriting</Link></li>
              <li><Link href="/#services" className="text-sm text-gray-500 hover:text-gray-300 transition-colors">Strategic Audits</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Resources</h4>
            <ul className="space-y-2">
              <li><Link href="/grader" className="text-sm text-gray-500 hover:text-gray-300 transition-colors">Free Grader Tool</Link></li>
              <li><Link href="/#framework" className="text-sm text-gray-500 hover:text-gray-300 transition-colors">6-Layer Framework</Link></li>
              <li><Link href="/#about" className="text-sm text-gray-500 hover:text-gray-300 transition-colors">About</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-600">
            &copy; {new Date().getFullYear()} Holistic Radar. All rights reserved.
          </p>
          <p className="text-xs text-gray-600">
            Semantic SEO &middot; Persuasion Strategy &middot; Conversion Systems
          </p>
        </div>
      </div>
    </footer>
  )
}

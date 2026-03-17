import type { Metadata } from "next"
import "./globals.css"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"

export const metadata: Metadata = {
  title: "Holistic Radar | Semantic SEO + Persuasion Strategy Agency",
  description: "Premium agency combining semantic SEO, persuasion psychology, and conversion strategy. Build real semantic authority with our 6-layer framework.",
  keywords: ["semantic SEO", "topical authority", "persuasion copywriting", "content strategy", "SEO agency"],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased bg-gray-950 text-gray-100" style={{ fontFamily: "system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif" }}>
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  )
}

import './globals.css'
import SiteNav from '../components/SiteNav'

export const metadata = {
  title: 'AIPrice - AI API Price Comparison',
  description: 'Compare prices, speed, and reliability across 30+ AI API providers. Find the cheapest Claude, GPT-4, Gemini API.',
  keywords: 'AI API, Claude API, GPT-4 API, LLM API, price comparison, cheapest API',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-[#0f172a]">
        <nav className="border-b border-slate-700 bg-[#1e293b]">
          <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl">⚡</span>
              <span className="text-xl font-bold text-white">AIPrice</span>
              <span className="text-xs bg-indigo-500/20 text-indigo-400 px-2 py-0.5 rounded-full">beta</span>
            </div>
            <SiteNav />
          </div>
        </nav>
        <main className="max-w-7xl mx-auto px-4 py-8">
          {children}
        </main>
        <footer className="border-t border-slate-700 mt-16 py-8 text-center text-slate-500 text-sm">
          <p>© 2026 AIPrice. Compare AI API prices across providers.</p>
          <p className="mt-1">Data updated automatically. Prices in USD per million tokens.</p>
        </footer>
      </body>
    </html>
  )
}

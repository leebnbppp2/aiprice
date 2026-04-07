import providers from '../../data/providers.json'
import ProviderCard from '../../components/ProviderCard'

export const metadata = {
  title: 'AI API Providers Directory — AIPrice',
  description: 'Browse AI API providers by type, region, and payment method. Compare official APIs, aggregators, cloud platforms, and regional resellers.',
}

const typeLabels = { official: 'official', aggregator: 'aggregator', cloud: 'cloud', proxy: 'proxy' }
const labels = {
  region: 'Region',
  payments: 'Payments',
  visit: 'Visit website',
  global: 'Global',
  china: 'China-friendly',
}

export default function ProvidersPage() {
  return (
    <div className="space-y-12">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-3xl border border-slate-800/60 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 px-8 py-12 md:px-14 md:py-16">
        <div className="hero-glow" />
        <div className="relative max-w-3xl">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-slate-700/60 bg-slate-800/50 px-3.5 py-1 text-xs font-medium text-slate-400">
            <span className="h-1.5 w-1.5 rounded-full bg-indigo-400 animate-pulse" />
            Provider directory
          </div>
          <h1 className="mt-5 text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-[3.25rem] lg:leading-[1.15]">
            AI API providers,{' '}
            <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
              in one place
            </span>
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-400">
            Browse official APIs, aggregators, cloud platforms, and regional resellers before you dive into price tables.
          </p>
        </div>

        <div className="relative mt-10 grid gap-4 sm:grid-cols-3">
          {[
            { value: `${providers.length}+`, label: 'providers tracked' },
            { value: '4', label: 'provider types' },
            { value: 'Global + CN', label: 'access patterns' },
          ].map((stat) => (
            <div key={stat.label} className="rounded-2xl border border-slate-800/60 bg-slate-800/20 p-5 backdrop-blur-sm">
              <div className="text-2xl font-bold tracking-tight text-white">{stat.value}</div>
              <div className="mt-1.5 text-sm text-slate-500">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Grid */}
      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {providers.map((provider) => (
          <ProviderCard key={provider.id} provider={provider} typeLabels={typeLabels} labels={labels} />
        ))}
      </section>
    </div>
  )
}

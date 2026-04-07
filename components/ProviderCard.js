import ProviderLogo from './ProviderLogo'

function getTypeStyle(type) {
  const styles = {
    official: 'bg-emerald-500/10 text-emerald-400 ring-1 ring-emerald-500/20',
    aggregator: 'bg-indigo-500/10 text-indigo-400 ring-1 ring-indigo-500/20',
    cloud: 'bg-amber-500/10 text-amber-400 ring-1 ring-amber-500/20',
    proxy: 'bg-fuchsia-500/10 text-fuchsia-400 ring-1 ring-fuchsia-500/20',
  }
  return styles[type] || 'bg-slate-700/40 text-slate-400 ring-1 ring-slate-600/40'
}

export default function ProviderCard({ provider, typeLabels, labels }) {
  return (
    <article className="provider-card group relative flex flex-col rounded-2xl border border-slate-800/80 bg-slate-900/60 p-6 backdrop-blur-sm transition-all duration-200 hover:border-slate-700/80 hover:bg-slate-900/90 hover:shadow-lg hover:shadow-slate-950/40 hover:-translate-y-0.5">
      {/* Header */}
      <div className="flex items-start gap-4">
        <ProviderLogo provider={provider} />
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h2 className="truncate text-[1.05rem] font-semibold leading-snug text-white">
                {provider.name}
              </h2>
              <p className="mt-0.5 text-xs font-mono text-slate-500 tracking-wide">
                {provider.id}
              </p>
            </div>
            <span className={`badge-cjk shrink-0 rounded-md text-[0.7rem] font-medium tracking-wide ${getTypeStyle(provider.type)}`}>
              {typeLabels[provider.type] || provider.type}
            </span>
          </div>
        </div>
      </div>

      {/* Metadata */}
      <div className="mt-5 flex-1 space-y-0 rounded-xl bg-slate-800/30 ring-1 ring-slate-800/60">
        <div className="flex items-center justify-between px-4 py-3">
          <span className="text-xs font-medium uppercase tracking-wider text-slate-500">{labels.region}</span>
          <span className="text-sm text-slate-300">{provider.region === 'china' ? labels.china : labels.global}</span>
        </div>
        <div className="border-t border-slate-800/60" />
        <div className="flex items-start justify-between gap-3 px-4 py-3">
          <span className="text-xs font-medium uppercase tracking-wider text-slate-500 pt-0.5">{labels.payments}</span>
          <div className="flex flex-wrap justify-end gap-1.5">
            {provider.payment.map((method) => (
              <span key={method} className="badge-cjk rounded-md bg-slate-800/80 text-[0.7rem] text-slate-400 ring-1 ring-slate-700/40">
                {method.replace('_', ' ')}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="mt-5">
        <a
          href={provider.website}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex w-full items-center justify-center gap-1.5 rounded-xl bg-slate-800/70 px-4 py-2.5 text-sm font-medium text-slate-300 ring-1 ring-slate-700/50 transition-all duration-150 hover:bg-indigo-600/20 hover:text-indigo-300 hover:ring-indigo-500/30 group-hover:ring-slate-700/70"
        >
          {labels.visit}
          <svg className="h-3.5 w-3.5 transition-transform duration-150 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
          </svg>
        </a>
      </div>
    </article>
  )
}

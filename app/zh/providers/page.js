import providers from '../../../data/providers.json'
import ProviderCard from '../../../components/ProviderCard'

const typeLabels = { official: '官方', aggregator: '聚合', cloud: '云平台', proxy: '中转' }
const labels = {
  region: '地区',
  payments: '支付方式',
  visit: '访问官网',
  global: '全球',
  china: '中国友好',
}

export default function ZhProvidersPage() {
  return (
    <div lang="zh" className="space-y-12">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-3xl border border-slate-800/60 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 px-8 py-12 md:px-14 md:py-16">
        <div className="hero-glow" />
        <div className="relative max-w-3xl">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-slate-700/60 bg-slate-800/50 px-3.5 py-1 text-xs font-medium text-slate-400">
            <span className="h-1.5 w-1.5 rounded-full bg-indigo-400 animate-pulse" />
            服务商目录
          </div>
          <h1 className="mt-5 text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-[3.25rem] lg:leading-[1.15]">
            AI API 服务商，
            <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
              一页看全
            </span>
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-400">
            集中浏览官方 API、聚合平台、云厂商和区域 reseller。在看价格表之前，先快速判断接入方式、支付方式和区域适配性。
          </p>
        </div>

        <div className="relative mt-10 grid gap-4 sm:grid-cols-3">
          {[
            { value: `${providers.length}+`, label: '已收录服务商' },
            { value: '4', label: '服务商类型' },
            { value: '全球 + 中国友好', label: '覆盖地区' },
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

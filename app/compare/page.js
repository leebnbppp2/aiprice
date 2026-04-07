import models from '../../data/models.json'
import providers from '../../data/providers.json'

export const metadata = {
  title: 'How to Compare AI API Providers — AIPrice',
  description: 'A practical guide to comparing AI API providers by price, access, payment methods, and model coverage.',
}

function cheapestFor(model) {
  let best = null
  for (const [providerId, price] of Object.entries(model.pricing)) {
    if (!price) continue
    if (!best || price.input < best.input) best = { providerId, ...price }
  }
  return best
}

function copy(lang) {
  return lang === 'zh'
    ? {
        tag: '对比指南',
        title: '怎么比较 AI API 服务商，才不容易踩坑',
        desc: '不要只看模型名。真正该比的是总成本、买得到买不到、区域可用性、支付方式，以及官方直连和中转的差异。',
        stepTitle: '四个最该看的维度',
        steps: [
          ['先看模型覆盖', '先确认对方到底支持哪些模型、上下文长度和更新速度。很多“支持 Claude / GPT”只是旧版本或有限路由。'],
          ['再看真实价格', '同样是 Claude 或 GPT，不同服务商的输入、输出价差可能很大。便宜不只看 headline，要看你常用模型的单价。'],
          ['再看购买难度', '有些官方 API 更稳定，但注册、支付、区域限制更强；中转或 reseller 的优势在于更容易买和更灵活付款。'],
          ['最后看风险和稳定性', '如果你是生产环境使用，价格不是唯一标准。稳定性、限流、支持质量、结算透明度也要一起看。'],
        ],
        snapshot: '快速市场快照',
        tracked: '服务商',
        models: '模型',
        lowest: '最低价样例',
        tableTitle: '当前几个高关注模型的最低价',
        model: '模型',
        vendor: '厂商',
        bestPrice: '最低价',
        bestProvider: '最低价服务商',
      }
    : {
        tag: 'Comparison guide',
        title: 'How to compare AI API providers without wasting budget',
        desc: 'Do not compare by model name alone. The useful comparison is total cost, access friction, regional availability, payment options, and the tradeoff between official APIs and resellers.',
        stepTitle: 'The four things that matter most',
        steps: [
          ['Start with model coverage', 'Check which models are actually available, how current they are, and what context limits you get. “Supports Claude/GPT” can still mean incomplete routing.'],
          ['Then compare real pricing', 'Input and output token prices vary more than most buyers expect. The headline brand matters less than the exact model and the actual unit economics.'],
          ['Then compare buying friction', 'Official APIs may be cleaner, but resellers and proxies often win on payment methods, region access, and speed of setup.'],
          ['Finally compare risk and stability', 'For production use, price is not enough. Reliability, rate limits, support quality, and settlement transparency matter too.'],
        ],
        snapshot: 'Quick market snapshot',
        tracked: 'providers',
        models: 'models',
        lowest: 'example cheapest quotes',
        tableTitle: 'Cheapest current quotes for a few watched models',
        model: 'Model',
        vendor: 'Vendor',
        bestPrice: 'Lowest Price',
        bestProvider: 'Cheapest Provider',
      }
}

export default function ComparePage() {
  const lang = 'en'
  const t = copy(lang)
  const featured = [...models].sort((a, b) => b.intelligence - a.intelligence).slice(0, 6)

  return (
    <div className="space-y-10">
      <section className="rounded-3xl border border-slate-800 bg-gradient-to-b from-slate-900 to-slate-950 p-8 md:p-12">
        <div className="max-w-4xl">
          <div className="inline-flex items-center rounded-full border border-slate-700 bg-slate-800/70 px-3 py-1 text-xs text-slate-300">{t.tag}</div>
          <h1 className="mt-4 text-4xl md:text-5xl font-bold tracking-tight text-white">{t.title}</h1>
          <p className="mt-4 text-lg leading-8 text-slate-400">{t.desc}</p>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5"><div className="text-2xl font-bold text-white">{providers.length}+</div><div className="mt-1 text-sm text-slate-400">{t.tracked}</div></div>
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5"><div className="text-2xl font-bold text-white">{models.length}+</div><div className="mt-1 text-sm text-slate-400">{t.models}</div></div>
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5"><div className="text-2xl font-bold text-white">Live</div><div className="mt-1 text-sm text-slate-400">{t.lowest}</div></div>
        </div>
      </section>

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {t.steps.map(([title, desc]) => (
          <div key={title} className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
            <h2 className="text-lg font-semibold text-white">{title}</h2>
            <p className="mt-3 text-sm leading-7 text-slate-400">{desc}</p>
          </div>
        ))}
      </section>

      <section className="rounded-3xl border border-slate-800 bg-slate-900/70 p-8">
        <h2 className="text-2xl font-semibold text-white">{t.tableTitle}</h2>
        <div className="mt-6 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400">
                <th className="px-4 py-3 text-left">{t.model}</th>
                <th className="px-4 py-3 text-left">{t.vendor}</th>
                <th className="px-4 py-3 text-left">{t.bestPrice}</th>
                <th className="px-4 py-3 text-left">{t.bestProvider}</th>
              </tr>
            </thead>
            <tbody>
              {featured.map((model) => {
                const best = cheapestFor(model)
                return (
                  <tr key={model.id} className="border-b border-slate-800/70">
                    <td className="px-4 py-3 text-white">{model.name}</td>
                    <td className="px-4 py-3 text-slate-400">{model.vendor}</td>
                    <td className="px-4 py-3 text-emerald-400">${best.input}/${best.output}</td>
                    <td className="px-4 py-3 text-slate-300">{best.providerId}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}

import models from '../../../data/models.json'
import providers from '../../../data/providers.json'

function cheapestFor(model) {
  let best = null
  for (const [providerId, price] of Object.entries(model.pricing)) {
    if (!price) continue
    if (!best || price.input < best.input) best = { providerId, ...price }
  }
  return best
}

export default function ZhComparePage() {
  const featured = [...models].sort((a, b) => b.intelligence - a.intelligence).slice(0, 6)
  return <div lang="zh" className="space-y-10">
    <section className="rounded-3xl border border-slate-800 bg-gradient-to-b from-slate-900 to-slate-950 p-8 md:p-12"><div className="max-w-4xl"><div className="inline-flex items-center rounded-full border border-slate-700 bg-slate-800/70 px-3 py-1 text-xs text-slate-300">对比指南</div><h1 className="mt-4 text-4xl md:text-5xl font-bold tracking-tight text-white">怎么比较 AI API 服务商，才不容易踩坑</h1><p className="mt-4 text-lg leading-8 text-slate-400">不要只看模型名。真正该比的是总成本、买得到买不到、区域可用性、支付方式，以及官方直连和中转的差异。</p></div><div className="mt-8 grid gap-4 sm:grid-cols-3"><div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5"><div className="text-2xl font-bold text-white">{providers.length}+</div><div className="mt-1 text-sm text-slate-400">服务商</div></div><div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5"><div className="text-2xl font-bold text-white">{models.length}+</div><div className="mt-1 text-sm text-slate-400">模型</div></div><div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5"><div className="text-2xl font-bold text-white">Live</div><div className="mt-1 text-sm text-slate-400">最低价快照</div></div></div></section>
    <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">{[['先看模型覆盖','先确认对方到底支持哪些模型、上下文长度和更新速度。很多“支持 Claude / GPT”只是旧版本或有限路由。'],['再看真实价格','同样是 Claude 或 GPT，不同服务商的输入、输出价差可能很大。'],['再看购买难度','官方 API 更稳定，但区域和支付限制更强；中转或 reseller 的优势是更容易买。'],['最后看风险和稳定性','生产环境里，价格不是唯一标准。稳定性、限流和结算透明度也要一起看。']].map(([title,desc])=><div key={title} className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6"><h2 className="text-lg font-semibold text-white">{title}</h2><p className="mt-3 text-sm leading-7 text-slate-400">{desc}</p></div>)}</section>
    <section className="rounded-3xl border border-slate-800 bg-slate-900/70 p-8"><h2 className="text-2xl font-semibold text-white">当前几个高关注模型的最低价</h2><div className="mt-6 overflow-x-auto"><table className="w-full text-sm"><thead><tr className="border-b border-slate-800 text-slate-400"><th className="px-4 py-3 text-left">模型</th><th className="px-4 py-3 text-left">厂商</th><th className="px-4 py-3 text-left">最低价</th><th className="px-4 py-3 text-left">最低价服务商</th></tr></thead><tbody>{featured.map((model)=>{const best=cheapestFor(model); return <tr key={model.id} className="border-b border-slate-800/70"><td className="px-4 py-3 text-white">{model.name}</td><td className="px-4 py-3 text-slate-400">{model.vendor}</td><td className="px-4 py-3 text-emerald-400">${best.input}/${best.output}</td><td className="px-4 py-3 text-slate-300">{best.providerId}</td></tr>})}</tbody></table></div></section>
  </div>
}

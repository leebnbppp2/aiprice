import models from '../data/models.json'
import providers from '../data/providers.json'

function getLowestPrice(model) {
  let lowest = { provider: null, input: Infinity, output: Infinity }
  for (const [providerId, prices] of Object.entries(model.pricing)) {
    if (!prices) continue
    if (prices.input < lowest.input) {
      lowest = { provider: providerId, input: prices.input, output: prices.output }
    }
  }
  return lowest
}

function getOfficialPrice(model) {
  const officialMap = {
    Anthropic: 'anthropic',
    OpenAI: 'openai',
    Google: 'google',
    DeepSeek: 'deepseek',
  }
  const key = officialMap[model.vendor]
  return key ? model.pricing[key] : null
}

function getContext(lang) {
  return lang === 'zh'
    ? {
        heroTitle: 'AI API 价格对比',
        heroDesc: `横向比较 ${providers.length}+ 家服务商，快速找到更便宜、更好买、更适合你地区的 Claude、GPT、Gemini 和 Llama API。`,
        models: '模型数',
        providers: '服务商',
        pricesIn: '价格单位',
        pricesUnit: '美元 / 百万 tokens',
        score: '评分',
        context: '上下文',
        lowest: '最低价',
        cheaper: '低于官方价',
        expensive: '高于官方价',
        cheapest: '最低价',
        legend: '价格为 input/output，每百万 tokens 计价',
      }
    : {
        heroTitle: 'Compare AI API Prices',
        heroDesc: `Compare ${providers.length}+ providers to find cheaper, easier-to-buy Claude, GPT, Gemini, and Llama APIs.`,
        models: 'Models',
        providers: 'Providers',
        pricesIn: 'Prices in',
        pricesUnit: 'USD / M tokens',
        score: 'Score',
        context: 'Context',
        lowest: 'Lowest Price',
        cheaper: 'Cheaper than official',
        expensive: 'More expensive than official',
        cheapest: 'Cheapest option',
        legend: 'Prices: input/output per million tokens (USD)',
      }
}

function PriceCell({ price, officialPrice, isLowest, lang }) {
  if (!price) return <td className="px-4 py-3 text-slate-600">—</td>

  let colorClass = 'text-slate-300'
  let delta = null

  if (officialPrice && price.input < officialPrice.input) {
    colorClass = 'price-up'
    const savings = ((1 - price.input / officialPrice.input) * 100).toFixed(0)
    delta = <span className="text-[11px] font-medium text-green-500">-{savings}%</span>
  } else if (officialPrice && price.input > officialPrice.input) {
    colorClass = 'price-down'
    const markup = ((price.input / officialPrice.input - 1) * 100).toFixed(0)
    delta = <span className="text-[11px] font-medium text-red-400">+{markup}%</span>
  }

  return (
    <td className="px-4 py-3">
      <div className={`flex flex-wrap items-center gap-1.5 ${colorClass} ${isLowest ? 'font-bold' : ''}`}>
        <span className="tabular-nums">${price.input}/{price.output}</span>
        {delta}
        {isLowest && (
          <span className="inline-flex items-center rounded-md bg-green-500/20 px-1.5 py-0.5 text-[11px] font-medium leading-none text-green-400">
            {lang === 'zh' ? '最低' : 'cheapest'}
          </span>
        )}
      </div>
    </td>
  )
}

function getCategoryBadge(cat, lang) {
  const styles = {
    flagship: 'bg-purple-500/20 text-purple-400',
    balanced: 'bg-blue-500/20 text-blue-400',
    fast: 'bg-green-500/20 text-green-400',
  }
  const labels = {
    en: { flagship: 'flagship', balanced: 'balanced', fast: 'fast' },
    zh: { flagship: '旗舰', balanced: '均衡', fast: '速度' },
  }
  return (
    <span className={`text-xs px-2 py-0.5 rounded-full ${styles[cat] || ''}`}>
      {labels[lang][cat] || cat}
    </span>
  )
}

export default function Home() {
  const lang = 'en'
  const t = getContext(lang)
  const providerIds = ['anthropic', 'openai', 'google', 'openrouter', 'together', 'fireworks', 'groq', 'deepinfra', 'api2d']
  const providerMap = Object.fromEntries(providers.map((p) => [p.id, p]))
  const sortedModels = [...models].sort((a, b) => b.intelligence - a.intelligence)

  return (
    <div>
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-white mb-4">{t.heroTitle}</h1>
        <p className="text-slate-400 text-lg max-w-3xl mx-auto">{t.heroDesc}</p>
        <div className="flex flex-wrap justify-center gap-4 mt-6">
          <div className="bg-slate-800 rounded-lg px-4 py-2 text-sm">
            <span className="text-slate-400">{t.models}:</span>{' '}
            <span className="text-white font-bold">{models.length}</span>
          </div>
          <div className="bg-slate-800 rounded-lg px-4 py-2 text-sm">
            <span className="text-slate-400">{t.providers}:</span>{' '}
            <span className="text-white font-bold">{providers.length}</span>
          </div>
          <div className="bg-slate-800 rounded-lg px-4 py-2 text-sm">
            <span className="text-slate-400">{t.pricesIn}:</span>{' '}
            <span className="text-white font-bold">{t.pricesUnit}</span>
          </div>
        </div>
      </div>

      <div className="bg-[#1e293b] rounded-xl border border-slate-700 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-700">
              <th className="px-4 py-3 text-left text-slate-400 font-medium sticky left-0 bg-[#1e293b] z-10">#</th>
              <th className="px-4 py-3 text-left text-slate-400 font-medium sticky left-8 bg-[#1e293b] z-10">{lang === 'zh' ? '模型' : 'Model'}</th>
              <th className="px-4 py-3 text-left text-slate-400 font-medium">{t.score}</th>
              <th className="px-4 py-3 text-left text-slate-400 font-medium">{t.context}</th>
              <th className="px-4 py-3 text-left text-slate-400 font-medium">{t.lowest}</th>
              {providerIds.map((pid) => (
                <th key={pid} className="px-4 py-3 text-left text-slate-400 font-medium whitespace-nowrap">
                  {providerMap[pid]?.logo} {providerMap[pid]?.name || pid}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedModels.map((model, i) => {
              const lowest = getLowestPrice(model)
              const official = getOfficialPrice(model)
              return (
                <tr key={model.id} className="border-b border-slate-700/50 hover:bg-slate-700/30 transition">
                  <td className="px-4 py-3 text-slate-500 sticky left-0 bg-[#1e293b]">{i + 1}</td>
                  <td className="px-4 py-3 sticky left-8 bg-[#1e293b]">
                    <div className="flex flex-col">
                      <span className="text-white font-medium">{model.name}</span>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-xs text-slate-500">{model.vendor}</span>
                        {getCategoryBadge(model.category, lang)}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3"><span className="text-indigo-400 font-medium">{model.intelligence}</span></td>
                  <td className="px-4 py-3 text-slate-400">{model.context >= 1000000 ? `${model.context / 1000000}M` : `${model.context / 1000}K`}</td>
                  <td className="px-4 py-3">
                    <div className="text-green-400 font-bold">${lowest.input}/${lowest.output}</div>
                    <div className="text-xs text-slate-500">{lowest.provider}</div>
                  </td>
                  {providerIds.map((pid) => (
                    <PriceCell
                      key={pid}
                      price={model.pricing[pid]}
                      officialPrice={official}
                      isLowest={lowest.provider === pid}
                      lang={lang}
                    />
                  ))}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex flex-wrap gap-6 text-xs text-slate-500">
        <span><span className="price-up">■</span> {t.cheaper}</span>
        <span><span className="price-down">■</span> {t.expensive}</span>
        <span><span className="text-green-400">■</span> {t.cheapest}</span>
        <span>{t.legend}</span>
      </div>
    </div>
  )
}

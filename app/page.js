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
    'Anthropic': 'anthropic',
    'OpenAI': 'openai',
    'Google': 'google',
    'DeepSeek': 'deepseek',
  }
  const key = officialMap[model.vendor]
  return key ? model.pricing[key] : null
}

function PriceCell({ price, officialPrice, isLowest }) {
  if (!price) return <td className="px-4 py-3 text-slate-600">—</td>
  
  let colorClass = 'text-slate-300'
  let badge = null
  
  if (officialPrice && price.input < officialPrice.input) {
    colorClass = 'price-up'
    const savings = ((1 - price.input / officialPrice.input) * 100).toFixed(0)
    badge = <span className="ml-1 text-xs text-green-500">-{savings}%</span>
  } else if (officialPrice && price.input > officialPrice.input) {
    colorClass = 'price-down'
    const markup = ((price.input / officialPrice.input - 1) * 100).toFixed(0)
    badge = <span className="ml-1 text-xs text-red-400">+{markup}%</span>
  }
  
  return (
    <td className={`px-4 py-3 ${colorClass} ${isLowest ? 'font-bold' : ''}`}>
      ${price.input}/{price.output}
      {badge}
      {isLowest && <span className="ml-1 text-xs bg-green-500/20 text-green-400 px-1.5 py-0.5 rounded">cheapest</span>}
    </td>
  )
}

function getCategoryBadge(cat) {
  const styles = {
    flagship: 'bg-purple-500/20 text-purple-400',
    balanced: 'bg-blue-500/20 text-blue-400',
    fast: 'bg-green-500/20 text-green-400',
  }
  return (
    <span className={`text-xs px-2 py-0.5 rounded-full ${styles[cat] || ''}`}>
      {cat}
    </span>
  )
}

export default function Home() {
  const providerIds = ['anthropic', 'openai', 'google', 'openrouter', 'together', 'fireworks', 'groq', 'deepinfra', 'api2d']
  const providerMap = Object.fromEntries(providers.map(p => [p.id, p]))
  
  // Sort by intelligence score
  const sortedModels = [...models].sort((a, b) => b.intelligence - a.intelligence)
  
  return (
    <div>
      {/* Hero */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-white mb-4">
          Compare AI API Prices
        </h1>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
          Real-time price comparison across {providers.length}+ providers. 
          Find the cheapest Claude, GPT, Gemini, and Llama API.
        </p>
        <div className="flex justify-center gap-4 mt-6">
          <div className="bg-slate-800 rounded-lg px-4 py-2 text-sm">
            <span className="text-slate-400">Models:</span>{' '}
            <span className="text-white font-bold">{models.length}</span>
          </div>
          <div className="bg-slate-800 rounded-lg px-4 py-2 text-sm">
            <span className="text-slate-400">Providers:</span>{' '}
            <span className="text-white font-bold">{providers.length}</span>
          </div>
          <div className="bg-slate-800 rounded-lg px-4 py-2 text-sm">
            <span className="text-slate-400">Prices in:</span>{' '}
            <span className="text-white font-bold">USD / M tokens</span>
          </div>
        </div>
      </div>

      {/* Price Table */}
      <div className="bg-[#1e293b] rounded-xl border border-slate-700 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-700">
              <th className="px-4 py-3 text-left text-slate-400 font-medium sticky left-0 bg-[#1e293b] z-10">#</th>
              <th className="px-4 py-3 text-left text-slate-400 font-medium sticky left-8 bg-[#1e293b] z-10">Model</th>
              <th className="px-4 py-3 text-left text-slate-400 font-medium">Score</th>
              <th className="px-4 py-3 text-left text-slate-400 font-medium">Context</th>
              <th className="px-4 py-3 text-left text-slate-400 font-medium">Lowest Price</th>
              {providerIds.map(pid => (
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
                        {getCategoryBadge(model.category)}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-indigo-400 font-medium">{model.intelligence}</span>
                  </td>
                  <td className="px-4 py-3 text-slate-400">
                    {model.context >= 1000000 ? `${model.context/1000000}M` : `${model.context/1000}K`}
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-green-400 font-bold">${lowest.input}/${lowest.output}</div>
                    <div className="text-xs text-slate-500">{lowest.provider}</div>
                  </td>
                  {providerIds.map(pid => {
                    const price = model.pricing[pid]
                    const isLowest = lowest.provider === pid
                    return (
                      <PriceCell 
                        key={pid} 
                        price={price} 
                        officialPrice={official}
                        isLowest={isLowest}
                      />
                    )
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Legend */}
      <div className="mt-6 flex gap-6 text-xs text-slate-500">
        <span><span className="price-up">■</span> Cheaper than official</span>
        <span><span className="price-down">■</span> More expensive than official</span>
        <span><span className="text-green-400">■</span> Cheapest option</span>
        <span>Prices: input/output per million tokens (USD)</span>
      </div>
    </div>
  )
}

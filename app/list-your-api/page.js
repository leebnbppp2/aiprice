import providers from '../../data/providers.json'
import models from '../../data/models.json'

export const metadata = {
  title: 'List Your AI API on AIPrice — Get Found by Developers',
  description: 'Get your AI API listed on AIPrice, the developer-first price comparison platform. Reach developers comparing Claude, GPT-4, Gemini and 30+ providers.',
}

function PricingCard({ title, price, priceNote, features, highlighted, eyebrow }) {
  return (
    <div className={`rounded-3xl border p-7 flex flex-col shadow-lg ${highlighted ? 'border-indigo-500/50 bg-gradient-to-b from-indigo-500/15 to-slate-900 ring-1 ring-indigo-500/30' : 'border-slate-800 bg-slate-900/80'}`}>
      {eyebrow && <span className="mb-3 inline-flex w-fit rounded-full bg-white/5 px-2.5 py-1 text-xs font-medium uppercase tracking-wide text-slate-300">{eyebrow}</span>}
      <h3 className="text-xl font-semibold text-white">{title}</h3>
      <div className="mt-4 mb-5">
        <span className="text-4xl font-bold text-white">{price}</span>
        {priceNote ? <span className="ml-1 text-sm text-slate-400">{priceNote}</span> : null}
      </div>
      <ul className="space-y-3 text-sm text-slate-300 flex-1">
        {features.map((feature, index) => (
          <li key={index} className="flex gap-3"><span className="mt-0.5 text-emerald-400">✓</span><span>{feature}</span></li>
        ))}
      </ul>
    </div>
  )
}

function getCopy(lang) {
  return lang === 'zh'
    ? {
        tag: '服务商增长入口',
        title: '把你的 AI API 放到开发者正在对比的位置',
        desc: 'AIPrice 帮买家比较价格、接入方式和服务商类型。如果你的产品更便宜、更好买、地区更友好，就该出现在这里。',
        tracked: '已收录服务商',
        compared: '已对比模型',
        trust: '开发者导向',
        trustDesc: '清晰定价 + 高意图技术流量',
        basic: '基础收录',
        featured: '精选展示',
        sponsor: '首页赞助',
        month: '/ 月',
        popular: '最常选',
        cards: {
          basic: ['进入目录和对比体验', '展示你的名称、logo 和链接', '适合先要曝光、后续再加预算'],
          featured: ['基础收录全部包含', '在对比页获得高亮展示', '可配服务商 profile 和文案定位', '适合低预算测试开发者流量'],
          sponsor: ['精选展示全部包含', '首页高意图位置强化曝光', '适合新品上线、活动推广或新市场测试'],
        },
        whoTitle: '适合哪些服务商',
        whoDesc: '只要你能在价格、支付、可用性或区域接入上形成差异，就适合在 AIPrice 测试曝光。',
        who: ['API 网关和统一路由', '中转 / relay / proxy 服务', '模型托管和推理平台', '区域 reseller', '想低成本测试投放效果的团队', '价格或购买路径有优势的服务商'],
        whyTitle: '为什么是 AIPrice',
        why: [
          ['定价透明', '我们用统一格式展示 input / output 单价，开发者一眼就能看懂。'],
          ['出现在决策点', '用户来到这里不是看资讯，而是在比较“到底该买谁”。'],
          ['预算门槛低', '报价就是为了让服务商能先低成本试水，而不是一上来重投媒体预算。'],
        ],
        ctaTitle: '准备好提交了吗？',
        ctaDesc: '把服务商名称、价格页链接和你想选的套餐发过来，通常 48 小时内可以上线。',
        email: '邮件联系',
        telegram: 'Telegram 联系',
      }
    : {
        tag: 'Provider growth surface',
        title: 'List your AI API where developers are already comparing options',
        desc: 'AIPrice helps buyers compare pricing, access, and provider types in one place. If your product is cheaper, faster, region-friendly, or easier to buy, this is where that difference should be visible.',
        tracked: 'providers tracked',
        compared: 'models compared',
        trust: 'Dev-first',
        trustDesc: 'clear pricing and qualified technical traffic',
        basic: 'Basic Listing',
        featured: 'Featured Listing',
        sponsor: 'Homepage Sponsor',
        month: '/ month',
        popular: 'Most popular',
        cards: {
          basic: ['Provider name, logo, and link in the directory and comparison experience', 'Visible pricing entries beside competitor alternatives', 'Good fit for providers who just want discoverability first'],
          featured: ['Everything in Basic, plus highlighted placement in comparison views', 'Dedicated provider profile with your positioning and docs link', 'Priority update handling when your pricing changes', 'Best option if you want qualified developer traffic without a large media spend'],
          sponsor: ['Everything in Featured, plus premium homepage visibility', 'Boosted placement in high-intent traffic areas', 'Sponsor treatment for launches, promos, or market entry tests'],
        },
        whoTitle: 'Who should apply',
        whoDesc: 'AIPrice is a strong fit for providers that benefit from clear side-by-side comparison and intent-rich technical traffic.',
        who: ['API gateways and unified model routers', 'Proxy or relay providers with cheaper access or better payments', 'Model hosting platforms and inference providers', 'Region-specific resellers serving hard-to-access markets', 'Teams testing launch visibility before larger sponsor spend', 'Providers with differentiated pricing, speed, or availability'],
        whyTitle: 'Why AIPrice',
        why: [
          ['Transparent pricing', 'We present input and output token pricing in a consistent format so buyers can compare quickly.'],
          ['Discoverability at the point of comparison', 'Users arrive here to compare providers, not just browse headlines. That makes placement more commercial than general traffic.'],
          ['Low-friction test budget', 'The offers are intentionally simple so providers can test exposure before committing larger budgets elsewhere.'],
        ],
        ctaTitle: 'Ready to get listed?',
        ctaDesc: 'Send your provider name, pricing page, and preferred package. We can usually turn around a listing within 48 hours.',
        email: 'Contact by email',
        telegram: 'Contact on Telegram',
      }
}

export default function ListYourApi() {
  const lang = 'en'
  const t = getCopy(lang)

  return (
    <div className="space-y-10">
      <section className="relative overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 p-8 md:p-12">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.18),transparent_35%),radial-gradient(circle_at_left,rgba(16,185,129,0.08),transparent_25%)]" />
        <div className="relative grid gap-10 lg:grid-cols-[1.4fr_0.8fr] lg:items-end">
          <div>
            <div className="inline-flex items-center rounded-full border border-slate-700 bg-slate-900/70 px-3 py-1 text-xs text-slate-300">{t.tag}</div>
            <h1 className="mt-5 text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">{t.title}</h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-400">{t.desc}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="mailto:hello@aiprice.io" className="inline-flex items-center rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500">Email hello@aiprice.io</a>
              <a href="https://t.me/aipriceio" target="_blank" rel="noopener noreferrer" className="inline-flex items-center rounded-xl border border-slate-700 bg-slate-900/70 px-5 py-3 text-sm font-semibold text-slate-200 transition hover:border-slate-500 hover:text-white">Message @aipriceio</a>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5"><div className="text-2xl font-bold text-white">{providers.length}+</div><div className="mt-1 text-sm text-slate-400">{t.tracked}</div></div>
            <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5"><div className="text-2xl font-bold text-white">{models.length}+</div><div className="mt-1 text-sm text-slate-400">{t.compared}</div></div>
            <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5"><div className="text-2xl font-bold text-white">{t.trust}</div><div className="mt-1 text-sm text-slate-400">{t.trustDesc}</div></div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        <PricingCard title={t.basic} price="Free" features={t.cards.basic} />
        <PricingCard title={t.featured} price="$49" priceNote={t.month} eyebrow={t.popular} highlighted features={t.cards.featured} />
        <PricingCard title={t.sponsor} price="$99" priceNote={t.month} features={t.cards.sponsor} />
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-8">
          <h2 className="text-2xl font-semibold text-white">{t.whoTitle}</h2>
          <p className="mt-3 text-slate-400 leading-7">{t.whoDesc}</p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 text-sm text-slate-300">
            {t.who.map((item) => <div key={item} className="rounded-2xl border border-slate-800 bg-slate-950/60 px-4 py-3">{item}</div>)}
          </div>
        </div>
        <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-8">
          <h2 className="text-2xl font-semibold text-white">{t.whyTitle}</h2>
          <div className="mt-6 space-y-5 text-sm text-slate-300">
            {t.why.map(([title, desc]) => (
              <div key={title}><div className="font-medium text-white">{title}</div><p className="mt-1 text-slate-400">{desc}</p></div>
            ))}
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-indigo-500/30 bg-gradient-to-r from-indigo-500/10 via-slate-900 to-slate-900 p-8 md:p-10 text-center">
        <h2 className="text-3xl font-bold text-white">{t.ctaTitle}</h2>
        <p className="mt-3 text-slate-300 max-w-2xl mx-auto leading-7">{t.ctaDesc}</p>
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="mailto:hello@aiprice.io" className="inline-flex items-center rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-100">{t.email}</a>
          <a href="https://t.me/aipriceio" target="_blank" rel="noopener noreferrer" className="inline-flex items-center rounded-xl border border-slate-600 px-5 py-3 text-sm font-semibold text-slate-200 transition hover:border-slate-400 hover:text-white">{t.telegram}</a>
        </div>
      </section>
    </div>
  )
}

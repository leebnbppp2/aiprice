'use client'
import { createContext, useContext, useState, useEffect, useCallback } from 'react'

const translations = {
  en: {
    // Nav
    nav_models: 'Models',
    nav_providers: 'Providers',
    nav_compare: 'Compare',
    nav_list: 'List Your API',
    lang_label: 'EN',

    // Footer
    footer_copy: '© 2026 AIPrice. Compare AI API prices across providers.',
    footer_data: 'Data updated automatically. Prices in USD per million tokens.',

    // Home
    home_title: 'Compare AI API Prices',
    home_subtitle_pre: 'Real-time price comparison across ',
    home_subtitle_post: '+ providers. Find the cheapest Claude, GPT, Gemini, and Llama API.',
    home_models: 'Models:',
    home_providers: 'Providers:',
    home_prices_in: 'Prices in:',
    home_prices_unit: 'USD / M tokens',
    home_rank: '#',
    home_model: 'Model',
    home_score: 'Score',
    home_context: 'Context',
    home_lowest: 'Lowest Price',
    home_cheapest: 'cheapest',
    home_legend_cheaper: 'Cheaper than official',
    home_legend_expensive: 'More expensive than official',
    home_legend_cheapest: 'Cheapest option',
    home_legend_format: 'Prices: input/output per million tokens (USD)',

    // Providers
    prov_badge: 'Provider directory',
    prov_title: 'AI API providers, in one place',
    prov_subtitle: 'Browse official APIs, aggregators, cloud platforms, and regional resellers. Use this directory to quickly compare access options, payment methods, and provider types before you dive into price tables.',
    prov_tracked: 'providers tracked',
    prov_types: 'provider types',
    prov_access: 'access patterns covered',
    prov_region: 'Region',
    prov_payments: 'Payments',
    prov_visit: 'Visit website',
    prov_region_global: 'Global',
    prov_region_china: 'China-friendly',

    // Compare
    cmp_badge: 'Side-by-side comparison',
    cmp_title: 'Compare AI models & providers',
    cmp_subtitle: 'Quickly find the right model for your workload. Compare intelligence, context window, pricing, and provider availability in one view.',
    cmp_flagship: 'Flagship models',
    cmp_flagship_desc: 'Highest intelligence scores. Best for complex reasoning, code generation, and agentic workflows.',
    cmp_balanced: 'Balanced models',
    cmp_balanced_desc: 'Strong capability at moderate cost. Good default for production workloads.',
    cmp_fast: 'Fast & efficient models',
    cmp_fast_desc: 'Optimized for speed and cost. Ideal for high-volume, latency-sensitive tasks.',
    cmp_model: 'Model',
    cmp_score: 'Score',
    cmp_ctx: 'Context',
    cmp_best_price: 'Best price',
    cmp_providers: 'Available from',
    cmp_via: 'via',
    cmp_howto_title: 'How to compare',
    cmp_howto_1_title: 'Pick your tier',
    cmp_howto_1_desc: 'Start with a category: flagship for best quality, balanced for production, fast for high-volume.',
    cmp_howto_2_title: 'Check pricing',
    cmp_howto_2_desc: 'Prices shown are per million tokens (input/output). Green highlights the cheapest option.',
    cmp_howto_3_title: 'Consider access',
    cmp_howto_3_desc: 'Some providers offer regional access (China), alternative payments (crypto, Alipay), or bundled inference.',
    cmp_howto_4_title: 'Go deeper',
    cmp_howto_4_desc: 'Visit the Models page for the full price table, or Providers for detailed provider profiles.',

    // List Your API
    list_badge: 'Provider growth surface',
    list_title: 'List your AI API where developers are already comparing options',
    list_subtitle: 'AIPrice helps buyers compare pricing, access, and provider types in one place. If your product is cheaper, faster, region-friendly, or easier to buy, this is where that difference should be visible.',
    list_email: 'Email hello@aiprice.io',
    list_telegram: 'Message @aipriceio',
    list_tracked: 'providers tracked',
    list_compared: 'models compared',
    list_devfirst: 'Dev-first',
    list_devfirst_desc: 'clear pricing and qualified technical traffic',
    list_basic_title: 'Basic Listing',
    list_basic_price: 'Free',
    list_basic_f1: 'Provider name, logo, and link in the directory and comparison experience',
    list_basic_f2: 'Visible pricing entries beside competitor alternatives',
    list_basic_f3: 'Good fit for providers who just want discoverability first',
    list_featured_eye: 'Most popular',
    list_featured_title: 'Featured Listing',
    list_featured_price: '$49',
    list_featured_note: '/ month',
    list_featured_f1: 'Everything in Basic, plus highlighted placement in comparison views',
    list_featured_f2: 'Dedicated provider profile with your positioning and docs link',
    list_featured_f3: 'Priority update handling when your pricing changes',
    list_featured_f4: 'Best option if you want qualified developer traffic without a large media spend',
    list_sponsor_title: 'Homepage Sponsor',
    list_sponsor_price: '$99',
    list_sponsor_note: '/ month',
    list_sponsor_f1: 'Everything in Featured, plus premium homepage visibility',
    list_sponsor_f2: 'Boosted placement in high-intent traffic areas',
    list_sponsor_f3: 'Sponsor treatment for launches, promos, or market entry tests',
    list_who_title: 'Who should apply',
    list_who_desc: 'AIPrice is a strong fit for providers that benefit from clear side-by-side comparison and intent-rich technical traffic.',
    list_who_1: 'API gateways and unified model routers',
    list_who_2: 'Proxy or relay providers with cheaper access or better payments',
    list_who_3: 'Model hosting platforms and inference providers',
    list_who_4: 'Region-specific resellers serving hard-to-access markets',
    list_who_5: 'Teams testing launch visibility before larger sponsor spend',
    list_who_6: 'Providers with differentiated pricing, speed, or availability',
    list_why_title: 'Why AIPrice',
    list_why_1_title: 'Transparent pricing',
    list_why_1_desc: 'We present input and output token pricing in a consistent format so buyers can compare quickly.',
    list_why_2_title: 'Discoverability at the point of comparison',
    list_why_2_desc: 'Users arrive here to compare providers, not just browse headlines. That makes placement more commercial than general traffic.',
    list_why_3_title: 'Low-friction test budget',
    list_why_3_desc: 'The offers are intentionally simple so providers can test exposure before committing larger budgets elsewhere.',
    list_cta_title: 'Ready to get listed?',
    list_cta_desc: 'Send your provider name, pricing page, and preferred package. We can usually turn around a listing within 48 hours.',
    list_cta_email: 'Contact by email',
    list_cta_telegram: 'Contact on Telegram',
  },

  zh: {
    // Nav
    nav_models: '模型',
    nav_providers: '服务商',
    nav_compare: '对比',
    nav_list: '入驻',
    lang_label: '中文',

    // Footer
    footer_copy: '© 2026 AIPrice. 跨服务商对比 AI API 价格。',
    footer_data: '数据自动更新，价格单位为美元/百万 token。',

    // Home
    home_title: '对比 AI API 价格',
    home_subtitle_pre: '实时对比 ',
    home_subtitle_post: '+ 个服务商的价格，找到最便宜的 Claude、GPT、Gemini 和 Llama API。',
    home_models: '模型：',
    home_providers: '服务商：',
    home_prices_in: '价格单位：',
    home_prices_unit: '美元 / 百万 token',
    home_rank: '#',
    home_model: '模型',
    home_score: '评分',
    home_context: '上下文',
    home_lowest: '最低价',
    home_cheapest: '最低',
    home_legend_cheaper: '低于官方价',
    home_legend_expensive: '高于官方价',
    home_legend_cheapest: '最低选项',
    home_legend_format: '价格：输入/输出 每百万 token（美元）',

    // Providers
    prov_badge: '服务商目录',
    prov_title: 'AI API 服务商一站汇总',
    prov_subtitle: '浏览官方 API、聚合平台、云服务和区域代理。快速对比访问方式、支付方式和服务商类型。',
    prov_tracked: '个服务商',
    prov_types: '种类型',
    prov_access: '覆盖全球及中国访问',
    prov_region: '区域',
    prov_payments: '支付',
    prov_visit: '访问官网',
    prov_region_global: '全球',
    prov_region_china: '中国可用',

    // Compare
    cmp_badge: '并排对比',
    cmp_title: '对比 AI 模型与服务商',
    cmp_subtitle: '快速找到适合你场景的模型。一次性对比智能评分、上下文窗口、价格和服务商覆盖。',
    cmp_flagship: '旗舰模型',
    cmp_flagship_desc: '最高智能评分，适合复杂推理、代码生成和 Agent 工作流。',
    cmp_balanced: '均衡模型',
    cmp_balanced_desc: '能力强、价格适中，适合生产环境的默认选择。',
    cmp_fast: '快速/经济模型',
    cmp_fast_desc: '针对速度和成本优化，适合高吞吐、低延迟场景。',
    cmp_model: '模型',
    cmp_score: '评分',
    cmp_ctx: '上下文',
    cmp_best_price: '最低价',
    cmp_providers: '可用服务商',
    cmp_via: '来自',
    cmp_howto_title: '如何对比',
    cmp_howto_1_title: '选择类别',
    cmp_howto_1_desc: '从类别开始：旗舰追求质量，均衡适合生产，快速适合大批量。',
    cmp_howto_2_title: '查看价格',
    cmp_howto_2_desc: '价格为每百万 token（输入/输出），绿色标注最低价。',
    cmp_howto_3_title: '考虑访问方式',
    cmp_howto_3_desc: '部分服务商提供区域访问（中国）、替代支付（加密货币、支付宝）等。',
    cmp_howto_4_title: '深入了解',
    cmp_howto_4_desc: '前往"模型"页查看完整价格表，或前往"服务商"查看详细信息。',

    // List Your API
    list_badge: '服务商增长入口',
    list_title: '在开发者正在比价的平台上展示你的 AI API',
    list_subtitle: 'AIPrice 帮助用户一站式对比价格、访问方式和服务商类型。如果你的产品更便宜、更快、支持特定区域或支付方式，这里正是让差异化被看到的地方。',
    list_email: '邮件联系 hello@aiprice.io',
    list_telegram: '发消息 @aipriceio',
    list_tracked: '个服务商',
    list_compared: '个模型',
    list_devfirst: '开发者优先',
    list_devfirst_desc: '清晰定价，精准技术流量',
    list_basic_title: '基础入驻',
    list_basic_price: '免费',
    list_basic_f1: '在目录和对比页展示服务商名称、logo 和链接',
    list_basic_f2: '价格与竞品并排展示',
    list_basic_f3: '适合先获得曝光的服务商',
    list_featured_eye: '最受欢迎',
    list_featured_title: '推荐入驻',
    list_featured_price: '$49',
    list_featured_note: '/ 月',
    list_featured_f1: '包含基础版全部权益，加对比页高亮展示',
    list_featured_f2: '专属服务商页面，展示定位和文档链接',
    list_featured_f3: '价格变动时优先更新',
    list_featured_f4: '想要精准开发者流量但不想高额投放时的最佳选择',
    list_sponsor_title: '首页赞助',
    list_sponsor_price: '$99',
    list_sponsor_note: '/ 月',
    list_sponsor_f1: '包含推荐版全部权益，加首页高级展示位',
    list_sponsor_f2: '高意向流量区域优先展示',
    list_sponsor_f3: '新品上线、促销活动、市场测试的赞助方案',
    list_who_title: '适合谁入驻',
    list_who_desc: 'AIPrice 适合在并排对比中有优势、需要精准技术流量的服务商。',
    list_who_1: 'API 网关和统一模型路由',
    list_who_2: '价格更低或支付方式更多的代理/中转服务商',
    list_who_3: '模型托管和推理服务平台',
    list_who_4: '服务特定区域的本地代理商',
    list_who_5: '想要在正式投放前测试曝光效果的团队',
    list_who_6: '在价格、速度或可用性上有差异化的服务商',
    list_why_title: '为什么选择 AIPrice',
    list_why_1_title: '透明定价',
    list_why_1_desc: '我们以统一格式展示输入/输出 token 价格，方便用户快速对比。',
    list_why_2_title: '在比价场景中被发现',
    list_why_2_desc: '用户来这里是为了对比服务商，而非浏览资讯。这使得展示位比一般流量更有商业价值。',
    list_why_3_title: '低门槛测试',
    list_why_3_desc: '方案简单直接，服务商可以先测试效果，再决定是否加大投入。',
    list_cta_title: '准备入驻？',
    list_cta_desc: '发送服务商名称、定价页面和偏好方案，我们通常在 48 小时内完成上线。',
    list_cta_email: '邮件联系',
    list_cta_telegram: 'Telegram 联系',
  },
}

const LangContext = createContext({ lang: 'en', setLang: () => {}, t: (k) => k })

export function LangProvider({ children }) {
  const [lang, setLangState] = useState('en')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // Read from URL or localStorage on mount
    const params = new URLSearchParams(window.location.search)
    const urlLang = params.get('lang')
    const stored = localStorage.getItem('aiprice_lang')
    const detected = urlLang || stored || 'en'
    const validLang = detected === 'zh' ? 'zh' : 'en'
    setLangState(validLang)
    setMounted(true)
  }, [])

  const setLang = useCallback((newLang) => {
    const validLang = newLang === 'zh' ? 'zh' : 'en'
    setLangState(validLang)
    localStorage.setItem('aiprice_lang', validLang)
    // Update URL without reload
    const url = new URL(window.location)
    url.searchParams.set('lang', validLang)
    window.history.replaceState({}, '', url)
  }, [])

  const t = useCallback((key) => {
    return translations[lang]?.[key] || translations.en[key] || key
  }, [lang])

  // Prevent hydration mismatch — render children only after mount
  if (!mounted) {
    return (
      <LangContext.Provider value={{ lang: 'en', setLang, t: (k) => translations.en[k] || k }}>
        {children}
      </LangContext.Provider>
    )
  }

  return (
    <LangContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LangContext.Provider>
  )
}

export function useLang() {
  return useContext(LangContext)
}

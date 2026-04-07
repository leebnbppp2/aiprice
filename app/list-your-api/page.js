export const metadata = {
  title: 'List Your AI API on AIPrice — Get Found by Developers',
  description: 'Get your AI API listed on AIPrice, the developer-first price comparison platform. Reach developers comparing Claude, GPT-4, Gemini and 30+ providers.',
}

function PricingCard({ title, price, priceNote, features, highlighted }) {
  return (
    <div className={`rounded-xl border p-6 flex flex-col ${
      highlighted
        ? 'border-indigo-500 bg-indigo-500/10 ring-1 ring-indigo-500/30'
        : 'border-slate-700 bg-[#1e293b]'
    }`}>
      {highlighted && (
        <span className="text-xs font-semibold text-indigo-400 uppercase tracking-wider mb-2">Most Popular</span>
      )}
      <h3 className="text-lg font-bold text-white">{title}</h3>
      <div className="mt-3 mb-4">
        <span className="text-3xl font-bold text-white">{price}</span>
        {priceNote && <span className="text-slate-400 text-sm ml-1">{priceNote}</span>}
      </div>
      <ul className="space-y-2 text-sm text-slate-300 flex-1">
        {features.map((f, i) => (
          <li key={i} className="flex items-start gap-2">
            <span className="text-green-400 mt-0.5">✓</span>
            <span>{f}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function ListYourApi() {
  return (
    <div className="max-w-4xl mx-auto">
      {/* Hero */}
      <section className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
          List Your AI API on AIPrice
        </h1>
        <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
          AIPrice helps developers compare pricing, speed, and availability across 30+ AI API providers.
          Get your service in front of engineers actively shopping for cheaper or region-friendly alternatives.
        </p>
      </section>

      {/* Pricing tiers */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-white text-center mb-8">Simple, Transparent Pricing</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <PricingCard
            title="Basic Listing"
            price="Free"
            priceNote=""
            features={[
              'Your provider name, logo, and link in our comparison tables',
              'Per-model pricing shown side-by-side with competitors',
              'Permanent listing — no expiry',
            ]}
          />
          <PricingCard
            title="Featured Listing"
            price="$49"
            priceNote="/month"
            highlighted
            features={[
              'Everything in Basic',
              'Highlighted row with accent badge in comparison tables',
              'Provider profile page with description, docs link, and promo copy',
              'Priority data updates — pricing changes reflected within 24 h',
            ]}
          />
          <PricingCard
            title="Homepage Sponsor"
            price="$99"
            priceNote="/month"
            features={[
              'Everything in Featured',
              'Boosted placement at the top of the homepage provider columns',
              'Dedicated "Sponsored" card above comparison tables',
              'Logo in the site footer with backlink',
            ]}
          />
        </div>
      </section>

      {/* Who should apply */}
      <section className="mb-16 bg-[#1e293b] rounded-xl border border-slate-700 p-8">
        <h2 className="text-xl font-bold text-white mb-4">Who Should Apply</h2>
        <p className="text-slate-400 mb-4">
          AIPrice is the right fit if you operate any of the following:
        </p>
        <div className="grid sm:grid-cols-2 gap-3 text-sm text-slate-300">
          {[
            'API gateways & unified endpoints (e.g. OpenRouter-style routers)',
            'Proxy & relay providers offering cost savings or compliance features',
            'Model hosting platforms with custom or fine-tuned model APIs',
            'Region-specific resellers serving markets with limited direct access',
            'Inference providers with competitive GPU pricing',
            'Enterprise API brokers bundling support, SLAs, or volume discounts',
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-2">
              <span className="text-indigo-400 mt-0.5">→</span>
              <span>{item}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Trust */}
      <section className="mb-16 text-center">
        <h2 className="text-xl font-bold text-white mb-4">Why AIPrice</h2>
        <div className="grid sm:grid-cols-3 gap-6 text-sm text-slate-400">
          <div>
            <div className="text-2xl mb-2">📊</div>
            <h3 className="text-white font-semibold mb-1">Transparent Pricing</h3>
            <p>Every provider is shown with the same data format — input/output per million tokens, no hidden fees.</p>
          </div>
          <div>
            <div className="text-2xl mb-2">🔍</div>
            <h3 className="text-white font-semibold mb-1">Discoverability</h3>
            <p>Developers land on AIPrice searching for the cheapest API. Your listing appears right where buying decisions happen.</p>
          </div>
          <div>
            <div className="text-2xl mb-2">🎯</div>
            <h3 className="text-white font-semibold mb-1">Qualified Traffic</h3>
            <p>Every visitor is an engineer or team evaluating AI APIs — high-intent, technical, ready to integrate.</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="text-center bg-[#1e293b] rounded-xl border border-slate-700 p-10">
        <h2 className="text-2xl font-bold text-white mb-2">Ready to Get Listed?</h2>
        <p className="text-slate-400 mb-6">
          Reach out and we'll have your listing live within 48 hours.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="mailto:hello@aiprice.io"
            className="inline-block bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-6 py-3 rounded-lg transition text-sm"
          >
            Email hello@aiprice.io
          </a>
          <a
            href="https://t.me/aipriceio"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block border border-slate-600 hover:border-slate-400 text-slate-300 hover:text-white font-semibold px-6 py-3 rounded-lg transition text-sm"
          >
            Telegram @aipriceio
          </a>
        </div>
        <p className="text-xs text-slate-500 mt-4">Basic listings are free. No credit card required.</p>
      </section>
    </div>
  )
}

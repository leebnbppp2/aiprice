'use client'
import { useLang } from '../lib/i18n'

export default function NavBar() {
  const { lang, setLang, t } = useLang()

  return (
    <nav className="border-b border-slate-700 bg-[#1e293b]">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-2xl">⚡</span>
          <span className="text-xl font-bold text-white">AIPrice</span>
          <span className="text-xs bg-indigo-500/20 text-indigo-400 px-2 py-0.5 rounded-full">beta</span>
        </div>
        <div className="flex items-center gap-6 text-sm text-slate-400">
          <a href="/" className="hover:text-white transition">{t('nav_models')}</a>
          <a href="/providers" className="hover:text-white transition">{t('nav_providers')}</a>
          <a href="/compare" className="hover:text-white transition">{t('nav_compare')}</a>
          <a href="/list-your-api" className="hover:text-white transition">{t('nav_list')}</a>
          <button
            onClick={() => setLang(lang === 'en' ? 'zh' : 'en')}
            className="ml-2 rounded-full border border-slate-600 bg-slate-800 px-2.5 py-1 text-xs font-medium text-slate-300 transition hover:border-slate-500 hover:text-white"
          >
            {lang === 'en' ? '中文' : 'EN'}
          </button>
        </div>
      </div>
    </nav>
  )
}

'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

function withLang(href, lang) {
  if (lang === 'zh') {
    if (href === '/') return '/zh'
    return `/zh${href}`
  }
  return href
}

export default function SiteNav() {
  const pathname = usePathname()
  const lang = pathname === '/zh' || pathname.startsWith('/zh/') ? 'zh' : 'en'
  const navItems = lang === 'zh'
    ? [
        { href: '/', label: '模型' },
        { href: '/providers', label: '服务商' },
        { href: '/compare', label: '对比指南' },
        { href: '/list-your-api', label: '提交 API' },
      ]
    : [
        { href: '/', label: 'Models' },
        { href: '/providers', label: 'Providers' },
        { href: '/compare', label: 'Compare' },
        { href: '/list-your-api', label: 'List Your API' },
      ]

  const switchHref = lang === 'zh'
    ? pathname.replace(/^\/zh/, '') || '/'
    : pathname === '/' ? '/zh' : `/zh${pathname}`

  return (
    <div className="flex items-center gap-6 text-sm text-slate-400">
      <div className="hidden md:flex gap-6">
        {navItems.map((item) => {
          const href = withLang(item.href, lang)
          const active = pathname === href
          return (
            <Link key={href} href={href} className={active ? 'text-white transition' : 'hover:text-white transition'}>
              {item.label}
            </Link>
          )
        })}
      </div>
      <div className="flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900/70 p-1 text-xs">
        <Link href={lang === 'zh' ? switchHref : pathname} className={lang === 'en' ? 'rounded-full bg-white px-3 py-1 font-medium text-slate-950' : 'rounded-full px-3 py-1 text-slate-300'}>EN</Link>
        <Link href={lang === 'zh' ? pathname : switchHref} className={lang === 'zh' ? 'rounded-full bg-white px-3 py-1 font-medium text-slate-950' : 'rounded-full px-3 py-1 text-slate-300'}>中文</Link>
      </div>
    </div>
  )
}

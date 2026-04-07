'use client'
import { useLang } from '../lib/i18n'

export default function Footer() {
  const { t } = useLang()
  return (
    <footer className="border-t border-slate-700 mt-16 py-8 text-center text-slate-500 text-sm">
      <p>{t('footer_copy')}</p>
      <p className="mt-1">{t('footer_data')}</p>
    </footer>
  )
}

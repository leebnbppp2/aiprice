'use client'

import { useState } from 'react'

export default function ProviderLogo({ provider, size = 'md' }) {
  const [imgFailed, setImgFailed] = useState(false)
  const hasLogo = Boolean(provider.logoUrl) && !imgFailed
  const brandColor = provider.brandColor || '#6366f1'

  const dims = size === 'md' ? 'h-11 w-11' : 'h-14 w-14'
  const imgDims = size === 'md' ? 'h-6 w-6' : 'h-8 w-8'
  const textSize = size === 'md' ? 'text-base' : 'text-lg'

  return (
    <div
      className={`provider-logo relative flex ${dims} items-center justify-center overflow-hidden rounded-xl shrink-0`}
      style={{
        background: `linear-gradient(135deg, ${brandColor}18, ${brandColor}08)`,
        boxShadow: `0 0 0 1px ${brandColor}25, 0 1px 3px 0 ${brandColor}10`,
      }}
    >
      {hasLogo ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={provider.logoUrl}
          alt={`${provider.name} logo`}
          className={`${imgDims} object-contain`}
          loading="lazy"
          onError={() => setImgFailed(true)}
        />
      ) : (
        <span
          className={`${textSize} font-bold leading-none`}
          style={{ color: brandColor }}
        >
          {provider.initials || provider.name.charAt(0)}
        </span>
      )}
    </div>
  )
}

# ⚡ AIPrice

Compare AI API prices across 30+ providers. Find the cheapest Claude, GPT, Gemini, and Llama API.

Like CoinMarketCap, but for AI APIs.

## Features

- 🔍 Real-time price comparison
- 📊 Model rankings by intelligence score
- 💰 Cheapest provider highlighting
- 🌐 Global + China proxy providers
- 📈 Price markup/discount indicators

## Stack

- Next.js 14 (Static Export)
- Tailwind CSS
- Deployed on Vercel/Cloudflare Pages

## Development

```bash
npm install
npm run dev
```

## Data

- `data/models.json` - AI model pricing data
- `data/providers.json` - API provider info
- `scripts/update-prices.mjs` - Price update script

## License

MIT

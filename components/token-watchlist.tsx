"use client"

import { useEffect, useState } from "react"
import { TrendingDown, TrendingUp } from "lucide-react"

type Token = {
  name: string
  symbol: string
  price: number
  mcap: string
  trend: number[]
  change: number
}

const FAKE_TOKENS: Token[] = [
  { name: "EtherVault", symbol: "EVT", price: 1250.45, mcap: "2.5B", trend: [100, 98, 95, 92, 88], change: -12 },
  { name: "SafeChain", symbol: "SFC", price: 45.23, mcap: "890M", trend: [100, 102, 99, 96, 93], change: -7 },
  { name: "CryptoGuard", symbol: "CGD", price: 8.91, mcap: "450M", trend: [100, 97, 94, 90, 85], change: -15 },
]

interface TokenWatchlistProps {
  currentTime: number
}

export function TokenWatchlist({ currentTime }: TokenWatchlistProps) {
  const [tokens, setTokens] = useState(FAKE_TOKENS)

  useEffect(() => {
    const interval = setInterval(() => {
      setTokens((prev) =>
        prev.map((token) => {
          const volatility = Math.random() * 0.05 - 0.025
          const newPrice = token.price * (1 + volatility)
          const newTrend = [...token.trend.slice(1), (newPrice / token.price) * 100]
          return {
            ...token,
            price: newPrice,
            trend: newTrend,
          }
        }),
      )
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="glass-card rounded-xl p-4 min-h-[400px]">
      <h3 className="font-mono text-sm font-bold text-white tracking-wider mb-4">TOKEN WATCHLIST</h3>
      <div className="space-y-3">
        {tokens.map((token) => (
          <div key={token.symbol} className="border border-white/20 rounded-lg p-3 bg-white/5">
            <div className="flex items-start justify-between mb-2">
              <div>
                <div className="font-mono text-sm font-bold text-white">{token.symbol}</div>
                <div className="text-xs text-white/60">{token.name}</div>
              </div>
              <div className="text-right">
                <div className="font-mono text-sm text-white">${token.price.toFixed(2)}</div>
                <div
                  className={`text-xs flex items-center gap-1 ${token.change < 0 ? "text-red-400" : "text-green-400"}`}
                >
                  {token.change < 0 ? <TrendingDown className="w-3 h-3" /> : <TrendingUp className="w-3 h-3" />}
                  {token.change}%
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="text-xs text-white/40 font-mono">MCAP: {token.mcap}</div>
              <div className="flex-1 h-8 flex items-end gap-0.5">
                {token.trend.map((value, i) => (
                  <div
                    key={i}
                    className="flex-1 bg-white/20 rounded-sm transition-all"
                    style={{ height: `${value}%` }}
                  />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

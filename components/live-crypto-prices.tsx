"use client"

import { useState, useEffect } from "react"

type CryptoPrice = {
  id: string
  symbol: string
  name: string
  current_price: number
  price_change_percentage_24h: number
}

export function LiveCryptoPrices() {
  const [prices, setPrices] = useState<CryptoPrice[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const response = await fetch(
          "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana&vs_currencies=usd&include_24hr_change=true",
        )
        const data = await response.json()

        const formattedPrices: CryptoPrice[] = [
          {
            id: "bitcoin",
            symbol: "BTC",
            name: "bitcoin",
            current_price: data.bitcoin.usd,
            price_change_percentage_24h: data.bitcoin.usd_24h_change,
          },
          {
            id: "ethereum",
            symbol: "ETH",
            name: "ethereum",
            current_price: data.ethereum.usd,
            price_change_percentage_24h: data.ethereum.usd_24h_change,
          },
          {
            id: "solana",
            symbol: "SOL",
            name: "solana",
            current_price: data.solana.usd,
            price_change_percentage_24h: data.solana.usd_24h_change,
          },
        ]

        setPrices(formattedPrices)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching crypto prices:", error)
        setLoading(false)
      }
    }

    fetchPrices()
    const interval = setInterval(fetchPrices, 30000)

    return () => clearInterval(interval)
  }, [])

  const getTechnicalText = (symbol: string, price: number, change: number) => {
    const changeIndicator = change >= 0 ? "↑" : "↓"
    const changeColor = change >= 0 ? "text-green-400" : "text-red-400"

    switch (symbol) {
      case "BTC":
        return {
          lines: [
            ">> accessing bitcoin mainnet nodes...",
            ">> decrypting mempool transactions...",
            ">> extracting blockchain consensus data...",
            ">> bypassing exchange security protocols...",
          ],
          hackPrice: `btc hack price - $${price.toLocaleString()}`,
          change: `${changeIndicator} ${Math.abs(change).toFixed(2)}%`,
          changeColor,
        }
      case "ETH":
        return {
          lines: [
            ">> infiltrating ethereum network...",
            ">> breaching smart contract oracles...",
            ">> monitoring gas price fluctuations...",
            ">> extracting defi protocol metrics...",
          ],
          hackPrice: `eth hack price - $${price.toLocaleString()}`,
          change: `${changeIndicator} ${Math.abs(change).toFixed(2)}%`,
          changeColor,
        }
      case "SOL":
        return {
          lines: [
            ">> penetrating solana validator nodes...",
            ">> decrypting proof-of-stake consensus...",
            ">> extracting dex liquidity pools...",
            ">> monitoring network throughput data...",
          ],
          hackPrice: `sol hack price - $${price.toLocaleString()}`,
          change: `${changeIndicator} ${Math.abs(change).toFixed(2)}%`,
          changeColor,
        }
      default:
        return {
          lines: [">> extracting price metrics..."],
          hackPrice: `hack price - $${price.toLocaleString()}`,
          change: `${changeIndicator} ${Math.abs(change).toFixed(2)}%`,
          changeColor,
        }
    }
  }

  if (loading) {
    return (
      <div className="glass-card rounded-xl p-4 sm:p-6 border border-green-500/30">
        <h3 className="font-mono text-lg font-bold text-green-400 mb-4 lowercase">live price</h3>
        <div className="flex items-center justify-center py-8">
          <div className="animate-pulse text-green-400 font-mono text-sm lowercase">
            {">> initializing price extraction protocols..."}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="glass-card rounded-xl p-4 sm:p-6 border border-green-500/30 hover:border-green-500/60 transition-all duration-300">
      <h3 className="font-mono text-lg font-bold text-green-400 mb-4 lowercase flex items-center gap-2">
        <span className="inline-block w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
        live price
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {prices.map((crypto) => {
          const hackData = getTechnicalText(crypto.symbol, crypto.current_price, crypto.price_change_percentage_24h)

          return (
            <div
              key={crypto.id}
              className="border border-green-500/20 rounded-lg p-4 bg-black/40 hover:border-green-500/40 transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,255,0,0.15)]"
            >
              <div className="font-mono text-[10px] text-green-400/80 mb-3 space-y-1 lowercase tracking-wide">
                {hackData.lines.map((line, index) => (
                  <div key={index} className="flex items-start gap-1">
                    <span className="text-green-400 mt-0.5">●</span>
                    <span className="flex-1">{line}</span>
                  </div>
                ))}
              </div>

              <div className="mt-4 pt-3 border-t border-green-500/20">
                <div className="font-mono text-sm text-white lowercase mb-2 flex items-center justify-between">
                  <span className="flex-1">{hackData.hackPrice}</span>
                  <span className={`ml-2 text-xs font-bold ${hackData.changeColor}`}>{hackData.change}</span>
                </div>

                {/* Progress bar showing price volatility */}
                <div className="mt-2">
                  <div className="h-1 bg-green-500/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-green-500 rounded-full animate-pulse"
                      style={{
                        width: `${Math.min(Math.abs(crypto.price_change_percentage_24h) * 10, 100)}%`,
                        transition: "width 0.5s ease-in-out",
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
      <div className="mt-4 pt-4 border-t border-green-500/20">
        <div className="font-mono text-xs text-green-400/60 lowercase flex items-center justify-between">
          <span className="flex items-center gap-2">
            <span className="inline-block w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
            real-time market data extraction active
          </span>
          <span className="text-green-400/40">auto-refresh: 30s</span>
        </div>
      </div>
    </div>
  )
}

"use client"

import { useEffect, useState } from "react"

interface ScriptToken {
  id: string
  label: string
  timestamp: number
}

interface ScriptTokensProps {
  tokens: ScriptToken[]
  currentTime: number
  isPlaying: boolean
}

export function ScriptTokens({ tokens, currentTime, isPlaying }: ScriptTokensProps) {
  const [activeTokenIndex, setActiveTokenIndex] = useState(-1)

  useEffect(() => {
    // Find the current active token based on currentTime
    const activeIndex = tokens.findIndex((token, index) => {
      const nextToken = tokens[index + 1]
      return currentTime >= token.timestamp && (!nextToken || currentTime < nextToken.timestamp)
    })
    setActiveTokenIndex(activeIndex)
  }, [currentTime, tokens])

  return (
    <div className="w-full py-4">
      <h3 className="font-mono text-xs font-bold text-cyan-400 mb-3 tracking-wider">SCRIPT EXECUTION FLOW</h3>
      <div className="flex items-center gap-2 overflow-x-auto pb-2 custom-scrollbar">
        {tokens.map((token, index) => {
          const isActive = index === activeTokenIndex
          const isPassed = index < activeTokenIndex
          const isCurrent = index === activeTokenIndex

          return (
            <div key={token.id} className="flex items-center gap-2 flex-shrink-0">
              {/* Token Chip */}
              <div
                className={`
                  px-4 py-2 rounded-full border-2 font-mono text-xs font-bold tracking-wider
                  transition-all duration-300 whitespace-nowrap
                  ${
                    isCurrent
                      ? "border-cyan-400 bg-cyan-500/20 text-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.6)] animate-pulse"
                      : isPassed
                        ? "border-cyan-600/50 bg-cyan-950/30 text-cyan-600"
                        : "border-gray-600 bg-gray-900/30 text-gray-500"
                  }
                `}
              >
                {token.label}
              </div>

              {/* Arrow */}
              {index < tokens.length - 1 && (
                <div
                  className={`
                    w-6 h-0.5 transition-all duration-300
                    ${isPassed || isCurrent ? "bg-cyan-500" : "bg-gray-700"}
                  `}
                />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

"use client"

import { useEffect, useState } from "react"

export function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true)
  const [displayedText, setDisplayedText] = useState("")

  const binaryArt =
    "01000100  01000100   01101111  01010011\n01000100  01000100  01101111  01010011\n01000100  01000100 01101111  01010011\n01000100  01000100 01101111  01010011\n01000100  01000100 01101111  01010011\n01000100  01000100  01101111  01010011\n01000100  01000100   01101111  01010011"

  useEffect(() => {
    let currentIndex = 0
    const interval = setInterval(() => {
      if (currentIndex <= binaryArt.length) {
        setDisplayedText(binaryArt.slice(0, currentIndex))
        currentIndex++
      } else {
        clearInterval(interval)
      }
    }, 20)

    return () => clearInterval(interval)
  }, [binaryArt])

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 4000)

    return () => clearTimeout(timer)
  }, [])

  if (!isLoading) return null

  return (
    <div className="fixed inset-0 z-[10000] bg-black flex items-center justify-center">
      <video autoPlay loop muted playsInline className="w-full h-full object-cover opacity-30">
        <source src="https://cdn.pixabay.com/video/2022/09/12/131048-749689316_large.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60">
        <div className="text-center mb-8">
          <pre className="text-green-400 text-xl md:text-3xl font-mono leading-relaxed whitespace-pre-wrap filter drop-shadow-[0_0_10px_rgba(34,197,94,0.8)]">
            {displayedText}
            <span className="animate-pulse">|</span>
          </pre>
        </div>

        <div className="text-center mt-8">
          <div className="text-lg font-bold text-green-400 mb-4 animate-pulse">INITIALIZING SYSTEM</div>
          <div className="flex gap-2 justify-center">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
            <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
            <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
          </div>
        </div>
      </div>
    </div>
  )
}

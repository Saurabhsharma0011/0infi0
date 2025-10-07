"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"

export function LandingHero() {
  const router = useRouter()
  const [isLaunching, setIsLaunching] = useState(false)
  const [titleText, setTitleText] = useState("")
  const [descText, setDescText] = useState("")
  const [showButton, setShowButton] = useState(false)

  const fullTitle = "simulated security incident response platform"
  const fullDesc =
    "experience a comprehensive, repeatable security incident simulation with real-time log streaming, interactive timeline analysis, global threat visualization, and ai-powered investigation assistance."

  useEffect(() => {
    let index = 0
    const titleInterval = setInterval(() => {
      if (index < fullTitle.length) {
        setTitleText(fullTitle.slice(0, index + 1))
        index++
      } else {
        clearInterval(titleInterval)
      }
    }, 30)

    return () => clearInterval(titleInterval)
  }, [])

  useEffect(() => {
    const descTimeout = setTimeout(
      () => {
        let index = 0
        const descInterval = setInterval(() => {
          if (index < fullDesc.length) {
            setDescText(fullDesc.slice(0, index + 1))
            index++
          } else {
            clearInterval(descInterval)
            setShowButton(true)
          }
        }, 15)

        return () => clearInterval(descInterval)
      },
      fullTitle.length * 30 + 200,
    )

    return () => clearTimeout(descTimeout)
  }, [])

  const handleLaunch = () => {
    setIsLaunching(true)
    setTimeout(() => {
      router.push("/dashboard")
    }, 800)
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Animated background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,0,0.03)_1px,transparent_1px)] bg-[size:50px_50px] sm:bg-[size:60px_60px] animate-grid-flow" />

      {/* Glowing orbs - adjusted size for mobile */}
      <div className="absolute top-1/4 left-1/4 w-48 h-48 sm:w-72 sm:h-72 lg:w-96 lg:h-96 bg-green-500/5 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-48 h-48 sm:w-72 sm:h-72 lg:w-96 lg:h-96 bg-green-500/5 rounded-full blur-3xl animate-pulse delay-1000" />

      <div className="relative z-10 max-w-6xl mx-auto text-center space-y-6 sm:space-y-8 lg:space-y-12 animate-fade-in">
        {/* DDoS Binary Art - responsive sizing */}
        <div className="relative inline-block w-full px-2">
          <Image
            src="/images/design-mode/telegram-cloud-document-5-6276224147592845884.jpg.png"
            alt="DDoS"
            width={800}
            height={300}
            className="w-full max-w-xs sm:max-w-2xl lg:max-w-4xl h-auto mx-auto animate-glow-pulse"
            style={{
              filter:
                "drop-shadow(0 0 10px rgba(0, 255, 0, 0.6)) drop-shadow(0 0 20px rgba(0, 255, 0, 0.4)) drop-shadow(0 0 30px rgba(0, 255, 0, 0.2)) sm:drop-shadow(0 0 20px rgba(0, 255, 0, 0.6)) sm:drop-shadow(0 0 40px rgba(0, 255, 0, 0.4)) sm:drop-shadow(0 0 60px rgba(0, 255, 0, 0.2))",
            }}
            priority
          />
        </div>

        {/* Title - responsive text sizing with typewriter effect */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-green-400 tracking-wider animate-slide-up font-mono px-2 lowercase min-h-[3rem] sm:min-h-[4rem] lg:min-h-[5rem]">
          {titleText}
          {titleText.length < fullTitle.length && (
            <span className="inline-block w-0.5 h-6 sm:h-8 lg:h-12 bg-green-400 ml-1 animate-pulse" />
          )}
        </h1>

        {/* Description - responsive text sizing with typewriter effect */}
        <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-green-300/90 max-w-4xl mx-auto leading-relaxed animate-slide-up delay-200 font-mono px-4 sm:px-6 lowercase min-h-[6rem] sm:min-h-[8rem]">
          {descText}
          {descText.length > 0 && descText.length < fullDesc.length && (
            <span className="inline-block w-0.5 h-4 sm:h-5 lg:h-6 bg-green-300 ml-1 animate-pulse" />
          )}
        </p>

        {/* CTA Button - responsive sizing with fade-in */}
        <div
          className={`pt-4 sm:pt-6 lg:pt-8 transition-opacity duration-500 ${showButton ? "opacity-100" : "opacity-0"}`}
        >
          <button
            onClick={handleLaunch}
            disabled={isLaunching || !showButton}
            className="group relative px-6 sm:px-8 lg:px-12 py-3 sm:py-4 lg:py-5 text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-green-400 border-2 border-green-500/50 rounded-lg bg-black/50 backdrop-blur-sm hover:bg-green-500/10 hover:border-green-400 transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,255,0,0.3)] disabled:opacity-50 disabled:cursor-not-allowed font-mono lowercase"
          >
            <span className="relative z-10 flex items-center gap-2 sm:gap-3">
              {isLaunching ? (
                <>
                  <span className="inline-block w-4 h-4 sm:w-5 sm:h-5 border-2 border-green-400 border-t-transparent rounded-full animate-spin" />
                  initializing...
                </>
              ) : (
                <>
                  launch simulation
                  <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
                </>
              )}
            </span>
            <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-green-500/0 via-green-500/10 to-green-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>
        </div>

        {/* Decorative elements - responsive layout */}
        <div
          className={`flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 pt-8 sm:pt-12 text-green-500/50 text-xs sm:text-sm font-mono lowercase transition-opacity duration-500 delay-300 ${
            showButton ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span>system online</span>
          </div>
          <div className="hidden sm:block w-px h-4 bg-green-500/30" />
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse delay-300" />
            <span>ready to deploy</span>
          </div>
        </div>
      </div>
    </div>
  )
}

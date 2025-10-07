"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { useState } from "react"

export function HeroHeader() {
  const [copied, setCopied] = useState(false)
  const contractAddress = "7jAdmmxfMWJbJC9WxYN5pdwGioWz9qmsbM2susvapump"

  const copyToClipboard = () => {
    navigator.clipboard.writeText(contractAddress)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <header className="relative w-full px-6 py-12 md:py-16 bg-black border-b border-green-500/30 overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="absolute top-6 right-6 md:top-8 md:right-8 flex gap-3 animate-on-load animate-fade-in-right delay-200 z-50">
          <a
            href="https://x.com/infinity_zer00"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-lg bg-green-500/20 text-green-400 font-mono font-semibold text-sm hover:bg-green-500/30 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(0,255,0,0.5)] border border-green-500/50 lowercase inline-flex items-center justify-center cursor-pointer"
          >
            twitter
          </a>
          <a
            href="https://t.me/infinity_zer00"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-lg bg-green-500/20 text-green-400 font-mono font-semibold text-sm hover:bg-green-500/30 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(0,255,0,0.5)] border border-green-500/50 lowercase inline-flex items-center justify-center cursor-pointer"
          >
            telegram
          </a>
        </div>

        <div className="absolute top-6 left-6 md:top-8 md:left-8 animate-on-load animate-fade-in-left delay-200 z-50">
          <Link href="/live-attack">
            <Button className="px-6 py-2 rounded-lg bg-green-500/20 text-green-400 font-mono font-semibold text-sm hover:bg-green-500/30 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(0,255,0,0.5)] border border-green-500/50 lowercase">
              live-attack
            </Button>
          </Link>
        </div>

        {/* Hero Content */}
        <div className="flex flex-col items-center text-center space-y-6">
          <div className="relative w-full max-w-4xl animate-on-load animate-scale-in delay-300">
            <Image
              src="/images/design-mode/telegram-cloud-document-5-6276224147592845884.jpg.png"
              alt="DDoS Binary Code"
              width={1200}
              height={300}
              className="w-full h-auto object-contain animate-glow-pulse"
              style={{
                filter:
                  "drop-shadow(0 0 30px rgba(0, 255, 0, 0.8)) drop-shadow(0 0 60px rgba(0, 255, 0, 0.5)) brightness(1.2)",
              }}
              priority
            />
          </div>

          <div className="text-lg md:text-xl text-green-500/80 font-mono font-semibold tracking-wide animate-on-load animate-fade-in-up delay-500 lowercase">
            simulated security incident response platform
          </div>

          <p className="text-base md:text-lg text-green-400/70 max-w-2xl leading-relaxed font-light animate-on-load animate-fade-in-up delay-600 lowercase">
            experience a comprehensive, repeatable security incident simulation with real-time log streaming,
            interactive timeline analysis, global threat visualization, and ai-powered investigation assistance.
          </p>

          <div className="mt-6 animate-on-load animate-scale-in delay-700">
            <div className="flex flex-col sm:flex-row items-center gap-3 p-4 rounded-lg bg-green-500/10 border border-green-500/50 backdrop-blur-sm hover:shadow-[0_0_30px_rgba(0,255,0,0.3)] transition-all duration-300">
              <div className="flex flex-col items-start gap-1">
                <span className="text-xs text-green-500/60 font-mono uppercase tracking-wider">contract address</span>
                <code className="text-sm md:text-base text-green-400 font-mono font-semibold break-all">
                  {contractAddress}
                </code>
              </div>
              <button
                onClick={copyToClipboard}
                className="px-4 py-2 rounded-md bg-green-500/20 text-green-400 font-mono text-sm font-semibold hover:bg-green-500/30 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(0,255,0,0.5)] border border-green-500/50 lowercase whitespace-nowrap"
              >
                {copied ? "copied!" : "copy"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

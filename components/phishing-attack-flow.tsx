"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"

const ATTACK_STEPS = [
  {
    id: 1,
    phase: "INITIAL CONTACT",
    title: "Phishing Vector Deployed",
    description: "Attacker sends fake airdrop notification via Discord/Email with malicious link",
    details: [
      "Spoofed domain: uniswap-claim[.]com (looks like uniswap.org)",
      "Message: 'Claim your 500 UNI tokens - Limited time!'",
      "Urgency tactics to bypass critical thinking",
    ],
  },
  {
    id: 2,
    phase: "WALLET CONNECTION",
    title: "Malicious dApp Connection",
    description: "User connects wallet to fake website, granting initial access",
    details: [
      "WalletConnect/MetaMask popup appears legitimate",
      "User approves connection: 0xAB**...CD89",
      "Attacker now knows wallet address and holdings",
    ],
  },
  {
    id: 3,
    phase: "TOKEN APPROVAL",
    title: "Unlimited Approval Request",
    description: "Malicious contract requests unlimited token spending approval",
    details: [
      "approve(spender, 2^256-1) - Unlimited allowance",
      "Disguised as 'Claim Tokens' transaction",
      "Gas fee appears normal (~$5-10)",
      "Contract: 0xFF**...malicious",
    ],
  },
  {
    id: 4,
    phase: "EXPLOITATION",
    title: "Silent Fund Transfer",
    description: "Attacker's contract drains approved tokens without further user interaction",
    details: [
      "transferFrom() called by malicious contract",
      "Tokens transferred: USDT, USDC, DAI, ETH",
      "Victim sees balance drop to $0.00",
      "Transaction irreversible on blockchain",
    ],
  },
  {
    id: 5,
    phase: "FUND LAUNDERING",
    title: "Asset Obfuscation",
    description: "Stolen funds moved through mixers and DEXs to hide trail",
    details: [
      "Funds sent to Tornado Cash mixer",
      "Swapped across multiple DEXs",
      "Final destination: Privacy chain (Monero)",
      "Attacker wallet: 0x00**...anonymous",
    ],
  },
]

export function PhishingAttackFlow({ onClose }: { onClose: () => void }) {
  const [currentStep, setCurrentStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [showVideo, setShowVideo] = useState(false)
  const [terminalLines, setTerminalLines] = useState<string[]>([])
  const [currentLineIndex, setCurrentLineIndex] = useState(0)
  const [currentCharIndex, setCurrentCharIndex] = useState(0)

  useEffect(() => {
    if (showVideo) {
      const timer = setTimeout(() => {
        setShowVideo(false)
      }, 4000)
      return () => clearTimeout(timer)
    }
  }, [showVideo])

  useEffect(() => {
    if (!isPlaying || currentStep >= ATTACK_STEPS.length) return

    const step = ATTACK_STEPS[currentStep]
    const allLines = [
      `\n[${new Date().toISOString()}] ========================================`,
      `[PHASE ${step.id}] ${step.phase}`,
      `[OPERATION] ${step.title}`,
      `[STATUS] ${step.description}`,
      `[DETAILS] >>>`,
      ...step.details.map((d) => `  > ${d}`),
      `[COMPLETE] Phase ${step.id} executed successfully\n`,
    ]

    if (currentLineIndex < allLines.length) {
      const currentLine = allLines[currentLineIndex]

      if (currentCharIndex < currentLine.length) {
        const timer = setTimeout(() => {
          setTerminalLines((prev) => {
            const newLines = [...prev]
            if (newLines[currentLineIndex]) {
              newLines[currentLineIndex] = currentLine.substring(0, currentCharIndex + 1)
            } else {
              newLines.push(currentLine.substring(0, currentCharIndex + 1))
            }
            return newLines
          })
          setCurrentCharIndex((prev) => prev + 1)
        }, 10) // Fast typing speed
        return () => clearTimeout(timer)
      } else {
        setCurrentLineIndex((prev) => prev + 1)
        setCurrentCharIndex(0)
      }
    } else {
      // Move to next step after delay
      const timer = setTimeout(() => {
        if (currentStep < ATTACK_STEPS.length - 1) {
          setCurrentStep((prev) => prev + 1)
          setCurrentLineIndex(0)
          setCurrentCharIndex(0)
        } else {
          setIsPlaying(false)
        }
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [isPlaying, currentStep, currentLineIndex, currentCharIndex])

  const handleReset = () => {
    setCurrentStep(0)
    setIsPlaying(false)
    setTerminalLines([])
    setCurrentLineIndex(0)
    setCurrentCharIndex(0)
  }

  const handleStartSimulation = () => {
    setShowVideo(true)
    setTimeout(() => {
      setIsPlaying(true)
      setTerminalLines(["> initializing crypto phishing attack simulation..."])
    }, 4000)
  }

  if (showVideo) {
    return (
      <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
        <video autoPlay muted className="w-full h-full object-cover">
          <source src="https://cdn.pixabay.com/video/2023/03/04/153079-804706258_large.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 pointer-events-none">
          <div className="text-green-400 text-2xl font-mono animate-pulse lowercase">hacker flow is getting ready</div>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black z-50 overflow-hidden flex flex-col">
      <div className="flex items-center justify-between p-4 border-b border-green-500/30">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
          <span className="ml-4 text-green-400 font-mono text-sm lowercase">root@holobreach:~/crypto-phishing$</span>
        </div>
        <Button onClick={onClose} variant="ghost" size="sm" className="text-green-400 hover:bg-green-500/10">
          <X className="w-4 h-4" />
        </Button>
      </div>

      <div className="flex items-center gap-4 p-4 border-b border-green-500/30">
        <Button
          onClick={handleStartSimulation}
          disabled={isPlaying}
          className="bg-black text-green-400 hover:bg-green-500/10 font-mono border border-green-500 lowercase text-sm"
        >
          {isPlaying ? "running..." : "start simulation"}
        </Button>
        <Button
          onClick={handleReset}
          className="bg-black text-green-400 hover:bg-green-500/10 font-mono border border-green-500 lowercase text-sm"
        >
          reset
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto p-6 font-mono text-sm">
        {terminalLines.map((line, index) => (
          <div key={index} className="text-green-400 whitespace-pre-wrap break-words lowercase">
            {line}
            {index === terminalLines.length - 1 && isPlaying && (
              <span className="inline-block w-2 h-4 bg-green-400 ml-1 animate-pulse" />
            )}
          </div>
        ))}
        {!isPlaying && terminalLines.length > 0 && (
          <div className="text-green-400 mt-4">
            <span className="inline-block w-2 h-4 bg-green-400 animate-pulse" />
          </div>
        )}
      </div>
    </div>
  )
}

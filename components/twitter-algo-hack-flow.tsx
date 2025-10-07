"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"

const TWITTER_HACK_STEPS = [
  {
    id: 1,
    phase: "TARGET IDENTIFICATION",
    title: "User ID Reconnaissance",
    description: "Attacker identifies high-value target accounts and analyzes their engagement patterns",
    details: [
      "Target User ID: @crypto_whale_2025 (ID: 1847392847)",
      "Follower Count: 250,000+ | Avg Engagement: 5,000+ per tweet",
      "Profile Analysis: Active in crypto communities, high trust score",
      "Behavioral Pattern: Posts daily 9AM-11AM EST, responds to DMs",
    ],
  },
  {
    id: 2,
    phase: "ENGAGEMENT MANIPULATION",
    title: "Bot Network Deployment",
    description: "Deploy coordinated bot network to artificially inflate engagement metrics",
    details: [
      "Bot Network Size: 10,000 fake accounts created",
      "Engagement Strategy: Like, retweet, reply to target's content",
      "Algorithm Signal: Increased engagement → Higher visibility",
      "Time to Effect: 24-48 hours for algorithm recognition",
    ],
  },
  {
    id: 3,
    phase: "TRUST EXPLOITATION",
    title: "Fake Verification & Impersonation",
    description: "Create verified-looking impersonator accounts to build false credibility",
    details: [
      "Impersonator Account: @crypto_whale_20Z5 (subtle character swap)",
      "Profile Clone: Identical profile pic, bio, banner",
      "Fake Verification: Blue checkmark emoji in name",
      "Follower Boost: Bot network follows impersonator (10K instant followers)",
    ],
  },
  {
    id: 4,
    phase: "ALGORITHM GAMING",
    title: "Trending Topic Hijacking",
    description: "Manipulate trending algorithms to amplify malicious content",
    details: [
      "Hashtag Injection: #CryptoAirdrop #FreeMoney trending",
      "Coordinated Posting: 10,000 bots tweet identical scam link",
      "Reply Spam: Bots reply to popular tweets with scam",
      "Algorithm Boost: Twitter's algo promotes 'trending' malicious content",
    ],
  },
  {
    id: 5,
    phase: "PHISHING DEPLOYMENT",
    title: "Malicious Link Distribution",
    description: "Distribute phishing links through compromised high-engagement accounts",
    details: [
      "Phishing URL: twitter-verify[.]com/claim-badge",
      "Message: 'Claim your free verification badge - Limited time!'",
      "Distribution: Posted by impersonator + 10K bot retweets",
      "Reach: 500,000+ impressions in 2 hours via algorithm amplification",
    ],
  },
  {
    id: 6,
    phase: "CREDENTIAL HARVESTING",
    title: "Account Takeover",
    description: "Victims enter credentials on fake Twitter login page, accounts compromised",
    details: [
      "Fake Login Page: Identical to real Twitter OAuth flow",
      "Data Captured: Username, password, 2FA codes, email",
      "Accounts Compromised: 2,500+ accounts in 24 hours",
      "Access Level: Full account control + DM access",
    ],
  },
  {
    id: 7,
    phase: "CRYPTO SCAM AMPLIFICATION",
    title: "Compromised Account Exploitation",
    description: "Use hijacked accounts to post crypto scams with built-in trust and reach",
    details: [
      "Scam Tweet: 'Sending 1 ETH to this address gets you 2 ETH back!'",
      "Posted From: 2,500 compromised accounts (real users)",
      "Algorithm Boost: High engagement from real followers",
      "Victim Count: 15,000+ users see scam, 500+ send funds",
      "Total Stolen: $2.5M in ETH/USDT within 6 hours",
    ],
  },
  {
    id: 8,
    phase: "DETECTION EVASION",
    title: "Account Cleanup & Trail Obfuscation",
    description: "Delete malicious tweets, restore accounts, hide evidence of manipulation",
    details: [
      "Tweet Deletion: All scam tweets deleted within 12 hours",
      "Account Restoration: Passwords changed, victims locked out",
      "Bot Network Purge: 10,000 bot accounts deleted/suspended",
      "Evidence Removal: Minimal on-platform trace of attack",
      "Attribution: Nearly impossible to trace back to attacker",
    ],
  },
]

export function TwitterAlgoHackFlow({ onClose }: { onClose: () => void }) {
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
    if (!isPlaying || currentStep >= TWITTER_HACK_STEPS.length) return

    const step = TWITTER_HACK_STEPS[currentStep]
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
        if (currentStep < TWITTER_HACK_STEPS.length - 1) {
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
      setTerminalLines(["> initializing twitter algorithm hack simulation..."])
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
          <span className="ml-4 text-green-400 font-mono text-sm lowercase">root@holobreach:~/twitter-algo-hack$</span>
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

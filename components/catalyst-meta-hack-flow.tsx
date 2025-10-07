"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"

const CATALYST_META_STEPS = [
  {
    id: 1,
    phase: "META GRAPH API RECONNAISSANCE",
    title: "User Profile & Network Mapping",
    description: "Attacker scans Facebook Graph API to identify high-value targets and social connections",
    details: [
      "Target Profile: Mark_Crypto_Investor (ID: FB_9847392847)",
      "Friend Count: 4,500+ | Page Followers: 180,000+",
      "Profile Analysis: Active crypto investor, admin of 12 investment groups",
      "Behavioral Pattern: Posts daily 8AM-10AM, responds to messages within 1 hour",
    ],
  },
  {
    id: 2,
    phase: "ALGORITHM PATTERN ANALYSIS",
    title: "Newsfeed Ranking Exploitation",
    description: "Reverse engineer Meta's recommendation algorithm to identify viral content triggers",
    details: [
      "Algorithm Analysis: Engagement-based ranking system decoded",
      "Viral Triggers: Emotional content + high early engagement = amplification",
      "Reels Boost: Short video content prioritized 3x over static posts",
      "Group Dynamics: Posts in large groups get 10x organic reach",
    ],
  },
  {
    id: 3,
    phase: "FAKE ACCOUNT NETWORK",
    title: "Bot Army Deployment",
    description: "Create network of aged Facebook accounts to appear legitimate and bypass detection",
    details: [
      "Bot Network Size: 5,000 fake Facebook/Instagram accounts",
      "Account Age: 2-5 years old with authentic post history",
      "Profile Authenticity: Real photos, friends, activity patterns",
      "Detection Evasion: Distributed IPs, human-like behavior simulation",
    ],
  },
  {
    id: 4,
    phase: "SOCIAL ENGINEERING",
    title: "Trust Building Campaign",
    description: "Deploy viral bait content and infiltrate crypto investment groups",
    details: [
      "Viral Content: 'I made $50K in 30 days with this method!'",
      "Deepfake Videos: Fake celebrity endorsements (Elon Musk, Mark Cuban)",
      "Group Infiltration: Joined 50+ crypto investment groups",
      "Trust Signals: 5,000 bot accounts like/share/comment on posts",
    ],
  },
  {
    id: 5,
    phase: "ENGAGEMENT MANIPULATION",
    title: "Algorithmic Amplification",
    description: "Coordinate bot network to artificially boost content visibility",
    details: [
      "Coordinated Engagement: 5,000 bots like/share within 10 minutes",
      "Algorithm Trigger: High early engagement → Viral distribution",
      "Organic Reach: 500,000+ impressions in 6 hours",
      "Group Amplification: Posted in 50 groups = 2M+ potential reach",
    ],
  },
  {
    id: 6,
    phase: "CREDENTIAL HARVESTING",
    title: "OAuth Phishing Attack",
    description: "Deploy fake Facebook login pages and OAuth apps to steal credentials",
    details: [
      "Phishing URL: facebook-security-check[.]com/verify",
      "Fake OAuth App: 'Crypto Portfolio Tracker' (looks legitimate)",
      "Data Captured: Email, password, 2FA codes, access tokens",
      "Accounts Compromised: 3,200+ Facebook accounts in 48 hours",
    ],
  },
  {
    id: 7,
    phase: "ACCOUNT TAKEOVER",
    title: "Business Page Hijacking",
    description: "Take control of compromised accounts and verified business pages",
    details: [
      "Accounts Hijacked: 3,200 personal accounts + 45 business pages",
      "Verified Pages: 12 pages with blue verification badge",
      "Ad Account Access: 28 Facebook Ads Manager accounts compromised",
      "Persistent Access: Backdoor OAuth tokens for long-term control",
    ],
  },
  {
    id: 8,
    phase: "CRYPTO SCAM DEPLOYMENT",
    title: "Mass Fraud Campaign",
    description: "Use hijacked accounts to run crypto scams with built-in trust and massive reach",
    details: [
      "Scam Campaign: 'Exclusive crypto presale - 1000% guaranteed returns!'",
      "Distribution: Posted from 3,200 compromised accounts + 45 pages",
      "Paid Ads: $50K spent on Facebook ads using stolen ad accounts",
      "Victim Count: 8,500+ users sent funds to scam wallet",
      "Total Stolen: $4.2M in ETH/BTC/USDT within 72 hours",
    ],
  },
]

export function CatalystMetaHackFlow({ onClose }: { onClose: () => void }) {
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
    if (!isPlaying || currentStep >= CATALYST_META_STEPS.length) return

    const step = CATALYST_META_STEPS[currentStep]
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
        }, 10)
        return () => clearTimeout(timer)
      } else {
        setCurrentLineIndex((prev) => prev + 1)
        setCurrentCharIndex(0)
      }
    } else {
      const timer = setTimeout(() => {
        if (currentStep < CATALYST_META_STEPS.length - 1) {
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
      setTerminalLines(["> initializing catalyst meta hack simulation..."])
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
          <span className="ml-4 text-green-400 font-mono text-sm lowercase">root@holobreach:~/catalyst-meta-hack$</span>
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

"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"

const TELEGRAM_BOT_STEPS = [
  {
    id: 1,
    phase: "BOT CREATION",
    title: "Malicious Bot Registration",
    description: "Attacker creates fake telegram bot impersonating legitimate crypto services",
    details: [
      "Bot Name: @CryptoAirdrop_Official_Bot",
      "Bot Username: Mimics popular airdrop services",
      "Profile Setup: Verified-looking profile picture and description",
      "BotFather Registration: Legitimate Telegram bot API access",
    ],
  },
  {
    id: 2,
    phase: "SOCIAL ENGINEERING",
    title: "Trust Building Campaign",
    description: "Deploy bot across crypto communities with fake testimonials and proof",
    details: [
      "Target Groups: 500+ crypto Telegram groups infiltrated",
      "Fake Reviews: 1,000+ bot accounts post positive testimonials",
      "Proof Screenshots: Fabricated payment confirmations shared",
      "Urgency Tactics: 'Limited time offer - claim now!' messaging",
    ],
  },
  {
    id: 3,
    phase: "VICTIM ENGAGEMENT",
    title: "Interactive Phishing Flow",
    description: "Bot engages users with multi-step verification process to harvest data",
    details: [
      "Initial Message: 'Congratulations! You're eligible for 500 USDT airdrop'",
      "Step 1: User clicks /start command",
      "Step 2: Bot requests wallet address 'for verification'",
      "Step 3: Bot asks for seed phrase 'to confirm ownership'",
    ],
  },
  {
    id: 4,
    phase: "CREDENTIAL HARVESTING",
    title: "Wallet Data Collection",
    description: "Bot collects sensitive wallet information from unsuspecting victims",
    details: [
      "Data Collected: Wallet addresses, seed phrases, private keys",
      "Victims Engaged: 5,000+ users interact with bot daily",
      "Conversion Rate: 15% provide sensitive information",
      "Database: 750+ compromised wallets per day",
    ],
  },
  {
    id: 5,
    phase: "WALLET DRAINAGE",
    title: "Automated Fund Extraction",
    description: "Bot automatically drains funds from compromised wallets",
    details: [
      "Scanning: Bot checks wallet balances every 5 minutes",
      "Priority Targets: Wallets with >$1,000 drained first",
      "Transfer Method: Funds sent to mixer/tumbler addresses",
      "Speed: Average 2 minutes from credential capture to drainage",
    ],
  },
  {
    id: 6,
    phase: "MALWARE DISTRIBUTION",
    title: "Trojan Deployment",
    description: "Bot distributes malware disguised as wallet verification tools",
    details: [
      "Fake Tool: 'Telegram Wallet Connector' executable",
      "Malware Type: Keylogger + clipboard hijacker",
      "Distribution: 'Download this to claim your airdrop'",
      "Infection Rate: 200+ devices compromised daily",
    ],
  },
  {
    id: 7,
    phase: "NETWORK EXPANSION",
    title: "Viral Propagation",
    description: "Bot uses compromised accounts to spread to new victims",
    details: [
      "Auto-Forwarding: Bot messages sent from victim accounts",
      "Group Spam: Compromised accounts post bot link in groups",
      "DM Campaign: Bot sends messages to victim's contacts",
      "Growth Rate: 10,000+ new potential victims reached daily",
    ],
  },
  {
    id: 8,
    phase: "OPERATION CLEANUP",
    title: "Evidence Removal & Evasion",
    description: "Bot deletes messages, changes identity, and evades detection",
    details: [
      "Message Deletion: All bot messages auto-delete after 24 hours",
      "Bot Rebranding: Username and profile changed weekly",
      "Report Evasion: Bot moves to new groups before mass reports",
      "Total Stolen: $2.5M+ in crypto assets over 30 days",
      "Detection Rate: <5% of victims report to authorities",
    ],
  },
]

export function FakeTelegramBotFlow({ onClose }: { onClose: () => void }) {
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
    if (!isPlaying || currentStep >= TELEGRAM_BOT_STEPS.length) return

    const step = TELEGRAM_BOT_STEPS[currentStep]
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
        if (currentStep < TELEGRAM_BOT_STEPS.length - 1) {
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
      setTerminalLines(["> initializing fake telegram bot simulation..."])
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
          <span className="ml-4 text-green-400 font-mono text-sm lowercase">root@holobreach:~/fake-telegram-bot$</span>
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

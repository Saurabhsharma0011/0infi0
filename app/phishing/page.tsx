"use client"

import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { PhishingAttackFlow } from "@/components/phishing-attack-flow"
import { TwitterAlgoHackFlow } from "@/components/twitter-algo-hack-flow"
import { CatalystMetaHackFlow } from "@/components/catalyst-meta-hack-flow"
import { FakeTelegramBotFlow } from "@/components/fake-telegram-bot-flow"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function PhishingPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const typeFromUrl = searchParams.get("type")

  const [selectedAttack, setSelectedAttack] = useState<string>(typeFromUrl || "Malicious dApp")

  useEffect(() => {
    if (typeFromUrl) {
      setSelectedAttack(typeFromUrl)
    }
  }, [typeFromUrl])

  const handleClose = () => {
    router.push("/dashboard")
  }

  return (
    <div className="min-h-screen bg-black text-white relative">
      <Button
        onClick={handleClose}
        className="fixed top-4 left-4 z-50 bg-black text-green-400 hover:bg-green-500/10 font-mono border-2 border-green-500 shadow-[0_0_10px_rgba(34,197,94,0.3)] hover:shadow-[0_0_20px_rgba(34,197,94,0.5)] lowercase"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        back to dashboard
      </Button>

      <div className="fixed top-4 right-4 z-50 flex gap-4">
        <button
          onClick={() => setSelectedAttack("Malicious dApp")}
          className={`px-6 py-3 rounded-lg border-2 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(34,197,94,0.5)] font-mono lowercase ${
            selectedAttack === "Malicious dApp"
              ? "bg-green-500/20 border-green-500 text-green-400 shadow-[0_0_15px_rgba(34,197,94,0.4)]"
              : "bg-black/50 border-green-500/30 text-green-500/70 hover:border-green-500"
          } backdrop-blur-sm animate-float`}
        >
          crypto phishing
        </button>
        <button
          onClick={() => setSelectedAttack("Twitter algo hack")}
          className={`px-6 py-3 rounded-lg border-2 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(34,197,94,0.5)] font-mono lowercase ${
            selectedAttack === "Twitter algo hack"
              ? "bg-green-500/20 border-green-500 text-green-400 shadow-[0_0_15px_rgba(34,197,94,0.4)]"
              : "bg-black/50 border-green-500/30 text-green-500/70 hover:border-green-500"
          } backdrop-blur-sm animate-float-delayed`}
        >
          twitter algo hack
        </button>
        <button
          onClick={() => setSelectedAttack("Catalyst meta")}
          className={`px-6 py-3 rounded-lg border-2 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(34,197,94,0.5)] font-mono lowercase ${
            selectedAttack === "Catalyst meta"
              ? "bg-green-500/20 border-green-500 text-green-400 shadow-[0_0_15px_rgba(34,197,94,0.4)]"
              : "bg-black/50 border-green-500/30 text-green-500/70 hover:border-green-500"
          } backdrop-blur-sm`}
        >
          catalyst meta
        </button>
        <button
          onClick={() => setSelectedAttack("Fake telegram bot")}
          className={`px-6 py-3 rounded-lg border-2 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(34,197,94,0.5)] font-mono lowercase ${
            selectedAttack === "Fake telegram bot"
              ? "bg-green-500/20 border-green-500 text-green-400 shadow-[0_0_15px_rgba(34,197,94,0.4)]"
              : "bg-black/50 border-green-500/30 text-green-500/70 hover:border-green-500"
          } backdrop-blur-sm`}
        >
          telegram bot
        </button>
      </div>

      {selectedAttack === "Twitter algo hack" ? (
        <TwitterAlgoHackFlow onClose={handleClose} />
      ) : selectedAttack === "Catalyst meta" ? (
        <CatalystMetaHackFlow onClose={handleClose} />
      ) : selectedAttack === "Fake telegram bot" ? (
        <FakeTelegramBotFlow onClose={handleClose} />
      ) : (
        <PhishingAttackFlow onClose={handleClose} attackType={selectedAttack} />
      )}
    </div>
  )
}

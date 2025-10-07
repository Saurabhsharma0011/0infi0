"use client"

import { useState, useRef } from "react"
import { Award, Download } from "lucide-react"
import { Button } from "@/components/ui/button"

export function IncidentBadge() {
  const [isMinting, setIsMinting] = useState(false)
  const [showBadge, setShowBadge] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const mintBadge = async () => {
    setIsMinting(true)

    // Simulate minting process
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Generate badge on canvas
    const canvas = canvasRef.current
    if (canvas) {
      const ctx = canvas.getContext("2d")
      if (ctx) {
        // Black background
        ctx.fillStyle = "#000000"
        ctx.fillRect(0, 0, 400, 500)

        // White border
        ctx.strokeStyle = "#ffffff"
        ctx.lineWidth = 4
        ctx.strokeRect(10, 10, 380, 480)

        // Title
        ctx.fillStyle = "#ffffff"
        ctx.font = "bold 24px monospace"
        ctx.textAlign = "center"
        ctx.fillText("INCIDENT BADGE", 200, 60)

        // Subtitle
        ctx.font = "16px monospace"
        ctx.fillStyle = "#999999"
        ctx.fillText("HOLOBREACH SIMULATION", 200, 90)

        // Badge number
        ctx.font = "bold 48px monospace"
        ctx.fillStyle = "#ffffff"
        ctx.fillText(`#${Math.floor(Math.random() * 9999)}`, 200, 200)

        // Details
        ctx.font = "14px monospace"
        ctx.textAlign = "left"
        ctx.fillStyle = "#cccccc"
        ctx.fillText("Date: " + new Date().toLocaleDateString(), 50, 280)
        ctx.fillText("Type: Crypto Attack Simulation", 50, 310)
        ctx.fillText("Status: Contained", 50, 340)

        // Footer
        ctx.textAlign = "center"
        ctx.fillStyle = "#666666"
        ctx.font = "12px monospace"
        ctx.fillText("SYNTHETIC - NOT A REAL NFT", 200, 460)
      }
    }

    setIsMinting(false)
    setShowBadge(true)

    // Confetti effect
    try {
      const confetti = (await import("canvas-confetti")).default
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      })
    } catch (error) {
      console.log("Confetti not available")
    }
  }

  const downloadBadge = () => {
    const canvas = canvasRef.current
    if (canvas) {
      const url = canvas.toDataURL("image/png")
      const a = document.createElement("a")
      a.href = url
      a.download = `incident-badge-${Date.now()}.png`
      a.click()
    }
  }

  return (
    <div className="glass-card rounded-xl p-4 min-h-[400px] flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-mono text-sm font-bold text-white tracking-wider">INCIDENT BADGE</h3>
        <Award className="w-4 h-4 text-white/60" />
      </div>

      {!showBadge ? (
        <>
          <p className="text-xs text-white/60 mb-4 font-mono">Mint a commemorative incident badge</p>
          <div className="flex-1" />
          <Button
            onClick={mintBadge}
            disabled={isMinting}
            className="w-full bg-white/10 hover:bg-white/20 text-white border border-white/30 font-mono text-xs"
          >
            {isMinting ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                MINTING...
              </>
            ) : (
              <>
                <Award className="w-4 h-4 mr-2" />
                MINT BADGE
              </>
            )}
          </Button>
          {isMinting && (
            <div className="mt-3 h-2 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-white/50 animate-[progress_2s_ease-in-out]" style={{ width: "100%" }} />
            </div>
          )}
        </>
      ) : (
        <div className="space-y-3">
          <canvas ref={canvasRef} width={400} height={500} className="w-full border border-white/30 rounded-lg" />
          <Button
            onClick={downloadBadge}
            className="w-full bg-white/10 hover:bg-white/20 text-white border border-white/30 font-mono text-xs"
          >
            <Download className="w-4 h-4 mr-2" />
            DOWNLOAD PNG
          </Button>
          <Button
            onClick={() => setShowBadge(false)}
            variant="outline"
            className="w-full border-white/30 text-white/60 hover:text-white font-mono text-xs"
          >
            MINT ANOTHER
          </Button>
        </div>
      )}

      <canvas ref={canvasRef} width={400} height={500} className="hidden" />
    </div>
  )
}

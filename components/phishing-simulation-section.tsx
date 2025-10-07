"use client"

import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export function PhishingSimulationSection({
  onOpenSimulation,
}: {
  onOpenSimulation: (type: string) => void
}) {
  const router = useRouter()

  const handleSimulation = (type: string) => {
    onOpenSimulation(type)
    router.push(`/phishing?type=${encodeURIComponent(type)}`)
  }

  return (
    <div className="glass-card rounded-xl p-8 relative overflow-hidden">
      {/* Background grid effect */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        />
      </div>

      <div className="relative z-10 flex gap-4 justify-center flex-wrap">
        <Button
          onClick={() => handleSimulation("Malicious dApp")}
          className="bg-black text-[#00ff41] hover:bg-gray-900 hover:text-[#00ff41] hover:shadow-[0_0_20px_rgba(0,255,65,0.5)] border border-[#00ff41]/30 font-mono px-8 py-6 text-lg lowercase transition-all duration-300"
        >
          start phishing simulation
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
        <Button
          onClick={() => handleSimulation("Twitter algo hack")}
          className="bg-black text-[#00ff41] hover:bg-gray-900 hover:text-[#00ff41] hover:shadow-[0_0_20px_rgba(0,255,65,0.5)] border border-[#00ff41]/30 font-mono px-8 py-6 text-lg lowercase transition-all duration-300"
        >
          start twitter hack
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
        <Button
          onClick={() => handleSimulation("Catalyst meta")}
          className="bg-black text-[#00ff41] hover:bg-gray-900 hover:text-[#00ff41] hover:shadow-[0_0_20px_rgba(0,255,65,0.5)] border border-[#00ff41]/30 font-mono px-8 py-6 text-lg lowercase transition-all duration-300"
        >
          start catalyst meta
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
        <Button
          onClick={() => handleSimulation("Fake telegram bot")}
          className="bg-black text-[#00ff41] hover:bg-gray-900 hover:text-[#00ff41] hover:shadow-[0_0_20px_rgba(0,255,65,0.5)] border border-[#00ff41]/30 font-mono px-8 py-6 text-lg lowercase transition-all duration-300"
        >
          fake telegram bot
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </div>
    </div>
  )
}

"use client"

import { useEffect, useState } from "react"

type TraceStep = {
  from: string
  to: string
  amount: string
  timestamp: number
}

const TRACE_STEPS: TraceStep[] = [
  { from: "0xAB**...1234", to: "0xCD**...5678", amount: "125.5 ETH", timestamp: 5 },
  { from: "0xCD**...5678", to: "0xEF**...9ABC", amount: "120.0 ETH", timestamp: 15 },
  { from: "0xEF**...9ABC", to: "0x12**...DEF0", amount: "115.0 ETH", timestamp: 25 },
]

interface OnChainTraceProps {
  currentTime: number
}

export function OnChainTrace({ currentTime }: OnChainTraceProps) {
  const [activeStep, setActiveStep] = useState(-1)

  useEffect(() => {
    const active = TRACE_STEPS.findIndex((step) => currentTime >= step.timestamp && currentTime < step.timestamp + 10)
    setActiveStep(active)
  }, [currentTime])

  return (
    <div className="glass-card rounded-xl p-4 min-h-[400px]">
      <h3 className="font-mono text-sm font-bold text-white tracking-wider mb-4">ON-CHAIN TRACE</h3>
      <div className="space-y-4">
        {TRACE_STEPS.map((step, index) => (
          <div key={index} className="relative">
            <div className="flex items-center gap-3">
              <div
                className={`w-3 h-3 rounded-full border-2 transition-all ${
                  index <= activeStep
                    ? "border-white bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]"
                    : "border-white/30"
                }`}
              />
              <div className="flex-1">
                <div className="font-mono text-xs text-white/80">{step.from}</div>
                <div className="text-xs text-white/40 mt-1">{step.amount}</div>
              </div>
            </div>
            {index < TRACE_STEPS.length - 1 && (
              <div className="ml-[5px] h-8 w-0.5 bg-white/20 my-1 relative overflow-hidden">
                {index < activeStep && (
                  <div className="absolute inset-0 bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)] animate-pulse" />
                )}
              </div>
            )}
          </div>
        ))}
        <div className="flex items-center gap-3">
          <div
            className={`w-3 h-3 rounded-full border-2 transition-all ${
              activeStep === TRACE_STEPS.length - 1
                ? "border-white bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]"
                : "border-white/30"
            }`}
          />
          <div className="font-mono text-xs text-white/80">{TRACE_STEPS[TRACE_STEPS.length - 1].to}</div>
        </div>
      </div>
    </div>
  )
}

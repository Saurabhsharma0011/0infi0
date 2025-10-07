"use client"

import { Play, Pause, RotateCcw } from "lucide-react"

interface SimulationControlsProps {
  scenario: string
  speed: number
  isPlaying: boolean
  onScenarioChange: (scenario: string) => void
  onSpeedChange: (speed: number) => void
  onPlayPause: () => void
  onReset: () => void
}

export function SimulationControls({
  scenario,
  speed,
  isPlaying,
  onScenarioChange,
  onSpeedChange,
  onPlayPause,
  onReset,
}: SimulationControlsProps) {
  return (
    <section className="w-full px-4 py-6 max-w-7xl mx-auto">
      <div className="glass-card rounded-xl p-6">
        <h3 className="font-mono text-sm font-semibold text-primary mb-4">LIVE EVENT UPDATE</h3>

        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
          {/* Scenario Selector */}
          <div className="flex-1">
            <label className="block font-mono text-xs text-muted-foreground mb-2">SCENARIO</label>
            <select
              value={scenario}
              onChange={(e) => onScenarioChange(e.target.value)}
              className="w-full px-3 py-2 bg-[#0d1117] border border-cyan-500/30 rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-cyan-400 font-mono"
            >
              <option value="default.json">default.json</option>
              <option value="demo-002.json">demo-002.json</option>
            </select>
          </div>

          {/* Speed Slider */}
          <div className="flex-1">
            <label className="block font-mono text-xs text-muted-foreground mb-2">SPEED: {speed}x</label>
            <input
              type="range"
              min="0.5"
              max="2"
              step="0.5"
              value={speed}
              onChange={(e) => onSpeedChange(Number.parseFloat(e.target.value))}
              className="w-full h-2 bg-[#0d1117] rounded-lg appearance-none cursor-pointer slider-neon"
            />
          </div>

          {/* Control Buttons */}
          <div className="flex gap-2">
            <button
              onClick={onPlayPause}
              className="px-4 py-2 bg-cyan-500/20 border border-cyan-500 rounded-lg font-mono text-sm text-cyan-400 hover:bg-cyan-500/30 hover:shadow-[0_0_15px_rgba(34,211,238,0.4)] transition-all flex items-center gap-2"
            >
              {isPlaying ? (
                <>
                  <Pause className="w-4 h-4" />
                  PAUSE
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" />
                  PLAY
                </>
              )}
            </button>

            <button
              onClick={onReset}
              className="px-4 py-2 bg-cyan-500/20 border border-cyan-500 rounded-lg font-mono text-sm text-cyan-400 hover:bg-cyan-500/30 hover:shadow-[0_0_15px_rgba(34,211,238,0.4)] transition-all flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              RESET
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

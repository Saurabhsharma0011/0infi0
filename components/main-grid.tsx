"use client"

import { useState, useCallback } from "react"
import { TerminalLog } from "@/components/terminal-log"
import { WorldMap } from "@/components/world-map"
import { Timeline } from "@/components/timeline"
import { PDFGenerator } from "@/components/pdf-generator"
import { ProtocolBreakdown } from "@/components/protocol-breakdown"
import { ScriptTokens } from "@/components/script-tokens"
import { IOCPackGenerator } from "@/components/ioc-pack-generator"
import { TokenWatchlist } from "@/components/token-watchlist"
import { OnChainTrace } from "@/components/onchain-trace"
import { IncidentBadge } from "@/components/incident-badge"
import { PhishingSimulationSection } from "@/components/phishing-simulation-section"
import { PhishingAttackFlow } from "@/components/phishing-attack-flow"
import { LiveAttackMap } from "@/components/live-attack-map"
import { LiveCryptoPrices } from "@/components/live-crypto-prices"
import { Globe } from "lucide-react"
import Link from "next/link"

type LogEntry = {
  level: "INFO" | "WARN" | "ALERT" | "crypto"
  message: string
  protocol?: "TCP" | "UDP" | "HTTP"
  source?: string
  target?: string
}

type TimelineEvent = {
  timestamp: string
  level: "INFO" | "WARN" | "ALERT"
  description: string
  id: string
}

type Connection = {
  id: string
  source: string
  target: string
  level: "INFO" | "WARN" | "ALERT" | "crypto"
}

const SCRIPT_TOKENS = [
  { id: "token-1", label: "INIT", timestamp: 0 },
  { id: "token-2", label: "SCAN", timestamp: 5 },
  { id: "token-3", label: "PROBE", timestamp: 15 },
  { id: "token-4", label: "EXPLOIT", timestamp: 25 },
  { id: "token-5", label: "EXFIL", timestamp: 35 },
]

export function MainGrid() {
  const [scenario, setScenario] = useState("default.json")
  const [speed, setSpeed] = useState(1)
  const [isPlaying, setIsPlaying] = useState(true)
  const [resetTrigger, setResetTrigger] = useState(false)
  const [timelineEvents, setTimelineEvents] = useState<TimelineEvent[]>([])
  const [allLogs, setAllLogs] = useState<LogEntry[]>([])
  const [currentTime, setCurrentTime] = useState(0)

  const [activeConnections, setActiveConnections] = useState<Connection[]>([])

  const [showPhishingFlow, setShowPhishingFlow] = useState(false)
  const [showLiveAttackMap, setShowLiveAttackMap] = useState(false)

  const handleReset = () => {
    setIsPlaying(false)
    setSpeed(1)
    setResetTrigger((prev) => !prev)
    setTimelineEvents([])
    setAllLogs([])
    setCurrentTime(0)
  }

  const handleLogsUpdate = useCallback((logs: LogEntry[]) => {
    setAllLogs(logs)
    setCurrentTime(logs.length * 1.2)

    const events: TimelineEvent[] = logs.map((log, index) => ({
      id: `evt-${index}`,
      timestamp: new Date().toLocaleString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      }),
      level: log.level === "crypto" ? "WARN" : log.level,
      description: log.message,
    }))
    setTimelineEvents(events)
  }, [])

  const handleNewConnection = useCallback(
    (source: string, target: string, level: "INFO" | "WARN" | "ALERT" | "crypto") => {
      const connectionId = `conn-${Date.now()}-${Math.random()}`
      const newConnection: Connection = { id: connectionId, source, target, level }

      setActiveConnections((prev) => [...prev, newConnection])

      setTimeout(() => {
        setActiveConnections((prev) => prev.filter((c) => c.id !== connectionId))
      }, 3000)
    },
    [],
  )

  return (
    <>
      <section className="w-full px-2 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8 max-w-7xl mx-auto">
        <div className="glass-card rounded-xl p-4 mb-4 border border-green-500/30 animate-on-load animate-fade-in-down">
          <div className="font-mono text-green-400 text-xs sm:text-sm overflow-hidden">
            <div className="animate-pulse">
              <span className="text-green-500">[system]</span> initializing breach detection protocol...
              <span className="text-green-300 ml-4">[status]</span> monitoring 247 active connections
              <span className="text-green-500 ml-4">[alert]</span> 12 suspicious packets detected
              <span className="text-green-300 ml-4">[trace]</span> analyzing network topology...
            </div>
          </div>
        </div>

        <div className="glass-card rounded-xl p-3 sm:p-4 mb-3 sm:mb-4 animate-on-load animate-fade-in-down delay-100">
          <ScriptTokens tokens={SCRIPT_TOKENS} currentTime={currentTime} isPlaying={isPlaying} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4">
          <div className="glass-card rounded-xl p-3 sm:p-4 animate-on-load animate-fade-in-left delay-200">
            <TerminalLog
              isPlaying={isPlaying}
              speed={speed}
              onReset={resetTrigger}
              onLogsUpdate={handleLogsUpdate}
              onNewConnection={handleNewConnection}
            />
          </div>

          <div className="glass-card rounded-xl p-3 sm:p-4 animate-on-load animate-scale-in delay-300">
            <WorldMap activeConnections={activeConnections} />
          </div>

          <div className="glass-card rounded-xl p-3 sm:p-4 flex flex-col animate-on-load animate-fade-in-right delay-400">
            <div className="flex-1">
              <Timeline events={timelineEvents} />
            </div>
            <PDFGenerator events={timelineEvents} />
          </div>
        </div>

        <div className="mt-4 sm:mt-6 lg:mt-8 animate-on-load animate-fade-in-up delay-500">
          <div className="glass-card rounded-xl p-4 sm:p-6 border-2 border-green-500/30 hover:border-green-500/60 transition-all duration-300">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg sm:text-xl font-mono font-bold text-white mb-2 lowercase">live attack map</h3>
                <p className="text-xs sm:text-sm text-white/60 font-mono lowercase">
                  view real-time cyber attacks happening across the globe with detailed analytics
                </p>
              </div>
              <Link
                href="/live-attack"
                className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 bg-green-500/20 border-2 border-green-500 text-green-400 rounded-lg font-mono font-bold hover:bg-green-500/30 hover:shadow-[0_0_20px_rgba(0,255,0,0.3)] transition-all duration-300 flex items-center justify-center gap-2 text-sm sm:text-base lowercase"
              >
                <Globe className="h-4 w-4 sm:h-5 sm:w-5" />
                open live map
              </Link>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mt-3 sm:mt-4">
          <div className="animate-on-load animate-fade-in-up delay-600">
            <IOCPackGenerator />
          </div>
          <div className="animate-on-load animate-fade-in-up delay-700">
            <TokenWatchlist currentTime={currentTime} />
          </div>
          <div className="animate-on-load animate-fade-in-up delay-800">
            <OnChainTrace currentTime={currentTime} />
          </div>
          <div className="animate-on-load animate-fade-in-up delay-800">
            <IncidentBadge />
          </div>
        </div>

        <div className="mt-4 sm:mt-6 lg:mt-8 animate-on-load animate-fade-in-up delay-500">
          <PhishingSimulationSection onOpenSimulation={() => setShowPhishingFlow(true)} />
        </div>

        <div className="mt-3 sm:mt-4 grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4 animate-on-load animate-scale-in delay-600">
          {/* Left panel - Network stats */}
          <div className="glass-card rounded-xl p-3 sm:p-4 border border-green-500/20">
            <h3 className="font-mono text-sm font-bold text-green-400 mb-3 lowercase">network statistics</h3>
            <div className="space-y-2 font-mono text-xs text-green-300">
              <div className="flex justify-between">
                <span className="text-gray-400">packets analyzed:</span>
                <span className="text-green-400">1,247,893</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">threats blocked:</span>
                <span className="text-red-400">3,421</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">active sessions:</span>
                <span className="text-green-400">847</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">bandwidth usage:</span>
                <span className="text-yellow-400">78.4%</span>
              </div>
              <div className="mt-4 pt-3 border-t border-green-500/20">
                <div className="text-green-400 text-[10px] leading-relaxed">
                  <span className="text-green-500">&gt;</span> scanning ports 1-65535...
                  <br />
                  <span className="text-green-500">&gt;</span> detecting vulnerabilities...
                  <br />
                  <span className="text-green-500">&gt;</span> analyzing traffic patterns...
                </div>
              </div>
            </div>
          </div>

          {/* Center - Protocol breakdown */}
          <div className="glass-card rounded-xl p-3 sm:p-4 h-[300px] sm:h-[350px]">
            <ProtocolBreakdown logs={allLogs} />
          </div>

          {/* Right panel - System info */}
          <div className="glass-card rounded-xl p-3 sm:p-4 border border-green-500/20">
            <h3 className="font-mono text-sm font-bold text-green-400 mb-3 lowercase">system status</h3>
            <div className="space-y-2 font-mono text-xs text-green-300">
              <div className="flex justify-between">
                <span className="text-gray-400">firewall:</span>
                <span className="text-green-400">active</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">ids/ips:</span>
                <span className="text-green-400">enabled</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">encryption:</span>
                <span className="text-green-400">aes-256</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">uptime:</span>
                <span className="text-green-400">99.98%</span>
              </div>
              <div className="mt-4 pt-3 border-t border-green-500/20">
                <div className="text-green-400 text-[10px] leading-relaxed">
                  <span className="text-green-500">&gt;</span> monitoring ddos attacks...
                  <br />
                  <span className="text-green-500">&gt;</span> tracking malware signatures...
                  <br />
                  <span className="text-green-500">&gt;</span> updating threat database...
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 sm:mt-6 animate-on-load animate-fade-in-up delay-700">
          <div className="glass-card rounded-xl p-4 sm:p-6 border-2 border-green-500/50 bg-green-500/5 shadow-[0_0_30px_rgba(0,255,0,0.2)] hover:shadow-[0_0_50px_rgba(0,255,0,0.3)] transition-all duration-300">
            <p className="font-mono text-sm text-green-300 leading-relaxed mb-4 lowercase">
              this advanced security incident response platform leverages cutting-edge artificial intelligence and
              machine learning algorithms to detect, analyze, and respond to cyber threats in real-time. our system
              continuously monitors network traffic, identifies anomalous patterns, and provides comprehensive threat
              intelligence to security operations centers worldwide. with support for multiple attack vectors including
              ddos, malware, phishing, and zero-day exploits, holobreach delivers unparalleled protection for modern
              digital infrastructure.
            </p>
            <p className="font-mono text-sm text-green-400 leading-relaxed mb-4" dir="rtl">
              כל אדם זכאי לכל הזכויות והחירויות שנקבעו בהכרזה זו, ללא כל אפליה מכל סוג שהוא......
            </p>
            <div className="pt-3 border-t border-green-500/20">
              <div className="font-mono text-xs text-green-400">
                <span className="text-gray-400 lowercase">contract address:</span>
                <div className="mt-2 text-green-500 break-all lowercase">hacker will update ca soon</div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 sm:mt-6 animate-on-load animate-fade-in-up delay-800">
          <LiveCryptoPrices />
        </div>
      </section>

      {showPhishingFlow && <PhishingAttackFlow onClose={() => setShowPhishingFlow(false)} />}
      {showLiveAttackMap && (
        <>
          {console.log("[v0] Rendering LiveAttackMap component")}
          <LiveAttackMap
            onClose={() => {
              console.log("[v0] LiveAttackMap close button clicked")
              setShowLiveAttackMap(false)
            }}
          />
        </>
      )}
    </>
  )
}

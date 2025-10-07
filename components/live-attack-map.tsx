"use client"

import { useState, useEffect } from "react"
import { X, Minus, Plus, Target, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Country {
  name: string
  center: { x: number; y: number }
}

interface Attack {
  id: string
  type: string
  attackType: "malware" | "phishing" | "exploit"
  time: string
  source: string
  target: string
  sourceCoords: { x: number; y: number }
  targetCoords: { x: number; y: number }
}

interface AttackArc {
  id: string
  source: { x: number; y: number }
  target: { x: number; y: number }
  progress: number
  attackType: "malware" | "phishing" | "exploit"
}

const COUNTRIES: Country[] = [
  { name: "United States", center: { x: 250, y: 200 } },
  { name: "Canada", center: { x: 250, y: 150 } },
  { name: "Mexico", center: { x: 230, y: 250 } },
  { name: "Brazil", center: { x: 350, y: 400 } },
  { name: "United Kingdom", center: { x: 500, y: 160 } },
  { name: "France", center: { x: 510, y: 200 } },
  { name: "Germany", center: { x: 540, y: 180 } },
  { name: "Russia", center: { x: 700, y: 150 } },
  { name: "China", center: { x: 800, y: 220 } },
  { name: "India", center: { x: 720, y: 260 } },
  { name: "Japan", center: { x: 900, y: 210 } },
  { name: "Australia", center: { x: 850, y: 420 } },
  { name: "South Africa", center: { x: 560, y: 430 } },
  { name: "Egypt", center: { x: 560, y: 250 } },
  { name: "Saudi Arabia", center: { x: 620, y: 260 } },
  { name: "South Korea", center: { x: 880, y: 220 } },
  { name: "Nigeria", center: { x: 520, y: 320 } },
  { name: "Argentina", center: { x: 330, y: 480 } },
  { name: "Vietnam", center: { x: 820, y: 270 } },
  { name: "Singapore", center: { x: 820, y: 310 } },
]

const ATTACK_TYPES = {
  malware: [
    "Ransomware Encryption Attack",
    "Trojan Horse Deployment",
    "Worm Propagation Detected",
    "Rootkit Installation Attempt",
  ],
  phishing: [
    "Spear Phishing Campaign",
    "Credential Harvesting Attack",
    "Business Email Compromise",
    "Social Engineering Attack",
  ],
  exploit: ["Zero-Day Exploit Detected", "SQL Injection Attack", "Cross-Site Scripting (XSS)", "Remote Code Execution"],
}

const HIGH_TARGET_COUNTRIES = ["United States", "United Kingdom", "Germany", "China", "Japan"]

export function LiveAttackMap({ onClose }: { onClose: () => void }) {
  console.log("[v0] LiveAttackMap component mounted")

  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null)
  const [attackCount, setAttackCount] = useState(4980307)
  const [attackRate, setAttackRate] = useState(4)
  const [recentAttacks, setRecentAttacks] = useState<Attack[]>([])
  const [attackArcs, setAttackArcs] = useState<AttackArc[]>([])
  const [followMode, setFollowMode] = useState(false)
  const [cameraTransform, setCameraTransform] = useState({ x: 0, y: 0, scale: 1 })
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const generateRandomAttack = (): Attack => {
    const sourceCountry = COUNTRIES[Math.floor(Math.random() * COUNTRIES.length)]
    let targetCountry = COUNTRIES[Math.floor(Math.random() * COUNTRIES.length)]
    while (targetCountry.name === sourceCountry.name) {
      targetCountry = COUNTRIES[Math.floor(Math.random() * COUNTRIES.length)]
    }

    const attackTypes: ("malware" | "phishing" | "exploit")[] = ["malware", "phishing", "exploit"]
    const attackType = attackTypes[Math.floor(Math.random() * attackTypes.length)]
    const typeAttacks = ATTACK_TYPES[attackType]

    const now = new Date()
    const time = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}:${String(now.getSeconds()).padStart(2, "0")}`

    return {
      id: `${Date.now()}-${Math.random()}`,
      type: typeAttacks[Math.floor(Math.random() * typeAttacks.length)],
      attackType,
      time,
      source: sourceCountry.name,
      target: targetCountry.name,
      sourceCoords: sourceCountry.center,
      targetCoords: targetCountry.center,
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      const increment = Math.floor(Math.random() * 50) + 20
      setAttackCount((prev) => prev + increment)

      if (Math.random() < attackRate / 10) {
        const newAttack = generateRandomAttack()
        setRecentAttacks((prev) => [newAttack, ...prev.slice(0, 5)])

        setAttackArcs((prev) => [
          ...prev,
          {
            id: newAttack.id,
            source: newAttack.sourceCoords,
            target: newAttack.targetCoords,
            progress: 0,
            attackType: newAttack.attackType,
          },
        ])

        if (HIGH_TARGET_COUNTRIES.includes(newAttack.target) && Math.random() < 0.4) {
          setTimeout(() => {
            const additionalAttack = generateRandomAttack()
            setRecentAttacks((prev) => [additionalAttack, ...prev.slice(0, 5)])
            setAttackArcs((prev) => [
              ...prev,
              {
                id: additionalAttack.id,
                source: additionalAttack.sourceCoords,
                target: additionalAttack.targetCoords,
                progress: 0,
                attackType: additionalAttack.attackType,
              },
            ])
          }, 200)
        }
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [attackRate])

  useEffect(() => {
    const interval = setInterval(() => {
      setAttackArcs((prev) =>
        prev
          .map((arc) => ({
            ...arc,
            progress: arc.progress + 0.02,
          }))
          .filter((arc) => arc.progress < 1),
      )
    }, 50)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (followMode && recentAttacks.length > 0) {
      const latestAttack = recentAttacks[0]
      const targetX = latestAttack.targetCoords.x
      const targetY = latestAttack.targetCoords.y

      const centerX = 500 - targetX
      const centerY = 275 - targetY

      setCameraTransform({
        x: centerX,
        y: centerY,
        scale: 1.5,
      })
    } else if (!followMode) {
      setCameraTransform({ x: 0, y: 0, scale: 1 })
    }
  }, [followMode, recentAttacks])

  const getAttackColor = (attackType: "malware" | "phishing" | "exploit") => {
    switch (attackType) {
      case "malware":
        return "#ef4444" // red
      case "phishing":
        return "#00ff00" // green
      case "exploit":
        return "#a855f7" // purple
    }
  }

  const createArcPath = (source: { x: number; y: number }, target: { x: number; y: number }) => {
    const dx = target.x - source.x
    const dy = target.y - source.y
    const distance = Math.sqrt(dx * dx + dy * dy)
    const arcHeight = distance * 0.25
    const midX = (source.x + target.x) / 2
    const midY = (source.y + target.y) / 2 - arcHeight
    return `M ${source.x} ${source.y} Q ${midX} ${midY} ${target.x} ${target.y}`
  }

  return (
    <div className="fixed inset-0 z-[9999] bg-black flex flex-col lg:flex-row pointer-events-auto">
      <div className="lg:hidden flex items-center justify-between px-4 py-3 border-b border-green-500/30 bg-black">
        <Button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          variant="ghost"
          size="icon"
          className="text-green-400 hover:text-green-300 hover:bg-green-500/10"
        >
          <Menu className="h-5 w-5" />
        </Button>
        <div className="text-center flex-1">
          <div className="text-2xl sm:text-4xl lg:text-5xl font-mono font-bold text-green-400">
            {attackCount.toLocaleString()}
          </div>
          <div className="text-[10px] sm:text-sm font-mono text-white/60">LIVE ATTACKS</div>
        </div>
        <Button
          onClick={onClose}
          variant="ghost"
          size="icon"
          className="text-green-400 hover:text-green-300 hover:bg-green-500/10"
        >
          <X className="h-5 w-5 sm:h-6 sm:w-6" />
        </Button>
      </div>

      <div
        className={`${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 fixed lg:relative inset-y-0 left-0 z-50 w-72 sm:w-80 border-r border-green-500/30 bg-black flex flex-col transition-transform duration-300 lg:transition-none`}
      >
        <div className="lg:hidden flex justify-end p-4 border-b border-green-500/20">
          <Button
            onClick={() => setIsSidebarOpen(false)}
            variant="ghost"
            size="icon"
            className="text-green-400 hover:text-green-300 hover:bg-green-500/10"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="p-4 sm:p-6 border-b border-green-500/20">
          <h3 className="text-xs font-mono text-white/60 mb-2 tracking-wider">ATTACK STATISTICS</h3>
          <div className="text-2xl sm:text-3xl font-mono font-bold text-green-400 mb-1">
            {attackCount.toLocaleString()}
          </div>
          <div className="text-xs font-mono text-white/40">Total attacks today</div>
        </div>

        <div className="p-4 sm:p-6 border-b border-green-500/20">
          <h3 className="text-xs font-mono text-white/60 mb-3 tracking-wider">ATTACK TYPES</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="relative w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center">
                <div
                  className="absolute inset-0 rounded-full border-2 border-red-500/60 animate-ping"
                  style={{ animationDuration: "2s" }}
                />
                <div className="absolute inset-1 rounded-full border-2 border-red-500/40" />
                <div className="absolute inset-2 rounded-full border-2 border-red-500/60" />
                <div className="absolute inset-3 rounded-full bg-red-500" />
              </div>
              <span className="text-xs sm:text-sm font-mono text-white">Malware</span>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center">
                <div
                  className="absolute inset-0 rounded-full border-2 border-green-400/60 animate-ping"
                  style={{ animationDuration: "2s", animationDelay: "0.3s" }}
                />
                <div className="absolute inset-1 rounded-full border-2 border-green-400/40" />
                <div className="absolute inset-2 rounded-full border-2 border-green-400/60" />
                <div className="absolute inset-3 rounded-full bg-green-400" />
              </div>
              <span className="text-xs sm:text-sm font-mono text-white">Phishing</span>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center">
                <div
                  className="absolute inset-0 rounded-full border-2 border-purple-500/60 animate-ping"
                  style={{ animationDuration: "2s", animationDelay: "0.6s" }}
                />
                <div className="absolute inset-1 rounded-full border-2 border-purple-500/40" />
                <div className="absolute inset-2 rounded-full border-2 border-purple-500/60" />
                <div className="absolute inset-3 rounded-full bg-purple-500" />
              </div>
              <span className="text-xs sm:text-sm font-mono text-white">Exploit</span>
            </div>
          </div>
        </div>

        <div className="p-4 sm:p-6 border-b border-green-500/20">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xs font-mono text-white/60 tracking-wider">ATTACK RATE</h3>
            <div className="flex items-center gap-2">
              <Button
                size="icon"
                variant="ghost"
                className="h-6 w-6 text-green-400 hover:text-green-300 hover:bg-green-500/10"
                onClick={() => setAttackRate(Math.max(1, attackRate - 1))}
              >
                <Minus className="h-3 w-3" />
              </Button>
              <span className="text-sm font-mono text-green-400 w-4 text-center">{attackRate}</span>
              <Button
                size="icon"
                variant="ghost"
                className="h-6 w-6 text-green-400 hover:text-green-300 hover:bg-green-500/10"
                onClick={() => setAttackRate(Math.min(10, attackRate + 1))}
              >
                <Plus className="h-3 w-3" />
              </Button>
            </div>
          </div>

          <Button
            onClick={() => setFollowMode(!followMode)}
            variant="outline"
            size="sm"
            className={`w-full mt-3 font-mono text-xs transition-all ${
              followMode
                ? "bg-green-500/20 border-green-500 text-green-400 hover:bg-green-500/30"
                : "border-green-500/30 text-green-400 hover:bg-green-500/10"
            }`}
          >
            <Target className="h-3 w-3 mr-2" />
            {followMode ? "Following Attacker" : "Follow Attacker"}
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-2 sm:space-y-3">
          <h3 className="text-xs font-mono text-white/60 mb-3 tracking-wider">RECENT ATTACKS</h3>
          {recentAttacks.map((attack) => (
            <div
              key={attack.id}
              className="flex items-start gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg bg-black border transition-colors"
              style={{
                borderColor: `${getAttackColor(attack.attackType)}40`,
              }}
            >
              <div
                className="w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center flex-shrink-0"
                style={{
                  backgroundColor: `${getAttackColor(attack.attackType)}20`,
                  borderColor: `${getAttackColor(attack.attackType)}40`,
                  borderWidth: "1px",
                }}
              >
                <div
                  className="w-2 h-2 sm:w-3 sm:h-3 rounded-full animate-pulse"
                  style={{ backgroundColor: getAttackColor(attack.attackType) }}
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[10px] sm:text-xs font-mono text-white truncate mb-1">{attack.type}</div>
                <div className="text-[9px] sm:text-[10px] font-mono text-white/40">
                  {attack.time} {attack.source} → {attack.target}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {isSidebarOpen && (
        <div className="lg:hidden fixed inset-0 bg-black/50 z-40" onClick={() => setIsSidebarOpen(false)} />
      )}

      <div className="flex-1 flex flex-col bg-black min-h-0">
        <div className="hidden lg:flex items-center justify-between px-6 sm:px-8 py-4 sm:py-6 border-b border-green-500/30">
          <div className="flex-1 text-center">
            <div className="text-3xl sm:text-4xl lg:text-5xl font-mono font-bold text-green-400 mb-1 drop-shadow-[0_0_20px_rgba(0,255,0,0.5)]">
              {attackCount.toLocaleString()}
            </div>
            <div className="text-xs sm:text-sm font-mono text-white/60 tracking-wider">LIVE CYBER ATTACKS</div>
          </div>
          <Button
            onClick={onClose}
            variant="ghost"
            size="icon"
            className="text-green-400 hover:text-green-300 hover:bg-green-500/10 transition-colors"
          >
            <X className="h-5 w-5 sm:h-6 sm:w-6" />
          </Button>
        </div>

        <div className="flex-1 relative overflow-hidden bg-black min-h-0">
          <div className="absolute inset-0 flex items-center justify-center p-2 sm:p-4 lg:p-8">
            <img
              src="/images/design-mode/image-removebg-preview%20%282%29.png"
              alt="World Map"
              className="absolute inset-0 w-full h-full object-contain opacity-60"
              style={{
                filter: "invert(1) brightness(1.2)",
              }}
            />

            <svg
              viewBox="0 0 1000 550"
              className="absolute inset-0 w-full h-full transition-transform duration-1000 ease-out"
              style={{
                transform: `translate(${cameraTransform.x}px, ${cameraTransform.y}px) scale(${cameraTransform.scale})`,
              }}
            >
              <defs>
                <linearGradient id="arcGradientRed" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#ef4444" stopOpacity="0.2" />
                  <stop offset="50%" stopColor="#ef4444" stopOpacity="1" />
                  <stop offset="100%" stopColor="#ef4444" stopOpacity="0.2" />
                </linearGradient>
                <linearGradient id="arcGradientGreen" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#00ff00" stopOpacity="0.2" />
                  <stop offset="50%" stopColor="#00ff00" stopOpacity="1" />
                  <stop offset="100%" stopColor="#00ff00" stopOpacity="0.2" />
                </linearGradient>
                <linearGradient id="arcGradientPurple" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#a855f7" stopOpacity="0.2" />
                  <stop offset="50%" stopColor="#a855f7" stopOpacity="1" />
                  <stop offset="100%" stopColor="#a855f7" stopOpacity="0.2" />
                </linearGradient>
              </defs>

              {attackArcs.map((arc) => {
                const pathLength = 1000
                const currentLength = pathLength * arc.progress

                const t = arc.progress
                const dx = arc.target.x - arc.source.x
                const dy = arc.target.y - arc.source.y
                const distance = Math.sqrt(dx * dx + dy * dy)
                const arcHeight = distance * 0.25
                const midX = (arc.source.x + arc.target.x) / 2
                const midY = (arc.source.y + arc.target.y) / 2 - arcHeight

                const currentX = (1 - t) * (1 - t) * arc.source.x + 2 * (1 - t) * t * midX + t * t * arc.target.x
                const currentY = (1 - t) * (1 - t) * arc.source.y + 2 * (1 - t) * t * midY + t * t * arc.target.y

                const gradientId =
                  arc.attackType === "malware"
                    ? "arcGradientRed"
                    : arc.attackType === "exploit"
                      ? "arcGradientPurple"
                      : "arcGradientGreen"

                const color = getAttackColor(arc.attackType)

                return (
                  <g key={arc.id}>
                    <path
                      d={createArcPath(arc.source, arc.target)}
                      fill="none"
                      stroke={`url(#${gradientId})`}
                      strokeWidth="2"
                      strokeDasharray={pathLength}
                      strokeDashoffset={pathLength - currentLength}
                      opacity={1 - arc.progress * 0.3}
                      style={{
                        filter: `drop-shadow(0 0 8px ${color})`,
                      }}
                    />
                    <circle
                      cx={currentX}
                      cy={currentY}
                      r="4"
                      fill={color}
                      opacity={1 - arc.progress * 0.2}
                      style={{
                        filter: `drop-shadow(0 0 10px ${color})`,
                      }}
                    />
                  </g>
                )
              })}

              {COUNTRIES.map((country) => (
                <g key={country.name}>
                  <circle
                    cx={country.center.x}
                    cy={country.center.y}
                    r="20"
                    fill="transparent"
                    className="cursor-pointer"
                    onMouseEnter={() => setHoveredCountry(country.name)}
                    onMouseLeave={() => setHoveredCountry(null)}
                  />

                  {hoveredCountry === country.name && (
                    <g>
                      <rect
                        x={country.center.x - 60}
                        y={country.center.y - 25}
                        width="120"
                        height="30"
                        rx="4"
                        fill="#000000"
                        stroke="#00ff00"
                        strokeWidth="1.5"
                        opacity="0.95"
                        style={{
                          filter: "drop-shadow(0 4px 12px rgba(0, 255, 0, 0.4))",
                        }}
                      />
                      <text
                        x={country.center.x}
                        y={country.center.y - 8}
                        textAnchor="middle"
                        className="text-xs font-mono font-semibold fill-white"
                      >
                        {country.name}
                      </text>
                    </g>
                  )}
                </g>
              ))}

              {recentAttacks.slice(0, 5).map((attack, index) => {
                const color = getAttackColor(attack.attackType)
                return (
                  <g key={attack.id}>
                    <circle
                      cx={attack.targetCoords.x}
                      cy={attack.targetCoords.y}
                      r="12"
                      fill={color}
                      opacity="0.3"
                      className="animate-ping"
                      style={{ animationDelay: `${index * 150}ms`, animationDuration: "1.5s" }}
                    />
                    <circle
                      cx={attack.targetCoords.x}
                      cy={attack.targetCoords.y}
                      r="5"
                      fill={color}
                      style={{
                        filter: `drop-shadow(0 0 8px ${color})`,
                      }}
                    />
                  </g>
                )
              })}
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}

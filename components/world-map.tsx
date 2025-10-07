"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Earth from "./earth"

const CITY_COORDINATES: Record<string, { lat: number; lon: number }> = {
  "New York": { lat: 40.7128, lon: -74.006 },
  Mumbai: { lat: 19.076, lon: 72.8777 },
  Frankfurt: { lat: 50.1109, lon: 8.6821 },
  Singapore: { lat: 1.3521, lon: 103.8198 },
  London: { lat: 51.5074, lon: -0.1278 },
  Tokyo: { lat: 35.6762, lon: 139.6503 },
  Moscow: { lat: 55.7558, lon: 37.6173 },
}

interface Connection {
  id: string
  source: string
  target: string
  level: "INFO" | "WARN" | "ALERT"
}

interface WorldMapProps {
  activeConnections?: Connection[]
}

export function WorldMap({ activeConnections = [] }: WorldMapProps) {
  const [containerSize, setContainerSize] = useState({ width: 400, height: 400 })

  useEffect(() => {
    const updateSize = () => {
      const container = document.getElementById("world-map-container")
      if (container) {
        setContainerSize({
          width: container.clientWidth,
          height: container.clientHeight,
        })
      }
    }
    updateSize()
    window.addEventListener("resize", updateSize)
    return () => window.removeEventListener("resize", updateSize)
  }, [])

  const latLonToScreen = (lat: number, lon: number) => {
    const x = ((lon + 180) / 360) * containerSize.width
    const y = ((90 - lat) / 180) * containerSize.height
    return { x, y }
  }

  const getConnectionColor = (level: "INFO" | "WARN" | "ALERT") => {
    switch (level) {
      case "ALERT":
        return "#ef4444" // red
      case "WARN":
        return "#f59e0b" // amber
      default:
        return "#06b6d4" // cyan
    }
  }

  return (
    <div className="h-[500px] flex flex-col">
      <h2 className="font-mono text-sm font-semibold text-primary mb-4 border-b border-border pb-2">WORLD MAP</h2>
      <div id="world-map-container" className="flex-1 relative">
        {/* Globe Canvas */}
        <div className="absolute inset-0 flex items-center justify-center">
          <Earth
            className="w-full h-full"
            theta={0.3}
            dark={1}
            scale={1.2}
            diffuse={1.5}
            mapSamples={50000}
            mapBrightness={8}
            baseColor={[0, 1, 1]}
            markerColor={[1, 0, 1]}
            glowColor={[0, 1, 1]}
          />
        </div>

        <svg className="absolute inset-0 pointer-events-none" width="100%" height="100%">
          <AnimatePresence>
            {activeConnections.map((connection) => {
              const sourceCoords = CITY_COORDINATES[connection.source]
              const targetCoords = CITY_COORDINATES[connection.target]

              if (!sourceCoords || !targetCoords) return null

              const start = latLonToScreen(sourceCoords.lat, sourceCoords.lon)
              const end = latLonToScreen(targetCoords.lat, targetCoords.lon)

              // Create curved path (quadratic bezier)
              const midX = (start.x + end.x) / 2
              const midY = (start.y + end.y) / 2 - 50 // Arc upward
              const pathD = `M ${start.x} ${start.y} Q ${midX} ${midY} ${end.x} ${end.y}`

              const color = getConnectionColor(connection.level)

              return (
                <g key={connection.id}>
                  {/* Arc path */}
                  <motion.path
                    d={pathD}
                    stroke={color}
                    strokeWidth="2"
                    fill="none"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.6 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    style={{
                      filter: `drop-shadow(0 0 4px ${color})`,
                    }}
                  />

                  {/* Animated dot traveling along arc */}
                  <motion.circle
                    r="4"
                    fill={color}
                    initial={{ offsetDistance: "0%", opacity: 0 }}
                    animate={{ offsetDistance: "100%", opacity: [0, 1, 1, 0] }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                    style={{
                      offsetPath: `path('${pathD}')`,
                      filter: `drop-shadow(0 0 6px ${color})`,
                    }}
                  />
                </g>
              )
            })}
          </AnimatePresence>
        </svg>
      </div>
    </div>
  )
}

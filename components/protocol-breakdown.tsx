"use client"

import { useEffect, useState } from "react"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"

type LogEntry = {
  level: "INFO" | "WARN" | "ALERT"
  message: string
  protocol?: "TCP" | "UDP" | "HTTP"
}

interface ProtocolBreakdownProps {
  logs: LogEntry[]
}

const PROTOCOL_COLORS = {
  TCP: "#3b82f6", // blue
  UDP: "#22c55e", // green
  HTTP: "#eab308", // yellow
}

export function ProtocolBreakdown({ logs }: ProtocolBreakdownProps) {
  const [protocolData, setProtocolData] = useState<{ name: string; value: number; color: string }[]>([])

  useEffect(() => {
    // Aggregate protocol counts from logs
    const counts = { TCP: 0, UDP: 0, HTTP: 0 }

    logs.forEach((log) => {
      if (log.protocol) {
        counts[log.protocol]++
      }
    })

    // Convert to chart data format
    const data = Object.entries(counts)
      .filter(([_, value]) => value > 0)
      .map(([name, value]) => ({
        name,
        value,
        color: PROTOCOL_COLORS[name as keyof typeof PROTOCOL_COLORS],
      }))

    setProtocolData(data)
  }, [logs])

  return (
    <div className="h-full flex flex-col">
      <h2 className="font-mono text-sm font-bold text-green-400 mb-3 border-b border-green-500/30 pb-2 tracking-wider lowercase">
        protocol distribution
      </h2>
      <div className="flex-1 flex items-center justify-center">
        {protocolData.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={protocolData}
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={95}
                paddingAngle={4}
                dataKey="value"
                animationBegin={0}
                animationDuration={1000}
                animationEasing="ease-out"
              >
                {protocolData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} stroke="rgba(0,0,0,0.5)" strokeWidth={2} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(10, 14, 19, 0.95)",
                  border: "1px solid rgba(34, 211, 238, 0.4)",
                  borderRadius: "8px",
                  color: "#fff",
                  fontSize: "12px",
                  fontFamily: "monospace",
                  padding: "8px 12px",
                }}
              />
              <Legend
                verticalAlign="bottom"
                height={40}
                formatter={(value) => <span className="text-gray-300 text-sm font-mono">{value}</span>}
                iconType="circle"
              />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <div className="text-gray-600 text-sm font-mono lowercase">awaiting protocol data...</div>
        )}
      </div>
    </div>
  )
}

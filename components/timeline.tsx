"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

type TimelineEvent = {
  timestamp: string
  level: "INFO" | "WARN" | "ALERT"
  description: string
  id: string
}

interface TimelineProps {
  events: TimelineEvent[]
}

export function Timeline({ events }: TimelineProps) {
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null)

  const getLevelStyles = (level: TimelineEvent["level"]) => {
    switch (level) {
      case "INFO":
        return "border-green-500/50 bg-green-950/20"
      case "WARN":
        return "border-green-500/50 bg-green-950/20"
      case "ALERT":
        return "border-green-500/50 bg-green-950/30 shadow-[0_0_20px_rgba(0,255,0,0.3)]"
    }
  }

  const getLevelColor = (level: TimelineEvent["level"]) => {
    return "text-green-400"
  }

  return (
    <div className="h-[500px] flex flex-col">
      <h2 className="font-mono text-sm font-bold text-green-400 mb-3 border-b border-green-500/30 pb-2 tracking-wider">
        INCIDENT TIMELINE
      </h2>
      <div className="flex-1 space-y-2.5 overflow-y-auto custom-scrollbar pr-2">
        {events.map((event, index) => (
          <div
            key={event.id}
            onClick={() => setSelectedEvent(event.id)}
            className={`p-3.5 rounded-lg border-2 transition-all duration-300 cursor-pointer animate-in slide-in-from-right backdrop-blur-sm ${getLevelStyles(
              event.level,
            )} ${selectedEvent === event.id ? "ring-2 ring-green-400 scale-[1.02]" : "hover:scale-[1.01]"}`}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="font-mono text-[10px] text-white/40 tracking-wide">{event.timestamp}</div>
              <div className={`font-mono text-xs font-bold ${getLevelColor(event.level)} tracking-wider`}>
                {event.level}
              </div>
            </div>
            <div className="text-sm text-white leading-relaxed">{event.description}</div>
          </div>
        ))}
      </div>

      <AIInvestigator />
    </div>
  )
}

function AIInvestigator() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Array<{ role: "user" | "assistant"; content: string }>>([])
  const [input, setInput] = useState("")

  const handleSend = () => {
    if (!input.trim()) return

    const userMessage = input.trim().toLowerCase()
    setMessages([...messages, { role: "user", content: input }])
    setInput("")

    setTimeout(() => {
      let response = ""
      if (userMessage.includes("what happened") || userMessage.includes("incident")) {
        response =
          "analyzing breach vector... initial compromise detected via phishing campaign targeting finance department. attacker gained access to internal network through compromised credentials."
      } else if (userMessage.includes("severity") || userMessage.includes("damage")) {
        response =
          "threat level: critical. estimated data exfiltration: 2.3tb. affected systems: 47 endpoints, 3 servers. recommend immediate containment and forensic analysis."
      } else {
        response =
          "processing query... cross-referencing with threat intelligence database. recommend reviewing timeline events for detailed attack chain analysis."
      }

      setMessages((prev) => [...prev, { role: "assistant", content: response }])
    }, 800)
  }

  return (
    <div className="mt-4 border-t border-green-500/30 pt-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between font-mono text-sm font-bold text-green-400 hover:text-green-300 transition-colors tracking-wider"
      >
        <span>AI INVESTIGATOR</span>
        {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
      </button>

      {isOpen && (
        <div className="mt-3 space-y-3">
          <div className="max-h-[200px] overflow-y-auto space-y-2 custom-scrollbar">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`p-3 rounded-lg text-sm leading-relaxed font-mono ${
                  msg.role === "user"
                    ? "bg-green-950/40 border border-green-500/40 text-green-100 ml-4"
                    : "bg-green-950/40 border border-green-500/40 text-green-100 mr-4 shadow-[0_0_15px_rgba(0,255,0,0.2)]"
                }`}
              >
                {msg.content}
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="ask about the incident..."
              className="flex-1 px-3 py-2.5 bg-black border border-green-500/30 rounded-lg text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent font-mono"
            />
            <button
              onClick={handleSend}
              className="px-5 py-2.5 bg-green-500/20 border border-green-500 rounded-lg text-sm font-mono font-semibold text-green-400 hover:bg-green-500/30 hover:shadow-[0_0_20px_rgba(0,255,0,0.4)] transition-all"
            >
              SEND
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

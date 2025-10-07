"use client"

import { useState } from "react"
import { FileDown } from "lucide-react"

interface PDFGeneratorProps {
  events: Array<{
    timestamp: string
    level: string
    description: string
  }>
}

export function PDFGenerator({ events }: PDFGeneratorProps) {
  const [isGenerating, setIsGenerating] = useState(false)

  const generatePDF = async () => {
    setIsGenerating(true)

    // Dynamic import of jspdf
    const { jsPDF } = await import("jspdf")

    const doc = new jsPDF()

    // Title
    doc.setFontSize(22)
    doc.setTextColor(34, 211, 238) // Cyan
    doc.text("HoloBreach Incident Report", 20, 20)

    // Subtitle
    doc.setFontSize(12)
    doc.setTextColor(100, 100, 100)
    doc.text("Simulated Incident Analysis", 20, 30)

    // Summary section
    doc.setFontSize(14)
    doc.setTextColor(0, 0, 0)
    doc.text("Summary", 20, 45)

    doc.setFontSize(10)
    doc.setTextColor(60, 60, 60)
    const summary =
      "This is a synthetic incident simulation demonstrating a multi-stage attack:\nfailed login attempts, account compromise, and unauthorized data exfiltration."
    doc.text(summary, 20, 55, { maxWidth: 170 })

    // Timeline section
    doc.setFontSize(14)
    doc.setTextColor(0, 0, 0)
    doc.text("Timeline of Events", 20, 75)

    let yPos = 85
    doc.setFontSize(9)
    events.slice(0, 20).forEach((event) => {
      if (event.level === "INFO") doc.setTextColor(100, 100, 100)
      if (event.level === "WARN") doc.setTextColor(245, 158, 11)
      if (event.level === "ALERT") doc.setTextColor(239, 68, 68)

      doc.text(`[${event.level}] ${event.timestamp}`, 20, yPos)
      doc.setTextColor(60, 60, 60)
      doc.text(event.description, 25, yPos + 5)
      yPos += 15

      // Add page break if needed
      if (yPos > 260) {
        doc.addPage()
        yPos = 20
      }
    })

    // Footer disclaimer
    doc.setFontSize(8)
    doc.setTextColor(150, 150, 150)
    doc.text("DISCLAIMER: This report contains only simulated data for demonstration purposes.", 20, 280)

    // Save the PDF
    doc.save("holobreach-incident-report.pdf")

    setIsGenerating(false)
  }

  return (
    <button
      onClick={generatePDF}
      disabled={isGenerating}
      className="w-full mt-4 px-4 py-3 bg-magenta-500/20 border border-magenta-500 rounded-lg font-mono text-sm text-magenta-400 hover:bg-magenta-500/30 hover:shadow-[0_0_15px_rgba(236,72,153,0.4)] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
    >
      <FileDown className="w-4 h-4" />
      {isGenerating ? "GENERATING..." : "DOWNLOAD INCIDENT REPORT (PDF)"}
    </button>
  )
}

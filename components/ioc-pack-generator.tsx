"use client"

import { useState } from "react"
import { Download, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"

export function IOCPackGenerator() {
  const [isGenerating, setIsGenerating] = useState(false)

  const generateIOCPack = async () => {
    setIsGenerating(true)

    try {
      // Dynamic import of jszip
      const JSZip = (await import("jszip")).default

      const zip = new JSZip()

      // Generate fake IOCs
      const iocs = {
        version: "1.0",
        generated: new Date().toISOString(),
        disclaimer: "SYNTHETIC DATA - FOR SIMULATION ONLY",
        indicators: {
          ips: ["192.168.**.***", "10.0.**.***", "172.16.**.***", "203.0.**.***", "45.**.***.**"],
          domains: ["mal****.example.com", "c2-****.net", "phish-****.org", "bad-****.io"],
          hashes: [
            "a3f5****************************",
            "b7e2****************************",
            "c9d1****************************",
          ],
        },
      }

      // Add iocs.json
      zip.file("iocs.json", JSON.stringify(iocs, null, 2))

      // Add README
      const readme = `IOC PACK - SYNTHETIC DATA
========================

This IOC pack contains SYNTHETIC indicators of compromise for simulation purposes only.

⚠️  WARNING: All data is FAKE and masked for training/demonstration.
⚠️  DO NOT use these indicators in production security systems.

Contents:
- iocs.json: Masked IP addresses, domains, and file hashes
- iocs.pdf: Summary report (text format)

Generated: ${new Date().toLocaleString()}
`
      zip.file("README.txt", readme)

      // Add fake PDF (as text)
      const pdfContent = `INCIDENT RESPONSE REPORT
========================

Date: ${new Date().toLocaleString()}
Classification: SIMULATION

EXECUTIVE SUMMARY
-----------------
This report contains synthetic indicators of compromise (IOCs) 
identified during a simulated security incident.

INDICATORS
----------
IP Addresses: ${iocs.indicators.ips.length} masked entries
Domains: ${iocs.indicators.domains.length} masked entries
File Hashes: ${iocs.indicators.hashes.length} masked entries

DISCLAIMER
----------
All data in this report is SYNTHETIC and for training purposes only.
`
      zip.file("iocs.pdf", pdfContent)

      // Generate and download
      const blob = await zip.generateAsync({ type: "blob" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `ioc-pack-${Date.now()}.zip`
      a.click()
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error("Failed to generate IOC pack:", error)
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="glass-card rounded-xl p-4 min-h-[400px] flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-mono text-sm font-bold text-white tracking-wider">IOC PACK</h3>
        <FileText className="w-4 h-4 text-white/60" />
      </div>
      <p className="text-xs text-white/60 mb-4 font-mono">Download synthetic indicators of compromise</p>
      <div className="flex-1" />
      <Button
        onClick={generateIOCPack}
        disabled={isGenerating}
        className="w-full bg-white/10 hover:bg-white/20 text-white border border-white/30 font-mono text-xs"
      >
        <Download className="w-4 h-4 mr-2" />
        {isGenerating ? "GENERATING..." : "DOWNLOAD IOC PACK"}
      </Button>
    </div>
  )
}

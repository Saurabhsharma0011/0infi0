import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Orbitron } from "next/font/google"
import "./globals.css"
import { Suspense } from "react"
import { Analytics } from "@vercel/analytics/react"

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  display: "swap",
})

const bitcount = Orbitron({
  subsets: ["latin"],
  variable: "--font-bitcount",
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
})

export const metadata: Metadata = {
  title: "0∞0",
  description:
    "simulated security incident response platform - experience comprehensive, repeatable security incident simulation with real-time log streaming, interactive timeline analysis, global threat visualization, and ai-powered investigation assistance.",
  generator: "v0.app",
  icons: {
    icon: "/icon.png",
    apple: "/icon.png",
  },
  openGraph: {
    title: "0∞0",
    description: "simulated security incident response platform",
    images: ["/icon.png"],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`font-sans ${GeistSans.variable} ${GeistMono.variable} ${orbitron.variable} ${bitcount.variable}`}
      >
        <Suspense fallback={null}>{children}</Suspense>
        <Analytics />
      </body>
    </html>
  )
}

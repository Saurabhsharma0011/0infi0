"use client"

import { LiveAttackMap } from "@/components/live-attack-map"
import { useRouter } from "next/navigation"

export default function LiveAttackPage() {
  const router = useRouter()

  return (
    <LiveAttackMap
      onClose={() => {
        router.push("/")
      }}
    />
  )
}

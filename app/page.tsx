import { LandingHero } from "@/components/landing-hero"
import { LoadingScreen } from "@/components/loading-screen"

export default function Page() {
  return (
    <main className="min-h-screen">
      <LoadingScreen />
      <LandingHero />
    </main>
  )
}

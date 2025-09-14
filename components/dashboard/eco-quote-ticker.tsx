"use client"

import { useEffect, useState } from "react"

const ecoQuotes = [
  "🍃 The Earth does not belong to us; we belong to the Earth - Chief Seattle",
  "🌍 Every day is Earth Day - Unknown",
  "🌱 Be the change you wish to see in the world - Gandhi",
  "🌿 Nature is not a place to visit. It is home - Terry Tempest Williams",
  "🌳 The best time to plant a tree was 20 years ago. The second best time is now - Chinese Proverb",
  "💧 Water is life's matter and matrix, mother and medium - Albert Szent-Györgyi",
  "♻️ Reduce, reuse, recycle - and refuse what you don't need - Unknown",
  "🌸 In every walk with nature, one receives far more than they seek - John Muir",
]

export function EcoQuoteTicker() {
  const [currentQuote, setCurrentQuote] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % ecoQuotes.length)
    }, 8000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="bg-primary/10 py-4 overflow-hidden">
      <div className="relative">
        <div key={currentQuote} className="text-center text-foreground font-medium animate-drift">
          {ecoQuotes[currentQuote]}
        </div>
      </div>
    </div>
  )
}

"use client"

import { useEffect, useState } from "react"

interface Butterfly {
  id: number
  x: number
  y: number
  delay: number
  duration: number
}

export function ButterflyAnimation() {
  const [butterflies, setButterflyflies] = useState<Butterfly[]>([])

  useEffect(() => {
    const generateButterflies = () => {
      const newButterflies: Butterfly[] = []

      for (let i = 0; i < 5; i++) {
        newButterflies.push({
          id: i,
          x: Math.random() * 100,
          y: 20 + Math.random() * 60,
          delay: i * 3,
          duration: 8 + Math.random() * 4,
        })
      }

      setButterflyflies(newButterflies)
    }

    generateButterflies()
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {butterflies.map((butterfly) => (
        <div
          key={butterfly.id}
          className="absolute w-6 h-6 animate-drift opacity-60"
          style={{
            left: `${butterfly.x}%`,
            top: `${butterfly.y}%`,
            animationDelay: `${butterfly.delay}s`,
            animationDuration: `${butterfly.duration}s`,
          }}
        >
          <div className="relative w-full h-full">
            {/* Butterfly wings */}
            <div className="absolute inset-0">
              <div className="absolute top-0 left-0 w-3 h-4 bg-gradient-to-br from-accent to-primary rounded-full transform -rotate-12 animate-pulse" />
              <div className="absolute top-0 right-0 w-3 h-4 bg-gradient-to-bl from-accent to-primary rounded-full transform rotate-12 animate-pulse" />
              <div className="absolute bottom-0 left-0 w-2 h-3 bg-gradient-to-tr from-secondary to-accent rounded-full transform -rotate-12 animate-pulse" />
              <div className="absolute bottom-0 right-0 w-2 h-3 bg-gradient-to-tl from-secondary to-accent rounded-full transform rotate-12 animate-pulse" />
            </div>
            {/* Butterfly body */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-0.5 h-5 bg-foreground/40 rounded-full" />
          </div>
        </div>
      ))}
    </div>
  )
}

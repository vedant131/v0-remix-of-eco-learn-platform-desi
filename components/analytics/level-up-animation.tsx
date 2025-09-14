"use client"

import { useEffect, useState } from "react"

interface LevelUpAnimationProps {
  show: boolean
  newLevel: string
  onComplete: () => void
}

export function LevelUpAnimation({ show, newLevel, onComplete }: LevelUpAnimationProps) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (show) {
      setVisible(true)
      const timer = setTimeout(() => {
        setVisible(false)
        onComplete()
      }, 4000)
      return () => clearTimeout(timer)
    }
  }, [show, onComplete])

  if (!visible) return null

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50 pointer-events-none">
      {/* Eco Confetti */}
      <div className="absolute inset-0">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-fall text-2xl"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          >
            {["🌸", "🍃", "⭐", "🌱", "💧", "🌿", "✨"][Math.floor(Math.random() * 7)]}
          </div>
        ))}
      </div>

      {/* Level Up Message */}
      <div className="text-center animate-bounce-gentle">
        <div className="text-8xl mb-4">🎉</div>
        <h1 className="text-6xl font-bold text-primary mb-4 animate-pulse-glow">LEVEL UP!</h1>
        <p className="text-2xl text-foreground mb-2">Congratulations!</p>
        <p className="text-xl text-muted-foreground">
          You are now a <strong className="text-secondary">{newLevel}</strong>!
        </p>
      </div>
    </div>
  )
}

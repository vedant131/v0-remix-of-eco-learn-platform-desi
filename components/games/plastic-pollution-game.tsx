"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface PlasticItem {
  id: number
  name: string
  location: "river" | "street" | "beach"
  points: number
  emoji: string
}

const plasticItems: PlasticItem[] = [
  { id: 1, name: "Plastic Bottle", location: "river", points: 15, emoji: "🍼" },
  { id: 2, name: "Shopping Bag", location: "street", points: 10, emoji: "🛍️" },
  { id: 3, name: "Food Container", location: "beach", points: 12, emoji: "🥡" },
  { id: 4, name: "Straw", location: "river", points: 8, emoji: "🥤" },
  { id: 5, name: "Plastic Cup", location: "street", points: 10, emoji: "🥤" },
  { id: 6, name: "Bottle Cap", location: "beach", points: 5, emoji: "🔴" },
  { id: 7, name: "Plastic Wrap", location: "river", points: 12, emoji: "📦" },
  { id: 8, name: "Disposable Plate", location: "street", points: 8, emoji: "🍽️" },
]

interface PlasticPollutionGameProps {
  onComplete: (score: number) => void
  onClose: () => void
}

export function PlasticPollutionGame({ onComplete, onClose }: PlasticPollutionGameProps) {
  const [currentItem, setCurrentItem] = useState<PlasticItem | null>(null)
  const [score, setScore] = useState(0)
  const [gameItems, setGameItems] = useState<PlasticItem[]>([])
  const [feedback, setFeedback] = useState<string>("")
  const [showConfetti, setShowConfetti] = useState(false)
  const [timeLeft, setTimeLeft] = useState(60) // 60 seconds game
  const [gameActive, setGameActive] = useState(true)

  useEffect(() => {
    const shuffled = [...plasticItems].sort(() => Math.random() - 0.5)
    setGameItems(shuffled)
    setCurrentItem(shuffled[0])
  }, [])

  useEffect(() => {
    if (timeLeft > 0 && gameActive) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0) {
      setGameActive(false)
      onComplete(score)
    }
  }, [timeLeft, gameActive, score, onComplete])

  const handleCleanup = (location: "river" | "street" | "beach") => {
    if (!currentItem || !gameActive) return

    const isCorrect = currentItem.location === location

    if (isCorrect) {
      const points = currentItem.points
      setScore((prev) => prev + points)
      setFeedback(`Great! +${points} points! 🌟`)
      setShowConfetti(true)
      setTimeout(() => setShowConfetti(false), 800)
    } else {
      setFeedback("Wrong location! Try again! 💭")
    }

    setTimeout(() => {
      setFeedback("")
      if (isCorrect) {
        // Get next item
        const currentIndex = gameItems.findIndex((item) => item.id === currentItem.id)
        const nextIndex = (currentIndex + 1) % gameItems.length
        setCurrentItem(gameItems[nextIndex])
      }
    }, 1200)
  }

  if (!currentItem) return null

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-fall"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 1.5}s`,
                fontSize: "18px",
              }}
            >
              ♻️
            </div>
          ))}
        </div>
      )}

      <Card className="w-full max-w-3xl p-8 glass border-primary/20">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-foreground mb-2">Plastic Pollution Fighter</h2>
          <p className="text-muted-foreground">Clean up plastic waste from India's environment!</p>
          <div className="flex justify-center gap-6 mt-4">
            <span className="text-xl font-bold text-primary">Score: {score}</span>
            <span
              className={`text-xl font-bold ${timeLeft <= 10 ? "text-destructive animate-pulse" : "text-secondary"}`}
            >
              Time: {timeLeft}s
            </span>
          </div>
        </div>

        <div className="text-center mb-8">
          <div className="text-8xl mb-4 animate-bounce-gentle">{currentItem.emoji}</div>
          <h3 className="text-2xl font-bold text-foreground mb-2">{currentItem.name}</h3>
          <p className="text-lg text-muted-foreground mb-4">Where should you clean this up?</p>
          {feedback && <p className="text-lg font-semibold text-primary animate-pulse-glow">{feedback}</p>}
        </div>

        <div className="grid grid-cols-3 gap-4 mb-8">
          <Button
            onClick={() => handleCleanup("river")}
            className="h-24 bg-secondary/20 hover:bg-secondary/30 text-secondary border-2 border-secondary/30 rounded-xl flex flex-col items-center justify-center gap-2"
            disabled={!gameActive}
          >
            <span className="text-3xl">🏞️</span>
            <span className="font-semibold">River</span>
          </Button>

          <Button
            onClick={() => handleCleanup("street")}
            className="h-24 bg-accent/20 hover:bg-accent/30 text-accent border-2 border-accent/30 rounded-xl flex flex-col items-center justify-center gap-2"
            disabled={!gameActive}
          >
            <span className="text-3xl">🏙️</span>
            <span className="font-semibold">Street</span>
          </Button>

          <Button
            onClick={() => handleCleanup("beach")}
            className="h-24 bg-primary/20 hover:bg-primary/30 text-primary border-2 border-primary/30 rounded-xl flex flex-col items-center justify-center gap-2"
            disabled={!gameActive}
          >
            <span className="text-3xl">🏖️</span>
            <span className="font-semibold">Beach</span>
          </Button>
        </div>

        <div className="text-center">
          <Button onClick={onClose} variant="outline" className="border-border hover:bg-muted bg-transparent">
            Close Game
          </Button>
        </div>
      </Card>
    </div>
  )
}

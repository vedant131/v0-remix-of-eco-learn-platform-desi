"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface WasteItem {
  id: number
  name: string
  type: "recyclable" | "organic" | "trash"
  emoji: string
}

const wasteItems: WasteItem[] = [
  { id: 1, name: "Plastic Bottle", type: "recyclable", emoji: "🍼" },
  { id: 2, name: "Apple Core", type: "organic", emoji: "🍎" },
  { id: 3, name: "Newspaper", type: "recyclable", emoji: "📰" },
  { id: 4, name: "Banana Peel", type: "organic", emoji: "🍌" },
  { id: 5, name: "Candy Wrapper", type: "trash", emoji: "🍬" },
  { id: 6, name: "Glass Jar", type: "recyclable", emoji: "🫙" },
  { id: 7, name: "Food Scraps", type: "organic", emoji: "🥬" },
  { id: 8, name: "Broken Toy", type: "trash", emoji: "🧸" },
]

interface WasteSortingGameProps {
  onComplete: (score: number) => void
  onClose: () => void
}

export function WasteSortingGame({ onComplete, onClose }: WasteSortingGameProps) {
  const [currentItem, setCurrentItem] = useState<WasteItem | null>(null)
  const [score, setScore] = useState(0)
  const [gameItems, setGameItems] = useState<WasteItem[]>([])
  const [feedback, setFeedback] = useState<string>("")
  const [showConfetti, setShowConfetti] = useState(false)
  const [shakeItem, setShakeItem] = useState(false)

  useEffect(() => {
    // Shuffle and select 5 random items
    const shuffled = [...wasteItems].sort(() => Math.random() - 0.5).slice(0, 5)
    setGameItems(shuffled)
    setCurrentItem(shuffled[0])
  }, [])

  const handleSort = (binType: "recyclable" | "organic" | "trash") => {
    if (!currentItem) return

    const isCorrect = currentItem.type === binType

    if (isCorrect) {
      setScore((prev) => prev + 20)
      setFeedback("Great job! 🌟")
      setShowConfetti(true)
      setTimeout(() => setShowConfetti(false), 1000)
    } else {
      setFeedback("Oops! Try again! 💭")
      setShakeItem(true)
      setTimeout(() => setShakeItem(false), 500)
    }

    setTimeout(() => {
      setFeedback("")
      const currentIndex = gameItems.findIndex((item) => item.id === currentItem.id)
      if (currentIndex < gameItems.length - 1) {
        setCurrentItem(gameItems[currentIndex + 1])
      } else {
        onComplete(score + (isCorrect ? 20 : 0))
      }
    }, 1500)
  }

  if (!currentItem) return null

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-fall"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                fontSize: "20px",
              }}
            >
              🍃
            </div>
          ))}
        </div>
      )}

      <Card className="w-full max-w-2xl p-8 glass border-primary/20">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">Waste Sorting Puzzle</h2>
          <p className="text-muted-foreground">Sort the items into the correct bins!</p>
          <div className="mt-4">
            <span className="text-2xl font-bold text-primary">Score: {score}</span>
          </div>
        </div>

        <div className="text-center mb-8">
          <div className={`text-8xl mb-4 ${shakeItem ? "animate-bounce" : ""}`}>{currentItem.emoji}</div>
          <h3 className="text-2xl font-bold text-foreground mb-2">{currentItem.name}</h3>
          {feedback && <p className="text-lg font-semibold text-primary animate-bounce-gentle">{feedback}</p>}
        </div>

        <div className="grid grid-cols-3 gap-4 mb-8">
          <Button
            onClick={() => handleSort("recyclable")}
            className="h-24 bg-primary/20 hover:bg-primary/30 text-primary border-2 border-primary/30 rounded-xl flex flex-col items-center justify-center gap-2"
          >
            <span className="text-2xl">♻️</span>
            <span className="font-semibold">Recyclable</span>
          </Button>

          <Button
            onClick={() => handleSort("organic")}
            className="h-24 bg-secondary/20 hover:bg-secondary/30 text-secondary border-2 border-secondary/30 rounded-xl flex flex-col items-center justify-center gap-2"
          >
            <span className="text-2xl">🌱</span>
            <span className="font-semibold">Organic</span>
          </Button>

          <Button
            onClick={() => handleSort("trash")}
            className="h-24 bg-destructive/20 hover:bg-destructive/30 text-destructive border-2 border-destructive/30 rounded-xl flex flex-col items-center justify-center gap-2"
          >
            <span className="text-2xl">🗑️</span>
            <span className="font-semibold">Trash</span>
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

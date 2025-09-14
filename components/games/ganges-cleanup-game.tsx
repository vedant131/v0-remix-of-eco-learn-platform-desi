"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface TrashItem {
  id: number
  x: number
  y: number
  type: "plastic" | "organic" | "industrial"
  emoji: string
  points: number
}

interface GangesCleanupGameProps {
  onComplete: (score: number) => void
  onClose: () => void
}

export function GangesCleanupGame({ onComplete, onClose }: GangesCleanupGameProps) {
  const [score, setScore] = useState(0)
  const [boatPosition, setBoatPosition] = useState(50)
  const [trashItems, setTrashItems] = useState<TrashItem[]>([])
  const [gameTime, setGameTime] = useState(45)
  const [itemsCollected, setItemsCollected] = useState(0)
  const [gameMessage, setGameMessage] = useState(
    "Help clean the sacred Ganges River! Collect trash to restore its purity!",
  )

  const trashTypes = [
    { type: "plastic" as const, emoji: "🍼", points: 15 },
    { type: "plastic" as const, emoji: "🥤", points: 15 },
    { type: "organic" as const, emoji: "🍌", points: 10 },
    { type: "organic" as const, emoji: "🥬", points: 10 },
    { type: "industrial" as const, emoji: "🛢️", points: 25 },
    { type: "industrial" as const, emoji: "⚗️", points: 25 },
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setGameTime((prev) => {
        if (prev <= 1) {
          onComplete(score)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [score, onComplete])

  useEffect(() => {
    const spawnTrash = setInterval(() => {
      if (gameTime > 0) {
        const randomTrash = trashTypes[Math.floor(Math.random() * trashTypes.length)]
        const newTrash: TrashItem = {
          id: Date.now(),
          x: Math.random() * 80 + 10,
          y: 0,
          type: randomTrash.type,
          emoji: randomTrash.emoji,
          points: randomTrash.points,
        }
        setTrashItems((prev) => [...prev, newTrash])
      }
    }, 1500)

    return () => clearInterval(spawnTrash)
  }, [gameTime])

  useEffect(() => {
    const moveTrash = setInterval(() => {
      setTrashItems((prev) =>
        prev
          .map((item) => ({ ...item, y: item.y + 2 }))
          .filter((item) => {
            // Check if boat collects trash
            if (item.y > 65 && item.y < 75 && item.x > boatPosition - 8 && item.x < boatPosition + 8) {
              setScore((prevScore) => prevScore + item.points)
              setItemsCollected((prev) => prev + 1)
              setGameMessage(`Collected ${item.type} waste! +${item.points} points! 🌊`)
              return false
            }
            return item.y < 90
          }),
      )
    }, 100)

    return () => clearInterval(moveTrash)
  }, [boatPosition])

  const moveBoat = (direction: "left" | "right") => {
    setBoatPosition((prev) => {
      if (direction === "left") return Math.max(10, prev - 12)
      return Math.min(90, prev + 12)
    })
  }

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
      <Card className="w-full max-w-3xl p-8 glass border-primary/20">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-foreground mb-2">Ganges River Cleanup</h2>
          <p className="text-muted-foreground">Restore the sacred river's purity by collecting pollution!</p>
          <div className="flex justify-center gap-6 mt-4">
            <span className="text-xl font-bold text-primary">Score: {score}</span>
            <span className="text-xl font-bold text-secondary">Collected: {itemsCollected}</span>
            <span className="text-xl font-bold text-accent">Time: {gameTime}s</span>
          </div>
        </div>

        <div className="relative h-64 bg-gradient-to-b from-blue-300 via-blue-400 to-blue-500 rounded-xl mb-6 overflow-hidden">
          {/* Trash items */}
          {trashItems.map((item) => (
            <div
              key={item.id}
              className="absolute text-2xl animate-float"
              style={{ left: `${item.x}%`, top: `${item.y}%` }}
            >
              {item.emoji}
            </div>
          ))}

          {/* Boat */}
          <div
            className="absolute bottom-6 text-4xl transition-all duration-200"
            style={{ left: `${boatPosition - 4}%` }}
          >
            🚤
          </div>

          {/* River banks */}
          <div className="absolute left-0 top-0 w-2 h-full bg-green-600"></div>
          <div className="absolute right-0 top-0 w-2 h-full bg-green-600"></div>
        </div>

        <p className="text-center text-foreground mb-6 animate-pulse">{gameMessage}</p>

        <div className="flex justify-center gap-4 mb-6">
          <Button
            onClick={() => moveBoat("left")}
            className="bg-primary/20 hover:bg-primary/30 text-primary border-2 border-primary/30 rounded-xl px-8 py-3"
          >
            ← Move Left
          </Button>
          <Button
            onClick={() => moveBoat("right")}
            className="bg-primary/20 hover:bg-primary/30 text-primary border-2 border-primary/30 rounded-xl px-8 py-3"
          >
            Move Right →
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

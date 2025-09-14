"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface RainDrop {
  id: number
  x: number
  y: number
  speed: number
}

interface MonsoonHarvestingGameProps {
  onComplete: (score: number) => void
  onClose: () => void
}

export function MonsoonHarvestingGame({ onComplete, onClose }: MonsoonHarvestingGameProps) {
  const [score, setScore] = useState(0)
  const [waterCollected, setWaterCollected] = useState(0)
  const [rainDrops, setRainDrops] = useState<RainDrop[]>([])
  const [bucketPosition, setBucketPosition] = useState(50)
  const [gameTime, setGameTime] = useState(30)
  const [gameMessage, setGameMessage] = useState(
    "Collect rainwater during the monsoon! Move your bucket to catch the drops!",
  )

  useEffect(() => {
    if (gameTime <= 0) return

    const gameTimer = setInterval(() => {
      setGameTime((prev) => {
        if (prev <= 1) {
          setTimeout(() => onComplete(score), 100)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(gameTimer)
  }, [gameTime, score, onComplete])

  useEffect(() => {
    if (gameTime <= 0) return

    const rainInterval = setInterval(() => {
      const newDrop: RainDrop = {
        id: Date.now() + Math.random(),
        x: Math.random() * 80 + 10,
        y: 0,
        speed: Math.random() * 3 + 2,
      }
      setRainDrops((prev) => [...prev, newDrop])
    }, 500)

    return () => clearInterval(rainInterval)
  }, [gameTime])

  useEffect(() => {
    if (gameTime <= 0) return

    const moveRain = setInterval(() => {
      setRainDrops((prev) =>
        prev
          .map((drop) => ({ ...drop, y: drop.y + drop.speed }))
          .filter((drop) => {
            // Check if drop hits bucket
            if (drop.y > 70 && drop.y < 80 && drop.x > bucketPosition - 10 && drop.x < bucketPosition + 10) {
              setWaterCollected((prev) => prev + 10)
              setScore((prev) => prev + 15)
              setGameMessage("Great catch! 💧")
              return false
            }
            return drop.y < 90
          }),
      )
    }, 100)

    return () => clearInterval(moveRain)
  }, [bucketPosition, gameTime])

  const moveBucket = (direction: "left" | "right") => {
    setBucketPosition((prev) => {
      if (direction === "left") return Math.max(15, prev - 10)
      return Math.min(85, prev + 10)
    })
  }

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
      <Card className="w-full max-w-3xl p-8 glass border-primary/20">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-foreground mb-2">Monsoon Water Harvesting</h2>
          <p className="text-muted-foreground">Collect rainwater to help your community during dry season!</p>
          <div className="flex justify-center gap-6 mt-4">
            <span className="text-xl font-bold text-primary">Score: {score}</span>
            <span className="text-xl font-bold text-secondary">Water: {waterCollected}L</span>
            <span className="text-xl font-bold text-accent">Time: {gameTime}s</span>
          </div>
        </div>

        <div className="relative h-64 bg-gradient-to-b from-blue-200 to-green-200 rounded-xl mb-6 overflow-hidden">
          {/* Rain drops */}
          {rainDrops.map((drop) => (
            <div
              key={drop.id}
              className="absolute text-blue-500 text-xl animate-pulse"
              style={{ left: `${drop.x}%`, top: `${drop.y}%` }}
            >
              💧
            </div>
          ))}

          {/* Bucket */}
          <div
            className="absolute bottom-4 text-4xl transition-all duration-200"
            style={{ left: `${bucketPosition - 5}%` }}
          >
            🪣
          </div>

          {/* Ground */}
          <div className="absolute bottom-0 w-full h-8 bg-green-400 rounded-b-xl"></div>
        </div>

        <p className="text-center text-foreground mb-6 animate-pulse">{gameMessage}</p>

        <div className="flex justify-center gap-4 mb-6">
          <Button
            onClick={() => moveBucket("left")}
            disabled={gameTime <= 0}
            className="bg-primary/20 hover:bg-primary/30 text-primary border-2 border-primary/30 rounded-xl px-8 py-3 disabled:opacity-50"
          >
            ← Move Left
          </Button>
          <Button
            onClick={() => moveBucket("right")}
            disabled={gameTime <= 0}
            className="bg-primary/20 hover:bg-primary/30 text-primary border-2 border-primary/30 rounded-xl px-8 py-3 disabled:opacity-50"
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

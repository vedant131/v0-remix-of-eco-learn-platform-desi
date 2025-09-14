"use client"

import { useState, useEffect, useCallback } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

interface OceanCleanupGameProps {
  onComplete: (score: number) => void
  onClose: () => void
}

interface TrashItem {
  id: number
  x: number
  y: number
  type: "plastic" | "oil" | "debris"
  collected: boolean
}

export function OceanCleanupGame({ onComplete, onClose }: OceanCleanupGameProps) {
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(60)
  const [gameStarted, setGameStarted] = useState(false)
  const [trashItems, setTrashItems] = useState<TrashItem[]>([])
  const [playerX, setPlayerX] = useState(50)

  const generateTrash = useCallback(() => {
    const newTrash: TrashItem = {
      id: Date.now() + Math.random(),
      x: Math.random() * 80 + 10,
      y: 10,
      type: ["plastic", "oil", "debris"][Math.floor(Math.random() * 3)] as "plastic" | "oil" | "debris",
      collected: false,
    }
    setTrashItems((prev) => [...prev, newTrash])
  }, [])

  const moveTrash = useCallback(() => {
    setTrashItems((prev) =>
      prev
        .map((item) => ({
          ...item,
          y: item.y + 2,
        }))
        .filter((item) => item.y < 90 && !item.collected),
    )
  }, [])

  const collectTrash = useCallback((trashId: number) => {
    setTrashItems((prev) => prev.map((item) => (item.id === trashId ? { ...item, collected: true } : item)))
    setScore((prev) => prev + 10)
  }, [])

  const checkCollisions = useCallback(() => {
    trashItems.forEach((item) => {
      if (!item.collected && Math.abs(item.x - playerX) < 8 && item.y > 70 && item.y < 85) {
        collectTrash(item.id)
      }
    })
  }, [trashItems, playerX, collectTrash])

  useEffect(() => {
    if (!gameStarted) return

    const gameInterval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          onComplete(score)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    const trashInterval = setInterval(generateTrash, 1500)
    const moveInterval = setInterval(moveTrash, 100)
    const collisionInterval = setInterval(checkCollisions, 50)

    return () => {
      clearInterval(gameInterval)
      clearInterval(trashInterval)
      clearInterval(moveInterval)
      clearInterval(collisionInterval)
    }
  }, [gameStarted, generateTrash, moveTrash, checkCollisions, score, onComplete])

  const handleKeyPress = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" && playerX > 10) {
        setPlayerX((prev) => prev - 5)
      } else if (e.key === "ArrowRight" && playerX < 90) {
        setPlayerX((prev) => prev + 5)
      }
    },
    [playerX],
  )

  useEffect(() => {
    if (gameStarted) {
      window.addEventListener("keydown", handleKeyPress)
      return () => window.removeEventListener("keydown", handleKeyPress)
    }
  }, [gameStarted, handleKeyPress])

  const trashEmojis = {
    plastic: "🥤",
    oil: "🛢️",
    debris: "🗑️",
  }

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
      <Card className="w-full max-w-2xl p-6 glass border-primary/20">
        <div className="text-center mb-4">
          <h2 className="text-2xl font-bold text-foreground mb-2">🌊 Ocean Cleanup</h2>
          <p className="text-muted-foreground">Use arrow keys to move your boat and collect ocean trash!</p>
        </div>

        {!gameStarted ? (
          <div className="text-center">
            <div className="text-6xl mb-4">🚤</div>
            <p className="text-muted-foreground mb-6">Clean up the ocean by collecting floating trash!</p>
            <Button
              onClick={() => setGameStarted(true)}
              className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl px-8 py-3 font-semibold"
            >
              Start Cleanup!
            </Button>
          </div>
        ) : (
          <div>
            <div className="flex justify-between items-center mb-4">
              <div className="text-primary font-bold">Score: {score}</div>
              <div className="text-accent font-bold">Time: {timeLeft}s</div>
            </div>

            <Progress value={((60 - timeLeft) / 60) * 100} className="mb-4" />

            <div className="relative bg-gradient-to-b from-blue-200 to-blue-400 h-80 rounded-lg overflow-hidden">
              {/* Ocean waves background */}
              <div className="absolute inset-0 bg-gradient-to-b from-blue-300/50 to-blue-500/50"></div>

              {/* Player boat */}
              <div
                className="absolute bottom-4 text-2xl transition-all duration-100"
                style={{ left: `${playerX}%`, transform: "translateX(-50%)" }}
              >
                🚤
              </div>

              {/* Trash items */}
              {trashItems.map(
                (item) =>
                  !item.collected && (
                    <div
                      key={item.id}
                      className="absolute text-xl transition-all duration-100"
                      style={{
                        left: `${item.x}%`,
                        top: `${item.y}%`,
                        transform: "translateX(-50%)",
                      }}
                    >
                      {trashEmojis[item.type]}
                    </div>
                  ),
              )}
            </div>

            <div className="text-center mt-4 text-sm text-muted-foreground">Use ← → arrow keys to move your boat</div>
          </div>
        )}

        <div className="flex justify-center gap-4 mt-6">
          <Button
            onClick={onClose}
            variant="outline"
            className="border-border text-foreground hover:bg-muted bg-transparent"
          >
            Close
          </Button>
        </div>
      </Card>
    </div>
  )
}

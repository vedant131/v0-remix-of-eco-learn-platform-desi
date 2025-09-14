"use client"

import { useState, useEffect, useCallback } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface EcoRunnerGameProps {
  onComplete: (score: number) => void
  onClose: () => void
}

export function EcoRunnerGame({ onComplete, onClose }: EcoRunnerGameProps) {
  const [score, setScore] = useState(0)
  const [playerPosition, setPlayerPosition] = useState(50)
  const [obstacles, setObstacles] = useState<Array<{ id: number; position: number; type: "tree" | "trash" }>>([])
  const [gameRunning, setGameRunning] = useState(false)
  const [gameMessage, setGameMessage] = useState("Press Start to begin your eco-run!")

  const startGame = () => {
    setGameRunning(true)
    setScore(0)
    setObstacles([])
    setGameMessage("Collect trees and avoid trash!")
  }

  const movePlayer = useCallback(
    (direction: "left" | "right") => {
      if (!gameRunning) return

      setPlayerPosition((prev) => {
        if (direction === "left") return Math.max(10, prev - 15)
        return Math.min(90, prev + 15)
      })
    },
    [gameRunning],
  )

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") movePlayer("left")
      if (e.key === "ArrowRight") movePlayer("right")
    }

    window.addEventListener("keydown", handleKeyPress)
    return () => window.removeEventListener("keydown", handleKeyPress)
  }, [movePlayer])

  useEffect(() => {
    if (!gameRunning) return

    const gameInterval = setInterval(() => {
      // Add new obstacles
      if (Math.random() < 0.3) {
        const newObstacle = {
          id: Date.now(),
          position: Math.random() * 80 + 10,
          type: Math.random() < 0.6 ? "tree" : ("trash" as "tree" | "trash"),
        }
        setObstacles((prev) => [...prev, newObstacle])
      }

      // Move obstacles and check collisions
      setObstacles((prev) => {
        const updated = prev.map((obstacle) => ({ ...obstacle, position: obstacle.position }))

        // Check collisions with current player position
        const collisions = updated.filter((obstacle) => {
          const distance = Math.abs(obstacle.position - playerPosition)
          return distance < 10
        })

        // Process collisions
        collisions.forEach((obstacle) => {
          if (obstacle.type === "tree") {
            setScore((s) => s + 10)
            setGameMessage("Great! You collected a tree! 🌳")
          } else {
            setScore((s) => Math.max(0, s - 5))
            setGameMessage("Oops! Avoid the trash! 🗑️")
          }
        })

        // Remove collided obstacles and off-screen obstacles
        return updated.filter((obstacle) => {
          const distance = Math.abs(obstacle.position - playerPosition)
          return distance >= 10 && obstacle.position > -10
        })
      })
    }, 1000)

    // End game after 30 seconds
    const gameTimer = setTimeout(() => {
      setGameRunning(false)
      setGameMessage(`Game Over! Final Score: ${score}`)
      setTimeout(() => onComplete(score), 2000)
    }, 30000)

    return () => {
      clearInterval(gameInterval)
      clearTimeout(gameTimer)
    }
  }, [gameRunning, playerPosition, score, onComplete])

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
      <Card className="w-full max-w-3xl p-8 glass border-accent/20">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-foreground mb-2">Eco Runner</h2>
          <p className="text-muted-foreground">Run and collect trees while avoiding trash!</p>
          <div className="mt-4">
            <span className="text-2xl font-bold text-accent">Score: {score}</span>
          </div>
        </div>

        <div className="relative h-64 bg-gradient-to-b from-primary/10 to-secondary/10 rounded-xl mb-6 overflow-hidden">
          {/* Player */}
          <div
            className="absolute bottom-4 w-8 h-8 transition-all duration-200 flex items-center justify-center"
            style={{ left: `${playerPosition}%` }}
          >
            <span className="text-2xl animate-bounce">🏃‍♂️</span>
          </div>

          {/* Obstacles */}
          {obstacles.map((obstacle) => (
            <div
              key={obstacle.id}
              className="absolute top-4 w-6 h-6 flex items-center justify-center animate-bounce"
              style={{ left: `${obstacle.position}%` }}
            >
              <span className="text-xl">{obstacle.type === "tree" ? "🌳" : "🗑️"}</span>
            </div>
          ))}

          {/* Ground */}
          <div className="absolute bottom-0 left-0 right-0 h-2 bg-secondary/30" />
        </div>

        <div className="text-center mb-6">
          <p className="text-lg font-semibold text-foreground animate-pulse">{gameMessage}</p>
        </div>

        <div className="flex justify-center gap-4 mb-6">
          {!gameRunning && (
            <Button
              onClick={startGame}
              className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-xl px-8 py-3 font-semibold"
            >
              Start Game
            </Button>
          )}

          {gameRunning && (
            <>
              <Button
                onClick={() => movePlayer("left")}
                className="bg-primary/20 hover:bg-primary/30 text-primary border-2 border-primary/30 rounded-xl"
              >
                ← Left
              </Button>
              <Button
                onClick={() => movePlayer("right")}
                className="bg-primary/20 hover:bg-primary/30 text-primary border-2 border-primary/30 rounded-xl"
              >
                Right →
              </Button>
            </>
          )}
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

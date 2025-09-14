"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

interface SolarPanelGameProps {
  onComplete: (score: number) => void
  onClose: () => void
}

interface Panel {
  id: number
  angle: number
  efficiency: number
  position: { x: number; y: number }
}

export function SolarPanelGame({ onComplete, onClose }: SolarPanelGameProps) {
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(90)
  const [gameStarted, setGameStarted] = useState(false)
  const [panels, setPanels] = useState<Panel[]>([])
  const [sunPosition, setSunPosition] = useState(0)
  const [energyGenerated, setEnergyGenerated] = useState(0)

  useEffect(() => {
    // Initialize panels
    const initialPanels: Panel[] = Array.from({ length: 6 }, (_, i) => ({
      id: i,
      angle: 45,
      efficiency: 0,
      position: { x: (i % 3) * 120 + 60, y: Math.floor(i / 3) * 100 + 80 },
    }))
    setPanels(initialPanels)
  }, [])

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

    const sunInterval = setInterval(() => {
      setSunPosition((prev) => (prev + 2) % 360)
    }, 200)

    return () => {
      clearInterval(gameInterval)
      clearInterval(sunInterval)
    }
  }, [gameStarted, score, onComplete])

  useEffect(() => {
    // Calculate panel efficiency based on sun position
    const updatedPanels = panels.map((panel) => {
      const optimalAngle = (sunPosition + 90) % 180
      const angleDiff = Math.abs(panel.angle - optimalAngle)
      const efficiency = Math.max(0, 100 - angleDiff * 2)
      return { ...panel, efficiency }
    })
    setPanels(updatedPanels)

    // Calculate energy and score
    const totalEfficiency = updatedPanels.reduce((sum, panel) => sum + panel.efficiency, 0)
    const energy = Math.floor(totalEfficiency / 6)
    setEnergyGenerated(energy)
    setScore((prev) => prev + Math.floor(energy / 10))
  }, [sunPosition, panels])

  const adjustPanelAngle = (panelId: number, direction: "up" | "down") => {
    setPanels((prev) =>
      prev.map((panel) =>
        panel.id === panelId
          ? {
              ...panel,
              angle: Math.max(0, Math.min(180, panel.angle + (direction === "up" ? -10 : 10))),
            }
          : panel,
      ),
    )
  }

  const getSunX = () => {
    return 50 + Math.cos((sunPosition * Math.PI) / 180) * 40
  }

  const getSunY = () => {
    return 30 + Math.sin((sunPosition * Math.PI) / 180) * 20
  }

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
      <Card className="w-full max-w-4xl p-6 glass border-primary/20">
        <div className="text-center mb-4">
          <h2 className="text-2xl font-bold text-foreground mb-2">☀️ Solar Panel Optimizer</h2>
          <p className="text-muted-foreground">Adjust panel angles to maximize solar energy collection!</p>
        </div>

        {!gameStarted ? (
          <div className="text-center">
            <div className="text-6xl mb-4">🔆</div>
            <p className="text-muted-foreground mb-6">Optimize solar panel angles as the sun moves across the sky!</p>
            <Button
              onClick={() => setGameStarted(true)}
              className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl px-8 py-3 font-semibold"
            >
              Start Optimizing!
            </Button>
          </div>
        ) : (
          <div>
            <div className="flex justify-between items-center mb-4">
              <div className="text-primary font-bold">Score: {score}</div>
              <div className="text-secondary font-bold">Energy: {energyGenerated}%</div>
              <div className="text-accent font-bold">Time: {timeLeft}s</div>
            </div>

            <Progress value={((90 - timeLeft) / 90) * 100} className="mb-4" />

            <div className="relative bg-gradient-to-b from-sky-200 to-green-200 h-96 rounded-lg overflow-hidden">
              {/* Sun */}
              <div
                className="absolute text-4xl transition-all duration-200"
                style={{
                  left: `${getSunX()}%`,
                  top: `${getSunY()}%`,
                  transform: "translate(-50%, -50%)",
                }}
              >
                ☀️
              </div>

              {/* Solar panels */}
              {panels.map((panel) => (
                <div
                  key={panel.id}
                  className="absolute"
                  style={{
                    left: panel.position.x,
                    top: panel.position.y,
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <div className="text-center">
                    <div
                      className="w-16 h-8 bg-blue-600 border-2 border-blue-800 rounded transition-all duration-200"
                      style={{
                        transform: `rotate(${panel.angle - 90}deg)`,
                        backgroundColor: `hsl(${panel.efficiency * 1.2}, 70%, 50%)`,
                      }}
                    />
                    <div className="mt-2 text-xs">
                      <div className="text-foreground font-bold">{Math.floor(panel.efficiency)}%</div>
                      <div className="flex gap-1 justify-center mt-1">
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-6 w-6 p-0 text-xs bg-transparent"
                          onClick={() => adjustPanelAngle(panel.id, "up")}
                        >
                          ↑
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-6 w-6 p-0 text-xs bg-transparent"
                          onClick={() => adjustPanelAngle(panel.id, "down")}
                        >
                          ↓
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-4 text-sm text-muted-foreground">
              Click ↑↓ buttons to adjust panel angles and maximize efficiency
            </div>
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

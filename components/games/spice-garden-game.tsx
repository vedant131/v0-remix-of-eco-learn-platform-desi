"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface Plant {
  id: number
  name: string
  emoji: string
  growthStage: number
  waterLevel: number
  sunLevel: number
  maxStage: number
}

interface SpiceGardenGameProps {
  onComplete: (score: number) => void
  onClose: () => void
}

export function SpiceGardenGame({ onComplete, onClose }: SpiceGardenGameProps) {
  const [score, setScore] = useState(0)
  const [plants, setPlants] = useState<Plant[]>([
    { id: 1, name: "Turmeric", emoji: "🌿", growthStage: 0, waterLevel: 50, sunLevel: 50, maxStage: 3 },
    { id: 2, name: "Cardamom", emoji: "🌱", growthStage: 0, waterLevel: 50, sunLevel: 50, maxStage: 3 },
    { id: 3, name: "Black Pepper", emoji: "🌿", growthStage: 0, waterLevel: 50, sunLevel: 50, maxStage: 3 },
    { id: 4, name: "Coriander", emoji: "🌱", growthStage: 0, waterLevel: 50, sunLevel: 50, maxStage: 3 },
  ])
  const [selectedPlant, setSelectedPlant] = useState<number | null>(null)
  const [gameMessage, setGameMessage] = useState(
    "Welcome to your spice garden! Take care of traditional Indian spices!",
  )
  const [gameTime, setGameTime] = useState(60)

  const plantStages = ["🌱", "🌿", "🌾", "🌶️"]

  useEffect(() => {
    const timer = setInterval(() => {
      setGameTime((prev) => {
        if (prev <= 1) {
          const finalScore = plants.reduce((total, plant) => total + plant.growthStage * 25, score)
          onComplete(finalScore)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [plants, score, onComplete])

  useEffect(() => {
    const growthInterval = setInterval(() => {
      setPlants((prev) =>
        prev.map((plant) => {
          const newPlant = { ...plant }

          // Decrease levels over time
          newPlant.waterLevel = Math.max(0, plant.waterLevel - 3)
          newPlant.sunLevel = Math.max(0, plant.sunLevel - 2)

          // Check if plant can grow
          if (plant.waterLevel > 40 && plant.sunLevel > 40 && plant.growthStage < plant.maxStage) {
            newPlant.growthStage = plant.growthStage + 1
            setScore((prev) => prev + 20)
            setGameMessage(`Your ${plant.name} is growing beautifully! 🌟`)
          } else if (plant.waterLevel < 20 || plant.sunLevel < 20) {
            setGameMessage(`Your ${plant.name} needs attention! 💧☀️`)
          }

          return newPlant
        }),
      )
    }, 3000)

    return () => clearInterval(growthInterval)
  }, [])

  const waterPlant = (plantId: number) => {
    setPlants((prev) =>
      prev.map((plant) =>
        plant.id === plantId ? { ...plant, waterLevel: Math.min(100, plant.waterLevel + 25) } : plant,
      ),
    )
    setScore((prev) => prev + 5)
  }

  const giveSunlight = (plantId: number) => {
    setPlants((prev) =>
      prev.map((plant) => (plant.id === plantId ? { ...plant, sunLevel: Math.min(100, plant.sunLevel + 20) } : plant)),
    )
    setScore((prev) => prev + 5)
  }

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
      <Card className="w-full max-w-4xl p-8 glass border-secondary/20">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-foreground mb-2">Spice Garden Manager</h2>
          <p className="text-muted-foreground">Grow traditional Indian spices sustainably!</p>
          <div className="flex justify-center gap-6 mt-4">
            <span className="text-xl font-bold text-secondary">Score: {score}</span>
            <span className="text-xl font-bold text-accent">Time: {gameTime}s</span>
          </div>
        </div>

        <p className="text-center text-foreground mb-6 animate-pulse">{gameMessage}</p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {plants.map((plant) => (
            <Card key={plant.id} className="p-4 glass border-secondary/20 text-center">
              <div className="text-4xl mb-2 animate-bounce-gentle">{plantStages[plant.growthStage]}</div>
              <h3 className="font-semibold text-foreground mb-2">{plant.name}</h3>

              <div className="space-y-2 mb-3">
                <div>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span>💧 Water</span>
                    <span>{plant.waterLevel}%</span>
                  </div>
                  <div className="w-full bg-border rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full transition-all duration-500"
                      style={{ width: `${plant.waterLevel}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span>☀️ Sun</span>
                    <span>{plant.sunLevel}%</span>
                  </div>
                  <div className="w-full bg-border rounded-full h-2">
                    <div
                      className="bg-accent h-2 rounded-full transition-all duration-500"
                      style={{ width: `${plant.sunLevel}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-1">
                <Button
                  onClick={() => waterPlant(plant.id)}
                  size="sm"
                  className="flex-1 bg-primary/20 hover:bg-primary/30 text-primary text-xs"
                >
                  💧
                </Button>
                <Button
                  onClick={() => giveSunlight(plant.id)}
                  size="sm"
                  className="flex-1 bg-accent/20 hover:bg-accent/30 text-accent text-xs"
                >
                  ☀️
                </Button>
              </div>
            </Card>
          ))}
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

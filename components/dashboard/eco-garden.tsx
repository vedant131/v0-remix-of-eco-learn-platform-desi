"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface Plant {
  id: number
  type: "sapling" | "flower" | "tree" | "bush"
  growth: number
  x: number
  y: number
  points: number
}

interface EcoGardenProps {
  userPoints: number
  streakDays: number
}

export function EcoGarden({ userPoints, streakDays }: EcoGardenProps) {
  const [plants, setPlants] = useState<Plant[]>([])
  const [selectedPlant, setSelectedPlant] = useState<Plant | null>(null)

  useEffect(() => {
    // Generate plants based on user progress
    const generatePlants = () => {
      const newPlants: Plant[] = []
      const plantCount = Math.min(Math.floor(userPoints / 200), 12)

      for (let i = 0; i < plantCount; i++) {
        const baseGrowth = Math.min(((userPoints - i * 200) / 200) * 100, 100)
        const streakBonus = Math.min(streakDays * 2, 20)

        newPlants.push({
          id: i,
          type: i % 4 === 0 ? "tree" : i % 3 === 0 ? "bush" : i % 2 === 0 ? "flower" : "sapling",
          growth: Math.min(baseGrowth + streakBonus, 100),
          x: 10 + (i % 4) * 20 + Math.random() * 10,
          y: 20 + Math.floor(i / 4) * 25 + Math.random() * 10,
          points: (i + 1) * 200,
        })
      }

      setPlants(newPlants)
    }

    generatePlants()
  }, [userPoints, streakDays])

  const getPlantEmoji = (plant: Plant) => {
    const { type, growth } = plant
    if (growth < 30) return type === "tree" ? "🌱" : type === "flower" ? "🌱" : "🌱"
    if (growth < 70) return type === "tree" ? "🌿" : type === "flower" ? "🌸" : type === "bush" ? "🌿" : "🌱"
    return type === "tree" ? "🌳" : type === "flower" ? "🌺" : type === "bush" ? "🌲" : "🌿"
  }

  const getPlantSize = (growth: number) => {
    if (growth < 30) return "text-lg"
    if (growth < 70) return "text-xl"
    return "text-2xl"
  }

  return (
    <Card className="p-6 glass border-primary/20 relative overflow-hidden">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-foreground">🌱 Your Eco Garden</h3>
        <div className="text-sm text-muted-foreground">{plants.length} plants growing</div>
      </div>

      {/* Garden visualization */}
      <div className="relative h-64 bg-gradient-to-b from-sky-100/20 to-green-100/20 rounded-lg border border-primary/10 overflow-hidden">
        {/* Sky background */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50/30 to-transparent" />

        {/* Ground */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-green-200/40 to-transparent" />

        {/* Plants */}
        {plants.map((plant) => (
          <div
            key={plant.id}
            className={`absolute cursor-pointer hover:scale-110 transition-transform duration-200 ${getPlantSize(plant.growth)}`}
            style={{
              left: `${plant.x}%`,
              bottom: `${plant.y}%`,
            }}
            onClick={() => setSelectedPlant(plant)}
          >
            <div className="animate-sway">{getPlantEmoji(plant)}</div>
            {/* Growth indicator */}
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
              <div className="w-6 h-1 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-green-400 transition-all duration-1000"
                  style={{ width: `${plant.growth}%` }}
                />
              </div>
            </div>
          </div>
        ))}

        {/* Decorative elements */}
        <div className="absolute top-4 right-4 text-yellow-400 animate-pulse">☀️</div>
        <div className="absolute top-8 left-6 text-white animate-drift">☁️</div>
        <div className="absolute top-12 right-12 text-blue-300 animate-float">🦋</div>
      </div>

      {/* Garden stats */}
      <div className="mt-4 grid grid-cols-3 gap-4 text-center">
        <div>
          <div className="text-lg font-bold text-primary">{plants.length}</div>
          <div className="text-xs text-muted-foreground">Plants</div>
        </div>
        <div>
          <div className="text-lg font-bold text-secondary">
            {Math.round(plants.reduce((acc, plant) => acc + plant.growth, 0) / plants.length) || 0}%
          </div>
          <div className="text-xs text-muted-foreground">Avg Growth</div>
        </div>
        <div>
          <div className="text-lg font-bold text-accent">{streakDays}</div>
          <div className="text-xs text-muted-foreground">Day Streak</div>
        </div>
      </div>

      {/* Plant details modal */}
      {selectedPlant && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center p-4">
          <Card className="p-4 bg-background border-primary/20 max-w-xs">
            <div className="text-center">
              <div className="text-3xl mb-2">{getPlantEmoji(selectedPlant)}</div>
              <h4 className="font-bold text-foreground mb-2">
                {selectedPlant.type.charAt(0).toUpperCase() + selectedPlant.type.slice(1)}
              </h4>
              <div className="space-y-2 text-sm">
                <div>Growth: {selectedPlant.growth}%</div>
                <div>Unlocked at: {selectedPlant.points} points</div>
              </div>
              <Button size="sm" className="mt-3" onClick={() => setSelectedPlant(null)}>
                Close
              </Button>
            </div>
          </Card>
        </div>
      )}
    </Card>
  )
}

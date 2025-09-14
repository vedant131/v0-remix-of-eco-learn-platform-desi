"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

interface WildlifeHabitatGameProps {
  onComplete: (score: number) => void
  onClose: () => void
}

interface Animal {
  id: number
  type: string
  emoji: string
  habitat: string
  x: number
  y: number
  happy: boolean
}

interface HabitatTile {
  id: number
  type: "forest" | "water" | "grassland" | "mountain" | "empty"
  emoji: string
  x: number
  y: number
}

const animalTypes = [
  { type: "bear", emoji: "🐻", habitat: "forest" },
  { type: "fish", emoji: "🐟", habitat: "water" },
  { type: "rabbit", emoji: "🐰", habitat: "grassland" },
  { type: "eagle", emoji: "🦅", habitat: "mountain" },
  { type: "deer", emoji: "🦌", habitat: "forest" },
  { type: "frog", emoji: "🐸", habitat: "water" },
  { type: "butterfly", emoji: "🦋", habitat: "grassland" },
  { type: "goat", emoji: "🐐", habitat: "mountain" },
]

const habitatTypes = [
  { type: "forest", emoji: "🌲" },
  { type: "water", emoji: "🌊" },
  { type: "grassland", emoji: "🌾" },
  { type: "mountain", emoji: "⛰️" },
]

export function WildlifeHabitatGame({ onComplete, onClose }: WildlifeHabitatGameProps) {
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(120)
  const [gameStarted, setGameStarted] = useState(false)
  const [animals, setAnimals] = useState<Animal[]>([])
  const [habitats, setHabitats] = useState<HabitatTile[]>([])
  const [selectedHabitat, setSelectedHabitat] = useState<string | null>(null)
  const [happyAnimals, setHappyAnimals] = useState(0)

  useEffect(() => {
    // Initialize grid
    const initialHabitats: HabitatTile[] = []
    for (let i = 0; i < 36; i++) {
      initialHabitats.push({
        id: i,
        type: "empty",
        emoji: "⬜",
        x: i % 6,
        y: Math.floor(i / 6),
      })
    }
    setHabitats(initialHabitats)

    // Initialize animals
    const initialAnimals: Animal[] = animalTypes.map((animal, index) => ({
      id: index,
      type: animal.type,
      emoji: animal.emoji,
      habitat: animal.habitat,
      x: Math.floor(Math.random() * 6),
      y: Math.floor(Math.random() * 6),
      happy: false,
    }))
    setAnimals(initialAnimals)
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

    return () => clearInterval(gameInterval)
  }, [gameStarted, score, onComplete])

  useEffect(() => {
    // Check animal happiness based on current habitats
    setAnimals((currentAnimals) => {
      const updatedAnimals = currentAnimals.map((animal) => {
        const habitat = habitats.find((h) => h.x === animal.x && h.y === animal.y)
        const happy = habitat?.type === animal.habitat
        return { ...animal, happy }
      })

      const happyCount = updatedAnimals.filter((a) => a.happy).length
      setHappyAnimals(happyCount)
      setScore(happyCount * 10)

      return updatedAnimals
    })
  }, [habitats]) // Only depend on habitats, not animals

  const placeHabitat = (x: number, y: number) => {
    if (!selectedHabitat) return

    setHabitats((prev) =>
      prev.map((habitat) =>
        habitat.x === x && habitat.y === y
          ? {
              ...habitat,
              type: selectedHabitat as any,
              emoji: habitatTypes.find((h) => h.type === selectedHabitat)?.emoji || "⬜",
            }
          : habitat,
      ),
    )
  }

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
      <Card className="w-full max-w-4xl p-6 glass border-primary/20">
        <div className="text-center mb-4">
          <h2 className="text-2xl font-bold text-foreground mb-2">🦋 Wildlife Habitat Builder</h2>
          <p className="text-muted-foreground">Create the perfect habitats for different animals!</p>
        </div>

        {!gameStarted ? (
          <div className="text-center">
            <div className="text-6xl mb-4">🏞️</div>
            <p className="text-muted-foreground mb-6">
              Build habitats to make animals happy in their natural environment!
            </p>
            <Button
              onClick={() => setGameStarted(true)}
              className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl px-8 py-3 font-semibold"
            >
              Start Building!
            </Button>
          </div>
        ) : (
          <div>
            <div className="flex justify-between items-center mb-4">
              <div className="text-primary font-bold">Score: {score}</div>
              <div className="text-secondary font-bold">Happy Animals: {happyAnimals}/8</div>
              <div className="text-accent font-bold">Time: {timeLeft}s</div>
            </div>

            <Progress value={((120 - timeLeft) / 120) * 100} className="mb-4" />

            {/* Habitat selector */}
            <div className="flex justify-center gap-2 mb-4">
              {habitatTypes.map((habitat) => (
                <Button
                  key={habitat.type}
                  onClick={() => setSelectedHabitat(habitat.type)}
                  variant={selectedHabitat === habitat.type ? "default" : "outline"}
                  className="text-2xl p-3"
                >
                  {habitat.emoji}
                </Button>
              ))}
              <Button
                onClick={() => setSelectedHabitat("empty")}
                variant={selectedHabitat === "empty" ? "default" : "outline"}
                className="text-2xl p-3"
              >
                🗑️
              </Button>
            </div>

            {/* Game grid */}
            <div className="grid grid-cols-6 gap-1 mb-4 max-w-md mx-auto">
              {habitats.map((habitat) => {
                const animal = animals.find((a) => a.x === habitat.x && a.y === habitat.y)
                return (
                  <div
                    key={habitat.id}
                    onClick={() => placeHabitat(habitat.x, habitat.y)}
                    className="w-12 h-12 border border-border rounded cursor-pointer hover:bg-muted/50 flex items-center justify-center relative"
                  >
                    <div className="text-lg">{habitat.emoji}</div>
                    {animal && (
                      <div
                        className={`absolute top-0 right-0 text-sm ${animal.happy ? "animate-bounce" : "opacity-50"}`}
                      >
                        {animal.emoji}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>

            {/* Animal guide */}
            <div className="grid grid-cols-4 gap-2 text-center text-sm">
              {animalTypes.map((animal) => (
                <div key={animal.type} className="p-2 bg-muted/30 rounded">
                  <div className="text-lg">{animal.emoji}</div>
                  <div className="text-xs text-muted-foreground">
                    {habitatTypes.find((h) => h.type === animal.habitat)?.emoji}
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-4 text-sm text-muted-foreground">
              Select a habitat type and click on the grid to place it
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

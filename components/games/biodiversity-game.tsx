"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface Animal {
  id: number
  name: string
  habitat: "forest" | "grassland" | "wetland" | "mountain"
  status: "safe" | "threatened" | "endangered"
  emoji: string
  fact: string
}

const indianAnimals: Animal[] = [
  {
    id: 1,
    name: "Bengal Tiger",
    habitat: "forest",
    status: "endangered",
    emoji: "🐅",
    fact: "India has 70% of world's tigers",
  },
  {
    id: 2,
    name: "Indian Elephant",
    habitat: "forest",
    status: "threatened",
    emoji: "🐘",
    fact: "Keystone species of Indian forests",
  },
  {
    id: 3,
    name: "One-horned Rhinoceros",
    habitat: "grassland",
    status: "threatened",
    emoji: "🦏",
    fact: "Found mainly in Assam",
  },
  {
    id: 4,
    name: "Snow Leopard",
    habitat: "mountain",
    status: "endangered",
    emoji: "🐆",
    fact: "Lives in Himalayan regions",
  },
  { id: 5, name: "Indian Peacock", habitat: "forest", status: "safe", emoji: "🦚", fact: "National bird of India" },
  {
    id: 6,
    name: "Gharial Crocodile",
    habitat: "wetland",
    status: "endangered",
    emoji: "🐊",
    fact: "Found in Ganges river system",
  },
  {
    id: 7,
    name: "Asiatic Lion",
    habitat: "grassland",
    status: "endangered",
    emoji: "🦁",
    fact: "Only found in Gir Forest, Gujarat",
  },
  {
    id: 8,
    name: "Red Panda",
    habitat: "mountain",
    status: "endangered",
    emoji: "🐼",
    fact: "Lives in Eastern Himalayas",
  },
]

interface BiodiversityGameProps {
  onComplete: (score: number) => void
  onClose: () => void
}

export function BiodiversityGame({ onComplete, onClose }: BiodiversityGameProps) {
  const [currentAnimal, setCurrentAnimal] = useState<Animal | null>(null)
  const [score, setScore] = useState(0)
  const [gameAnimals, setGameAnimals] = useState<Animal[]>([])
  const [feedback, setFeedback] = useState<string>("")
  const [showConfetti, setShowConfetti] = useState(false)
  const [currentRound, setCurrentRound] = useState(0)
  const [showFact, setShowFact] = useState(false)

  useEffect(() => {
    const shuffled = [...indianAnimals].sort(() => Math.random() - 0.5).slice(0, 6)
    setGameAnimals(shuffled)
    setCurrentAnimal(shuffled[0])
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "safe":
        return "text-primary"
      case "threatened":
        return "text-accent"
      case "endangered":
        return "text-destructive"
      default:
        return "text-foreground"
    }
  }

  const handleHabitatChoice = (habitat: "forest" | "grassland" | "wetland" | "mountain") => {
    if (!currentAnimal) return

    const isCorrect = currentAnimal.habitat === habitat

    if (isCorrect) {
      const points = currentAnimal.status === "endangered" ? 30 : currentAnimal.status === "threatened" ? 25 : 20
      setScore((prev) => prev + points)
      setFeedback(`Perfect! This animal lives in ${habitat}s! +${points} points 🌟`)
      setShowConfetti(true)
      setShowFact(true)
      setTimeout(() => setShowConfetti(false), 1000)
    } else {
      setFeedback(`Not quite! ${currentAnimal.name} doesn't live in ${habitat}s. Try again! 💭`)
    }

    setTimeout(() => {
      setFeedback("")
      setShowFact(false)
      if (isCorrect) {
        const nextRound = currentRound + 1
        if (nextRound < gameAnimals.length) {
          setCurrentRound(nextRound)
          setCurrentAnimal(gameAnimals[nextRound])
        } else {
          onComplete(
            score +
              (isCorrect
                ? currentAnimal.status === "endangered"
                  ? 30
                  : currentAnimal.status === "threatened"
                    ? 25
                    : 20
                : 0),
          )
        }
      }
    }, 3000)
  }

  if (!currentAnimal) return null

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
              🌿
            </div>
          ))}
        </div>
      )}

      <Card className="w-full max-w-4xl p-8 glass border-primary/20">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-foreground mb-2">Biodiversity Protector</h2>
          <p className="text-muted-foreground">Match Indian animals with their natural habitats!</p>
          <div className="flex justify-center gap-6 mt-4">
            <span className="text-xl font-bold text-primary">Score: {score}</span>
            <span className="text-lg text-muted-foreground">
              Round: {currentRound + 1}/{gameAnimals.length}
            </span>
          </div>
        </div>

        <div className="text-center mb-8">
          <div className="text-8xl mb-4 animate-bounce-gentle">{currentAnimal.emoji}</div>
          <h3 className="text-2xl font-bold text-foreground mb-2">{currentAnimal.name}</h3>
          <p className={`text-lg font-semibold mb-4 ${getStatusColor(currentAnimal.status)}`}>
            Status: {currentAnimal.status.charAt(0).toUpperCase() + currentAnimal.status.slice(1)}
          </p>
          {showFact && (
            <div className="bg-primary/10 p-4 rounded-xl mb-4 animate-grow">
              <p className="text-sm text-foreground font-medium">🌟 Fun Fact: {currentAnimal.fact}</p>
            </div>
          )}
          {feedback && <p className="text-lg font-semibold text-primary animate-pulse-glow">{feedback}</p>}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Button
            onClick={() => handleHabitatChoice("forest")}
            className="h-24 bg-primary/20 hover:bg-primary/30 text-primary border-2 border-primary/30 rounded-xl flex flex-col items-center justify-center gap-2"
          >
            <span className="text-3xl">🌲</span>
            <span className="font-semibold">Forest</span>
          </Button>

          <Button
            onClick={() => handleHabitatChoice("grassland")}
            className="h-24 bg-secondary/20 hover:bg-secondary/30 text-secondary border-2 border-secondary/30 rounded-xl flex flex-col items-center justify-center gap-2"
          >
            <span className="text-3xl">🌾</span>
            <span className="font-semibold">Grassland</span>
          </Button>

          <Button
            onClick={() => handleHabitatChoice("wetland")}
            className="h-24 bg-accent/20 hover:bg-accent/30 text-accent border-2 border-accent/30 rounded-xl flex flex-col items-center justify-center gap-2"
          >
            <span className="text-3xl">🌊</span>
            <span className="font-semibold">Wetland</span>
          </Button>

          <Button
            onClick={() => handleHabitatChoice("mountain")}
            className="h-24 bg-muted/20 hover:bg-muted/30 text-muted border-2 border-muted/30 rounded-xl flex flex-col items-center justify-center gap-2"
          >
            <span className="text-3xl">⛰️</span>
            <span className="font-semibold">Mountain</span>
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

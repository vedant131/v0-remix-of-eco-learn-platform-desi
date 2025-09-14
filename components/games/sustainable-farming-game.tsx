"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface FarmingChoice {
  id: number
  situation: string
  choices: {
    method: string
    sustainability: number
    yield: number
    cost: number
    description: string
  }[]
  emoji: string
}

const farmingScenarios: FarmingChoice[] = [
  {
    id: 1,
    situation: "Your crops need nutrients. What fertilizer approach do you choose?",
    choices: [
      {
        method: "Chemical Fertilizers",
        sustainability: 2,
        yield: 9,
        cost: 7,
        description: "High yield but harms soil health",
      },
      {
        method: "Organic Compost",
        sustainability: 9,
        yield: 7,
        cost: 4,
        description: "Sustainable and improves soil over time",
      },
      {
        method: "Mixed Approach",
        sustainability: 6,
        yield: 8,
        cost: 6,
        description: "Balanced but still some chemical impact",
      },
    ],
    emoji: "🌱",
  },
  {
    id: 2,
    situation: "Pests are attacking your crops. How do you protect them?",
    choices: [
      {
        method: "Chemical Pesticides",
        sustainability: 1,
        yield: 8,
        cost: 8,
        description: "Effective but kills beneficial insects too",
      },
      {
        method: "Neem-based Solutions",
        sustainability: 8,
        yield: 6,
        cost: 5,
        description: "Traditional Indian method, eco-friendly",
      },
      {
        method: "Companion Planting",
        sustainability: 10,
        yield: 7,
        cost: 3,
        description: "Natural pest control using plant partnerships",
      },
    ],
    emoji: "🐛",
  },
  {
    id: 3,
    situation: "Water is scarce during dry season. What's your irrigation strategy?",
    choices: [
      {
        method: "Flood Irrigation",
        sustainability: 3,
        yield: 6,
        cost: 4,
        description: "Wastes a lot of water through evaporation",
      },
      {
        method: "Drip Irrigation",
        sustainability: 9,
        yield: 8,
        cost: 8,
        description: "Efficient water use, higher initial cost",
      },
      {
        method: "Rainwater Harvesting",
        sustainability: 10,
        yield: 7,
        cost: 6,
        description: "Sustainable water collection and storage",
      },
    ],
    emoji: "💧",
  },
  {
    id: 4,
    situation: "You want to improve soil health. What method do you use?",
    choices: [
      {
        method: "Crop Rotation",
        sustainability: 9,
        yield: 8,
        cost: 5,
        description: "Different crops restore soil nutrients naturally",
      },
      {
        method: "Monoculture",
        sustainability: 2,
        yield: 7,
        cost: 6,
        description: "Same crop depletes specific soil nutrients",
      },
      {
        method: "Cover Crops",
        sustainability: 8,
        yield: 6,
        cost: 4,
        description: "Protects and enriches soil between seasons",
      },
    ],
    emoji: "🌾",
  },
  {
    id: 5,
    situation: "Energy is needed for farm operations. What power source do you choose?",
    choices: [
      {
        method: "Diesel Generators",
        sustainability: 2,
        yield: 8,
        cost: 7,
        description: "Reliable but polluting and expensive fuel",
      },
      {
        method: "Solar Power",
        sustainability: 10,
        yield: 8,
        cost: 9,
        description: "Clean energy, high setup cost but free operation",
      },
      {
        method: "Biogas from Waste",
        sustainability: 9,
        yield: 7,
        cost: 5,
        description: "Uses farm waste to generate clean energy",
      },
    ],
    emoji: "⚡",
  },
]

interface SustainableFarmingGameProps {
  onComplete: (score: number) => void
  onClose: () => void
}

export function SustainableFarmingGame({ onComplete, onClose }: SustainableFarmingGameProps) {
  const [currentScenario, setCurrentScenario] = useState<FarmingChoice | null>(null)
  const [score, setScore] = useState(0)
  const [sustainability, setSustainability] = useState(50)
  const [gameScenarios, setGameScenarios] = useState<FarmingChoice[]>([])
  const [feedback, setFeedback] = useState<string>("")
  const [showConfetti, setShowConfetti] = useState(false)
  const [currentRound, setCurrentRound] = useState(0)

  useEffect(() => {
    const shuffled = [...farmingScenarios].sort(() => Math.random() - 0.5)
    setGameScenarios(shuffled)
    setCurrentScenario(shuffled[0])
  }, [])

  const getSustainabilityColor = (value: number) => {
    if (value >= 70) return "text-primary"
    if (value >= 40) return "text-accent"
    return "text-destructive"
  }

  const handleChoice = (choiceIndex: number) => {
    if (!currentScenario) return

    const choice = currentScenario.choices[choiceIndex]
    const points = choice.sustainability * 3 + choice.yield + (10 - choice.cost)

    setScore((prev) => prev + points)
    setSustainability((prev) => {
      const newValue = prev + (choice.sustainability - 5) * 2
      return Math.max(0, Math.min(100, newValue))
    })

    if (choice.sustainability >= 7) {
      setFeedback(`Excellent sustainable choice! +${points} points. ${choice.description} 🌟`)
      setShowConfetti(true)
      setTimeout(() => setShowConfetti(false), 1000)
    } else if (choice.sustainability >= 5) {
      setFeedback(`Good balance! +${points} points. ${choice.description} 👍`)
    } else {
      setFeedback(`Consider sustainability! +${points} points. ${choice.description} 💭`)
    }

    setTimeout(() => {
      setFeedback("")
      const nextRound = currentRound + 1
      if (nextRound < gameScenarios.length) {
        setCurrentRound(nextRound)
        setCurrentScenario(gameScenarios[nextRound])
      } else {
        const bonusScore = sustainability >= 70 ? 50 : sustainability >= 50 ? 25 : 0
        onComplete(score + points + bonusScore)
      }
    }, 3000)
  }

  if (!currentScenario) return null

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none">
          {[...Array(18)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-fall"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                fontSize: "20px",
              }}
            >
              🌾
            </div>
          ))}
        </div>
      )}

      <Card className="w-full max-w-4xl p-8 glass border-primary/20">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-foreground mb-2">Sustainable Farming Guru</h2>
          <p className="text-muted-foreground">Make eco-friendly farming decisions for a sustainable future!</p>
          <div className="flex justify-center gap-6 mt-4">
            <span className="text-xl font-bold text-primary">Score: {score}</span>
            <span className={`text-xl font-bold ${getSustainabilityColor(sustainability)}`}>
              Sustainability: {sustainability}%
            </span>
          </div>
        </div>

        <div className="text-center mb-8">
          <div className="text-8xl mb-4 animate-bounce-gentle">{currentScenario.emoji}</div>
          <div className="bg-secondary/10 p-4 rounded-xl mb-6">
            <p className="text-lg text-foreground font-medium">{currentScenario.situation}</p>
          </div>
          {feedback && (
            <div className="bg-primary/10 p-4 rounded-xl mb-4 animate-grow">
              <p className="text-sm text-foreground font-medium animate-pulse-glow">{feedback}</p>
            </div>
          )}
        </div>

        <div className="space-y-4 mb-8">
          {currentScenario.choices.map((choice, index) => (
            <Button
              key={index}
              onClick={() => handleChoice(index)}
              className="w-full p-4 h-auto text-left rounded-xl border-2 border-border hover:border-primary/50 bg-card/50 hover:bg-card/80 text-foreground transition-all duration-200"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h4 className="font-semibold text-lg mb-1">{choice.method}</h4>
                  <p className="text-sm text-muted-foreground">{choice.description}</p>
                </div>
                <div className="flex gap-4 text-sm ml-4">
                  <div className="text-center">
                    <div
                      className={`font-bold ${choice.sustainability >= 7 ? "text-primary" : choice.sustainability >= 5 ? "text-accent" : "text-destructive"}`}
                    >
                      {choice.sustainability}/10
                    </div>
                    <div className="text-xs text-muted-foreground">Eco</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-secondary">{choice.yield}/10</div>
                    <div className="text-xs text-muted-foreground">Yield</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-accent">{choice.cost}/10</div>
                    <div className="text-xs text-muted-foreground">Cost</div>
                  </div>
                </div>
              </div>
            </Button>
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

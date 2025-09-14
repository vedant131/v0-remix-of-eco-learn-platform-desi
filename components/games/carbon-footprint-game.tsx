"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

interface CarbonFootprintGameProps {
  onComplete: (score: number) => void
  onClose: () => void
}

interface Choice {
  id: number
  scenario: string
  options: {
    text: string
    carbon: number
    explanation: string
  }[]
}

const scenarios: Choice[] = [
  {
    id: 1,
    scenario: "How do you get to school?",
    options: [
      { text: "Walk or bike", carbon: 0, explanation: "Zero emissions! Great choice!" },
      { text: "Take the bus", carbon: 2, explanation: "Shared transport reduces individual carbon footprint" },
      { text: "Car ride", carbon: 8, explanation: "Cars produce significant CO2 emissions" },
    ],
  },
  {
    id: 2,
    scenario: "What's for lunch?",
    options: [
      { text: "Vegetarian meal", carbon: 1, explanation: "Plant-based meals have lower carbon footprint" },
      { text: "Chicken sandwich", carbon: 4, explanation: "Poultry has moderate environmental impact" },
      { text: "Beef burger", carbon: 10, explanation: "Beef production generates high CO2 emissions" },
    ],
  },
  {
    id: 3,
    scenario: "How do you spend your free time?",
    options: [
      { text: "Read a book", carbon: 0, explanation: "Reading has minimal environmental impact" },
      { text: "Watch TV", carbon: 3, explanation: "Electronics consume energy" },
      { text: "Play video games", carbon: 5, explanation: "Gaming consoles use significant electricity" },
    ],
  },
  {
    id: 4,
    scenario: "What do you do with old clothes?",
    options: [
      { text: "Donate or upcycle", carbon: 0, explanation: "Reusing prevents waste and new production" },
      { text: "Keep in closet", carbon: 2, explanation: "Not ideal but not wasteful" },
      { text: "Throw away", carbon: 8, explanation: "Textile waste contributes to landfill emissions" },
    ],
  },
  {
    id: 5,
    scenario: "How do you heat/cool your room?",
    options: [
      { text: "Open windows/wear layers", carbon: 0, explanation: "Natural temperature control is eco-friendly" },
      { text: "Use fan/space heater", carbon: 4, explanation: "Small appliances use moderate energy" },
      { text: "Central AC/heating", carbon: 9, explanation: "HVAC systems consume lots of energy" },
    ],
  },
]

export function CarbonFootprintGame({ onComplete, onClose }: CarbonFootprintGameProps) {
  const [currentScenario, setCurrentScenario] = useState(0)
  const [totalCarbon, setTotalCarbon] = useState(0)
  const [gameStarted, setGameStarted] = useState(false)
  const [showResult, setShowResult] = useState(false)
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [showExplanation, setShowExplanation] = useState(false)

  const handleChoice = (optionIndex: number) => {
    const choice = scenarios[currentScenario].options[optionIndex]
    setSelectedOption(optionIndex)
    setTotalCarbon((prev) => prev + choice.carbon)
    setShowExplanation(true)
  }

  const nextScenario = () => {
    if (currentScenario < scenarios.length - 1) {
      setCurrentScenario((prev) => prev + 1)
      setSelectedOption(null)
      setShowExplanation(false)
    } else {
      setShowResult(true)
      const score = Math.max(0, 100 - totalCarbon * 2)
      onComplete(score)
    }
  }

  const getCarbonLevel = () => {
    if (totalCarbon <= 10) return { level: "Eco Hero", color: "text-green-500", emoji: "🌱" }
    if (totalCarbon <= 20) return { level: "Green Citizen", color: "text-yellow-500", emoji: "🌿" }
    if (totalCarbon <= 30) return { level: "Needs Improvement", color: "text-orange-500", emoji: "⚠️" }
    return { level: "High Impact", color: "text-red-500", emoji: "🚨" }
  }

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
      <Card className="w-full max-w-2xl p-6 glass border-primary/20">
        <div className="text-center mb-4">
          <h2 className="text-2xl font-bold text-foreground mb-2">🌍 Carbon Footprint Calculator</h2>
          <p className="text-muted-foreground">Make daily choices and see their environmental impact!</p>
        </div>

        {!gameStarted ? (
          <div className="text-center">
            <div className="text-6xl mb-4">🦶</div>
            <p className="text-muted-foreground mb-6">Learn how your daily choices affect the environment!</p>
            <Button
              onClick={() => setGameStarted(true)}
              className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl px-8 py-3 font-semibold"
            >
              Start Learning!
            </Button>
          </div>
        ) : showResult ? (
          <div className="text-center">
            <div className="text-6xl mb-4">{getCarbonLevel().emoji}</div>
            <h3 className="text-2xl font-bold text-foreground mb-2">Your Carbon Footprint</h3>
            <div className={`text-4xl font-bold mb-4 ${getCarbonLevel().color}`}>{totalCarbon} kg CO2</div>
            <div className={`text-xl font-semibold mb-4 ${getCarbonLevel().color}`}>{getCarbonLevel().level}</div>
            <p className="text-muted-foreground mb-6">
              {totalCarbon <= 10
                ? "Amazing! You're making eco-friendly choices that help protect our planet!"
                : totalCarbon <= 20
                  ? "Good job! You're on the right track. Small changes can make a big difference!"
                  : "There's room for improvement! Try making more eco-friendly choices in your daily life."}
            </p>
          </div>
        ) : (
          <div>
            <div className="flex justify-between items-center mb-4">
              <div className="text-primary font-bold">
                Scenario {currentScenario + 1}/{scenarios.length}
              </div>
              <div className="text-accent font-bold">Carbon: {totalCarbon} kg CO2</div>
            </div>

            <Progress value={(currentScenario / scenarios.length) * 100} className="mb-6" />

            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-foreground mb-4">{scenarios[currentScenario].scenario}</h3>

              {!showExplanation ? (
                <div className="space-y-3">
                  {scenarios[currentScenario].options.map((option, index) => (
                    <Button
                      key={index}
                      onClick={() => handleChoice(index)}
                      variant="outline"
                      className="w-full p-4 text-left border-border hover:bg-primary/10 hover:border-primary/30"
                    >
                      {option.text}
                    </Button>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <div className="font-semibold text-foreground mb-2">
                      You chose: {scenarios[currentScenario].options[selectedOption!].text}
                    </div>
                    <div className="text-accent font-bold mb-2">
                      +{scenarios[currentScenario].options[selectedOption!].carbon} kg CO2
                    </div>
                    <div className="text-muted-foreground">
                      {scenarios[currentScenario].options[selectedOption!].explanation}
                    </div>
                  </div>
                  <Button
                    onClick={nextScenario}
                    className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl px-8 py-3 font-semibold"
                  >
                    {currentScenario < scenarios.length - 1 ? "Next Scenario" : "See Results"}
                  </Button>
                </div>
              )}
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

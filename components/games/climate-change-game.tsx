"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface ClimateScenario {
  id: number
  situation: string
  options: {
    text: string
    impact: number
    explanation: string
  }[]
  emoji: string
  location: string
}

const climateScenarios: ClimateScenario[] = [
  {
    id: 1,
    situation: "Extreme heat wave hits Delhi. What's the best immediate action?",
    options: [
      { text: "Install more AC units", impact: -10, explanation: "Increases energy consumption and emissions" },
      { text: "Create cool public spaces", impact: 20, explanation: "Helps community without increasing emissions" },
      { text: "Do nothing", impact: -20, explanation: "People suffer from heat-related illnesses" },
    ],
    emoji: "🌡️",
    location: "Delhi",
  },
  {
    id: 2,
    situation: "Monsoon patterns are changing in Kerala. How to adapt farming?",
    options: [
      { text: "Switch to drought-resistant crops", impact: 25, explanation: "Smart adaptation to changing rainfall" },
      { text: "Use more chemical fertilizers", impact: -15, explanation: "Harms soil and water quality" },
      { text: "Abandon farming", impact: -25, explanation: "Reduces food security and rural livelihoods" },
    ],
    emoji: "🌧️",
    location: "Kerala",
  },
  {
    id: 3,
    situation: "Sea levels rising near Mumbai coastline. What's the priority?",
    options: [
      { text: "Build sea walls", impact: 15, explanation: "Protects coastal areas from flooding" },
      { text: "Relocate all coastal communities", impact: -10, explanation: "Too expensive and disruptive" },
      { text: "Restore mangrove forests", impact: 30, explanation: "Natural protection plus biodiversity benefits" },
    ],
    emoji: "🌊",
    location: "Mumbai",
  },
  {
    id: 4,
    situation: "Air pollution worsens during winter in North India. Best solution?",
    options: [
      { text: "Ban all vehicles", impact: -5, explanation: "Too extreme and impractical" },
      {
        text: "Promote electric vehicles and public transport",
        impact: 25,
        explanation: "Sustainable long-term solution",
      },
      { text: "Use artificial rain", impact: 10, explanation: "Temporary fix but doesn't address root cause" },
    ],
    emoji: "🌫️",
    location: "North India",
  },
  {
    id: 5,
    situation: "Glaciers melting in Himalayas affecting river flow. What to do?",
    options: [
      { text: "Build more dams", impact: 5, explanation: "Helps store water but affects river ecosystems" },
      { text: "Improve water conservation", impact: 20, explanation: "Reduces demand and waste" },
      { text: "Artificial glacier creation", impact: 30, explanation: "Innovative solution being tested in Ladakh" },
    ],
    emoji: "🏔️",
    location: "Himalayas",
  },
]

interface ClimateChangeGameProps {
  onComplete: (score: number) => void
  onClose: () => void
}

export function ClimateChangeGame({ onComplete, onClose }: ClimateChangeGameProps) {
  const [currentScenario, setCurrentScenario] = useState<ClimateScenario | null>(null)
  const [score, setScore] = useState(0)
  const [gameScenarios, setGameScenarios] = useState<ClimateScenario[]>([])
  const [feedback, setFeedback] = useState<string>("")
  const [showConfetti, setShowConfetti] = useState(false)
  const [currentRound, setCurrentRound] = useState(0)
  const [selectedOption, setSelectedOption] = useState<number | null>(null)

  useEffect(() => {
    const shuffled = [...climateScenarios].sort(() => Math.random() - 0.5)
    setGameScenarios(shuffled)
    setCurrentScenario(shuffled[0])
  }, [])

  const handleOptionSelect = (optionIndex: number) => {
    if (!currentScenario || selectedOption !== null) return

    setSelectedOption(optionIndex)
    const option = currentScenario.options[optionIndex]
    const points = Math.max(0, option.impact)

    setScore((prev) => prev + points)

    if (option.impact > 0) {
      setFeedback(`Excellent choice! +${points} points. ${option.explanation} 🌟`)
      setShowConfetti(true)
      setTimeout(() => setShowConfetti(false), 1000)
    } else {
      setFeedback(`Not the best choice. ${option.explanation} Try to think more sustainably! 💭`)
    }

    setTimeout(() => {
      setFeedback("")
      setSelectedOption(null)
      const nextRound = currentRound + 1
      if (nextRound < gameScenarios.length) {
        setCurrentRound(nextRound)
        setCurrentScenario(gameScenarios[nextRound])
      } else {
        onComplete(score + points)
      }
    }, 4000)
  }

  if (!currentScenario) return null

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none">
          {[...Array(25)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-fall"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                fontSize: "18px",
              }}
            >
              🌱
            </div>
          ))}
        </div>
      )}

      <Card className="w-full max-w-4xl p-8 glass border-primary/20">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-foreground mb-2">Climate Change Hero</h2>
          <p className="text-muted-foreground">Make smart decisions to tackle climate challenges in India!</p>
          <div className="flex justify-center gap-6 mt-4">
            <span className="text-xl font-bold text-primary">Score: {score}</span>
            <span className="text-lg text-muted-foreground">
              Scenario: {currentRound + 1}/{gameScenarios.length}
            </span>
          </div>
        </div>

        <div className="text-center mb-8">
          <div className="text-6xl mb-4 animate-bounce-gentle">{currentScenario.emoji}</div>
          <div className="bg-secondary/10 p-4 rounded-xl mb-6">
            <h3 className="text-xl font-bold text-foreground mb-2">{currentScenario.location}</h3>
            <p className="text-lg text-foreground">{currentScenario.situation}</p>
          </div>
          {feedback && (
            <div className="bg-primary/10 p-4 rounded-xl mb-4 animate-grow">
              <p className="text-sm text-foreground font-medium animate-pulse-glow">{feedback}</p>
            </div>
          )}
        </div>

        <div className="space-y-4 mb-8">
          {currentScenario.options.map((option, index) => (
            <Button
              key={index}
              onClick={() => handleOptionSelect(index)}
              disabled={selectedOption !== null}
              className={`w-full h-16 text-left p-4 rounded-xl border-2 transition-all duration-200 ${
                selectedOption === index
                  ? option.impact > 0
                    ? "bg-primary/30 border-primary text-primary"
                    : "bg-destructive/30 border-destructive text-destructive"
                  : "bg-card/50 border-border hover:bg-card/80 text-foreground hover:border-primary/50"
              }`}
            >
              <span className="font-semibold">{option.text}</span>
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

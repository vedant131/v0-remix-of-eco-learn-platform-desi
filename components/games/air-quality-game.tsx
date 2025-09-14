"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface AirQualityAction {
  id: number
  action: string
  impact: "good" | "bad"
  emoji: string
  description: string
}

const airQualityActions: AirQualityAction[] = [
  { id: 1, action: "Plant Trees", impact: "good", emoji: "🌳", description: "Trees absorb CO2 and produce oxygen" },
  { id: 2, action: "Use Public Transport", impact: "good", emoji: "🚌", description: "Reduces vehicle emissions" },
  {
    id: 3,
    action: "Burn Crop Stubble",
    impact: "bad",
    emoji: "🔥",
    description: "Major cause of air pollution in North India",
  },
  { id: 4, action: "Use Solar Energy", impact: "good", emoji: "☀️", description: "Clean energy reduces coal burning" },
  {
    id: 5,
    action: "Industrial Emissions",
    impact: "bad",
    emoji: "🏭",
    description: "Factories release harmful pollutants",
  },
  { id: 6, action: "Cycle to Work", impact: "good", emoji: "🚴‍♂️", description: "Zero emissions transportation" },
  { id: 7, action: "Burn Garbage", impact: "bad", emoji: "🗑️", description: "Releases toxic fumes into air" },
  { id: 8, action: "Use Air Purifiers", impact: "good", emoji: "💨", description: "Cleans indoor air quality" },
]

interface AirQualityGameProps {
  onComplete: (score: number) => void
  onClose: () => void
}

export function AirQualityGame({ onComplete, onClose }: AirQualityGameProps) {
  const [currentAction, setCurrentAction] = useState<AirQualityAction | null>(null)
  const [score, setScore] = useState(0)
  const [airQuality, setAirQuality] = useState(150) // AQI starting at moderate
  const [gameActions, setGameActions] = useState<AirQualityAction[]>([])
  const [feedback, setFeedback] = useState<string>("")
  const [showConfetti, setShowConfetti] = useState(false)
  const [currentRound, setCurrentRound] = useState(0)

  useEffect(() => {
    const shuffled = [...airQualityActions].sort(() => Math.random() - 0.5).slice(0, 6)
    setGameActions(shuffled)
    setCurrentAction(shuffled[0])
  }, [])

  const getAQIColor = (aqi: number) => {
    if (aqi <= 50) return "text-primary" // Good - Green
    if (aqi <= 100) return "text-secondary" // Moderate - Blue
    if (aqi <= 200) return "text-accent" // Unhealthy - Yellow
    return "text-destructive" // Hazardous - Red
  }

  const getAQILabel = (aqi: number) => {
    if (aqi <= 50) return "Good"
    if (aqi <= 100) return "Moderate"
    if (aqi <= 200) return "Unhealthy"
    return "Hazardous"
  }

  const handleChoice = (choice: "good" | "bad") => {
    if (!currentAction) return

    const isCorrect = currentAction.impact === choice
    let newAQI = airQuality

    if (isCorrect) {
      setScore((prev) => prev + 25)
      if (choice === "good") {
        newAQI = Math.max(0, airQuality - 20)
        setFeedback("Great choice! Air quality improved! 🌟")
      } else {
        newAQI = Math.min(300, airQuality + 15)
        setFeedback("Correct! This harms air quality. 💭")
      }
      setShowConfetti(true)
      setTimeout(() => setShowConfetti(false), 1000)
    } else {
      setFeedback("Think again about this action's impact! 🤔")
      if (choice === "good") {
        newAQI = Math.min(300, airQuality + 10)
      } else {
        newAQI = Math.max(0, airQuality - 10)
      }
    }

    setAirQuality(newAQI)

    setTimeout(() => {
      setFeedback("")
      const nextRound = currentRound + 1
      if (nextRound < gameActions.length) {
        setCurrentRound(nextRound)
        setCurrentAction(gameActions[nextRound])
      } else {
        const finalScore = score + (isCorrect ? 25 : 0)
        const bonusScore = airQuality <= 50 ? 50 : airQuality <= 100 ? 25 : 0
        onComplete(finalScore + bonusScore)
      }
    }, 2000)
  }

  if (!currentAction) return null

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-fall"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                fontSize: "20px",
              }}
            >
              🍃
            </div>
          ))}
        </div>
      )}

      <Card className="w-full max-w-3xl p-8 glass border-primary/20">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-foreground mb-2">Air Quality Monitor</h2>
          <p className="text-muted-foreground">Help improve India's air quality by making the right choices!</p>
          <div className="flex justify-center gap-6 mt-4">
            <span className="text-xl font-bold text-primary">Score: {score}</span>
            <span className={`text-xl font-bold ${getAQIColor(airQuality)}`}>
              AQI: {airQuality} ({getAQILabel(airQuality)})
            </span>
          </div>
        </div>

        <div className="text-center mb-8">
          <div className="text-8xl mb-4 animate-bounce-gentle">{currentAction.emoji}</div>
          <h3 className="text-2xl font-bold text-foreground mb-2">{currentAction.action}</h3>
          <p className="text-muted-foreground mb-4">{currentAction.description}</p>
          {feedback && <p className="text-lg font-semibold text-primary animate-pulse-glow">{feedback}</p>}
        </div>

        <div className="grid grid-cols-2 gap-6 mb-8">
          <Button
            onClick={() => handleChoice("good")}
            className="h-20 bg-primary/20 hover:bg-primary/30 text-primary border-2 border-primary/30 rounded-xl flex flex-col items-center justify-center gap-2"
          >
            <span className="text-3xl">✅</span>
            <span className="font-semibold">Good for Air</span>
          </Button>

          <Button
            onClick={() => handleChoice("bad")}
            className="h-20 bg-destructive/20 hover:bg-destructive/30 text-destructive border-2 border-destructive/30 rounded-xl flex flex-col items-center justify-center gap-2"
          >
            <span className="text-3xl">❌</span>
            <span className="font-semibold">Bad for Air</span>
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

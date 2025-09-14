"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface ChallengeCardProps {
  id: string
  title: string
  description: string
  icon: string
  points: number
  difficulty: "Easy" | "Medium" | "Hard"
  type: "daily" | "weekly"
  completed: boolean
  daysLeft?: number
  onComplete: (id: string) => void
}

export function ChallengeCard({
  id,
  title,
  description,
  icon,
  points,
  difficulty,
  type,
  completed,
  daysLeft,
  onComplete,
}: ChallengeCardProps) {
  const [isCompleting, setIsCompleting] = useState(false)
  const [showSparkles, setShowSparkles] = useState(false)

  const difficultyColors = {
    Easy: "bg-secondary text-secondary-foreground",
    Medium: "bg-accent text-accent-foreground",
    Hard: "bg-destructive text-destructive-foreground",
  }

  const typeColors = {
    daily: "border-primary/30 bg-gradient-to-br from-primary/10 to-primary/5",
    weekly: "border-secondary/30 bg-gradient-to-br from-secondary/10 to-secondary/5",
  }

  const handleComplete = async () => {
    setIsCompleting(true)
    setShowSparkles(true)

    // Simulate upload/completion process
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsCompleting(false)
    setTimeout(() => setShowSparkles(false), 2000)
    onComplete(id)
  }

  return (
    <Card
      className={`p-6 glass hover:scale-105 transition-all duration-300 relative overflow-hidden ${
        typeColors[type]
      } ${completed ? "opacity-75" : ""}`}
    >
      {/* Sparkle Animation */}
      {showSparkles && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-ping"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 1}s`,
              }}
            >
              ✨
            </div>
          ))}
        </div>
      )}

      <div className="flex items-start gap-4">
        <div className="w-12 h-12 bg-background/50 rounded-xl flex items-center justify-center text-2xl">{icon}</div>

        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-xl font-bold text-foreground">{title}</h3>
            {completed && <span className="text-lg">✅</span>}
          </div>

          <p className="text-muted-foreground mb-4 leading-relaxed">{description}</p>

          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Badge className={difficultyColors[difficulty]}>{difficulty}</Badge>
              <Badge variant="outline" className="capitalize">
                {type}
              </Badge>
            </div>
            {daysLeft && <span className="text-sm text-muted-foreground">{daysLeft} days left</span>}
          </div>

          <div className="flex items-center justify-between">
            <span className="text-primary font-bold">+{points} points</span>
            {!completed ? (
              <Button
                onClick={handleComplete}
                disabled={isCompleting}
                className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl font-semibold transition-all duration-200 hover:scale-105"
              >
                {isCompleting ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                    Completing...
                  </div>
                ) : (
                  "Complete Challenge"
                )}
              </Button>
            ) : (
              <span className="text-secondary font-semibold">Completed! 🎉</span>
            )}
          </div>
        </div>
      </div>
    </Card>
  )
}

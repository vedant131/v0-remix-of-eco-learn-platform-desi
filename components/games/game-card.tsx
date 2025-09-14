"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { ReactNode } from "react"

interface GameCardProps {
  title: string
  description: string
  icon: ReactNode
  difficulty: "Easy" | "Medium" | "Hard"
  points: number
  playTime: string
  color: "primary" | "secondary" | "accent"
  onPlay: () => void
}

export function GameCard({ title, description, icon, difficulty, points, playTime, color, onPlay }: GameCardProps) {
  const colorClasses = {
    primary: "border-primary/30 bg-gradient-to-br from-primary/10 to-primary/5",
    secondary: "border-secondary/30 bg-gradient-to-br from-secondary/10 to-secondary/5",
    accent: "border-accent/30 bg-gradient-to-br from-accent/10 to-accent/5",
  }

  const difficultyColors = {
    Easy: "bg-secondary text-secondary-foreground",
    Medium: "bg-accent text-accent-foreground",
    Hard: "bg-destructive text-destructive-foreground",
  }

  return (
    <Card
      className={`p-6 glass hover:scale-105 transition-all duration-300 cursor-pointer group ${colorClasses[color]}`}
    >
      <div className="text-center">
        <div className="w-20 h-20 mx-auto mb-4 bg-background/50 rounded-2xl flex items-center justify-center group-hover:animate-bounce-gentle">
          {icon}
        </div>

        <h3 className="text-2xl font-bold text-foreground mb-2">{title}</h3>
        <p className="text-muted-foreground mb-4 leading-relaxed">{description}</p>

        <div className="flex items-center justify-between mb-4 text-sm">
          <span className={`px-2 py-1 rounded-full font-medium ${difficultyColors[difficulty]}`}>{difficulty}</span>
          <span className="text-muted-foreground">{playTime}</span>
        </div>

        <div className="flex items-center justify-between mb-4">
          <span className="text-primary font-semibold">+{points} points</span>
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-2 h-2 bg-accent rounded-full" />
            ))}
          </div>
        </div>

        <Button
          onClick={onPlay}
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl font-semibold transition-all duration-200 hover:scale-105"
        >
          Play Now!
        </Button>
      </div>
    </Card>
  )
}

"use client"

import { Card } from "@/components/ui/card"
import { EcoCharacter } from "@/components/eco-characters"

interface StreakCounterProps {
  streak: number
  maxStreak: number
}

export function StreakCounter({ streak, maxStreak }: StreakCounterProps) {
  const getTreeSize = (streak: number) => {
    if (streak < 3) return "sm"
    if (streak < 7) return "md"
    return "lg"
  }

  const getTreeType = (streak: number) => {
    if (streak < 5) return "sapling"
    if (streak < 10) return "sapling" // Could be different growth stages
    return "sapling"
  }

  return (
    <Card className="p-6 glass border-secondary/20 text-center">
      <h3 className="text-2xl font-bold text-foreground mb-4">🔥 Streak Counter</h3>

      <div className="mb-6">
        <EcoCharacter
          type={getTreeType(streak) as "sapling"}
          size={getTreeSize(streak) as "sm" | "md" | "lg"}
          animated={true}
        />
      </div>

      <div className="mb-4">
        <div className="text-4xl font-bold text-secondary mb-2">{streak}</div>
        <p className="text-lg font-semibold text-foreground">Day Streak!</p>
        <p className="text-muted-foreground">Best: {maxStreak} days</p>
      </div>

      <div className="flex justify-center mb-4">
        <div className="flex gap-1">
          {[...Array(Math.min(streak, 14))].map((_, i) => (
            <div
              key={i}
              className="w-2 h-2 bg-secondary rounded-full animate-pulse"
              style={{ animationDelay: `${i * 0.1}s` }}
            />
          ))}
          {streak > 14 && <span className="text-secondary font-bold ml-2">+{streak - 14}</span>}
        </div>
      </div>

      <p className="text-sm text-muted-foreground">
        {streak === 0
          ? "Start your eco-journey today!"
          : streak < 7
            ? "Keep it up! Your sapling is growing!"
            : "Amazing! You're a true eco-warrior!"}
      </p>
    </Card>
  )
}

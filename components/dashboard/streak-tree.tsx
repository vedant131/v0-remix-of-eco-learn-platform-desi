"use client"

import { Card } from "@/components/ui/card"

interface StreakTreeProps {
  streakDays: number
  className?: string
}

export function StreakTree({ streakDays, className = "" }: StreakTreeProps) {
  const getTreeStage = (days: number) => {
    if (days < 3) return { emoji: "🌱", stage: "Seedling", color: "text-green-400" }
    if (days < 7) return { emoji: "🌿", stage: "Sprout", color: "text-green-500" }
    if (days < 14) return { emoji: "🌳", stage: "Young Tree", color: "text-green-600" }
    if (days < 30) return { emoji: "🌲", stage: "Mature Tree", color: "text-green-700" }
    return { emoji: "🌳", stage: "Ancient Tree", color: "text-green-800" }
  }

  const tree = getTreeStage(streakDays)

  return (
    <Card className={`p-6 glass border-primary/20 text-center ${className}`}>
      <h3 className="text-lg font-bold text-foreground mb-4">🌱 Streak Tree</h3>

      <div className="relative">
        {/* Tree visualization */}
        <div className="text-6xl mb-4 animate-sway">{tree.emoji}</div>

        {/* Streak counter */}
        <div className="mb-4">
          <div className={`text-3xl font-bold ${tree.color}`}>{streakDays}</div>
          <div className="text-sm text-muted-foreground">day streak</div>
        </div>

        {/* Tree stage */}
        <div className="mb-4">
          <div className="font-semibold text-foreground">{tree.stage}</div>
          <div className="text-xs text-muted-foreground">
            {streakDays < 30 ? `${30 - streakDays} days to next stage` : "Maximum growth achieved!"}
          </div>
        </div>

        {/* Growth progress */}
        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-green-400 to-green-600 transition-all duration-1000"
            style={{ width: `${Math.min((streakDays / 30) * 100, 100)}%` }}
          />
        </div>
      </div>
    </Card>
  )
}

"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { EcoCharacter } from "@/components/eco-characters"

interface LeaderboardEntryProps {
  rank: number
  name: string
  points: number
  avatar: "sapling" | "droplet" | "recycle"
  level: string
  isCurrentUser?: boolean
}

export function LeaderboardEntry({ rank, name, points, avatar, level, isCurrentUser }: LeaderboardEntryProps) {
  const getRankIcon = (rank: number) => {
    if (rank === 1) return "🥇"
    if (rank === 2) return "🥈"
    if (rank === 3) return "🥉"
    return `#${rank}`
  }

  const getRankColor = (rank: number) => {
    if (rank === 1) return "text-yellow-500"
    if (rank === 2) return "text-gray-400"
    if (rank === 3) return "text-amber-600"
    return "text-muted-foreground"
  }

  return (
    <Card
      className={`p-4 glass hover:scale-105 hover:-rotate-1 transition-all duration-300 ${
        isCurrentUser ? "border-primary/40 bg-primary/5" : "border-border/20"
      }`}
    >
      <div className="flex items-center gap-4">
        <div className={`text-2xl font-bold ${getRankColor(rank)} min-w-[3rem] text-center`}>{getRankIcon(rank)}</div>

        <div className="relative">
          <EcoCharacter type={avatar} size="md" animated={rank <= 3} />
          {rank <= 3 && <div className="absolute -top-1 -right-1 text-lg animate-pulse">👑</div>}
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-bold text-foreground">{name}</h3>
            {isCurrentUser && (
              <Badge variant="outline" className="text-xs">
                You
              </Badge>
            )}
          </div>
          <p className="text-sm text-muted-foreground">{level}</p>
        </div>

        <div className="text-right">
          <div className="text-xl font-bold text-primary">{points.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">eco points</p>
        </div>
      </div>
    </Card>
  )
}

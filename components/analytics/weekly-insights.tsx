"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface WeeklyInsight {
  id: string
  title: string
  description: string
  icon: string
  type: "achievement" | "tip" | "challenge"
  points?: number
}

const weeklyInsights: WeeklyInsight[] = [
  {
    id: "1",
    title: "Streak Master!",
    description: "You've maintained a 7-day eco-challenge streak. Keep it up!",
    icon: "🔥",
    type: "achievement",
    points: 50,
  },
  {
    id: "2",
    title: "Water Conservation Tip",
    description: "Try collecting rainwater during monsoon season for your plants.",
    icon: "💡",
    type: "tip",
  },
  {
    id: "3",
    title: "Weekend Challenge",
    description: "Plant a tree or start a small herb garden this weekend.",
    icon: "🌱",
    type: "challenge",
    points: 100,
  },
  {
    id: "4",
    title: "Top Performer",
    description: "You're in the top 15% of users this week!",
    icon: "⭐",
    type: "achievement",
    points: 75,
  },
]

export function WeeklyInsights() {
  const getTypeColor = (type: string) => {
    switch (type) {
      case "achievement":
        return "bg-secondary text-secondary-foreground"
      case "tip":
        return "bg-primary text-primary-foreground"
      case "challenge":
        return "bg-accent text-accent-foreground"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  return (
    <Card className="p-6 glass border-secondary/20">
      <h3 className="text-xl font-bold text-foreground mb-6">Weekly Insights</h3>

      <div className="space-y-4">
        {weeklyInsights.map((insight) => (
          <div
            key={insight.id}
            className="flex items-start gap-4 p-4 rounded-xl bg-background/30 hover:bg-background/50 transition-colors"
          >
            <div className="w-12 h-12 bg-background/50 rounded-xl flex items-center justify-center text-2xl animate-bounce-gentle">
              {insight.icon}
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h4 className="font-semibold text-foreground">{insight.title}</h4>
                <Badge className={getTypeColor(insight.type)} variant="secondary">
                  {insight.type}
                </Badge>
                {insight.points && (
                  <Badge variant="outline" className="text-xs">
                    +{insight.points} pts
                  </Badge>
                )}
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{insight.description}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}

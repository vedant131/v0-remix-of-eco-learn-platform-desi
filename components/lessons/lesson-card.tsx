"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

interface LessonCardProps {
  id: string
  title: string
  description: string
  icon: string
  duration: string
  difficulty: "Beginner" | "Intermediate" | "Advanced"
  progress: number
  completed: boolean
  locked: boolean
  onStart: (id: string) => void
}

export function LessonCard({
  id,
  title,
  description,
  icon,
  duration,
  difficulty,
  progress,
  completed,
  locked,
  onStart,
}: LessonCardProps) {
  const difficultyColors = {
    Beginner: "bg-secondary text-secondary-foreground",
    Intermediate: "bg-accent text-accent-foreground",
    Advanced: "bg-destructive text-destructive-foreground",
  }

  return (
    <Card
      className={`p-6 glass hover:scale-105 transition-all duration-300 border-primary/20 ${
        locked ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
      }`}
    >
      <div className="flex items-start gap-4">
        <div className="w-16 h-16 bg-background/50 rounded-2xl flex items-center justify-center text-3xl relative">
          {icon}
          {completed && <div className="absolute -top-1 -right-1 text-lg">✅</div>}
          {locked && <div className="absolute -top-1 -right-1 text-lg">🔒</div>}
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-xl font-bold text-foreground">{title}</h3>
          </div>

          <p className="text-muted-foreground mb-4 leading-relaxed">{description}</p>

          <div className="flex items-center gap-2 mb-4">
            <Badge className={difficultyColors[difficulty]}>{difficulty}</Badge>
            <span className="text-sm text-muted-foreground">{duration}</span>
          </div>

          {progress > 0 && (
            <div className="mb-4">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-muted-foreground">Progress</span>
                <span className="text-primary font-semibold">{progress}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          )}

          <Button
            onClick={() => !locked && onStart(id)}
            disabled={locked}
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl font-semibold transition-all duration-200 hover:scale-105"
          >
            {completed ? "Review Lesson" : locked ? "Locked" : progress > 0 ? "Continue" : "Start Lesson"}
          </Button>
        </div>
      </div>
    </Card>
  )
}

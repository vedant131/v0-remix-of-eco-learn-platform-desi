"use client"

import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

interface ProgressTrackerProps {
  completedLessons: number
  totalLessons: number
  knowledgePoints: number
  currentLevel: string
  streakDays: number
}

export function ProgressTracker({
  completedLessons,
  totalLessons,
  knowledgePoints,
  currentLevel,
  streakDays,
}: ProgressTrackerProps) {
  const completionPercentage = (completedLessons / totalLessons) * 100

  return (
    <Card className="p-6 glass border-primary/20">
      <h3 className="text-xl font-bold text-foreground mb-6">Learning Progress</h3>

      <div className="space-y-6">
        {/* Overall Progress */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-muted-foreground">Overall Progress</span>
            <span className="text-sm font-bold text-primary">{Math.round(completionPercentage)}%</span>
          </div>
          <Progress value={completionPercentage} className="h-3" />
          <p className="text-xs text-muted-foreground mt-1">
            {completedLessons} of {totalLessons} lessons completed
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-secondary mb-1">{knowledgePoints}</div>
            <p className="text-xs text-muted-foreground">Knowledge Points</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-accent mb-1">{streakDays}</div>
            <p className="text-xs text-muted-foreground">Day Streak</p>
          </div>
        </div>

        {/* Current Level */}
        <div className="text-center">
          <Badge className="bg-primary text-primary-foreground text-sm px-4 py-2">{currentLevel} Level</Badge>
        </div>

        {/* Achievement Badges */}
        <div className="flex justify-center gap-2">
          {completedLessons >= 1 && (
            <span className="text-lg" title="First Lesson Complete">
              🌱
            </span>
          )}
          {completedLessons >= 5 && (
            <span className="text-lg" title="5 Lessons Complete">
              🌿
            </span>
          )}
          {completedLessons >= 10 && (
            <span className="text-lg" title="10 Lessons Complete">
              🌳
            </span>
          )}
          {streakDays >= 7 && (
            <span className="text-lg" title="7 Day Streak">
              🔥
            </span>
          )}
          {knowledgePoints >= 500 && (
            <span className="text-lg" title="Knowledge Master">
              🧠
            </span>
          )}
        </div>
      </div>
    </Card>
  )
}

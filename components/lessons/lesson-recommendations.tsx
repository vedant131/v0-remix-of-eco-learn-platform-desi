"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface Lesson {
  id: string
  title: string
  description: string
  icon: string
  duration: string
  difficulty: "Beginner" | "Intermediate" | "Advanced"
  category: string
}

interface LessonRecommendationsProps {
  lessons: Lesson[]
  onStartLesson: (lessonId: string) => void
}

export function LessonRecommendations({ lessons, onStartLesson }: LessonRecommendationsProps) {
  // Get recommended lessons based on user progress
  const recommendedLessons = lessons.slice(0, 3)

  return (
    <Card className="p-6 glass border-secondary/20">
      <h3 className="text-xl font-bold text-foreground mb-6">Recommended for You</h3>

      <div className="space-y-4">
        {recommendedLessons.map((lesson) => (
          <div
            key={lesson.id}
            className="flex items-center gap-4 p-4 rounded-xl bg-background/30 hover:bg-background/50 transition-colors"
          >
            <div className="w-12 h-12 bg-background/50 rounded-xl flex items-center justify-center text-2xl">
              {lesson.icon}
            </div>

            <div className="flex-1">
              <h4 className="font-semibold text-foreground mb-1">{lesson.title}</h4>
              <p className="text-sm text-muted-foreground mb-2">{lesson.description}</p>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">
                  {lesson.difficulty}
                </Badge>
                <span className="text-xs text-muted-foreground">{lesson.duration}</span>
              </div>
            </div>

            <Button
              onClick={() => onStartLesson(lesson.id)}
              size="sm"
              className="bg-secondary text-secondary-foreground hover:bg-secondary/90 rounded-lg"
            >
              Start
            </Button>
          </div>
        ))}
      </div>
    </Card>
  )
}

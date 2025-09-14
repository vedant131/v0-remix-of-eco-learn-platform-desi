"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

interface LessonSection {
  id: number
  title: string
  content: string
  illustration: string
}

interface LessonContentProps {
  lessonId: string
  title: string
  sections: LessonSection[]
  onComplete: () => void
  onClose: () => void
}

export function LessonContent({ lessonId, title, sections, onComplete, onClose }: LessonContentProps) {
  const [currentSection, setCurrentSection] = useState(0)
  const progress = ((currentSection + 1) / sections.length) * 100

  const handleNext = () => {
    if (currentSection < sections.length - 1) {
      setCurrentSection((prev) => prev + 1)
    } else {
      onComplete()
    }
  }

  const handlePrevious = () => {
    if (currentSection > 0) {
      setCurrentSection((prev) => prev - 1)
    }
  }

  const currentSectionData = sections[currentSection]

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
      <Card className="w-full max-w-3xl max-h-[90vh] overflow-y-auto glass border-primary/20">
        {/* Header */}
        <div className="p-6 border-b border-border/20">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-foreground">{title}</h1>
            <Button onClick={onClose} variant="ghost" className="text-muted-foreground hover:text-foreground">
              ✕
            </Button>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">
                Section {currentSection + 1} of {sections.length}
              </span>
              <span className="text-primary font-semibold">{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          <div className="text-center mb-8">
            <div className="text-8xl mb-4 animate-float">{currentSectionData.illustration}</div>
            <h2 className="text-3xl font-bold text-foreground mb-6">{currentSectionData.title}</h2>
          </div>

          <div className="prose prose-lg max-w-none">
            <div className="text-muted-foreground leading-relaxed text-lg whitespace-pre-line">
              {currentSectionData.content}
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="p-6 border-t border-border/20 flex justify-between items-center">
          <Button
            onClick={handlePrevious}
            disabled={currentSection === 0}
            variant="outline"
            className="border-border hover:bg-muted bg-transparent"
          >
            Previous
          </Button>

          <div className="flex gap-2">
            {sections.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index <= currentSection ? "bg-primary" : "bg-border"
                }`}
              />
            ))}
          </div>

          <Button
            onClick={handleNext}
            className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl font-semibold"
          >
            {currentSection === sections.length - 1 ? "Complete Lesson" : "Next"}
          </Button>
        </div>
      </Card>
    </div>
  )
}

"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface QuizQuestion {
  id: number
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
}

interface QuizComponentProps {
  questions: QuizQuestion[]
  onComplete: (score: number) => void
  onClose: () => void
}

export function QuizComponent({ questions, onComplete, onClose }: QuizComponentProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [showFeedback, setShowFeedback] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [showStars, setShowStars] = useState(false)
  const [showRain, setShowRain] = useState(false)

  const handleAnswerSelect = (answerIndex: number) => {
    if (showFeedback) return
    setSelectedAnswer(answerIndex)
  }

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return

    const correct = selectedAnswer === questions[currentQuestion].correctAnswer
    setIsCorrect(correct)
    setShowFeedback(true)

    if (correct) {
      setScore((prev) => prev + 1)
      setShowStars(true)
      setTimeout(() => setShowStars(false), 2000)
    } else {
      setShowRain(true)
      setTimeout(() => setShowRain(false), 1000)
    }

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion((prev) => prev + 1)
        setSelectedAnswer(null)
        setShowFeedback(false)
      } else {
        onComplete(score + (correct ? 1 : 0))
      }
    }, 3000)
  }

  const currentQ = questions[currentQuestion]

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
      {/* Star Animation */}
      {showStars && (
        <div className="fixed inset-0 pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-fall text-2xl"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            >
              ⭐
            </div>
          ))}
          {[...Array(10)].map((_, i) => (
            <div
              key={`leaf-${i}`}
              className="absolute animate-fall text-xl"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            >
              🍃
            </div>
          ))}
        </div>
      )}

      {/* Rain Animation */}
      {showRain && (
        <div className="fixed inset-0 pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-fall text-xl"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 1}s`,
              }}
            >
              🌧️
            </div>
          ))}
        </div>
      )}

      <Card className="w-full max-w-2xl p-8 glass border-primary/20">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-foreground mb-2">Eco Quiz</h2>
          <p className="text-muted-foreground">
            Question {currentQuestion + 1} of {questions.length}
          </p>
          <div className="mt-4">
            <span className="text-lg font-semibold text-primary">Score: {score}</span>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-bold text-foreground mb-6 text-center leading-relaxed">{currentQ.question}</h3>

          <div className="space-y-3">
            {currentQ.options.map((option, index) => (
              <Button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                variant="outline"
                className={`w-full p-4 text-left justify-start rounded-xl transition-all duration-200 ${
                  selectedAnswer === index
                    ? showFeedback
                      ? index === currentQ.correctAnswer
                        ? "bg-secondary/20 border-secondary text-secondary"
                        : "bg-destructive/20 border-destructive text-destructive"
                      : "bg-primary/20 border-primary text-primary"
                    : showFeedback && index === currentQ.correctAnswer
                      ? "bg-secondary/20 border-secondary text-secondary"
                      : "border-border hover:bg-muted"
                }`}
                disabled={showFeedback}
              >
                <span className="font-medium mr-3">{String.fromCharCode(65 + index)}.</span>
                {option}
              </Button>
            ))}
          </div>
        </div>

        {showFeedback && (
          <div className="mb-6 text-center">
            <div className={`text-lg font-semibold mb-2 ${isCorrect ? "text-secondary" : "text-destructive"}`}>
              {isCorrect ? "Correct! Great job! 🌟" : "Not quite right. Keep learning! 💭"}
            </div>
            <p className="text-muted-foreground leading-relaxed">{currentQ.explanation}</p>
          </div>
        )}

        <div className="flex justify-center gap-4">
          {!showFeedback ? (
            <Button
              onClick={handleSubmitAnswer}
              disabled={selectedAnswer === null}
              className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl px-8 py-3 font-semibold"
            >
              Submit Answer
            </Button>
          ) : (
            <div className="text-center">
              <p className="text-muted-foreground">Moving to next question...</p>
            </div>
          )}

          <Button onClick={onClose} variant="outline" className="border-border hover:bg-muted bg-transparent">
            Close Quiz
          </Button>
        </div>
      </Card>
    </div>
  )
}

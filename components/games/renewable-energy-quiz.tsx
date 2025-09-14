"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

interface RenewableEnergyQuizProps {
  onComplete: (score: number) => void
  onClose: () => void
}

interface Question {
  id: number
  question: string
  options: string[]
  correct: number
  explanation: string
  emoji: string
}

const questions: Question[] = [
  {
    id: 1,
    question: "Which energy source is renewable?",
    options: ["Coal", "Solar", "Natural Gas", "Oil"],
    correct: 1,
    explanation: "Solar energy comes from the sun and is unlimited!",
    emoji: "☀️",
  },
  {
    id: 2,
    question: "What does a wind turbine convert wind into?",
    options: ["Heat", "Light", "Electricity", "Sound"],
    correct: 2,
    explanation: "Wind turbines use spinning blades to generate electricity!",
    emoji: "💨",
  },
  {
    id: 3,
    question: "Which is NOT a renewable energy source?",
    options: ["Hydroelectric", "Geothermal", "Nuclear", "Biomass"],
    correct: 2,
    explanation: "Nuclear energy uses uranium, which is a finite resource.",
    emoji: "⚡",
  },
  {
    id: 4,
    question: "What percentage of Earth's energy comes from the sun?",
    options: ["25%", "50%", "75%", "99.9%"],
    correct: 3,
    explanation: "Almost all energy on Earth originally comes from the sun!",
    emoji: "🌍",
  },
  {
    id: 5,
    question: "Which country leads in renewable energy production?",
    options: ["USA", "China", "Germany", "Japan"],
    correct: 1,
    explanation: "China produces the most renewable energy globally!",
    emoji: "🏭",
  },
  {
    id: 6,
    question: "What is the main advantage of renewable energy?",
    options: ["Cheaper", "Unlimited supply", "Faster", "Louder"],
    correct: 1,
    explanation: "Renewable energy sources won't run out like fossil fuels!",
    emoji: "♻️",
  },
  {
    id: 7,
    question: "Which renewable energy works best at night?",
    options: ["Solar", "Wind", "Tidal", "All of them"],
    correct: 1,
    explanation: "Wind energy can be generated 24/7 when there's wind!",
    emoji: "🌙",
  },
  {
    id: 8,
    question: "What do solar panels convert sunlight into?",
    options: ["Heat only", "Electricity only", "Both heat and electricity", "Nothing"],
    correct: 2,
    explanation: "Solar panels can generate both electricity and heat energy!",
    emoji: "🔋",
  },
]

export function RenewableEnergyQuiz({ onComplete, onClose }: RenewableEnergyQuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [gameStarted, setGameStarted] = useState(false)
  const [showResult, setShowResult] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showExplanation, setShowExplanation] = useState(false)
  const [timeLeft, setTimeLeft] = useState(15)
  const [correctAnswers, setCorrectAnswers] = useState(0)

  useEffect(() => {
    if (!gameStarted || showExplanation) return

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleAnswer(-1) // Time's up
          return 15
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [gameStarted, showExplanation, currentQuestion])

  const handleAnswer = (answerIndex: number) => {
    const question = questions[currentQuestion]
    const isCorrect = answerIndex === question.correct

    setSelectedAnswer(answerIndex)
    setShowExplanation(true)

    if (isCorrect) {
      const points = Math.max(10, timeLeft * 2)
      setScore((prev) => prev + points)
      setCorrectAnswers((prev) => prev + 1)
    }
  }

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1)
      setSelectedAnswer(null)
      setShowExplanation(false)
      setTimeLeft(15)
    } else {
      setShowResult(true)
      onComplete(score)
    }
  }

  const getScoreLevel = () => {
    const percentage = (correctAnswers / questions.length) * 100
    if (percentage >= 90) return { level: "Energy Expert", color: "text-green-500", emoji: "🏆" }
    if (percentage >= 70) return { level: "Renewable Rookie", color: "text-blue-500", emoji: "⭐" }
    if (percentage >= 50) return { level: "Learning Learner", color: "text-yellow-500", emoji: "📚" }
    return { level: "Keep Studying", color: "text-orange-500", emoji: "💪" }
  }

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
      <Card className="w-full max-w-2xl p-6 glass border-primary/20">
        <div className="text-center mb-4">
          <h2 className="text-2xl font-bold text-foreground mb-2">⚡ Renewable Energy Quiz</h2>
          <p className="text-muted-foreground">Test your knowledge about clean energy sources!</p>
        </div>

        {!gameStarted ? (
          <div className="text-center">
            <div className="text-6xl mb-4">🔋</div>
            <p className="text-muted-foreground mb-6">Answer questions about renewable energy and earn points!</p>
            <Button
              onClick={() => setGameStarted(true)}
              className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl px-8 py-3 font-semibold"
            >
              Start Quiz!
            </Button>
          </div>
        ) : showResult ? (
          <div className="text-center">
            <div className="text-6xl mb-4">{getScoreLevel().emoji}</div>
            <h3 className="text-2xl font-bold text-foreground mb-2">Quiz Complete!</h3>
            <div className="text-4xl font-bold text-primary mb-2">{score} points</div>
            <div className={`text-xl font-semibold mb-4 ${getScoreLevel().color}`}>{getScoreLevel().level}</div>
            <div className="text-muted-foreground mb-6">
              You got {correctAnswers} out of {questions.length} questions correct!
            </div>
          </div>
        ) : (
          <div>
            <div className="flex justify-between items-center mb-4">
              <div className="text-primary font-bold">
                Question {currentQuestion + 1}/{questions.length}
              </div>
              <div className="text-secondary font-bold">Score: {score}</div>
              <div className="text-accent font-bold">Time: {timeLeft}s</div>
            </div>

            <Progress value={(currentQuestion / questions.length) * 100} className="mb-6" />

            <div className="text-center mb-6">
              <div className="text-4xl mb-4">{questions[currentQuestion].emoji}</div>
              <h3 className="text-xl font-bold text-foreground mb-6">{questions[currentQuestion].question}</h3>

              {!showExplanation ? (
                <div className="space-y-3">
                  {questions[currentQuestion].options.map((option, index) => (
                    <Button
                      key={index}
                      onClick={() => handleAnswer(index)}
                      variant="outline"
                      className="w-full p-4 text-left border-border hover:bg-primary/10 hover:border-primary/30"
                    >
                      {option}
                    </Button>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <div
                      className={`font-semibold mb-2 ${
                        selectedAnswer === questions[currentQuestion].correct ? "text-green-500" : "text-red-500"
                      }`}
                    >
                      {selectedAnswer === questions[currentQuestion].correct
                        ? "✅ Correct!"
                        : selectedAnswer === -1
                          ? "⏰ Time's up!"
                          : "❌ Incorrect"}
                    </div>
                    {selectedAnswer !== questions[currentQuestion].correct && (
                      <div className="text-green-500 font-semibold mb-2">
                        Correct answer: {questions[currentQuestion].options[questions[currentQuestion].correct]}
                      </div>
                    )}
                    <div className="text-muted-foreground">{questions[currentQuestion].explanation}</div>
                  </div>
                  <Button
                    onClick={nextQuestion}
                    className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl px-8 py-3 font-semibold"
                  >
                    {currentQuestion < questions.length - 1 ? "Next Question" : "See Results"}
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="flex justify-center gap-4 mt-6">
          <Button
            onClick={onClose}
            variant="outline"
            className="border-border text-foreground hover:bg-muted bg-transparent"
          >
            Close
          </Button>
        </div>
      </Card>
    </div>
  )
}

"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface Question {
  id: number
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
  animal: string
}

interface WildlifeQuizGameProps {
  onComplete: (score: number) => void
  onClose: () => void
}

export function WildlifeQuizGame({ onComplete, onClose }: WildlifeQuizGameProps) {
  const [score, setScore] = useState(0)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [gameMessage, setGameMessage] = useState("Test your knowledge about India's amazing wildlife!")

  const questions: Question[] = [
    {
      id: 1,
      question: "Which is India's national animal?",
      options: ["Lion", "Tiger", "Elephant", "Leopard"],
      correctAnswer: 1,
      explanation: "The Bengal Tiger is India's national animal, symbolizing strength and grace.",
      animal: "🐅",
    },
    {
      id: 2,
      question: "Where do Asiatic Lions live in India?",
      options: ["Sundarbans", "Gir Forest", "Western Ghats", "Himalayas"],
      correctAnswer: 1,
      explanation: "Gir Forest in Gujarat is the only home of Asiatic Lions in the wild.",
      animal: "🦁",
    },
    {
      id: 3,
      question: "Which bird is known as the 'King of Birds' in India?",
      options: ["Peacock", "Eagle", "Vulture", "Crane"],
      correctAnswer: 0,
      explanation: "The Indian Peacock is the national bird and is called the 'King of Birds'.",
      animal: "🦚",
    },
    {
      id: 4,
      question: "What do Indian elephants primarily eat?",
      options: ["Meat", "Fish", "Plants and fruits", "Insects"],
      correctAnswer: 2,
      explanation: "Indian elephants are herbivores and eat plants, fruits, bark, and leaves.",
      animal: "🐘",
    },
    {
      id: 5,
      question: "Which snake is considered sacred in Indian culture?",
      options: ["Python", "Cobra", "Viper", "Krait"],
      correctAnswer: 1,
      explanation: "The Cobra is revered in Indian culture and associated with Lord Shiva.",
      animal: "🐍",
    },
    {
      id: 6,
      question: "Where do snow leopards live in India?",
      options: ["Thar Desert", "Coastal areas", "Himalayan regions", "Deccan Plateau"],
      correctAnswer: 2,
      explanation: "Snow leopards live in the high Himalayan regions of India.",
      animal: "🐆",
    },
    {
      id: 7,
      question: "Which is the largest deer species in India?",
      options: ["Chital", "Sambar", "Barasingha", "Mouse deer"],
      correctAnswer: 1,
      explanation: "The Sambar is the largest deer species found in Indian forests.",
      animal: "🦌",
    },
    {
      id: 8,
      question: "What is the main threat to Indian wildlife?",
      options: ["Climate change", "Habitat loss", "Poaching", "All of the above"],
      correctAnswer: 3,
      explanation: "Indian wildlife faces multiple threats including habitat loss, poaching, and climate change.",
      animal: "🌍",
    },
  ]

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex)
    setShowResult(true)

    if (answerIndex === questions[currentQuestion].correctAnswer) {
      setScore((prev) => prev + 25)
      setGameMessage("Correct! Well done! 🎉")
    } else {
      setGameMessage("Not quite right, but keep learning! 📚")
    }

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion((prev) => prev + 1)
        setSelectedAnswer(null)
        setShowResult(false)
        setGameMessage("Next question coming up!")
      } else {
        setTimeout(() => onComplete(score + (answerIndex === questions[currentQuestion].correctAnswer ? 25 : 0)), 1000)
      }
    }, 3000)
  }

  const question = questions[currentQuestion]

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
      <Card className="w-full max-w-2xl p-8 glass border-secondary/20">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">Wildlife Conservation Quiz</h2>
          <p className="text-muted-foreground">Learn about India's incredible biodiversity!</p>
          <div className="flex justify-center gap-6 mt-4">
            <span className="text-xl font-bold text-secondary">Score: {score}</span>
            <span className="text-xl font-bold text-accent">
              Question: {currentQuestion + 1}/{questions.length}
            </span>
          </div>
        </div>

        <div className="text-center mb-8">
          <div className="text-6xl mb-4 animate-bounce-gentle">{question.animal}</div>
          <h3 className="text-2xl font-bold text-foreground mb-6">{question.question}</h3>

          {showResult && (
            <div className="mb-6 p-4 bg-card rounded-xl border">
              <p className="text-foreground font-semibold mb-2">{gameMessage}</p>
              <p className="text-muted-foreground text-sm">{question.explanation}</p>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 gap-3 mb-8">
          {question.options.map((option, index) => (
            <Button
              key={index}
              onClick={() => handleAnswerSelect(index)}
              disabled={showResult}
              className={`p-4 text-left justify-start h-auto ${
                showResult
                  ? index === question.correctAnswer
                    ? "bg-secondary/30 border-secondary text-secondary-foreground"
                    : selectedAnswer === index
                      ? "bg-destructive/30 border-destructive text-destructive-foreground"
                      : "bg-muted/30 border-muted text-muted-foreground"
                  : "bg-card hover:bg-primary/10 border-border text-card-foreground"
              }`}
              variant="outline"
            >
              <span className="font-semibold mr-3">{String.fromCharCode(65 + index)}.</span>
              {option}
            </Button>
          ))}
        </div>

        <div className="text-center">
          <Button onClick={onClose} variant="outline" className="border-border hover:bg-muted bg-transparent">
            Close Game
          </Button>
        </div>
      </Card>
    </div>
  )
}

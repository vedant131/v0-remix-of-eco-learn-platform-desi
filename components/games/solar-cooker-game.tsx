"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface Recipe {
  name: string
  emoji: string
  cookTime: number
  difficulty: number
  points: number
}

interface SolarCookerGameProps {
  onComplete: (score: number) => void
  onClose: () => void
}

export function SolarCookerGame({ onComplete, onClose }: SolarCookerGameProps) {
  const [score, setScore] = useState(0)
  const [sunAngle, setSunAngle] = useState(45)
  const [cookerAngle, setCookerAngle] = useState(45)
  const [temperature, setTemperature] = useState(0)
  const [currentRecipe, setCurrentRecipe] = useState<Recipe | null>(null)
  const [cookingProgress, setCookingProgress] = useState(0)
  const [gameTime, setGameTime] = useState(90)
  const [recipesCompleted, setRecipesCompleted] = useState(0)
  const [gameMessage, setGameMessage] = useState(
    "Align your solar cooker with the sun to cook traditional Indian dishes!",
  )

  const recipes: Recipe[] = [
    { name: "Dal", emoji: "🍲", cookTime: 20, difficulty: 1, points: 50 },
    { name: "Rice", emoji: "🍚", cookTime: 15, difficulty: 1, points: 40 },
    { name: "Chapati", emoji: "🫓", cookTime: 10, difficulty: 2, points: 60 },
    { name: "Khichdi", emoji: "🍛", cookTime: 25, difficulty: 2, points: 70 },
    { name: "Sambar", emoji: "🍜", cookTime: 30, difficulty: 3, points: 90 },
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setGameTime((prev) => {
        if (prev <= 1) {
          onComplete(score)
          return 0
        }
        return prev - 1
      })

      // Sun moves across the sky
      setSunAngle((prev) => (prev + 1) % 180)
    }, 1000)

    return () => clearInterval(timer)
  }, [score, onComplete])

  useEffect(() => {
    // Calculate temperature based on alignment
    const alignment = Math.abs(sunAngle - cookerAngle)
    const efficiency = Math.max(0, 100 - alignment * 2)
    setTemperature(Math.floor(efficiency * 2)) // Max 200°C

    if (efficiency > 70) {
      setGameMessage("Perfect alignment! Your cooker is heating up efficiently! ☀️")
    } else if (efficiency > 40) {
      setGameMessage("Good alignment, but you can do better! Adjust the angle!")
    } else {
      setGameMessage("Poor alignment! Adjust your cooker to face the sun!")
    }
  }, [sunAngle, cookerAngle])

  useEffect(() => {
    if (currentRecipe && temperature > 100) {
      const cookingInterval = setInterval(() => {
        setCookingProgress((prev) => {
          const newProgress = prev + temperature / 100
          if (newProgress >= 100) {
            setScore((prevScore) => prevScore + currentRecipe.points)
            setRecipesCompleted((prev) => prev + 1)
            setGameMessage(`${currentRecipe.name} is ready! Delicious! 🎉`)
            setCurrentRecipe(null)
            setCookingProgress(0)
            return 0
          }
          return newProgress
        })
      }, 500)

      return () => clearInterval(cookingInterval)
    }
  }, [currentRecipe, temperature])

  const adjustCooker = (direction: "left" | "right") => {
    setCookerAngle((prev) => {
      if (direction === "left") return Math.max(0, prev - 10)
      return Math.min(180, prev + 10)
    })
  }

  const startCooking = (recipe: Recipe) => {
    if (!currentRecipe) {
      setCurrentRecipe(recipe)
      setCookingProgress(0)
      setGameMessage(`Started cooking ${recipe.name}! Keep the temperature high!`)
    }
  }

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
      <Card className="w-full max-w-4xl p-8 glass border-accent/20">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-foreground mb-2">Solar Cooker Challenge</h2>
          <p className="text-muted-foreground">Use clean solar energy to cook traditional Indian dishes!</p>
          <div className="flex justify-center gap-6 mt-4">
            <span className="text-xl font-bold text-accent">Score: {score}</span>
            <span className="text-xl font-bold text-primary">Temp: {temperature}°C</span>
            <span className="text-xl font-bold text-secondary">Recipes: {recipesCompleted}</span>
            <span className="text-xl font-bold text-foreground">Time: {gameTime}s</span>
          </div>
        </div>

        <div className="relative h-48 bg-gradient-to-b from-yellow-200 to-orange-200 rounded-xl mb-6 overflow-hidden">
          {/* Sun */}
          <div
            className="absolute top-4 text-4xl animate-pulse-glow"
            style={{ left: `${(sunAngle / 180) * 80 + 10}%` }}
          >
            ☀️
          </div>

          {/* Solar cooker */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
            <div
              className="text-4xl transition-transform duration-300"
              style={{ transform: `rotate(${cookerAngle - 90}deg)` }}
            >
              🍳
            </div>
          </div>

          {/* Current recipe cooking */}
          {currentRecipe && (
            <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 text-center">
              <div className="text-2xl animate-bounce-gentle">{currentRecipe.emoji}</div>
              <div className="w-16 bg-border rounded-full h-2 mt-2">
                <div
                  className="bg-accent h-2 rounded-full transition-all duration-500"
                  style={{ width: `${cookingProgress}%` }}
                />
              </div>
            </div>
          )}
        </div>

        <p className="text-center text-foreground mb-6 animate-pulse">{gameMessage}</p>

        <div className="flex justify-center gap-4 mb-6">
          <Button
            onClick={() => adjustCooker("left")}
            className="bg-accent/20 hover:bg-accent/30 text-accent border-2 border-accent/30 rounded-xl px-6 py-2"
          >
            ← Adjust Left
          </Button>
          <Button
            onClick={() => adjustCooker("right")}
            className="bg-accent/20 hover:bg-accent/30 text-accent border-2 border-accent/30 rounded-xl px-6 py-2"
          >
            Adjust Right →
          </Button>
        </div>

        <div className="grid grid-cols-5 gap-2 mb-6">
          {recipes.map((recipe, index) => (
            <Button
              key={index}
              onClick={() => startCooking(recipe)}
              disabled={!!currentRecipe}
              className="flex flex-col items-center p-3 bg-secondary/20 hover:bg-secondary/30 text-secondary border border-secondary/30 rounded-xl disabled:opacity-50"
            >
              <span className="text-2xl mb-1">{recipe.emoji}</span>
              <span className="text-xs">{recipe.name}</span>
              <span className="text-xs">+{recipe.points}</span>
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

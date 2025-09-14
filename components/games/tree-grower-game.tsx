"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface TreeGrowerGameProps {
  onComplete: (score: number) => void
  onClose: () => void
}

export function TreeGrowerGame({ onComplete, onClose }: TreeGrowerGameProps) {
  const [treeStage, setTreeStage] = useState(0)
  const [score, setScore] = useState(0)
  const [waterLevel, setWaterLevel] = useState(50)
  const [sunLevel, setSunLevel] = useState(50)
  const [gameMessage, setGameMessage] = useState("Help your tree grow by giving it water and sunlight!")

  const treeStages = ["🌱", "🌿", "🌳", "🌲", "🌳✨"]

  useEffect(() => {
    const interval = setInterval(() => {
      // Decrease levels over time
      setWaterLevel((prev) => Math.max(0, prev - 2))
      setSunLevel((prev) => Math.max(0, prev - 1))

      // Check if tree can grow
      setWaterLevel((currentWater) => {
        setSunLevel((currentSun) => {
          setTreeStage((currentStage) => {
            if (currentWater > 30 && currentSun > 30 && currentStage < treeStages.length - 1) {
              setScore((prev) => prev + 25)
              setGameMessage("Your tree is growing! 🌟")
              return currentStage + 1
            } else if (currentWater < 20 || currentSun < 20) {
              setGameMessage("Your tree needs more care! 💧☀️")
            }
            return currentStage
          })
          return currentSun
        })
        return currentWater
      })
    }, 2000)

    return () => clearInterval(interval)
  }, [treeStages.length])

  useEffect(() => {
    if (treeStage === treeStages.length - 1) {
      setTimeout(() => {
        onComplete(score)
      }, 2000)
    }
  }, [treeStage, score, onComplete, treeStages.length])

  const addWater = () => {
    setWaterLevel((prev) => Math.min(100, prev + 20))
    setScore((prev) => prev + 5)
  }

  const addSun = () => {
    setSunLevel((prev) => Math.min(100, prev + 15))
    setScore((prev) => prev + 5)
  }

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
      <Card className="w-full max-w-2xl p-8 glass border-secondary/20">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">Tree Grower</h2>
          <p className="text-muted-foreground">Take care of your tree and watch it grow!</p>
          <div className="mt-4">
            <span className="text-2xl font-bold text-secondary">Score: {score}</span>
          </div>
        </div>

        <div className="text-center mb-8">
          <div className="text-9xl mb-4 animate-bounce-gentle">{treeStages[treeStage]}</div>
          <p className="text-lg font-semibold text-foreground animate-pulse">{gameMessage}</p>
        </div>

        <div className="grid grid-cols-2 gap-6 mb-8">
          <div className="text-center">
            <div className="mb-4">
              <span className="text-2xl">💧</span>
              <p className="font-semibold text-foreground">Water Level</p>
            </div>
            <div className="w-full bg-border rounded-full h-4 mb-4">
              <div
                className="bg-primary h-4 rounded-full transition-all duration-500"
                style={{ width: `${waterLevel}%` }}
              />
            </div>
            <Button
              onClick={addWater}
              className="bg-primary/20 hover:bg-primary/30 text-primary border-2 border-primary/30 rounded-xl"
            >
              Add Water 💧
            </Button>
          </div>

          <div className="text-center">
            <div className="mb-4">
              <span className="text-2xl">☀️</span>
              <p className="font-semibold text-foreground">Sunlight Level</p>
            </div>
            <div className="w-full bg-border rounded-full h-4 mb-4">
              <div
                className="bg-accent h-4 rounded-full transition-all duration-500"
                style={{ width: `${sunLevel}%` }}
              />
            </div>
            <Button
              onClick={addSun}
              className="bg-accent/20 hover:bg-accent/30 text-accent border-2 border-accent/30 rounded-xl"
            >
              Add Sun ☀️
            </Button>
          </div>
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

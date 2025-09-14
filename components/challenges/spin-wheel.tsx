"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface SpinWheelProps {
  onReward: (reward: { type: string; value: number; message: string }) => void
  onClose: () => void
}

const rewards = [
  { type: "points", value: 50, message: "Bonus Eco Points!", color: "#4caf50" },
  { type: "points", value: 25, message: "Nice Points Boost!", color: "#2196f3" },
  { type: "streak", value: 1, message: "Streak Bonus Day!", color: "#ff9800" },
  { type: "points", value: 75, message: "Amazing Point Reward!", color: "#9c27b0" },
  { type: "points", value: 30, message: "Good Point Bonus!", color: "#f44336" },
  { type: "multiplier", value: 2, message: "2x Points Next Challenge!", color: "#ffeb3b" },
  { type: "points", value: 40, message: "Solid Point Gain!", color: "#00bcd4" },
  { type: "points", value: 60, message: "Great Point Reward!", color: "#8bc34a" },
]

export function SpinWheel({ onReward, onClose }: SpinWheelProps) {
  const [isSpinning, setIsSpinning] = useState(false)
  const [rotation, setRotation] = useState(0)
  const [selectedReward, setSelectedReward] = useState<(typeof rewards)[0] | null>(null)
  const [showResult, setShowResult] = useState(false)

  const spinWheel = () => {
    if (isSpinning) return

    setIsSpinning(true)
    setShowResult(false)

    // Calculate random rotation (multiple full spins + random position)
    const spins = 5 + Math.random() * 5 // 5-10 full rotations
    const finalPosition = Math.random() * 360
    const totalRotation = rotation + spins * 360 + finalPosition

    setRotation(totalRotation)

    // Determine which reward was selected based on final position
    const normalizedPosition = finalPosition
    const segmentSize = 360 / rewards.length
    const selectedIndex = Math.floor(normalizedPosition / segmentSize)
    const reward = rewards[selectedIndex]

    setTimeout(() => {
      setSelectedReward(reward)
      setShowResult(true)
      setIsSpinning(false)
    }, 3000)
  }

  const claimReward = () => {
    if (selectedReward) {
      onReward(selectedReward)
    }
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
      <Card className="w-full max-w-lg p-8 glass border-accent/20 text-center">
        <h2 className="text-3xl font-bold text-foreground mb-2">🎡 Daily Bonus Wheel</h2>
        <p className="text-muted-foreground mb-6">Spin the wheel for your daily eco-bonus!</p>

        {/* Wheel Container */}
        <div className="relative w-64 h-64 mx-auto mb-6">
          {/* Wheel */}
          <div
            className="w-full h-full rounded-full border-4 border-primary/30 relative overflow-hidden transition-transform duration-3000 ease-out"
            style={{
              transform: `rotate(${rotation}deg)`,
              background: `conic-gradient(${rewards
                .map(
                  (reward, index) =>
                    `${reward.color} ${(index * 360) / rewards.length}deg ${((index + 1) * 360) / rewards.length}deg`,
                )
                .join(", ")})`,
            }}
          >
            {/* Wheel segments with text */}
            {rewards.map((reward, index) => {
              const angle = (360 / rewards.length) * index
              const textAngle = angle + 360 / rewards.length / 2

              return (
                <div
                  key={index}
                  className="absolute w-full h-full flex items-center justify-center text-white font-bold text-xs"
                  style={{
                    transform: `rotate(${textAngle}deg)`,
                    transformOrigin: "center",
                  }}
                >
                  <div
                    className="absolute"
                    style={{
                      top: "20%",
                      transform: `rotate(${-textAngle}deg)`,
                      textShadow: "1px 1px 2px rgba(0,0,0,0.8)",
                    }}
                  >
                    +{reward.value}
                    <br />
                    {reward.type === "points" ? "pts" : reward.type === "streak" ? "day" : "x2"}
                  </div>
                </div>
              )
            })}
          </div>

          {/* Pointer */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2 z-10">
            <div className="w-0 h-0 border-l-4 border-r-4 border-b-8 border-l-transparent border-r-transparent border-b-primary"></div>
          </div>

          {/* Center circle */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-primary rounded-full border-2 border-primary-foreground z-10 flex items-center justify-center">
            <span className="text-primary-foreground text-xs font-bold">🎯</span>
          </div>
        </div>

        {/* Result Display */}
        {showResult && selectedReward && (
          <div className="mb-6 p-4 bg-primary/10 rounded-xl border border-primary/20">
            <div className="text-4xl mb-2">🎉</div>
            <h3 className="text-xl font-bold text-foreground mb-2">{selectedReward.message}</h3>
            <p className="text-lg text-primary font-semibold">
              +{selectedReward.value}{" "}
              {selectedReward.type === "points"
                ? "Eco Points"
                : selectedReward.type === "streak"
                  ? "Streak Day"
                  : "Points Multiplier"}
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3">
          {!showResult ? (
            <>
              <Button
                onClick={onClose}
                variant="outline"
                className="flex-1 border-border hover:bg-muted bg-transparent"
              >
                Maybe Later
              </Button>
              <Button
                onClick={spinWheel}
                disabled={isSpinning}
                className="flex-1 bg-accent text-accent-foreground hover:bg-accent/90 rounded-xl font-semibold"
              >
                {isSpinning ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-accent-foreground/30 border-t-accent-foreground rounded-full animate-spin" />
                    Spinning...
                  </div>
                ) : (
                  "Spin Wheel! 🎡"
                )}
              </Button>
            </>
          ) : (
            <Button
              onClick={claimReward}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl font-semibold animate-pulse-glow"
            >
              Claim Reward! ✨
            </Button>
          )}
        </div>

        {/* Sparkle effects during spin */}
        {isSpinning && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(15)].map((_, i) => (
              <div
                key={i}
                className="absolute animate-ping text-yellow-400"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                  fontSize: "20px",
                }}
              >
                ✨
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  )
}

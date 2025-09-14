"use client"

import { useEffect, useState } from "react"

interface AnimatedProgressBarProps {
  label: string
  value: number
  maxValue: number
  icon: string
  color: "primary" | "secondary" | "accent"
  animationType: "tree" | "water" | "co2"
}

export function AnimatedProgressBar({ label, value, maxValue, icon, color, animationType }: AnimatedProgressBarProps) {
  const [animatedValue, setAnimatedValue] = useState(0)
  const percentage = (value / maxValue) * 100

  const colorClasses = {
    primary: "bg-primary",
    secondary: "bg-secondary",
    accent: "bg-accent",
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedValue(value)
    }, 500)
    return () => clearTimeout(timer)
  }, [value])

  const getAnimationIcon = () => {
    if (animationType === "tree") {
      const treeStages = ["🌱", "🌿", "🌳", "🌲"]
      const stage = Math.floor((percentage / 100) * (treeStages.length - 1))
      return treeStages[stage]
    }
    if (animationType === "water") {
      return percentage > 75 ? "💧" : percentage > 50 ? "💧" : percentage > 25 ? "💧" : "💧"
    }
    if (animationType === "co2") {
      return percentage > 75 ? "🌍" : percentage > 50 ? "🌱" : "⚡"
    }
    return icon
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-2xl animate-bounce-gentle">{getAnimationIcon()}</span>
          <span className="font-semibold text-foreground">{label}</span>
        </div>
        <span className="text-sm font-bold text-primary">
          {animatedValue.toLocaleString()} / {maxValue.toLocaleString()}
        </span>
      </div>

      <div className="relative">
        <div className="w-full bg-border rounded-full h-4 overflow-hidden">
          <div
            className={`h-4 rounded-full transition-all duration-2000 ease-out ${colorClasses[color]}`}
            style={{ width: `${(animatedValue / maxValue) * 100}%` }}
          />
        </div>

        {animationType === "water" && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse rounded-full" />
          </div>
        )}
      </div>

      <div className="text-center">
        <span className="text-xs text-muted-foreground">{percentage.toFixed(1)}% Complete</span>
      </div>
    </div>
  )
}

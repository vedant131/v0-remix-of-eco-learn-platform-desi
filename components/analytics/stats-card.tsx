"use client"

import { Card } from "@/components/ui/card"
import type { ReactNode } from "react"

interface StatsCardProps {
  title: string
  value: string | number
  subtitle: string
  icon: ReactNode
  color: "primary" | "secondary" | "accent"
  trend?: "up" | "down" | "neutral"
}

export function StatsCard({ title, value, subtitle, icon, color, trend }: StatsCardProps) {
  const colorClasses = {
    primary: "border-primary/20 bg-gradient-to-br from-primary/10 to-primary/5",
    secondary: "border-secondary/20 bg-gradient-to-br from-secondary/10 to-secondary/5",
    accent: "border-accent/20 bg-gradient-to-br from-accent/10 to-accent/5",
  }

  const trendIcons = {
    up: "📈",
    down: "📉",
    neutral: "➡️",
  }

  return (
    <Card className={`p-6 glass hover:scale-105 transition-all duration-300 ${colorClasses[color]}`}>
      <div className="flex items-start justify-between mb-4">
        <div className="text-3xl animate-float">{icon}</div>
        {trend && <span className="text-lg">{trendIcons[trend]}</span>}
      </div>

      <div>
        <h3 className="text-sm font-medium text-muted-foreground mb-1">{title}</h3>
        <div className="text-3xl font-bold text-foreground mb-1">{value}</div>
        <p className="text-sm text-muted-foreground">{subtitle}</p>
      </div>
    </Card>
  )
}

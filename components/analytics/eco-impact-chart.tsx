"use client"

import { Card } from "@/components/ui/card"
import { useState, useEffect } from "react"

interface EcoImpactData {
  month: string
  trees: number
  water: number
  co2: number
  points: number
}

const sampleData: EcoImpactData[] = [
  { month: "Jan", trees: 2, water: 150, co2: 8, points: 234 },
  { month: "Feb", trees: 4, water: 280, co2: 15, points: 456 },
  { month: "Mar", trees: 3, water: 320, co2: 18, points: 567 },
  { month: "Apr", trees: 6, water: 450, co2: 25, points: 789 },
  { month: "May", trees: 8, water: 520, co2: 32, points: 892 },
  { month: "Jun", trees: 12, water: 850, co2: 45, points: 1247 },
]

export function EcoImpactChart() {
  const [animatedData, setAnimatedData] = useState<EcoImpactData[]>([])

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedData(sampleData)
    }, 500)
    return () => clearTimeout(timer)
  }, [])

  const maxPoints = Math.max(...sampleData.map((d) => d.points))

  return (
    <Card className="p-6 glass border-primary/20">
      <h3 className="text-xl font-bold text-foreground mb-6">Your Eco Impact Over Time</h3>

      <div className="space-y-6">
        {/* Chart */}
        <div className="relative h-48 flex items-end justify-between gap-2">
          {animatedData.map((data, index) => (
            <div key={data.month} className="flex-1 flex flex-col items-center">
              <div
                className="w-full bg-gradient-to-t from-primary to-secondary rounded-t-lg transition-all duration-1000 ease-out flex items-end justify-center pb-2"
                style={{
                  height: `${(data.points / maxPoints) * 100}%`,
                  minHeight: "20px",
                }}
              >
                <span className="text-xs font-bold text-white">{data.points}</span>
              </div>
              <span className="text-sm font-medium text-muted-foreground mt-2">{data.month}</span>
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border/20">
          <div className="text-center">
            <div className="text-2xl mb-1">🌳</div>
            <div className="text-lg font-bold text-secondary">{sampleData[sampleData.length - 1].trees}</div>
            <div className="text-xs text-muted-foreground">Trees Planted</div>
          </div>

          <div className="text-center">
            <div className="text-2xl mb-1">💧</div>
            <div className="text-lg font-bold text-primary">{sampleData[sampleData.length - 1].water}L</div>
            <div className="text-xs text-muted-foreground">Water Saved</div>
          </div>

          <div className="text-center">
            <div className="text-2xl mb-1">🌍</div>
            <div className="text-lg font-bold text-accent">{sampleData[sampleData.length - 1].co2}kg</div>
            <div className="text-xs text-muted-foreground">CO₂ Reduced</div>
          </div>
        </div>
      </div>
    </Card>
  )
}

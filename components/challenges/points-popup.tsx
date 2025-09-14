"use client"

import { useEffect, useState } from "react"

interface PointsPopupProps {
  points: number
  show: boolean
  onComplete: () => void
}

export function PointsPopup({ points, show, onComplete }: PointsPopupProps) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (show) {
      setVisible(true)
      const timer = setTimeout(() => {
        setVisible(false)
        onComplete()
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [show, onComplete])

  if (!visible) return null

  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-none">
      <div className="bg-primary text-primary-foreground px-6 py-3 rounded-xl font-bold text-xl animate-bounce shadow-lg">
        +{points} Eco Points! 🌟
      </div>
    </div>
  )
}

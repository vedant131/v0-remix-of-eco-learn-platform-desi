"use client"

import { useEffect, useState } from "react"

interface FloatingElement {
  id: number
  type: "cloud" | "leaf" | "bird"
  x: number
  y: number
  delay: number
  size: number
}

export function EcoBackground() {
  const [elements, setElements] = useState<FloatingElement[]>([])

  useEffect(() => {
    const generateElements = () => {
      const newElements: FloatingElement[] = []

      for (let i = 0; i < 5; i++) {
        newElements.push({
          id: i,
          type: "cloud",
          x: Math.random() * 100,
          y: 10 + Math.random() * 20,
          delay: i * 3,
          size: 60 + Math.random() * 40,
        })
      }

      for (let i = 0; i < 12; i++) {
        newElements.push({
          id: i + 10,
          type: "leaf",
          x: Math.random() * 100,
          y: -10,
          delay: i * 1.5,
          size: 20 + Math.random() * 15,
        })
      }

      for (let i = 0; i < 4; i++) {
        newElements.push({
          id: i + 20,
          type: "bird",
          x: -10,
          y: 15 + Math.random() * 30,
          delay: i * 8,
          size: 30 + Math.random() * 20,
        })
      }

      setElements(newElements)
    }

    generateElements()
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/30 via-primary/20 to-accent/30" />

      <div className="absolute top-8 right-8 w-20 h-20 bg-yellow-400 rounded-full animate-pulse-glow opacity-90 shadow-lg">
        <div className="absolute inset-2 bg-yellow-300 rounded-full animate-pulse" />
      </div>

      {/* Floating Elements */}
      {elements.map((element) => (
        <div
          key={element.id}
          className={`absolute ${
            element.type === "cloud" ? "animate-drift" : element.type === "leaf" ? "animate-fall" : "animate-drift"
          }`}
          style={{
            left: `${element.x}%`,
            top: `${element.y}%`,
            animationDelay: `${element.delay}s`,
            width: `${element.size}px`,
            height: `${element.size}px`,
          }}
        >
          {element.type === "cloud" && (
            <div className="w-full h-full bg-white/50 rounded-full relative shadow-lg">
              <div className="absolute -top-2 left-2 w-3/4 h-3/4 bg-white/40 rounded-full" />
              <div className="absolute -top-1 right-2 w-1/2 h-1/2 bg-white/40 rounded-full" />
            </div>
          )}
          {element.type === "leaf" && (
            <div className="w-full h-full bg-green-400/70 rounded-full transform rotate-45 relative animate-wiggle">
              <div className="absolute inset-0 bg-green-500/50 rounded-full transform -rotate-90" />
            </div>
          )}
          {element.type === "bird" && (
            <div className="w-full h-full relative animate-sway">
              <div className="absolute inset-0 bg-gray-600/40 rounded-full transform scale-x-150" />
              <div className="absolute top-1/2 left-1/4 w-1/2 h-1 bg-gray-700/50 rounded-full" />
            </div>
          )}
        </div>
      ))}

      {/* Rolling Hills */}
      <div className="absolute bottom-0 left-0 right-0 h-32">
        <svg viewBox="0 0 1200 120" className="w-full h-full">
          <path
            d="M0,60 C300,20 600,100 900,60 C1050,30 1150,80 1200,60 L1200,120 L0,120 Z"
            fill="currentColor"
            className="text-secondary/30"
          />
          <path
            d="M0,80 C200,40 400,100 600,70 C800,40 1000,90 1200,70 L1200,120 L0,120 Z"
            fill="currentColor"
            className="text-secondary/20"
          />
        </svg>
      </div>
    </div>
  )
}

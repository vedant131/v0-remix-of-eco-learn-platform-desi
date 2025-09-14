"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"

interface Habit {
  id: string
  name: string
  icon: string
  completed: boolean
  streak: number
}

interface HabitTrackerProps {
  onStreakUpdate: (totalStreak: number) => void
}

export function HabitTracker({ onStreakUpdate }: HabitTrackerProps) {
  const [habits, setHabits] = useState<Habit[]>([
    { id: "lights", name: "Switch off lights", icon: "💡", completed: false, streak: 12 },
    { id: "water", name: "Save water", icon: "🚰", completed: false, streak: 8 },
    { id: "recycle", name: "Recycle waste", icon: "♻️", completed: false, streak: 15 },
    { id: "walk", name: "Walk/bike instead of car", icon: "🚶", completed: false, streak: 5 },
    { id: "plastic", name: "Avoid single-use plastic", icon: "🥤", completed: false, streak: 10 },
  ])

  const [todayCompleted, setTodayCompleted] = useState(0)

  useEffect(() => {
    // Load today's progress from localStorage
    const today = new Date().toDateString()
    const savedProgress = localStorage.getItem(`habits-${today}`)
    if (savedProgress) {
      const progress = JSON.parse(savedProgress)
      setHabits((prev) =>
        prev.map((habit) => ({
          ...habit,
          completed: progress[habit.id] || false,
        })),
      )
    }
  }, [])

  useEffect(() => {
    const completed = habits.filter((h) => h.completed).length
    setTodayCompleted(completed)

    // Calculate total streak (average of all habit streaks)
    const totalStreak = Math.round(habits.reduce((acc, habit) => acc + habit.streak, 0) / habits.length)
    onStreakUpdate(totalStreak)
  }, [habits, onStreakUpdate])

  const toggleHabit = (habitId: string) => {
    setHabits((prev) => {
      const updated = prev.map((habit) => (habit.id === habitId ? { ...habit, completed: !habit.completed } : habit))

      // Save to localStorage
      const today = new Date().toDateString()
      const progress = updated.reduce(
        (acc, habit) => ({
          ...acc,
          [habit.id]: habit.completed,
        }),
        {},
      )
      localStorage.setItem(`habits-${today}`, JSON.stringify(progress))

      return updated
    })
  }

  const getStreakTree = (streak: number) => {
    if (streak < 3) return "🌱"
    if (streak < 7) return "🌿"
    if (streak < 14) return "🌳"
    return "🌲"
  }

  return (
    <Card className="p-6 glass border-secondary/20">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-foreground">🌱 Daily Eco Habits</h3>
        <div className="text-sm text-muted-foreground">
          {todayCompleted}/{habits.length} completed today
        </div>
      </div>

      {/* Progress bar */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-muted-foreground mb-2">
          <span>Today's Progress</span>
          <span>{Math.round((todayCompleted / habits.length) * 100)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-500"
            style={{ width: `${(todayCompleted / habits.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Habit list */}
      <div className="space-y-3">
        {habits.map((habit) => (
          <div
            key={habit.id}
            className="flex items-center gap-3 p-3 rounded-lg bg-background/50 hover:bg-background/70 transition-colors"
          >
            <Checkbox
              checked={habit.completed}
              onCheckedChange={() => toggleHabit(habit.id)}
              className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
            />
            <div className="flex-1 flex items-center gap-2">
              <span className="text-lg">{habit.icon}</span>
              <span
                className={`font-medium ${habit.completed ? "text-muted-foreground line-through" : "text-foreground"}`}
              >
                {habit.name}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-lg animate-sway">{getStreakTree(habit.streak)}</span>
              <div className="text-right">
                <div className="text-sm font-bold text-primary">{habit.streak}</div>
                <div className="text-xs text-muted-foreground">day streak</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Completion celebration */}
      {todayCompleted === habits.length && (
        <div className="mt-4 p-4 bg-primary/10 rounded-lg text-center border border-primary/20">
          <div className="text-2xl mb-2">🎉</div>
          <div className="font-bold text-primary">Perfect Day!</div>
          <div className="text-sm text-muted-foreground">You completed all your eco habits today!</div>
        </div>
      )}
    </Card>
  )
}

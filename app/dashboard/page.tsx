"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { NavigationCard } from "@/components/dashboard/navigation-card"
import { ProgressRing } from "@/components/dashboard/progress-ring"
import { EcoQuoteTicker } from "@/components/dashboard/eco-quote-ticker"
import { UserAvatar } from "@/components/dashboard/user-avatar"
import { EcoBackground } from "@/components/eco-background"
import { AIChatbot } from "@/components/ai-chatbot"
import { EcoGarden } from "@/components/dashboard/eco-garden"
import { HabitTracker } from "@/components/dashboard/habit-tracker"
import { StreakTree } from "@/components/dashboard/streak-tree"
import Link from "next/link"

export default function DashboardPage() {
  const [userName, setUserName] = useState("EcoHero")
  const [userPoints, setUserPoints] = useState(2847)
  const [streakDays, setStreakDays] = useState(12)

  useEffect(() => {
    // In a real app, this would come from user authentication
    const savedName = localStorage.getItem("ecolearn-username") || "EcoHero"
    const savedPoints = Number.parseInt(localStorage.getItem("ecolearn-points") || "2847")
    setUserName(savedName)
    setUserPoints(savedPoints)
  }, [])

  const handleStreakUpdate = (newStreak: number) => {
    setStreakDays(newStreak)
  }

  return (
    <div className="min-h-screen relative">
      <EcoBackground />

      {/* Header */}
      <header className="relative z-10 p-6 border-b border-border/20 bg-background/80 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <UserAvatar />
            <div>
              <h1 className="text-2xl font-bold text-foreground">🌱 Welcome back, {userName}!</h1>
              <p className="text-muted-foreground">Ready to continue saving the planet?</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Eco Points</p>
              <p className="text-2xl font-bold text-primary">{userPoints.toLocaleString()}</p>
            </div>
            <Link href="/profile">
              <Button variant="outline" className="border-primary/30 text-primary hover:bg-primary/10 bg-transparent">
                Profile
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Dashboard */}
      <main className="relative z-10 p-6">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Eco Garden & Habit Tracker Section */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">🌱 Your Eco Dashboard</h2>
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Eco Garden - takes up 2 columns */}
              <div className="lg:col-span-2">
                <EcoGarden userPoints={userPoints} streakDays={streakDays} />
              </div>

              {/* Streak Tree */}
              <StreakTree streakDays={streakDays} />
            </div>
          </section>

          {/* Habit Tracker */}
          <section>
            <HabitTracker onStreakUpdate={handleStreakUpdate} />
          </section>

          {/* Progress Overview */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">Your Eco Journey</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="p-6 glass border-primary/20">
                <div className="text-center">
                  <ProgressRing progress={82} color="#4caf50" />
                  <h3 className="text-lg font-semibold text-foreground mt-4">Overall Progress</h3>
                  <p className="text-muted-foreground">Amazing progress, eco-warrior!</p>
                </div>
              </Card>

              <Card className="p-6 glass border-secondary/20">
                <div className="text-center">
                  <ProgressRing progress={73} color="#ffeb3b" />
                  <h3 className="text-lg font-semibold text-foreground mt-4">Challenges Completed</h3>
                  <p className="text-muted-foreground">8 out of 11 this month</p>
                </div>
              </Card>

              <Card className="p-6 glass border-accent/20">
                <div className="text-center">
                  <ProgressRing progress={64} color="#ff9800" />
                  <h3 className="text-lg font-semibold text-foreground mt-4">Lessons Learned</h3>
                  <p className="text-muted-foreground">7 out of 11 modules</p>
                </div>
              </Card>
            </div>
          </section>

          {/* Navigation Cards */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">What would you like to do today?</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <NavigationCard
                title="Games"
                description="Play fun eco-games and earn points while learning!"
                icon={<span className="text-2xl">🎮</span>}
                href="/games"
                color="primary"
                stats="8 games"
              />

              <NavigationCard
                title="Lessons"
                description="Explore interactive lessons about our environment"
                icon={<span className="text-2xl">📚</span>}
                href="/lessons"
                color="secondary"
                stats="16 lessons"
              />

              <NavigationCard
                title="Challenges"
                description="Take on daily eco-challenges and build your streak!"
                icon={<span className="text-2xl">🌱</span>}
                href="/challenges"
                color="accent"
                stats="16 challenges"
              />

              <NavigationCard
                title="Leaderboard"
                description="See how you rank among other eco-heroes"
                icon={<span className="text-2xl">🏆</span>}
                href="/leaderboard"
                color="primary"
                stats="#12"
              />

              <NavigationCard
                title="Progress"
                description="Track your learning journey and achievements"
                icon={<span className="text-2xl">📊</span>}
                href="/progress"
                color="secondary"
                stats="82% complete"
              />

              <NavigationCard
                title="Community"
                description="Connect with other young eco-warriors"
                icon={<span className="text-2xl">👥</span>}
                href="/community"
                color="accent"
                stats="38 online"
              />
            </div>
          </section>

          {/* Recent Activity */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">Recent Activity</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="p-6 glass border-primary/20">
                <h3 className="text-xl font-semibold text-foreground mb-4">Latest Achievements</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-secondary/20 rounded-full flex items-center justify-center">
                      <span className="text-sm">🌊</span>
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Ocean Guardian</p>
                      <p className="text-sm text-muted-foreground">Completed Ocean Cleanup game</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                      <span className="text-sm">☀️</span>
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Solar Expert</p>
                      <p className="text-sm text-muted-foreground">Mastered Solar Panel Optimizer</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-accent/20 rounded-full flex items-center justify-center">
                      <span className="text-sm">🦋</span>
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Habitat Builder</p>
                      <p className="text-sm text-muted-foreground">Created perfect wildlife habitats</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-secondary/20 rounded-full flex items-center justify-center">
                      <span className="text-sm">🚲</span>
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Green Commuter</p>
                      <p className="text-sm text-muted-foreground">Completed Bike to School challenge</p>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-6 glass border-secondary/20">
                <h3 className="text-xl font-semibold text-foreground mb-4">Streak Status</h3>
                <div className="text-center">
                  <div className="text-4xl font-bold text-secondary mb-2">12</div>
                  <p className="text-lg font-semibold text-foreground mb-2">Day Streak!</p>
                  <p className="text-muted-foreground mb-4">Outstanding! Your eco-tree is flourishing.</p>
                  <div className="flex justify-center">
                    <div className="flex gap-2">
                      {[...Array(12)].map((_, i) => (
                        <div key={i} className="w-2 h-2 bg-secondary rounded-full animate-pulse" />
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">Platform Stats</h2>
            <div className="grid md:grid-cols-4 gap-4">
              <Card className="p-4 glass border-primary/20 text-center">
                <div className="text-2xl font-bold text-primary mb-1">13</div>
                <p className="text-sm text-muted-foreground">Interactive Games</p>
              </Card>
              <Card className="p-4 glass border-secondary/20 text-center">
                <div className="text-2xl font-bold text-secondary mb-1">16</div>
                <p className="text-sm text-muted-foreground">Learning Lessons</p>
              </Card>
              <Card className="p-4 glass border-accent/20 text-center">
                <div className="text-2xl font-bold text-accent mb-1">16</div>
                <p className="text-sm text-muted-foreground">Eco Challenges</p>
              </Card>
              <Card className="p-4 glass border-primary/20 text-center">
                <div className="text-2xl font-bold text-primary mb-1">45</div>
                <p className="text-sm text-muted-foreground">Total Activities</p>
              </Card>
            </div>
          </section>
        </div>
      </main>

      {/* Eco Quote Ticker */}
      <EcoQuoteTicker />

      <AIChatbot />
    </div>
  )
}

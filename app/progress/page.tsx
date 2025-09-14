"use client"

import { AnimatedProgressBar } from "@/components/analytics/animated-progress-bar"
import { StatsCard } from "@/components/analytics/stats-card"
import { EcoBackground } from "@/components/eco-background"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"

export default function ProgressPage() {
  return (
    <div className="min-h-screen relative">
      <EcoBackground />

      {/* Header */}
      <header className="relative z-10 p-6 border-b border-border/20 bg-background/80 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">📊 Your Progress</h1>
            <p className="text-muted-foreground">Track your eco-learning journey and achievements!</p>
          </div>
          <Link href="/dashboard">
            <Button variant="outline" className="border-primary/30 text-primary hover:bg-primary/10 bg-transparent">
              Back to Dashboard
            </Button>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 p-6">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Overall Stats */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-6">Overall Statistics</h2>
            <div className="grid md:grid-cols-4 gap-6">
              <StatsCard
                title="Total Points"
                value="1,247"
                subtitle="eco points earned"
                icon="⭐"
                color="primary"
                trend="up"
              />

              <StatsCard
                title="Lessons Completed"
                value="17/20"
                subtitle="modules finished"
                icon="📚"
                color="secondary"
                trend="up"
              />

              <StatsCard
                title="Games Played"
                value="24"
                subtitle="total sessions"
                icon="🎮"
                color="accent"
                trend="up"
              />

              <StatsCard
                title="Current Streak"
                value="7 days"
                subtitle="daily activity"
                icon="🔥"
                color="primary"
                trend="up"
              />
            </div>
          </section>

          {/* Detailed Progress */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-6">Detailed Progress</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {/* Environmental Impact */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-foreground">Environmental Impact</h3>

                <Card className="p-6 glass border-secondary/20">
                  <AnimatedProgressBar
                    label="Trees Planted"
                    value={12}
                    maxValue={20}
                    icon="🌳"
                    color="secondary"
                    animationType="tree"
                  />
                </Card>

                <Card className="p-6 glass border-primary/20">
                  <AnimatedProgressBar
                    label="Water Conserved"
                    value={850}
                    maxValue={1000}
                    icon="💧"
                    color="primary"
                    animationType="water"
                  />
                </Card>

                <Card className="p-6 glass border-accent/20">
                  <AnimatedProgressBar
                    label="CO₂ Footprint Reduced"
                    value={45}
                    maxValue={100}
                    icon="🌍"
                    color="accent"
                    animationType="co2"
                  />
                </Card>
              </div>

              {/* Learning Progress */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-foreground">Learning Progress</h3>

                <Card className="p-6 glass border-primary/20">
                  <AnimatedProgressBar
                    label="Environmental Basics"
                    value={4}
                    maxValue={5}
                    icon="🌱"
                    color="primary"
                    animationType="tree"
                  />
                </Card>

                <Card className="p-6 glass border-secondary/20">
                  <AnimatedProgressBar
                    label="Advanced Topics"
                    value={2}
                    maxValue={6}
                    icon="🧠"
                    color="secondary"
                    animationType="water"
                  />
                </Card>

                <Card className="p-6 glass border-accent/20">
                  <AnimatedProgressBar
                    label="Action Challenges"
                    value={8}
                    maxValue={10}
                    icon="⚡"
                    color="accent"
                    animationType="co2"
                  />
                </Card>
              </div>
            </div>
          </section>

          {/* Recent Activity */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-6">Recent Activity</h2>
            <Card className="p-6 glass border-primary/20">
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-3 bg-secondary/10 rounded-xl">
                  <span className="text-2xl">🌳</span>
                  <div className="flex-1">
                    <p className="font-semibold text-foreground">Completed Tree Grower Game</p>
                    <p className="text-sm text-muted-foreground">Earned 150 eco points • 2 hours ago</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-3 bg-primary/10 rounded-xl">
                  <span className="text-2xl">📚</span>
                  <div className="flex-1">
                    <p className="font-semibold text-foreground">Finished Water Cycle Lesson</p>
                    <p className="text-sm text-muted-foreground">Earned 75 eco points • 1 day ago</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-3 bg-accent/10 rounded-xl">
                  <span className="text-2xl">🌱</span>
                  <div className="flex-1">
                    <p className="font-semibold text-foreground">Completed Plant a Seed Challenge</p>
                    <p className="text-sm text-muted-foreground">Earned 50 eco points • 2 days ago</p>
                  </div>
                </div>
              </div>
            </Card>
          </section>
        </div>
      </main>
    </div>
  )
}

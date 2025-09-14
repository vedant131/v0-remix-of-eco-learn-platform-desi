"use client"

import { useState } from "react"
import { LeaderboardEntry } from "@/components/leaderboard/leaderboard-entry"
import { AnimatedProgressBar } from "@/components/analytics/animated-progress-bar"
import { LevelUpAnimation } from "@/components/analytics/level-up-animation"
import { StatsCard } from "@/components/analytics/stats-card"
import { EcoImpactChart } from "@/components/analytics/eco-impact-chart"
import { WeeklyInsights } from "@/components/analytics/weekly-insights"
import { EcoBackground } from "@/components/eco-background"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"

interface LeaderboardUser {
  id: string
  name: string
  points: number
  avatar: "sapling" | "droplet" | "recycle"
  level: string
}

const leaderboardData: LeaderboardUser[] = [
  { id: "1", name: "Emma Green", points: 2847, avatar: "sapling", level: "Eco Master" },
  { id: "2", name: "Alex Rivers", points: 2634, avatar: "droplet", level: "Planet Protector" },
  { id: "3", name: "Maya Forest", points: 2521, avatar: "recycle", level: "Nature Guardian" },
  { id: "4", name: "Sam Ocean", points: 2398, avatar: "sapling", level: "Earth Defender" },
  { id: "5", name: "Luna Sky", points: 2156, avatar: "droplet", level: "Green Champion" },
  { id: "6", name: "Rio Earth", points: 1987, avatar: "recycle", level: "Eco Warrior" },
  { id: "7", name: "Sage Wind", points: 1834, avatar: "sapling", level: "Climate Hero" },
  { id: "8", name: "Coral Reef", points: 1723, avatar: "droplet", level: "Sustainability Star" },
  { id: "9", name: "Forest Pine", points: 1654, avatar: "recycle", level: "Green Guardian" },
  { id: "10", name: "River Stone", points: 1587, avatar: "sapling", level: "Eco Explorer" },
  { id: "11", name: "You", points: 1247, avatar: "sapling", level: "Nature Lover" },
]

export default function LeaderboardPage() {
  const [showLevelUp, setShowLevelUp] = useState(false)
  const [currentUserRank] = useState(15)

  const handleLevelUp = () => {
    setShowLevelUp(true)
  }

  const currentUser = leaderboardData.find((user) => user.name === "You")
  const topUsers = leaderboardData.slice(0, 10)

  return (
    <div className="min-h-screen relative">
      <EcoBackground />

      {/* Header */}
      <header className="relative z-10 p-6 border-b border-border/20 bg-background/80 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">🏆 Leaderboard & Analytics</h1>
            <p className="text-muted-foreground">See how you rank among other eco-heroes!</p>
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
          {/* Your Stats Overview */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-6">Your Performance</h2>
            <div className="grid md:grid-cols-4 gap-6">
              <StatsCard
                title="Current Rank"
                value={`#${currentUserRank}`}
                subtitle="out of 1,247 users"
                icon="🏅"
                color="primary"
                trend="up"
              />

              <StatsCard
                title="Total Points"
                value="1,247"
                subtitle="eco points earned"
                icon="⭐"
                color="secondary"
                trend="up"
              />

              <StatsCard
                title="Current Level"
                value="Nature Lover"
                subtitle="next: Eco Explorer"
                icon="🌱"
                color="accent"
                trend="neutral"
              />

              <StatsCard
                title="Weekly Progress"
                value="+156"
                subtitle="points this week"
                icon="📊"
                color="primary"
                trend="up"
              />
            </div>
          </section>

          {/* Detailed Analytics Section */}
          <section className="grid lg:grid-cols-2 gap-8">
            <EcoImpactChart />
            <WeeklyInsights />
          </section>

          {/* Progress Analytics */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-6">Your Growth Journey</h2>
            <div className="grid md:grid-cols-3 gap-6">
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
                  label="Water Saved"
                  value={850}
                  maxValue={1000}
                  icon="💧"
                  color="primary"
                  animationType="water"
                />
              </Card>

              <Card className="p-6 glass border-accent/20">
                <AnimatedProgressBar
                  label="CO₂ Reduced"
                  value={45}
                  maxValue={100}
                  icon="🌍"
                  color="accent"
                  animationType="co2"
                />
              </Card>
            </div>
          </section>

          {/* Leaderboard Tabs */}
          <section>
            <Tabs defaultValue="global" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger value="global">Global Leaderboard</TabsTrigger>
                <TabsTrigger value="friends">Friends</TabsTrigger>
                <TabsTrigger value="achievements">Achievements</TabsTrigger>
              </TabsList>

              <TabsContent value="global" className="space-y-4">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-foreground">Top Eco-Heroes</h2>
                  <Button
                    onClick={handleLevelUp}
                    variant="outline"
                    className="border-secondary/30 text-secondary hover:bg-secondary/10 bg-transparent"
                  >
                    Simulate Level Up
                  </Button>
                </div>

                {/* Your Position */}
                {currentUser && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-foreground mb-3">Your Position</h3>
                    <LeaderboardEntry
                      rank={currentUserRank}
                      name={currentUser.name}
                      points={currentUser.points}
                      avatar={currentUser.avatar}
                      level={currentUser.level}
                      isCurrentUser={true}
                    />
                  </div>
                )}

                {/* Top 10 */}
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-3">Top 10 Leaders</h3>
                  <div className="space-y-3">
                    {topUsers.map((user, index) => (
                      <LeaderboardEntry
                        key={user.id}
                        rank={index + 1}
                        name={user.name}
                        points={user.points}
                        avatar={user.avatar}
                        level={user.level}
                        isCurrentUser={user.name === "You"}
                      />
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="friends" className="space-y-4">
                <h2 className="text-2xl font-bold text-foreground mb-6">Friends Leaderboard</h2>
                <Card className="p-8 glass border-primary/20 text-center">
                  <div className="text-6xl mb-4">👥</div>
                  <h3 className="text-xl font-bold text-foreground mb-2">Connect with Friends!</h3>
                  <p className="text-muted-foreground mb-6">
                    Add friends to see how you compare and motivate each other to save the planet!
                  </p>
                  <Button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl">
                    Add Friends
                  </Button>
                </Card>
              </TabsContent>

              <TabsContent value="achievements" className="space-y-4">
                <h2 className="text-2xl font-bold text-foreground mb-6">Your Achievements</h2>
                <div className="grid md:grid-cols-3 gap-6">
                  <Card className="p-6 glass border-secondary/20 text-center">
                    <div className="text-4xl mb-3">🌳</div>
                    <h3 className="font-bold text-foreground mb-2">Tree Planter</h3>
                    <p className="text-sm text-muted-foreground">Planted 10 trees</p>
                  </Card>

                  <Card className="p-6 glass border-primary/20 text-center">
                    <div className="text-4xl mb-3">💧</div>
                    <h3 className="font-bold text-foreground mb-2">Water Saver</h3>
                    <p className="text-sm text-muted-foreground">Saved 500L of water</p>
                  </Card>

                  <Card className="p-6 glass border-accent/20 text-center">
                    <div className="text-4xl mb-3">♻️</div>
                    <h3 className="font-bold text-foreground mb-2">Recycling Champion</h3>
                    <p className="text-sm text-muted-foreground">Recycled 50 items</p>
                  </Card>

                  <Card className="p-6 glass border-border/20 text-center opacity-50">
                    <div className="text-4xl mb-3">🌍</div>
                    <h3 className="font-bold text-foreground mb-2">Planet Protector</h3>
                    <p className="text-sm text-muted-foreground">Complete 100 challenges</p>
                    <div className="mt-2 text-xs text-muted-foreground">🔒 Locked</div>
                  </Card>

                  <Card className="p-6 glass border-border/20 text-center opacity-50">
                    <div className="text-4xl mb-3">⚡</div>
                    <h3 className="font-bold text-foreground mb-2">Energy Saver</h3>
                    <p className="text-sm text-muted-foreground">Save 1000kWh energy</p>
                    <div className="mt-2 text-xs text-muted-foreground">🔒 Locked</div>
                  </Card>

                  <Card className="p-6 glass border-border/20 text-center opacity-50">
                    <div className="text-4xl mb-3">🏆</div>
                    <h3 className="font-bold text-foreground mb-2">Eco Master</h3>
                    <p className="text-sm text-muted-foreground">Reach top 10 globally</p>
                    <div className="mt-2 text-xs text-muted-foreground">🔒 Locked</div>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </section>
        </div>
      </main>

      {/* Level Up Animation */}
      <LevelUpAnimation show={showLevelUp} newLevel="Eco Explorer" onComplete={() => setShowLevelUp(false)} />
    </div>
  )
}

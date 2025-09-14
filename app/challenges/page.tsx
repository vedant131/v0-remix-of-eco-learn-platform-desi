"use client"

import { useState } from "react"
import { ChallengeCard } from "@/components/challenges/challenge-card"
import { StreakCounter } from "@/components/challenges/streak-counter"
import { PointsPopup } from "@/components/challenges/points-popup"
import { UploadProofModal } from "@/components/challenges/upload-proof-modal"
import { SpinWheel } from "@/components/challenges/spin-wheel"
import { EcoBackground } from "@/components/eco-background"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"

interface Challenge {
  id: string
  title: string
  description: string
  icon: string
  points: number
  difficulty: "Easy" | "Medium" | "Hard"
  type: "daily" | "weekly"
  completed: boolean
  daysLeft?: number
}

export default function ChallengesPage() {
  const [challenges, setChallenges] = useState<Challenge[]>([
    {
      id: "1",
      title: "Plant a Seed",
      description: "Plant a seed in a pot or your garden and take a photo!",
      icon: "🌱",
      points: 50,
      difficulty: "Easy",
      type: "daily",
      completed: false,
    },
    {
      id: "2",
      title: "Water Conservation",
      description: "Turn off the tap while brushing your teeth for a week",
      icon: "💧",
      points: 75,
      difficulty: "Medium",
      type: "weekly",
      completed: false,
      daysLeft: 5,
    },
    {
      id: "3",
      title: "Recycle Hunt",
      description: "Find 5 recyclable items in your home and sort them properly",
      icon: "♻️",
      points: 60,
      difficulty: "Easy",
      type: "daily",
      completed: true,
    },
    {
      id: "4",
      title: "Energy Saver",
      description: "Unplug electronics when not in use for 3 days",
      icon: "⚡",
      points: 80,
      difficulty: "Medium",
      type: "daily",
      completed: false,
    },
    {
      id: "5",
      title: "Nature Walk",
      description: "Take a 30-minute walk in nature and collect interesting leaves",
      icon: "🍃",
      points: 40,
      difficulty: "Easy",
      type: "daily",
      completed: false,
    },
    {
      id: "6",
      title: "Eco Lunch Week",
      description: "Pack waste-free lunches for an entire school week",
      icon: "🥪",
      points: 120,
      difficulty: "Hard",
      type: "weekly",
      completed: false,
      daysLeft: 3,
    },
    {
      id: "7",
      title: "Plastic-Free Day",
      description: "Go an entire day without using any single-use plastic items",
      icon: "🚫",
      points: 90,
      difficulty: "Hard",
      type: "daily",
      completed: false,
    },
    {
      id: "8",
      title: "Bike to School Week",
      description: "Use a bicycle or walk to school for 5 consecutive days",
      icon: "🚲",
      points: 150,
      difficulty: "Hard",
      type: "weekly",
      completed: false,
      daysLeft: 4,
    },
    {
      id: "9",
      title: "Compost Creator",
      description: "Start a small compost bin and add organic waste for 3 days",
      icon: "🗂️",
      points: 70,
      difficulty: "Medium",
      type: "daily",
      completed: false,
    },
    {
      id: "10",
      title: "Wildlife Helper",
      description: "Create a bird feeder or bee-friendly garden space",
      icon: "🐦",
      points: 85,
      difficulty: "Medium",
      type: "daily",
      completed: false,
    },
    {
      id: "11",
      title: "Green Energy Week",
      description: "Use only renewable energy sources (solar, wind) for a week",
      icon: "🔋",
      points: 200,
      difficulty: "Hard",
      type: "weekly",
      completed: false,
      daysLeft: 6,
    },
    {
      id: "12",
      title: "Monsoon Water Harvesting",
      description: "Set up a simple rainwater collection system during monsoon season",
      icon: "🌧️",
      points: 100,
      difficulty: "Medium",
      type: "daily",
      completed: false,
    },
    {
      id: "13",
      title: "Ganges Cleanup Drive",
      description: "Organize or join a local river cleanup drive in your community",
      icon: "🏞️",
      points: 120,
      difficulty: "Hard",
      type: "daily",
      completed: false,
    },
    {
      id: "14",
      title: "Traditional Spice Garden",
      description: "Plant and grow traditional Indian spices like tulsi, mint, or coriander",
      icon: "🌿",
      points: 90,
      difficulty: "Medium",
      type: "daily",
      completed: false,
    },
    {
      id: "15",
      title: "Air Quality Awareness Week",
      description: "Monitor and document air quality in your area for a week, suggest improvements",
      icon: "🏙️",
      points: 140,
      difficulty: "Hard",
      type: "weekly",
      completed: false,
      daysLeft: 7,
    },
    {
      id: "16",
      title: "Festival Eco-Celebration",
      description: "Celebrate a festival using only eco-friendly decorations and practices",
      icon: "🪔",
      points: 110,
      difficulty: "Medium",
      type: "weekly",
      completed: false,
      daysLeft: 5,
    },
    {
      id: "17",
      title: "Himalayan Glacier Awareness",
      description: "Research and create a presentation about melting glaciers' impact on Indian rivers",
      icon: "🏔️",
      points: 130,
      difficulty: "Hard",
      type: "daily",
      completed: false,
    },
    {
      id: "18",
      title: "Plastic-Free River Week",
      description: "Avoid all single-use plastics and organize a local river cleanup for a week",
      icon: "🥤",
      points: 180,
      difficulty: "Hard",
      type: "weekly",
      completed: false,
      daysLeft: 6,
    },
    {
      id: "19",
      title: "Solar Energy Champion",
      description: "Document solar energy usage in your community and promote solar adoption",
      icon: "☀️",
      points: 110,
      difficulty: "Medium",
      type: "daily",
      completed: false,
    },
    {
      id: "20",
      title: "Tiger Conservation Advocate",
      description: "Learn about and share information on India's tiger conservation efforts",
      icon: "🐅",
      points: 95,
      difficulty: "Medium",
      type: "daily",
      completed: false,
    },
    {
      id: "21",
      title: "Smart City Green Week",
      description: "Practice and promote sustainable urban living practices for a full week",
      icon: "🌆",
      points: 160,
      difficulty: "Hard",
      type: "weekly",
      completed: false,
      daysLeft: 7,
    },
  ])

  const [streak, setStreak] = useState(7)
  const [maxStreak, setMaxStreak] = useState(12)
  const [showPointsPopup, setShowPointsPopup] = useState(false)
  const [earnedPoints, setEarnedPoints] = useState(0)
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null)
  const [showSpinWheel, setShowSpinWheel] = useState(false)
  const [canSpin, setCanSpin] = useState(true) // In real app, this would be based on daily availability

  const handleCompleteChallenge = (id: string) => {
    const challenge = challenges.find((c) => c.id === id)
    if (!challenge) return

    setSelectedChallenge(challenge)
    setShowUploadModal(true)
  }

  const handleProofSubmit = (description: string) => {
    if (!selectedChallenge) return

    setChallenges((prev) => prev.map((c) => (c.id === selectedChallenge.id ? { ...c, completed: true } : c)))

    setEarnedPoints(selectedChallenge.points)
    setShowPointsPopup(true)
    setStreak((prev) => prev + 1)
    setMaxStreak((prev) => Math.max(prev, streak + 1))

    setShowUploadModal(false)
    setSelectedChallenge(null)

    // Trigger sparkle animation
    const sparkles = document.createElement("div")
    sparkles.innerHTML = "🍃".repeat(15)
    sparkles.className = "fixed inset-0 pointer-events-none z-40"
    sparkles.style.animation = "fall 3s linear"
    document.body.appendChild(sparkles)
    setTimeout(() => document.body.removeChild(sparkles), 3000)
  }

  const handleSpinReward = (reward: { type: string; value: number; message: string }) => {
    if (reward.type === "points") {
      setEarnedPoints(reward.value)
      setShowPointsPopup(true)
    } else if (reward.type === "streak") {
      setStreak((prev) => prev + reward.value)
      setMaxStreak((prev) => Math.max(prev, streak + reward.value))
    }
    // Handle multiplier rewards in real app

    setCanSpin(false) // Disable spin for the day
  }

  const dailyChallenges = challenges.filter((c) => c.type === "daily")
  const weeklyChallenges = challenges.filter((c) => c.type === "weekly")
  const completedCount = challenges.filter((c) => c.completed).length
  const totalPoints = challenges.filter((c) => c.completed).reduce((sum, c) => sum + c.points, 0)

  return (
    <div className="min-h-screen relative">
      <EcoBackground />

      {/* Header */}
      <header className="relative z-10 p-6 border-b border-border/20 bg-background/80 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">🌱 Eco Challenges</h1>
            <p className="text-muted-foreground">Take on real-world challenges and make a difference!</p>
          </div>
          <div className="flex items-center gap-4">
            {canSpin && (
              <Button
                onClick={() => setShowSpinWheel(true)}
                className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-xl font-semibold animate-pulse-glow"
              >
                🎡 Daily Spin
              </Button>
            )}
            <Link href="/dashboard">
              <Button variant="outline" className="border-primary/30 text-primary hover:bg-primary/10 bg-transparent">
                Back to Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 p-6">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Stats Overview */}
          <section className="grid md:grid-cols-4 gap-6">
            <StreakCounter streak={streak} maxStreak={maxStreak} />

            <Card className="p-6 glass border-primary/20 text-center">
              <h3 className="text-lg font-semibold text-foreground mb-2">Completed</h3>
              <div className="text-3xl font-bold text-primary mb-2">{completedCount}</div>
              <p className="text-muted-foreground">out of {challenges.length}</p>
            </Card>

            <Card className="p-6 glass border-accent/20 text-center">
              <h3 className="text-lg font-semibold text-foreground mb-2">Points Earned</h3>
              <div className="text-3xl font-bold text-accent mb-2">{totalPoints}</div>
              <p className="text-muted-foreground">eco points</p>
            </Card>

            <Card className="p-6 glass border-secondary/20 text-center">
              <h3 className="text-lg font-semibold text-foreground mb-2">This Week</h3>
              <div className="text-3xl font-bold text-secondary mb-2">
                {weeklyChallenges.filter((c) => c.completed).length}
              </div>
              <p className="text-muted-foreground">weekly goals</p>
            </Card>
          </section>

          {/* Challenge Tabs */}
          <section>
            <Tabs defaultValue="daily" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="daily" className="text-lg">
                  Daily Challenges
                </TabsTrigger>
                <TabsTrigger value="weekly" className="text-lg">
                  Weekly Challenges
                </TabsTrigger>
              </TabsList>

              <TabsContent value="daily" className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {dailyChallenges.map((challenge) => (
                    <ChallengeCard key={challenge.id} {...challenge} onComplete={handleCompleteChallenge} />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="weekly" className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {weeklyChallenges.map((challenge) => (
                    <ChallengeCard key={challenge.id} {...challenge} onComplete={handleCompleteChallenge} />
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </section>

          {/* Motivation Section */}
          <section>
            <Card className="p-8 glass border-secondary/20 text-center">
              <h2 className="text-2xl font-bold text-foreground mb-4">Keep Going, Eco-Hero! 🌟</h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Every challenge you complete makes a real difference for our planet. Your actions inspire others and
                create positive change in the world! From local Indian environmental issues to global challenges, you're
                making an impact!
              </p>
              <div className="flex justify-center gap-4">
                <div className="text-center">
                  <div className="text-2xl mb-2">🌍</div>
                  <p className="text-sm font-semibold text-foreground">Planet Helper</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl mb-2">🌱</div>
                  <p className="text-sm font-semibold text-foreground">Growth Mindset</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl mb-2">✨</div>
                  <p className="text-sm font-semibold text-foreground">Positive Impact</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl mb-2">🇮🇳</div>
                  <p className="text-sm font-semibold text-foreground">Local Action</p>
                </div>
              </div>
            </Card>
          </section>
        </div>
      </main>

      {/* Modals */}
      {showUploadModal && selectedChallenge && (
        <UploadProofModal
          challengeTitle={selectedChallenge.title}
          onSubmit={handleProofSubmit}
          onClose={() => {
            setShowUploadModal(false)
            setSelectedChallenge(null)
          }}
        />
      )}

      {showSpinWheel && <SpinWheel onReward={handleSpinReward} onClose={() => setShowSpinWheel(false)} />}

      <PointsPopup points={earnedPoints} show={showPointsPopup} onComplete={() => setShowPointsPopup(false)} />
    </div>
  )
}

"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { EcoBackground } from "@/components/eco-background"
import { EcoCharacter } from "@/components/eco-characters"
import Link from "next/link"

export default function LandingPage() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <EcoBackground />

      {/* Header */}
      <header className="relative z-10 p-6">
        <nav className="flex items-center justify-between max-w-6xl mx-auto">
          <div className="flex items-center gap-2">
            <EcoCharacter type="sapling" size="sm" />
            <h1 className="text-2xl font-bold text-foreground">EcoLearn</h1>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" className="text-foreground hover:bg-primary/20">
              About
            </Button>
            <Button variant="ghost" className="text-foreground hover:bg-primary/20">
              Contact
            </Button>
            <Link href="/auth">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90">Sign In</Button>
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="relative z-10 flex flex-col items-center justify-center min-h-[80vh] px-6">
        <div className="text-center max-w-4xl mx-auto">
          {/* Eco Characters */}
          <div className="flex justify-center items-center gap-8 mb-8">
            <EcoCharacter type="sapling" size="lg" />
            <EcoCharacter type="droplet" size="lg" />
            <EcoCharacter type="recycle" size="lg" />
          </div>

          {/* Main Title */}
          <h1 className="text-6xl md:text-7xl font-bold text-balance mb-6 animate-bounce-gentle">
            <span className="text-foreground">Play. Learn.</span>
            <br />
            <span className="text-primary">Save the Planet</span>
            <span className="inline-block ml-2 animate-pulse-glow">🌍</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-muted-foreground text-balance mb-12 leading-relaxed">
            Join thousands of young eco-heroes in fun games, exciting challenges, and interactive lessons that make
            learning about our environment an adventure!
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/auth">
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-105 transition-all duration-200 px-8 py-4 text-lg font-semibold rounded-xl animate-pulse-glow"
              >
                Join Now 🌱
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="border-secondary text-secondary hover:bg-secondary/10 hover:scale-105 transition-all duration-200 px-8 py-4 text-lg font-semibold rounded-xl glass bg-transparent"
            >
              Explore Features 💡
            </Button>
          </div>
        </div>

        {/* Hidden easter eggs section */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Hidden clickable eco-facts icons */}
          <div
            className="absolute top-20 left-10 w-8 h-8 cursor-pointer pointer-events-auto opacity-30 hover:opacity-100 transition-opacity animate-float"
            onClick={() => alert("🌱 Eco-Fact: A single tree can absorb 48 pounds of CO2 per year!")}
          >
            🌳
          </div>
          <div
            className="absolute top-40 right-20 w-8 h-8 cursor-pointer pointer-events-auto opacity-30 hover:opacity-100 transition-opacity animate-bounce-gentle"
            onClick={() =>
              alert("💧 Eco-Fact: Turning off the tap while brushing teeth can save 8 gallons of water per day!")
            }
          >
            💧
          </div>
          <div
            className="absolute bottom-40 left-20 w-8 h-8 cursor-pointer pointer-events-auto opacity-30 hover:opacity-100 transition-opacity animate-sparkle"
            onClick={() =>
              alert("♻️ Eco-Fact: Recycling one aluminum can saves enough energy to power a TV for 3 hours!")
            }
          >
            ♻️
          </div>
        </div>
      </main>

      {/* Features Preview */}
      <section className="relative z-10 py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-foreground mb-12 text-balance">
            Discover Your Eco-Adventure
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Games Card */}
            <Card className="p-8 glass hover:scale-105 transition-all duration-300 border-primary/20 group">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:animate-bounce-gentle">
                  <span className="text-3xl">🎮</span>
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4">Fun Games</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Play exciting eco-games like Waste Sorting Puzzle, Eco Runner, and Tree Grower. Learn while having
                  fun!
                </p>
              </div>
            </Card>

            {/* Challenges Card */}
            <Card className="p-8 glass hover:scale-105 transition-all duration-300 border-secondary/20 group">
              <div className="text-center">
                <div className="w-16 h-16 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:animate-bounce-gentle">
                  <span className="text-3xl">🌱</span>
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4">Daily Challenges</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Take on real-world eco-challenges, build streaks, and watch your virtual sapling grow with every green
                  action!
                </p>
              </div>
            </Card>

            {/* Lessons Card */}
            <Card className="p-8 glass hover:scale-105 transition-all duration-300 border-accent/20 group">
              <div className="text-center">
                <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:animate-bounce-gentle">
                  <span className="text-3xl">📚</span>
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4">Interactive Lessons</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Explore bite-sized lessons with quizzes, animations, and your personal AI Eco-Coach to guide your
                  learning journey.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Eco Quote Ticker */}
      <section className="relative z-10 py-8 bg-primary/10">
        <div className="overflow-hidden">
          <div className="animate-drift">
            <p className="text-lg text-center text-foreground whitespace-nowrap">
              🍃 "The Earth does not belong to us; we belong to the Earth" - Chief Seattle 🌍 "Every day is Earth Day" -
              Unknown 🌱 "Be the change you wish to see in the world" - Gandhi 🌿
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

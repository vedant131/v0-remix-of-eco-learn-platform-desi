"use client"

import { useState } from "react"
import { GameCard } from "@/components/games/game-card"
import { WasteSortingGame } from "@/components/games/waste-sorting-game"
import { TreeGrowerGame } from "@/components/games/tree-grower-game"
import { EcoRunnerGame } from "@/components/games/eco-runner-game"
import { RecyclingMatch3Game } from "@/components/games/recycling-match3-game"
import { OceanCleanupGame } from "@/components/games/ocean-cleanup-game"
import { SolarPanelGame } from "@/components/games/solar-panel-game"
import { CarbonFootprintGame } from "@/components/games/carbon-footprint-game"
import { WildlifeHabitatGame } from "@/components/games/wildlife-habitat-game"
import { RenewableEnergyQuiz } from "@/components/games/renewable-energy-quiz"
import { MonsoonHarvestingGame } from "@/components/games/monsoon-harvesting-game"
import { SpiceGardenGame } from "@/components/games/spice-garden-game"
import { GangesCleanupGame } from "@/components/games/ganges-cleanup-game"
import { SolarCookerGame } from "@/components/games/solar-cooker-game"
import { WildlifeQuizGame } from "@/components/games/wildlife-quiz-game"
import { AirQualityGame } from "@/components/games/air-quality-game"
import { PlasticPollutionGame } from "@/components/games/plastic-pollution-game"
import { BiodiversityGame } from "@/components/games/biodiversity-game"
import { ClimateChangeGame } from "@/components/games/climate-change-game"
import { SustainableFarmingGame } from "@/components/games/sustainable-farming-game"
import { EcoBackground } from "@/components/eco-background"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"

type GameType =
  | "waste-sorting"
  | "tree-grower"
  | "eco-runner"
  | "recycling-match3"
  | "ocean-cleanup"
  | "solar-panel"
  | "carbon-footprint"
  | "wildlife-habitat"
  | "renewable-quiz"
  | "monsoon-harvesting"
  | "spice-garden"
  | "ganges-cleanup"
  | "solar-cooker"
  | "wildlife-quiz"
  | "air-quality"
  | "plastic-pollution"
  | "biodiversity"
  | "climate-change"
  | "sustainable-farming"
  | null

export default function GamesPage() {
  const [activeGame, setActiveGame] = useState<GameType>(null)
  const [gameResults, setGameResults] = useState<{ game: string; score: number } | null>(null)

  const handleGameComplete = (game: string, score: number) => {
    setGameResults({ game, score })
    setActiveGame(null)

    const confetti = document.createElement("div")
    confetti.innerHTML = "🍃".repeat(20)
    confetti.className = "fixed inset-0 pointer-events-none z-50"
    document.body.appendChild(confetti)
    setTimeout(() => document.body.removeChild(confetti), 3000)
  }

  const closeGameResults = () => {
    setGameResults(null)
  }

  return (
    <div className="min-h-screen relative">
      <EcoBackground />

      {/* Header */}
      <header className="relative z-10 p-6 border-b border-border/20 bg-background/80 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">🎮 Eco Games</h1>
            <p className="text-muted-foreground">Learn while having fun with our eco-friendly games!</p>
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
        <div className="max-w-6xl mx-auto">
          {/* Featured Games */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-6">Featured Games</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <GameCard
                title="Waste Sorting Puzzle"
                description="Learn to sort different types of waste into the correct bins!"
                icon={<span className="text-4xl">♻️</span>}
                difficulty="Easy"
                points={100}
                playTime="5 min"
                color="primary"
                onPlay={() => setActiveGame("waste-sorting")}
              />

              <GameCard
                title="Eco Runner"
                description="Run through the forest, collect trees and avoid trash!"
                icon={<span className="text-4xl">🏃‍♂️</span>}
                difficulty="Hard"
                points={200}
                playTime="3 min"
                color="accent"
                onPlay={() => setActiveGame("eco-runner")}
              />

              <GameCard
                title="Tree Grower"
                description="Take care of your virtual tree and watch it grow!"
                icon={<span className="text-4xl">🌳</span>}
                difficulty="Medium"
                points={150}
                playTime="10 min"
                color="secondary"
                onPlay={() => setActiveGame("tree-grower")}
              />

              <GameCard
                title="Recycling Match-3"
                description="Match 3 or more recyclables to clear them from the board!"
                icon={<span className="text-4xl">🔄</span>}
                difficulty="Medium"
                points={180}
                playTime="5 min"
                color="primary"
                onPlay={() => setActiveGame("recycling-match3")}
              />
            </div>
          </section>

          {/* All Games */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-6">All Games</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <GameCard
                title="Waste Sorting Puzzle"
                description="Learn to sort different types of waste into the correct bins!"
                icon={<span className="text-4xl">♻️</span>}
                difficulty="Easy"
                points={100}
                playTime="5 min"
                color="primary"
                onPlay={() => setActiveGame("waste-sorting")}
              />

              <GameCard
                title="Tree Grower"
                description="Take care of your virtual tree and watch it grow!"
                icon={<span className="text-4xl">🌳</span>}
                difficulty="Medium"
                points={150}
                playTime="10 min"
                color="secondary"
                onPlay={() => setActiveGame("tree-grower")}
              />

              <GameCard
                title="Eco Runner"
                description="Run through the forest, collect trees and avoid trash!"
                icon={<span className="text-4xl">🏃‍♂️</span>}
                difficulty="Hard"
                points={200}
                playTime="3 min"
                color="accent"
                onPlay={() => setActiveGame("eco-runner")}
              />

              <GameCard
                title="Recycling Match-3"
                description="Match 3 or more recyclables to clear them from the board!"
                icon={<span className="text-4xl">🔄</span>}
                difficulty="Medium"
                points={180}
                playTime="5 min"
                color="primary"
                onPlay={() => setActiveGame("recycling-match3")}
              />

              <GameCard
                title="Ocean Cleanup"
                description="Navigate your boat to collect ocean trash and save marine life!"
                icon={<span className="text-4xl">🌊</span>}
                difficulty="Medium"
                points={180}
                playTime="4 min"
                color="primary"
                onPlay={() => setActiveGame("ocean-cleanup")}
              />

              <GameCard
                title="Solar Panel Optimizer"
                description="Adjust solar panels to maximize energy collection as the sun moves!"
                icon={<span className="text-4xl">☀️</span>}
                difficulty="Hard"
                points={220}
                playTime="6 min"
                color="secondary"
                onPlay={() => setActiveGame("solar-panel")}
              />

              <GameCard
                title="Carbon Footprint Calculator"
                description="Make daily choices and learn about their environmental impact!"
                icon={<span className="text-4xl">🦶</span>}
                difficulty="Easy"
                points={120}
                playTime="8 min"
                color="accent"
                onPlay={() => setActiveGame("carbon-footprint")}
              />

              <GameCard
                title="Wildlife Habitat Builder"
                description="Create perfect habitats for different animals in their ecosystem!"
                icon={<span className="text-4xl">🦋</span>}
                difficulty="Medium"
                points={160}
                playTime="7 min"
                color="primary"
                onPlay={() => setActiveGame("wildlife-habitat")}
              />

              <GameCard
                title="Renewable Energy Quiz"
                description="Test your knowledge about clean energy sources and sustainability!"
                icon={<span className="text-4xl">⚡</span>}
                difficulty="Easy"
                points={140}
                playTime="5 min"
                color="secondary"
                onPlay={() => setActiveGame("renewable-quiz")}
              />

              <GameCard
                title="Monsoon Water Harvesting"
                description="Collect precious rainwater during monsoon season for your community!"
                icon={<span className="text-4xl">🌧️</span>}
                difficulty="Medium"
                points={180}
                playTime="4 min"
                color="primary"
                onPlay={() => setActiveGame("monsoon-harvesting")}
              />

              <GameCard
                title="Spice Garden Manager"
                description="Grow traditional Indian spices using sustainable farming methods!"
                icon={<span className="text-4xl">🌶️</span>}
                difficulty="Hard"
                points={200}
                playTime="6 min"
                color="secondary"
                onPlay={() => setActiveGame("spice-garden")}
              />

              <GameCard
                title="Ganges River Cleanup"
                description="Help restore the sacred Ganges by collecting pollution and waste!"
                icon={<span className="text-4xl">🏞️</span>}
                difficulty="Medium"
                points={170}
                playTime="5 min"
                color="accent"
                onPlay={() => setActiveGame("ganges-cleanup")}
              />

              <GameCard
                title="Solar Cooker Challenge"
                description="Use clean solar energy to cook delicious traditional Indian dishes!"
                icon={<span className="text-4xl">🍳</span>}
                difficulty="Hard"
                points={220}
                playTime="7 min"
                color="primary"
                onPlay={() => setActiveGame("solar-cooker")}
              />

              <GameCard
                title="Wildlife Conservation Quiz"
                description="Test your knowledge about India's amazing biodiversity and wildlife!"
                icon={<span className="text-4xl">🐅</span>}
                difficulty="Easy"
                points={150}
                playTime="6 min"
                color="secondary"
                onPlay={() => setActiveGame("wildlife-quiz")}
              />

              <GameCard
                title="Air Quality Monitor"
                description="Learn about air pollution in Indian cities and find solutions!"
                icon={<span className="text-4xl">🌫️</span>}
                difficulty="Medium"
                points={190}
                playTime="5 min"
                color="accent"
                onPlay={() => setActiveGame("air-quality")}
              />

              <GameCard
                title="Plastic Pollution Fighter"
                description="Combat plastic waste in India's rivers and streets!"
                icon={<span className="text-4xl">🥤</span>}
                difficulty="Hard"
                points={210}
                playTime="7 min"
                color="primary"
                onPlay={() => setActiveGame("plastic-pollution")}
              />

              <GameCard
                title="Biodiversity Protector"
                description="Save endangered species in India's national parks and forests!"
                icon={<span className="text-4xl">🦚</span>}
                difficulty="Medium"
                points={175}
                playTime="6 min"
                color="secondary"
                onPlay={() => setActiveGame("biodiversity")}
              />

              <GameCard
                title="Climate Change Hero"
                description="Address climate challenges affecting Indian agriculture and cities!"
                icon={<span className="text-4xl">🌡️</span>}
                difficulty="Hard"
                points={230}
                playTime="8 min"
                color="accent"
                onPlay={() => setActiveGame("climate-change")}
              />

              <GameCard
                title="Sustainable Farming Guru"
                description="Practice eco-friendly farming methods used across rural India!"
                icon={<span className="text-4xl">🚜</span>}
                difficulty="Medium"
                points={185}
                playTime="6 min"
                color="primary"
                onPlay={() => setActiveGame("sustainable-farming")}
              />
            </div>
          </section>

          {/* Game Categories */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-6">Game Categories</h2>
            <div className="grid md:grid-cols-4 gap-4">
              <Card className="p-4 glass border-primary/20 text-center hover:scale-105 transition-all duration-200">
                <span className="text-3xl mb-2 block">🧩</span>
                <h3 className="font-semibold text-foreground">Puzzles</h3>
                <p className="text-sm text-muted-foreground">8 games</p>
              </Card>

              <Card className="p-4 glass border-secondary/20 text-center hover:scale-105 transition-all duration-200">
                <span className="text-3xl mb-2 block">🏃‍♂️</span>
                <h3 className="font-semibold text-foreground">Action</h3>
                <p className="text-sm text-muted-foreground">6 games</p>
              </Card>

              <Card className="p-4 glass border-accent/20 text-center hover:scale-105 transition-all duration-200">
                <span className="text-3xl mb-2 block">🌱</span>
                <h3 className="font-semibold text-foreground">Simulation</h3>
                <p className="text-sm text-muted-foreground">10 games</p>
              </Card>

              <Card className="p-4 glass border-primary/20 text-center hover:scale-105 transition-all duration-200">
                <span className="text-3xl mb-2 block">🧠</span>
                <h3 className="font-semibold text-foreground">Quiz</h3>
                <p className="text-sm text-muted-foreground">9 games</p>
              </Card>
            </div>
          </section>

          {/* Recent Achievements */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-6">Your Gaming Progress</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="p-6 glass border-secondary/20">
                <h3 className="text-xl font-semibold text-foreground mb-4">Recent High Scores</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-foreground">Waste Sorting</span>
                    <span className="font-bold text-primary">95 points</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-foreground">Tree Grower</span>
                    <span className="font-bold text-secondary">180 points</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-foreground">Eco Runner</span>
                    <span className="font-bold text-accent">120 points</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-foreground">Recycling Match-3</span>
                    <span className="font-bold text-primary">240 points</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-foreground">Ocean Cleanup</span>
                    <span className="font-bold text-secondary">165 points</span>
                  </div>
                </div>
              </Card>

              <Card className="p-6 glass border-accent/20">
                <h3 className="text-xl font-semibold text-foreground mb-4">Gaming Stats</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-foreground">Games Played</span>
                    <span className="font-bold text-primary">42</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-foreground">Total Points</span>
                    <span className="font-bold text-secondary">2,847</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-foreground">Favorite Game</span>
                    <span className="font-bold text-accent">Match-3</span>
                  </div>
                </div>
              </Card>
            </div>
          </section>
        </div>
      </main>

      {/* Game Modals - Featured games */}
      {activeGame === "waste-sorting" && (
        <WasteSortingGame
          onComplete={(score) => handleGameComplete("Waste Sorting", score)}
          onClose={() => setActiveGame(null)}
        />
      )}

      {activeGame === "tree-grower" && (
        <TreeGrowerGame
          onComplete={(score) => handleGameComplete("Tree Grower", score)}
          onClose={() => setActiveGame(null)}
        />
      )}

      {activeGame === "eco-runner" && (
        <EcoRunnerGame
          onComplete={(score) => handleGameComplete("Eco Runner", score)}
          onClose={() => setActiveGame(null)}
        />
      )}

      {activeGame === "recycling-match3" && (
        <RecyclingMatch3Game
          onComplete={(score) => handleGameComplete("Recycling Match-3", score)}
          onClose={() => setActiveGame(null)}
        />
      )}

      {/* Game Modals - existing games */}
      {activeGame === "ocean-cleanup" && (
        <OceanCleanupGame
          onComplete={(score) => handleGameComplete("Ocean Cleanup", score)}
          onClose={() => setActiveGame(null)}
        />
      )}

      {activeGame === "solar-panel" && (
        <SolarPanelGame
          onComplete={(score) => handleGameComplete("Solar Panel Optimizer", score)}
          onClose={() => setActiveGame(null)}
        />
      )}

      {activeGame === "carbon-footprint" && (
        <CarbonFootprintGame
          onComplete={(score) => handleGameComplete("Carbon Footprint Calculator", score)}
          onClose={() => setActiveGame(null)}
        />
      )}

      {activeGame === "wildlife-habitat" && (
        <WildlifeHabitatGame
          onComplete={(score) => handleGameComplete("Wildlife Habitat Builder", score)}
          onClose={() => setActiveGame(null)}
        />
      )}

      {activeGame === "renewable-quiz" && (
        <RenewableEnergyQuiz
          onComplete={(score) => handleGameComplete("Renewable Energy Quiz", score)}
          onClose={() => setActiveGame(null)}
        />
      )}

      {activeGame === "monsoon-harvesting" && (
        <MonsoonHarvestingGame
          onComplete={(score) => handleGameComplete("Monsoon Water Harvesting", score)}
          onClose={() => setActiveGame(null)}
        />
      )}

      {activeGame === "spice-garden" && (
        <SpiceGardenGame
          onComplete={(score) => handleGameComplete("Spice Garden Manager", score)}
          onClose={() => setActiveGame(null)}
        />
      )}

      {activeGame === "ganges-cleanup" && (
        <GangesCleanupGame
          onComplete={(score) => handleGameComplete("Ganges River Cleanup", score)}
          onClose={() => setActiveGame(null)}
        />
      )}

      {activeGame === "solar-cooker" && (
        <SolarCookerGame
          onComplete={(score) => handleGameComplete("Solar Cooker Challenge", score)}
          onClose={() => setActiveGame(null)}
        />
      )}

      {activeGame === "wildlife-quiz" && (
        <WildlifeQuizGame
          onComplete={(score) => handleGameComplete("Wildlife Conservation Quiz", score)}
          onClose={() => setActiveGame(null)}
        />
      )}

      {activeGame === "air-quality" && (
        <AirQualityGame
          onComplete={(score) => handleGameComplete("Air Quality Monitor", score)}
          onClose={() => setActiveGame(null)}
        />
      )}

      {activeGame === "plastic-pollution" && (
        <PlasticPollutionGame
          onComplete={(score) => handleGameComplete("Plastic Pollution Fighter", score)}
          onClose={() => setActiveGame(null)}
        />
      )}

      {activeGame === "biodiversity" && (
        <BiodiversityGame
          onComplete={(score) => handleGameComplete("Biodiversity Protector", score)}
          onClose={() => setActiveGame(null)}
        />
      )}

      {activeGame === "climate-change" && (
        <ClimateChangeGame
          onComplete={(score) => handleGameComplete("Climate Change Hero", score)}
          onClose={() => setActiveGame(null)}
        />
      )}

      {activeGame === "sustainable-farming" && (
        <SustainableFarmingGame
          onComplete={(score) => handleGameComplete("Sustainable Farming Guru", score)}
          onClose={() => setActiveGame(null)}
        />
      )}

      {/* Game Results Modal */}
      {gameResults && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
          <Card className="w-full max-w-md p-8 glass border-primary/20 text-center">
            <div className="text-6xl mb-4 animate-bounce">🎉</div>
            <h2 className="text-2xl font-bold text-foreground mb-2">Game Complete!</h2>
            <p className="text-muted-foreground mb-4">You played {gameResults.game}</p>
            <div className="text-4xl font-bold text-primary mb-6 animate-pulse-glow">{gameResults.score} points</div>
            <div className="mb-6">
              {gameResults.score >= 200 && <p className="text-secondary font-semibold">🌟 Excellent performance!</p>}
              {gameResults.score >= 100 && gameResults.score < 200 && (
                <p className="text-accent font-semibold">👍 Great job!</p>
              )}
              {gameResults.score < 100 && <p className="text-primary font-semibold">🌱 Keep practicing!</p>}
            </div>
            <Button
              onClick={closeGameResults}
              className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl px-8 py-3 font-semibold animate-pulse-glow"
            >
              Awesome!
            </Button>
          </Card>
        </div>
      )}
    </div>
  )
}

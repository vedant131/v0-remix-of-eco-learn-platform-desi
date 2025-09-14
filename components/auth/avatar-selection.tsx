"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { EcoCharacter } from "@/components/eco-characters"

interface AvatarSelectionProps {
  onComplete: (avatar: string) => void
}

export function AvatarSelection({ onComplete }: AvatarSelectionProps) {
  const [selectedAvatar, setSelectedAvatar] = useState<string>("")

  const avatars = [
    {
      id: "sapling",
      type: "sapling" as const,
      name: "Growing Sapling",
      description: "Watch me grow with your eco-actions!",
    },
    {
      id: "droplet",
      type: "droplet" as const,
      name: "Water Droplet",
      description: "Every drop counts for our planet!",
    },
    { id: "recycle", type: "recycle" as const, name: "Recycle Hero", description: "Reduce, reuse, recycle with me!" },
  ]

  const handleComplete = () => {
    if (selectedAvatar) {
      onComplete(selectedAvatar)
    }
  }

  return (
    <Card className="w-full max-w-2xl p-8 glass border-accent/20">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-2">Choose Your Eco-Avatar!</h2>
        <p className="text-muted-foreground">Pick your companion for this amazing eco-journey</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {avatars.map((avatar) => (
          <div
            key={avatar.id}
            onClick={() => setSelectedAvatar(avatar.id)}
            className={`p-6 rounded-xl border-2 cursor-pointer transition-all duration-200 hover:scale-105 ${
              selectedAvatar === avatar.id
                ? "border-accent bg-accent/10 shadow-lg"
                : "border-border hover:border-accent/50"
            }`}
          >
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <EcoCharacter type={avatar.type} size="lg" animated={selectedAvatar === avatar.id} />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">{avatar.name}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{avatar.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center">
        <Button
          onClick={handleComplete}
          disabled={!selectedAvatar}
          className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-xl px-8 py-3 text-lg font-semibold transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Start My Eco-Adventure! 🚀
        </Button>
      </div>
    </Card>
  )
}

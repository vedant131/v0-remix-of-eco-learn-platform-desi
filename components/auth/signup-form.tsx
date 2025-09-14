"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { EcoCharacter } from "@/components/eco-characters"

interface SignupFormProps {
  onToggleMode: () => void
  onSuccess: () => void
}

export function SignupForm({ onToggleMode, onSuccess }: SignupFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!")
      return
    }

    setIsLoading(true)

    // Simulate signup process
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsLoading(false)
    onSuccess()
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <Card className="w-full max-w-md p-8 glass border-secondary/20">
      <div className="text-center mb-8">
        <div className="flex justify-center gap-4 mb-4">
          <EcoCharacter type="droplet" size="md" />
          <EcoCharacter type="recycle" size="md" />
        </div>
        <h2 className="text-3xl font-bold text-foreground mb-2">Join EcoLearn!</h2>
        <p className="text-muted-foreground">Start your journey to save the planet</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium text-foreground">
            Your Name
          </label>
          <Input
            id="name"
            type="text"
            value={formData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            className="rounded-xl border-secondary/30 focus:border-secondary focus:ring-secondary/20 transition-all duration-200"
            placeholder="Eco Hero Name"
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="signup-email" className="text-sm font-medium text-foreground">
            Email
          </label>
          <Input
            id="signup-email"
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            className="rounded-xl border-secondary/30 focus:border-secondary focus:ring-secondary/20 transition-all duration-200"
            placeholder="your.email@example.com"
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="signup-password" className="text-sm font-medium text-foreground">
            Password
          </label>
          <Input
            id="signup-password"
            type="password"
            value={formData.password}
            onChange={(e) => handleInputChange("password", e.target.value)}
            className="rounded-xl border-secondary/30 focus:border-secondary focus:ring-secondary/20 transition-all duration-200"
            placeholder="••••••••"
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="confirm-password" className="text-sm font-medium text-foreground">
            Confirm Password
          </label>
          <Input
            id="confirm-password"
            type="password"
            value={formData.confirmPassword}
            onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
            className="rounded-xl border-secondary/30 focus:border-secondary focus:ring-secondary/20 transition-all duration-200"
            placeholder="••••••••"
            required
          />
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 rounded-xl py-3 text-lg font-semibold transition-all duration-200 hover:scale-105"
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-secondary-foreground/30 border-t-secondary-foreground rounded-full animate-spin" />
              Creating Account...
            </div>
          ) : (
            "Join Now 🌍"
          )}
        </Button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-muted-foreground">
          Already have an account?{" "}
          <button
            onClick={onToggleMode}
            className="text-secondary hover:text-secondary/80 font-semibold transition-colors"
          >
            Sign in here
          </button>
        </p>
      </div>
    </Card>
  )
}

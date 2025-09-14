"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { EcoCharacter } from "@/components/eco-characters"

interface LoginFormProps {
  onToggleMode: () => void
  onSuccess: () => void
}

export function LoginForm({ onToggleMode, onSuccess }: LoginFormProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate login process
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsLoading(false)
    onSuccess()
  }

  return (
    <Card className="w-full max-w-md p-8 glass border-primary/20">
      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
          <EcoCharacter type="sapling" size="lg" />
        </div>
        <h2 className="text-3xl font-bold text-foreground mb-2">Welcome Back!</h2>
        <p className="text-muted-foreground">Ready to continue your eco-adventure?</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium text-foreground">
            Email
          </label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded-xl border-primary/30 focus:border-primary focus:ring-primary/20 transition-all duration-200"
            placeholder="your.email@example.com"
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="password" className="text-sm font-medium text-foreground">
            Password
          </label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="rounded-xl border-primary/30 focus:border-primary focus:ring-primary/20 transition-all duration-200"
            placeholder="••••••••"
            required
          />
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl py-3 text-lg font-semibold transition-all duration-200 hover:scale-105"
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
              Signing In...
            </div>
          ) : (
            "Sign In 🌱"
          )}
        </Button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-muted-foreground">
          New to EcoLearn?{" "}
          <button onClick={onToggleMode} className="text-primary hover:text-primary/80 font-semibold transition-colors">
            Join the adventure!
          </button>
        </p>
      </div>
    </Card>
  )
}

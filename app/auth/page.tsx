"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { LoginForm } from "@/components/auth/login-form"
import { SignupForm } from "@/components/auth/signup-form"
import { AvatarSelection } from "@/components/auth/avatar-selection"
import { ButterflyAnimation } from "@/components/auth/butterfly-animation"
import { EcoCharacter } from "@/components/eco-characters"

type AuthStep = "login" | "signup" | "avatar"

export default function AuthPage() {
  const [currentStep, setCurrentStep] = useState<AuthStep>("login")
  const router = useRouter()

  const handleAuthSuccess = () => {
    if (currentStep === "signup") {
      setCurrentStep("avatar")
    } else {
      // For login, go directly to dashboard
      router.push("/dashboard")
    }
  }

  const handleAvatarComplete = (avatar: string) => {
    // Store avatar selection (in a real app, this would be saved to user profile)
    localStorage.setItem("ecolearn-avatar", avatar)
    router.push("/dashboard")
  }

  const toggleAuthMode = () => {
    setCurrentStep(currentStep === "login" ? "signup" : "login")
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Pastel gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/10 to-accent/20" />

      {/* Butterfly animations */}
      <ButterflyAnimation />

      {/* Header */}
      <header className="relative z-10 p-6">
        <div className="flex items-center gap-2 max-w-6xl mx-auto">
          <EcoCharacter type="sapling" size="sm" />
          <h1 className="text-2xl font-bold text-foreground">EcoLearn</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex items-center justify-center min-h-[80vh] px-6">
        {currentStep === "login" && <LoginForm onToggleMode={toggleAuthMode} onSuccess={handleAuthSuccess} />}

        {currentStep === "signup" && <SignupForm onToggleMode={toggleAuthMode} onSuccess={handleAuthSuccess} />}

        {currentStep === "avatar" && <AvatarSelection onComplete={handleAvatarComplete} />}
      </main>

      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none">
        <svg viewBox="0 0 1200 120" className="w-full h-full">
          <path
            d="M0,60 C300,20 600,100 900,60 C1050,30 1150,80 1200,60 L1200,120 L0,120 Z"
            fill="currentColor"
            className="text-secondary/20"
          />
        </svg>
      </div>
    </div>
  )
}
